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

        // Check if recent winners array exists
        if (!giveaway.recent_winners || giveaway.recent_winners.length === 0) {
            return response({ error: 'No recent winners found for this giveaway' }, 404);
        }

        // Fetch recent winners along with their prize names
        const recentWinnersWithPrizes = await Promise.all(giveaway.recent_winners.map(async (winner) => {
            const prize = await Card.findOne({ 'prizes.giveawaywinner.userId': winner }).select('prizes');
            const prizeName = prize?.prizes.find(p => p.giveawaywinner.userId.equals(winner))?.prize_name;
            return { userId: winner, prizeName };
        }));

        // Exclude the winner from recent winners list
        const filteredRecentWinners = recentWinnersWithPrizes.filter(winner => winner.userId !== giveaway.winner);

        // Limit recent winners to 10
        const recentWinnersLimited = filteredRecentWinners.slice(0, 10);

        // Return success response with recent winners
        return response({ success: true, recentWinners: recentWinnersLimited });
    } catch (error) {
        console.error('Error:', error.message);

        // Return an error response with status 500
        return response({ error: error.message }, 500);
    }
};
