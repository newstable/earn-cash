import Offer from "../../../models/Offer.model";
import { NODE_ENV } from "$env/static/private";

const PubID = "20243";
const AppID = "8023";
const PRIVATE_KEY = "568472fbc1baa32e06ccaedf1196d9bc";

export const persistOffertoroLatestOffers = async (next, conversion) => {
  const response = await fetch(
    `http://www.offertoro.com/api/?pubid=${PubID}&appid=${AppID}&secretkey=${PRIVATE_KEY}`
  );
  const json = await response.json();

  var amount = 0;

  if (!json.response.offers) return amount;

  const offers = json.response.offers;
  for (var i = 0; i < offers.length; i++) {
    const offer = offers[i];
    // if (offer.category_id === 26) continue;
    if (offer.payout < 0.03) continue;

    try {
      Offer.create({
        title: offer.offer_name,
        description: offer.offer_desc,
        link: offer.offer_url
          .replace("[USER_ID]", "[USERIDHERE]")
          .replace("?tag=[tag]", ""),
        amount: offer.payout,
        tokens: offer.payout * conversion,
        category_name: "other",
        category_name_readable: "Other",
        campid: offer.offer_id,
        creative: offer.image_url,
        mobile_app: offer?.platform?.toLowerCase().includes("mobile"),
        mobile_app_type: offer.device.toLowerCase().includes("android")
          ? "android"
          : offer.name.toLowerCase().includes("ipad")
          ? "ipad"
          : "ios",
        conversion: offer.disclaimer,
        v: next,
        country: offer.countries,
        offerwall: "offertoro",
      });

      //   await o.save();
      amount++;
    } catch (err) {
      if (NODE_ENV === "development") {
        console.log("Error in inserting offertoro latest offers", err, offer);
      }
    }
  }

  return amount;
};
