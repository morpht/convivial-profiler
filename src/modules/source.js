/**
 * @file
 * Convivial Profiler library source plugins.
 */

import { getCookie } from "../lib/utility"

function acceptlang(profiler, source, values) {
  if (navigator.language !== null && navigator.language.includes("-")) {
    values.push(navigator.language);
  }
  else {
    values.push("en-AU");
  }
};
function cookie(profiler, source, values) {
  var value = getCookie(source.name);
  if (value !== null) {
    values.push(value);
  }
};
function get(profiler, source, values) {
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
};
function httpuseragent(profiler, source, values) {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    values.push("mobile");
  }
  else {
    values.push("desktop");
  }
};
function meta(profiler, source, values) {
  var elements = document.querySelectorAll('meta[name="' + source.attribute_name + '"]');
  for (var element of elements) {
    values.push(element.getAttribute('content'));
  }
};
function query(profiler, source, values) {
  window.location.search.substring(1).split('&').forEach(param => {
    var parts = param.split('=');
    if (parts[0] === source.param || parts[0] === source.param + '[]') {
      var value = decodeURIComponent(parts[1].replace(/\+/g, ' '));
      values.push(parts[1] === undefined ? true : value);
    }
  });
};
function time(profiler, source, values) {
  if (source.part === 'hour') {
    values.push(new Date().getHours());
  }
  else if (source.part === 'minute') {
    values.push(new Date().getMinutes());
  }
  else if (source.part === 'second') {
    values.push(new Date().getSeconds());
  }
};
export {
  acceptlang,
  cookie,
  get,
  httpuseragent,
  meta,
  query,
  time
}