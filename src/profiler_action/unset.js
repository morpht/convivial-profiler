/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.unset = function (profiler, action, sourceValues, values) {
    values.forEach(value => {
      // Unset the value in localstorage if its applicable.
      if (action.storage.localstorage === 'localstorage') {
        localStorage.setItem(value, '0');
      }
      // Unset the value in cookie if its applicable.
      if (action.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '0');
      }
    });
  }
})(window, localStorage);
