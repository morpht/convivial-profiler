/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorSource = window.convivialProfiler.processorSource || {};
  window.convivialProfiler.processorSource.cookie = function (processor, source, values) {
    var value = window.convivialProfiler._getCookie(source.key);
    if (value !== null) {
      values.push(value);
    }
  }
})(window);
