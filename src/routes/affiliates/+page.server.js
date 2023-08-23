import getCommision from '../../lib/server/getCommision.js';
import getRefTier from '../../lib/server/getRefTier.js';
import { verify } from '../../lib/server/jwt.js';
import RefEarning from '../../models/RefEarning.model.js';
import User from '../../models/User.model.js';

export const load = async(request) => {
    const token = request.cookies.get("token");

    if (typeof token !== "string") {
        return {};
    }

    const data = verify(token);
    if (!data.success) {
        return {};
    }

    const user = await User.findOne({ _id: data.data.body.uid });

    var totalEarned30days = 0;
    const refEarnings = await RefEarning.find({ master: user }).sort({ "date": -1 });
    for (var i = 0; i < refEarnings.length; i++) {
        const refEarning = refEarnings[i];
        if (Math.ceil(Math.abs(Date.now() - refEarning.date) / (1000 * 60 * 60 * 24))) {
            totalEarned30days += refEarning.pointsForRef;
        } else {
            break;
        }
    }

    return {
        username: user.username,
        id: user._id.toString(),
        customRef: user.customReferralCode,
        totalEarnings: user.pointsByRef,
        totalEarned30days,
        usersReferred: await User.countDocuments({ refBy: user }),
        picture: user.picture,
        tier: await getRefTier() + 1,
        commissionPercentage: await getCommision()
    }
}