import response from "$lib/response";

export const GET = async(request) => {
    return response({
        message: "Hello, world!"
    });
}