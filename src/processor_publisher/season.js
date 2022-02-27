/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.season = function (publisher, values) {
    var seasons = ['winter', 'winter', 'spring', 'spring', 'spring',
      'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    var adjust = values[0] < 0 ? 6 : 0;
    var month = (new Date().getMonth() + adjust) % 12;
    // Store the value in localstorage if its applicable.
    if (publisher.storage.localstorage === 'localstorage') {
      localStorage.setItem(publisher.key, seasons[month]);
    }
    // Store the value in cookie if its applicable.
    if (publisher.storage.cookie === 'cookie') {
      window.convivialProfiler._setCookie(publisher.key, seasons[month]);
    }
  }
})(window, localStorage);
