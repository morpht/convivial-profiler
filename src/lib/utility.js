/**
 * @file
 * Convivial Profiler library utility functions.
 */
function getTime() {
  return Math.round(new Date().getTime() / 1000);
};
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? decodeURIComponent(v[2]) : null;
};
function setCookie(name, value, days) {
  var expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + expires;
};
function getClientId() {
  var value = getCookie('ConvivialProfilerClientId');
  if (value === null) {
    var arr = new Uint8Array(10);
    (window.crypto || window.msCrypto).getRandomValues(arr);
    value = '';
    for (var i = 0; i < arr.length; i++) {
      value += ('0' + arr[i].toString(16)).slice(-2);
    }
    setCookie('ConvivialProfilerClientId', value, 365);
  }
  return value;
};
export {
  getTime,
  getCookie,
  setCookie,
  getClientId
}
