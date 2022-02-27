/**
 * @file
 * Convivial Profiler library handler plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorHandler = window.convivialProfiler.processorHandler || {};
  window.convivialProfiler.processorHandler.dimension = function (processor, handler, values) {
    values.forEach(value => {
      if (handler.normalize) {
        window.convivialProfiler._increaseSubValue('dimensions', handler.key, value, 1 / values.length);
      }
      else {
        window.convivialProfiler._increaseSubValue('dimensions', handler.key, value);
      }
    });
  }
})(window);
