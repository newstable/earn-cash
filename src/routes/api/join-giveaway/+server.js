/// Import necessary modules
import response from "$lib/response";
import fetch from 'node-fetch';
import { Card } from "../../../models/giveaway.model.js";
import { checkPassword } from "../../../lib/server/passwords";
import User from "../../../models/User.model";
import { verify } from '../../../lib/server/jwt.js';

// Define the server-side route handler
export const POST = async (request) => {
    try {
        // Extract request body
        const requestBody = await request.request.json();

        // Retrieve authenticated user
        const user = await request.getAuthenticatedUser();

        // Check if user is authenticated
        if (!user) {
            return response({ success: false, message: "Please login to join giveaway!" });
        }

        // Extract user ID
        const userId = user._id;

        // Proceed if user is authenticated
        // Check if join or fetch flag is provided
        if (requestBody.join && requestBody.fetch) {
            return response({success: false, message: 'Both join and fetch flags cannot be used together' }, 400);
        }

        // If join flag is provided, join the giveaway
        if (requestBody.join) {
            // Extract giveaway ID and Discord username
            const { giveawayId, discordUsername } = requestBody;

            // Check if the user has already joined the giveaway
            const giveaway = await Card.findById(giveawayId);
            if (!giveaway) {
                return response({success: false, message: 'Giveaway not found' }, 404);
            }

            // Check if the user has already joined by Discord username or user ID
            const alreadyJoinedByDiscordUsername = giveaway.joined.some(user => user.discordUsername === discordUsername);
            const alreadyJoinedByUserId = giveaway.joined.some(user => user.userId.equals(userId)); // Using equals to compare ObjectIds

            if (alreadyJoinedByDiscordUsername || alreadyJoinedByUserId) {
                return response({ success: false, message: 'User has already joined this giveaway' });
            }

            // Add the user to the joined list
            giveaway.joined.push({ userId, discordUsername });
            await giveaway.save();

            // Return success response
            return response({ success: true, message: 'User joined giveaway successfully' });
        }

        // If fetch flag is provided, fetch joined giveaways of the user
        if (requestBody.fetch) {
            // Find giveaways where the user is joined
            const joinedGiveaways = await Card.find({ joined: userId }, '_id');

            // Return success response with joined giveaways
            return response({ success: true, joinedGiveaways });
        }

        return response({success: false, message: 'Neither join nor fetch flag is provided' }, 400);
    } catch (error) {
        console.error('Error:', error.message);

        // Return an error response with status 500
        return response({success: false, message: error.message }, 500);
    }
};
