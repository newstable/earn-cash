import response from "$lib/response";
import Offer from "../../../models/Offer.model";

export const GET = async(request) => {
    const { country } = JSON.parse(process.env.geoInfo)

    const latestOffer = await Offer.find().sort({ _id: -1 }).limit(1);
    const v = latestOffer[0].v;

    var search = { country, v };
    const param = request.url.searchParams.get("categoryName");
    if (param !== null) {
        search["category_name_readable"] = param;
    }

    const offers = await Offer.find(search).select({
        title: 1,
        description: 1,
        link: 1,
        tokens: 1,
        creative: 1,
        mobile_app_type: 1,
        conversion: 1,
        v: 1
    });

    return response({
        success: true,
        offers
    });
}