import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import User from "../../../../../models/User.model.js";

export const PATCH = async(request) => {
    var data;

    try {
        data = await request.request.json();
    } catch (e) {
        return response({
            success: false
        }, 400);
    }

    if (mustBeHere(data.rate)) return response({ success: false }, 400);

    const user = await User.findById(data.userId);
    user.customCommissionRate = data.rate;

    await user.save();

    return response({
        success: true,
        message: "Rate changed"
    }, 200);
}