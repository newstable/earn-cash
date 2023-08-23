import response from "$lib/response";
import User from "../../../../models/User.model.js";

export const GET = async(request) => {
    if (!(await request.isAuthenticated())) return response({
        success: false,
        message: "You're not logged in"
    }, 401);

    var user = await request.getAuthenticatedUser();
    if (user === false) {
        return response({
            success: false,
            message: "You're not logged in@!"
        }, 401);
    }

    var page = parseInt(request.url.searchParams.get("page"));
    if (isNaN(page)) page = 1;

    const affiliates = await User.find({ refBy: user }, {
        _id: 0,
        username: 1,
        earnedForRef: 1,
        paidSurveyCount: 1,
        points: 1
    }).sort({ earnedForRef: 1 }).skip((page * 10) - 10).limit(10);

    const total = await User.countDocuments({ refBy: user });

    return response({
        success: true,
        data: affiliates,
        totalPages: Math.ceil(total / 10)
    });
}