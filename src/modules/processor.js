/**
 * @file
 * Convivial Profiler library processor plugins.
 */

import { getTime } from "../lib/utility"

function accumulation(profiler, processor, values) {
  values.forEach(value => {
    window.convivialProfiler._increaseValue('accumulators', processor.storage_key, value);
  });
};
function dimension(profiler, processor, values) {
  values.forEach(value => {
    if (processor.normalize) {
      window.convivialProfiler._increaseSubValue('dimensions', processor.storage_key, value, 1 / values.length);
    }
    else {
      window.convivialProfiler._increaseSubValue('dimensions', processor.storage_key, value);
    }
  });
};
function extreme_geoip(profiler, processor, values) {
  values.forEach(value => {
    window.convivialProfiler._setValue('fetchers', processor.storage_key, {
      value: value,
      expire: getTime() + processor.ttl,
    });
  });
};
function language_full(profiler, processor, values) {
  var expire = getTime() + processor.ttl;
  if (processor.ttl !== null && processor.ttl > 0) {
    expire = getTime() - 1;
  }
  values.forEach(value => {
    window.convivialProfiler._setValue('store', processor.storage_key, {
      value: value.toLowerCase(),
      expire: expire,
    });
  });
};
function language_simple(profiler, processor, values) {
  var expire = getTime() + processor.ttl;
  if (processor.ttl !== null && processor.ttl > 0) {
    expire = getTime() - 1;
  }
  values.forEach(value => {
    window.convivialProfiler._setValue('store', processor.storage_key, {
      value: value.split("-")[0].toLowerCase(),
      expire: expire,
    });
  });
};
function map(profiler, processor, values) {
  if (values && values.length > 0 && values[0] && processor.mappings && processor.mappings.length > 0) {
    var matches = processor.mappings.filter(s => s.includes(values[0]+'|'));
    if (matches && matches.length > 0 && matches[0]) {
      // store the found match.
      window.convivialProfiler._setValue('store', processor.storage_key, {
          value: matches[0].replace(values[0]+'|', ''),
          expire: getTime(),
        });
    } else {
      // store the fallback value because source mapping does not exist.
      window.convivialProfiler._setValue('store', processor.storage_key, {
        value: processor.fallback_value,
        expire: getTime(),
      });
    }
  } else {
    // store the default value because source is empty.
    window.convivialProfiler._setValue('store', processor.storage_key, {
      value: processor.default_value,
      expire: getTime(),
    });
  }
};
function pageview(profiler, processor, values) {
  if (processor.log === true) {
    window.convivialProfiler._logValue(processor.storage_key, [window.location.href, getTime()]);
  }
  if (processor.track === true) {
    window.convivialProfiler._increaseValue('counters', processor.storage_key);
  }
};
function searchquery(profiler, processor, values) {
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
};
function store(profiler, processor, values) {
  var expire = getTime() + processor.ttl;
  // Store values permanently.
  if (processor.ttl !== null && processor.ttl < 1) {
    expire = getTime() - 1;
  }
  values.forEach(value => {
    window.convivialProfiler._setValue('store', processor.storage_key, {
      value: value,
      expire: expire,
    });
  });
};
function temp(profiler, processor, values) {
  // Store values temporarily.
  values.forEach(value => {
    window.convivialProfiler._setValue('temp', processor.storage_key, {value: value});
  });
};
export {
  accumulation,
  dimension,
  extreme_geoip,
  language_full,
  language_simple,
  map,
  pageview,
  searchquery,
  store,
  temp
}