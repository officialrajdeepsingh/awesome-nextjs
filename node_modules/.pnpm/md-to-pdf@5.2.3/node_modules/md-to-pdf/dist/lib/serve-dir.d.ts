/// <reference types="node" />
import { Server } from 'http';
import { Config } from './config';
/**
 * Serve a directory on a random port using a HTTP server and the serve-handler package.
 *
 * @returns a promise that resolves with the server instance once the server is ready and listening.
 */
export declare const serveDirectory: ({ basedir, port }: Config) => Promise<Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>;
/**
 * Close the given server instance asynchronously.
 */
export declare const closeServer: (server: Server) => Promise<void>;
