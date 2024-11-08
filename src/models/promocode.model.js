import mongoose, { Schema } from "mongoose";

const promocodeSchema = new Schema({
    promocode: String,
    rewardPoints: String, // Added rewardPoints field
    users: [{
        userId: Schema.Types.ObjectId,
        redeemDate: Date
    }]
});

const Promocode = mongoose.models.Promocode || mongoose.model("Promocode", promocodeSchema);

export default Promocode;
