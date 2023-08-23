import response from "$lib/response";
import { verify } from "../../../../../lib/server/jwt.js";
import Reward from "../../../../../models/Reward.model.js";
import User from "../../../../../models/User.model.js";
import { Parser } from '@json2csv/plainjs';
import { Decimal128 } from "mongodb";

export const POST = async(request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    if (user.rank !== 3) return response({ success: false });

    const body = await request.request.json();

    var data = [
        ["amount", "recipient_name", "recipient_email"]
    ];

    for (var i = 0; i < body.length; i++) {
        const reward = await Reward.findById(body[i]);
        const rewardUser = await User.findById(reward.user);

        var rewardAmount = reward.tremendousUSDValue;
        if (typeof Decimal128 === typeof reward.tremendousUSDValue) {
            rewardAmount = reward.tremendousUSDValue.toNumber();
        }

        data.push([
            rewardAmount,
            rewardUser.username,
            rewardUser.email
        ]);
    }

    const parser = new Parser({ header: false });
    const csv = parser.parse(data);

    return new Response(csv, {
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": 'attachment; filename="data.csv"'
        }
    });
}