import Token from '../../../../models/Token.model.js';

export const load = async(request) => {
    const token = request.url.searchParams.get('token')
    const tokenDoc = await Token.findOne({ token });
    const email = tokenDoc? tokenDoc.email: null
    return {
        email,
    }
}