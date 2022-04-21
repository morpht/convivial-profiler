/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.copy = function (profiler, destination, values) {
    var paths_values = [];
    destination.paths.forEach(path => {
      var value = window.convivialProfiler._getValue(path);
      if (value !== undefined) {
        paths_values.push(value);
      }
    });
    if (paths_values.length) {
      var result = paths_values[0];
      if (destination.json_stringify !== undefined && destination.json_stringify) {
        result = JSON.stringify(result);
      }
      // Store the data in localstorage if its applicable.
      if (destination.storage_location.localstorage === 'localstorage') {
        localStorage.setItem(destination.key, result);
      }
      // Store the data in cookie if its applicable.
      if (destination.storage_location.cookie === 'cookie') {
        window.convivialProfiler._setCookie(destination.key, result);
      }
    }
    else if (destination.remove_empty && !paths_values.length) {
      localStorage.removeItem(destination.key);
    }
  }
})(window, localStorage);
