import mongoose, { Schema } from "mongoose";

const wallBan = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    wall: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const WallBan = mongoose.models.WallBan || mongoose.model("WallBan", wallBan);

export default WallBan;