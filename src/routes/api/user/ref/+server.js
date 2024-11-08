import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import sanitization from "$lib/sanitize_query";
import mongoose from "mongoose";
import User from "../../../../models/User.model.js";

export const POST = async(request) => {
    var data;

    try {
        data = await request.request.json();
        data = await sanitization.sanitize_query(data)
    } catch (e) {
        return response({
            success: false
        }, 400);
    }

    if (mustBeHere(data.ref)) return response({ success: false }, 400);
    if (data.ref.trim() === "") return response({ success: false, message: "Code can't be nothing" }, 400);

    if (!(await request.isAuthenticated())) return response({
        success: false,
        message: "You're not logged in"
    }, 401);

    var user = await request.getAuthenticatedUser();
    if (!user) {
        return response({
            success: false,
            message: "You're not logged in!"
        }, 401);
    }

    var exists = await User.findOne({
        customReferralCode: data.ref.toLowerCase().trim()
    });
    if (exists) {
        return response({
            success: false,
            message: "Referral code already exists!"
        }, 409);
    }

    if (mongoose.Types.ObjectId.isValid(data.ref.toLowerCase().trim())) {
        var exists = await User.findById(data.ref.toLowerCase().trim());
        if (exists) {
            return response({
                success: false,
                message: "Referral code already exists!"
            }, 409);
        }
    }

    user.customReferralCode = data.ref.toLowerCase().trim();
    await user.save();

    return response({
        success: true,
        message: "Referral code set"
    }, 200);
}