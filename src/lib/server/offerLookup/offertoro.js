import FeaturedOffer from "../../../models/FeaturedOffer.model";

const PubID = "20243"
const AppID = "8023"
const PRIVATE_KEY = "568472fbc1baa32e06ccaedf1196d9bc"
const offertoro = async (offerID, tutorial) => {
    try {
        const response = await fetch(`http://www.offertoro.com/api/?pubid=${PubID}&appid=${AppID}&secretkey=${PRIVATE_KEY}`);
        const data = await response.json();
    
        if (typeof data.response === "undefined" || !data.response.offers?.length) return null;

        var offerData = data.response.offers.find(o=>o.offer_id == offerID)
        if(!offerData) return null;
        
        const IOS_DEVICES = ["iphone", "ipad"]
        const newOffer = new FeaturedOffer({
            offerID,
            wall: 3,
            country: offerData.countries,
            name: offerData.offer_name,
            anchor: offerData.offer_name,
            description: offerData.offer_desc,
            requirements: offerData.call_to_action,
            clickURL: offerData.offer_url,
            iconURL: offerData.image_url,
            tutorial,
            isIOS: IOS_DEVICES.includes(offerData.device),
            isAndroid: offerData.device == "android",
            payout: offerData.payout,
            pointsPayout: offerData.payout * 70,
        })
        return newOffer
    } catch(e) {
        return null
    }
}

export default offertoro;