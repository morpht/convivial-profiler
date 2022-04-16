/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.threshold = function (profiler, action, sourceValues, values) {
    // If the value is greater than the threshold number, then publish it.
    if (values[0] >= action.threshold_number) {
      // Store the value in localstorage if its applicable.
      if (action.storage.localstorage === 'localstorage') {
        localStorage.setItem(action.storage_key, action.storage_value);
      }
      // Store the value in cookie if its applicable.
      if (action.storage.cookie === 'cookie') {
        var expires = new Date(Date.now() + 1 * 864e5).toUTCString();
        document.cookie = action.storage_key + '=' + encodeURIComponent(action.storage_value) + ';path=/;expires=' + expires;
      }
    }
  }
})(window, localStorage);
