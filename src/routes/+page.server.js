import { Request } from "@sveltejs/adapter-node";
import User from "../models/User.model.js";
import Offer from "../models/Offer.model.js";
import OfferDone from "../models/OfferDone.model.js";
import getGeoInfo from "../services/geoPlugin.js";
import logger from "../lib/log.js";

// function formatDate(inputDate) {
//     console.log(inputDate)
//     const parts = inputDate.split(' ');
//     const dateParts = parts[0].split('/');
//     const timeParts = parts[1].split(':');

//     // Parsing input date components
//     const day = parseInt(dateParts[0]);
//     const month = parseInt(dateParts[1])-1;
//     const year = parseInt(dateParts[2]);

//     const hours = parseInt(timeParts[0]);
//     const minutes = parseInt(timeParts[1]);
//     const seconds = parseInt(timeParts[2]);

//     // Creating a Date object
//     const formattedDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
//     console.log(formattedDate)
//     return formattedDate;
// }
// const data = [
// ]
// const reversing = async (i) => {
//     const temp = {...data[i]}
//     temp.usernameLowercase = temp.username.toLowerCase()
//     temp.joinDate = formatDate(temp.joinDate)
//     temp.lastActive = new Date(temp.lastActive*1000)
//     temp.points = temp.points + temp.cashedOut + temp.removedPoints - temp.addedPoints
//     const newU = new User(temp)
//     await newU.save()
//     console.log(123)
// }
export const load = async (_request) => {
  // var ind = 0
  // setInterval(()=>{reversing(ind++)}, 30)
  // console.log(
  //   _request.locals.clientIp,
  //   "/src/routes/+page.server.js:handle:load"
  // );
  logger.log(_request.locals.clientIp, "---clientip---");
  var next = 1;
  const latest = await Offer.findOne().sort({ added: -1 });
  if (latest !== null) {
    next = latest.v;
  }

  const count = await Offer.countDocuments({ v: next });
  const highest = await Offer.find().sort({ tokens: -1 }).limit(1);
  const offerDone = await OfferDone.aggregate([
    {
      $group: {
        _id: null,
        totalEarned: {
          $sum: "$tokens",
        },
      },
    },
  ]);

  return {
    count,
    highest: highest.length > 0 ? highest[0].tokens : 1994,
    totalEarned: Math.round(offerDone[0]?.totalEarned),
  };
};
