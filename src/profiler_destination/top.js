/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.top = function (profiler, destination, sourceValues, values) {
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
    if (destination.storage.localstorage === 'localstorage') {
      localStorage.setItem(destination.key, topKey);
    }
    // Store the value in cookie if its applicable.
    if (destination.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(destination.key, topKey);
    }   
  }
})(window, localStorage);
