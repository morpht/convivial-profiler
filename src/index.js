/**
 * @file
 * Convivial Profiler library.
 *
 * Copyright Morpht Pty Ltd 2020-2022.
 */

import accumulation from './processor_handler/accumulation';
import data_layer from './processor_handler/datalayer_event';
import dimension from './processor_handler/dimension';
import extreme_geoip from './processor_handler/extreme_geoip';
import store from './processor_handler/store';
import copy from './processor_publisher/copy';
import range from './processor_publisher/range';
import remove from './processor_publisher/remove';
import season from './processor_publisher/season';
import set from './processor_publisher/set';
import threshold from './processor_publisher/threshold';
import top from './processor_publisher/top';
import unset from './processor_publisher/unset';
import acceptlangfull from './processor_source/acceptlangfull';
import acceptlangsimple from './processor_source/acceptlangsimple';
import cookie from './processor_source/cookie';
import get from './processor_source/get';
import meta from './processor_source/meta';
import query from './processor_source/query';
import time from './processor_source/time';
import useragent from './processor_source/useragent';

 class ConvivialProfiler {

    constructor(config, siteId, licenseKey, clientId) {
      this.version = 1;
      this.config = config;
      this.siteId = siteId;
      this.licenseKey = licenseKey;
      this.clientId = clientId || this.getClientId();
      this.storage = this._loadStorage();

      window.convivialProfiler = window.convivialProfiler || {};
      this.processorSource = window.convivialProfiler.processorSource || {};
      this.processorHandler = window.convivialProfiler.processorHandler || {};
      this.processorPublisher = window.convivialProfiler.processorPublisher || {};

      if (this._getConfig('trackers.pageview') !== undefined) {
        this.track('pageview', window.location.href);
      }
    }

    getClientId() {
      var value = this._getCookie('ConvivialProfilerClientId');
      if (value === null) {
        // @deprecated For backward compatibility, rename Basil cookie if found.
        value = this._getCookie('BasilClientId');
        if (value !== null) {
          this._setCookie('ConvivialProfilerClientId', value, 365);
          this._setCookie('BasilClientId', '', 0);
          return value;
        }
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
      this._logValue(event, subject);
      // Process attached publishers.
      var publishers = this._getConfig('trackers.' + event + '.publishers');
      if (publishers !== undefined) {
        this._publish(publishers);
      }
    }

    collect() {
      var now = this._getTime();
      Object.keys(this.config.processors).forEach(name => {
        var processor = this.config.processors[name];
        // Skip not expired deferred processors.
        if (processor.deferred) {
          var current = this._getValue('fetchers.' + name);
          if (current !== undefined && current.expire > now) {
            return;
          }
        }
        // Extract values from all sources.
        var values = [];
        processor.sources.forEach(source => {
          if (this.processorSource[source.type] !== undefined) {
            this.processorSource[source.type](processor, source, values);
          }
          else {
            console.debug('Invalid processor source type "' + source.type + '".');
          }
        });
        // Process attached handlers and publishers.
        this._processValues(processor, values);
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

    render() {
      var render = this._getConfig('render');
      if (render !== undefined) {
        var element = document.querySelector(render.selector);
        if (element) {
          element.innerHTML = render.privacy;
        }
      }
    }

    _processValues(processor, values) {
      // Process attached handlers.
      processor.handlers.forEach(handler => {
        if (this.processorHandler[handler.type] !== undefined) {
          this.processorHandler[handler.type](processor, handler, values);
        }
        else {
          console.debug('Invalid processor handler type "' + handler.type + '".');
        }
      });
      // Process attached publishers.
      if (processor.publishers) {
        this._publish(processor.publishers);
      }
    }

    _publish(publishers) {
      publishers.forEach(name => {
        var publisher = this._getConfig('publishers.' + name);
        if (publisher === undefined) {
          return;
        }
        var values = [];
        publisher.key = name;
        publisher.paths.forEach(path => {
          var value = this._getValue(path);
          if (value !== undefined) {
            values.push(value);
          }
        });
        if (values.length) {
          if (this.processorPublisher[publisher.type] !== undefined) {
            this.processorPublisher[publisher.type](publisher, values);
          }
          else {
            console.debug('Invalid processor publisher type "' + publisher.type + '".');
          }
        }
        else if (publisher.remove_empty) {
          localStorage.removeItem(publisher.key);
        }
      });
    }

    _loadStorage() {
      var storage = JSON.parse(localStorage.getItem('convivial_profiler')) || {};
      // @deprecated For backward compatibility, rename Basil storage if found.
      if (!Object.keys(storage).length) {
        var basil = localStorage.getItem('basil');
        if (basil !== null) {
          storage = JSON.parse(basil) || {};
          localStorage.setItem('convivial_profiler', basil);
          localStorage.removeItem('basil');
        }
      }
      // @deprecated For backward compatibility, rename currents storage if found.
      if (Object.keys(storage).length > 0 && storage[this.siteId] !== null && storage[this.siteId].currents !== null) {
        storage[this.siteId].store = storage[this.siteId].currents;
        delete storage[this.siteId].currents;
        localStorage.setItem('convivial_profiler', JSON.stringify(storage));
      }
      // Clear all stored values if client ID was changed.
      if (this._getConfig('prepare.client_cleanup') === true
          && storage._clientId !== this.clientId
      ) {
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

    _logValue(type, value, time) {
      this.storage.log = this.storage.log || {};
      this.storage.log[type] = this.storage.log[type] || [];
      this.storage.log[type].push([value, time || this._getTime()]);
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
