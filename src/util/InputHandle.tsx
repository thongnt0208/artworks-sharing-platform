
/**
 * Checks if a given value is empty.
 * 
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is empty, false otherwise.
 * @example
 * const result = isEmpty('');
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 */
function isEmpty(value: string): boolean {
    return value.trim().length === 0;
}

/**
 * Formats a given string to title case.
 * 
 * @param {string} str - The string to format.
 * @returns {string} - The formatted string in title case.
 * @example
 * const result = toTitleCase('hello world');
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 */
function toTitleCase(str: string): string {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}

/**
 * Generates a random alphanumeric string of a given length.
 * 
 * @param {number} length - The length of the generated string.
 * @returns {string} - The generated random string.
 * @example
 * const result = generateRandomString(8);
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 */
function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export { isEmpty, toTitleCase, generateRandomString };