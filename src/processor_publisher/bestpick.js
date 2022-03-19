/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.bestpick = function (publisher, values) {
    // Remove empty and null values.
    values = values.filter(el => {return el != null && el != '';});
    if (Array.isArray(values) && values.length === 0 && publisher.default_value && publisher.default_value !== undefined) {
      values.push(publisher.default_value);
    }
    // Store the value in localstorage if its applicable.
    if (publisher.storage.localstorage === 'localstorage' && values[0]) {
      localStorage.setItem(publisher.key, values[0]);
    }
    // Store the value in cookie if its applicable.
    if (publisher.storage.cookie === 'cookie' && values[0]) {
      window.convivialProfiler._setCookie(publisher.key, values[0]);
    }
  }
})(window, localStorage);
