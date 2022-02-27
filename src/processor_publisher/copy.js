/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.copy = function (publisher, values) {
    // Store the value in localstorage if its applicable.
    if (publisher.storage.localstorage === 'localstorage') {
      localStorage.setItem(publisher.key, values[0]);
    }
    // Store the value in cookie if its applicable.
    if (publisher.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(publisher.key, values[0]);
    }
  }
})(window, localStorage);
