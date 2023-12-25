/**
 * This function is used to convert number to VND
 * @param number
 * @returns NumberFormat object
 * @example
 * var format = numberToVND(20000); //expected to return "20.000 ₫"
 * @author ThongNT
 * @version 1.0.0
 */
export function numberToVND(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}
