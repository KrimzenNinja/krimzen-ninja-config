// @flow

import _ from 'lodash/fp/merge';
import nconf from 'nconf';
import util from 'util';
import defaultConfig from './default.js';

/**
 * This function says hello.
 * @param name Some name to say hello to.
 * @returns The hello message.
 */
// const sayHello = (name: string = 'World'): string => `Hello, ${name}!`;

function initialiseConfig(source: string) {
    if (!source) {
        throw new Error('Source is required');
    }
    const envDefault = { NODE_ENV: 'development' };
    nconf.argv().env().defaults(envDefault).use('memory'); //lets us call set later on
    const environment = nconf.get('NODE_ENV');
    //eslint-disable-next-line no-process-env
    process.env.NODE_ENV = environment;
    console.log('Environment set to ' + environment);
    const envFilePath = './' + environment + '.js';
    const options = {
        source
    };
    //eslint-disable-next-line global-require
    const environmentConfig = require(envFilePath)(options);

    _.merge(envDefault, defaultConfig(options), environmentConfig);
    nconf.defaults(envDefault);
    util.inspect.defaultOptions.showHidden = false;
    util.inspect.defaultOptions.depth = 10;
}

export default initialiseConfig;
