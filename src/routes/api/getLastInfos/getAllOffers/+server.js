import response from "$lib/response";
import OfferDone from "../../../../models/OfferDone.model.js";
import User from "../../../../models/User.model.js";

export const GET = async (_request) => {
    const page = parseInt(_request.url.searchParams.get("page"));
    const limit = parseInt(_request.url.searchParams.get("limit"));

    const skipInde = (page - 1) * limit;

    try {
        const offers = await OfferDone.find().sort({ date: -1 }).skip(skipInde).limit(limit).exec();
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
            const user = await User.findById(offer.user);
            returnAble.push({
                tokens: offer.tokens,
                wall,
                username: user ? user.username : 'Deleted User',
                picture: user ? user.picture : false,
                date: offer.date
            });
        }
        const totalOffers = offers.length;
        return response({
            offers: returnAble,
            totalOffers
        });

    } catch (error) {
        console.log(error.message);
        return response({
            error: "Something went wrong"
        });
    }
}