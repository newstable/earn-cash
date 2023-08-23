import mongoose, { Schema } from "mongoose";

const payoutMethod = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["cash", "giftcard", "crypto"],
        required: true
    },
    info: String,
    minimumEarned: {
        type: Number,
        default: 0
    },
    logo: {
        type: String,
        required: true
    },
    logoHeight: Number,
    fee: {
        type: Number,
        default: 0
    },
    background: String,
    shopLogo: {
        type: String,
        required: true
    },
    shopBackground: {
        type: String,
        required: true
    },
    options: [{
        value: Number,
        price: Number,
        fee: {
            type: Number,
            default: 0
        },
        tremendousUSD: Number
    }],
    minimum: {
        type: Number,
        default: 0
    },
    rate: Number,
    short: String,
    country: String
});

const PayoutMethod = mongoose.models.PayoutMethod || mongoose.model("payoutmethods", payoutMethod);

export default PayoutMethod;