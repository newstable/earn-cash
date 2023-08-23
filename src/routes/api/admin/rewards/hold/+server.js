import response from "$lib/response";
import email from "../../../../../lib/server/email.js";
import { verify } from "../../../../../lib/server/jwt.js";
import Reward from "../../../../../models/Reward.model.js";
import User from "../../../../../models/User.model.js";

export const PATCH = async(request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    if (user.rank !== 3) return response({ success: false });

    const { rewardId, changes } = await request.request.json();
    var reward = await Reward.findById(rewardId);
    var holding = null;
    var sent = false;

    for (var i = 0; i < changes.length; i++) {
        const change = changes[i];
        const changeName = Object.keys(change)[0];
        reward[changeName] = change[changeName];

        if (changeName === "hold") holding = change[changeName];
        if (changeName === "sentDate") sent = true;
    }

    await reward.save();

    if (holding !== null) {
        const rewardUser = await User.findById(reward.user);

        if (holding === 1)
            await email.sendHoldRewardEmail(rewardUser.email, rewardUser.username, reward.reward);
        else if (holding === 0)
            await email.sendReleasedRewardEmail(rewardUser.email, rewardUser.username, reward.reward);
    }

    if (sent) {
        const rewardUser = await User.findById(reward.user);

        await email.sendPurchaseDeliveredEmail(rewardUser.email, rewardUser.username, reward._id, reward.reward, "");
    }

    return response({ success: true });
}