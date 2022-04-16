/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.remove = function (profiler, action, sourceValues, values) {
    // Remove empty and null values.
    values = values.filter(el => {return el != null && el != '';});
    // Process the static values.
    if (Array.isArray(values) && action.static_values && action.static_values !== undefined) {
      action.static_values.forEach(static_value => {
        if (static_value !== undefined) {
          values.push(static_value);
        }
      });
    }
    values.forEach(value => {
      // Remove the value from localstorage if its applicable.
      if (action.storage.localstorage === 'localstorage') {
        localStorage.removeItem(value);
      }
      // Remove the value from cookie if its applicable.
      if (action.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '', 0);
      }
    });
  }
})(window, localStorage);
