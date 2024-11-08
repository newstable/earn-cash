import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import sanitization from "$lib/sanitize_query";
import validation from "$lib/validation";
import doLogin from "../../../../lib/server/doLogin";
import { checkPassword } from "../../../../lib/server/passwords";
import userRequest from "../../../../lib/server/userRequest";
import User from "../../../../models/User.model";

export const GET = async (request) => {
  const user = await request.getAuthenticatedUser();
  const geoInfo = {
    // ip: request.request.headers.get("ip"),
    // country: request.request.headers.get("country")

    ip: request.request.headers.get("cf-connecting-ip"),
    country: request.request.headers.get("cf-ipcountry"),
  };

  if (user === false) {
    return response({
      error: "Authentication failed",
    });
  }

  if (user.isBanned) {
    return response({
      error: "Authentication failed",
      message: "You're banned from the website",
    });
  }

  userRequest(user, geoInfo);

  return response({
    username: user.username,
    balance:
      user.points - user.cashedOut - user.removedPoints + user.addedPoints,
    picture: user.picture,
    id: user._id,
    level: user.level,
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
        error: "Invalid request data",
      },
      400
    );
  }

  if (mustBeHere(data.email))
    return response({ error: "Email is required" }, 400);
  if (mustBeHere(data.password))
    return response({ error: "Password is required" }, 400);

  if (!validation.email(data.email))
    return response({ error: "Invalid email format" }, 406);
  if (!validation.password(data.password))
    return response({ error: "Invalid password format" }, 406);

  if (await request.isAuthenticated())
    return response({ error: "Already authenticated" }, 406);

  const user = await User.findOne({
    email: data.email.toLowerCase(),
  });
  if (user === null)
    return response({
      error: "Email or password incorrect",
    });

  const passwordResult = await checkPassword(user.password, data.password);
  if (!passwordResult)
    return response({
      error: "Email or password incorrect",
    });

  userRequest(user, data);

  return response({
    token: doLogin(user._id),
  });
};
