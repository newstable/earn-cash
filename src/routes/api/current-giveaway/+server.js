// Import necessary modules
import response from "$lib/response";
import { Card } from "../../../models/giveaway.model.js";

// Define the server-side route handler
export const GET = async (request) => {
    try {
        // Extract giveaway ID from the query parameters
        const urlParams = new URLSearchParams(request.url.search);
        const id = urlParams.get('id');

        // Check if id is provided
        if (!id) {
            return response({ error: 'Giveaway ID is missing in the query parameters' }, 400);
        }

        // Find the giveaway by ID
        const giveaway = await Card.findById(id);

        // Check if the giveaway exists
        if (!giveaway) {
            return response({ error: 'Giveaway not found' }, 404);
        }

        // Return success response with the giveaway details
        return response({ success: true, giveaway });
    } catch (error) {
        console.error('Error:', error.message);

        // Return an error response with status 500
        return response({ error: error.message }, 500);
    }
};
