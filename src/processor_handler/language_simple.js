/**
 * @file
 * Convivial Profiler library handler plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorHandler = window.convivialProfiler.processorHandler || {};
  window.convivialProfiler.processorHandler.language_simple = function (processor, handler, values) {
    var expire = window.convivialProfiler._getTime() + handler.ttl;
    if (handler.ttl !== null && handler.ttl > 0) {
      expire = window.convivialProfiler._getTime() - 1;
    }
    values.forEach(value => {
      window.convivialProfiler._setValue('store', handler.key, {
        value: value.split("-")[0].toLowerCase(),
        expire: expire,
      });
    });
  }
})(window);
