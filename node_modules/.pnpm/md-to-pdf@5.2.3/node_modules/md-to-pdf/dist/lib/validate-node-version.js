"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNodeVersion = void 0;
const semver_1 = __importDefault(require("semver"));
const pkg = require('../../package.json');
const validateNodeVersion = () => semver_1.default.satisfies(process.versions.node, pkg.engines.node);
exports.validateNodeVersion = validateNodeVersion;
