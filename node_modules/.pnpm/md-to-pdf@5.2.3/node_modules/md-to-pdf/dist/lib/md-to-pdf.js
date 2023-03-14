"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMdToPdf = void 0;
const fs_1 = require("fs");
const gray_matter_1 = __importDefault(require("gray-matter"));
const path_1 = require("path");
const generate_output_1 = require("./generate-output");
const get_html_1 = require("./get-html");
const get_output_file_path_1 = require("./get-output-file-path");
const helpers_1 = require("./helpers");
const read_file_1 = require("./read-file");
/**
 * Convert markdown to pdf.
 */
const convertMdToPdf = async (input, config, { args = {}, browser, } = {}) => {
    var _a;
    const mdFileContent = 'content' in input
        ? input.content
        : await (0, read_file_1.readFile)(input.path, (_a = args['--md-file-encoding']) !== null && _a !== void 0 ? _a : config.md_file_encoding);
    const { content: md, data: frontMatterConfig } = (0, gray_matter_1.default)(mdFileContent, args['--gray-matter-options'] ? JSON.parse(args['--gray-matter-options']) : config.gray_matter_options);
    // merge front-matter config
    if (frontMatterConfig instanceof Error) {
        console.warn('Warning: the front-matter was ignored because it could not be parsed:\n', frontMatterConfig);
    }
    else {
        config = Object.assign(Object.assign(Object.assign({}, config), frontMatterConfig), { pdf_options: Object.assign(Object.assign({}, config.pdf_options), frontMatterConfig.pdf_options) });
    }
    const { headerTemplate, footerTemplate, displayHeaderFooter } = config.pdf_options;
    if ((headerTemplate || footerTemplate) && displayHeaderFooter === undefined) {
        config.pdf_options.displayHeaderFooter = true;
    }
    const arrayOptions = ['body_class', 'script', 'stylesheet'];
    // sanitize frontmatter array options
    for (const option of arrayOptions) {
        if (!Array.isArray(config[option])) {
            config[option] = [config[option]].filter(Boolean);
        }
    }
    const jsonArgs = new Set(['--marked-options', '--pdf-options', '--launch-options']);
    // merge cli args into config
    for (const arg of Object.entries(args)) {
        const [argKey, argValue] = arg;
        const key = argKey.slice(2).replace(/-/g, '_');
        config[key] = jsonArgs.has(argKey) ? JSON.parse(argValue) : argValue;
    }
    // sanitize the margin in pdf_options
    if (typeof config.pdf_options.margin === 'string') {
        config.pdf_options.margin = (0, helpers_1.getMarginObject)(config.pdf_options.margin);
    }
    // set output destination
    if (config.dest === undefined) {
        config.dest = 'path' in input ? (0, get_output_file_path_1.getOutputFilePath)(input.path, config.as_html ? 'html' : 'pdf') : 'stdout';
    }
    const highlightStylesheet = (0, path_1.resolve)((0, path_1.dirname)(require.resolve('highlight.js')), '..', 'styles', `${config.highlight_style}.css`);
    config.stylesheet = [...new Set([...config.stylesheet, highlightStylesheet])];
    const html = (0, get_html_1.getHtml)(md, config);
    const relativePath = 'path' in input ? (0, path_1.relative)(config.basedir, input.path) : '.';
    const output = await (0, generate_output_1.generateOutput)(html, relativePath, config, browser);
    if (!output) {
        if (config.devtools) {
            throw new Error('No file is generated with --devtools.');
        }
        throw new Error(`Failed to create ${config.as_html ? 'HTML' : 'PDF'}.`);
    }
    if (output.filename) {
        if (output.filename === 'stdout') {
            process.stdout.write(output.content);
        }
        else {
            await fs_1.promises.writeFile(output.filename, output.content);
        }
    }
    return output;
};
exports.convertMdToPdf = convertMdToPdf;
