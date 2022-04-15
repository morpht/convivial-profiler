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
    window.convivialProfiler.track('pageview', window.location.href);
  }
})(window);
