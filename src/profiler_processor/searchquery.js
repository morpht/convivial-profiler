/**
 * @file
 * Convivial Profiler library processor plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
  window.convivialProfiler.profilerProcessor.searchquery = function (profiler, processor, values) {
    // Track only if the user is on the search path.
    if (window.location.pathname.includes(processor.search_path) && window.location.search.substring(1).length > 0) {
      var params = [];
      var query_param_value = '';
      window.location.search.substring(1).split('&').forEach(param => {
        params.push(param.split('=')[0]);
        if (param.split('=')[0] === processor.query_param) {
          query_param_value = param.split('=')[1];
        }
      });
      // Url query params should include whitelisted param and does not have exclude param.
      if (params.includes(processor.query_param) && !params.includes(processor.exclude_param) && query_param_value !== '') {
        var searchQueryLogs = window.convivialProfiler._getValue('log.' + processor.storage_key) || [];
        var log_title = query_param_value.split('+').join(' ');
        // Log and track unique searches.
        if (searchQueryLogs.find(log => log.title == log_title) === undefined) {
          if (processor.log === true) {
            // Log recent searches based on the defined size.
            window.convivialProfiler._logValue(processor.storage_key, {"title":log_title, "url":window.location.href}, processor.size);
          }
          if (processor.track === true) {
            window.convivialProfiler._increaseValue('counters', processor.storage_key);
          }
        }
      }
    }
  }
})(window);
