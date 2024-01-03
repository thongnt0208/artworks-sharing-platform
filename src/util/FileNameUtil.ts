

/**
 * Returns the file extension of a given file name.
 * @param {string} fileName - The name of the file.
 * @returns {string} The file extension.
 * @example
 * ```
 * const fileName = "myFile.txt";
 * const fileExtension = getFileExtension(fileName);
 * console.log(fileExtension); // Output: "txt"
 * ```
 * @author ThongNT
 * @version 1.0.0
 */
export function getFileExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
}
