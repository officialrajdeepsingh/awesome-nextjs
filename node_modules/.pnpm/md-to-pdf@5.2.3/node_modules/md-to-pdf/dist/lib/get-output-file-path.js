"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutputFilePath = void 0;
const path_1 = require("path");
/**
 * Derive the output file path from a source file.
 */
const getOutputFilePath = (mdFilePath, extension) => {
    const { dir, name } = (0, path_1.parse)(mdFilePath);
    return (0, path_1.join)(dir, `${name}.${extension}`);
};
exports.getOutputFilePath = getOutputFilePath;
