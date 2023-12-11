import { redirect } from "@sveltejs/kit";
import userRequest from "./userRequest";
import { offerWalls } from "../offerWalls";
import getGeoInfo from "../../services/geoPlugin";

const wall = async (request) => {
  const wall = request.params.wall;
  const user = await request.getAuthenticatedUser();

  var wallUrl = null;
  var wallName = null;
  var nextUrl = null;
  var USER_ID = "0";
  var wallId = null;

  if (user) {
    USER_ID = user._id.toString();

    // userRequest(user, JSON.parse(process.env.geoInfo));
    userRequest(user, {
      ip: request.request.headers.get("cf-connecting-ip"),
      country: request.request.headers.get("cf-ipcountry"),
    });
  }

  for (var i = 0; i < offerWalls.length; i++) {
    const offerWall = offerWalls[i];

    if (wall === offerWall.simple) {
      wallUrl = offerWall.wallUrl.replace("[USERID]", USER_ID);
      wallName = offerWall.wallName;
      wallId = offerWall.wallId;
    }
  }

  if (wallUrl !== null) {
    nextUrl = wall;
  } else {
    throw redirect(303, "/earn");
  }

  return {
    wallUrl,
    wallName,
    nextUrl,
    wallId,
  };
};

export default wall;
