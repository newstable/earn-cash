import Offer from "../../../../models/Offer.model";

import response from "$lib/response";

import { NODE_ENV } from "$env/static/private";

// TODO: Remove "NP" hard code
export const GET = async (request) => {
  console.log(NODE_ENV);

  const country =
    NODE_ENV === "development"
      ? "NP"
      : // : JSON.parse(process.env.geoInfo);
        request.request.headers.get("cf-ipcountry");
  // const { country } = JSON.parse(process.env.geoInfo);

  // const latestOffer = await Offer.find().sort({ _id: -1 }).limit(1);
  const latestOffer = await Offer.find().sort({ v: -1 }).limit(1);
  // console.log(latestOffer);
  const v = latestOffer[0].v;

  // const offers = await Offer.find({ v }).distinct("category_name_readable");

  let categories = await Offer.aggregate([
    {
      $match: {
        country,
        v,
      },
    },
    {
      $group: {
        _id: "$category_name_readable",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        count: 1,
      },
    },
  ]);

  // console.log(offers.length);

  // var categories = [];
  // var total = 0;
  // for (var i = 0; i < offers.length; i++) {
  //   const offer = offers[i];
  //   const count = await Offer.countDocuments({
  //     category_name_readable: offer,
  //     country,
  //     v,
  //   });

  //   categories.push({
  //     name: offer,
  //     count,
  //   });

  //   total += count;
  // }

  return response({
    success: true,
    categories,
    total: categories.reduce((acc, curr) => acc + curr.count, 0),
  });
};
