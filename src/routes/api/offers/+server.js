import response from "$lib/response";
import Offer from "../../../models/Offer.model";
import { NODE_ENV } from "$env/static/private";

export const GET = async (request) => {
  const country =
    NODE_ENV === "development"
      ? "NP"
      : // : JSON.parse(process.env.geoInfo);
        request.request.headers.get("cf-ipcountry");

  const latestOffer = await Offer.find().sort({ v: -1 }).limit(1);
  const v = latestOffer[0].v;

  var search = { country, v };
  const param = request.url.searchParams.get("categoryName");
  const page = Number(request.url.searchParams.get("page"));
  const limit = Number(request.url.searchParams.get("limit"));

  if (param) search["category_name"] = param;

  // console.log(search, "param");

  // if (param?.includes(",")) {
  //   // console.log("array");
  //   // if array is sent from client
  //   search["category_name_readable"] = { $in: param?.split(",") };
  // } else if (param !== null) {
  //   search["category_name_readable"] = param;
  // }

  // console.log(page, limit, "page ,limit");

  let offers;

  if (page && limit) {
    offers = await Offer.paginate(search, {
      limit: limit || 50,
      page: page || 1,
      select: {
        title: 1,
        description: 1,
        link: 1,
        tokens: 1,
        creative: 1,
        mobile_app_type: 1,
        conversion: 1,
        v: 1,
        category_name_readable: 1,
        offerwall: 1,
      },
      sort: {
        amount: -1,
      },
    });
  } else {
    offers = await Offer.find(search)
      .select({
        title: 1,
        description: 1,
        link: 1,
        tokens: 1,
        creative: 1,
        mobile_app_type: 1,
        conversion: 1,
        v: 1,
        category_name_readable: 1,
        offerwall: 1,
      })
      .sort({ amount: -1 });
  }

  // console.log(offers, "ffers");

  return response({
    success: true,
    offers,
  });
};
