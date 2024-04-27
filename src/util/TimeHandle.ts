/**
 * This function is used to format time into a specific format.
 * 
 * @param {string} time - The time to be formatted
 * @param {string} format - The format to be used for the time, default is 'HH:mm ngày dd/MM/yyyy'
 * @returns {string} - Formatted time as a string
 * @description Formats the given time by extracting the date part and discarding the time part.
 * @example 
 * formatTime('2023-12-01T06:59:59.999') // Output: "06:59 ngày 01/12/2023" HH:mm ngày dd/MM/yyyy 
 * formatTime('2023-12-01T06:59:59.999', 'dd/MM/yyyy') // Output: "01/12/2023" dd/mm/yyyy
 * @author AnhDH, ThongNT
 * @version 1.2.0
 */
export const formatTime = (
    time: string,
    format: string = 'HH:mm - dd/MM/yyyy'
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
