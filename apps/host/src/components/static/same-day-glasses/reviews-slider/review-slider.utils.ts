/**
 * Generate short random string for ids - not guaranteed to be unique
 *
 * @param length Optional param to for defining the length of the key
 */
export const generateKey = (length: number = 10): string =>
    Math.random()
        .toString(36)
        .substring(2, length + 2);
