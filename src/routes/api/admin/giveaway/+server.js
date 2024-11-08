import { verify } from '../../../../lib/server/jwt.js';
import { Card, Prize } from "../../../../models/giveaway.model.js";
import response from "$lib/response";
import mongoose from 'mongoose'; // Import mongoose

// Define the API endpoint function
export const POST = async (request) => {
    try {
        // Verify token
        const token = request.cookies.get("token");
        if (typeof token === "undefined") return response({ success: false, message: "Token is missing" });
        const tokenV = verify(token);
        if (!tokenV.success) return response({ success: false, message: "Invalid token" });

        // Parse request body
        const requestBody = await request.request.json();
        const { creation, card_name, card_id, prize_name, quantity, image_link, prizeKey, assign, fetch, winner, start_time, end_time, hourly_giveaway } = requestBody; // Adjust field names
        const prizes = requestBody.prizes;

        // Validate fetch and creation
        if (fetch && (creation || assign)) {
            return response({ success: false, message: "Cannot use 'fetch' along with 'creation' or 'assign'" }, 400);
        }

        // Fetch all cards and prizes
        if (fetch) {
            const allCards = await Card.find();
            const allPrizes = await Prize.find();
            return response({ success: true, cards: allCards, prizes: allPrizes });
        }

        // Validate assign
        if (assign && (!card_id || !prizes || !Array.isArray(prizes) || prizes.length === 0 || !start_time || !end_time)) {
            return response({ success: false, message: "To assign prizes, 'card_id', a non-empty 'prizes' array, 'start_time', and 'end_time' must be provided" }, 400);
        }

        if (assign) {
            // Assigning prizes to a card
            const card = await Card.findById(card_id);
            if (!card) {
                return response({ success: false, message: "Card not found" }, 404);
            }
			
			
			    // Remove existing announced and winner fields
            if (card.announced) {
                card.announced = undefined;
            }
            if (card.winner) {
                card.winner = undefined;
            }

            card.start_time = new Date(start_time);
            card.end_time = new Date(end_time);

            // Replace the existing prizes array with the new one
            card.prizes = [];

            // Validate and add prizes to the card
            for (const prizeId of prizes) {
                const prize = await Prize.findById(prizeId);
                if (!prize) {
                    return response({ success: false, message: `Prize with ID ${prizeId} not found` }, 404);
                }

                // Store prize information within the card's prizes array
                card.prizes.push({
                    _id: prize._id,
                    prize_name: prize.prize_name,
                    quantity: prize.quantity,
                    image_link: prize.image_link,
                    prizeKey: prize.prizeKey
                });
            }

            // Log a message to the console showing where the prize information is stored
            console.log("Prize information stored within the card:", card);

            await card.save();

            return response({ success: true, message: "Prizes assigned to the card successfully" });
        }

        // Validate creation type
        if (![1, 2].includes(creation)) {
            return response({ success: false, message: "Invalid creation type" }, 400);
        }

        if (creation === 1) {
            // Creating a card
            // Check if any required field is missing
            if (!card_name || !image_link || (hourly_giveaway === false && (!start_time || !end_time))) {
                return response({ success: false, message: "Please provide all required fields: card_name, image_link, start_time, end_time" }, 400);
            }

            // Define start_time and end_time based on hourly_giveaway
            let start_time_value, end_time_value;
            if (hourly_giveaway) {
                start_time_value = null;
                end_time_value = null;
            } else {
                start_time_value = new Date(start_time); // Assuming start_time is provided in ISO format
                end_time_value = new Date(end_time); // Assuming end_time is provided in ISO format
            }
            const prizesArray = prizes || [];

            // Create a new giveaway (card) with winner field included
            const newCard = new Card({
                card_name: card_name, // Include card_name
                image_link: image_link, // Include image_link
                start_time: start_time_value,
                end_time: end_time_value,
                hourly_giveaway: hourly_giveaway,
                winner: winner, // Include winner field
                prizes: prizesArray // Initialize the prizes array
            });
            console.log("Prizes array:", prizesArray);

            // Log a message to the console showing the new card information
            console.log("New card created:", newCard);

            await newCard.save();
            return response({ success: true, message: "Card created successfully" });
        } else if (creation === 2) {
            // Creating a prize
            // Validate prize details
            if (
                !prize_name || typeof prize_name !== 'string' ||
                typeof quantity !== 'number' || quantity <= 0 ||
                !image_link || typeof image_link !== 'string' || // Adjust field name
                !prizeKey || typeof prizeKey !== 'string'
            ) {
                return response({ success: false, message: "Invalid prize details" }, 400);
            }

            // Create a new prize
            const newPrize = new Prize({
                prize_name,
                quantity,
                image_link: image_link, // Adjust field name
                prizeKey
            });

            await newPrize.save();
            return response({ success: true, message: "Prize created successfully" });
        }
    } catch (error) {
        console.error("Error creating card/prize:", error);
        return response({ success: false, error: error.message }, 500);
    }
};
