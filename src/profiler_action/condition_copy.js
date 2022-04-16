/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.condition_copy = function (profiler, action, sourceValues, values) {
    if (window.convivialProfiler._getValue(action.condition_path) === action.condition_value) {
      // Store the value in localstorage if its applicable.
      if (action.storage.localstorage === 'localstorage') {
        localStorage.setItem(action.key, values[0]);
      }
      // Store the value in cookie if its applicable.
      if (action.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(action.key, values[0]);
      }
    }
    else {
      if (action.condition_remove) {
        // Remove the value from localstorage if its applicable.
        if (action.storage.localstorage === 'localstorage') {
          localStorage.removeItem(action.key);
        }
        // Remove the value from cookie if its applicable.
        if (action.storage.cookie === 'cookie') {
          window.convivialProfiler._setCookie(action.key, '', 0);
        }
      }
    }
  }
})(window, localStorage);
