/**
 * @file
 * Convivial Profiler library destination plugins.
 */

import { getCookie, setCookie } from "../lib/utility"

function bestpick(profiler, destination, values) {
  var storage_values = [];
  destination.storage_keys.forEach(storage_key => {
    var value = localStorage.getItem(storage_key);
    if (value !== undefined) {
      storage_values.push(value);
    }
  });
  // Remove empty and null values and add default value.
  storage_values = storage_values.filter(el => {return el != null && el != '';});
  if (Array.isArray(storage_values) && storage_values.length === 0 && destination.default_value && destination.default_value !== undefined) {
    storage_values.push(destination.default_value);
  }
  if (storage_values.length) {
    // Store the data in localstorage if its applicable.
    if (destination.target_location.localstorage === 'localstorage' && storage_values[0]) {
      localStorage.setItem(destination.target_key, storage_values[0]);
    }
    // Store the data in cookie if its applicable.
    if (destination.target_location.cookie === 'cookie' && storage_values[0]) {
      setCookie(destination.target_key, storage_values[0]);
    }
  }
  else if (destination.remove_empty && !storage_values.length) {
    localStorage.removeItem(destination.target_key);
  }
};
function copy(profiler, destination, values) {
  var storage_value = window.convivialProfiler._getValue(destination.storage_key);
  if (storage_value) {
    if (destination.stringify !== undefined && destination.stringify) {
      storage_value = JSON.stringify(storage_value);
    }
    // Store the data in localstorage if its applicable.
    if (destination.target_location.localstorage === 'localstorage') {
      localStorage.setItem(destination.target_key, storage_value);
    }
    // Store the data in cookie if its applicable.
    if (destination.target_location.cookie === 'cookie') {
      setCookie(destination.target_key, storage_value);
    }
  }
  else if (destination.remove_empty && !storage_value) {
    localStorage.removeItem(destination.target_key);
  }
};
function datalayer_event(profiler, destination, values) {
  values.forEach(value => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'convivialProfiler.event',
      category: destination.category,
      action: destination.action,
      label: value,
      value: destination.normalize ? 1 / values.length : 1,
    });
  });
};
function flag(profiler, destination, values) {
  var storage_value = window.convivialProfiler._getValue(destination.storage_key);
  if (storage_value) {
    var flag_value = storage_value;
    if (destination.flag_prefix) {
      flag_value = destination.flag_prefix + flag_value;
    }
    if (destination.flag_suffix) {
      flag_value = flag_value + destination.flag_suffix;
    }
    // Store the data in localstorage if its applicable.
    if (destination.target_location.localstorage === 'localstorage') {
      localStorage.setItem(flag_value, flag_value);
    }
    // Store the data in cookie if its applicable.
    if (destination.target_location.cookie === 'cookie') {
      setCookie(flag_value, flag_value);
    }
  }
};
function formfiller(profiler, destination, values) {
  var form_selector = 'form' + destination.form_selector;
  var form = document.querySelector(form_selector);
  // Process further if the form exist on the page.
  if (form !== null) {
    // Process the fields.
    destination.fields_selector.forEach(field_selector => {
      var form_field_name = field_selector.split("|")[0];
      var storage_field_name = field_selector.split("|")[1];
      // Process further if the form field element exists in the page.
      if (form.querySelector('input[name="'+ form_field_name +'"]') !== null && storage_field_name !== null) {
        // fetch the data from localstorage if its applicable.
        if (destination.storage_source.localstorage === 'localstorage') {
          form.querySelector('input[name="'+ form_field_name +'"]').value = localStorage.getItem(storage_field_name);
        }
        // fetch the data from cookie if its applicable.
        if (destination.storage_source.cookie === 'cookie') {
          form.querySelector('input[name="'+ form_field_name +'"]').value = getCookie(storage_field_name);
        }
      }
    });
  }
};
function formtracker(profiler, destination, values) {
  var form_selector = 'form' + destination.form_selector;
  var form = document.querySelector(form_selector);
  // Process further if the form exist on the page.
  if (form !== null) {
    if (form.addEventListener) {
      form.addEventListener("submit", formtrackercallback, false);
    } else if(form.attachEvent) {
      form.attachEvent('onsubmit', formtrackercallback);
    }
  }
  function formtrackercallback(event) {
    var field_selector = 'form' + destination.form_selector + ' input[name="'+ destination.field_name +'"]';
    var event_label = document.querySelector(field_selector).value;
    if (document.querySelector(field_selector).type === 'radio' || document.querySelector(field_selector).type === 'checkbox') {
      if (document.querySelector(field_selector + ':checked') != null) {
        event_label = document.querySelector(field_selector + ':checked').value;
      }
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'convivialProfiler.event',
      category: destination.event_category,
      action: destination.event_action,
      label: event_label,
      value: 1,
    });
  }
};
function officehours(profiler, destination, values) {
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
  var currentOfficeDay = currentOfficeDate.getDay();
  var office_open = 0;
  // Current time should be in between start and closing time of the current day.
  if (destination.office_times) {
    var currentOfficeTimes = destination.office_times.filter(i => currentOfficeDay === i.day);
    if (currentOfficeTimes && currentOfficeTimes.length > 0) {
      currentOfficeTimes.forEach(currentOfficeTime => {
        if (currentOfficeDate.getHours() >= parseInt(currentOfficeTime.start) && currentOfficeDate.getHours() <= parseInt(currentOfficeTime.close)) {
          office_open = 1;
        }
        else {
          office_open = 0;
        }
      });
    }
  }
  // Store the data in localstorage if its applicable.
  if (destination.target_location.localstorage === 'localstorage') {
    localStorage.setItem(destination.target_key, office_open);
  }
  // Store the data in cookie if its applicable.
  if (destination.target_location.cookie === 'cookie') {
    setCookie(destination.target_key, office_open);
  }
};
function range(profiler, destination, values) {
  var storage_value = window.convivialProfiler._getValue(destination.storage_key);
  if (storage_value) {
    destination.ranges.forEach(range => {
      if (storage_value >= range.min && storage_value < range.max) {
        // Store the data in localstorage if its applicable.
        if (destination.target_location.localstorage === 'localstorage') {
          localStorage.setItem(destination.target_key, range.key);
        }
        // Store the data in cookie if its applicable.
        if (destination.target_location.cookie === 'cookie') {
          setCookie(destination.target_key, range.key);
        }
      }
    });
  }
  else if (destination.remove_empty && !storage_value) {
    localStorage.removeItem(destination.target_key);
  }
};
function remove(profiler, destination, values) {
  var storage_values = [];
  destination.storage_keys.forEach(storage_key => {
    var value = window.convivialProfiler._getValue(storage_key);
    if (value !== undefined) {
      storage_values.push(value);
    }
  });
  if (storage_values.length) {
    // Remove empty and null values.
    storage_values = storage_values.filter(el => {return el != null && el != '';});
    // Process the static values.
    if (Array.isArray(storage_values) && destination.static_values && destination.static_values !== undefined) {
      destination.static_values.forEach(static_value => {
        if (static_value !== undefined) {
          storage_values.push(static_value);
        }
      });
    }
    storage_values.forEach(storage_value => {
      // Remove the data from localstorage if its applicable.
      if (destination.target_location.localstorage === 'localstorage') {
        localStorage.removeItem(storage_value);
      }
      // Remove the data from cookie if its applicable.
      if (destination.target_location.cookie === 'cookie') {
        setCookie(storage_value, '', 0);
      }
    });
  }
};
function season(profiler, destination, values) {
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
      setCookie(destination.target_key, seasons[month]);
    }
  }
  else if (destination.remove_empty && !storage_value) {
    localStorage.removeItem(destination.target_key);
  }
};
function set(profiler, destination, values) {
  var storage_value = window.convivialProfiler._getValue(destination.storage_key);
  if (storage_value) {
    // Store the data in localstorage if its applicable.
    if (destination.target_location.localstorage === 'localstorage') {
      localStorage.setItem(storage_value, '1');
    }
    // Store the data in cookie if its applicable.
    if (destination.target_location.cookie === 'cookie') {
      setCookie(storage_value, '1');
    }
  }
};
function threshold(profiler, destination, values) {
  var storage_value = window.convivialProfiler._getValue(destination.storage_key);
  if (storage_value) {
    // If the value is greater than the threshold number, then publish it.
    if (storage_value >= destination.threshold_number) {
      // Store the data in localstorage if its applicable.
      if (destination.target_location.localstorage === 'localstorage') {
        localStorage.setItem(destination.target_key, destination.target_value);
      }
      // Store the data in cookie if its applicable.
      if (destination.target_location.cookie === 'cookie') {
        setCookie(destination.target_key, destination.target_value);
      }
    }
  }
};
function top(profiler, destination, values) {
  var dimension_value = window.convivialProfiler._getValue(destination.dimension_key);
  if (dimension_value) {
    var topKey = null;
    var topValue = null;
    for (var key in dimension_value) {
      if (topValue === null || dimension_value[key] > topValue) {
        topKey = key;
        topValue = dimension_value[key];
      }
    }
    // Store the data in localstorage if its applicable.
    if (destination.target_location.localstorage === 'localstorage') {
      localStorage.setItem(destination.target_key, topKey);
    }
    // Store the data in cookie if its applicable.
    if (destination.target_location.cookie === 'cookie') {
      setCookie(destination.target_key, topKey);
    }
  }
  else if (destination.remove_empty && !dimension_value) {
    localStorage.removeItem(destination.target_key);
  }
};
function tops(profiler, destination, values) {
  var dimension_value = window.convivialProfiler._getValue(destination.dimension_key);
  if (dimension_value) {
    var tops = Object.entries(dimension_value)
      .sort((a, b) => b[1] - a[1])
      .slice(0, destination.length);
    tops = tops.map(entry => entry[0]);
  }
  else if (destination.default_value && !dimension_value) {
    var default_value = destination.default_value;
    var tops = default_value.split(",").map(item => item.trim());
  }
  if (destination.stringify !== undefined && destination.stringify) {
    tops = JSON.stringify(tops);
  }
  // Store the data in localstorage if its applicable.
  if (destination.target_location.localstorage === 'localstorage') {
    localStorage.setItem(destination.target_key, tops);
  }
  // Store the data in cookie if its applicable.
  if (destination.target_location.cookie === 'cookie') {
    setCookie(destination.target_key, tops);
  }
};
function unset(profiler, destination, values) {
  var storage_value = window.convivialProfiler._getValue(destination.storage_key);
  if (storage_value) {
    // Unset the data in localstorage if its applicable.
    if (destination.target_location.localstorage === 'localstorage') {
      localStorage.setItem(storage_value, '0');
    }
    // Unset the data in cookie if its applicable.
    if (destination.target_location.cookie === 'cookie') {
      setCookie(storage_value, '0');
    }
  }
};
export {
  bestpick,
  copy,
  datalayer_event,
  flag,
  formfiller,
  formtracker,
  officehours,
  range,
  remove,
  season,
  set,
  threshold,
  top,
  tops,
  unset
}
