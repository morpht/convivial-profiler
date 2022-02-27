/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.range = function (publisher, values) {
    publisher.ranges.forEach(range => {
      if (values[0] >= range.min && values[0] < range.max) {
        // Store the value in localstorage if its applicable.
        if (publisher.storage.localstorage === 'localstorage') {
          localStorage.setItem(publisher.key, range.key);
        }
        // Store the value in cookie if its applicable.
        if (publisher.storage.cookie === 'cookie') {
          window.convivialProfiler._setCookie(publisher.key, range.key);
        }
      }
    });
  }
})(window, localStorage);
