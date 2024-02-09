import { json } from "@sveltejs/kit";
// import OfferDone from "../../models/OfferDone.model";
import User from "../../models/User.model";
import Reward from "../../models/Reward.model.js";
// import fs from "fs";

// export const GET = async () => {
//   //   console.log(new Date("2024-01-15T23:00:00Z"), "Date");
//   const offerdones = await OfferDone.aggregate([
//     {
//       $match: {
//         date: { $gte: new Date("2024-01-15T23:00:00Z") },
//       },
//     },
//     {
//       $group: {
//         _id: "$user",
//         total: {
//           $sum: "$tokens",
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "_id",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $unwind: {
//         path: "$user",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $project: {
//         username: "$user.username",
//         userId: "$user._id",
//         total: 1,
//       },
//     },
//     {
//       $sort: {
//         total: -1,
//       },
//     },
//   ]);

//   const file = fs.createWriteStream("user-earning-restore.txt");

//   file.once("open", async function (fd) {
//     await offerdones.forEach(async (doc, index) => {
//       console.log(usersAfter15th.includes(doc.userId));

//       if (usersAfter15th.includes(doc.userId))
//         return console.log("User after 15th returning");

//       let text = "";
//       const user = await User.findById(doc.userId);

//       text += `email: ${user.email}, id: ${doc.userId}`;
//       text += `\nBefore update: user.points = ${user.points}, `; //user.cashedOut = ${user.cashedOut}, user.removedPoints = ${user.removedPoints},user.addedPoints = ${user.addedPoints}, user.pointsByRef = ${user.pointsByRef}, , user.totalPoints = ${user.totalPoints}`;

//       user.points += doc.total;
//       await user.save();
//       text += `\nAfter update: user.points = ${user.points}`;
//       text += `\n -----------------------------------------------------------------------------------\n`;

//       file.write(text);
//       // file.flush();
//       // console.log(index + 1, user._id, user.username, doc.username, "user");
//       //   console.log(text);
//       //   file.end();
//     });

//     //   console.log(offerdones, "offerdones");
//   });

//   return json({ data: offerdones });
// };

// const usersAfter15th = [
//   "65a5d42d1023c54afa99ff0c",
//   "65a5dbae1023c54afa9a6d1e",
//   "65a5fbfc1023c54afa9c87db",
//   "65a60068af4a261a3b281d0c",
//   "65a60125af4a261a3b285165",
//   "65a61007af4a261a3b292dae",
//   "65a6108aaf4a261a3b2932b7",
//   "65a62a75af4a261a3b2ac157",
//   "65a63ab6af4a261a3b2bccc4",
//   "65a69620af4a261a3b3166bb",
//   "65a69e32af4a261a3b31dcd8",
//   "65a62777af4a261a3b2a89e2",
//   "65a686edaf4a261a3b307cbc",
//   "65a6a949af4a261a3b3295a4",
//   "65a76bcecf3720c8b4578d11",
//   "65a7837acf3720c8b4590aeb",
//   "65a78f5fcf3720c8b459ae93",
//   "65a7a64acf3720c8b45b2e7c",
//   "65a7bf82cf3720c8b45ca664",
//   "65a7c076cf3720c8b45ca7b4",
//   "65a7c6efcf3720c8b45d18be",
//   "65a7d595cf3720c8b45df1c9",
//   "65a7f6f9cf3720c8b4601569",
//   "65a7f86bcf3720c8b46016a1",
//   "65a832cfcf3720c8b463c027",
//   "65a83f62cf3720c8b4646b3b",
//   "65a76f9ccf3720c8b457c400",
//   "65a77715cf3720c8b4583374",
//   "65a7930ccf3720c8b459e80d",
//   "65a7ed72cf3720c8b45f6f77",
//   "65a7f8eccf3720c8b460176f",
//   "65a80baccf3720c8b4615d5d",
//   "65a81197354d928f6c862a81",
//   "65a816f0cf3720c8b4620340",
//   "65a81861cf3720c8b462050e",
//   "65a8284bcf3720c8b46316d9",
//   "65a843dccf3720c8b464d91f",
// ];

// export const GET = async () => {
//   //   const users = await User.find({
//   //     lastActive: { $lt: new Date("2023-07-20T06:50:25.000Z") },
//   //   }).countDocuments();

//   const res = await User.updateMany(
//     {
//       lastActive: { $lt: new Date("2023-07-20T06:50:25.000Z") },
//       //   _id: "656449dee78d7b3956cc8369",
//     },
//     {
//       $set: {
//         points: 0,
//         cashedOut: 0,
//         removedPoints: 0,
//         addedPoints: 0,
//         pointsByRef: 0,
//         totalPoints: 0,
//       },
//     }
//   );

//   return json({ data: res });
// };

// --------------------------------------------------------------------------------------------------------------------------------

// export const GET = async (request) => {
//   let allUsers = await Reward.aggregate([
//     {
//       $group: {
//         _id: "$user",
//         totalCashout: {
//           $sum: "$price",
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "_id",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $unwind: {
//         path: "$user",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     // {
//     //   $match: {
//     //     "user.lastActive": {
//     //       $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 1),
//     //     },
//     //   },
//     // },
//     {
//       $project: {
//         username: "$user.username",
//         // cashedOut: "$user.cashedOut",
//         userId: "$user._id",
//         totalCashout: 1,
//         lastActive: "$user.lastActive",
//         "user.points": 1,
//         "user.addedPoints": 1,
//         "user.removedPoints": 1,
//         "user.cashedOut": 1,
//         currentWalletBalance: {
//           $add: [
//             "$user.points",
//             { $multiply: [-1, "$user.cashedOut"] },
//             { $multiply: [-1, "$user.removedPoints"] },
//             "$user.addedPoints",
//           ],
//         },
//       },
//     },
//     {
//       $sort: {
//         lastActive: -1,
//       },
//     },
//   ]);

//   allUsers = allUsers.filter((user) => {
//     return (
//       user.cashedOut !== user.totalCashout
//       // &&
//       // user.cashedOut >= user.totalCashout
//     );
//   });

//   allUsers = allUsers.filter((user) => {
//     return typeof user.username !== "undefined";
//   });

//   let idsOfTheseUsers = allUsers.map((el) => el._id);

//   let users = await User.find({ _id: { $in: idsOfTheseUsers } });

//   idsOfTheseUsers = allUsers.map((el) => `new ObjectId(${el._id})`);

//   users = users.map(async (u) => {
//     const currentWalletBalance =
//       u.points - u.cashedOut - u.removedPoints + u.addedPoints;

//     u.pointsByRef = 0;
//     u.addedPoints = 0;
//     u.removedPoints = 0;
//     u.cashedOut = 0;
//     u.points = 0;

//     u.addedPoints = currentWalletBalance;

//     await u.save();

//     return u;
//   });

//   return json({
//     // idsOfTheseUsers,
//     users,
//     // data: allUsers,
//   });
// };

//

// all users who have cashed out but their stats seem messed up
// old users who already had cashedOut points and current cashedOut points of their profile are greater than thier sum of their total cashouts done til now, because they are old users
// not that old users have their cashedOut points dont match up with the sum of their total cashouts yet
