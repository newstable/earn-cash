import { error } from '@sveltejs/kit';
import { isValidObjectId } from 'mongoose';
import OfferDone from '../../../models/OfferDone.model';
import User from '../../../models/User.model';
import getCountryName from '../../../services/iso2country';

export const load = async(req) => {
    const userid = req.params.userid;

    if (!isValidObjectId(userid)) {
        throw error(404, {
            message: "Not found"
        });
    }

    const user = await User.findOne({ _id: userid });
    if (!user) {
        throw error(404, {
            message: "Not found"
        });
    }

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
        countryFull: getCountryName(user.country)
    };
}