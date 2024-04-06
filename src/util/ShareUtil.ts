/**
 * Function to copy the current URL to clipboard
 *
 * @returns any - the current URL or null
 * @example
 *
 * @author ThongNT
 * @version 2.0.0
 *
 */
export function copyURLToClipboard(currentURL?: string): any {
  if (!currentURL) {
    currentURL = window.location.href;
  }
  navigator.clipboard
    .writeText(currentURL)
    .then(() => {
      return currentURL;
    })
    .catch((err) => {
      return null;
    });
}
