import response from "$lib/response";

export const GET = async(request) => {
    console.log(request);
    return response({
        message: "Hello, world!"
    });
}