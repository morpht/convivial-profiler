/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.accumulation = function (profiler, processor, values) {
    values.forEach(value => {
      window.convivialProfiler._increaseValue('accumulators', processor.key, value);
    });
  }
})(window);
