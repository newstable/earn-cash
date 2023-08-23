import Offer from "../../../../models/Offer.model";

import response from "$lib/response";

// TODO: Remove "US" hard code
export const GET = async(request) => {
    const { country } = JSON.parse(process.env.geoInfo)

    const latestOffer = await Offer.find().sort({ _id: -1 }).limit(1);
    const v = latestOffer[0].v;

    const offers = await Offer.find({ v }).distinct("category_name_readable");

    var categories = [];
    var total = 0;
    for (var i = 0; i < offers.length; i++) {
        const offer = offers[i];
        const count = await Offer.countDocuments({
            category_name_readable: offer,
            country,
            v
        });

        categories.push({
            name: offer,
            count
        });

        total += count;
    }

    return response({
        success: true,
        categories,
        total
    });
}