/**
 * Read a file with the given encoding, and return its content as a string.
 *
 * Uses iconv-lite to solve some issues with Windows encodings.
 */
export declare const readFile: (file: string, encoding?: string) => Promise<string>;
