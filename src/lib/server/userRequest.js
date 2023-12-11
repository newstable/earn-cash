import User from "../../models/User.model";

// lloks like ip country and last active are being updated here
// this function is called in multiple other places
const userRequest = async (user, geoInfo) => {
  const { ip, country } = geoInfo;
  if (typeof user === "string") {
    user = await User.findOne({ _id: user });
  }

  user.lastActive = new Date();
  user.ip = ip;
  user.country = country;
  await user.save();
};

export default userRequest;
