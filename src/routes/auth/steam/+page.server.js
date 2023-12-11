import { redirect } from "@sveltejs/kit";
import doLogin from "../../../lib/server/doLogin.js";
import steam from "../../../lib/server/steam.js";
import User from "../../../models/User.model.js";

export const load = async (req) => {
  if (req.url.search.length < 50) {
    const redirectUrl = await steam.getRedirectUrl();
    throw redirect(302, redirectUrl);
  }

  req.method = "GET";
  req.url = req.url.href;
  const steamUser = await steam.authenticate(req);

  // const { ip, country } = JSON.parse(process.env.geoInfo)
  const ip = req.request.headers.get("cf-connecting-ip");
  const country = req.request.headers.get("cf-ipcountry");

  var user = await User.findOne({
    OAuthProvider: "steam",
    OAuthUID: steamUser.steamid,
  });

  if (!user) {
    user = new User({
      username: steamUser.username,
      usernameLowercase: steamUser.username.toLowerCase(),
      firstName: steamUser.name,
      emailConfirmed: true,
      registerIp: ip,
      ip,
      registerCountry: country,
      country,
      OAuthProvider: "steam",
      OAuthUID: steamUser.steamid,
      picture: steamUser.avatar.large,
    });
  } else {
    user.ip = ip;
    user.lastActive = Date.now();
  }

  await user.save();

  return {
    token: doLogin(user._id),
  };
};
