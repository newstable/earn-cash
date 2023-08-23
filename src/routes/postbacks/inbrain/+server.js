// /postbacks/inbrain?status=[1/0]

import crypto from 'crypto';
import calculateUserLevel from '../../../lib/calculateUserLevel';
import OfferDone from '../../../models/OfferDone.model';
import User from '../../../models/User.model';
import getCommision from '../../../lib/server/getCommision';
import RefEarning from '../../../models/RefEarning.model';
import logger from '../../../lib/log';

const CallbackSecret = "MzI0YzNmYzEtNzE3My00ZDlmLWJkMGYtN2JiNzc0Mzc3ZGZj";

export const POST = async(request) => {
    var data;
    try {
        data = await request.request.json()
    } catch (e) {
        return new Response("", { status: 404 });
    }
    logger.log(JSON.stringify(data), '/postbacks/inbrain')

    if (typeof data.PanelistId === "undefined" ||
        typeof data.RewardId === "undefined" ||
        typeof data.Reward === "undefined" ||
        typeof data.RevenueAmount === "undefined" ||
        typeof data.Sig === "undefined"
    ) return new Response("", { status: 404 });

    if (data.Sig !=
        crypto.createHash("md5").update(data.PanelistId + data.RewardId + CallbackSecret).digest("hex").toString()
    ) return new Response("", { status: 404 });

    try {
        var user = await User.findOne({ _id: data.PanelistId });
        if (user === null) return new Response("", { status: 404 });

        const tokens = parseFloat(data.Reward);

        const newOffer = new OfferDone({
            user,
            country: "",
            conversionId: data.RewardId,
            offerId: "",
            payout: data.RevenueAmount,
            offerName: "",
            ip: "",
            tokens,
            wall: 10,
            status: request.url.searchParams.get('status')
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
    } catch {
        return new Response("", { status: 404 });
    }
}