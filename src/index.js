/**
 * @file
 * Convivial Profiler library.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

import accumulation from './profiler_processor/accumulation';
import dimension from './profiler_processor/dimension';
import extreme_geoip from './profiler_processor/extreme_geoip';
import language_simple from './profiler_processor/language_simple';
import language_full from './profiler_processor/language_full';
import map from './profiler_processor/map';
import pageview from './profiler_processor/pageview';
import searchquery from './profiler_processor/searchquery';
import store from './profiler_processor/store';
import temp from './profiler_processor/temp';
import bestpick from './profiler_destination/bestpick';
import copy from './profiler_destination/copy';
import datalayer_event from './profiler_destination/datalayer_event';
import formfiller from './profiler_destination/formfiller';
import formtracker from './profiler_destination/formtracker';
import officehours from './profiler_destination/officehours';
import range from './profiler_destination/range';
import remove from './profiler_destination/remove';
import season from './profiler_destination/season';
import set from './profiler_destination/set';
import threshold from './profiler_destination/threshold';
import top from './profiler_destination/top';
import unset from './profiler_destination/unset';
import acceptlang from './profiler_source/acceptlang';
import cookie from './profiler_source/cookie';
import get from './profiler_source/get';
import meta from './profiler_source/meta';
import query from './profiler_source/query';
import time from './profiler_source/time';
import httpuseragent from './profiler_source/httpuseragent';

 class ConvivialProfiler {

    constructor(config, siteId, licenseKey, clientId) {
      this.version = 1;
      this.config = config;
      this.siteId = siteId;
      this.licenseKey = licenseKey;
      this.clientId = clientId || this.getClientId();
      this.storage = this._loadStorage();
      this.storage.temp = {};

      window.convivialProfiler = window.convivialProfiler || {};
      this.profilerSource = window.convivialProfiler.profilerSource || {};
      this.profilerProcessor = window.convivialProfiler.profilerProcessor || {};
      this.profilerDestination = window.convivialProfiler.profilerDestination || {};
    }

    getClientId() {
      var value = this._getCookie('ConvivialProfilerClientId');
      if (value === null) {
        var arr = new Uint8Array(10);
        (window.crypto || window.msCrypto).getRandomValues(arr);
        value = '';
        for (var i = 0; i < arr.length; i++) {
          value += ('0' + arr[i].toString(16)).substr(-2);
        }
        this._setCookie('ConvivialProfilerClientId', value, 365);
      }
      return value;
    }

    track(event, subject) {
      this._increaseValue('counters', event);
      this._logValue(event, [subject, this._getTime()]);
    }

    collect() {
      var now = this._getTime();
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

      // Clear expired values.
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

    _logValue(type, value, size) {
      this.storage.log = this.storage.log || {};
      this.storage.log[type] = this.storage.log[type] || [];
      if (size !== undefined && this.storage.log[type].length == size) {
        this.storage.log[type].shift();
      }
      this.storage.log[type].push(value);
      this._saveStorage();
    }

    _getTime() {
      return Math.round(new Date().getTime() / 1000);
    }

    _getCookie(name) {
      var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? decodeURIComponent(v[2]) : null;
    }

    _setCookie(name, value, days) {
      var expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + expires;
    }
}
export default ConvivialProfiler;
