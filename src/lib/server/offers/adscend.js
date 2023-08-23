import Offer from "../../../models/Offer.model";

const username = "115580";
const password = "1608556036";

const categories = {
    17: {
        a: "free",
        b: "Free"
    },
    18: {
        a: "app_install",
        b: "App"
    },
    19: {
        a: "videos",
        b: "Videos"
    },
    20: {
        a: "surveys",
        b: "Surveys"
    },
    21: {
        a: "purchase",
        b: "Purchase"
    },
    22: {
        a: "trial",
        b: "Trial"
    },
    23: {
        a: "download",
        b: "Downloads"
    },
    24: {
        a: "email_submit",
        b: "Email Signup"
    },
    25: {
        a: "subscription",
        b: "Subscription"
    }
}

const adscend = async(next, conversion) => {
    const response = await fetch("https://api.adscendmedia.com/v1/publisher/115580/offers.json", {
        headers: {
            "Authorization": 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
        }
    });
    const data = await response.json();

    var amount = 0;
    for (var i = 0; i < data.offers.length; i++) {
        const offer = data.offers[i];
        if (offer.category_id === 26) continue;
        if (offer.payout < 0.03) continue;

        try {
            const o = new Offer({
                title: offer.name,
                description: offer.adwall_description,
                link: offer.click_url + "&subid1=[USERIDHERE]",
                amount: offer.payout,
                tokens: offer.payout * conversion,
                category_name: categories[offer.category_id].a,
                category_name_readable: categories[offer.category_id].b,
                campid: offer.offer_id,
                creative: offer.creatives[0].url,
                mobile_app: (offer.name.toLowerCase().includes("app") || offer.name.toLowerCase().includes("ios") || offer.name.toLowerCase().includes("ipad")),
                mobile_app_type: offer.name.toLowerCase().includes("android") ? "android" : offer.name.toLowerCase().includes("ipad") ? "ipad" : "ios",
                conversion: offer.conversion_notes,
                v: next,
                country: offer.countries
            });

            await o.save();
            amount++;
        } catch (err) {}
    }

    return amount;
}

export default adscend;

// Adscend is weird, categorizing not working and stuff
// TODO: categorize right