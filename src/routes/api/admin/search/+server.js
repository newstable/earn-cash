import response from "$lib/response";
import mongoose from "mongoose";
import { verify } from "../../../../lib/server/jwt";
import User from "../../../../models/User.model";

const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

export const POST = async(request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    if (user.rank !== 3) return response({ success: false });

    var page = 1;
    var limit = 15;

    const data = await request.request.json();
    
    if (typeof data.page !== "undefined") page = data.page;
    if (typeof data.limit !== "undefined") limit = data.limit;

    const Model = mongoose.models[capitalizeFirstLetter(data.model)];
    const total = await Model.countDocuments(data.searchData);
    var answers;
    if (limit > 0)
        answers = await Model.find(data.searchData).skip((page - 1) * 15).limit(limit);
    else
        answers = await Model.find(data.searchData);

    return response({
        success: true,
        total,
        answers
    });
}