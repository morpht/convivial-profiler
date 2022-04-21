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
    var paths_values = [];
    destination.paths.forEach(path => {
      var value = window.convivialProfiler._getValue(path);
      if (value !== undefined) {
        paths_values.push(value);
      }
    });
    if (paths_values.length) {
      paths_values.forEach(paths_value => {
        // Store the data in localstorage if its applicable.
        if (destination.storage_location.localstorage === 'localstorage') {
          localStorage.setItem(paths_value, '1');
        }
        // Store the data in cookie if its applicable.
        if (destination.storage_location.cookie === 'cookie') {
          window.convivialProfiler._setCookie(paths_value, '1');
        }
      });
    }
  }
})(window, localStorage);
