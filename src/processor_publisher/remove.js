/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.remove = function (publisher, values) {
    values.forEach(value => {
      localStorage.removeItem(value);
      // Remove the value from localstorage if its applicable.
      if (publisher.storage.localstorage === 'localstorage') {
        localStorage.removeItem(value);
      }
      // Remove the value from cookie if its applicable.
      if (publisher.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '', 0);
      }
    });
  }
})(window, localStorage);