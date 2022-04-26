/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

 (function (window, localStorage) {
  window.convivialProfiler = window.convivialProfiler || {};
  window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
  window.convivialProfiler.profilerDestination.formtracker = function (profiler, destination, values) {
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
  }
})(window, localStorage);
  