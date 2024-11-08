import response from "$lib/response";
import Rewards from "../../../../models/Reward.model.js";
import User from "../../../../models/User.model.js";

export const GET = async (_request) => {
    const page = parseInt(_request.url.searchParams.get("page"));
    const limit = parseInt(_request.url.searchParams.get("limit"));

    const skipInde = (page - 1) * limit;
    const rewards = await Rewards.find({ processing: 1 }).sort({ date: -1 }).skip(skipInde).limit(limit).exec();

    var returnAble = [];
    try {
        for (var i = 0; i < rewards.length; i++) {
            const reward = rewards[i];
            const user = await User.findById(reward.user);

            returnAble.push({
                tokens: reward.reward,
                username: user ? user.username : "Deleted User",
                picture: user ? user.picture : false,
                wall: reward.type,
                date: reward.date
            })
        }
        return response({
            rewards: returnAble
        });
    } catch (error) {
        console.log("Get Completed Withdrawals Error:", error.message);
    }
}