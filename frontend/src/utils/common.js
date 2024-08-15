export function convertToTime(timestamp) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Get the hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Format the minutes to always be two digits
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    // Adjust hours to 12-hour format if needed
    hours = hours % 12 || 12;

    // Return the formatted time
    return `${hours}:${minutes}`;
}


