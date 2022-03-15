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
    // Remove empty and null values.
    values = values.filter(el => {return el != null && el != '';});
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
