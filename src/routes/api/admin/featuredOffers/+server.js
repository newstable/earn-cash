import response from "$lib/response";
import { verify } from '../../../../lib/server/jwt.js';
import adgate from "../../../../lib/server/offerLookup/adgate.js";
import adscend from "../../../../lib/server/offerLookup/adscend.js";
import ayet from "../../../../lib/server/offerLookup/ayet.js";
import lootably from "../../../../lib/server/offerLookup/lootably.js";
import offertoro from "../../../../lib/server/offerLookup/offertoro.js";
import User from "../../../../models/User.model.js";

export const POST = async(request) => {
    try {
        const token = request.cookies.get("token");
        if (typeof token === "undefined")
            return response({ success: false, message: 'Failed by invalid token' });
    
        const tokenV = verify(token);
        if (!tokenV.success)
            return response({ success: false, message: 'Failed by invalid token' });
    
        const user = await User.findOne({ _id: tokenV.data.body.uid });
        if (user === null)
            return response({ success: false, message: 'Failed by invalid user' });
        if (user.rank !== 3)
            return response({ success: false, message: 'No authority for this action' });
    
        const { offerId, offerWall, tutorial } = await request.request.json();
    
        var newOffer = null;
        switch (offerWall) {
            case "ayet":
                // newOffer = await ayet(offerId) // check api
                break;
            case "lootably":
                newOffer = await lootably(offerId, tutorial);
                break;
            case "offertoro":
                newOffer = await offertoro(offerId, tutorial);
                break;
            case "adgem":
                // TODO: actually implement this, account was disabled
                break;
            case "adgate":
                newOffer = await adgate(offerId, tutorial);
                break;
            case "adscend":
                newOffer = await adscend(offerId, tutorial);
                break;
        }
        if(!newOffer)
            return response({ success: false, message: 'No offer data found' });
    
        await newOffer.save()
        return response({
            success: true
        });
    } catch(e) {
        return response({
            success: false,
            message: 'Failed adding offer'
        });
    }
}