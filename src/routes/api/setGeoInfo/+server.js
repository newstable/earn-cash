import response from "$lib/response";

export const POST = async(request) => {
    const geoInfo = {
        ip: request.request.headers.get('ip'),
        country: request.request.headers.get('country')
    }
    process.env.geoInfo = JSON.stringify(geoInfo)
    return response({
        success: true,
    });
}