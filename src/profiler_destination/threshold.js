/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.threshold = function (profiler, destination, values) {
    var storage_value = window.convivialProfiler._getValue(destination.storage_key);
    if (storage_value) {
      // If the value is greater than the threshold number, then publish it.
      if (storage_value >= destination.threshold_number) {
        // Store the data in localstorage if its applicable.
        if (destination.target_location.localstorage === 'localstorage') {
          localStorage.setItem(destination.target_key, destination.target_value);
        }
        // Store the data in cookie if its applicable.
        if (destination.target_location.cookie === 'cookie') {
          var expires = new Date(Date.now() + 1 * 864e5).toUTCString();
          document.cookie = destination.target_key + '=' + encodeURIComponent(destination.target_value) + ';path=/;expires=' + expires;
        }
      }
    }
  }
})(window, localStorage);
