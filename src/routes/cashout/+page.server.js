import PayoutMethod from "../../models/PayoutMethod.model";

export const load = async() => {
    const payoutMethods = await PayoutMethod.find();
    var data = {};

    for (let i = 0; i < payoutMethods.length; i++) {
        const p = payoutMethods[i];

        if (data[p.type]) {
            data[p.type].push({
                name: p.name,
                shopLogo: p.shopLogo,
                shopBackground: p.shopBackground
            });
        } else {
            data[p.type] = [{
                name: p.name,
                shopLogo: p.shopLogo,
                shopBackground: p.shopBackground
            }];
        }
    }

    return data;
}


