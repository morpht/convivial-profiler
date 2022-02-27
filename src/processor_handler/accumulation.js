/**
 * @file
 * Convivial Profiler library handler plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorHandler = window.convivialProfiler.processorHandler || {};
  window.convivialProfiler.processorHandler.accumulation = function (processor, handler, values) {
    values.forEach(value => {
      window.convivialProfiler._increaseValue('accumulators', handler.key, value);
    });
  }
})(window);
