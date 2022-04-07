/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
  window.convivialProfiler.processorPublisher.remove = function (publisher, values) {
    // Remove empty and null values.
    values = values.filter(el => {return el != null && el != '';});
    // Process the static values.
    if (Array.isArray(values) && publisher.static_values && publisher.static_values !== undefined) {
      publisher.static_values.forEach(static_value => {
        if (static_value !== undefined) {
          values.push(static_value);
        }
      });
    }
    values.forEach(value => {
      // Remove the value from localstorage if its applicable.
      if (publisher.storage.localstorage === 'localstorage') {
        localStorage.removeItem(value);
      }
      // Remove the value from cookie if its applicable.
      if (publisher.storage.cookie === 'cookie') {
        window.convivialProfiler._setCookie(value, '', 0);
      }
    });
  }
})(window, localStorage);
