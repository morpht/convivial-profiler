/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.remove = function (profiler, destination, sourceValues, values) {
    // Remove empty and null values.
    values = values.filter(el => {return el != null && el != '';});
    // Process the static values.
    if (Array.isArray(values) && destination.static_values && destination.static_values !== undefined) {
      destination.static_values.forEach(static_value => {
        if (static_value !== undefined) {
          values.push(static_value);
        }
      });
    }
    values.forEach(value => {
      // Remove the value from localstorage if its applicable.
      if (destination.storage.localstorage === 'localstorage') {
        localStorage.removeItem(value);
      }
      // Remove the value from cookie if its applicable.
      if (destination.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '', 0);
      }
    });
  }
})(window, localStorage);
