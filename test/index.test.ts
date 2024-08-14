import {Logger, createLogger, createLoggerShortcuts} from '../src/index'

describe('testing index file', () => {
    test('Logger class can be instantiated', () => {
        const logger = new Logger('test');
        expect(logger).toBeInstanceOf(Logger);
    });

    test('createLoggerShortcuts returns expected methods', () => {
        const logger = new Logger('test');
        const shortcuts = createLoggerShortcuts(logger);

        expect(shortcuts).toHaveProperty('_')
        expect(shortcuts).toHaveProperty('_debug');
        expect(shortcuts).toHaveProperty('_error');
        expect(shortcuts).toHaveProperty('_info');
        expect(shortcuts).toHaveProperty('_warn');
    });

    test('createLogger returns expected object', () => {
        const shortcuts = createLogger('test');
        expect(shortcuts).toHaveProperty('_')
        expect(shortcuts).toHaveProperty('_debug');
        expect(shortcuts).toHaveProperty('_error');
        expect(shortcuts).toHaveProperty('_info');
        expect(shortcuts).toHaveProperty('_logger');
        expect(shortcuts).toHaveProperty('_warn');
    })
});