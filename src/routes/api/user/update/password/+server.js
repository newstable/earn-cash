import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import validation from "../../../../../lib/validation";
import User from "../../../../../models/User.model";
import { hashPassword } from '../../../../../lib/server/passwords';

export const POST = async (request) => {
  var data;

  try {
    data = await request.request.json();
  } catch (e) {
    return response(
      {
        success: false,
      },
      400
    );
  }

  if (mustBeHere(data.email)) return response({ success: false }, 400);
  if (!validation.email(data.email)) return response({ success: false }, 400);
  
  const hash = await hashPassword(data.password);
  const user = await User.findOne({
    email: data.email.toLowerCase(),
  });

  if (user) {
    user.password = hash
    user.save()
  }

  return response({ success: true }, 200);
};
