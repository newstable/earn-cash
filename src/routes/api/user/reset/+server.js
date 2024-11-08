import cryptoRandomString from 'crypto-random-string';
import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import sanitization from "$lib/sanitize_query";
import email from "../../../../lib/server/email";
import validation from "../../../../lib/validation";
import User from "../../../../models/User.model";
import Token from '../../../../models/Token.model';

const sendRecoveryEmail = async (user, token) => {
  await email.sendResetPasswordEmail(user.email, user.username, "HIHI", token);
};

const generateToken = () => cryptoRandomString({ length: 40, type: 'base64' });

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
  if (!validation.email(data.email)) return response({ success: false }, 400);
  
  const token = btoa(generateToken());

  await Token.deleteMany({email: data.email})
  var newToken = new Token({
    email: data.email,
    token
  });
  newToken.save()

  const user = await User.findOne({
    email: data.email.toLowerCase(),
  });

  if (user) {
    sendRecoveryEmail(user, token);
  }

  return response({ success: true }, 200);
};
