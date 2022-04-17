/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.copy = function (profiler, destination, sourceValues, values) {
    var result = values[0];
    if (destination.json_stringify !== undefined && destination.json_stringify) {
      result = JSON.stringify(result);
    }
    // Store the value in localstorage if its applicable.
    if (destination.storage.localstorage === 'localstorage') {
      localStorage.setItem(destination.key, result);
    }
    // Store the value in cookie if its applicable.
    if (destination.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(destination.key, result);
    }
  }
})(window, localStorage);
