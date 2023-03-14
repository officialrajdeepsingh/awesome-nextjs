"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtml = void 0;
const get_marked_with_highlighter_1 = require("./get-marked-with-highlighter");
/**
 * Generates a HTML document from a markdown string and returns it as a string.
 */
const getHtml = (md, config) => `<!DOCTYPE html>
<html>
	<head><title>${config.document_title}</title><meta charset="utf-8"></head>
	<body class="${config.body_class.join(' ')}">
		${(0, get_marked_with_highlighter_1.getMarked)(config.marked_options, config.marked_extensions)(md)}
	</body>
</html>
`;
exports.getHtml = getHtml;
