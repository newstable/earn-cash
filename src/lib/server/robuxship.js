import { ROBUXSHIP } from '$env/static/private';

const getRobuxStock = async() => {
    const response = await fetch("https://rbxgatewayapi.azurewebsites.net/v1/api/robuxOrders/stockInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apiKey: ROBUXSHIP
        })
    });
    const data = await response.json();

    return data;
}

const doRobuxPayout = async(username, amount) => {
    const response = await fetch("https://rbxgatewayapi.azurewebsites.net/v1/api/robuxOrders/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            robloxNickname: username,
            amount,
            channelName: "Main",
            apiKey: ROBUXSHIP,
            method: "VipServer",
            schedulePayment: true
        })
    });
    const data = await response.json();

    return data;
}

export default {
    getRobuxStock,
    doRobuxPayout
}