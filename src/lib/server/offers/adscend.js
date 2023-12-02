import Offer from "../../../models/Offer.model";
import { NODE_ENV } from "$env/static/private";

const username = "115580";
const password = "1608556036";

const categories = {
  17: {
    a: "free-trial",
    b: "Free Trial",
  },
  18: {
    a: "app",
    b: "App",
  },
  19: {
    a: "other",
    b: "Other",
  },
  20: {
    a: "surveys",
    b: "Surveys",
  },
  21: {
    a: "purchase",
    b: "Purchase",
  },
  22: {
    a: "free-trial",
    b: "Free Trial",
  },
  23: {
    a: "app",
    b: "App",
  },
  24: {
    a: "sign-up",
    b: "Sign Up",
  },
  25: {
    a: "purchase",
    b: "Purchase",
  },
};

const adscend = async (next, conversion) => {
  const response = await fetch(
    "https://api.adscendmedia.com/v1/publisher/115580/offers.json",
    {
      headers: {
        Authorization:
          "Basic " + Buffer.from(username + ":" + password).toString("base64"),
      },
    }
  );
  const data = await response.json();

  //   console.log(data);

  var amount = 0;
  for (var i = 0; i < data.offers.length; i++) {
    const offer = data.offers[i];
    if (offer.category_id === 26) continue;
    if (offer.payout < 0.03) continue;

    try {
      const o = new Offer({
        title: offer.name,
        description: offer.adwall_description,
        link: offer.click_url + "&sub1=[USERIDHERE]",
        amount: offer.payout,
        tokens: offer.payout * conversion,
        category_name: categories[offer.category_id]?.a || "other",
        category_name_readable: categories[offer.category_id]?.b || "Other",
        campid: offer.offer_id,
        creative: offer.creatives[0].url,
        mobile_app:
          offer.name.toLowerCase().includes("app") ||
          offer.name.toLowerCase().includes("ios") ||
          offer.name.toLowerCase().includes("ipad"),
        mobile_app_type: offer.name.toLowerCase().includes("android")
          ? "android"
          : offer.name.toLowerCase().includes("ipad")
          ? "ipad"
          : "ios",
        conversion: offer.conversion_notes,
        v: next,
        country: offer.countries,
        offerwall: "adscend",
      });

      await o.save();
      amount++;
    } catch (err) {
      if (NODE_ENV === "development") {
        console.log("Error in inserting adscends latest offers", err, offer);
      }
    }
  }

  return amount;
};

export default adscend;

// Adscend is weird, categorizing not working and stuff
// TODO: categorize right
