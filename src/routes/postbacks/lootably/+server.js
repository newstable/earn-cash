// /postbacks/lootably?userID={userID}&conversionID={transactionID}&ip={ip}&offerName={offerName}&offerID={offerID}&payout={revenue}&amount={currencyReward}&hash={hash}

import fetch from "node-fetch";
import crypto from "crypto";
import mongoose from "mongoose";
import calculateUserLevel from "../../../lib/calculateUserLevel";
import OfferDone from "../../../models/OfferDone.model";
import User from "../../../models/User.model";
import getGeoInfo from "../../../services/geoPlugin";
import logger from "../../../lib/log";

function genSHA256Hash(input) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}

const private_key =
  "p0w33sWUQnZYpO9RFn5PGph9V16WXQqYFTugRhj7Qwj5SozqoHOhQVMNTUUhMK08GxR4JLSjZUY9rHRTNVA";
export const GET = async (request) => {
  const searchParams = request.url.searchParams;
  logger.log(request.url, "/postbacks/lootably");

  const requiredParams = [
    "userID",
    "ip",
    "conversionID",
    "offerID",
    "payout",
    "offerName",
    "amount",
    "hash",
  ];

  for (const param of requiredParams) {
    if (!searchParams.get(param)) {
      return new Response(`Missing ${param}`, { status: 400 });
    }
  }

  if (
    searchParams.get("hash") !=
    genSHA256Hash(
      `${searchParams.get("userID")}${searchParams.get("ip")}${searchParams.get(
        "payout"
      )}${searchParams.get("amount")}${private_key}`
    )
  )
    return new Response("Sign verification failed", { status: 400 });

  const ip = searchParams.get("ip");
  const { country } = await getGeoInfo(ip);

  //   const ip = request.request.headers.get("cf-connecting-ip");
  //   const country = request.request.headers.get("cf-ipcountry");

  try {
    // Convert userID to ObjectId
    const userId = new mongoose.Types.ObjectId(searchParams.get("userID"));

    // Find the user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const tokens = parseFloat(searchParams.get("amount"));

    // Make API request to get offers
    /*const apiKey = "w0n4d5i536dnjwk1jhzcl82embvrj9stygjj9nw5ioem"; // Your API key
        const placementID = "ckrw6b5gd001z01wy2cre0uga"; // Your placement ID
        const apiUrl = `https://api.lootably.com/api/v1/offers/get?apiKey=${apiKey}&placementID=${placementID}`;
        
        let offersData = [];
        try {
            const response = await fetch(apiUrl);
            const responseData = await response.json();
            if (responseData.success) {
                offersData = responseData.data;
            } else {
                console.error("Error fetching offers:", responseData.message);
            }
        } catch (error) {
            console.error("Error fetching offers:", error);
        }*/

    const newOffer = new OfferDone({
      user,
      country,
      conversionId: searchParams.get("conversionID"),
      offerId: searchParams.get("offerID"),
      payout: parseFloat(searchParams.get("payout")),
      offerName: searchParams.get("offerName"),
      ip,
      tokens,
      wall: 2,
      status: tokens < 0 ? 0 : 1,
    });
    await newOffer.save();

    user.lastPaidSurvey = Date.now();
    user.paidSurveyCount += 1;
    user.points += tokens;
    user.level = calculateUserLevel(user.points);
    await user.save();

    return new Response("1", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("0", { status: 500 });
  }
};
