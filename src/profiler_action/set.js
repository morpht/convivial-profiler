/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.set = function (profiler, action, sourceValues, values) {
    values.forEach(value => {
      // Store the value in localstorage if its applicable.
      if (action.storage.localstorage === 'localstorage') {
        localStorage.setItem(value, '1');
      }
      // Store the value in cookie if its applicable.
      if (action.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '1');
      }
    });
  }
})(window, localStorage);
