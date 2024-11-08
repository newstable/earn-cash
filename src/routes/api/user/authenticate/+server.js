import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import validation from "$lib/validation";
import sanitization from "$lib/sanitize_query";
import doLogin from "../../../../lib/server/doLogin";
import { checkPassword } from "../../../../lib/server/passwords";
import userRequest from "../../../../lib/server/userRequest";
import User from "../../../../models/User.model";

export const GET = async (request) => {
  const user = await request.getAuthenticatedUser();
  const geoInfo = {
    ip: request.request.headers.get("cf-connecting-ip"),
    country: request.request.headers.get("cf-ipcountry"),
  };
  // const geoInfo = {
  //     ip: request.request.headers.get("ip"),
  //     country: request.request.headers.get("country")
  // }

  if (user === false) {
    return response({
      success: false,
    });
  }

  userRequest(user, geoInfo);
  // console.log(user, "user");

  return response({
    success: true,
    user: {
      username: user.username,
      balance:
        user.points - user.cashedOut - user.removedPoints + user.addedPoints,
      picture: user.picture,
      id: user._id,
      discord: user.discordUsername
    },
  });
};

export const POST = async (request) => {
  var data;

  try {
    data = await request.request.json();
    data = await sanitization.sanitize_query(data)
  } catch (e) {
    return response(
      {
        success: false,
      },
      400
    );
  }

  if (mustBeHere(data.email)) return response({ success: false }, 400);
  if (mustBeHere(data.password)) return response({ success: false }, 400);

  if (!validation.email(data.email)) return response({ success: false }, 406);
  if (!validation.password(data.password))
    return response({ success: false }, 406);

  if (await request.isAuthenticated()) return response({ success: false }, 406);

  const user = await User.findOne({
    email: data.email.toLowerCase(),
  });

  if (user === null)
    return response({
      success: false,
      message: "EP not OK",
      userMessage: "Email or password incorrect",
    });

  const passwordResult = await checkPassword(user.password, data.password);
  if (!passwordResult)
    return response({
      success: false,
      message: "EP not 0K",
      userMessage: "Email or password incorrect",
    });

  if (user.banned === 1)
    return response({
      success: false,
      message: "You are banned",
      userMessage: "You cannot log into justearn",
    });

  userRequest(user, data);

  return response({
    success: true,
    token: doLogin(user._id),
  });
};
