/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.unset = function (profiler, destination, values) {
    var paths_values = [];
    destination.paths.forEach(path => {
      var value = window.convivialProfiler._getValue(path);
      if (value !== undefined) {
        paths_values.push(value);
      }
    });
    if (paths_values.length) {
      paths_values.forEach(paths_value => {
        // Unset the data in localstorage if its applicable.
        if (destination.storage_location.localstorage === 'localstorage') {
          localStorage.setItem(paths_value, '0');
        }
        // Unset the data in cookie if its applicable.
        if (destination.storage_location.cookie === 'cookie') {
          window.convivialProfiler._setCookie(paths_value, '0');
        }
      });
    }
  }
})(window, localStorage);
