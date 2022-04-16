/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.top = function (profiler, action, sourceValues, values) {
    var topKey = null;
    var topValue = null;
    values.forEach(value => {
      for (var key in value) {
        if (value.hasOwnProperty(key)
            && topValue === null || value[key] > topValue
        ) {
          topKey = key;
          topValue = value[key];
        }
      }
    });
    // Store the value in localstorage if its applicable.
    if (action.storage.localstorage === 'localstorage') {
      localStorage.setItem(action.key, topKey);
    }
    // Store the value in cookie if its applicable.
    if (action.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(action.key, topKey);
    }   
  }
})(window, localStorage);
