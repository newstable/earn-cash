import { SvelteGoogleAuthHook } from "svelte-google-auth/server";
import mongoose from "mongoose";

import { verify } from "./lib/server/jwt";
import Featured from "./models/Featured.model";
import Offer from "./models/Offer.model";
import OfferDone from "./models/OfferDone.model";
import PayoutMethod from "./models/PayoutMethod.model";
import Reward from "./models/Reward.model";
import User from "./models/User.model";
import WallBan from "./models/WallBan.model";
import getNewOffers from "./lib/server/getNewOffers";

import {
  MONGODB_CONNECTION,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "$env/static/private";
import { PUBLIC_GEO_URL } from "$env/static/public";
import email from "./lib/server/email";
import { NODE_ENV } from "$env/static/private";

mongoose.connect(MONGODB_CONNECTION).then(() => console.log("connected db"));

// // console.log("Database connected!");

(async () => {
  await Featured.findOne({});
  await Offer.findOne({});
  await OfferDone.findOne({});
  await PayoutMethod.findOne({});
  await Reward.findOne({});
  await User.findOne({});
  await WallBan.findOne({});
})();

// console.log("Hooks ran");

const isAuthenticated = async (event) => {
  const authenticationToken = event.request.headers.get("authentication");
  if (authenticationToken === null) return false;

  const data = verify(authenticationToken);
  return data.success;
};

const getAuthenticatedUser = async (event) => {
  const authenticationToken =
    event.request.headers.get("authentication") || event.cookies.get("token");
  if (authenticationToken === null) return false;

  const data = verify(authenticationToken);
  if (!data.success) return false;

  const user = await User.findOne({ _id: data.data.body.uid });
  if (user === null) return false;

  return user;
};

const auth = new SvelteGoogleAuthHook({
  client_id: GOOGLE_CLIENT_ID,
  client_secret: GOOGLE_CLIENT_SECRET,
});

export const handle = async ({ event, resolve }) => {
  event.isAuthenticated = () => isAuthenticated(event);
  event.getAuthenticatedUser = () => getAuthenticatedUser(event);

  if (NODE_ENV !== "development") {
    const res = await fetch(PUBLIC_GEO_URL);
    const resObj = await res.json();
    // console.log(resObj)
    event.locals.clientIp = resObj.ip;
  } else {
    console.log("in hooks handle's else");
    event.locals.clientIp = "2400:1a00:bde0:1e4c:fcf3:440f:1abd:8720";
  }
  // return resolve(event)
  return await auth.handleAuth({ event, resolve });
};

if (NODE_ENV !== "development") {
   getNewOffers();
}
