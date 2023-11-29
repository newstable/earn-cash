import calculateUserLevel from '../../../lib/calculateUserLevel';
import getCommision from '../../../lib/server/getCommision';
import OfferDone from '../../../models/OfferDone.model';
import RefEarning from '../../../models/RefEarning.model';
import User from '../../../models/User.model';
import lookup from '../../../services/ip2country';

// Discord Webhook URL
const discordWebhookUrl = 'https://discord.com/api/webhooks/1133519353338396773/lxfTbiQyoYYXx5ClC_TF093uWR_PGEvv3QmNyvnBligfJM8qhnPiN6bilqSQoqox1fcG';

export const GET = async(request) => {
    const searchParams = request.url.searchParams;

    // Initialize an empty error log array
    const errorLog = [];

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
        errorLog.push("Missing required parameters.");
        sendErrorToDiscord(errorLog.join('\n')); // Send error to Discord
        return new Response("", { status: 404 });
    }

    // Validate the secret key (optional if not needed)
    if (searchParams.get("secret") !== "DANIELISAHOTTIEEE") {
        errorLog.push("Invalid secret key.");
        sendErrorToDiscord(errorLog.join('\n')); // Send error to Discord
        return new Response("", { status: 404 });
    }

    // Extract the requested parameters and status
    const requestedParams = [
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
        "event_name"
    ];

    const paramsToSend = {};
    requestedParams.forEach(param => {
        paramsToSend[param] = searchParams.get(param);
    });

    // Extract the status (0 for chargeback, 1 for successful)
    const status = paramsToSend.amount < 0 ? 0 : 1;

    // Send the requested parameters and status to the Discord webhook
    sendToDiscord(paramsToSend, status);

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
    let tokens = amount; // Initialize tokens with the positive amount

    if (isChargeback) {
        // For chargebacks, tokens should be negative
        tokens = -Math.abs(amount);
    }

    // Find the user by ID
    var user = await User.findOne({ _id: userId });
    if (user === null) {
        errorLog.push("User not found.");
        sendErrorToDiscord(errorLog.join('\n')); // Send error to Discord
        return new Response("", { status: 404 });
    }

    // Create a new OfferDone document and save it to the database
    const newOffer = new OfferDone({
        user,
        date: new Date(),
        country,
        conversionId: conversionId.toString(),
        offerId: offerId.toString(),
        payout: payout, // Keep payout as is, it can be negative for chargebacks
        offerName,
        ip,
        tokens,
        wall: 12,
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

// Function to send error message to Discord webhook
async function sendToDiscord(params, status) {
    try {
        // Add the status to the parameters
        params.status = status;

        const payload = {
            content: JSON.stringify(params),
        };

        await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Error sending message to Discord webhook:", error);
    }
}