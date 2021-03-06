/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.officehours = function (profiler, destination, values) {
    var today = new Date();
    var timezoneOffset = destination.daylight_saving_offset;
    // Check if its normal days
    if (today.getTime() >= Date.parse(destination.normal_start) && today.getTime() <= Date.parse(destination.normal_end) ) {
      timezoneOffset = destination.normal_offset;
    }
    var currentUTCDate = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      today.getUTCHours(),
      today.getUTCMinutes(),
      today.getUTCSeconds(),
      today.getUTCMilliseconds()
    );
    // 1000 millseconds = 1 second and 1 hour = 3600  seconds
    var currentOfficeTime = currentUTCDate.getTime() + 3600000*timezoneOffset;
    var currentOfficeDate = new Date(currentOfficeTime);
    var office_open = 0;
    // Current time should be in between office start and closing time.
    if (currentOfficeDate.getHours() >= parseInt(destination.office_start) && currentOfficeDate.getHours() <= parseInt(destination.office_close)) {
      office_open = 1;
    }
    // Store the data in localstorage if its applicable.
    if (destination.target_location.localstorage === 'localstorage') {
      localStorage.setItem(destination.target_key, office_open);
    }
    // Store the data in cookie if its applicable.
    if (destination.target_location.cookie === 'cookie') {
      window.convivialProfiler._setCookie(destination.target_key, office_open);
    }
  }
})(window, localStorage);
