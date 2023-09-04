import response from "$lib/response";
import { verify } from '../../../../lib/server/jwt.js';
import Reward from '../../../../models/Reward.model.js';
import User from '../../../../models/User.model.js';

export const GET = async(request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    // TODO: if (user.rank !== 3) return response({ success: false });

    var page = 1;
    var pageText = request.url.searchParams.get("page");

    if (pageText !== null) {
        if (typeof pageText !== "string") return response({ success: false });
        if (isNaN(pageText) || isNaN(parseFloat(pageText))) return response({ success: false });

        page = parseInt(pageText);
    }

    var search = {};

    var type = request.url.searchParams.get("type");
    if (type !== null) search["type"] = type;

    var hold = request.url.searchParams.get("hold");
    if (hold !== null) search["hold"] = hold;
    else search["hold"] = 0;

    var sent = request.url.searchParams.get("sent");
    if (sent !== null)
        if (sent.toString() === "1") search["sentDate"] = { $exists: true };
        else search["sentDate"] = { $exists: false };

    const count = await Reward.countDocuments(search);
    const Rewards = await Reward.find(search).sort({ _id: -1 }).skip((page - 1) * 32).limit(32);

    var rewards = [];
    for (var i = 0; i < Rewards.length; i++) {
        let user = await User.findById(Rewards[i].user);
        if(user != null) {
            rewards.push({
                reward: Rewards[i],
                user: user
            });
        }
    }

    return response({
        success: true,
        data: rewards,
        total: count
    });
}