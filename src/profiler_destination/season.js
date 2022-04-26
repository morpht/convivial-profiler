/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.season = function (profiler, destination, values) {
    var storage_value = window.convivialProfiler._getValue(destination.storage_key);
    if (storage_value) {
      var seasons = ['winter', 'winter', 'spring', 'spring', 'spring',
        'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
      var adjust = storage_value < 0 ? 6 : 0;
      var month = (new Date().getMonth() + adjust) % 12;
      // Store the data in localstorage if its applicable.
      if (destination.target_location.localstorage === 'localstorage') {
        localStorage.setItem(destination.target_key, seasons[month]);
      }
      // Store the data in cookie if its applicable.
      if (destination.target_location.cookie === 'cookie') {
        window.convivialProfiler._setCookie(destination.target_key, seasons[month]);
      }
    }
    else if (destination.remove_empty && !storage_value) {
      localStorage.removeItem(destination.target_key);
    }
  }
})(window, localStorage);
