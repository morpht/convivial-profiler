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
    var paths_values = [];
    destination.paths.forEach(path => {
      var value = window.convivialProfiler._getValue(path);
      if (value !== undefined) {
        paths_values.push(value);
      }
    });
    if (paths_values.length) {
      var seasons = ['winter', 'winter', 'spring', 'spring', 'spring',
        'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
      var adjust = paths_values[0] < 0 ? 6 : 0;
      var month = (new Date().getMonth() + adjust) % 12;
      // Store the data in localstorage if its applicable.
      if (destination.storage_location.localstorage === 'localstorage') {
        localStorage.setItem(destination.key, seasons[month]);
      }
      // Store the data in cookie if its applicable.
      if (destination.storage_location.cookie === 'cookie') {
        window.convivialProfiler._setCookie(destination.key, seasons[month]);
      }
    }
    else if (destination.remove_empty && !paths_values.length) {
      localStorage.removeItem(destination.key);
    }
  }
})(window, localStorage);
