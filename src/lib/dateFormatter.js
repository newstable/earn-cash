const dateFormatter = date => {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    let suffix = 'th';

    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${weekday} ${day}${suffix} of ${month} ${year}`;
}

export default dateFormatter;