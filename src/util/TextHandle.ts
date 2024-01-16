import translate from "translate";
/**
 * Translates a given text to Vietnamese.
 *
 * @param text - The text to be translated.
 * @returns The translated text in Vietnamese, or undefined if translation fails.
 * @example
 * // Usage example:
 * const englishText = "Hello, how are you?";
 * const vietnameseTranslation = await translate2Vietnamese(englishText);
 * if (vietnameseTranslation) {
 *   console.log('Translated to Vietnamese:', vietnameseTranslation);
 * } else {
 *   console.log('Translation to Vietnamese failed.');
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function translate2Vietnamese(text: string): Promise<string | undefined> {
  try {
    const result = await translate(text, "vi");
    return result;
  } catch (error) {
    return undefined;
  }
}
