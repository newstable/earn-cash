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
        message: "Error occured",
      },
      400
    );
  }

  if (mustBeHere(data.points) && !Number.isNaN(Number(data.points)))
    return response({ success: false, message: "Error occured" }, 400);

  const user = await User.findById(data.userId);
  user.cashedOut = data.points;

  await user.save();

  return response(
    {
      success: true,
      message: "Cashedout updated",
    },
    200
  );
};
