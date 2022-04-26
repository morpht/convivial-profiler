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
    var storage_value = window.convivialProfiler._getValue(destination.storage_key);
    if (storage_value) {
      if (destination.stringify !== undefined && destination.stringify) {
        storage_value = JSON.stringify(storage_value);
      }
      // Store the data in localstorage if its applicable.
      if (destination.target_location.localstorage === 'localstorage') {
        localStorage.setItem(destination.target_key, storage_value);
      }
      // Store the data in cookie if its applicable.
      if (destination.target_location.cookie === 'cookie') {
        window.convivialProfiler._setCookie(destination.target_key, storage_value);
      }
    }
    else if (destination.remove_empty && !storage_value) {
      localStorage.removeItem(destination.target_key);
    }
  }
})(window, localStorage);
