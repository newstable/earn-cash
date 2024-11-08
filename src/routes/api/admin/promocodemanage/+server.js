// Import necessary modules
import response from "$lib/response";
import { verify } from '../../../../lib/server/jwt.js';
import Promocode from "../../../../models/promocode.model.js"; // Update the import path to promocode.model.js
import mongoose from 'mongoose'; // Import mongoose

// Define the server-side route handler
export const POST = async (request) => {
    try {
        // Extract request body
        const requestBody = await request.request.json();

        // Check if fetch is true to fetch the list of promocodes
        if (requestBody.fetch) {
            const promocodes = await Promocode.find({}, 'promocode rewardPoints'); // Fetch promocode and rewardPoints
            return response({ success: true, promocodes });
        }

        // Check if delete is true to delete a promocode
        if (requestBody.delete && requestBody.id) {
            // Check if the ID is valid
            if (!isValidObjectId(requestBody.id)) {
                return response({ success: false, error: 'Invalid promocode ID' }, 400);
            }
            
            // Find and delete the promocode
            const deletedPromocode = await Promocode.deleteOne({ _id: requestBody.id });
            // Check if promocode exists
            if (deletedPromocode.deletedCount === 0) {
                return response({ success: false, error: 'Promocode not found' }, 404);
            }

            return response({ success: true, message: 'Promocode deleted successfully' });
        }

        // For any other operation, return an error
        return response({ error: 'Invalid operation' }, 400);
        
    } catch (error) {
        console.error('Error:', error.message);

        // Return an error response with status 500
        return response({ error: error.message }, 500);
    }
};

// Function to validate ObjectId
function isValidObjectId(id) {
    const { ObjectId } = mongoose.Types;
    return ObjectId.isValid(id);
}
