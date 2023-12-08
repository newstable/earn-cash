import mongoose, { Schema } from "mongoose";

const featured = new Schema({
    offerId: Number,
    wall: Number,
    country: [String],
    name: String,
    description: String,
    requirements: String,
    clickUrl: String,
    iconUrl: String,
    payout: Number,
    isIOS: Boolean,
    isAndroid: Boolean,
    pointsPayout: Number,
    tutorial: String,
    type: String
});

const Featured = mongoose.models.Featured || mongoose.model("Featured", featured);

export default Featured;