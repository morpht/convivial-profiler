/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.map = function (profiler, processor, values) {
    if (values && values.length > 0 && values[0] && processor.mappings && processor.mappings.length > 0) {
      var matches = processor.mappings.filter(s => s.includes(values[0]+'|'));
      if (matches && matches.length > 0 && matches[0]) {
        // store the found match.
        window.convivialProfiler._setValue('store', processor.storage_key, {
            value: matches[0].replace(values[0]+'|', ''),
            expire: window.convivialProfiler._getTime(),
          });
      } else {
        // store the fallback value because source mapping does not exist.
        window.convivialProfiler._setValue('store', processor.storage_key, {
          value: processor.fallback_value,
          expire: window.convivialProfiler._getTime(),
        });
      }
    } else {
      // store the default value because source is empty.
      window.convivialProfiler._setValue('store', processor.storage_key, {
        value: processor.default_value,
        expire: window.convivialProfiler._getTime(),
      });
    }
  }
})(window);
