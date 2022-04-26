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
    var storage_values = [];
    destination.storage_keys.forEach(storage_key => {
      var value = localStorage.getItem(storage_key);
      if (value !== undefined) {
        storage_values.push(value);
      }
    });
    // Remove empty and null values and add default value.
    storage_values = storage_values.filter(el => {return el != null && el != '';});
    if (Array.isArray(storage_values) && storage_values.length === 0 && destination.default_value && destination.default_value !== undefined) {
      storage_values.push(destination.default_value);
    }
    if (storage_values.length) {
      // Store the data in localstorage if its applicable.
      if (destination.target_location.localstorage === 'localstorage' && storage_values[0]) {
        localStorage.setItem(destination.target_key, storage_values[0]);
      }
      // Store the data in cookie if its applicable.
      if (destination.target_location.cookie === 'cookie' && storage_values[0]) {
        window.convivialProfiler._setCookie(destination.target_key, storage_values[0]);
      }
    }
    else if (destination.remove_empty && !storage_values.length) {
      localStorage.removeItem(destination.target_key);
    }
  }
})(window, localStorage);
