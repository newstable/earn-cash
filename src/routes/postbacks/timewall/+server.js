import calculateUserLevel from '../../../lib/calculateUserLevel';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import crypto from 'crypto';

export const GET = async (request) => {
    const searchParams = request.url.searchParams;

    if (
        !searchParams.get("userID") ||
        !searchParams.get("transactionID") ||
        !searchParams.get("revenue") ||
        !searchParams.get("currencyAmount") ||
        !searchParams.get("hash")
    ) {
        return new Response("", { status: 404 });
    }

    const secretKey = "7a4a2194ff60541b23eb9c465cce99b0"; // Replace with your actual secret key

    const receivedHash = searchParams.get("hash");
    const expectedHash = crypto
        .createHash("sha256")
        .update(
            searchParams.get("userID") +
            searchParams.get("revenue") +
            secretKey
        )
        .digest("hex");

    if (receivedHash !== expectedHash) {
        return new Response("", { status: 403 }); // Unauthorized
    }

    const user = await User.findOne({ _id: searchParams.get("userID") });
    if (user === null) return new Response("", { status: 404 });

    const tokens = parseFloat(searchParams.get("revenue"));

    const newOffer = new OfferDone({
        user,
        country: "",
        conversionId: searchParams.get("transactionID"),
        payout: parseFloat(searchParams.get("revenue")),
        ip: "",
        tokens,
        wall: 9,
        status: tokens < 0 ? 0 : 1,
    });
    await newOffer.save();

    user.lastPaidSurvey = Date.now();
    user.paidSurveyCount += 1;
    user.points += tokens;
    user.level = calculateUserLevel(user.points);
    await user.save();

    if (user.refBy) {
        const refUser = await User.findOne({ _id: user.refBy });
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
            commissionPercentage: commissionPercentage,
        });
        await refEarning.save();

        user.earnedForRef += commission;
        user.save();
    }

    return new Response("", { status: 200 });
};
