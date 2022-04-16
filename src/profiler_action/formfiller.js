/**
 * @file
 * Convivial Profiler library action plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerAction = window.convivialProfiler.profilerAction || {};
  window.convivialProfiler.profilerAction.formfiller = function (profiler, action, sourceValues, values) {
    var form_selector = 'form' + action.form_selector;
    var form = document.querySelector(form_selector);
    // Process further if the form exist on the page.
    if (form !== null) {
      // Process the fields.
      action.fields_selector.forEach(field_selector => {
        var form_field_name = field_selector.split("|")[0];
        var storage_field_name = field_selector.split("|")[1];
        // Process further if the form field element exists in the page.
        if (form.querySelector('input[name="'+ form_field_name +'"]') !== null && storage_field_name !== null) {
          // fetch the value from localstorage if its applicable.
          if (action.storage.localstorage === 'localstorage') {
            form.querySelector('input[name="'+ form_field_name +'"]').value = localStorage.getItem(storage_field_name);
          }
          // fetch the value from cookie if its applicable.
          if (action.storage.cookie === 'cookie') {
            form.querySelector('input[name="'+ form_field_name +'"]').value = window.convivialProfiler._getCookie(storage_field_name);
          }
        }
      });
    }
  }
})(window, localStorage);
