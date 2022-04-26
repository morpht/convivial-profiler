/**
 * @file
 * Convivial Profiler library source plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, XMLHttpRequest, console) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerSource = window.convivialProfiler.profilerSource || {};
  window.convivialProfiler.profilerSource.get = function (profiler, source, values) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      try {
        values.push(JSON.parse(xhr.response));
        window.convivialProfiler._processValues(profiler, values);
      }
      catch (e) {
        xhr.onerror();
      }
    };
    xhr.onerror = function () {
      console.debug('Unable to fetch values of "' + source.resource_url + '".');
    };
    xhr.open('GET', source.resource_url);
    xhr.send();
  }
})(window, XMLHttpRequest, console);
