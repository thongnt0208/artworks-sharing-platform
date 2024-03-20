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
