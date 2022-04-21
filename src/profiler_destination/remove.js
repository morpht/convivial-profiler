/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.remove = function (profiler, destination, values) {
    var paths_values = [];
    destination.paths.forEach(path => {
      var value = window.convivialProfiler._getValue(path);
      if (value !== undefined) {
        paths_values.push(value);
      }
    });
    if (paths_values.length) {
      // Remove empty and null values.
      paths_values = paths_values.filter(el => {return el != null && el != '';});
      // Process the static values.
      if (Array.isArray(paths_values) && destination.static_values && destination.static_values !== undefined) {
        destination.static_values.forEach(static_value => {
          if (static_value !== undefined) {
            paths_values.push(static_value);
          }
        });
      }
      paths_values.forEach(paths_value => {
        // Remove the data from localstorage if its applicable.
        if (destination.storage_location.localstorage === 'localstorage') {
          localStorage.removeItem(paths_value);
        }
        // Remove the data from cookie if its applicable.
        if (destination.storage_location.cookie === 'cookie') {
          window.convivialProfiler._setCookie(paths_value, '', 0);
        }
      });
    }
  }
})(window, localStorage);
