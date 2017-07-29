// @flow

import _ from 'lodash';
import nconf from 'nconf';
import util from 'util';
import path from 'path';

/**
 * Initialises nconf using a hierarchy of sources for the source application or script.
 * The priority order for parameters is:
 * * command line arguments (argv).
 * * environment variables.
 * * source code files stored in the ./config folder of your application.
 * Also allows for using nconf.set which will save to memory.
 * @param source the name of the application or script that we are initialising config for.
 */
export default function initialiseConfig(source: string) {
    if (!source) {
        throw new Error('Source is required');
    }
    if (typeof source !== 'string') {
        throw new Error('Source is required');
    }
    const envDefault = {
        NODE_ENV: 'development',
        source: source
    };
    nconf.argv().env().defaults(envDefault).use('memory'); //lets us call set later on
    const environment = nconf.get('NODE_ENV');
    //eslint-disable-next-line no-process-env
    process.env.NODE_ENV = environment;
    console.log('Environment set to ' + environment);
    const cwd = process.cwd();
    const options = {
        source
    };
    /* eslint-disable global-require*/
    const envFilePath = path.join(cwd, 'config/' + environment + '.js');
    const environmentConfig = require(envFilePath).default(options);
    const defaultEnvPath = path.join(cwd, 'config/default.js');
    const defaultConfig = require(defaultEnvPath).default(options);

    _.merge(envDefault, defaultConfig, environmentConfig);
    nconf.defaults(envDefault);
    util.inspect.defaultOptions.showHidden = false;
    util.inspect.defaultOptions.depth = 10;
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
