import Offer from "../../models/Offer.model";
import { persistAdgateLatestOffers } from "./offers/adgate";
import adscend from "./offers/adscend";
import lootably from "./offers/lootably";
import { persistMonlixLatestOffers } from "./offers/monlix";
import { persistNotikLatestOffers } from "./offers/notik";
import { persistOffertoroLatestOffers } from "./offers/offertoro";

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
    //lootably(next, conversion)
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
  // call the run and update function every 5 minutes
  // to update our db to have latest offers from offerwalls
  // * uncomment this
  const id = setInterval(runAndUpdate, 1000 * 60 * 5);
  // 60000 * 5

  running = true;
  // * uncomment this
  intervalId = id;
};

export default getNewOffers;
