/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.extreme_geoip = function (profiler, processor, values) {
    values.forEach(value => {
      window.convivialProfiler._setValue('fetchers', processor.storage_key, {
        value: value,
        expire: window.convivialProfiler._getTime() + processor.ttl,
      });
    });
  }
})(window);
