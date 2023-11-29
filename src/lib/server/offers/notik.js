import Offer from "../../../models/Offer.model";
import { NODE_ENV } from "$env/static/private";

const API_KEY = "0nppFUgJObiHsbYm1INxmvENmod98EuF";
const PUB_ID = "riHlIe";
const APP_ID = "ReY37rkNzq";

const TheirCategoryToOurCategory = {
  "": "Sign Up",
  "": "Game",
  Offers: "App",
  "": "Deposit",
  "": "Crypto",
  "": "Purchase",
  "": "Free Trial",
  "": "Quiz",
  "": "Casino",
  Surveys: "Surveys",
  "": "Other",
};

const getOurCategory = (theirCategory) => {
  // their category is array of strings like ["Email Submits", "Free"];
  let actualCategory = "Other";

  for (let i = 0; i < theirCategory.length; i++) {
    const category = theirCategory[i];
    if (
      // if there's a mapping for this category and it's not "Other"
      // means we convert thier category to a category that we can map into ours
      TheirCategoryToOurCategory[category] &&
      TheirCategoryToOurCategory[category] !== "Other"
    ) {
      actualCategory = TheirCategoryToOurCategory[category];
    }
  }

  return {
    category_name: actualCategory.toLowerCase().replace(" ", "-"),
    category_name_readable: actualCategory,
  };
};

export const persistNotikLatestOffers = async (next, conversion) => {
  const response = await fetch(
    `https://notik.me/api/v2/get-offers/all?api_key=${API_KEY}&pub_id=${PUB_ID}&app_id=${APP_ID}`
  );
  const data = await response.json();

  var amount = 0;

  if (data.status !== "success") return amount;

  const offers = data.offers.data;

  for (var i = 0; i < offers.length; i++) {
    const offer = offers[i];
    const { category_name, category_name_readable } = getOurCategory(
      offer.categories
    );
    // if (offer.category_id === 26) continue;
    if (offer.payout < 0.03) continue;

    try {
      Offer.create({
        title: offer.name,
        description: offer.description2,
        link: offer.click_url.replace("[user_id]", "[USERIDHERE]"),
        amount: offer.payout,
        tokens: offer.payout * conversion,
        category_name,
        category_name_readable,
        campid: offer.offer_id,
        creative: offer.image_url,
        mobile_app:
          offer.devices.includes("mobile") || offer.devices.includes("tablet"),
        mobile_app_type: offer.os.includes("android")
          ? "android"
          : offer.os.includes("ipad")
          ? "ipad"
          : "ios",
        conversion: offer.description1,
        v: next,
        country: offer.country_code,
        offerwall: "notik",
      });

      //   await o.save();
      amount++;
    } catch (err) {
      if (NODE_ENV === "development") {
        console.log("Error in inserting notik's latest offers", err, offer);
      }
    }
  }

  return amount;
};
