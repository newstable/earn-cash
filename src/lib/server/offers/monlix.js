import Offer from "../../../models/Offer.model";
import { NODE_ENV } from "$env/static/private";

const APP_ID = "1915";
const TOKEN = "da9a30a60184a9adfb9cac24502bb5a5";

const TheirCategoryToOurCategory = {
  "": "Sign Up",
  games: "Game",
  download: "App",
  "ios app": "App",
  android: "App",
  iPhone: "App",
  iPad: "App",
  "": "Deposit",
  "": "Crypto",
  "": "Purchase",
  Free: "Free Trial",
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

export const persistMonlixLatestOffers = async (next, conversion) => {
  const response = await fetch(
    `https://api.monlix.com/api/static?appid=${APP_ID}&token=${TOKEN}`
  );
  const data = await response.json();

  var amount = 0;

  // monlix returns total param in response as number of offers
  // if offer count is 0 or for some error there is no field as data.total
  // we return
  if (!data.total) return amount;

  const offers = data.campaigns;

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
        description: offer.description,
        link: offer.url.replace("{{userid}}", "[USERIDHERE]"),
        amount: offer.payout,
        tokens: offer.payout * conversion,
        category_name,
        category_name_readable,
        campid: offer.id,
        creative: offer.image,
        mobile_app:
          offer.name.toLowerCase().includes("app") ||
          offer.name.toLowerCase().includes("ios") ||
          offer.name.toLowerCase().includes("android") ||
          offer.name.toLowerCase().includes("ipad"),
        mobile_app_type: offer?.oss || offer.os,
        conversion: offer.description,
        v: next,
        country: offer.countries,
        offerwall: "monlix",
      });

      //   await o.save();
      amount++;
    } catch (err) {
      if (NODE_ENV === "development") {
        console.log("Error in inserting monlix's latest offers", err, offer);
      }
    }
  }

  return amount;
};
