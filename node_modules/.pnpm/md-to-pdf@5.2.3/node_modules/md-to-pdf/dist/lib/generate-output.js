"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOutput = exports.closeBrowser = void 0;
const path_1 = require("path");
const puppeteer_1 = __importDefault(require("puppeteer"));
const is_http_url_1 = require("./is-http-url");
/**
 * Store a single browser instance reference so that we can re-use it.
 */
let browserPromise;
/**
 * Close the browser instance.
 */
const closeBrowser = async () => { var _a; return (_a = (await browserPromise)) === null || _a === void 0 ? void 0 : _a.close(); };
exports.closeBrowser = closeBrowser;
async function generateOutput(html, relativePath, config, browserRef) {
    async function getBrowser() {
        if (browserRef) {
            return browserRef;
        }
        if (!browserPromise) {
            browserPromise = puppeteer_1.default.launch(Object.assign({ devtools: config.devtools }, config.launch_options));
        }
        return browserPromise;
    }
    const browser = await getBrowser();
    const page = await browser.newPage();
    const urlPathname = (0, path_1.join)(relativePath, 'index.html').split(path_1.sep).join(path_1.posix.sep);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await page.goto(`http://localhost:${config.port}/${urlPathname}`); // make sure relative paths work as expected
    await page.setContent(html); // overwrite the page content with what was generated from the markdown
    for (const stylesheet of config.stylesheet) {
        await page.addStyleTag((0, is_http_url_1.isHttpUrl)(stylesheet) ? { url: stylesheet } : { path: stylesheet });
    }
    if (config.css) {
        await page.addStyleTag({ content: config.css });
    }
    for (const scriptTagOptions of config.script) {
        await page.addScriptTag(scriptTagOptions);
    }
    /**
     * Trick to wait for network to be idle.
     *
     * @todo replace with page.waitForNetworkIdle once exposed
     * @see https://github.com/GoogleChrome/puppeteer/issues/3083
     */
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.evaluate(() => history.pushState(undefined, '', '#')) /* eslint no-undef: off */,
    ]);
    let outputFileContent = '';
    if (config.devtools) {
        await new Promise((resolve) => page.on('close', resolve));
    }
    else if (config.as_html) {
        outputFileContent = await page.content();
    }
    else {
        await page.emulateMediaType(config.page_media_type);
        outputFileContent = await page.pdf(config.pdf_options);
    }
    await page.close();
    return config.devtools ? undefined : { filename: config.dest, content: outputFileContent };
}
exports.generateOutput = generateOutput;
