/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerSource = window.convivialProfiler.profilerSource || {};
  window.convivialProfiler.profilerSource.query = function (profiler, source, values) {
    window.location.search.substring(1).split('&').forEach(param => {
      var parts = param.split('=');
      if (parts[0] === source.param || parts[0] === source.param + '[]') {
        var value = decodeURIComponent(parts[1].replace(/\+/g, ' '));
        values.push(parts[1] === undefined ? true : value);
      }
    });
  }
})(window);
