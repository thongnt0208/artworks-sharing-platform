/**
/**
 * This function is used to generate a random color code.
 * 
 * @params none
/**
 * @description Generates and returns a random hex color code by randomly selecting characters from "0" to "F" and concatenating them into a string with a length of 6 characters, starting with "#".
 * @returns string - Random hex color code
 * @example 
 * getRandomColorCode() // Output: e.g. "#1A2B3C"
 * @author AnhDH
 * @version 1.0.0
 */
export const GenerateRandomColorCode = (): string => {
  let color = "#";
  for (let i = 0; i < 3; i++) {
      const value = Math.floor(Math.random() * 128) + 128; // Generating values between 128 and 255 for a lighter shade
      const hexValue = value.toString(16).padStart(2, '0');
      color += hexValue;
  }
  return color;
};
