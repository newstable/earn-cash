const check_if_sanitized = data => {
    const ascii_pattern = /^[\x00-\x7F]+$/; 
    return ascii_pattern.test(JSON.stringify(data));
}

const sanitize_query = async (dataPromise) => {
    const data = await dataPromise;
    if (typeof data === 'string') {
        if (/[<>&$]/.test(data)) {
            return '';
        } else {
            return data;
        }
    } else if (typeof data === 'object' && data !== null) {
        for (let key in data) {
            data[key] = await sanitize_query(data[key]);
        }
    }
    return data;
}

export default {
    check_if_sanitized,
    sanitize_query
}