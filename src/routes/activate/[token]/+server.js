import { redirect } from "@sveltejs/kit";
import User from "../../../models/User.model";

export const GET = async(req, res) => {
    var user = await User.findOne({ ActivationKey: req.params.token });
    if (!user) {
        throw redirect(302, '/');
    }

    const { ip } = JSON.parse(process.env.geoInfo)

    user.emailConfirmed = true;
    user.rank = 1;
    user.verificationIp = ip;
    user.ip = ip;
    await user.save();

    throw redirect(302, '/');
}