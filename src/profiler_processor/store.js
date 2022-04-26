/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.store = function (profiler, processor, values) {
    var expire = window.convivialProfiler._getTime() + processor.ttl;
    // Store values permanently.
    if (processor.ttl !== null && processor.ttl < 1) {
      expire = window.convivialProfiler._getTime() - 1;
    }
    values.forEach(value => {
      window.convivialProfiler._setValue('store', processor.storage_key, {
        value: value,
        expire: expire,
      });
    });
  }
})(window);
