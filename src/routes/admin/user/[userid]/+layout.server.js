import mongoose from "mongoose";
import OfferDone from "../../../../models/OfferDone.model.js";
import User from "../../../../models/User.model.js";
import RefEarning from "../../../../models/RefEarning.model.js";
import Reward from "../../../../models/Reward.model.js";

export const load = async (request) => {
  const userId = request.params.userid;
  const userPromise = User.findById(userId);

  const payoutCountPromise = OfferDone.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: null,
        payoutCount: {
          $sum: "$payout",
        },
      },
    },
  ]);

  const offerdonesPromise = OfferDone.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$user", total: { $sum: "$tokens" } } },
  ]);

  const payoutsPromise = OfferDone.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$user", total: { $sum: "$payout" } } },
  ]);

  const referralearningsPromise = RefEarning.aggregate([
    { $match: { master: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$master", total: { $sum: "$pointsForRef" } } },
  ]);
  // console.log(offerdones);

  const cashoutsPromise = Reward.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$user", total: { $sum: "$price" } } },
  ]);

  const [user, payoutCount, offerdones, referralearnings, cashouts, payouts] =
    await Promise.all([
      userPromise,
      payoutCountPromise,
      offerdonesPromise,
      referralearningsPromise,
      cashoutsPromise,
      payoutsPromise,
    ]);

  //   console.log(payoutCount, "this");

  return {
    user: JSON.parse(JSON.stringify(user)),
    payout: payoutCount?.[0]?.payoutCount || 0,
    offerdones: offerdones?.[0]?.total || 0,
    referralearnings: referralearnings?.[0]?.total || 0,
    cashouts: cashouts?.[0]?.total || 0,
    payouts: payouts?.[0]?.total * 100 || 0,
  };
};
