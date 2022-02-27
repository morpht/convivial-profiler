/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, document) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorSource = window.convivialProfiler.processorSource || {};
  window.convivialProfiler.processorSource.meta = function (processor, source, values) {
    var elements = document.querySelectorAll('meta[name="' + source.key + '"]');
    for (var element of elements) {
      values.push(element.getAttribute('content'));
    }
  }
})(window, document);
