/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.season = function (profiler, action, sourceValues, values) {
    var seasons = ['winter', 'winter', 'spring', 'spring', 'spring',
      'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    var adjust = values[0] < 0 ? 6 : 0;
    var month = (new Date().getMonth() + adjust) % 12;
    // Store the value in localstorage if its applicable.
    if (action.storage.localstorage === 'localstorage') {
      localStorage.setItem(action.key, seasons[month]);
    }
    // Store the value in cookie if its applicable.
    if (action.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(action.key, seasons[month]);
    }
  }
})(window, localStorage);
