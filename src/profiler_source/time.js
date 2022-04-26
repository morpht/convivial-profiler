/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerSource = window.convivialProfiler.profilerSource || {};
  window.convivialProfiler.profilerSource.time = function (profiler, source, values) {
    if (source.part === 'hour') {
      values.push(new Date().getHours());
    }
    else if (source.part === 'minute') {
      values.push(new Date().getMinutes());
    }
    else if (source.part === 'second') {
      values.push(new Date().getSeconds());
    }
  }
})(window);
