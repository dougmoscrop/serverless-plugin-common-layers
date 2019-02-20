'use strict';

module.exports = class CommonLayersPlugin {

    constructor(serverless) {
        const hooks = {
            'after:package:initialize': this.addLayers.bind(this)
        };

        Object.assign(this, { serverless, hooks });
    }

    addLayers() {
        const { service } = this.serverless;
        const { provider = {}, functions = {} } = service;
        const { layers } = provider;

        if (layers) {
            const { before = [], after = [] } = Array.isArray(layers) ? { before: layers } : layers;

            Object.values(functions).forEach(fn => {
                fn.layers = [].concat(before, fn.layers || [], after);
            });
        }
    }

};