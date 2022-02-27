/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.set = function (publisher, values) {
    values.forEach(value => {
      // Store the value in localstorage if its applicable.
      if (publisher.storage.localstorage === 'localstorage') {
        localStorage.setItem(value, '1');
      }
      // Store the value in cookie if its applicable.
      if (publisher.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '1');
      }
    });
  }
})(window, localStorage);
