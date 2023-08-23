import { create } from "./jwt"

const doLogin = userId => {
    const token = create({
        uid: userId
    });
    token.setExpiration(new Date().getTime() + (60 * 60 * 1000 * 48)); // 2 days
    return token.compact();
}

export default doLogin;