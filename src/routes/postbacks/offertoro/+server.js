// /postbacks/offertoro?u={user_id}&ip={ip_address}&cid={id}&oid={oid}&p={payout}&on={o_name}&a={amount}&s={sig}

import md5 from "md5";
import calculateUserLevel from "../../../lib/calculateUserLevel";
import logger from "../../../lib/log";
import getCommision from "../../../lib/server/getCommision";
import OfferDone from "../../../models/OfferDone.model";
import RefEarning from "../../../models/RefEarning.model";
import User from "../../../models/User.model";
import getGeoInfo from "../../../services/geoPlugin";

const private_key = "568472fbc1baa32e06ccaedf1196d9bc";
export const GET = async (request) => {
  const searchParams = request.url.searchParams;
  logger.log(request.url, "/postbacks/offertoro");

  if (
    !searchParams.get("u") ||
    // !searchParams.get("ip") ||
    !searchParams.get("cid") ||
    !searchParams.get("oid") ||
    !searchParams.get("p") ||
    !searchParams.get("on") ||
    !searchParams.get("a") ||
    !searchParams.get("s")
  ) {
    return new Response("", { status: 404 });
  }

  if (
    searchParams.get("s") !=
    md5(`${searchParams.get("oid")}-${searchParams.get("u")}-${private_key}`)
  )
    return new Response("", { status: 404 });

  const ip = searchParams.get("ip");
  const { country } = await getGeoInfo(ip);

  //   const ip = request.request.headers.get("cf-connecting-ip");
  //   const country = request.request.headers.get("cf-ipcountry");

  var user = await User.findOne({ _id: searchParams.get("u") });
  if (user === null) return new Response("", { status: 404 });

  const tokens = parseFloat(searchParams.get("a"));

  const newOffer = new OfferDone({
    user,
    country,
    conversionId: searchParams.get("cid"),
    offerId: searchParams.get("oid"),
    payout: parseFloat(searchParams.get("p")),
    offerName: searchParams.get("on"),
    ip,
    tokens,
    wall: 3,
    status: tokens < 0 ? 0 : 1,
  });
  await newOffer.save();

  user.lastPaidSurvey = Date.now();
  user.paidSurveyCount += 1;
  user.points += tokens;
  user.level = calculateUserLevel(user.points);
  await user.save();

  if (user.refBy) {
    var refUser = await User.findOne({ _id: user.refBy });
    const commissionPercentage = await getCommision(refUser);
    const commission = Math.round(tokens * commissionPercentage);

    refUser.points += commission;
    refUser.pointsByRef += commission;
    await refUser.save();

    newOffer.ref = refUser;
    await newOffer.save();

    const refEarning = new RefEarning({
      earner: user,
      master: refUser,
      offerDone: newOffer,
      points: tokens,
      pointsForRef: commission,
      commissionPercentage: commissionPercentage,
    });
    await refEarning.save();

    user.earnedForRef += commission;
    user.save();
  }

  return new Response("1", { status: 200 });
};
