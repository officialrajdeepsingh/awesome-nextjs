"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarked = void 0;
const highlight_js_1 = __importDefault(require("highlight.js"));
const marked_1 = require("marked");
const getMarked = (options, extensions) => {
    marked_1.marked.setOptions(Object.assign({ highlight: (code, languageName) => {
            const language = highlight_js_1.default.getLanguage(languageName) ? languageName : 'plaintext';
            return highlight_js_1.default.highlight(code, { language }).value;
        }, langPrefix: 'hljs ' }, options));
    marked_1.marked.use(...extensions);
    return marked_1.marked;
};
exports.getMarked = getMarked;
