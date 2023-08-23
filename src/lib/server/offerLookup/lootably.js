import FeaturedOffer from "../../../models/FeaturedOffer.model";

const PlacementID = "ckrw6b5gd001z01wy2cre0uga"
const API_KEY = "w0n4d5i536dnjwk1jhzcl82embvrj9stygjj9nw5ioem"
const lootably = async (offerID, tutorial) => {
    try {
        const response = await fetch(`https://api.lootably.com/api/v1/offers/get?apiKey=${API_KEY}&placementID=${PlacementID}`);
        const data = await response.json();
    
        if (!data.success) return null;
    
        var offerData = data.data.find(o=>o.offerID == offerID)
        if(!offerData) return null;
        
        const IOS_DEVICES = ["iphone", "ipad", "iphone_Ipad"]
        const newOffer = new FeaturedOffer({
            offerID,
            wall: 2,
            country: offerData.countries,
            name: offerData.name,
            anchor: offerData.name,
            description: offerData.description,
            clickURL: offerData.link,
            iconURL: offerData.image,
            tutorial,
            isIOS: IOS_DEVICES.some(d=>offerData.devices.includes(d)),
            isAndroid: offerData.devices.includes("android"),
            payout: offerData.revenue,
            pointsPayout: offerData.revenue * 70,
        })
        return newOffer
    } catch(e) {
        return null;
    }
}


export default lootably;