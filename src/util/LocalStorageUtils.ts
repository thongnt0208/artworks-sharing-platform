/**
 * Saves a value to the local storage.
 *
 * @param {any} value - The value to be saved.
 * @param {string} name - The name/key under which the value will be saved in the local storage.
 * @returns {boolean} - True if the value was successfully saved, false otherwise.
 * @example
 * saveToLS('Some value', 'keyName');
 *
 * @author ThongNT
 * @version 1.0.0
 */
export function saveToLS(name: string, value: any): boolean {
  try {
    localStorage.setItem(name, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error saving to local storage:", error);
    return false;
  }
}

/**
 * Retrieves a value from the local storage by key/name.
 * 
 * @param {string} name - The name/key of the value to retrieve from local storage.
 * @returns {any | null} - The retrieved value if found, or null if the key does not exist.
 * @example
 * const retrievedValue = getFromLS('keyName');
 * 
 * @author ThongNT
 * @version 1.0.0
 */
export function getFromLS(name: string): any | null {
  try {
      const retrievedValue = localStorage.getItem(name);
      return retrievedValue ? JSON.parse(retrievedValue) : null;
  } catch (error) {
      console.error('Error retrieving from local storage:', error);
      return null;
  }
}
