/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorSource = window.convivialProfiler.processorSource || {};
  window.convivialProfiler.processorSource.query = function (processor, source, values) {
    window.location.search.substring(1).split('&').forEach(param => {
      var parts = param.split('=');
      if (parts[0] === source.key || parts[0] === source.key + '[]') {
        var value = decodeURIComponent(parts[1].replace(/\+/g, ' '));
        values.push(parts[1] === undefined ? true : value);
      }
    });
  }
})(window);
