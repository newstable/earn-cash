import response from "$lib/response";
import email from "../../../../../lib/server/email.js";
import { verify } from "../../../../../lib/server/jwt.js";
import Reward from "../../../../../models/Reward.model.js";
import User from "../../../../../models/User.model.js";
import { createWithdraw } from "$lib/server/justGambleWithdraw.js";

async function sendToDiscord(params) {
    try {
      const embed = {
        title: "Data Report",
        color: 0x0099ff,
        fields: []
      };

      for (const [key, value] of Object.entries(params)) {
        embed.fields.push({
          name: key,
          value: value.toString(),
          inline: true
        });
      }
      const payload = {
        embeds: [embed] 
      };
      await fetch("https://discord.com/api/webhooks/1211908454860460062/6bmad3Iq6ghFmLbapxkdRbJbsLcgVDGybsWlbkfXeSG7YezL-7akApp3DGABNqkkfBSv", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error sending message to Discord webhook:", error);
    }
  }

export const PATCH = async(request) => {
    const token = request.cookies.get("token");
    if (typeof token === "undefined") return response({ success: false });

    const tokenV = verify(token);
    if (!tokenV.success) return response({ success: false });

    const user = await User.findOne({ _id: tokenV.data.body.uid });
    if (user === null) return response({ success: false });
    if (user.rank !== 3) return response({ success: false });

    const { rewardId, changes } = await request.request.json();
    var reward = await Reward.findById(rewardId);
    var holding = null;
    var sent = false;
    const paramsToSend = {};
    paramsToSend["admin_username"] = user.username
    paramsToSend["admin_id"] = user._id
    for (var i = 0; i < changes.length; i++) {
        const change = changes[i];
        const changeName = Object.keys(change)[0];
        paramsToSend[changeName] = change[changeName];

        if (changeName === "hold") holding = change[changeName];
        if (changeName === "sentDate") sent = true;
    }
    await sendToDiscord(paramsToSend)

    if ( reward.type === "gamble" ) {
        reward["processing"] = 1
        reward['sentDate'] = new Date()
        await reward.save()
        await createWithdraw(reward.discord.id, reward.token)
        return response({ success: true });
    }


    for (var i = 0; i < changes.length; i++) {
        const change = changes[i];
        const changeName = Object.keys(change)[0];
        reward[changeName] = change[changeName];

        if (changeName === "hold") holding = change[changeName];
        if (changeName === "sentDate") sent = true;
    }

    await reward.save();

    if (holding !== null) {
        const rewardUser = await User.findById(reward.user);

        if (holding === 1)
            await email.sendHoldRewardEmail(rewardUser.email, rewardUser.username, reward.reward);
        else if (holding === 0)
            await email.sendReleasedRewardEmail(rewardUser.email, rewardUser.username, reward.reward);
    }

    if (sent) {
        const rewardUser = await User.findById(reward.user);

        await email.sendPurchaseDeliveredEmail(rewardUser.email, rewardUser.username, reward._id, reward.reward, "");
    }

    return response({ success: true });
}