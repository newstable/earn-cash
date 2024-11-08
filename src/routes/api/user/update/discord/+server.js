import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import sanitization from "$lib/sanitize_query";
import { getUserInfo } from "$lib/server/discordAPI";
import validation from "../../../../../lib/validation";
import User from "../../../../../models/User.model";

export const POST = async (request) => {
  var data;

  try {
    data = await request.request.json();
    data = await sanitization.sanitize_query(data)
  } catch (e) {
    return response(
      {
        success: false,
        error: e
      },
      400
    );
  }

  if (mustBeHere(data.access_token)) return response({ success: false }, 400);
  if (mustBeHere(data.refresh_token)) return response({ success: false }, 400);
  if (!await request.isAuthenticated()) return response({ success: false },400);
  
  const userProfile = await request.getAuthenticatedUser()

  try {
    var user;
    user = await User.findOne({ _id: userProfile._id });
    const discordUser = await getUserInfo(data.access_token)
    if (discordUser.username) {
      user.discordUsername = `${discordUser.username}#${discordUser.discriminator}`
      user.discordId = (discordUser.id).toString();
      user.discord_access_token = data.access_token;
      user.discord_refresh_token = data.refresh_token;
      await user.save();
      return response({ success: true }, 200);
    } else {
      return response({ success: false, error: "Invalid access_token" }, 400);
    }
  } catch (error) {
    console.error("Error updating Discord info:", error);
    return response({ success: false, error: error.message }, 500);
  }
};
