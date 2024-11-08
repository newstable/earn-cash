import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import sanitization from "$lib/sanitize_query";
import validation from "../../../../../lib/validation";
import User from "../../../../../models/User.model";
import { hashPassword } from '../../../../../lib/server/passwords';
import Token from '../../../../../models/Token.model.js';


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

  if (mustBeHere(data.token)) return response({ success: false }, 400);

  const tokenDoc = await Token.findOne({ token: data.token });
  data.email = tokenDoc? tokenDoc.email: null
  if (!validation.email(data.email)) return response({ success: false }, 400);

  
  const hash = await hashPassword(data.password);
  const user = await User.findOne({
    email: data.email.toLowerCase(),
  });
  await Token.deleteMany({ email: data.email })

  if (user) {
    user.password = hash
    user.save()
  }

  return response({ success: true }, 200);
};
