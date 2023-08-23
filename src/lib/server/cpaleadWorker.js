import Offer from "../../models/Offer.model";

var running = false;
var intervalId;

const getAndUpdate = async() => {
    const response = await fetch("https://cpalead.com/dashboard/reports/campaign_json.php?id=688501");
    const data = await response.json();

    if (data.status !== "success") return;

    var next = 1;
    const latest = await Offer.findOne().sort({ added: -1 });
    if (latest !== null) {
        next = latest.v + 1;
    }

    for (var i = 0; i < data.offers.length; i++) {
        const o = data.offers[i];

        const offer = new Offer({
            title: o.title,
            description: o.description,
            link: o.link.split("&subid2=&subid3=&gaid=&idfa=")[0] + "[USERIDHERE]",
            amount: parseFloat(o.amount),
            tokens: parseInt(parseFloat(o.amount) * 30 * 100) / 100,
            payout_currency: o.payout_currency,
            payout_type: o.payout_type,
            category_name: o.category_name,
            category_name_readable: {
                "email_submit": "Email Signup",
                "pin_submit": "Phone Signup",
                "app_install": "App",
                "trial": "Free Trial",
                "purchase": "Purchase",
                "download": "Download",
                "mobile": "Mobile"
            }[o.category_name],
            traffic_type: o.traffic_type,
            campid: o.campid,
            country: o.country.split(":"),
            rank: o.rank,
            epc: parseFloat(o.epc),
            ratio: parseFloat(o.ratio),
            creative: o.creatives[0] ? o.creatives[0].url : "",
            preview: o.previews[0] ? o.previews[0].url : "",
            preview_url: o.preview_url,
            mobile_app: o.mobile_app !== 0,
            mobile_app_type: o.mobile_app_type,
            mobile_app_id: o.mobile_app_id,
            mobile_app_minimum_version: o.mobile_app_minimum_version,
            mobile_app_icon_url: o.mobile_app_icon_url,
            button_text: o.button_text,
            conversion: o.conversion,
            v: next
        });
        offer.save();
    }

    console.log(`Saved ${data.offers.length} new offers as ${next}`);

    if (next !== 1) {
        await Offer.deleteMany({
            v: { $lt: next - 1 }
        });
    }
}

const cpalead = async() => {
    if (running) {
        clearInterval(intervalId);
    }

    getAndUpdate();
    const id = setInterval(getAndUpdate, 300000);

    running = true;
    intervalId = id;
}

export default cpalead;