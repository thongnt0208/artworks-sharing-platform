/**
 * This function is used to convert number to VND
 * @param number
 * @returns NumberFormat object
 * @example
 * var format = numberToVND(20000); //expected to return "20.000 ₫"
 * @author @thongnt0208
 * @version 1.0.0
 */
export function numberToVND(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

/**
 * This function is used to convert number to Xu
 * @param number - string of number to add commas
 * @returns string with commas added
 * @example
 * var formattedNumber = addCommas(1000000); // expected to return "1,000,000"
 * @version 1.0.0
 * @author @thongnt0208
 */
export function numberToXu(number: string | number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Xu";
}