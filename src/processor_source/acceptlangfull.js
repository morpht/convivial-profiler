/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, document) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorSource = window.convivialProfiler.processorSource || {};
  window.convivialProfiler.processorSource.acceptlangfull = function (processor, source, values) {
    if (navigator.language !== null && navigator.language.includes("-")) {
      values.push(navigator.language);
    }
    else {
      values.push("en-AU");
    }
  }
})(window, document);
