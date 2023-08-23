// /postbacks/cpx?u={user_id}&a={amount_local}&oid={offer_ID}&cid={trans_id}&p={amount_usd}&on=CPX%20Research%20Survey&ip={ip_click}&h={secure_hash}&s={status}

import md5 from 'md5'
import calculateUserLevel from '../../../lib/calculateUserLevel';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import getGeoInfo from '../../../services/geoPlugin';

export const GET = async(request) => {
    const searchParams = request.url.searchParams;

    if (!searchParams.get("u") ||
        !searchParams.get("ip") ||
        !searchParams.get("cid") ||
        !searchParams.get("oid") ||
        !searchParams.get("p") ||
        !searchParams.get("on") ||
        !searchParams.get("a") ||
        !searchParams.get("h") ||
        !searchParams.get("s")
    ) {
        return new Response("", { status: 404 });
    }

    if(searchParams.get("h") != md5(`${searchParams.get("cid")}-IEkTxFVB7fgOyRnAb9ZQeDpfEWg3Gubg`))
        return new Response("", { status: 404 });

    const ip = searchParams.get("ip");
    const { country } = await getGeoInfo(ip)

    var user = await User.findOne({ _id: searchParams.get("u") });
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
        wall: 8,
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