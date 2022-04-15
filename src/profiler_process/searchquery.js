/**
 * @file
 * Convivial Profiler library process plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcess = window.convivialProfiler.profilerProcess || {};
  window.convivialProfiler.profilerProcess.searchquery = function (profiler, process, values) {
    // Track only if the user is on the search path.
    if (window.location.pathname.includes(process.search_path) && window.location.search.substring(1).length > 0) {
      var params = [];
      window.location.search.substring(1).split('&').forEach(param => {
        params.push(param.split('=')[0]);
      });
      // Url query params should include whitelisted param and does not have exclude param.
      if (params.includes(process.query_param) && !params.includes(process.exclude_param)) {
        var searchQueryLogs = window.convivialProfiler._getValue('log.' + process.key) || [];
        // Log and track unique searches.
        if (!searchQueryLogs.includes(window.location.href)) {
          if (process.log === true) {
            // Log recent searches based on the defined size.
            window.convivialProfiler._logValue(process.key, window.location.href, process.size);
          }
          if (process.track === true) {
            window.convivialProfiler._increaseValue('counters', process.key);
          }
        }
      }
    }
  }
})(window);
