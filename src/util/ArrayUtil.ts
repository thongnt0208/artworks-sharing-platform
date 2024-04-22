import { notificationItemType } from "../components/Notification";
import { ChatMessageItemType } from "../layout/ChatScreen/ChatRelatedTypes";

/**
 * Checks if two arrays are equal.
 * @param a - The first array.
 * @param b - The second array.
 * @returns True if the arrays are equal, false otherwise.
 */
export function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) {
    return false;
  } else {
    for (let i = 0; i < a.length; i++) {
      if (a[i]?.createdOn !== b[i]?.createdOn) {
        console.log(`tmpMsg[${i}]: `, a[i], `msg[${i}]: `, b[i]);
        return false;
      }
    }
  }

  return true;
}

export function arraysChatboxEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) {
    return false;
  } else {
    for (let i = 0; i < a.length; i++) {
      if (a[i]?.id !== b[i]?.id) {
        console.log(`tmpCbx[${i}]: `, a[i], `cbx[${i}]: `, b[i]);
        return false;
      }
    }
  }
  return true;
}

export function arraysNotisEqual(
  notis1: notificationItemType[],
  notis2: notificationItemType[]
): boolean {
  if (notis1.length !== notis2.length) {
    return false;
  } else {
    for (let i = 0; i < notis1.length; i++) {
      if (notis1[i]?.notificationId !== notis2[i]?.notificationId) {
        console.log(`notis1[${i}]: `, notis1[i], `notis2[${i}]: `, notis2[i]);
        return false;
      }
    }
  }
  return true;
}

/**
 * This function compares two arrays of ChatMessageItemType
 *
 * @param array1 - array of ChatMessageItemType
 * @param array2 - array of ChatMessageItemType
 * @returns boolean
 * @example
 * arraysChatMsgEqual(array1, array2)
 * // returns true or false
 * @version 1.0.0
 * @author @thongnt0208
 */
export function arraysChatMsgEqual(
  array1: ChatMessageItemType[],
  array2: ChatMessageItemType[]
): boolean {
  if (array1.length !== array2.length) {
    console.log("array1.length !== array2.length: ", array1.length, array2.length);

    return false;
  } else {
    console.log("array1.length === array2.length: ", array1.length, array2.length);

    for (let i = 0; i < array1.length; i++) {
      if (array1[i]?.id !== array2[i]?.id) {
        console.log(`array1[${i}]: `, array1[i], `array2[${i}]: `, array2[i]);
        return false;
      }
      if (array1[i]?.proposal?.status !== array2[i]?.proposal?.status) {
        console.log(`array1[${i}].proposal: `, array1[i], `array2[${i}].proposal: `, array2[i]);
        return false;
      }
      if (array1[i]?.request?.requestStatus !== array2[i]?.request?.requestStatus) {
        console.log(`array1[${i}].request: `, array1[i], `array2[${i}].request: `, array2[i]);
        return false;
      }
    }
  }
  return true;
}
