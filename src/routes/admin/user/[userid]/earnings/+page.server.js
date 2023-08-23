import OfferDone from '../../../../../models/OfferDone.model.js';
import User from '../../../../../models/User.model.js';

export const load = async(request) => {
    const userid = request.params.userid;
    const user = await User.findById(userid);

    const rawOffersDone = await OfferDone.find({ user });

    return {
        offersDone: JSON.parse(JSON.stringify(rawOffersDone))
    }
}