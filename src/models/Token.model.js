import mongoose, { Schema } from "mongoose";

const token = new Schema({
    email: String,
    token: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Token = mongoose.models.Token || mongoose.model("Token", token);

export default Token;