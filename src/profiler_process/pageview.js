/**
 * @file
 * Convivial Profiler library process plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcess = window.convivialProfiler.profilerProcess || {};
  window.convivialProfiler.profilerProcess.pageview = function (profiler, process, values) {
    window.convivialProfiler.track('pageview', window.location.href);
  }
})(window);
