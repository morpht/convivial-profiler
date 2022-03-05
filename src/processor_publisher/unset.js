/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.unset = function (publisher, values) {
    values.forEach(value => {
      // Unset the value in localstorage if its applicable.
      if (publisher.storage.localstorage === 'localstorage') {
        localStorage.setItem(value, '0');
      }
      // Unset the value in cookie if its applicable.
      if (publisher.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '0');
      }
    });
  }
})(window, localStorage);
