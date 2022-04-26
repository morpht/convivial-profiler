/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.language_simple = function (profiler, processor, values) {
    var expire = window.convivialProfiler._getTime() + processor.ttl;
    if (processor.ttl !== null && processor.ttl > 0) {
      expire = window.convivialProfiler._getTime() - 1;
    }
    values.forEach(value => {
      window.convivialProfiler._setValue('store', processor.storage_key, {
        value: value.split("-")[0].toLowerCase(),
        expire: expire,
      });
    });
  }
})(window);
