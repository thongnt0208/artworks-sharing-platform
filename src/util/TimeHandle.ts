/**
 * This function is used to format time into a specific format.
 * 
 * @param {string} time - The time to be formatted
 * @param {string} format - The format to be used for the time, default is 'dd-MM-yyyy HH:mm:ss'
 * @returns {string} - Formatted time as a string
 * @description Formats the given time by extracting the date part and discarding the time part.
 * @example 
 * formatTime('2023-12-01T06:59:59.999') // Output: "01-12-2023 06:59:59" dd-mm-yyyy hh:mm:ss 
 * formatTime('2023-12-01T06:59:59.999', 'dd/MM/yyyy') // Output: "01/12/2023" dd/mm/yyyy
 * @author AnhDH, ThongNT
 * @version 1.1.0
 */
export const formatTime = (
    time: string,
    format: string = 'dd-MM-yyyy HH:mm:ss'
  ): string => {
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours() + 7).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const formattedTime = format
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', String(year))
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  
    return formattedTime;
  };
