import { json } from "@sveltejs/kit";
import Reward from "../../../../../models/Reward.model.js";
import User from "../../../../../models/User.model.js";

export const load = async (request) => {
  const userid = request.params.userid;
  // console.log(userid);

  const user = await User.findById(userid);

  const getHolds = await Reward.find({ user }).sort({ date: -1 });

  // console.log(getHolds, "getHOld");
  return {
    holds: JSON.parse(JSON.stringify(getHolds)),
  };
};
