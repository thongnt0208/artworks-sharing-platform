
/**
 * Limits the length of a string and appends ellipsis if necessary.
 * 
 * @param str - The input string.
 * @param maxLength - The maximum length of the string.
 * @returns The truncated string with ellipsis if necessary.
 * @example
 * TextLimit("This is a long string", 10) // Output: "This is a..."
 * @version 1.0.0
 * @author AnhDH
 */
export const TextLimit = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
    } else {
        return str;
    }
}
  