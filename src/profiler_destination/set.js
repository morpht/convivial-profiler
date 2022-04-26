/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.set = function (profiler, destination, values) {
    var storage_value = window.convivialProfiler._getValue(destination.storage_key);
    if (storage_value) {
      // Store the data in localstorage if its applicable.
      if (destination.target_location.localstorage === 'localstorage') {
        localStorage.setItem(storage_value, '1');
      }
      // Store the data in cookie if its applicable.
      if (destination.target_location.cookie === 'cookie') {
        window.convivialProfiler._setCookie(storage_value, '1');
      }
    }
  }
})(window, localStorage);
