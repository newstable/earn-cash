import mongoose, { Schema } from "mongoose";

const featuredOffer = new Schema({
    offerID: String,
    wall: Number,
    country: {
        type: Array(String),
        default: []
    },
    name: String,
    anchor: String,
    description: String,
    requirements: String,
    clickURL: String,
    iconURL: String,
    tutorial: String,
    payout: {
        type: Number,
        default: 0
    },
    isIOS: {
        type: Boolean,
        default: false
    },
    isAndroid: {
        type: Boolean,
        default: false
    },
    pointsPayout: {
        type: Number,
        default: 0
    },
}, {versionKey: false});

const FeaturedOffer = mongoose.models.FeaturedOffer || mongoose.model("FeaturedOffer", featuredOffer);

export default FeaturedOffer;