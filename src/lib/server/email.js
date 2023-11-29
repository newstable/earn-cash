import FormData from "form-data";
import Mailgun from "mailgun.js";

import { MAILGUN_API_KEY } from "$env/static/private";

const mailgun = new Mailgun(FormData);

const addToMailingList = (list, email, name, params) => {
  const mg = mailgun.client({
    username: "api",
    key:
      MAILGUN_API_KEY ||
      console.log("Bruh you're actually the stupidest dumbass I've ever seen"),
  });

  mg.lists.members.createMember(list, {
    address: email,
    name,
    vars: params,
    subscribed: "yes",
    upsert: "yes",
  });
};

const removeFromMailingList = (list, email) => {
  const mg = mailgun.client({
    username: "api",
    key:
      MAILGUN_API_KEY ||
      console.log("Bruh you're actually the stupidest dumbass I've ever seen"),
  });

  mg.lists.members.destroyMember(list, email);
};

const updateMailingList = (list, email, params) => {
  const mg = mailgun.client({
    username: "api",
    key:
      MAILGUN_API_KEY ||
      console.log("Bruh you're actually the stupidest dumbass I've ever seen"),
  });

  mg.lists.members.updateMember(list, email, {
    vars: params,
  });
};

const isInMailingList = async (list, email) => {
  const mg = mailgun.client({
    username: "api",
    key:
      MAILGUN_API_KEY ||
      console.log("Bruh you're actually the stupidest dumbass I've ever seen"),
  });

  try {
    await mg.lists.members.getMember(list, email);
  } catch (e) {
    return false;
  }
  return true;
};

const sendEmail = async (
  to,
  subject,
  template,
  emailData,
  extraParams = false
) => {
  const mg = mailgun.client({
    username: "api",
    key:
      MAILGUN_API_KEY ||
      console.log("Bruh you're actually the stupidest dumbass I've ever seen"),
  });

  try {
    var mailgunData = {
      from: "JustEarn <no-reply@justearn.gg>",
      to,
      subject,
      template,
      "h:X-Mailgun-Variables": JSON.stringify(emailData),
    };

    if (extraParams) {
      mailgunData = {
        ...mailgunData,
        ...extraParams,
      };
    }

    const response = await mg.messages.create("mg.justearn.gg", mailgunData);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

const sendConfirmAccountEmail = (to, name, key) =>
  sendEmail(
    to,
    "Confirm Your JustEarn Account - Action Required",
    "activate",
    {
      Name: name,
      Key: key,
      Email: to,
    },
    {
      "o:tag": ["Account Activiation"],
    }
  );

const sendPurchaseDeliveredEmail = (
  to,
  name,
  rewardId,
  rewardName,
  rewardImg
) =>
  sendEmail(
    to,
    "JustEarn - Purchase Successful #" + rewardId.toString(),
    "new_purchase",
    {
      Name: name,
      RewardName: rewardName,
      RewardImg: rewardImg,
    },
    {
      bcc: "justearn.gg+05bf771565@invite.trustpilot.com",
    }
  );

const sendPurchaseConfirmationEmail = (to, name, rewardName, rewardImg) =>
  sendEmail(
    to,
    "JustEarn - Order Confirmation",
    "order_confirmation",
    {
      Name: name,
      RewardName: rewardName,
      RewardImg: rewardImg,
    },
    {
      bcc: "daniel.vakili2002@gmail.com,admin@justearn.gg,ali11_00@hotmail.com",
    }
  );

const sendResetPasswordEmail = (to, name, key, token) =>
  sendEmail(
    to,
    "JustEarn - Reset your password",
    "forgot_password",
    {
      Name: name,
      Key: key,
      Token: token,
    },
    {
      "o:tag": ["Forgot Password"],
    }
  );

const sendPurchasePaypalSentEmail = (
  to,
  name,
  payoutId,
  payoutName,
  payoutImg
) =>
  sendEmail(
    to,
    "JustEarn - Purchase Successful #" + payoutId.toString(),
    "paypal_confirmation",
    {
      Name: name,
      RewardName: payoutName,
      RewardImg: payoutImg,
      RewardID: payoutId.toString(),
    },
    {
      bcc: "justearn.gg+05bf771565@invite.trustpilot.com",
    }
  );

const sendPurchaseCryptoSentEmail = (
  to,
  name,
  payoutId,
  payoutName,
  payoutImg
) =>
  sendEmail(
    to,
    "JustEarn - Purchase Successful #" + payoutId.toString(),
    "crypto_confirmation",
    {
      Name: name,
      RewardName: payoutName,
      RewardImg: payoutImg,
      RewardID: payoutId.toString(),
    },
    {
      bcc: "justearn.gg+05bf771565@invite.trustpilot.com",
    }
  );

const sendHoldRewardEmail = (to, name, rewardName) =>
  sendEmail(to, "JustEarn - Reward Under Review", "hold_reward", {
    Name: name,
    RewardName: rewardName,
  });

const sendRefundRewardEmail = (to, name, rewardName) =>
  sendEmail(to, "JustEarn - Reward Refunded", "refund_reward", {
    Name: name,
    RewardName: rewardName,
  });

const sendReleasedRewardEmail = (to, name, rewardName) =>
  sendEmail(to, "JustEarn - Reward Released", "release_reward", {
    Name: name,
    RewardName: rewardName,
  });

export default {
  addToMailingList,
  removeFromMailingList,
  updateMailingList,
  isInMailingList,
  sendConfirmAccountEmail,
  sendPurchaseDeliveredEmail,
  sendPurchaseConfirmationEmail,
  sendResetPasswordEmail,
  sendPurchasePaypalSentEmail,
  sendPurchaseCryptoSentEmail,
  sendHoldRewardEmail,
  sendRefundRewardEmail,
  sendReleasedRewardEmail,
};
