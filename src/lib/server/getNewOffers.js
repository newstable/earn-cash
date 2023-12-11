import Offer from "../../models/Offer.model";
import { persistAdgateLatestOffers } from "./offers/adgate";
import adscend from "./offers/adscend";
import { persistBitlabsLatestOffers } from "./offers/bitlabs";
import lootably, { persistLootablyLatestOffers } from "./offers/lootably";
import { persistMonlixLatestOffers } from "./offers/monlix";
import { persistNotikLatestOffers } from "./offers/notik";
import { persistOffertoroLatestOffers } from "./offers/offertoro";
import { NODE_ENV } from "$env/static/private";

const conversion = 30; // 30 tokens for 1$ earned

const runAndUpdate = async () => {
  console.log("running and updating");
  var next = 1;
  const latest = await Offer.findOne().sort({ v: -1 });
  if (latest !== null) {
    next = latest.v + 1;
  }

  const amounts = await Promise.all([
    adscend(next, conversion),
    persistAdgateLatestOffers(next, conversion),
    persistOffertoroLatestOffers(next, conversion),
    persistNotikLatestOffers(next, conversion),
    persistMonlixLatestOffers(next, conversion),
    persistBitlabsLatestOffers(next, conversion),
    persistLootablyLatestOffers(next, conversion),
    lootably(next, conversion),
  ]);

  console.log(
    `Saved ${amounts.reduce(
      (partialSum, a) => partialSum + a,
      0
    )} new offers as ${next} at: ${new Date()}`
  );

  if (next !== 1) {
    await Offer.deleteMany({
      v: { $lt: next },
    });
  }
};

var running = false;
var intervalId;

const getNewOffers = async () => {
  // console.log("called");
  if (running) {
    clearInterval(intervalId);
  }

  await runAndUpdate();
  // call the run and update function every 15 minutes
  // to update our db to have latest offers from offerwalls
  // * uncomment this
  // if (NODE_ENV === "staging") {
  const id = setInterval(runAndUpdate, 1000 * 60 * 15);
  intervalId = id;
  // }

  running = true;
};

export default getNewOffers;
