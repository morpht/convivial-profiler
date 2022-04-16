/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.str_contains = function (profiler, processor, values) {
    var expire = window.convivialProfiler._getTime() + processor.ttl;
    if (processor.ttl !== null && processor.ttl > 0) {
      expire = window.convivialProfiler._getTime() - 1;
    }
    var result = false;
    if (values && values.length > 0 && values[0] && values[0].includes(processor.needle)) {
      result = true;
    }
    window.convivialProfiler._setValue('store', processor.key, {
      value: result,
      expire: expire,
    });
  }
})(window);
