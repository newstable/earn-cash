import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import validation from "$lib/validation";
import sanitization from "$lib/sanitize_query";
import { hashPassword } from "$lib/server/passwords";
import User from "../../../models/User.model";
import { verifyCaptcha } from "$lib/server/verifyCaptcha"
// import getGeoInfo from '../../../services/geoPlugin';
import doLogin from "$lib/server/doLogin";
import mongoose from "mongoose";
import email from "../../../lib/server/email";
import md5 from "../../../lib/md5";
import { json } from "@sveltejs/kit";

export const POST = async (request) => {
  var data;
  const geoInfo = {
    ip: request.request.headers.get("cf-connecting-ip"),
    country: request.request.headers.get("cf-ipcountry"),
  };

  try {
    data = await request.request.json();
    data = await sanitization.sanitize_query(data)
    if (!sanitization.check_if_sanitized(data)) {
      return response(
        {
          success: false,
        },
        400
      );
    }
  } catch (e) {
    return response(
      {
        success: false,
      },
      400
    );
  }

  if (mustBeHere(data.username)) return response({ success: false }, 400);
  if (mustBeHere(data.email)) return response({ success: false }, 400);
  if (mustBeHere(data.password)) return response({ success: false }, 400);
  if (mustBeHere(data.ref)) return response({ success: false }, 400);
  if (mustBeHere(data.hCaptchaResponse)) return response({ success: false, message: "Invalid Captcha", userMessage: "This captcha is invalid" }, 400);
  if (! await verifyCaptcha(data.hCaptchaResponse))
    return response({ success: false, message: "Invalid Captcha", userMessage: "This captcha is invalid"}, 406);
  if (!validation.username(data.username))
    return response({ success: false }, 406);
  if (!validation.email(data.email)) 
    return response({ success: false }, 406);
  if (!validation.password(data.password))
    return response({ success: false }, 406);
  if (await request.isAuthenticated()) 
    return response({ success: false }, 406);

  const usernameCount = await User.countDocuments({
    usernameLowercase: data.username.toLowerCase(),
  });
  if (usernameCount > 0)
    return response({
      success: false,
      message: "Username taken",
      userMessage: "This username is already taken",
    });

  const emailCount = await User.countDocuments({
    email: data.email.toLowerCase(),
  });
  if (emailCount > 0)
    return response({
      success: false,
      message: "Email taken",
      userMessage: "This email is already taken",
    });

  const hash = await hashPassword(data.password);

  var user = new User({
    username: data.username,
    usernameLowercase: data.username.toLowerCase(),
    email: data.email.toLowerCase(),
    password: hash,
    registerIp: geoInfo.ip,
    ip: geoInfo.ip,
    registerCountry: geoInfo.country,
    country: geoInfo.country,
    picture:
      "https://eu.ui-avatars.com/api/?background=302f2f&color=ff5a5c&length=1&name=" +
      data.username,
  });

  if (data.ref !== null) {
    try {
      var referer = false;
      JSON.parse(data.ref)
      user.adtogame = data.ref
    } catch (error) {
      if (mongoose.Types.ObjectId.isValid(data.ref.toLowerCase().trim())) {
        referer = await User.findById(data.ref.toLowerCase().trim());
      } else {
        referer = await User.findOne({
          customReferralCode: data.ref.toLowerCase().trim(),
        });
      }
      if (referer) {
        user.refBy = referer;
      }
    }
  }
  user.lastActive = new Date();
  user.joinDate = new Date();

  await user.save();

  const key = md5(user._id.toString() + new Date().getTime().toString());
  user.ActivationKey = key;
  await user.save();

  await email.sendConfirmAccountEmail(user.email, user.username, key);

  return response({
    success: true,
    token: doLogin(user._id),
  });
};
