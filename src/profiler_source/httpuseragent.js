/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

 (function (window, document) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerSource = window.convivialProfiler.profilerSource || {};
  window.convivialProfiler.profilerSource.httpuseragent = function (profiler, source, values) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      values.push("mobile");
    }
    else {
      values.push("desktop");
    }
  }
})(window, document);
