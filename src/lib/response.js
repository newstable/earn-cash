const response = (d, status = 200) => {
    if (typeof d !== "string") {
        d = JSON.stringify(d);
    }

    return new Response(String(d), {
        status,
        headers: {
            "content-type": "application/json"
        }
    });
}

export default response;