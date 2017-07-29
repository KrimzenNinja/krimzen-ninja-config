import nconf from 'nconf';

describe('initialiseConfig', () => {
    it('should merge in the values based on the NODE_ENV value', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        initialiseConfig(appName);
        expect(nconf.get('isAwesome')).toBe(true);
    });
    it('should should include the source name in the config.', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        initialiseConfig(appName);
        expect(nconf.get('source')).toBe(appName);
    });
    it('should should include the NODE_ENV value in the config.', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        initialiseConfig(appName);
        expect(nconf.get('NODE_ENV')).toBe('test');
    });
});
