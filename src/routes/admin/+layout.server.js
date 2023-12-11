import { redirect } from '@sveltejs/kit';
import { verify } from '../../lib/server/jwt.js';
import User from '../../models/User.model.js';

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

    return {};
}