/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.set = function (profiler, destination, sourceValues, values) {
    values.forEach(value => {
      // Store the value in localstorage if its applicable.
      if (destination.storage.localstorage === 'localstorage') {
        localStorage.setItem(value, '1');
      }
      // Store the value in cookie if its applicable.
      if (destination.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '1');
      }
    });
  }
})(window, localStorage);
