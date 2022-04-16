/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.copy = function (profiler, action, sourceValues, values) {
    // Store the value in localstorage if its applicable.
    if (action.storage.localstorage === 'localstorage') {
      localStorage.setItem(action.key, values[0]);
    }
    // Store the value in cookie if its applicable.
    if (action.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(action.key, values[0]);
    }
  }
})(window, localStorage);
