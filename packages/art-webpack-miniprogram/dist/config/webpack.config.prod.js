"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_config_base_1 = require("./webpack.config.base");
const uglifyjs_webpack_plugin_1 = __importDefault(require("uglifyjs-webpack-plugin"));
const optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const appConfig_1 = __importDefault(require("./appConfig"));
const enableBundleHashName = appConfig_1.default.get('enableBundleHashName');
const version = appConfig_1.default.get('art:version');
function bundleFileNamePattern(endFix = '.js') {
    if (enableBundleHashName) {
        return `bundle[chunkhash]${endFix}`;
    }
    return `bundle${endFix}?${version}`;
}
class WebpackProdConfig extends webpack_config_base_1.WebpackBaseConfig {
    constructor(entry, output) {
        super(entry, output);
        this.plugins = this.plugins.concat(new uglifyjs_webpack_plugin_1.default({
            cache: true,
            parallel: true,
            // set to true if you want JS source maps
            sourceMap: false,
            uglifyOptions: {
                compress: {
                    warnings: true,
                    dead_code: true,
                    drop_debugger: true,
                    drop_console: true
                }
            }
        }), new optimize_css_assets_webpack_plugin_1.default({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { 'postcss-discard-unused': false }
        }), new mini_css_extract_plugin_1.default({
            filename: `[name]/${bundleFileNamePattern('.css')}`
        }));
    }
}
exports.default = WebpackProdConfig;