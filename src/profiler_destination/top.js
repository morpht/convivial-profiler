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
    var dimension_value = window.convivialProfiler._getValue(destination.dimension_key);
    if (dimension_value) {
      var topKey = null;
      var topValue = null;
      for (var key in dimension_value) {
        if (topValue === null || dimension_value[key] > topValue) {
          topKey = key;
          topValue = dimension_value[key];
        }
      }
      // Store the data in localstorage if its applicable.
      if (destination.target_location.localstorage === 'localstorage') {
        localStorage.setItem(destination.target_key, topKey);
      }
      // Store the data in cookie if its applicable.
      if (destination.target_location.cookie === 'cookie') {
        window.convivialProfiler._setCookie(destination.target_key, topKey);
      }
    }
    else if (destination.remove_empty && !dimension_value) {
      localStorage.removeItem(destination.target_key);
    }
  }
})(window, localStorage);
