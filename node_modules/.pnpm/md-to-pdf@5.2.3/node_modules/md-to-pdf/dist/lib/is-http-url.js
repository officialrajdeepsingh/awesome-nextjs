"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHttpUrl = void 0;
/**
 * Check whether the input is a url.
 *
 * @returns `true` if a URL can be constructed from `input`, `false` otherwise.
 */
const isHttpUrl = (input) => {
    try {
        return new URL(input).protocol.startsWith('http');
    }
    catch (_a) {
        return false;
    }
};
exports.isHttpUrl = isHttpUrl;
