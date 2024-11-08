import response from "$lib/response";
import { verify } from '../../../../lib/server/jwt.js';
import OfferDone from '../../../../models/OfferDone.model.js';
import User from '../../../../models/User.model.js';
import C2ISO from '../../../../services/country2iso.js'
import fs from 'fs';

const walls = {
    1: "Ayet Studios",
    2: "Lootably",
    3: "OfferToro",
    4: "AdGem",
    5: "Revenue Universe",
    6: "AdGate",
    7: "Adscend",
    8: "CPX Research",
    9: "BitLabs",
    10: "Inbrain",
    11: "Monlix",
    12: "Notik",
    13: "Timewall",
    14: "MM WALL",
    15: "adtowall",
    16: "mychips"
};
function getOfferWallNumber(offerWallName) {
    const walls = {
        "Ayet Studios": 1,
        "Lootably": 2,
        "OfferToro": 3,
        "AdGem": 4,
        "Revenue Universe": 5,
        "AdGate": 6,
        "Adscend": 7,
        "CPX Research": 8,
        "BitLabs": 9,
        "Inbrain": 10,
        "Monlix": 11,
        "Notik": 12,
        "Timewall": 13,
        "MM WALL": 14,
        "adtowall": 15,
        "mychips": 16
    };

    const matchedWall = Object.keys(walls).find(wall => wall.toLowerCase().includes(offerWallName.toLowerCase()));
    return matchedWall ? walls[matchedWall] : null;
}

function getCountryCode(country) {
    if (!country || country.length <= 2) return null;
    const matches = Object.keys(C2ISO).filter(wall => 
        wall.toLowerCase().includes(country.toLowerCase())
    );

    return matches.length > 0 ? matches.map(match => C2ISO[match]) : null; 
}

export const GET = async (request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    if (user.rank !== 3) return response({ success: false });

    var page = 1;
    var pageText = request.url.searchParams.get("page");

    if (pageText !== null) {
        if (typeof pageText !== "string") return response({ success: false });
        if (isNaN(pageText) || isNaN(parseFloat(pageText))) return response({ success: false });

        page = parseInt(pageText);
    }

    const searchText = request.url.searchParams.get("searchText");
    const query = {};

    if (searchText) {
        const offerWallNumber = getOfferWallNumber(searchText);
        const countryCode = getCountryCode(searchText);
        
        if (offerWallNumber !== null) {
            query["$or"] = [{ "wall": offerWallNumber }];
        } else if (countryCode !== null) {
            if (Array.isArray(countryCode) && countryCode.length > 0) {
                query["$or"] = countryCode.map(code => ({ "country": code }));
            } else {
                query["$or"] = [{ "country": countryCode }];
            }
        } else {
            const regex = new RegExp(searchText, "i");
            query["$or"] = [
                { "offerId": { $regex: regex } },
                { "offerName": { $regex: regex } },
            ];
        }
    }

    const offersPerPage = 32;

    let offersDone;

    if (searchText) {
        offersDone = await OfferDone.find(query);
    } else {
        offersDone = await OfferDone.find();
    }

    const offer_stats = {};

    for (const offer of offersDone) {
        const offer_id = offer.offerId;
        const offer_name = offer.offerName || "Unknown";
        const offer_wall_number = offer.wall;
        const country = offer.country || "Unknown";
        const status = offer.status;
        const tokens = offer.tokens;
        const offer_wall_name = walls[offer_wall_number] || "Unknown";
        const key = [offer_name, offer_wall_name, country].join('_');

        if (!(key in offer_stats)) {
            offer_stats[key] = {
                offer_name: offer_name,
                offer_wall: offer_wall_name,
                country: country,
                completions: 0,
                chargebacks: 0,
                total_tokens: 0,
                offer_id: 0,
                average_points: 0
            };
        }

        if (status === 1) {
            offer_stats[key].completions += 1;
            offer_stats[key].total_tokens += tokens;
            if (offer_stats[key].offer_id === 0) {
                offer_stats[key].offer_id = offer_id || 0;
            }
        }
        else if (status === 0) {
            offer_stats[key].chargebacks += 1;
        }
    }

    for (const key in offer_stats) {
        const completions = offer_stats[key].completions;
        const chargebacks = offer_stats[key].chargebacks;
        if (chargebacks > completions) {
            offer_stats[key].chargebacks = completions;
        }
    }

    for (const key in offer_stats) {
        const completions = offer_stats[key].completions;
        if (completions > 0) {
            const chargeback_rate = Math.min((offer_stats[key].chargebacks / completions) * 100, 100);
            const average_points = offer_stats[key].total_tokens / completions;
            offer_stats[key].chargeback_rate = parseFloat(chargeback_rate.toFixed(2));
            offer_stats[key].average_points = parseFloat(average_points.toFixed(2));
        } else {
            offer_stats[key].chargeback_rate = 0;
            offer_stats[key].average_points = 0;
        }
    }

    let sorted_offer_stats = Object.values(offer_stats);
    sorted_offer_stats = sorted_offer_stats.sort((a, b) => b.completions - a.completions);

    const startIndex = (page - 1) * offersPerPage;
    const endIndex = startIndex + offersPerPage;
    const paginatedStats = sorted_offer_stats.slice(startIndex, endIndex);

    return response({
        success: true,
        data: paginatedStats,
        total: sorted_offer_stats.length
    });
}