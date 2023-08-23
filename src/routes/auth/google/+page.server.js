import { redirect } from "@sveltejs/kit";
import { generateAuthUrl } from "svelte-google-auth/server";
import doLogin from "../../../lib/server/doLogin";
import User from "../../../models/User.model";

export const load = async (req) => {
  const { locals, url } = req;

  if (typeof locals.user === "undefined") {
    throw redirect(
      302,
      generateAuthUrl(locals, url, ["openid", "profile", "email"], url.pathname)
    );
  }

  var user = await User.findOne({ email: locals.user.email.toLowerCase() });
  const { ip } = JSON.parse(process.env.geoInfo)
  if (user === null) {
    user = new User({
      username: locals.user.name,
      usernameLowercase: locals.user.name.toLowerCase(),
      firstName: locals.user.given_name,
      lastName: locals.user.family_name,
      email: locals.user.email.toLowerCase(),
      emailConfirmed: true,
      registerIp: ip,
      ip,
      registerCountry: locals.user.locale.toUpperCase(),
      country: locals.user.locale.toUpperCase(),
      OAuthProvider: "google",
      OAuthUID: locals.user.sub,
      picture: locals.user.picture,
    });
    await user.save();

    return {
      token: doLogin(user._id),
    };
  }

  user.firstName = locals.user.given_name;
  user.lastName = locals.user.family_name;
  user.emailConfirmed = true;
  user.ip = ip;
  user.lastActive = Date.now();
  user.OAuthProvider = "google";
  user.OAuthUID = locals.user.sub;
  user.picture = locals.user.picture;
  await user.save();

  return {
    token: doLogin(user._id),
  };
};
