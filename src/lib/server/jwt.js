import * as dotenv from "dotenv";

import { SIGNINGKEY } from "$env/static/private";

dotenv.config();

import nJwt from "njwt";

export const create = (data) => {
  data = {
    ...data,
  };
  return nJwt.create(data, SIGNINGKEY);
};

export const verify = (token) => {
  try {
    return {
      success: true,
      data: nJwt.verify(token, SIGNINGKEY),
    };
  } catch (e) {
    return {
      success: false,
    };
  }
};
