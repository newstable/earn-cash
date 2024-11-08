import { JUSTGAMBLE_SECRET } from '$env/static/private';

export const createWithdraw = async(user_id, coins) => {
    const reward = await fetch(`https://api.raven.tf/api/?userid=${user_id}&amount=${coins}&key=${JUSTGAMBLE_SECRET}`, {method: 'GET'});
    console.log(reward)
    console.log(`https://api.raven.tf/api/?userid=${user_id}&amount=${coins}&key=${JUSTGAMBLE_SECRET}`)
    return true;
}