/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.season = function (profiler, destination, sourceValues, values) {
    var seasons = ['winter', 'winter', 'spring', 'spring', 'spring',
      'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    var adjust = values[0] < 0 ? 6 : 0;
    var month = (new Date().getMonth() + adjust) % 12;
    // Store the value in localstorage if its applicable.
    if (destination.storage.localstorage === 'localstorage') {
      localStorage.setItem(destination.key, seasons[month]);
    }
    // Store the value in cookie if its applicable.
    if (destination.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(destination.key, seasons[month]);
    }
  }
})(window, localStorage);
