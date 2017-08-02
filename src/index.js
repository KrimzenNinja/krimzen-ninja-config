// @flow

import _ from 'lodash';
import nconf from 'nconf';
import util from 'util';
import path from 'path';

/**
 * The initialisation options for setting up the configuration library
 */
type ConfigOptions = {
    configPath: string
};

const defaultConfigOptions: ConfigOptions = {
    configPath: ''
};

/**
 * Initialises nconf using a hierarchy of sources for the source application or script.
 * The priority order for parameters is:
 * * command line arguments (argv).
 * * environment variables.
 * * source code files stored in the ./config folder of your application.
 * Also allows for using nconf.set which will save to memory.
 * @param source the name of the application or script that we are initialising config for.
 */
export default function initialiseConfig(source: string, inputOptions: ConfigOptions = defaultConfigOptions) {
    if (!source) {
        throw new Error('Source is required');
    }
    if (typeof source !== 'string') {
        throw new Error('Source is required');
    }
    const internalConfig = {
        NODE_ENV: 'development',
        source: source
    };
    nconf.argv().env().defaults(internalConfig).use('memory'); //lets us call set later on
    const environment = nconf.get('NODE_ENV');
    process.env.NODE_ENV = environment;
    console.log('Environment set to ' + environment);

    const environmentConfigFromFile = loadConfigFromFile('config/' + environment + '.js', inputOptions);
    const defaultConfigFromFile = loadConfigFromFile('config/default.js', inputOptions);

    _.merge(internalConfig, defaultConfigFromFile, environmentConfigFromFile);
    nconf.defaults(internalConfig);
    util.inspect.defaultOptions.showHidden = false;
    util.inspect.defaultOptions.depth = 10;
}

function loadConfigFromFile(filePath: string, options) {
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
 * @param key The unique name of they key for the value
 */
export function get(key: string) {
    return nconf.get(key);
}

/**
 * Sets a value in the config store, will only exist in memory and will not persist across reboots
 * @param key The unique name of the key to store the value under
 * @param value The value to store, can be any type
 */
export function set(key: string, value: any) {
    return nconf.set(key, value);
}
