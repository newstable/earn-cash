import { redirect } from "@sveltejs/kit";
import { getOAuthLink, authDiscord, getUserInfo, fetch_guilds, joinServer } from "$lib/server/discordAPI"
import { PUBLIC_SERVER_ID } from '$env/static/public';


export const load = async (req) => {
  if (req.url.search.length < 36) {
    const redirectUrl = await getOAuthLink()
    throw redirect(302, redirectUrl);
  }

  req.method = "GET";
  req.url = req.url.href;
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const response = await authDiscord(code);
  if (response.error) {
    return {success: false}
  }
  response.success = true
  const userInfo = await getUserInfo(response.access_token)
  const guilds = await fetch_guilds(response.access_token);

  const isGuildPresent = guilds.some(guild => guild.id === PUBLIC_SERVER_ID);
  if (!isGuildPresent) {
      console.log(`Joined the guild with ID ${PUBLIC_SERVER_ID}`);
      await joinServer(response.access_token, userInfo.id)
  } else {
      console.log(`Already in the guild with ID ${PUBLIC_SERVER_ID}`);
  }
  return response
};