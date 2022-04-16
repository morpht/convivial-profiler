/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.range = function (profiler, action, sourceValues, values) {
    action.ranges.forEach(range => {
      if (values[0] >= range.min && values[0] < range.max) {
        // Store the value in localstorage if its applicable.
        if (action.storage.localstorage === 'localstorage') {
          localStorage.setItem(action.key, range.key);
        }
        // Store the value in cookie if its applicable.
        if (action.storage.cookie === 'cookie') {
          window.convivialProfiler._setCookie(action.key, range.key);
        }
      }
    });
  }
})(window, localStorage);
