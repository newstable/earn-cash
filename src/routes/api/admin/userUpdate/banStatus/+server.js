import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import sanitization from "$lib/sanitize_query";
import User from "../../../../../models/User.model.js";

export const PATCH = async (request) => {
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

  //   if (mustBeHere(data.ban)) return response({ success: false }, 400);

  const user = await User.findById(data.userId);

  if (user.banned) {
    user.banned = 0;
  } else {
    user.banned = 1;
  }
  // user.banned = data.ban;

  await user.save();

  return response(
    {
      success: true,
      message: "Account ban status updated",
    },
    200
  );
};
