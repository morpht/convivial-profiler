/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.top = function (publisher, values) {
    var topKey = null;
    var topValue = null;
    values.forEach(value => {
      for (var key in value) {
        if (value.hasOwnProperty(key)
            && topValue === null || value[key] > topValue
        ) {
          topKey = key;
          topValue = value[key];
        }
      }
    });
    // Store the value in localstorage if its applicable.
    if (publisher.storage.localstorage === 'localstorage') {
      localStorage.setItem(publisher.key, topKey);
    }
    // Store the value in cookie if its applicable.
    if (publisher.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(publisher.key, topKey);
    }   
  }
})(window, localStorage);
