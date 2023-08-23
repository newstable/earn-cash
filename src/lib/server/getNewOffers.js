import Offer from "../../models/Offer.model";
import adscend from "./offers/adscend";
import lootably from "./offers/lootably";

const conversion = 30; // 30 tokens for 1$ earned

const runAndUpdate = async() => {
    var next = 1;
    const latest = await Offer.findOne().sort({ added: -1 });
    if (latest !== null) {
        next = latest.v + 1;
    }

    const amounts = await Promise.all([
        adscend(next, conversion),
        //lootably(next, conversion)
    ]);
    console.log(`Saved ${amounts.reduce((partialSum, a) => partialSum + a, 0)} new offers as ${next}`);

    if (next !== 1) {
        await Offer.deleteMany({
            v: { $lt: next - 1 }
        });
    }
}

var running = false;
var intervalId;

const getNewOffers = async() => {
    if (running) {
        clearInterval(intervalId);
    }

    await runAndUpdate();
    const id = setInterval(runAndUpdate, 60000 * 5);

    running = true;
    intervalId = id;
}

export default getNewOffers;