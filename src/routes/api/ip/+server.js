import response from "$lib/response";

export const GET = async (request) => {
    try {
        // Access the client's IP address from the headers
        const clientIP = request.headers['x-real-ip'] || request.headers['x-forwarded-for'] || request.headers['cf-connecting-ip'] || 'unknown';

        // Check if the clientIP is 'unknown' or an empty string
        if (clientIP === 'unknown' || clientIP === '') {
            throw new Error('Client IP address could not be determined.');
        }

        // Use the response module to send a plain text response with the client's IP
        return response({
            message: `Client's IP address: ${clientIP}`
        });
    } catch (error) {
        console.error('Error in /api/ip:', error);

        // Use the response module to send a custom error message as plain text with a 500 status code
        return response({
            message: 'Ip address could not be extracted because of headers, ah benzz'
        }, { status: 500 });
    }
};
