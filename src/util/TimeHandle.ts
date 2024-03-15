/**
 * This function is used to format time.
 * 
 * @param {string} time - The time to be formatted
 * @returns {string} - Formatted time as a string
 * @description Formats the given time by extracting the date part and discarding the time part.
 * @example 
 * formatTime('2023-12-01T06:59:59.999') // Output: "01-12-2023 06:59:59" dd-mm-yyyy hh:mm:ss 
 * @author AnhDH
 * @version 1.0.0
 */
export const formatTime = (time: string): string => {
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
