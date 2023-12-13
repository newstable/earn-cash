import Offer from "../../../models/Offer.model";
import { NODE_ENV } from "$env/static/private";

const AFF_ID = "60813";
const API_KEY = "b55499f868330c3a5d659a153b3e51be";
const WALL_CODE = "n6-VsA";

// Android
// Downloads
// iPad
// iPhone
// Lead Gen
// Credit Card Required
// Mobile Subscription
// Surveys
// Videos
// CPC
// Pay Per Call
// Cash Back
// CPI
// CPE
// CPA

const TheirCategoryToOurCategory = {
  "Email Submits": "Sign Up",
  Downloads: "Sign Up",
  "": "Game",
  Android: "App",
  iPad: "App",
  iPhone: "App",
  "": "Deposit",
  "": "Crypto",
  "Credit Card Required": "Purchase",
  "Mobile Subscription": "Purchase",
  "Pay Per Call": "Purchase",
  "Cash Back": "Purchase",
  Free: "Free Trial",
  "": "Quiz",
  "": "Casino",
  Surveys: "Surveys",
  "Lead Gen": "Other",
  Videos: "Other",
  CPC: "Other",
  CPI: "Other",
  CPE: "Other",
  CPA: "Other",
};

const getOurCategory = (theirCategory) => {
  // their category is array of strings like ["Email Submits", "Free"];
  let actualCategory = "Other";

  for (let i = 0; i < theirCategory.length; i++) {
    const category = theirCategory[i];
    if (
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

export const persistAdgateLatestOffers = async (next, conversion) => {
  const response = await fetch(
    `https://api.adgatemedia.com/v3/offers?aff=${AFF_ID}&api_key=${API_KEY}&wall_code=${WALL_CODE}&paymin=0.03`
  );
  const data = await response.json();

  var amount = 0;

  if (data.status !== "success") return amount;

  const offersToInsert = [];

  for (var i = 0; i < data.data.length; i++) {
    const offer = data.data[i];
    const { category_name, category_name_readable } = getOurCategory(
      offer.categories
    );
    // if (offer.category_id === 26) continue;
    if (offer.payout < 0.03) continue;

    try {
      // Offer.create({
      //   title: offer.anchor,
      //   description: offer.description,
      //   link: offer.click_url + "[USERIDHERE]",
      //   amount: offer.epc,
      //   tokens: offer.epc * conversion,
      //   category_name,
      //   category_name_readable,
      //   campid: offer.id,
      //   creative: offer.creatives.icon,
      //   mobile_app:
      //     offer.name.toLowerCase().includes("app") ||
      //     offer.name.toLowerCase().includes("ios") ||
      //     offer.name.toLowerCase().includes("android") ||
      //     offer.name.toLowerCase().includes("ipad"),
      //   mobile_app_type: offer.name.toLowerCase().includes("android")
      //     ? "android"
      //     : offer.name.toLowerCase().includes("ipad")
      //     ? "ipad"
      //     : "ios",
      //   conversion: offer.requirements,
      //   v: next,
      //   country: offer.geo_targeting.countries.map(
      //     (country) => country.country_code
      //   ),
      //   offerwall: "adgate",
      // });
      offersToInsert.push({
        title: offer.anchor,
        description: offer.description,
        link: offer.click_url + "[USERIDHERE]",
        amount: offer.epc,
        tokens: offer.epc * conversion,
        category_name,
        category_name_readable,
        campid: offer.id,
        creative: offer.creatives.icon,
        mobile_app:
          offer.name.toLowerCase().includes("app") ||
          offer.name.toLowerCase().includes("ios") ||
          offer.name.toLowerCase().includes("android") ||
          offer.name.toLowerCase().includes("ipad"),
        mobile_app_type: offer.name.toLowerCase().includes("android")
          ? "android"
          : offer.name.toLowerCase().includes("ipad")
          ? "ipad"
          : "ios",
        conversion: offer.requirements,
        v: next,
        country: offer.geo_targeting.countries.map(
          (country) => country.country_code
        ),
        offerwall: "adgate",
      });

      //   await o.save();
      amount++;
    } catch (err) {
      // if (NODE_ENV === "development") {
      //   console.log("Error in inserting adgate latest offers", err, offer);
      // }
    }
  }

  try {
    const startTime = Date.now();
    await Offer.insertMany(offersToInsert);
    const endTime = Date.now();
    console.log(
      `[ADGATE] ${offersToInsert.length} offers in ${endTime - startTime} ms`
    );
  } catch (error) {
    console.log("Error in inserting adgate latest offers", err);
  }

  return amount;
};
