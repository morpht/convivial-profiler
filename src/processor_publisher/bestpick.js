/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.bestpick = function (publisher, values) {
    // Store the value in localstorage if its applicable.
    if (publisher.storage.localstorage === 'localstorage' && values[0]) {
      localStorage.setItem(publisher.key, values[0]);
    }
    // Store the value in cookie if its applicable.
    if (publisher.storage.cookie === 'cookie' && values[0]) {
      window.convivialProfiler._setCookie(publisher.key, values[0]);
    }
  }
})(window, localStorage);
