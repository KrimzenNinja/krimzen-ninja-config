import _ from 'lodash';
import nconf from 'nconf';
import util from 'util';
import path from 'path';
const debug = require('debug')('krimzen-ninja-config');

const defaultConfigOptions = {
    source: null,
    configPath: ''
};

/**
 * Initialises nconf using a hierarchy of sources for the source application or script.
 * The priority order for parameters is:
 * * command line arguments (argv).
 * * environment variables.
 * * source code files stored in the ./config folder of your application.
 * Also allows for using nconf.set which will save to memory.
 * @param inputOptions The options used to setup the configuration library.
 * @param {string} inputOptions.source The name of the source application initialising the configuration.
 * @param {string} [inputOptions.configPath=''] The optional path to the `config` folder. Usually this would be `cwd/config` where `cwd` is the current working directory from node's `process.cwd`.
 */
export default function initialiseConfig(inputOptions) {
    if (typeof inputOptions === 'string') {
        inputOptions = {
            source: inputOptions
        };
    }
    _.defaults(inputOptions, defaultConfigOptions);
    if (!inputOptions.source) {
        throw new Error('inputOptions.source is required');
    }
    if (typeof inputOptions.source !== 'string') {
        throw new Error('Source is required');
    }
    const internalConfig = {
        NODE_ENV: 'development',
        source: inputOptions.source
    };
    nconf.argv().env().defaults(internalConfig).use('memory'); //lets us call set later on
    const environment = nconf.get('NODE_ENV');
    process.env.NODE_ENV = environment;
    debug('Environment set to ' + environment);

    const environmentConfigFromFile = loadConfigFromFile('config/' + environment + '.js', inputOptions);
    const defaultConfigFromFile = loadConfigFromFile('config/default.js', inputOptions);

    _.merge(internalConfig, defaultConfigFromFile, environmentConfigFromFile);
    nconf.defaults(internalConfig);
    util.inspect.defaultOptions.showHidden = false;
    util.inspect.defaultOptions.depth = 10;
}

function loadConfigFromFile(filePath, options) {
    /* eslint-disable global-require*/
    const envFilePath = path.join(process.cwd(), options.configPath, filePath);
    const envFile = require(envFilePath);
    let config;
    if (typeof envFile === 'function') {
        config = envFile(options);
    } else if (typeof envFile.default === 'function') {
        config = envFile.default(options);
    } else {
        throw new Error(`Config file at ${filePath} must directly export a function`);
    }
    return config;
}

/**
 * Gets a value out of the config store
 * @param {string} key The unique name of they key for the value
 */
export function get(key) {
    return nconf.get(key);
}

/**
 * Sets a value in the config store, will only exist in memory and will not persist across reboots
 * @param {string} key The unique name of the key to store the value under
 * @param {any} value The value to store, can be any type
 */
export function set(key, value) {
    return nconf.set(key, value);
}
