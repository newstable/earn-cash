import { verify } from '../../lib/server/jwt';
import OfferDone from '../../models/OfferDone.model';
import Reward from '../../models/Reward.model';
import User from '../../models/User.model';
import getCountryName from '../../services/iso2country';

export const load = async(request) => {
    const token = request.cookies.get("token");

    if (typeof token !== "string") {
        return {};
    }

    const data = verify(token);
    if (!data.success) {
        return {};
    }

    const user = await User.findOne({ _id: data.data.body.uid });

    const offersDone = await OfferDone.find({ user });
    var totalEarnings = 0;
    var totalEarnings30Days = 0;

    const activities = offersDone.map(offer => {
        totalEarnings += offer.tokens;
        if (Math.ceil(Math.abs(Date.now() - offer.date) / (1000 * 60 * 60 * 24))) {
            totalEarnings30Days += offer.tokens;
        }

        return {
            name: offer.offerName,
            time: offer.date,
            reward: offer.tokens
        }
    });

    const rewards = await Reward.find({ user });
    const withdrawals = rewards.map(reward => {
        return {
            reward: reward.reward,
            price: reward.price,
            processing: reward.processing,
            hold: reward.hold,
            revoked: reward.revoked,
            date: reward.date,
            id: reward._id.toString()
        }
    });

    return {
        username: user.username,
        picture: user.picture,
        level: user.level,
        offersCompleted: user.paidSurveyCount,
        usersReferred: await User.countDocuments({ refBy: user }),
        totalEarnings,
        totalEarnings30Days,
        activities,
        country: user.country,
        countryFull: getCountryName(user.country),
        withdrawals
    };
}