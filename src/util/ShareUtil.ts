/**
 * Function to copy the current URL to clipboard
 *
 * @returns any - the current URL or null
 * @example
 *
 * @author ThongNT
 * @version 1.0.0
 *
 */
export function copyURLToClipboard(): any {
  const currentURL = window.location.href;
  navigator.clipboard
    .writeText(currentURL)
    .then(() => {
      return currentURL;
    })
    .catch((err) => {
      return null;
    });
}
