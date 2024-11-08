import response from "$lib/response";
import FeaturedOffer from "../../../../models/FeaturedOffer.model";

export const GET = async (request) => {
  const user = await request.getAuthenticatedUser();
  // const revuOffers = await FeaturedOffer.find({
  //   country: { $elemMatch: { $eq: user.country } },
  // });

  const revuOffers = await FeaturedOffer.find();

  console.log(revuOffers);

  return response({
    success: true,
    revuOffers: revuOffers.map((e) => {
      var clickUrl = e.clickURL;

      // Check if the URL contains "s1="
      if (clickUrl.includes("s1=")) {
        // Replace "s1=" with "s1=user._id"
        clickUrl = clickUrl.replace("s1=", "s1=" + user._id);
      }

      // Replace {userID} with user._id
      clickUrl = clickUrl.replaceAll("{userID}", user._id);
      // Replace [USER_ID] with user._id
      clickUrl = clickUrl.replaceAll("[USER_ID]", user._id);

      return {
        name: e.name,
        image_url: e.iconURL,
        offer_url: clickUrl,
        description: e.description,
        currency_award: e.pointsPayout,
      };
    }),
  });
};
