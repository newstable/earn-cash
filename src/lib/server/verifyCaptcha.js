import { HCAPTCHA_SECRET } from '$env/static/private';

export const verifyCaptcha = async(token) => {
    const verifyUrl = 'https://api.hcaptcha.com/siteverify';
    const verifyParams = {
        secret: HCAPTCHA_SECRET,
        response: token,
    };
    const verifyResponse = await fetch(verifyUrl, {
        method: 'POST',
        body: new URLSearchParams(verifyParams)
    });
    const verifyData = await verifyResponse.json();
    return verifyData['success']
}