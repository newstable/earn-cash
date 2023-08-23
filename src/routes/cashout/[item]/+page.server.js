import PayoutMethod from '../../../models/PayoutMethod.model';

export const load = async({ params }) => {
    const method = await PayoutMethod.findOne({ name: { $regex: new RegExp("^" + params.item + "$", "i") } });
    return JSON.parse(JSON.stringify(method));
}