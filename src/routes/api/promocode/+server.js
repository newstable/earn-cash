/// Import necessary modules
import response from "$lib/response";
import { verify } from '../../../lib/server/jwt.js';
import Promocode from "../../../models/promocode.model.js"; // Update the import path to promocode.model.js
import User from "../../../models/User.model.js"; // Import the User model

// Define the server-side route handler
export const POST = async (request) => {
    try {
        // Extract request body
        const requestBody = await request.request.json();

        // Retrieve authenticated user
        const user = await request.getAuthenticatedUser();

        // Check if user is authenticated
        if (!user) {
            return response({ success: false, message: "User is not authenticated" });
        }

        // Extract user ID
        const userId = user._id;

        // Proceed if user is authenticated
        // Check if promocode is provided
        if (!requestBody.promocode) {
            return response({ error: 'Promocode is required' }, 400);
        }

        // Find the promocode in the database
        const promocode = await Promocode.findOne({ promocode: requestBody.promocode });

        // If promocode not found, return error
        if (!promocode) {
            return response({ error: 'Promocode not found' }, 404);
        }

        // Check if the user has already redeemed the promocode
        const alreadyRedeemed = promocode.users.some(user => user.userId.equals(userId));
        if (alreadyRedeemed) {
            return response({ success: false, message: 'Promocode already redeemed by this user' }, 400);
        }

        // Add the user to the list of redeemed users
        promocode.users.push({ userId, redeemDate: new Date() });
        await promocode.save();

        // Extract reward points from the promocode
        const rewardPoints = parseFloat(promocode.rewardPoints); // Convert reward points to a number

        // Update user's points with the reward points
        const userToUpdate = await User.findById(userId);
        userToUpdate.points += rewardPoints;
        await userToUpdate.save();

        // Return success response
        return response({ success: true, message: 'Promocode redeemed successfully', rewardPoints });

    } catch (error) {
        console.error('Error:', error.message);

        // Return an error response with status 500
        return response({ error: error.message }, 500);
    }
};
