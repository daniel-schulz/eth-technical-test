/**
 * Returns a random number between min and max.
 * @param min The minimum number.
 * @param max The maximum number.
 * @returns A random number between min and max.
 */
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a random string of letters.
 * @param numberOfLetters The number of letters to return.
 * @returns A random string of letters.
 */
export const getRandomLetters = (numberOfLetters: number): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < numberOfLetters; i++) {
    const randomIndex = getRandomNumber(0, letters.length - 1);
    result += letters.charAt(randomIndex);
  }

  return result;
};
