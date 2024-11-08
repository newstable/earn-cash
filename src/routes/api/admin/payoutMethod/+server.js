import response from "$lib/response";
import mongoose from "mongoose";
import { verify } from "../../../../lib/server/jwt";
import PayoutMethod from "../../../../models/PayoutMethod.model";
import User from "../../../../models/User.model";

export const POST = async(request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    if (user.rank !== 3) return response({ success: false });

    const data = await request.request.json();
    const method = new PayoutMethod(data);
    method.save();

    return response({
        success: true
    });
}