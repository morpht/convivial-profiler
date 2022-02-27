/**
 * @file
 * Convivial Profiler library handler plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorHandler = window.convivialProfiler.processorHandler || {};
  window.convivialProfiler.processorHandler.datalayer_event = function (processor, handler, values) {
    values.forEach(value => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'convivialProfiler.event',
        category: handler.category,
        action: handler.action,
        label: value,
        value: handler.normalize ? 1 / values.length : 1,
      });
    });
  }
})(window);
