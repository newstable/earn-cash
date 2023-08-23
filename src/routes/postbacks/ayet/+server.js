// /postbacks/ayet?u={external_identifier}&ip={ip}&cid={transaction_id}&oid={offer_id}&p={payout_usd}&on={offer_name}&c={currency_conversion_rate}&a={currency_amount}&cb={is_chargeback}

import crypto from 'crypto'
import calculateUserLevel from '../../../lib/calculateUserLevel';
import logger from '../../../lib/log';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import getGeoInfo from '../../../services/geoPlugin';

function getHash(string, key){
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(string); 
    return hmac.digest('hex'); 
};

const private_key = "ee1ded3ae5f3065dcd458ae7e80c7ca7"
export const GET = async(request) => {
    const searchParams = request.url.searchParams;
    logger.log(request.url, '/postbacks/ayet')

    if (!searchParams.get("u") ||
        !searchParams.get("ip") ||
        !searchParams.get("cid") ||
        !searchParams.get("oid") ||
        !searchParams.get("p") ||
        !searchParams.get("on") ||
        (searchParams.get("c") == '' && searchParams.get("a") == '')
    ) {
        return new Response("", { status: 404 });
    }

    const sortedQueryObject = {};
    for (const [key, value] of searchParams.entries()) {
        sortedQueryObject[key] = encodeURIComponent(value).replace(/\%20/g, '+');
    }
    const sortedKeys = Object.keys(sortedQueryObject).sort();
    const sortedQueryString = sortedKeys.map(key => `${key}=${sortedQueryObject[key]}`).join('&');
    const securityHash = getHash(sortedQueryString, private_key);
    if(request.request.headers.get('x-ayetstudios-security-hash') != securityHash)
        return new Response("", { status: 404 });

    const ip = searchParams.get("ip");
    const { country } = await getGeoInfo(ip)

    var user = await User.findOne({ _id: searchParams.get("u") });
    if (user === null) return new Response("", { status: 404 });

    const status = searchParams.get("cb") == 1? 0: 1
    const tokens = status? parseFloat(searchParams.get("a")): 0;

    var newOffer = new OfferDone({
        user,
        country,
        conversionId: searchParams.get("cid"),
        offerId: searchParams.get("oid"),
        payout: parseFloat(searchParams.get("p")),
        offerName: searchParams.get("on"),
        ip,
        tokens,
        wall: 1,
        status
    });
    await newOffer.save();

    user.lastPaidSurvey = Date.now();
    user.paidSurveyCount += 1;
    user.points += tokens;
    user.level = calculateUserLevel(user.points);
    await user.save();

    if (user.refBy) {
        var refUser = await User.findOne({ _id: user.refBy });
        const commissionPercentage = await getCommision(refUser);
        const commission = Math.round(tokens * commissionPercentage);

        refUser.points += commission;
        refUser.pointsByRef += commission;
        await refUser.save();

        newOffer.ref = refUser;
        await newOffer.save();

        const refEarning = new RefEarning({
            earner: user,
            master: refUser,
            offerDone: newOffer,
            points: tokens,
            pointsForRef: commission,
            commissionPercentage: commissionPercentage
        });
        await refEarning.save();

        user.earnedForRef += commission;
        user.save();
    }

    return new Response("", { status: 200 });
}