describe('initialiseConfig', () => {
    it('should merge in the values based on the NODE_ENV value', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        initialiseConfig(appName);
        expect(initialiseConfig.get('isAwesome')).toBe(true);
    });
    it('should should include the source name in the config.', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        initialiseConfig(appName);
        expect(initialiseConfig.get('name')).toBe(appName);
    });
    it('should should include the NODE_ENV value in the config.', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        initialiseConfig(appName);
        expect(initialiseConfig.get('NODE_ENV')).toBe('test');
    });
    it('should should throw an error if no source is provided.', () => {
        const initialiseConfig = require('../src').default;
        expect(() => initialiseConfig()).toThrow();
    });
    it('should should throw an error if source is not a string.', () => {
        const initialiseConfig = require('../src').default;
        const appName = 42;
        expect(() => initialiseConfig(appName)).toThrow();
    });
    it('should export the get method.', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        initialiseConfig(appName);
        expect(initialiseConfig.get('isAwesome')).toBe(true);
    });
    it('should support the older node module format', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        process.env.NODE_ENV = 'old';
        initialiseConfig(appName);
        process.env.NODE_ENV = 'test';
        expect(initialiseConfig.get('isAwesome')).toBe(42);
    });
    it('should export throw an error if the config file does not export a function or object', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        process.env.NODE_ENV = 'fake';
        expect(() => initialiseConfig(appName)).toThrow();
        process.env.NODE_ENV = 'test';
    });
    it('should allow you to specify a different path, relative to the cwd, to the config folder', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        const options = {
            name: appName,
            configPath: 'custom-path/more'
        };
        initialiseConfig(options);
        expect(initialiseConfig.get('isAwesome')).toBe('pimpMyRide');
    });
    it('should allow you to just pass in a string if no other options are required', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        initialiseConfig(appName);
        expect(initialiseConfig.get('isAwesome')).toBe(true);
    });
    it('should allow files that export an object instead of a function', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        process.env.NODE_ENV = 'object';
        initialiseConfig(appName);
        process.env.NODE_ENV = 'test';
        expect(initialiseConfig.get('isAwesome')).toBe('object');
    });
    it('should allow files that export an object instead of a function', () => {
        const initialiseConfig = require('../src').default;
        const appName = 'someApplication';
        process.env.NODE_ENV = 'json';
        initialiseConfig(appName);
        process.env.NODE_ENV = 'test';
        expect(initialiseConfig.get('isAwesome')).toBe('json');
    });
});
