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
    var paths_values = [];
    destination.paths.forEach(path => {
      var value = window.convivialProfiler._getValue(path);
      if (value !== undefined) {
        paths_values.push(value);
      }
    });
    if (paths_values.length) {
      // If the value is greater than the threshold number, then publish it.
      if (paths_values[0] >= destination.threshold_number) {
        // Store the data in localstorage if its applicable.
        if (destination.storage_location.localstorage === 'localstorage') {
          localStorage.setItem(destination.storage_key, destination.storage_value);
        }
        // Store the data in cookie if its applicable.
        if (destination.storage_location.cookie === 'cookie') {
          var expires = new Date(Date.now() + 1 * 864e5).toUTCString();
          document.cookie = destination.storage_key + '=' + encodeURIComponent(destination.storage_value) + ';path=/;expires=' + expires;
        }
      }
    }
  }
})(window, localStorage);
