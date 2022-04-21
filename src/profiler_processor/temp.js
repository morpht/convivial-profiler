/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.temp = function (profiler, processor, values) {
    // Store values temporarily.
    values.forEach(value => {
      window.convivialProfiler._setValue('temp', processor.key, {value: value});
    });
  }
})(window);
