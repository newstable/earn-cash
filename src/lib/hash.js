import crypto from 'crypto'

export const hash_hmac = (alg, string, key, enc='hex') => {
    var hmac = crypto.createHmac(alg, key);
    hmac.update(string);
    return hmac.digest(enc); 
};