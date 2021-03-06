/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const opn_1 = __importDefault(require("opn"));
const executeNodeScript_1 = __importDefault(require("./executeNodeScript"));
// https://github.com/sindresorhus/opn#app
const OSX_CHROME = 'google chrome';
const Actions = Object.freeze({
    NONE: 0,
    BROWSER: 1,
    SCRIPT: 2,
});
function getBrowserEnv() {
    // Attempt to honor this environment variable.
    // It is specific to the operating system.
    // See https://github.com/sindresorhus/opn#app for documentation.
    const value = process.env.BROWSER;
    let action;
    if (!value) {
        // Default.
        action = Actions.BROWSER;
    }
    else if (value.toLowerCase().endsWith('.js')) {
        action = Actions.SCRIPT;
    }
    else if (value.toLowerCase() === 'none') {
        action = Actions.NONE;
    }
    else {
        action = Actions.BROWSER;
    }
    return { action, value };
}
function executeNodeScriptBrowser(scriptPath, url) {
    const extraArgs = process.argv.slice(2).concat(url);
    const child = executeNodeScript_1.default('node', scriptPath, ...extraArgs);
    child.on('close', (code) => {
        if (code !== 0) {
            console.log();
            console.log(chalk_1.default.red('The script specified as BROWSER environment variable failed.'));
            console.log(chalk_1.default.cyan(scriptPath) + ' exited with code ' + code + '.');
            console.log();
            return;
        }
    });
    return true;
}
function startBrowserProcess(browser, url) {
    // If we're on OS X, the user hasn't specifically
    // requested a different browser, we can try opening
    // Chrome with AppleScript. This lets us reuse an
    // existing tab when possible instead of creating a new one.
    const shouldTryOpenChromeWithAppleScript = process.platform === 'darwin' &&
        (typeof browser !== 'string' || browser === OSX_CHROME);
    if (shouldTryOpenChromeWithAppleScript) {
        try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
            child_process_1.execSync('ps cax | grep "Google Chrome"');
            child_process_1.execSync('osascript openChrome.applescript "' + encodeURI(url) + '"', {
                cwd: __dirname,
                stdio: 'ignore',
            });
            return true;
        }
        catch (err) {
            // Ignore errors.
        }
    }
    // Another special case: on OS X, check if BROWSER has been set to "open".
    // In this case, instead of passing `open` to `opn` (which won't work),
    // just ignore it (thus ensuring the intended behavior, i.e. opening the system browser):
    // https://github.com/facebookincubator/create-react-app/pull/1690#issuecomment-283518768
    if (process.platform === 'darwin' && browser === 'open') {
        browser = undefined;
    }
    // Fallback to opn
    // (It will always open new tab)
    try {
        const options = { app: browser };
        opn_1.default(url, options).catch(() => { }); // Prevent `unhandledRejection` error.
        return true;
    }
    catch (err) {
        return false;
    }
}
/**
 * Reads the BROWSER evironment variable and decides what to do with it. Returns
 * true if it opened a browser or ran a node.js script, otherwise false.
 */
function openBrowser(url) {
    const { action, value } = getBrowserEnv();
    switch (action) {
        case Actions.NONE:
            // Special case: BROWSER="none" will prevent opening completely.
            return false;
        case Actions.SCRIPT:
            return executeNodeScriptBrowser(value, url);
        case Actions.BROWSER:
            return startBrowserProcess(value, url);
        default:
            throw new Error('Not implemented.');
    }
}
exports.default = openBrowser;
