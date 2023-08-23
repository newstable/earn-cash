import FeaturedOffer from "../../../models/FeaturedOffer.model";

const AFF = "60813"
const API_KEY = "b55499f868330c3a5d659a153b3e51be"
const WALL_CODE = "n6-VsA"
const adgate = async (offerID, tutorial) => {
    try {
        const response = await fetch(`https://api.adgatemedia.com/v3/offers?aff=${AFF}&api_key=${API_KEY}&wall_code=${WALL_CODE}&offer=${offerID}`);
        const data = await response.json();
    
        if (data.data.length === 0) return null;
    
        const o = data.data[0];
        const countries = o.geo_targeting.countries.map(c => c.country_code);
        const platforms = o.device_targeting.platforms?.map(d => d.name) || []
        const os = o.device_targeting.operating_systems?.map(d => d.name) || []
        
        const newOffer = new FeaturedOffer({
            offerID,
            wall: 6,
            country: countries,
            name: o.name,
            anchor: o.anchor,
            description: o.description,
            requirements: o.requirements,
            clickURL: o.click_url,
            iconURL: o.creatives.icon,
            tutorial,
            isIOS: platforms.includes("smartphone") && (!os.length || os.includes("ios")),
            isAndroid: platforms.includes("smartphone") && (!os.length || os.includes("android")),
            payout: o.events[0].payout,
            pointsPayout: o.events[0].payout * 70,
        })
        return newOffer
    } catch(e) {
        return null
    }
}

export default adgate;