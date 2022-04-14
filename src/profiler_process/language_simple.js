/**
 * @file
 * Convivial Profiler library process plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcess = window.convivialProfiler.profilerProcess || {};
  window.convivialProfiler.profilerProcess.language_simple = function (profiler, process, values) {
    var expire = window.convivialProfiler._getTime() + process.ttl;
    if (process.ttl !== null && process.ttl > 0) {
      expire = window.convivialProfiler._getTime() - 1;
    }
    values.forEach(value => {
      window.convivialProfiler._setValue('store', process.key, {
        value: value.split("-")[0].toLowerCase(),
        expire: expire,
      });
    });
  }
})(window);
