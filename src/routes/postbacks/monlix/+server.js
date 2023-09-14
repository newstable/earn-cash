import calculateUserLevel from '../../../lib/calculateUserLevel';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import getGeoInfo from '../../../services/geoPlugin';

export const GET = async (request) => {
    const searchParams = request.url.searchParams;

    // Check if all required parameters are present
    const requiredParams = ["userId", "userIp", "countryCode", "secretKey", "taskName", "transactionId", "rewardValue", "payout", "status"];
    if (requiredParams.some(param => !searchParams.get(param))) {
        return new Response("", { status: 404 });
    }

    // Validate the secret key
    if (searchParams.get("secretKey") !== "d50661e43f05c7edd7a18b36144561a22ad0c99ec7a3549155ffc8ae2f74a8d7") {
        return new Response("", { status: 404 });
    }

    const userId = searchParams.get("userId");
    const userIp = searchParams.get("userIp");
    const countryCode = searchParams.get("countryCode");
    const status = parseInt(searchParams.get("status"));

    const ip = userIp;
    const { country } = await getGeoInfo(ip);

    var user = await User.findOne({ _id: userId });
    if (user === null) return new Response("", { status: 404 });

    const tokens = parseFloat(searchParams.get("rewardValue"));

    const newOffer = new OfferDone({
        user: userId, // Pass userId here
        country,
        conversionId: searchParams.get("transactionId"),
        offerId: searchParams.get("taskName"),
        payout: parseFloat(searchParams.get("payout")),
        offerName: searchParams.get("taskName"),
        ip,
        tokens,
        wall: 4,
        status: status === 1 ? 1 : 0, // Map status 1 to 1 and all others to 0
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
            earner: userId, // Pass userId here
            master: refUser,
            offerDone: newOffer,
            points: tokens,
            pointsForRef: commission,
            commissionPercentage: commissionPercentage,
        });
        await refEarning.save();

        user.earnedForRef += commission;
        user.save();
    }

    return new Response("OK", { status: 200 });
};
