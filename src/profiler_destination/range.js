/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.range = function (profiler, destination, sourceValues, values) {
    destination.ranges.forEach(range => {
      if (values[0] >= range.min && values[0] < range.max) {
        // Store the value in localstorage if its applicable.
        if (destination.storage.localstorage === 'localstorage') {
          localStorage.setItem(destination.key, range.key);
        }
        // Store the value in cookie if its applicable.
        if (destination.storage.cookie === 'cookie') {
          window.convivialProfiler._setCookie(destination.key, range.key);
        }
      }
    });
  }
})(window, localStorage);
