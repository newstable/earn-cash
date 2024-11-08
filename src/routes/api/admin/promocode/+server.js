import mongoose from 'mongoose';
import response from "$lib/response";
import Promocode from "../../../../models/promocode.model.js"; // Update import path to promocode.model.js
import { verify } from '../../../../lib/server/jwt.js';

// Define the API endpoint function
export const POST = async (request) => {
    try {
        // Verify token
        const token = request.cookies.get("token");
        if (typeof token === "undefined") return response({ success: false, message: "Token is missing" });
        const tokenV = verify(token);
        if (!tokenV.success) return response({ success: false, message: "Invalid token" });

        // Parse request body
        const { promocode, rewardPoints } = await request.request.json(); // Destructure directly

        // Validate promocode and rewardPoints
        if (!promocode || !rewardPoints) {
            return response({ success: false, message: "Promocode and rewardPoints are required fields" }, 400);
        }

        // Check if promocode already exists
        const existingPromocode = await Promocode.findOne({ promocode });
        if (existingPromocode) {
            return response({ success: false, message: "Promocode already exists" });
        }

        // Create a new promocode
        const newPromocode = new Promocode({
            promocode,
            rewardPoints
        });

        // Save the new promocode to the database
        await newPromocode.save();

        return response({ success: true, message: "Promocode successfully added" });
    } catch (error) {
        console.error("Error adding promocode:", error);
        return response({ success: false, error: error.message }, 500);
    }
};
