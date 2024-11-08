import response from "$lib/response";
import { verify } from '../../../../lib/server/jwt.js';
import OfferDone from '../../../../models/OfferDone.model.js';
import User from '../../../../models/User.model.js';

export const GET = async(request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    if (user.rank !== 3) return response({ success: false });

    var page = 1;
    var pageText = request.url.searchParams.get("page");

    if (pageText !== null) {
        if (typeof pageText !== "string") return response({ success: false });
        if (isNaN(pageText) || isNaN(parseFloat(pageText))) return response({ success: false });

        page = parseInt(pageText);
    }

    const offersDoneCount = await OfferDone.countDocuments();
    const offersDone = await OfferDone.find().sort({ _id: -1 }).skip((page - 1) * 32).limit(32);

    var earnings = [];
    for (var i = 0; i < offersDone.length; i++) {
        earnings.push({
            offerDone: offersDone[i],
            user: await User.findById(offersDone[i].user)
        });
    }


    return response({
        success: true,
        data: earnings,
        total: offersDoneCount
    });
}