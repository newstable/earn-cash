import mongoose, { Schema } from "mongoose";

const offerDone = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    country: String,
    conversionId: String,
    offerId: String,
    payout: Number,
    offerName: String,
    ip: String,
    tokens: Number,
    wall: Number,
    status: Number,
    ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const OfferDone = mongoose.models.OfferDone || mongoose.model("OfferDone", offerDone);

export default OfferDone;