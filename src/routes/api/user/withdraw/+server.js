import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";
import email from "../../../../lib/server/email";
import robuxship from "../../../../lib/server/robuxship";
import PayoutMethod from '../../../../models/PayoutMethod.model';
import Reward from "../../../../models/Reward.model";

export const POST = async(request) => {
    var data;

    try {
        data = await request.request.json();
    } catch (e) {
        return response({
            success: false
        }, 400);
    }

    if (mustBeHere(data.payoutMethodId)) return response({ success: false }, 400);
    if (mustBeHere(data.option)) return response({ success: false }, 400);
    if (mustBeHere(data.info)) return response({ success: false }, 400);

    if (!(await request.isAuthenticated())) return response({
        success: false,
        message: "You're not logged in"
    }, 401);

    var user = await request.getAuthenticatedUser();
    if (user === false) {
        return response({
            success: false,
            message: "You're not logged in!"
        }, 401);
    }

    const balance = user.points - user.cashedOut - user.removedPoints + user.addedPoints;

    if (data.payoutMethodId === "ROBUX") {
        const username = data.info;
        const robux = parseInt(data.option);

        if (balance < robux) {
            return response({
                success: false,
                message: "You don't have enough points"
            }, 406);
        }

        const payoutPrev = await Reward.countDocuments({ user, type: "ROBUX" });
        if (payoutPrev === 0 && robux < 100) {
            return response({
                success: false,
                message: "You need to withdraw at least 100 ROBUX"
            }, 406);
        }
        if (robux < 50) {
            return response({
                success: false,
                message: "You need to withdraw at least 50 ROBUX"
            }, 406);
        }

        const robuxStock = await robuxship.getRobuxStock();
        if (robux > robuxStock.availableRobux) {
            return response({
                success: false,
                message: "We currently only have " + robuxStock.availableRobux.toString() + " ROBUX in stock"
            }, 400);
        }
        if (robuxStock.maxOrderSize < robux) {
            return response({
                success: false,
                message: "ROBUX withdrawals are currently capped at " + robuxStock.maxOrderSize.toString() + " ROBUX"
            }, 400);
        }

        const payoutResponse = await robuxship.doRobuxPayout(username, robux);
        if (payoutResponse.succeeded && payoutResponse.result === "Success") {
            user.cashedOut += robux;
            await user.save();

            const reward = new Reward({
                user,
                type: "ROBUX",
                reward: robux.toString() + " ROBUX",
                price: robux,
                info: username,
                sentDate: new Date()
            });
            reward.save();

            return response({
                success: true
            });
        }

        var errorMessage = {
            "VipServerNotFound": "No VIP server found with the right price",
            "NoAvailableAccountsForPaymentFound": "There is currently not enough ROBUX in stock",
            "UnknownError": "Unknown error, please try again",
            "InvalidNickname": "ROBLOX username invalid!",
            "InvalidAmount": "ROBUX amount invalid!",
            "InvalidPaymentChannel": "Special error 1! Please contact JustEarn staff",
            "ChannelIsInactive": "Special error 2! Please contact JustEarn staff",
            "ValidPlaceNotFound": "You do not have a valid ROBLOX experience",
            "InsufficientFunds": "Special error 3! Please contact JustEarn staff"
        }[payoutResponse.result];

        return response({
            success: false,
            message: errorMessage
        }, 400);
    }

    const payoutMethod = await PayoutMethod.findById(data.payoutMethodId);
    if (!payoutMethod) {
        return response({
            success: false
        }, 404);
    }

    if (payoutMethod.type === "crypto") {
        const cryptoAmount = parseFloat(data.option);
        const address = data.info;

        // Determine the cryptocurrency name from the selected payout method
        const cryptocurrency = payoutMethod.name; // Assuming the name corresponds to the cryptocurrency (BTC, LTC, ETH)

        // Fetch the corresponding cryptocurrency rate from the payout method
        const cryptoRate = payoutMethod.rate;

        // Calculate USD amount based on the selected cryptocurrency's rate
        const usdAmount = cryptoAmount * cryptoRate;
        const formattedUsdAmount = usdAmount.toFixed(2); // Format USD amount to 2 decimal places
        const deductionAmount = usdAmount * 100; // Deduct $100 for every $1 USD

        console.log(`${cryptocurrency} Amount:`, cryptoAmount);
        console.log("USD Amount:", formattedUsdAmount);
        console.log("Deduction Amount:", deductionAmount);

        if (usdAmount < payoutMethod.minimum) {
            return response({
                success: false,
                message: "You're requesting a payout lower than the minimum"
            }, 400);
        }

        if (user.points < payoutMethod.minimumEarned) {
            return response({
                success: false,
                message: "You haven't earned enough points to unlock this payout method yet"
            }, 406);
        }

        if (balance < deductionAmount) {
            return response({
                success: false,
                message: "You don't have enough points"
            }, 406);
        }

        const rewardAmount = (usdAmount - payoutMethod.fee) / cryptoRate;

        user.cashedOut += usdAmount;
        user.points -= deductionAmount;
        await user.save();

        const reward = new Reward({
            user,
            type: payoutMethod.type,
            reward: `${rewardAmount.toFixed(8)} ${cryptocurrency} @ $${formattedUsdAmount}`,
            price: usdAmount,
            info: address
        });
        reward.save();

        await email.sendPurchaseConfirmationEmail(user.email, user.username, payoutMethod.name, payoutMethod.logo);

        return response({
            success: true
        });
    } else if (payoutMethod.type === "cash") {
        const option = parseInt(data.option);
        const info = data.info;

        if (user.points < payoutMethod.minimumEarned) {
            return response({
                success: false,
                message: "You haven't earned enough points to unlock this payout method yet"
            }, 406);
        }

        if (option >= payoutMethod.options.length || option < 0) {
            return response({
                success: false,
                message: "Invalid option"
            }, 400);
        }

        const chosenOption = payoutMethod.options[option];
        const amount = chosenOption.price + chosenOption.fee;

        if (amount < 0 || amount < payoutMethod.minimum) {
            return response({
                success: false,
                message: "You're requesting a payout lower than the minimum"
            }, 400);
        }

        if (balance < amount) {
            return response({
                success: false,
                message: "You don't have enough points"
            }, 406);
        }

        user.cashedOut += amount;
        await user.save();

        const reward = new Reward({
            user,
            type: payoutMethod.type,
            reward: (chosenOption.value / 100).toString() + "$ " + payoutMethod.name,
            amount,
            info,
            tremendousUSDValue: chosenOption.tremendousUSD
        });
        await reward.save();

        return response({
            success: true
        });
    } else {
        const option = parseInt(data.option);

        if (user.points < payoutMethod.minimumEarned) {
            return response({
                success: false,
                message: "You haven't earned enough points to unlock this payout method yet"
            }, 406);
        }

        if (option >= payoutMethod.options.length || option < 0) {
            return response({
                success: false,
                message: "Invalid option"
            }, 400);
        }

        const chosenOption = payoutMethod.options[option];
        const price = chosenOption.price + chosenOption.fee;

        if (balance < price) {
            return response({
                success: false,
                message: "You don't have enough points"
            }, 406);
        }

        user.cashedOut += price;
        await user.save();

        const reward = new Reward({
            user,
            type: payoutMethod.type,
            reward: (chosenOption.value / 100).toString() + "$ " + payoutMethod.name,
            price
        });
        await reward.save();

        return response({
            success: true
        });
    }
}