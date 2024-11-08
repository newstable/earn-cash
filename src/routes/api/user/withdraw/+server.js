import response from "$lib/response";
import mustBeHere from "$lib/server/mustBeHere";

import email from "../../../../lib/server/email";
import robuxship from "../../../../lib/server/robuxship";
import PayoutMethod from "../../../../models/PayoutMethod.model";
import Reward from "../../../../models/Reward.model";


export const POST = async (request) => {
  var data;

  try {
    data = await request.request.json();
  } catch (e) {
    return response(
      {
        success: false,
      },
      400
    );
  }

  if (mustBeHere(data.payoutMethodId)) return response({ success: false }, 400);
  if (mustBeHere(data.option)) return response({ success: false }, 400);
  if (mustBeHere(data.info)) return response({ success: false }, 400);

  if (!(await request.isAuthenticated()))
    return response(
      {
        success: false,
        message: "You're not logged in",
      },
      401
    );

  var user = await request.getAuthenticatedUser();
  if (user === false) {
    return response(
      {
        success: false,
        message: "You're not logged in!",
      },
      401
    );
  }

  const balance =
    user.points - user.cashedOut - user.removedPoints + user.addedPoints;

  if (data.payoutMethodId === "ROBUX") {
    const username = data.info;
    const robux = parseInt(data.option);

    if (balance < robux) {
      return response(
        {
          success: false,
          message: "You don't have enough points",
        },
        406
      );
    }

    const payoutPrev = await Reward.countDocuments({ user, type: "ROBUX" });
    if (payoutPrev === 0 && robux < 100) {
      return response(
        {
          success: false,
          message: "You need to withdraw at least 100 ROBUX",
        },
        406
      );
    }
    if (robux < 50) {
      return response(
        {
          success: false,
          message: "You need to withdraw at least 50 ROBUX",
        },
        406
      );
    }

    const robuxStock = await robuxship.getRobuxStock();
    if (robux > robuxStock.availableRobux) {
      return response(
        {
          success: false,
          message:
            "We currently only have " +
            robuxStock.availableRobux.toString() +
            " ROBUX in stock",
        },
        400
      );
    }
    if (robuxStock.maxOrderSize < robux) {
      return response(
        {
          success: false,
          message:
            "ROBUX withdrawals are currently capped at " +
            robuxStock.maxOrderSize.toString() +
            " ROBUX",
        },
        400
      );
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
        sentDate: new Date(),
      });
      reward.save();

      return response({
        success: true,
      });
    }

    var errorMessage = {
      VipServerNotFound: "No VIP server found with the right price",
      NoAvailableAccountsForPaymentFound:
        "There is currently not enough ROBUX in stock",
      UnknownError: "Unknown error, please try again",
      InvalidNickname: "ROBLOX username invalid!",
      InvalidAmount: "ROBUX amount invalid!",
      InvalidPaymentChannel: "Special error 1! Please contact JustEarn staff",
      ChannelIsInactive: "Special error 2! Please contact JustEarn staff",
      ValidPlaceNotFound: "You do not have a valid ROBLOX experience",
      InsufficientFunds: "Special error 3! Please contact JustEarn staff",
    }[payoutResponse.result];

    return response(
      {
        success: false,
        message: errorMessage,
      },
      400
    );
  }

  const payoutMethod = await PayoutMethod.findById(data.payoutMethodId);
  if (!payoutMethod) {
    return response(
      {
        success: false,
      },
      404
    );
  }

  if (payoutMethod.type === "crypto") {
    // const cryptoAmount = parseFloat(data.option);
    const usdAmount = parseFloat(data.option);

    const address = data.info;

    // Determine the cryptocurrency name from the selected payout method
    const cryptocurrency = payoutMethod.name; // Assuming the name corresponds to the cryptocurrency (BTC, LTC, ETH)

    // Fetch the corresponding cryptocurrency rate from the payout method
    // Fetch the cryptocurrency rate based on the selected cryptocurrency name
    // const cryptofetch = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrency.toLowerCase()}&vs_currencies=usd`);
    // const cryptoData = await cryptofetch.json();
    // const cryptoRate = cryptoData[cryptocurrency.toLowerCase()].usd;
    const cryptoRate = data.exchangeRate;
    // Calculate USD amount based on the selected cryptocurrency's rate
    // const usdAmount = cryptoAmount * cryptoRate;
    const formattedUsdAmount = usdAmount.toFixed(2); // Format USD amount to 2 decimal places
    const deductionAmount = usdAmount * 100; // Deduct 100 tokens/points/coins for every $1 USD
    // console.log(`${cryptocurrency} Amount:`, cryptoAmount);
    console.log("USD Amount:", formattedUsdAmount);
    console.log("Deduction Amount:", deductionAmount);

    if (usdAmount < payoutMethod.minimum) {
      return response(
        {
          success: false,
          message: "You're requesting a payout lower than the minimum",
        },
        400
      );
    }

    if (user.points < payoutMethod.minimumEarned) {
      return response(
        {
          success: false,
          message:
            "You haven't earned enough points to unlock this payout method yet",
        },
        406
      );
    }

    // if (balance < deductionAmount) {
    //   return response(
    //     {
    //       success: false,
    //       message: "You don't have enough points",
    //     },
    //     406
    //   );
    // }

    // how much of requested crypto will user get for this usd amount
    const rewardAmount = (usdAmount - payoutMethod.fee) / cryptoRate;

    // const client = new WalletAPI(process.env.CRYPTO_WALLET_KEY, process.env.CRYPTO_SECRET_KEY, payoutMethod.name === 'Ethereum' ? 'eth' : payoutMethod.name === 'Bitcoin' ? 'btc' : 'ltc');

    // const sendTransaction = await client.sendTransaction({
    //   destinations: {
    //     address:rewardAmount
    //   }
    // })
    // console.log("Payment Method:", payoutMethod);
    try {
      const payoutResponse = await fetch(`https://cryptounifier.io/api/v1/wallet/${payoutMethod.name === 'Ethereum' ? 'eth' : payoutMethod.name === 'Bitcoin' ? 'btc' : 'ltc'}/send-transaction`, {
        method: 'POST',
        headers: {
          'X-Wallet-Key': process.env.CRYPTO_WALLET_KEY,
          'X-Secret-Key': process.env.CRYPTO_SECRET_KEY,
          'Content-Type': 'application/json' // Ensure content type is set
        },
        body: JSON.stringify({
          destinations: JSON.stringify({
            [address]: rewardAmount
          }),
          fee_per_byte: 1
        })
      });
      const data = await payoutResponse.json();
      if (payoutResponse.status !== 200) return response(
        {
          success: false,
          message: data.message,
        },
        500
      );
      user.cashedOut += deductionAmount;
      // user.points -= deductionAmount;
      await user.save();


      const reward = new Reward({
        user,
        processing: 1,
        type: payoutMethod.type,
        reward: `${rewardAmount.toFixed(
          8
        )} ${cryptocurrency} @ $${formattedUsdAmount}`,
        price: usdAmount * 100,
        info: address,
      });

      await reward.save();
      await email.sendPurchaseConfirmationEmail(
        user.email,
        user.username,
        payoutMethod.name,
        payoutMethod.logo
      );

      return response({
        success: true,
      });
    } catch (error) {
      console.log(error);
      return response(
        {
          success: false,
          message:
            "Your address cannot be considered valid for this cryptocurrency.",
        },
        500
      );
    }
  } else if (payoutMethod.type === "cash") {
    const option = parseInt(data.option);
    const info = data.info;

    if (user.points < payoutMethod.minimumEarned) {
      return response(
        {
          success: false,
          message:
            "You haven't earned enough points to unlock this payout method yet",
        },
        406
      );
    }

    if (option >= payoutMethod.options.length || option < 0) {
      return response(
        {
          success: false,
          message: "Invalid option",
        },
        400
      );
    }

    const chosenOption = payoutMethod.options[option];
    const amount = chosenOption.price + chosenOption.fee;

    if (amount < 0 || amount < payoutMethod.minimum) {
      return response(
        {
          success: false,
          message: "You're requesting a payout lower than the minimum",
        },
        400
      );
    }
    if (balance < amount) {
      return response(
        {
          success: false,
          message: "You don't have enough points",
        },
        406
      );
    }
    try {
      const payoutResponse = await createPayout(info, chosenOption.value);
      if (!payoutResponse.success) {
        return response({
          success: false,
          message: payoutResponse.message || 'Payout failed',
        }, 400);
      }
      user.cashedOut += amount;
      await user.save();

      const reward = new Reward({
        user,
        processing: 1,
        type: payoutMethod.type,
        reward: (chosenOption.value / 100).toString() + "$ " + payoutMethod.name,
        amount,
        info,
        tremendousUSDValue: chosenOption.tremendousUSD,
      });
      await reward.save();

      return response({ success: true });
    } catch (error) {
      console.error("Payout Error:", error);
      return response({ success: false, message: 'An error occurred while processing the payout.' }, 500);
    }
  } else {
    try {
      const option = parseInt(data.option);

      if (user.points < payoutMethod.minimumEarned) {
        return response(
          {
            success: false,
            message:
              "You haven't earned enough points to unlock this payout method yet",
          },
          406
        );
      }

      if (option >= payoutMethod.options.length || option < 0) {
        return response(
          {
            success: false,
            message: "Invalid option",
          },
          400
        );
      }

      const chosenOption = payoutMethod.options[option];
      const price = chosenOption.price + chosenOption.fee;

      // if (balance < price) {
      //   return response(
      //     {
      //       success: false,
      //       message: "You don't have enough points",
      //     },
      //     406
      //   );
      // }

      // const response = await fetch('https://testflight.tremendous.com/api/v2/orders', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.TREMENDOUS_API_KEY}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     'payment': {
      //       "funding_source_id": "BALANCE"
      //     },
      //     "rewards": {
      //       "value": {
      //         "denomination": chosenOption.price,
      //       },
      //       "delivery": {
      //         "method": "EMAIL"
      //       },
      //       "recipient": {
      //         "name": user.username,
      //         "email": user.email
      //       },
      //       "products": [
      //         ""
      //       ]
      //     }
      //   })
      // });

      // if (response.status !== 200) {
      //   return response({
      //     success: false,
      //     message: 'An error occurred while processing the payout.',
      //   }, 500);
      // }

      user.cashedOut += price;
      await user.save();

      const reward = new Reward({
        user,
        type: payoutMethod.type,
        reward: (chosenOption.value / 100).toString() + "$ " + payoutMethod.name,
        price,
      });
      await reward.save();

      return response({
        success: true,
      });
    } catch (error) {
      console.error("Payout Error:", error);
      return response({ success: false, message: 'An error occurred while processing the payout.' }, 500);
    }
  }
};

async function createPayout(receiverEmail, amount) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${process.env.PAYPAL_PAYOUTS_API_URL}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "sender_batch_header": {
        "sender_batch_id": Math.random().toString(36).substring(9),
        "email_subject": "You have a payout!",
        "email_message": "You have received a payout! Thanks for using our service!"
      },
      "items": [{
        "recipient_type": "EMAIL",
        "amount": { "value": amount.toFixed(2), "currency": "USD" },
        "note": "Thanks for your patronage!",
        "sender_item_id": Math.random().toString(36).substring(9),
        "receiver": receiverEmail,
        "notification_language": "en-EN"
      }]
    })
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error:", errorData);
  } else {
    const payoutData = await response.json();
    console.log("Payout successful:", payoutData);
  }

  return { success: true };
}

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID; // Your PayPal client ID
  const secret = process.env.PAYPAL_CLIENT_SECRET; // Your PayPal secret

  const response = await fetch(`${process.env.PAYPAL_TOKEN_API_URL}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to retrieve access token');
  }

  return data.access_token;
}