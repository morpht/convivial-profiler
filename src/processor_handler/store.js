/**
 * @file
 * Convivial Profiler library handler plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorHandler = window.convivialProfiler.processorHandler || {};
  window.convivialProfiler.processorHandler.store = function (processor, handler, values) {
    var expire = window.convivialProfiler._getTime() + handler.ttl;
    // Store values permanently.
    if (handler.ttl !== null && handler.ttl < 1) {
      expire = window.convivialProfiler._getTime() - 1;
    }
    values.forEach(value => {
      window.convivialProfiler._setValue('store', handler.key, {
        value: value,
        expire: expire,
      });
    });
  }
})(window);
