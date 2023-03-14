#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdToPdf = void 0;
const get_port_1 = __importDefault(require("get-port"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const config_1 = require("./lib/config");
const helpers_1 = require("./lib/helpers");
const md_to_pdf_1 = require("./lib/md-to-pdf");
const serve_dir_1 = require("./lib/serve-dir");
const hasContent = (input) => 'content' in input;
const hasPath = (input) => 'path' in input;
async function mdToPdf(input, config = {}) {
    if (!hasContent(input) && !hasPath(input)) {
        throw new Error('The input is missing one of the properties "content" or "path".');
    }
    if (!config.port) {
        config.port = await (0, get_port_1.default)();
    }
    if (!config.basedir) {
        config.basedir = 'path' in input ? (0, helpers_1.getDir)(input.path) : process.cwd();
    }
    if (!config.dest) {
        config.dest = '';
    }
    const mergedConfig = Object.assign(Object.assign(Object.assign({}, config_1.defaultConfig), config), { pdf_options: Object.assign(Object.assign({}, config_1.defaultConfig.pdf_options), config.pdf_options) });
    const server = await (0, serve_dir_1.serveDirectory)(mergedConfig);
    const browser = await puppeteer_1.default.launch(Object.assign({ devtools: config.devtools }, config.launch_options));
    const pdf = await (0, md_to_pdf_1.convertMdToPdf)(input, mergedConfig, { browser });
    await browser.close();
    await (0, serve_dir_1.closeServer)(server);
    return pdf;
}
exports.mdToPdf = mdToPdf;
exports.default = mdToPdf;
