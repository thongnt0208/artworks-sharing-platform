/**
 * Hàm này để tạo mã màu ngẫu nhiên
 * 
 * @params none
 * @description Tạo và trả về một mã màu hex ngẫu nhiên bằng cách lấy ngẫu nhiên các ký tự từ "0" đến "F" và ghép chúng lại thành một chuỗi có độ dài 6 ký tự, bắt đầu bằng "#".
 * @returns string - Mã màu hex ngẫu nhiên
 * @example 
 * getRandomColorCode() // Output: e.g. "#1A2B3C"
 * @author AnhDH
 * @version 1.0.0
 */
export const GenerateRandomColorCode = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };