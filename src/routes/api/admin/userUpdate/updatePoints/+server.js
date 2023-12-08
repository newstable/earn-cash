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

    if (mustBeHere(data.points)) return response({ success: false }, 400);
    if (data.points === 0) return response({ success: false, message: "Point shouldn't be zero." }, 400);

    const user = await User.findById(data.userId);
    data.points > 0 ? user.addedPoints += data.points : user.removedPoints -= data.points;

    await user.save();

    return response({
        success: true,
        message: "Points updated"
    }, 200);
}