"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.serveDirectory = void 0;
const http_1 = require("http");
const serve_handler_1 = __importDefault(require("serve-handler"));
/**
 * Serve a directory on a random port using a HTTP server and the serve-handler package.
 *
 * @returns a promise that resolves with the server instance once the server is ready and listening.
 */
const serveDirectory = async ({ basedir, port }) => new Promise((resolve) => {
    const server = (0, http_1.createServer)(async (request, response) => (0, serve_handler_1.default)(request, response, { public: basedir }));
    server.listen(port, () => resolve(server));
});
exports.serveDirectory = serveDirectory;
/**
 * Close the given server instance asynchronously.
 */
const closeServer = async (server) => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
exports.closeServer = closeServer;
