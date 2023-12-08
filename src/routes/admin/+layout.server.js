import { redirect } from '@sveltejs/kit';
import { verify } from '../../lib/server/jwt.js';
import User from '../../models/User.model.js';
import RefEarning from "../../models/RefEarning.model";
import OfferDone from "../../models/OfferDone.model";
import Game from "../../models/Game.model";
import { offerWalls } from "../../lib/offerWalls";

const lastMonthStartDate = new Date(Date.now() - 61 * 24 * 3600 * 1000);

const getEarnings = async () => {
  const earnings = await RefEarning.find({
    date: { $gte: lastMonthStartDate },
  });
  let todaysEarning = 0;
  let yesterdaysEarning = 0;
  let weeksEarning = 0;
  let monthsEarning = 0;
  let lastMonthsEarning = 0;
  earnings.forEach((earning) => {
    if (earning.date.toDateString() === new Date().toDateString()) {
      todaysEarning += earning.pointsForRef;
      weeksEarning += earning.pointsForRef;
      monthsEarning += earning.pointsForRef;
    } else if (
      earning.date.toDateString() ===
      new Date(Date.now() - 86400000).toDateString()
    ) {
      yesterdaysEarning += earning.pointsForRef;
      weeksEarning += earning.pointsForRef;
      monthsEarning += earning.pointsForRef;
    } else if (
      earning.date.getTime() >
      new Date(Date.now() - 7 * 24 * 3600 * 1000).getTime()
    ) {
      weeksEarning += earning.pointsForRef;
      monthsEarning += earning.pointsForRef;
    } else if (
      earning.date.getTime() >
      new Date(Date.now() - 30 * 24 * 3600 * 1000).getTime()
    ) {
      monthsEarning += earning.pointsForRef;
    } else {
      lastMonthsEarning += earning.pointsForRef;
    }
  });
  return {
    todaysEarning,
    yesterdaysEarning,
    weeksEarning,
    monthsEarning,
    lastMonthsEarning,
  };
};

const getOffers = async () => {
  const offerDone = await OfferDone.find({
    date: { $gte: lastMonthStartDate },
  });
  let todaysOffer = 0;
  let weeksOffer = 0;
  let monthsOffer = 0;
  let lastMonthsOffer = 0;
  offerDone.forEach((offer) => {
    if (offer.date.toDateString() === new Date().toDateString()) {
      todaysOffer++;
      weeksOffer++;
      monthsOffer++;
    } else if (
      offer.date.getTime() >
      new Date(Date.now() - 7 * 24 * 3600 * 1000).getTime()
    ) {
      weeksOffer++;
      monthsOffer++;
    } else if (
      offer.date.getTime() >
      new Date(Date.now() - 30 * 24 * 3600 * 1000).getTime()
    ) {
      monthsOffer++;
    } else {
      lastMonthsOffer++;
    }
  });
  return {
    todaysOffer,
    weeksOffer,
    monthsOffer,
    lastMonthsOffer,
  };
};

const getGameInfo = async () => {
    const round = await Game.count();
    const circulation = (
      await Game.aggregate([
        {
          $group: {
            _id: null, // Group all documents together
            totalAmount: { $sum: "$player1_amount" }, // Calculate the sum of the 'amount' field
          },
        },
      ])
    )[0].totalAmount;
    return {
      round,
      circulation: circulation * 2,
      tax: Math.round((circulation * 2) / 10),
    };
  };

  const getUserInfo = async () => {
    const todaysDate = new Date(new Date().toLocaleDateString());
    const yesterdaysDate = new Date(
      new Date(Date.now() - 86400000).toLocaleDateString()
    );
    const weekDate = new Date(Date.now() - 7 * 24 * 3600 * 1000);
    const monthStartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const lastMonthStartDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);

    const total = await User.count();
    const email = await User.find({ emailConfirmed: true }).count();
    const today = await User.find({ joinDate: { $gte: todaysDate } }).count();
    const yesterday = await User.find({
      joinDate: { $gte: yesterdaysDate, $lt: todaysDate },
    }).count();
    const week = await User.find({ joinDate: { $gte: weekDate } }).count();
    const month = await User.find({ joinDate: { $gte: monthStartDate } }).count();
    const lastMonth = await User.find({ joinDate: { $gte: lastMonthStartDate, $lt: monthStartDate } }).count();
    return {
      total,
      email,
      today,
      yesterday,
      week,
      month,
      lastMonth
    };
  };

export const load = async(request) => {
    const token = request.cookies.get("token");

    if (typeof token === "undefined") {
        throw redirect(302, '/');
    }

    const jwt = verify(token);
    if (!jwt.success) {
        throw redirect(302, '/');
    }

    const user = await User.findById(jwt.data.body.uid);

    if (!user) {
        throw redirect(302, '/');
    }

    if (user.rank != 3) {
        throw redirect(302, '/');
    }
    const earnings = await getEarnings();
    const offers = await getOffers();
    const game = await getGameInfo();
    const userinfo = await getUserInfo();

    const mostAppearWallInfo = (await OfferDone.aggregate([
        {
          $group: {
            _id: '$wall', // Group by the field you want to count
            count: { $sum: 1 } // Count occurrences of the field
          }
        },
        {
          $sort: {
            count: -1 // Sort by count in descending order
          }
        },
        {
          $limit: 1 // Limit to the first result, which will be the field with the highest count
        }
    ]))[0];
    const mostGrossingWallInfo = (await OfferDone.aggregate([
        {
          $group: {
            _id: '$wall', // Group by the field you want to count
            highest: { $sum: '$payout' } // Sum value of the field
          }
        },
        {
          $sort: {
            highest: -1 // Sort by count in descending order
          }
        },
        {
          $limit: 1 // Limit to the first result, which will be the field with the highest count
        }
    ]))[0];
    const mostAppearWall = offerWalls.filter((wall) => wall.wallId === mostAppearWallInfo._id);
    const mostGrossingWall = offerWalls.filter((wall) => wall.wallId === mostGrossingWallInfo._id);

    const mostAppearOfferInfo = (await OfferDone.aggregate([
        {
          $group: {
            _id: '$offerId', // Group by the field you want to count
            count: { $sum: 1 }, // Count occurrences of the field
            offerName:  { $first: '$offerName' }
          }
        },
        {
          $sort: {
            count: -1 // Sort by count in descending order
          }
        },
        {
          $limit: 1 // Limit to the first result, which will be the field with the highest count
        }
    ]))[0];
    const mostGrossingOfferInfo = (await OfferDone.aggregate([
        {
          $group: {
            _id: '$offerId', // Group by the field you want to count
            highest: { $sum: '$payout' }, // Sum value of the field
            offerName:  { $first: '$offerName' }
          }
        },
        {
          $sort: {
            highest: -1 // Sort by count in descending order
          }
        },
        {
          $limit: 1 // Limit to the first result, which will be the field with the highest count
        }
    ]))[0];
    const mostCountry = (await User.aggregate([
        {
          $group: {
            _id: '$country', // Group by the field you want to count
            highest: { $sum: 1 }, // Count the field
          }
        },
        {
          $sort: {
            highest: -1 // Sort by count in descending order
          }
        },
        {
          $limit: 1 // Limit to the first result, which will be the field with the highest count
        }
    ]))[0];

    return {
        info: {
            earnings,
            offers,
            game,
            user: userinfo,
        },
        popular: {
            wall: {
                quantity : {
                    name: mostAppearWall[0].wallName,
                    amount: mostAppearWallInfo.count
                },
                grossing: {
                    name: mostGrossingWall[0].wallName,
                    amount: mostGrossingWallInfo.highest
                }
            },
            offer: {
                quantity: {
                    name: mostAppearOfferInfo.offerName ? mostAppearOfferInfo.offerName : '_',
                    amount: mostAppearOfferInfo.count
                },
                grossing: {
                    name: mostGrossingOfferInfo.offerName ? mostGrossingOfferInfo.offerName : '_',
                    amount: mostGrossingOfferInfo.highest
                }
            },
        },
        sign: {
            country: mostCountry._id,
            count: mostCountry.highest
        }
    };
}