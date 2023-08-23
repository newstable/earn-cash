import response from "$lib/response";
import FeaturedOffer from "../../../../models/FeaturedOffer.model";

export const GET = async(request) => {
    const user = await request.getAuthenticatedUser()
    const revuOffers = await FeaturedOffer.find({"country": { $elemMatch: { $eq: user.country } }})

    return response({
        success: true,
        revuOffers: revuOffers.map(e => {
            var clickUrl = e.clickURL
            if(clickUrl.includes("[USER_ID]"))
                clickUrl = clickUrl.replaceAll("[USER_ID]", user._id)
            else if(clickUrl.endsWith("=")){
                clickUrl = `${clickUrl}${user._id}`
            }
            return {
                name: e.name,
                image_url: e.iconURL,
                offer_url: clickUrl,
                description: e.description,
                currency_award: e.pointsPayout
            }
        })
    });
}