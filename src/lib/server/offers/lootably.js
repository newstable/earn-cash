import Offer from "../../../models/Offer.model";
import { NODE_ENV } from "$env/static/private";

const categories = {
  app: {
    a: "app",
    b: "App",
  },
  survey: {
    a: "surveys",
    b: "Surveys",
  },
  signup: {
    a: "sign-up",
    b: "Sign Up",
  },
  video: {
    a: "other",
    b: "Other",
  },
  quiz: {
    a: "game",
    b: "Game",
  },
  freetrial: {
    a: "free-trial",
    b: "Free Trial",
  },
};

export const persistLootablyLatestOffers = async (next, conversion) => {
  const response = await fetch(
    "https://api.lootably.com/api/v1/offers/get?apiKey=w0n4d5i536dnjwk1jhzcl82embvrj9stygjj9nw5ioem&placementID=ckrw6b5gd001z01wy2cre0uga&categories=app,survey,signup,video,quiz,freetrial"
  );
  const data = await response.json();

  if (!data.success) return 0;

  var amount = 0;
  for (var i = 0; i < data.data.length; i++) {
    const offer = data.data[i];

    if (offer.revenue === "variable") return;
    if (offer.revenue < 0.03) continue;

    try {
      const o = new Offer({
        title: offer.name,
        description: offer.description,
        link: offer.link.replace("{userID}", "[USERIDHERE]"),
        amount: offer.revenue,
        tokens: offer.revenue * conversion,
        category_name: categories[offer.categories[0]].a,
        category_name_readable: categories[offer.categories[0]].b,
        campid: offer.offerID,
        creative: offer.image,
        mobile_app:
          offer.devices.includes("ipad") ||
          offer.devices.includes("iphone") ||
          offer.devices.includes("android"),
        mobile_app_type: offer.devices.includes("android")
          ? "android"
          : offer.devices.includes("ipad")
          ? "ipad"
          : "ios",
        v: next,
        country: offer.countries,
        offerwall: "lootably",
      });

      await o.save();
      amount++;
    } catch (err) {
      if (NODE_ENV === "development") {
        console.log("Error in inserting lootably's latest offers", err, offer);
      }
    }
  }

  return amount;
};

export default persistLootablyLatestOffers;

// idk if this is working
// TODO: check
