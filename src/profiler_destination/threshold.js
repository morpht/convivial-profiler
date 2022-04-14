/**
 * @file
 * Convivial Profiler library destination plugin.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

(function (window, localStorage) {
	window.convivialProfiler = window.convivialProfiler || {};
	window.convivialProfiler.profilerDestination = window.convivialProfiler.profilerDestination || {};
	window.convivialProfiler.profilerDestination.threshold = function (profiler, destination, sourceValues, values) {
		// If the value is greater than the threshold number, then publish it.
		if (values[0] >= destination.threshold_number) {
			// Store the value in localstorage if its applicable.
			if (destination.storage.localstorage === 'localstorage') {
				localStorage.setItem(destination.storage_key, destination.storage_value);
			}
			// Store the value in cookie if its applicable.
			if (destination.storage.cookie === 'cookie') {
				var expires = new Date(Date.now() + 1 * 864e5).toUTCString();
				document.cookie = destination.storage_key + '=' + encodeURIComponent(destination.storage_value) + ';path=/;expires=' + expires;
			}
		}
	}
})(window, localStorage);
