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
    var storage_values = [];
    destination.storage_keys.forEach(storage_key => {
      var value = window.convivialProfiler._getValue(storage_key);
      if (value !== undefined) {
        storage_values.push(value);
      }
    });
    if (storage_values.length) {
      // Remove empty and null values.
      storage_values = storage_values.filter(el => {return el != null && el != '';});
      // Process the static values.
      if (Array.isArray(storage_values) && destination.static_values && destination.static_values !== undefined) {
        destination.static_values.forEach(static_value => {
          if (static_value !== undefined) {
            storage_values.push(static_value);
          }
        });
      }
      storage_values.forEach(storage_value => {
        // Remove the data from localstorage if its applicable.
        if (destination.target_location.localstorage === 'localstorage') {
          localStorage.removeItem(storage_value);
        }
        // Remove the data from cookie if its applicable.
        if (destination.target_location.cookie === 'cookie') {
          window.convivialProfiler._setCookie(storage_value, '', 0);
        }
      });
    }
  }
})(window, localStorage);
