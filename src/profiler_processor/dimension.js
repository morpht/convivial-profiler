/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.dimension = function (profiler, processor, values) {
    values.forEach(value => {
      if (processor.normalize) {
        window.convivialProfiler._increaseSubValue('dimensions', processor.key, value, 1 / values.length);
      }
      else {
        window.convivialProfiler._increaseSubValue('dimensions', processor.key, value);
      }
    });
  }
})(window);
