'use strict';

const test = require('ava');

const Plugin = require('..');

test('skips unconfigured', t => {
    const serverless = {
        service: {}
    }
    const plugin = new Plugin(serverless);

    plugin.addLayers();
    t.pass();
});

test('sets (array)', t => {
    const foo = {};
    const serverless = {
        service: {
            provider: {
                layers: ['test']
            },
            functions: {
                foo
            }
        }
    };
    const plugin = new Plugin(serverless);

    plugin.addLayers();
    t.deepEqual(foo.layers, ['test']);
});

test('adds (array)', t => {
    const foo = {
        layers: ['testing']
    };
    const serverless = {
        service: {
            provider: {
                layers: ['test']
            },
            functions: {
                foo
            }
        }
    };
    const plugin = new Plugin(serverless);

    plugin.addLayers();
    t.deepEqual(foo.layers, ['test', 'testing']);
});

test('adds (object)', t => {
    const foo = {
        layers: ['testing']
    };
    const serverless = {
        service: {
            provider: {
                layers: {
                    before: ['before'],
                    after: 'after'
                }
            },
            functions: {
                foo
            }
        }
    };
    const plugin = new Plugin(serverless);

    plugin.addLayers();
    t.deepEqual(foo.layers, ['before', 'testing', 'after']);
});

test('adds (object - only after)', t => {
    const foo = {
        layers: ['testing']
    };
    const serverless = {
        service: {
            provider: {
                layers: {
                    after: 'after'
                }
            },
            functions: {
                foo
            }
        }
    };
    const plugin = new Plugin(serverless);

    plugin.addLayers();
    t.deepEqual(foo.layers, ['testing', 'after']);
});