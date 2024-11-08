import response from "$lib/response";
import OfferDone from "../../../../models/OfferDone.model.js";
import User from "../../../../models/User.model.js";

export const GET = async(_request) => {
    const offers = await OfferDone.find({ tokens: { $gt: 0 } }).sort({ date: -1 }).limit(20);

    var returnAble = [];
    for (var i = 0; i < offers.length; i++) {
        const offer = offers[i];

        const wall = [
            "",
            "ayet studios",
            "",
            "offertoro",
            "adgem",
            "Revenue Universe",
            "adgate",
            "",
            "",
            "bitlabs",
            "inbrain",
            "notik",
            "monlix",
            "timewall",
			"mmwall",
            "adtowall",
            "mychips"
        ][offer.wall];

        try {
            const user = await User.findById(offer.user);

            returnAble.push({
                tokens: offer.tokens,
                wall,
                username: user.username,
                picture: user.picture,
                date: offer.date,
            });
        } catch(e) {

        }
    }

    return response({
        offers: returnAble
    });
}