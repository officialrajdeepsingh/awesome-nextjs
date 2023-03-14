#!/usr/bin/env node
import { HtmlConfig, PdfConfig } from './lib/config';
import { HtmlOutput, PdfOutput } from './lib/generate-output';
interface ContentInput {
    content: string;
}
interface PathInput {
    path: string;
}
/**
 * Convert a markdown file to PDF.
 */
export declare function mdToPdf(input: ContentInput | PathInput, config?: Partial<PdfConfig>): Promise<PdfOutput>;
export declare function mdToPdf(input: ContentInput | PathInput, config?: Partial<HtmlConfig>): Promise<HtmlOutput>;
export default mdToPdf;
export interface PackageJson {
    engines: {
        node: string;
    };
    version: string;
}
