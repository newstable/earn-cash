import User from "../../models/User.model"

const userRequest = async(user, geoInfo) => {
    const {ip, country} = geoInfo
    if (typeof user === "string") {
        user = await User.findOne({ _id: user });
    }

    user.lastActive = new Date();
    user.ip = ip;
    user.country = country;
    await user.save();
}

export default userRequest;