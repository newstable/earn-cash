import { redirect } from "@sveltejs/kit";
import User from "../../../models/User.model";

export const GET = async (req, res) => {
  var user = await User.findOne({ ActivationKey: req.params.token });
  if (!user) {
    throw redirect(302, "/");
  }

  // const { ip } = JSON.parse(process.env.geoInfo)
  // const { ip } = {
  //     ip: request.request.headers.get("cf-connecting-ip"),
  //     country: request.request.headers.get("cf-ipcountry"),
  //   }

  user.emailConfirmed = true;
  user.rank = 1;
  user.verificationIp = ip;
  // user.ip = ip;
  user.ip = req.request.headers.get("cf-connecting-ip");
  await user.save();

  throw redirect(302, "/");
};
