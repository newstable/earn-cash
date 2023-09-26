import calculateUserLevel from '../../../lib/calculateUserLevel';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import lookup from '../../../services/ip2country';

export const GET = async(request) => {
    const searchParams = request.url.searchParams;

    // Validate the required postback parameters
    const requiredParams = [
        "pub_id",
        "app_id",
        "user_id",
        "s1",
        "amount",
        "payout",
        "offer_id",
        "offer_name",
        "currency_name",
        "timestamp",
        "hash",
        "txn_id",
        "conversion_ip",
        "rewarded_txn_id",
        "event_id",
        "event_name",
        "secret" // You can remove this if the "secret" is no longer required
    ];

    if (!requiredParams.every(param => searchParams.has(param))) {
        return new Response("", { status: 404 });
    }

    // Validate the secret key (optional if not needed)
    if (searchParams.get("secret") !== "DANIELISAHOTTIEEE") {
        return new Response("", { status: 404 });
    }

    const ip = searchParams.get("conversion_ip");
    const country = await lookup(ip);

    const userId = searchParams.get("user_id");
    const conversionId = parseInt(searchParams.get("cid"));
    const offerId = parseInt(searchParams.get("oid"));
    const payout = parseFloat(searchParams.get("payout"));
    const offerName = searchParams.get("offer_name");
    const amount = parseFloat(searchParams.get("amount"));

    // Check if this is a chargeback (payout and amount are negative)
    const isChargeback = payout < 0 && amount < 0;

    // Calculate the amount based on your conversion rate settings
    const tokens = isChargeback ? -amount : amount;

    // Find the user by ID
    var user = await User.findOne({ _id: userId });
    if (user === null) {
        return new Response("", { status: 404 });
    }

    // Create a new OfferDone document and save it to the database
    const newOffer = new OfferDone({
        user,
        date: new Date(),
        country,
        conversionId: conversionId.toString(),
        offerId: offerId.toString(),
        payout,
        offerName,
        ip,
        tokens,
        wall: 4,
        status: tokens < 0 ? 0 : 1
    });
    await newOffer.save();

    // Update user information
    user.lastPaidSurvey = Date.now();
    user.paidSurveyCount += 1;
    user.points += tokens;
    user.level = calculateUserLevel(user.points);
    await user.save();

    // Handle referral commission if applicable
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

    // Respond with a 200 status code to indicate successful receipt of the postback
    return new Response("OK", { status: 200 });
}
