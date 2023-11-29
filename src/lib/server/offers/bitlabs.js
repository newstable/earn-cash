import Offer from "../../../models/Offer.model";
import { NODE_ENV } from "$env/static/private";

const S2S_TOKEN = "8e15e6d4-2b36-4e65-b101-b6e327657be4";

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

export const persistBitlabsLatestOffers = async (next, conversion) => {
  const response = await fetch(
    `https://api.bitlabs.ai/v2/publishers/offers?limit=200&skip=0`,
    {
      headers: {
        "X-S2S-Token": S2S_TOKEN,
        accept: "application/json",
      },
    }
  );
  const data = await response.json();

  // console.log(data, "bitlabs");

  var amount = 0;

  if (data.status !== "success") return amount;

  const offers = data.data.offers;

  for (var i = 0; i < offers.length; i++) {
    const offer = offers[i];
    const { category_name, category_name_readable } = getOurCategory(
      offer.categories
    );
    // if (offer.category_id === 26) continue;
    if (offer.epc < 0.03) continue;

    try {
      Offer.create({
        title: offer.anchor,
        description: offer.description,
        link: offer.click_url + "[USERIDHERE]",
        amount: Number(offer.epc),
        tokens: Number(offer.epc) * conversion,
        category_name,
        category_name_readable,
        campid: offer.id,
        creative: offer.icon,
        mobile_app: offer.device_targeting.platforms.some(
          (el) =>
            el.name.toLowerCase() === "smartphone" ||
            el.name.toLowerCase() === "tablet"
        ),
        mobile_app_type: offer.device_targeting.operating_systems.some(
          (el) => el.name === "android"
        )
          ? "android"
          : offer.device_targeting.operating_systems.some(
              (el) => el.name.toLowerCase() === "ipad"
            )
          ? "ipad"
          : "ios",
        conversion: offer.requirements,
        v: next,
        country: offer.geo_targeting.countries.map(
          (country) => country.country_code
        ),
        offerwall: "bitlabs",
      });

      //   await o.save();
      amount++;
    } catch (err) {
      if (NODE_ENV === "development") {
        console.log("Error in inserting bitlabs latest offers", err, offer);
      }
    }
  }

  return amount;
};
