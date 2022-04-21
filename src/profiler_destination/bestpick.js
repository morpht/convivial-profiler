/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.bestpick = function (profiler, destination, values) {
    var paths_values = [];
    destination.paths.forEach(path => {
      if (destination.global_storage && destination.global_storage !== undefined) {
        var value = localStorage.getItem(path);
      } else {
        var value = window.convivialProfiler._getValue(path);
      }
      if (value !== undefined) {
        paths_values.push(value);
      }
    });
    // Remove empty and null values and add default value.
    paths_values = paths_values.filter(el => {return el != null && el != '';});
    if (Array.isArray(paths_values) && paths_values.length === 0 && destination.default_value && destination.default_value !== undefined) {
      paths_values.push(destination.default_value);
    }
    if (paths_values.length) {
      // Store the data in localstorage if its applicable.
      if (destination.storage_location.localstorage === 'localstorage' && paths_values[0]) {
        localStorage.setItem(destination.key, paths_values[0]);
      }
      // Store the data in cookie if its applicable.
      if (destination.storage_location.cookie === 'cookie' && paths_values[0]) {
        window.convivialProfiler._setCookie(destination.key, paths_values[0]);
      }
    }
    else if (destination.remove_empty && !paths_values.length) {
      localStorage.removeItem(destination.key);
    }
  }
})(window, localStorage);
