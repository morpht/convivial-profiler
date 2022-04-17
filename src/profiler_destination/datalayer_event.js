/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

 (function (window) {
    window.convivialProfiler = window.convivialProfiler || {};
    window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
    window.convivialProfiler.profilerDestination.datalayer_event = function (profiler, destination, sourceValues, values) {
      sourceValues.forEach(sourceValue => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'convivialProfiler.event',
          category: destination.category,
          action: destination.action,
          label: sourceValue,
          value: destination.normalize ? 1 / sourceValues.length : 1,
        });
      });
    }
  })(window);
  