/**
 * @file
 * Convivial Profiler library process plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcess = window.convivialProfiler.profilerProcess || {};
  window.convivialProfiler.profilerProcess.accumulation = function (profiler, process, values) {
    values.forEach(value => {
      window.convivialProfiler._increaseValue('accumulators', process.key, value);
    });
  }
})(window);
