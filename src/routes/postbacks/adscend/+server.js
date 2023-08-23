// /postbacks/adscend/?u=[SB1]&a=[CUR]&oid=[OID]&cid=[TID]&p=[PAY]&on=[ONM]&ip=[IP]&s=[STS]&h=[HSH=z5WYEcHK9Kbkna46]userid=[SB1]&amount=[CUR]&offerid=[OID]&conversionid=[TID]&payout=[PAY]&ip=[IP]&status=[STS][/HSH]

import crypto from 'crypto'
import calculateUserLevel from '../../../lib/calculateUserLevel';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import getGeoInfo from '../../../services/geoPlugin';
import logger from '../../../lib/log';

function getHash(string, key){
    var hmac = crypto.createHmac('md5', key);
    hmac.update(string); 
    return hmac.digest('hex'); 
};

export const GET = async(request) => {
    const searchParams = request.url.searchParams;
    logger.log(request.url, '/postbacks/adscend')

    if (!searchParams.get("u") ||
        !searchParams.get("ip") ||
        !searchParams.get("cid") ||
        !searchParams.get("oid") ||
        !searchParams.get("p") ||
        !searchParams.get("on") ||
        !searchParams.get("a") ||
        !searchParams.get("s") ||
        !searchParams.get("h")
    ) {
        return new Response("", { status: 404 });
    }

    const securityHash = getHash(`userid=${searchParams.get("u")}&amount=${searchParams.get("a")}&offerid=${searchParams.get("oid")}&conversionid=${searchParams.get("cid")}&payout=${searchParams.get("p")}&ip=${searchParams.get("ip")}&status=${searchParams.get("s")}`, 'z5WYEcHK9Kbkna46');
    if(securityHash.toString() != searchParams.get("h"))
        return new Response("", { status: 404 });

    const userId = searchParams.get("u").substr(6)
    const ip = searchParams.get("ip");
    const { country } = await getGeoInfo(ip)

    var user = await User.findOne({ _id: userId });
    if (user === null) return new Response("", { status: 404 });

    const tokens = parseFloat(searchParams.get("a"));

    const newOffer = new OfferDone({
        user,
        country,
        conversionId: searchParams.get("cid"),
        offerId: searchParams.get("oid"),
        payout: parseFloat(searchParams.get("p")),
        offerName: searchParams.get("on"),
        ip,
        tokens,
        wall: 7,
        status: searchParams.get("s") == 2 ? 0 : 1
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