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
export {
  getTime,
  getCookie,
  setCookie
}
