import { redirect } from "@sveltejs/kit";
import { verify } from "../../lib/server/jwt.js";
import User from "../../models/User.model.js";
import RefEarning from "../../models/RefEarning.model";
import OfferDone from "../../models/OfferDone.model";
import Game from "../../models/Game.model";
import { offerWalls } from "../../lib/offerWalls";
import Reward from "../../models/Reward.model.js";

const lastMonthStartDate = new Date(Date.now() - 61 * 24 * 3600 * 1000);

const getEarnings = async () => {
  // const earnings = await RefEarning.find({
  //   date: { $gte: lastMonthStartDate },
  // });
  // const earnings = await OfferDone.find({
  //   date: { $gte: lastMonthStartDate },
  // });
  let todaysEarning = 0;
  let yesterdaysEarning = 0;
  let weeksEarning = 0;
  let monthsEarning = 0;
  let lastMonthsEarning = 0;

  // console.log(
  //   // new Date(new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
  //   new Date(new Date().setUTCHours(0, 0, 0, 0)),
  //   "this"
  // );

  // console.log(new Date(new Date().setUTCHours(0, 0, 0, 0)), "there");

  const todayStart = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const yesterdayStart = new Date(
    new Date().setUTCHours(0, 0, 0, 0) - 86400000
  );

  const todaysEarningAggregatedPromise = OfferDone.aggregate([
    {
      $match: {
        // date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        date: {
          $gte: todayStart,

          // new Date(
          //   // new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
          // ),
        },
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalAmount: { $sum: "$payout" }, // Calculate the sum of the 'amount' field
      },
    },
  ]);

  const yesterdaysEarningAggregatedPromise = OfferDone.aggregate([
    {
      $match: {
        date: {
          $gte: yesterdayStart,
          $lt: todayStart,
        },
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalAmount: { $sum: "$payout" }, // Calculate the sum of the 'amount' field
      },
    },
  ]);

  // const currentWeekStart = new Date(
  //   Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)
  // );

  const currentDate = new Date();

  // Calculate the difference in days between the current day and the last Sunday
  const daysUntilLastSunday = (currentDate.getUTCDay() + 7 - 0) % 7;
  const lastSunday = new Date(currentDate);
  lastSunday.setUTCHours(0, 0, 0, 0);
  lastSunday.setUTCDate(currentDate.getUTCDate() - daysUntilLastSunday);

  // If today is Sunday, reset lastSunday to the current date
  if (daysUntilLastSunday === 0) {
    lastSunday.setUTCDate(currentDate.getUTCDate());
  }

  // console.log({ lastSunday });

  const weeksEarningAggregatedPromise = OfferDone.aggregate([
    {
      $match: {
        date: {
          $gte: lastSunday,
          // new Date(
          //   new Date().setHours(0, 0, 0, 0) - 7 * 24 * 3600 * 1000
          // ),
        },
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalAmount: { $sum: "$payout" }, // Calculate the sum of the 'amount' field
      },
    },
  ]);

  const currentMonthStart = new Date(
    Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)
  );

  const prevMonthStart = new Date(
    Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() - 1, 1)
  );

  // console.log(currentMonthStart, prevMonthStart);

  const monthsEarningAggregatedPromise = OfferDone.aggregate([
    {
      $match: {
        date: {
          $gte: currentMonthStart,
          // $gte: new Date(
          //   new Date().setHours(0, 0, 0, 0) - 30 * 24 * 3600 * 1000
          // ),
        },
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalAmount: { $sum: "$payout" }, // Calculate the sum of the 'amount' field
      },
    },
  ]);

  const lastMonthsEarningAggregatedPromise = OfferDone.aggregate([
    {
      $match: {
        date: {
          $gte: prevMonthStart,
          $lt: currentMonthStart,
        },
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalAmount: { $sum: "$payout" }, // Calculate the sum of the 'amount' field
      },
    },
  ]);

  const [
    todaysEarningAggregated,
    yesterdaysEarningAggregated,
    weeksEarningAggregated,
    monthsEarningAggregated,
    lastMonthsEarningAggregated,
  ] = await Promise.all([
    todaysEarningAggregatedPromise,
    yesterdaysEarningAggregatedPromise,
    weeksEarningAggregatedPromise,
    monthsEarningAggregatedPromise,
    lastMonthsEarningAggregatedPromise,
  ]);

  console.log({
    todaysEarningAggregated,
    yesterdaysEarningAggregated,
    weeksEarningAggregated,
    monthsEarningAggregated,
    lastMonthsEarningAggregated,
  });

  if (todaysEarningAggregated?.[0]?.totalAmount) {
    todaysEarning = todaysEarningAggregated?.[0]?.totalAmount;
    // weeksEarning += todaysEarningAggregated?.[0]?.totalAmount;
    // monthsEarning += todaysEarningAggregated?.[0]?.totalAmount;
  }

  if (yesterdaysEarningAggregated?.[0]?.totalAmount) {
    yesterdaysEarning = yesterdaysEarningAggregated?.[0]?.totalAmount;
    // weeksEarning += yesterdaysEarningAggregated?.[0]?.totalAmount;
    // monthsEarning += yesterdaysEarningAggregated?.[0]?.totalAmount;
  }

  if (weeksEarningAggregated?.[0]?.totalAmount) {
    weeksEarning += weeksEarningAggregated?.[0]?.totalAmount;
    // monthsEarning += weeksEarningAggregated?.[0]?.totalAmount;
  }

  if (monthsEarningAggregated?.[0]?.totalAmount) {
    monthsEarning += monthsEarningAggregated?.[0]?.totalAmount;
  }

  if (lastMonthsEarningAggregated?.[0]?.totalAmount) {
    lastMonthsEarning += lastMonthsEarningAggregated?.[0]?.totalAmount;
  }

  // console.log({ todaysEarningAggregated });
  // why is that an empty array?

  // earnings.forEach((earning) => {
  //   if (earning.date.toDateString() === new Date().toDateString()) {
  //     todaysEarning += earning?.payout;
  //     weeksEarning += earning?.payout;
  //     monthsEarning += earning?.payout;
  //   } else if (
  //     earning.date.toDateString() ===
  //     new Date(Date.now() - 86400000).toDateString()
  //   ) {
  //     yesterdaysEarning += earning?.payout;
  //     weeksEarning += earning?.payout;
  //     monthsEarning += earning?.payout;
  //   } else if (
  //     earning.date.getTime() >
  //     new Date(Date.now() - 7 * 24 * 3600 * 1000).getTime()
  //   ) {
  //     weeksEarning += earning?.payout;
  //     monthsEarning += earning?.payout;
  //   } else if (
  //     earning.date.getTime() >
  //     new Date(Date.now() - 30 * 24 * 3600 * 1000).getTime()
  //   ) {
  //     monthsEarning += earning?.payout;
  //   } else {
  //     lastMonthsEarning += earning?.payout;
  //   }
  // });
  return {
    todaysEarning,
    yesterdaysEarning,
    weeksEarning,
    monthsEarning,
    lastMonthsEarning,
  };
};

const getOffers = async () => {
  // const start = Date.now();
  // const offerDone = await OfferDone.find({
  //   date: { $gte: lastMonthStartDate },
  // });

  const todayStart = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const yesterdayStart = new Date(
    new Date().setUTCHours(0, 0, 0, 0) - 86400000
  );

  const currentDate = new Date();

  // Calculate the difference in days between the current day and the last Sunday
  const daysUntilLastSunday = (currentDate.getUTCDay() + 7 - 0) % 7;
  const lastSunday = new Date(currentDate);
  lastSunday.setUTCHours(0, 0, 0, 0);
  lastSunday.setUTCDate(currentDate.getUTCDate() - daysUntilLastSunday);

  // If today is Sunday, reset lastSunday to the current date
  if (daysUntilLastSunday === 0) {
    lastSunday.setUTCDate(currentDate.getUTCDate());
  }

  const currentMonthStart = new Date(
    Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)
  );

  const prevMonthStart = new Date(
    Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() - 1, 1)
  );

  const offerDoneTodayPromise = OfferDone.find({
    date: { $gte: todayStart },
  }).countDocuments();

  const offerDoneThisWeekPromise = OfferDone.find({
    date: {
      $gte: lastSunday,
    },
  }).countDocuments();

  const offerDoneThisMonthPromise = OfferDone.find({
    date: {
      $gte: currentMonthStart,
    },
  }).countDocuments();

  const offerDoneLastMonthPromise = OfferDone.find({
    date: {
      $gte: prevMonthStart,
      $lt: currentMonthStart,
    },
  }).countDocuments();

  const [
    offerDoneToday,
    offerDoneThisWeek,
    offerDoneThisMonth,
    offerDoneLastMonth,
  ] = await Promise.all([
    offerDoneTodayPromise,
    offerDoneThisWeekPromise,
    offerDoneThisMonthPromise,
    offerDoneLastMonthPromise,
  ]);

  // console.log(offerDone);
  // console.log(start - Date.now());
  // let todaysOffer = 0;
  // let weeksOffer = 0;
  // let monthsOffer = 0;
  // let lastMonthsOffer = 0;

  // offerDone.forEach((offer) => {
  //   if (offer.date.toDateString() === new Date().toDateString()) {
  //     todaysOffer++;
  //     weeksOffer++;
  //     monthsOffer++;
  //   } else if (
  //     offer.date.getTime() >
  //     new Date(Date.now() - 7 * 24 * 3600 * 1000).getTime()
  //   ) {
  //     weeksOffer++;
  //     monthsOffer++;
  //   } else if (
  //     offer.date.getTime() >
  //     new Date(Date.now() - 30 * 24 * 3600 * 1000).getTime()
  //   ) {
  //     monthsOffer++;
  //   } else {
  //     lastMonthsOffer++;
  //   }
  // });
  return {
    todaysOffer: offerDoneToday,
    weeksOffer: offerDoneThisWeek,
    monthsOffer: offerDoneThisMonth,
    lastMonthsOffer: offerDoneLastMonth,
    // todaysOffer,
    // weeksOffer,
    // monthsOffer,
    // lastMonthsOffer,
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
  const todayStart = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const yesterdayStart = new Date(
    new Date().setUTCHours(0, 0, 0, 0) - 86400000
  );

  const currentDate = new Date();

  // Calculate the difference in days between the current day and the last Sunday
  const daysUntilLastSunday = (currentDate.getUTCDay() + 7 - 0) % 7;
  const lastSunday = new Date(currentDate);
  lastSunday.setUTCHours(0, 0, 0, 0);
  lastSunday.setUTCDate(currentDate.getUTCDate() - daysUntilLastSunday);

  // If today is Sunday, reset lastSunday to the current date
  if (daysUntilLastSunday === 0) {
    lastSunday.setUTCDate(currentDate.getUTCDate());
  }

  const currentMonthStart = new Date(
    Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)
  );

  const prevMonthStart = new Date(
    Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() - 1, 1)
  );
  // console.log("getUserInfo");
  // const todaysDate = new Date();
  // const yesterdaysDate = new Date(Date.now() - 86400000);
  // const weekDate = new Date(Date.now() - 7 * 24 * 3600 * 1000);
  // const monthStartDate = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth(),
  //   1
  // );
  // const lastMonthStartDate = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth() - 1,
  //   1
  // );

  // console.log("wroks until here");

  const totalPromise = User.count();

  const emailPromise = User.find({ emailConfirmed: true }).count();
  // console.log("doesnt until here", { $gte: yesterdaysDate, $lt: todaysDate });
  const todayPromise = User.find({ joinDate: { $gte: todayStart } }).count();
  const yesterdayPromise = User.find({
    joinDate: { $gte: yesterdayStart, $lt: todayStart },
  }).count();
  const weekPromise = User.find({ joinDate: { $gte: lastSunday } }).count();
  const monthPromise = User.find({
    joinDate: { $gte: currentMonthStart },
  }).count();
  const lastMonthPromise = User.find({
    joinDate: { $gte: prevMonthStart, $lt: currentMonthStart },
  }).count();
  // console.log("getUserInfo");

  const [total, email, today, yesterday, week, month, lastMonth] =
    await Promise.all([
      totalPromise,
      emailPromise,
      todayPromise,
      yesterdayPromise,
      weekPromise,
      monthPromise,
      lastMonthPromise,
    ]);

  return {
    total,
    email,
    today,
    yesterday,
    week,
    month,
    lastMonth,
  };
};

export const load = async (request) => {
  const token = request.cookies.get("token");

  if (typeof token === "undefined") {
    throw redirect(302, "/");
  }

  const jwt = verify(token);
  if (!jwt.success) {
    throw redirect(302, "/");
  }

  // console.log({ uid: jwt.data.body.uid });

  const user = await User.findById(jwt.data.body.uid);
  console.log("user", user);

  // console.log({ user });

  if (!user) {
    throw redirect(302, "/");
  }

  if (user.rank != 3) {
    throw redirect(302, "/");
  }

  // console.time("start: ");

  const earningsPromise = getEarnings();
  // console.log("earningsPromise");
  const offersPromise = getOffers();
  // console.log("offersPromise");
  const gamePromise = getGameInfo();
  // console.log("gamePRomise");
  const userinfoPromise = getUserInfo();
  // console.log("userINfoPromise");
  const todayStart = new Date(new Date().setUTCHours(0, 0, 0, 0));

  const todaysWithdrawalsPromise = Reward.aggregate([
    {
      $match: {
        date: { $gte: todayStart },
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalAmount: { $sum: "$price" }, // Calculate the sum of the 'price' field
      },
    },
  ]);

  const mostAppearWallInfoPromise = OfferDone.aggregate([
    {
      $match: {
        date: { $gte: todayStart },
      },
    },
    {
      $group: {
        _id: "$wall", // Group by the field you want to count
        count: { $sum: 1 }, // Count occurrences of the field
      },
    },
    {
      $sort: {
        count: -1, // Sort by count in descending order
      },
    },
    {
      $limit: 1, // Limit to the first result, which will be the field with the highest count
    },
  ]);
  // console.log("mostAppearWallInfoPromise");

  const mostGrossingWallInfoPromise = OfferDone.aggregate([
    {
      $match: {
        date: { $gte: todayStart },
      },
    },
    {
      $group: {
        _id: "$wall", // Group by the field you want to count
        highest: { $sum: "$payout" }, // Sum value of the field
      },
    },
    {
      $sort: {
        highest: -1, // Sort by count in descending order
      },
    },
    {
      $limit: 1, // Limit to the first result, which will be the field with the highest count
    },
  ]);
  // console.log("mostGrossingWallInfoPromise");

  const mostAppearOfferInfoPromise = OfferDone.aggregate([
    {
      $match: {
        date: { $gte: todayStart },
      },
    },
    {
      $group: {
        _id: "$offerId", // Group by the field you want to count
        count: { $sum: 1 }, // Count occurrences of the field
        offerName: { $first: "$offerName" },
      },
    },
    {
      $sort: {
        count: -1, // Sort by count in descending order
      },
    },
    {
      $limit: 1, // Limit to the first result, which will be the field with the highest count
    },
  ]);
  // console.log("mostAppearOfferInfoPromise");

  const mostGrossingOfferInfoPromise = OfferDone.aggregate([
    {
      $match: {
        date: { $gte: todayStart },
      },
    },
    {
      $group: {
        _id: "$offerId", // Group by the field you want to count
        highest: { $sum: "$payout" }, // Sum value of the field
        offerName: { $first: "$offerName" },
      },
    },
    {
      $sort: {
        highest: -1, // Sort by count in descending order
      },
    },
    {
      $limit: 1, // Limit to the first result, which will be the field with the highest count
    },
  ]);
  // console.log("mostGrossingOfferInfoPromise");

  const mostCountryPromise = User.aggregate([
    {
      $match: {
        joinDate: { $gte: todayStart },
      },
    },
    {
      $group: {
        _id: "$country", // Group by the field you want to count
        highest: { $sum: 1 }, // Count the field
      },
    },
    {
      $sort: {
        highest: -1, // Sort by count in descending order
      },
    },
    {
      $limit: 1, // Limit to the first result, which will be the field with the highest count
    },
  ]);
  // console.log("mostGrossingOfferInfoPromise");
  //
  console.time("promise all");
  const [
    earnings,
    offers,
    game,
    userinfo,
    mostAppearWallInfo,
    mostGrossingWallInfo,
    mostAppearOfferInfo,
    mostGrossingOfferInfo,
    mostCountry,
    todaysWithdrawals,
  ] = await Promise.all([
    earningsPromise,
    offersPromise,
    gamePromise,
    userinfoPromise,
    mostAppearWallInfoPromise,
    mostGrossingWallInfoPromise,
    mostAppearOfferInfoPromise,
    mostGrossingOfferInfoPromise,
    mostCountryPromise,
    todaysWithdrawalsPromise,
  ]);
  console.timeEnd("promise all");
  // console.log({ mostCountry });

  // console.log("promise all");

  const mostAppearWall = offerWalls.filter(
    (wall) => wall.wallId === mostAppearWallInfo?.[0]?._id
  );
  const mostGrossingWall = offerWalls.filter(
    (wall) => wall.wallId === mostGrossingWallInfo?.[0]?._id
  );

  // console.timeEnd("start: ");
  // console.log({
  //   mostAppearOfferInfo,
  //   mostGrossingOfferInfo,
  // });

  return {
    info: {
      earnings,
      offers,
      game,
      user: userinfo,
      todaysProfit:
        earnings.todaysEarning - todaysWithdrawals?.[0]?.totalAmount / 100,
    },
    popular: {
      wall: {
        quantity: {
          name: mostAppearWall?.[0]?.wallName,
          amount: mostAppearWallInfo?.[0]?.count,
        },
        grossing: {
          name: mostGrossingWall?.[0]?.wallName,
          amount: mostGrossingWallInfo?.[0]?.highest,
        },
      },
      offer: {
        quantity: {
          name: mostAppearOfferInfo?.[0]?.offerName
            ? mostAppearOfferInfo?.[0]?.offerName
            : "_",
          amount: mostAppearOfferInfo?.[0]?.count,
        },
        grossing: {
          name: mostGrossingOfferInfo?.[0]?.offerName
            ? mostGrossingOfferInfo?.[0]?.offerName
            : "_",
          amount: mostGrossingOfferInfo?.[0]?.highest,
        },
      },
    },
    sign: {
      country: mostCountry?.[0]?._id,
      count: mostCountry?.[0]?.highest,
    },
  };
};
