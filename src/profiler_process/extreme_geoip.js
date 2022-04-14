/**
 * @file
 * Convivial Profiler library process plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcess = window.convivialProfiler.profilerProcess || {};
  window.convivialProfiler.profilerProcess.extreme_geoip = function (profiler, process, values) {
    values.forEach(value => {
      window.convivialProfiler._setValue('fetchers', process.key, {
        value: value,
        expire: window.convivialProfiler._getTime() + process.ttl,
      });
    });
  }
})(window);
