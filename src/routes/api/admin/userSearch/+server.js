import response from "$lib/response";
import isNumber from "../../../../lib/isNumber.js";
import { verify } from '../../../../lib/server/jwt.js';
import User from '../../../../models/User.model.js';

export const POST = async(request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    if (user.rank !== 3) return response({ success: false });

    const query = (await request.request.json()).query;
    if (typeof query === "undefined") return response({ success: false });

    var queries = [{
            usernameLowercase: {
                $regex: ".*" + query.toLowerCase().replace('.', "\.").replace("\\", "\\\\").replace('+', "\+") + ".*"
            }
        },
        {
            email: {
                $regex: ".*" + query.toLowerCase().replace('.', "\.").replace("\\", "\\\\").replace('+', "\+") + ".*"
            }
        }
    ]

    if (isNumber(query)) {
        queries.push({
            discordId: query
        });
    }

    const users = await User.find({ $or: queries }, { username: 1, picture: 1, points: 1, cashedOut: 1 });

    return response({
        success: true,
        users
    });
}