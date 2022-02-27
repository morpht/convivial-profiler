/**
 * @file
 * Convivial Profiler library handler plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorHandler = window.convivialProfiler.processorHandler || {};
  window.convivialProfiler.processorHandler.extreme_geoip = function (processor, handler, values) {
    values.forEach(value => {
      window.convivialProfiler._setValue('fetchers', handler.key, {
        value: value,
        expire: window.convivialProfiler._getTime() + handler.ttl,
      });
    });
  }
})(window);
