/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerSource = window.convivialProfiler.profilerSource || {};
  window.convivialProfiler.profilerSource.cookie = function (profiler, source, values) {
    var value = window.convivialProfiler._getCookie(source.key);
    if (value !== null) {
      values.push(value);
    }
  }
})(window);
