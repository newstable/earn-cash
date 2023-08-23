import mongoose, { Schema } from "mongoose";


const refEarning = new Schema({
    earner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    master: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    offerDone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OfferDone'
    },
    points: Number,
    pointsForRef: Number,
    commissionPercentage: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const RefEarning = mongoose.models.RefEarning || mongoose.model("RefEarning", refEarning);

export default RefEarning;