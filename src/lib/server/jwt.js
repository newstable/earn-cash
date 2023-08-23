import * as dotenv from 'dotenv'
dotenv.config()

import nJwt from 'njwt';

export const create = data => {
    data = {
        ...data
    };
    return nJwt.create(data, process.env.SIGNINGKEY)
}

export const verify = token => {
    try {
        return {
            success: true,
            data: nJwt.verify(token, process.env.SIGNINGKEY)
        }
    } catch (e) {
        return {
            success: false
        }
    }
}