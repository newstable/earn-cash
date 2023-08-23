import User from '../../../../models/User.model.js';

export const load = async(request) => {
    const userid = request.params.userid;
    const user = await User.findById(userid);

    return {
        user: JSON.parse(JSON.stringify(user))
    }
}