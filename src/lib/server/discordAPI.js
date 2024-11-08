import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, DISCORD_TOKEN } from '$env/static/private';
import { PUBLIC_SERVER_ID } from '$env/static/public';

export const getOAuthLink = async () => {
    const OAuth_Link = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${DISCORD_REDIRECT_URI}&scope=guilds.join+identify+guilds+guilds.members.read`;
    return OAuth_Link;
}

export const authDiscord = async (code) => {
    const dataObject = {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: DISCORD_REDIRECT_URI,
        code: code,
        scope: 'identify guilds guilds.join'
    };

    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(dataObject),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const response = await request.json();
    return response
}

export const joinServer = async (access_token, user_id) => {
    const url = `https://discord.com/api/v10/guilds/${PUBLIC_SERVER_ID}/members/${user_id}`;
    const headers = {
        'Authorization': `Bot ${DISCORD_TOKEN}`,
        'User-Agent': `Bearer ${access_token}`, 
        'Content-Type': 'application/json'
    };
    const data = {
        "access_token": access_token
    };

    try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(data)
        });
    
        if (response.ok) { // 200-299 status codes are considered successful 
          console.log(`User ${user_id} added to guild!`);
        } else {
          console.error(`Error adding user: ${await response.text()}`); 
        }
    
      } catch (error) {
        console.error('Error making API request:', error);
      }
}

export const getUserInfo = async (access_token) => {
    try {
        const request = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${access_token}`
            }
        });
        const response = await request.json();
        return response;
    } catch (error) {
        return error
    }
}

export const refresh_access_token = async (refresh_token) => {
    const tokenURL = 'https://discord.com/api/oauth2/token';
    const data = {
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    };
  
    try {
      const response = await fetch(tokenURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  export const fetch_guilds = async (access_token) => {
    const guildsURL = 'https://discord.com/api/users/@me/guilds';

    try {
        const response = await fetch(guildsURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch guilds');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching guilds:', error);
        throw error;
    }
}
