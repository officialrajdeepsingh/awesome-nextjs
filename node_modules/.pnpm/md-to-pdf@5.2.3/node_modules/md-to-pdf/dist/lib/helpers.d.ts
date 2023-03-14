import { PDFOptions } from 'puppeteer';
/**
 * Get the directory that a file is in.
 */
export declare const getDir: (filePath: string) => string;
/**
 * Get a margin object from a CSS-like margin string.
 */
export declare const getMarginObject: (margin: string) => PDFOptions['margin'];
export declare const setProcessAndTermTitle: (title: string) => void;
