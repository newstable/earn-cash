import Offer from "../../../models/Offer.model";

const categories = {
  app: {
    a: "app_install",
    b: "App",
  },
  survey: {
    a: "surveys",
    b: "Surveys",
  },
  signup: {
    a: "email_submit",
    b: "Email Signup",
  },
  video: {
    a: "videos",
    b: "Videos",
  },
  quiz: {
    a: "quiz",
    b: "Quiz",
  },
  freetrial: {
    a: "trial",
    b: "Trial",
  },
};

const lootably = async (next, conversion) => {
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
        link: offer.click_url.replace("{userID}", "[USERIDHERE]"),
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
    } catch (err) {}
  }

  return amount;
};

export default lootably;

// idk if this is working
// TODO: check
