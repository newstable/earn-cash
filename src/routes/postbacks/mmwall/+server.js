import calculateUserLevel from '../../../lib/calculateUserLevel';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import lookup from '../../../services/ip2country';

export const GET = async(request) => {
    const searchParams = request.url.searchParams;

    if (!searchParams.get("user_id") ||
        !searchParams.get("user_ip") ||
        !searchParams.get("transaction_id") ||
        !searchParams.get("offerid") ||
        !searchParams.get("payout") ||
        !searchParams.get("offername") ||
        !searchParams.get("amount")
    ) {
        return new Response("", { status: 404 });
    }

    const ip = searchParams.get("user_ip");
    const country = await lookup(ip);

    var user = await User.findOne({ _id: searchParams.get("user_id") });
    if (user === null) return new Response("", { status: 404 });

    const tokens = parseFloat(searchParams.get("amount"));

    const newOffer = new OfferDone({
        user,
        country,
        conversionId: searchParams.get("transaction_id"),
        offerId: parseInt(searchParams.get("offerid")),
        payout: parseFloat(searchParams.get("payout")),
        offerName: searchParams.get("offername"),
        ip,
        tokens,
        wall: 14,
        status: tokens < 0 ? 0 : 1
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
