/**
 * This function is used to format a number to be shorter.
 * 
 * @param {number} number - The number of likes to be formatted
 * @returns {string} - Formatted like count as a string with abbreviated values (e.g., 1.5K, 2.3M)
 * @description Formats the like count number by abbreviating values greater than 1000 to 'K' and values greater than 1,000,000 to 'M'.
 * @example 
 * formatLikeNumber(500) // Output: "500"
 * formatLikeNumber(1200) // Output: "1.2K"
 * formatLikeNumber(1500000) // Output: "1.5M"
 * @author AnhDH
 * @version 1.0.0
 */
export const formatLargeNumber = (number: number): string => {
    if (number < 1000) {
        return number.toString(); // Return the count as is if it's less than 1000
    } else if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'K'; // Convert to K format if between 1000 and 999,999
    } else {
        return (number / 1000000).toFixed(1) + 'M'; // Convert to M format if 1,000,000 or more
    }
};
