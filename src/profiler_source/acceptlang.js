/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, document) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerSource = window.convivialProfiler.profilerSource || {};
  window.convivialProfiler.profilerSource.acceptlang = function (profiler, source, values) {
    if (navigator.language !== null && navigator.language.includes("-")) {
      values.push(navigator.language);
    }
    else {
      values.push("en-AU");
    }
  }
})(window, document);
