/**
 * 
 * @param {string} text - long text to be sliced
 * @param {number} [max = 50] - maximum length of the sliced text
 * @returns the sliced text, with an ellipsis (...) appended if truncated.
 */
export function textSlicer(text: string, max: number = 50): string {
    if (text.length >= max) return `${text.slice(0, max)} ...`;
    return text;
}