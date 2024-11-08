import mongoose, { Schema } from "mongoose";

// Define the prize schema with the new field prizeKey
const prizeSchema = new Schema({
  prize_name: String,
  quantity: Number,
  image_link: String,
  prizeKey: String // New field for prize key
});

// Define the card schema
const cardSchema = new Schema({
    card_name: String,
    image_link: String,
    start_time: Date,
    end_time: Date,
    hourly_giveaway: Boolean,
    total_joins: Number,
    winner: {
        announced: { type: Boolean, default: false }, // Flag to track if winners have been announced
        selected: { type: String, default: null } // Store the user ID of the winner
    },
    prizes: [{
        _id: mongoose.Schema.Types.ObjectId,
        prize_name: String,
        quantity: Number,
        image_link: String,
        prizeKey: String,
        giveawaywinner: {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            discordUsername: String
        }
    }],
    joined: [{ 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        discordUsername: String // Add DiscordUsername field
    }],
    announced: { type: Boolean, default: false }, // Flag to track if the giveaway has been announced
    recent_winners: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        prize_name: String
    }], // Array of user IDs who recently won with prize names
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // ID of the winner
});




// Create the Prize model
const Prize = mongoose.models.prizes || mongoose.model("prizes", prizeSchema);

// Create the Card model
const Card = mongoose.models.giveaways || mongoose.model("giveaways", cardSchema);

export { Prize, Card };
