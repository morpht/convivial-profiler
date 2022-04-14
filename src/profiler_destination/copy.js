/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.copy = function (profiler, destination, sourceValues, values) {
    // Store the value in localstorage if its applicable.
    if (destination.storage.localstorage === 'localstorage') {
      localStorage.setItem(destination.key, values[0]);
    }
    // Store the value in cookie if its applicable.
    if (destination.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(destination.key, values[0]);
    }
  }
})(window, localStorage);
