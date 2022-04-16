/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.pageview = function (profiler, processor, values) {
    if (processor.log === true) {
      window.convivialProfiler._logValue(processor.key, [window.location.href, window.convivialProfiler._getTime()]);
    }
    if (processor.track === true) {
      window.convivialProfiler._increaseValue('counters', processor.key);
    }
  }
})(window);
