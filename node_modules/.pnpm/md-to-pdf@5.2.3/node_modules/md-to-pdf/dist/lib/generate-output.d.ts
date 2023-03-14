/// <reference types="node" />
import { Browser } from 'puppeteer';
import { Config, HtmlConfig, PdfConfig } from './config';
export type Output = PdfOutput | HtmlOutput;
export interface PdfOutput extends BasicOutput {
    content: Buffer;
}
export interface HtmlOutput extends BasicOutput {
    content: string;
}
interface BasicOutput {
    filename: string | undefined;
}
/**
 * Close the browser instance.
 */
export declare const closeBrowser: () => Promise<void | undefined>;
/**
 * Generate the output (either PDF or HTML).
 */
export declare function generateOutput(html: string, relativePath: string, config: PdfConfig, browserRef?: Browser): Promise<PdfOutput>;
export declare function generateOutput(html: string, relativePath: string, config: HtmlConfig, browserRef?: Browser): Promise<HtmlOutput>;
export declare function generateOutput(html: string, relativePath: string, config: Config, browserRef?: Browser): Promise<Output>;
export {};
