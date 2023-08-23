import Reward from '../../../../../models/Reward.model.js';
import User from '../../../../../models/User.model.js';

export const load = async(request) => {
    const userid = request.params.userid;
    const user = await User.findById(userid);

    const rawReward = await Reward.find({ user });
    var rewards = [];

    for (var i = 0; i < rawReward.length; i++) {
        const r = rawReward[i];
        var reward = {};

        if (r.type === "crypto") {
            reward.code = r.info;
            reward.reward = r.reward;
            reward.price = r.price;
            reward.purchased = r.date;
            reward.sent = r.sentDate;
        } else {
            reward.code = r.code;
            reward.reward = r.reward;
            reward.price = r.price;
            reward.purchased = r.date;
            reward.sent = r.sentDate;
        }

        rewards.push(reward);
    }

    return {
        rewards
    }
}