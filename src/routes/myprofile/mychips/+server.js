import calculateUserLevel from '../../../lib/calculateUserLevel';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import lookup from '../../../services/ip2country';

export const GET = async(request) => {
    const searchParams = request.url.searchParams;

    // Check if all required parameters are present in the request
    if (!searchParams.get("user_id") ||
        !searchParams.get("session_ip") ||
        !searchParams.get("conversion_id") ||
        !searchParams.get("offerid") ||
        !searchParams.get("payout") ||
        !searchParams.get("offername") ||
        !searchParams.get("amount") ||
        !searchParams.get("campaign_id") ||
        !searchParams.get("event_name")
    ) {
        // If any required parameter is missing, return 404 status
        return new Response("", { status: 404 });
    }

    // Extract necessary parameters from the request
    const ip = searchParams.get("session_ip");
    const country = await lookup(ip);

    // Find user by user_id
    var user = await User.findOne({ _id: searchParams.get("user_id") });
    if (user === null) return new Response("", { status: 404 });

    // Parse amount from string to float
    const tokens = parseFloat(searchParams.get("amount"));
    const payout = parseFloat(searchParams.get("payout"));
    const conversionId = searchParams.get("conversion_id");
    const offerId = parseInt(searchParams.get("offerid"));
    const offerName = searchParams.get("offername");
    const campaignId = searchParams.get("campaign_id");
    const eventName = searchParams.get("event_name");

    // Create a new OfferDone object with extracted data
    const newOffer = new OfferDone({
        user,
        country,
        conversionId,
        offerId,
        payout,
        offerName,
        ip,
        tokens,
        campaignId,
        eventName,
        wall: 14,
        status: tokens < 0 ? 0 : 1
    });
    await newOffer.save();

    // Update user data
    user.lastPaidSurvey = Date.now();
    user.paidSurveyCount += 1;
    user.points += tokens;
    user.level = calculateUserLevel(user.points);
    await user.save();

    // If user has a referrer, calculate and update referral earnings
    if (user.refBy) {
        var refUser = await User.findOne({ _id: user.refBy });
        const commissionPercentage = await getCommision(refUser);
        const commission = Math.round(tokens * commissionPercentage);

        refUser.points += commission;
        refUser.pointsByRef += commission;
        await refUser.save();

        // Update OfferDone object with referrer information
        newOffer.ref = refUser;
        await newOffer.save();

        // Create a new RefEarning object to record referral earnings
        const refEarning = new RefEarning({
            earner: user,
            master: refUser,
            offerDone: newOffer,
            points: tokens,
            pointsForRef: commission,
            commissionPercentage: commissionPercentage
        });
        await refEarning.save();

        // Update user's earnedForRef field
        user.earnedForRef += commission;
        user.save();
    }

    // Return 200 status to indicate successful processing of the request
    return new Response("", { status: 200 });
}