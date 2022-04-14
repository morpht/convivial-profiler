/**
 * @file
 * Convivial Profiler library process plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcess = window.convivialProfiler.profilerProcess || {};
  window.convivialProfiler.profilerProcess.dimension = function (profiler, process, values) {
    values.forEach(value => {
      if (process.normalize) {
        window.convivialProfiler._increaseSubValue('dimensions', process.key, value, 1 / values.length);
      }
      else {
        window.convivialProfiler._increaseSubValue('dimensions', process.key, value);
      }
    });
  }
})(window);
