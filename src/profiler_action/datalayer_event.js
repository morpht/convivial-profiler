/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.datalayer_event = function (profiler, action, sourceValues, values) {
    sourceValues.forEach(sourceValue => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'convivialProfiler.event',
        category: action.category,
        action: action.action,
        label: sourceValue,
        value: action.normalize ? 1 / sourceValues.length : 1,
      });
    });
  }
})(window);
