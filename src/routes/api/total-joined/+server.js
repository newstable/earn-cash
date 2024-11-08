// Import necessary modules
import response from "$lib/response";
import fetch from 'node-fetch';
import { Card } from "../../../models/giveaway.model.js";

// Define the server-side route handler
export const POST = async (request) => {
    try {
        // Extract request body
        const requestBody = await request.request.json();

        // Check if giveawayId is provided
        const { giveawayId } = requestBody;
        if (!giveawayId) {
            return response({ error: 'giveawayId is missing' }, 400);
        }

        // Fetch the giveaway by ID
        const giveaway = await Card.findById(giveawayId);

        // Check if the giveaway exists
        if (!giveaway) {
            return response({ error: 'Giveaway not found' }, 404);
        }

        // Extract the total number of joined users
        const totalJoined = giveaway.joined.length;

        // Return success response with total number of joined users
        return response({ success: true, totalJoined });
    } catch (error) {
        console.error('Error:', error.message);

        // Return an error response with status 500
        return response({ error: error.message }, 500);
    }
};
