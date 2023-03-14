import { Browser } from 'puppeteer';
import { Config } from './config';
type CliArgs = typeof import('../cli').cliFlags;
/**
 * Convert markdown to pdf.
 */
export declare const convertMdToPdf: (input: {
    path: string;
} | {
    content: string;
}, config: Config, { args, browser, }?: {
    args?: import("arg").Result<{
        '--help': BooleanConstructor;
        '--version': BooleanConstructor;
        '--basedir': StringConstructor;
        '--watch': BooleanConstructor;
        '--watch-options': StringConstructor;
        '--stylesheet': [StringConstructor];
        '--css': StringConstructor;
        '--document-title': StringConstructor;
        '--body-class': [StringConstructor];
        '--page-media-type': StringConstructor;
        '--highlight-style': StringConstructor;
        '--marked-options': StringConstructor;
        '--html-pdf-options': StringConstructor;
        '--pdf-options': StringConstructor;
        '--launch-options': StringConstructor;
        '--gray-matter-options': StringConstructor;
        '--port': NumberConstructor;
        '--md-file-encoding': StringConstructor;
        '--stylesheet-encoding': StringConstructor;
        '--as-html': BooleanConstructor;
        '--config-file': StringConstructor;
        '--devtools': BooleanConstructor;
        '-h': string;
        '-v': string;
        '-w': string;
    }> | undefined;
    browser?: Browser | undefined;
}) => Promise<import("./generate-output").Output>;
export {};
