/**
 * @file
 * Convivial Profiler library publisher plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
	window.convivialProfiler = window.convivialProfiler || {};
	window.convivialProfiler.processorPublisher = window.convivialProfiler.processorPublisher || {};
	window.convivialProfiler.processorPublisher.threshold = function (publisher, values) {
		// If the value is greater than the threshold number, then publish it.
		if (values[0] > publisher.threshold_number) {
			// Store the value in localstorage if its applicable.
			if (publisher.storage.localstorage === 'localstorage') {
				localStorage.setItem(publisher.storage_key, publisher.storage_value);
			}
			// Store the value in cookie if its applicable.
			if (publisher.storage.cookie === 'cookie') {
				var expires = new Date(Date.now() + 1 * 864e5).toUTCString();
				document.cookie = publisher.storage_key + '=' + encodeURIComponent(publisher.storage_value) + ';path=/;expires=' + expires;
			}
		}
	}
})(window, localStorage);
