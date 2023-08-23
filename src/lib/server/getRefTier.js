import RefEarning from "../../models/RefEarning.model";
import commissionValues from "../commissionValues";

const getRefTier = async user => {
    const refEarnings = await RefEarning.find({
        master: user
    });

    var totalEarnedThroughRef = 0;
    for (var i = 0; i < refEarnings.length; i++) {
        totalEarnedThroughRef += refEarnings[i].pointsForRef;
    }

    var tier = 0;
    for (var i = 0; i < commissionValues.length; i++) {
        if (commissionValues[i].earned <= totalEarnedThroughRef) {
            tier = i;
        }
    }

    return tier;
}

export default getRefTier;