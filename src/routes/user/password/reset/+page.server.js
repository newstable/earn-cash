export const load = async(request) => {
    const token = request.url.searchParams.get('token')
    return {
        token,
    }
}