/**
 * @file
 * Convivial Profiler library.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

import { accumulation, dimension, extreme_geoip, language_simple, language_full, logger, map, pageview, searchquery, store, unstore_value, temp } from "./modules/processor"
import { bestpick, copy, datalayer_event, flag, formfiller, formtracker, officehours, range, remove, season, set, threshold, top, tops, unset } from "./modules/destination"
import { acceptlang, cookie, get, meta, query, time, httpuseragent } from "./modules/source"
import { getTime, getClientId, isLocalStorageAvailable } from "./lib/utility"

class ConvivialProfiler {

  constructor(config, siteId, licenseKey, clientId, cookieconsent = true) {
    this.version = 1;
    this.config = config;
    this.siteId = siteId;
    this.licenseKey = licenseKey;
    this.clientId = clientId || getClientId(cookieconsent);
    if (!isLocalStorageAvailable()) {
      return;
    }
    this.storage = this._loadStorage();
    this.storage.temp = {};

    window.convivialProfiler = window.convivialProfiler || {};
    // Load all source plugins.
    this.profilerSource = {};
    this.profilerSource.acceptlang = acceptlang;
    this.profilerSource.cookie = cookie;
    this.profilerSource.get = get;
    this.profilerSource.meta = meta;
    this.profilerSource.query = query;
    this.profilerSource.time = time;
    this.profilerSource.httpuseragent = httpuseragent;
    // Load all processor plugins.
    this.profilerProcessor = {};
    this.profilerProcessor.accumulation = accumulation;
    this.profilerProcessor.dimension = dimension;
    this.profilerProcessor.extreme_geoip = extreme_geoip;
    this.profilerProcessor.language_simple = language_simple;
    this.profilerProcessor.language_full = language_full;
    this.profilerProcessor.logger = logger;
    this.profilerProcessor.map = map;
    this.profilerProcessor.pageview = pageview;
    this.profilerProcessor.searchquery = searchquery;
    this.profilerProcessor.store = store;
    this.profilerProcessor.unstore_value = unstore_value;
    this.profilerProcessor.temp = temp;
    // Load all destination plugins.
    this.profilerDestination = {};
    this.profilerDestination.bestpick = bestpick;
    this.profilerDestination.copy = copy;
    this.profilerDestination.datalayer_event = datalayer_event;
    this.profilerDestination.flag = flag;
    this.profilerDestination.formfiller = formfiller;
    this.profilerDestination.formtracker = formtracker;
    this.profilerDestination.officehours = officehours;
    this.profilerDestination.range = range;
    this.profilerDestination.remove = remove;
    this.profilerDestination.season = season;
    this.profilerDestination.set = set;
    this.profilerDestination.threshold = threshold;
    this.profilerDestination.top = top;
    this.profilerDestination.tops = tops;
    this.profilerDestination.unset = unset;
  }

  collect() {
    if (!isLocalStorageAvailable()) {
      return;
    }
    var now = getTime();
    Object.keys(this.config.profilers).forEach(name => {
      var profiler = this.config.profilers[name];
      // Skip not expired deferred profilers.
      if (profiler.deferred) {
        var current = this._getValue('fetchers.' + name);
        if (current !== undefined && current.expire > now) {
          return;
        }
      }
      // Extract values from all sources.
      var values = [];
      profiler.sources.forEach(source => {
        if (this.profilerSource[source.type] !== undefined) {
          this.profilerSource[source.type](profiler, source, values);
        }
        else {
          console.debug('Invalid profiler source type "' + source.type + '".');
        }
      });
      // Call all attached processors.
      this._processValues(profiler, values);
      // Call all attached destinations.
      profiler.destinations.forEach(destination => {
        if (this.profilerDestination[destination.type] !== undefined) {
          this.profilerDestination[destination.type](profiler, destination, values);
        }
        else {
          console.debug('Invalid profiler destination type "' + destination.type + '".');
        }
      });
    });

    // Clear expired values from store.
    if (this._getValue('store') !== undefined) {
      for (var key in this.storage.store) {
        if (this.storage.store.hasOwnProperty(key)
            && this.storage.store[key].expire < now
        ) {
          delete this.storage.store[key];
        }
      }
      this._saveStorage();
    }
  }

  _processValues(profiler, values) {
    // Process attached processors.
    profiler.processors.forEach(processor => {
      if (this.profilerProcessor[processor.type] !== undefined) {
        this.profilerProcessor[processor.type](profiler, processor, values);
      }
      else {
        console.debug('Invalid profiler processor type "' + processor.type + '".');
      }
    });
  }

  _loadStorage() {
    var storage = JSON.parse(localStorage.getItem('convivial_profiler')) || {};
    // Clear all stored values if client ID was changed.
    if (this._getConfig('client_cleanup') === true && storage._clientId !== this.clientId) {
      localStorage.removeItem('convivial_profiler');
      return {};
    }
    return storage[this.siteId] || {};
  }

  _saveStorage() {
    var storage = JSON.parse(localStorage.getItem('convivial_profiler')) || {};
    storage._clientId = this.clientId;
    storage._version = this.version;
    storage._licenseKey = this.licenseKey;
    storage[this.siteId] = this.storage;
    localStorage.setItem('convivial_profiler', JSON.stringify(storage));
  }

  _getValue(path, source) {
    source = source || this.storage;
    var properties = Array.isArray(path) ? path : path.split('.');
    return properties.reduce((prev, curr) => prev && prev[curr], source);
  }

  _deleteValue(type, key) {
    this.storage[type] = this.storage[type] || {};
    delete this.storage[type][key];
    this._saveStorage();
  }

  _getConfig(path) {
    return this._getValue(path, this.config);
  }

  _setValue(type, key, value) {
    this.storage[type] = this.storage[type] || {};
    this.storage[type][key] = value;
    this._saveStorage();
  }

  _increaseValue(type, key, increment) {
    this.storage[type] = this.storage[type] || {};
    this.storage[type][key] = this.storage[type][key] || 0;
    this.storage[type][key] += parseFloat(increment) || 1;
    this._saveStorage();
  }

  _increaseSubValue(type, key, subKey, increment) {
    this.storage[type] = this.storage[type] || {};
    this.storage[type][key] = this.storage[type][key] || {};
    this.storage[type][key][subKey] = this.storage[type][key][subKey] || 0;
    this.storage[type][key][subKey] += parseFloat(increment) || 1;
    this._saveStorage();
  }

  _logValue(type, value, size, unique = false) {
    this.storage.log = this.storage.log || {};
    this.storage.log[type] = this.storage.log[type] || {};
    if (size !== undefined && Object.keys(this.storage.log[type]).length == size) {
      // Sort the object of objects by timestamp.
      // Convert the object to an array of [key, value] pairs.
      var entries = Object.entries(this.storage.log[type]);
      // Sort the array based on the values (timestamps).
      entries.sort((a, b) => a[1] - b[1]);
      entries.shift();
      // Convert the sorted array back into an object.
      this.storage.log[type] = Object.fromEntries(entries);
    }
    this.storage.log[type][value] = this.storage.log[type][value] || {};
    this.storage.log[type][value] = getTime();
    this._saveStorage();
  }

}
export default ConvivialProfiler;
