"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMdFile = void 0;
const extensions = /\.(md|mkd|mdown|markdown)(\.txt)?$/i;
/**
 * Check whether a path is a markdown file.
 */
const isMdFile = (path) => extensions.test(path);
exports.isMdFile = isMdFile;
