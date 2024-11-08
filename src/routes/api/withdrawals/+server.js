import Reward from "../../../models/Reward.model";
import response from "$lib/response";
import { Parser } from "@json2csv/plainjs";

export const GET = async (_request) => {
    try {
        console.log("Get Withdraws");
        const rewards = await Reward.find({ processing: 0, type: 'giftcard' }).sort({ date: -1 }).exec();
        if (rewards.length === 0) {
            return response({
                success: false,
                message: "No rewards found"
            });
        }
        const parser = new Parser({ header: false });
        const csv = parser.parse(rewards);
        return new Response(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="data.csv"'
            }
        });
    } catch (error) {
        console.log("Get Withdraws Error:", error.message);
        response({
            success: false,
            message: "An error occurred while processing the request"
        });
    }
}