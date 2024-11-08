// Import necessary modules
import response from "$lib/response";
import User from "../../../../models/User.model";

// Define the server-side route handler
export const GET = async (request) => {
    try {
        // Extract user ID from the query parameters
        const urlParams = new URLSearchParams(request.url.search);
        const id = urlParams.get('id');

        // Check if ID is provided
        if (!id) {
            return response({ error: 'User ID is missing in the query parameters' }, 400);
        }

        // Find the user by ID
        const user = await User.findById(id);

        // Check if the user exists
        if (!user) {
            return response({ error: 'User not found' }, 404);
        }

        // Return success response with the username
        return response({ success: true, username: user.username });
    } catch (error) {
        console.error('Error:', error.message);

        // Return an error response with status 500
        return response({ error: error.message }, 500);
    }
};
