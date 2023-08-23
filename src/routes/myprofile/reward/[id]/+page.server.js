import { isValidObjectId } from 'mongoose';
import { verify } from '../../../../lib/server/jwt.js';
import Reward from '../../../../models/Reward.model.js';
import User from '../../../../models/User.model.js';

export const load = async(request) => {
    const id = request.params.id;

    if (!isValidObjectId(id)) {
        return {};
    }

    const token = request.cookies.get("token");

    if (typeof token !== "string") {
        return {};
    }

    const data = verify(token);
    if (!data.success) {
        return {};
    }

    const user = await User.findOne({ _id: data.data.body.uid });

    const reward = await Reward.findOne({ _id: id, user });
    if (!reward) {
        return {};
    }

    return {
        reward: {
            date: reward.date,
            type: reward.type,
            reward: reward.reward,
            price: reward.price,
            code: reward.code,
            pin: reward.pin,
            cardNumber: reward.cardNumber,
            expMonth: reward.expMonth,
            expYear: reward.expYear,
            csv: reward.csv,
            info: reward.info,
            processing: reward.processing,
            hold: reward.hold,
            sentDate: reward.sentDate,
            revoked: reward.revoked
        }
    }
}