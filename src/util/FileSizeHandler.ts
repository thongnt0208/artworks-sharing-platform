/**
 * 
 * Formats the given file size in bytes into a human-readable format.
 * 
 * @param fileSizeInBytes The file size in bytes.
 * @returns The formatted file size as a string.
 * @example
 * formatFileSize(1024 * 1024 * 5) // Output: "5.00 MB"
 * @author AnhDH
 * @version 1.0.0
 */
export const formatFileSize = (fileSizeInBytes: number) => {
    if (fileSizeInBytes < 1024) {
        return fileSizeInBytes + ' bytes';
    } else if (fileSizeInBytes < 1024 * 1024) {
        return (fileSizeInBytes / 1024).toFixed(2) + ' KB';
    } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
        return (fileSizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
        return (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
}
