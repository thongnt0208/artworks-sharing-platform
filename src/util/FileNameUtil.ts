

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
 * @author @thongnt0208
 * @version 1.0.1
 */
export function getFileExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
}


/**
 * This function checks if a given file name is an image.
 * 
 * @param fileName - The name of the file.
 * @returns True if the file is an image, false otherwise.
 * @example
 * ```
 * const fileName = "myImage.jpg";
 * const isImage = isAnImage(fileName);
 * console.log(isImage); // Output: true
 * ```
 * @version 1.0.0
 * @author @thongnt0208
 */
export function isAnImage(fileName: string): boolean {
  return [".jpg", ".png"].some((ext) => fileName.includes(ext));
}