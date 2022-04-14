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
    if (source.key === 'hour') {
      values.push(new Date().getHours());
    }
    else if (source.key === 'minute') {
      values.push(new Date().getMinutes());
    }
    else if (source.key === 'second') {
      values.push(new Date().getSeconds());
    }
  }
})(window);
