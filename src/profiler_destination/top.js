/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.top = function (profiler, destination, values) {
    var paths_values = [];
    destination.paths.forEach(path => {
      var value = window.convivialProfiler._getValue(path);
      if (value !== undefined) {
        paths_values.push(value);
      }
    });
    if (paths_values.length) {
      var topKey = null;
      var topValue = null;
      paths_values.forEach(paths_value => {
        for (var key in paths_value) {
          if (paths_value.hasOwnProperty(key)
              && topValue === null || paths_value[key] > topValue
          ) {
            topKey = key;
            topValue = paths_value[key];
          }
        }
      });
      // Store the data in localstorage if its applicable.
      if (destination.storage_location.localstorage === 'localstorage') {
        localStorage.setItem(destination.key, topKey);
      }
      // Store the data in cookie if its applicable.
      if (destination.storage_location.cookie === 'cookie') {
        window.convivialProfiler._setCookie(destination.key, topKey);
      }
    }
    else if (destination.remove_empty && !paths_values.length) {
      localStorage.removeItem(destination.key);
    }
  }
})(window, localStorage);
