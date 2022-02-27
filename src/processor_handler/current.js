/**
 * @file
 * Convivial Profiler library handler plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorHandler = window.convivialProfiler.processorHandler || {};
  window.convivialProfiler.processorHandler.current = function (processor, handler, values) {
    values.forEach(value => {
      window.convivialProfiler._setValue('currents', handler.key, {
        value: value,
        expire: window.convivialProfiler._getTime() + handler.ttl,
      });
    });
  }
})(window);
