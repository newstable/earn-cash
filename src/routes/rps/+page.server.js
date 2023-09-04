import { verify } from '../../lib/server/jwt.js';
import User from '../../models/User.model.js';
import { hash_hmac } from '../../lib/hash'

const strtr = (inputString, fromChars, toChars) => {
    var map = {};
    
    // Create a character mapping from fromChars to toChars
    for (var i = 0; i < fromChars.length; i++) {
        if (i < toChars.length) {
            map[fromChars.charAt(i)] = toChars.charAt(i);
        } else {
            // If toChars is shorter, replace with an empty string
            map[fromChars.charAt(i)] = '';
        }
    }
    
    // Replace characters in inputString based on the mapping
    var outputString = '';
    for (var j = 0; j < inputString.length; j++) {
        var char = inputString.charAt(j);
        if (map.hasOwnProperty(char)) {
            outputString += map[char];
        } else {
            outputString += char;
        }
    }
    
    return outputString;
}

function base64UrlEncode(input) {
    const base64 = btoa(input); // Encode to base64
    const base64Url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Convert to base64url format
    return base64Url;
}

const getToken = (user) => {
    const secret = "omg so so secret"; // should be the same as the secret on the websocket
    const headers = { typ: "JWT", alg: "HS256" };
    const json_headers = JSON.stringify(headers);
    const payload = {
        iss: "https://justearn.gg:2083/",
        userid: user._id,
        username: user.username,
        balance: parseInt(user.points - user.cashedOut - user.removedPoints + user.addedPoints),
        iat: parseInt(Date.now()/1000),
        exp: parseInt(Date.now()/1000) + 3600*24
    };
    const json_payload = JSON.stringify(payload)

    const signature = hash_hmac("sha256", `${base64UrlEncode(json_headers)}.${base64UrlEncode(json_payload)}`, secret, 'binary')
    const token = `${base64UrlEncode(json_headers)}.${base64UrlEncode(json_payload)}.${base64UrlEncode(signature)}`
    return token
}

export const load = async(request) => {
    const token = request.cookies.get("token");

    if (typeof token !== "string") {
        return {};
    }

    const data = verify(token);
    if (!data.success) {
        return {};
    }

    const user = await User.findOne({ _id: data.data.body.uid });

    return {
        token: getToken(user)
    }
}