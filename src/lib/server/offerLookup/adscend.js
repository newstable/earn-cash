import FeaturedOffer from "../../../models/FeaturedOffer.model";

const PubID = '115580'
const adscend = async (offerID, tutorial) => {
    try {
        const response = await fetch(`https://api.adscendmedia.com/v1/publisher/${PubID}/offers.json`, {
            headers: {
                "authorization": "Basic MTE1NTgwOjE2MDg1NTYwMzY="
            }
        });
        const data = await response.json();
    
        if (typeof data.offers === "undefined" || !data.offers.length) return null;

        var offerData = data.offers.find(o=>o.offer_id == offerID)
        if(!offerData) return null;
        
        const IOS_DEVICES = [0, 50, 51, 52]
        const ANDROID_DEVICES = [0, 40, 56]
        const newOffer = new FeaturedOffer({
            offerID,
            wall: 7,
            country: offerData.countries,
            name: offerData.name,
            anchor: offerData.adwall_name,
            description: offerData.description,
            requirements: offerData.adwall_description,
            clickURL: offerData.click_url,
            iconURL: offerData.creatives?.length? offerData.creatives[0].url: '',
            tutorial,
            isIOS: IOS_DEVICES.includes(offerData.target_system),
            isAndroid: ANDROID_DEVICES.includes(offerData.target_system),
            payout: offerData.payout,
            pointsPayout: offerData.payout * 70,
        })
        return newOffer
    } catch(e) {
        return null
    }
}

export default adscend;