import mongoose, { Schema } from "mongoose";

const reward = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: String,
    reward: String,
    price: Number,
    code: String,
    pin: Number,
    cardNumber: String,
    expMonth: Number,
    expYear: Number,
    csv: Number,
    info: String,
    processing: {
        type: Number,
        default: 0
    },
    hold: {
        type: Number,
        default: 0
    },
    holdDate: Date,
    releaseDate: Date,
    sentDate: Date,
    revoked: {
        type: Number,
        default: 0
    },
    tremendousUSDValue: Number
});

const Reward = mongoose.models.Reward || mongoose.model("Reward", reward);

export default Reward;