import { WITHDRAWDB_SECRET } from '$env/static/private';

export const createWithdraw = async(data) => {
    const requestData = JSON.stringify(data); // Convert data to JSON string
    const request = await fetch('https://justearnapi.xyz/create_withdraw_request', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${WITHDRAWDB_SECRET}`,
        },
        body: requestData
    });
    const response = await request.json();
    return response;
}