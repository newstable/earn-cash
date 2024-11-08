import Reward from "../../../models/Reward.model";
import response from "$lib/response";

export const POST = async (request) => {
    try {
        console.log(request)
        const data = await request.request.json();
        const reward = await Reward.findOneAndUpdate({ _id: data.id }, { processing: 1 }, { new: true });
        if (!reward) {
            return response({
                success: false,
                message: "Reward not found"
            });
        }

        return response({
            success: true,
            message: "Reward updated successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return response({
            success: false,
            message: "An error occurred while processing the request"
        });
    }
}