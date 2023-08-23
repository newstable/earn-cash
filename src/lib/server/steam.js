import SteamAuth from "node-steam-openid";

import { URL, STEAM_API_KEY } from '$env/static/private';

const steam = new SteamAuth({
    realm: "http://" + URL,
    returnUrl: "http://" + URL + "/auth/steam",
    apiKey: STEAM_API_KEY
});

export default steam;