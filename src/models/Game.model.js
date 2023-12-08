import mongoose, { Schema } from "mongoose";

const game = new Schema({
    player1: String,
    player1_username: String,
    player1_amount: Number,
    player1_pick: Number,
    player2: String,
    player2_username: String,
    player2_amount: Number,
    player2_pick: Number,
    status: Number,
});

const Game = mongoose.models.Game || mongoose.model("Game", game);

export default Game;