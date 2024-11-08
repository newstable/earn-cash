import Reward from '../../../models/Reward.model.js'
import User from '../../../models/User.model.js';

export const load = async (request) => {
    var userid = 1;

    const token = request.cookies.get("token");
    if (token) {
        const rawData = JSON.parse(atob(token.split(".")[1]));
        userid = rawData["uid"];
    }

    if (userid == 1) {
        return {
            minimum: 100
        }
    }

    const user = await User.findById(userid);
    const payoutPrev = await Reward.countDocuments({ user, type: "ROBUX" });

    if (payoutPrev === 0) {
        return {
            minimum: 100
        }
    }

    return {
        minimum: 100
    }
}