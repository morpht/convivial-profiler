!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ConvivialProfiler",[],t):"object"==typeof exports?exports.ConvivialProfiler=t():e.ConvivialProfiler=t()}(self,(function(){return function(){"use strict";var e={d:function(t,o){for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function o(){return Math.round((new Date).getTime()/1e3)}function r(e){var t=document.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return t?decodeURIComponent(t[2]):null}function i(e,t,o){var r=new Date(Date.now()+864e5*o).toUTCString();document.cookie=e+"="+encodeURIComponent(t)+";path=/;expires="+r}function a(e,t,o){o.forEach((function(e){window.convivialProfiler._increaseValue("accumulators",t.storage_key,e)}))}function n(e,t,o){o.forEach((function(e){t.normalize?window.convivialProfiler._increaseSubValue("dimensions",t.storage_key,e,1/o.length):window.convivialProfiler._increaseSubValue("dimensions",t.storage_key,e)}))}function l(e,t,r){r.forEach((function(e){window.convivialProfiler._setValue("fetchers",t.storage_key,{value:e,expire:o()+t.ttl})}))}function s(e,t,r){var i=o()+t.ttl;null!==t.ttl&&t.ttl>0&&(i=o()-1),r.forEach((function(e){window.convivialProfiler._setValue("store",t.storage_key,{value:e.toLowerCase(),expire:i})}))}function c(e,t,r){var i=o()+t.ttl;null!==t.ttl&&t.ttl>0&&(i=o()-1),r.forEach((function(e){window.convivialProfiler._setValue("store",t.storage_key,{value:e.split("-")[0].toLowerCase(),expire:i})}))}function u(e,t,r){if(r&&r.length>0&&r[0]&&t.mappings&&t.mappings.length>0){var i=t.mappings.filter((function(e){return e.includes(r[0]+"|")}));i&&i.length>0&&i[0]?window.convivialProfiler._setValue("store",t.storage_key,{value:i[0].replace(r[0]+"|",""),expire:o()}):window.convivialProfiler._setValue("store",t.storage_key,{value:t.fallback_value,expire:o()})}else window.convivialProfiler._setValue("store",t.storage_key,{value:t.default_value,expire:o()})}function f(e,t,r){!0===t.log&&window.convivialProfiler._logValue(t.storage_key,[window.location.href,o()]),!0===t.track&&window.convivialProfiler._increaseValue("counters",t.storage_key)}function g(e,t,o){if(window.location.pathname.includes(t.search_path)&&window.location.search.substring(1).length>0){var r=[],i="";if(window.location.search.substring(1).split("&").forEach((function(e){r.push(e.split("=")[0]),e.split("=")[0]===t.query_param&&(i=e.split("=")[1])})),r.includes(t.query_param)&&!r.includes(t.exclude_param)&&""!==i){var a=window.convivialProfiler._getValue("log."+t.storage_key)||[],n=i.split("+").join(" ");void 0===a.find((function(e){return e.title==n}))&&(!0===t.log&&window.convivialProfiler._logValue(t.storage_key,{title:n,url:window.location.href},t.size),!0===t.track&&window.convivialProfiler._increaseValue("counters",t.storage_key))}}}function v(e,t,r){var i=o()+t.ttl;null!==t.ttl&&-1===t.ttl&&(i=o()+31536e3),r.forEach((function(e){window.convivialProfiler._setValue("store",t.storage_key,{value:e,expire:i})}))}function p(e,t,o){o.forEach((function(e){e==window.convivialProfiler._getValue("store."+t.unstore_key+".value")&&(window.convivialProfiler._deleteValue("store",t.unstore_key),window.convivialProfiler._setValue("temp",t.storage_key,{value:t.storage_value}))}))}function h(e,t,o){o.forEach((function(e){window.convivialProfiler._setValue("temp",t.storage_key,{value:e})}))}function d(e,t,o){var r=[];t.storage_keys.forEach((function(e){var t=localStorage.getItem(e);void 0!==t&&r.push(t)})),r=r.filter((function(e){return null!=e&&""!=e})),Array.isArray(r)&&0===r.length&&t.default_value&&void 0!==t.default_value&&r.push(t.default_value),r.length?("localstorage"===t.target_location.localstorage&&r[0]&&localStorage.setItem(t.target_key,r[0]),"cookie"===t.target_location.cookie&&r[0]&&i(t.target_key,r[0])):t.remove_empty&&!r.length&&localStorage.removeItem(t.target_key)}function y(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r?(void 0!==t.stringify&&t.stringify&&(r=JSON.stringify(r)),"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,r),"cookie"===t.target_location.cookie&&i(t.target_key,r)):t.remove_empty&&!r&&localStorage.removeItem(t.target_key)}function _(e,t,o){o.forEach((function(e){window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"convivialProfiler.event",category:t.category,action:t.action,label:e,value:t.normalize?1/o.length:1})}))}function m(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);if(r){var a=r;t.flag_prefix&&(a=t.flag_prefix+a),t.flag_suffix&&(a+=t.flag_suffix),"localstorage"===t.target_location.localstorage&&localStorage.setItem(a,a),"cookie"===t.target_location.cookie&&i(a,a)}}function w(e,t,o){var i="form"+t.form_selector,a=document.querySelector(i);null!==a&&t.fields_selector.forEach((function(e){var o=e.split("|")[0],i=e.split("|")[1];null!==a.querySelector('input[name="'+o+'"]')&&null!==i&&("localstorage"===t.storage_source.localstorage&&(a.querySelector('input[name="'+o+'"]').value=localStorage.getItem(i)),"cookie"===t.storage_source.cookie&&(a.querySelector('input[name="'+o+'"]').value=r(i)))}))}function k(e,t,o){var r="form"+t.form_selector,i=document.querySelector(r);function a(e){var o="form"+t.form_selector+' input[name="'+t.field_name+'"]',r=document.querySelector(o).value;"radio"!==document.querySelector(o).type&&"checkbox"!==document.querySelector(o).type||null!=document.querySelector(o+":checked")&&(r=document.querySelector(o+":checked").value),window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"convivialProfiler.event",category:t.event_category,action:t.event_action,label:r,value:1})}null!==i&&(i.addEventListener?i.addEventListener("submit",a,!1):i.attachEvent&&i.attachEvent("onsubmit",a))}function S(e,t,o){var r=new Date,a=t.daylight_saving_offset;r.getTime()>=Date.parse(t.normal_start)&&r.getTime()<=Date.parse(t.normal_end)&&(a=t.normal_offset);var n=new Date(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds(),r.getUTCMilliseconds()).getTime()+36e5*a,l=new Date(n),s=l.getDay(),c=0;if(t.office_times){var u=t.office_times.filter((function(e){return s===e.day}));u&&u.length>0&&u.forEach((function(e){c=l.getHours()>=parseInt(e.start)&&l.getHours()<=parseInt(e.close)?1:0}))}"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,c),"cookie"===t.target_location.cookie&&i(t.target_key,c)}function b(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r?t.ranges.forEach((function(e){r>=e.min&&r<e.max&&("localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,e.key),"cookie"===t.target_location.cookie&&i(t.target_key,e.key))})):t.remove_empty&&!r&&localStorage.removeItem(t.target_key)}function P(e,t,o){var r=[];t.storage_keys.forEach((function(e){var t=window.convivialProfiler._getValue(e);void 0!==t&&r.push(t)})),r.length&&(r=r.filter((function(e){return null!=e&&""!=e})),Array.isArray(r)&&t.static_values&&void 0!==t.static_values&&t.static_values.forEach((function(e){void 0!==e&&r.push(e)})),r.forEach((function(e){"localstorage"===t.target_location.localstorage&&localStorage.removeItem(e),"cookie"===t.target_location.cookie&&i(e,"",0)})))}function I(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);if(r){var a=["winter","winter","spring","spring","spring","summer","summer","summer","autumn","autumn","autumn","winter"],n=r<0?6:0,l=((new Date).getMonth()+n)%12;"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,a[l]),"cookie"===t.target_location.cookie&&i(t.target_key,a[l])}else t.remove_empty&&!r&&localStorage.removeItem(t.target_key)}function V(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r&&("localstorage"===t.target_location.localstorage&&localStorage.setItem(r,"1"),"cookie"===t.target_location.cookie&&i(r,"1"))}function D(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);if(r&&r>=t.threshold_number&&("localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,t.target_value),"cookie"===t.target_location.cookie)){var i=new Date(Date.now()+864e5).toUTCString();document.cookie=t.target_key+"="+encodeURIComponent(t.target_value)+";path=/;expires="+i}}function E(e,t,o){var r=window.convivialProfiler._getValue(t.dimension_key);if(r){var a=null,n=null;for(var l in r)(null===n||r[l]>n)&&(a=l,n=r[l]);"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,a),"cookie"===t.target_location.cookie&&i(t.target_key,a)}else t.remove_empty&&!r&&localStorage.removeItem(t.target_key)}function C(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r&&("localstorage"===t.target_location.localstorage&&localStorage.setItem(r,"0"),"cookie"===t.target_location.cookie&&i(r,"0"))}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}function T(e,t,o){null!==navigator.language&&navigator.language.includes("-")?o.push(navigator.language):o.push("en-AU")}function A(e,t,o){var i=r(t.name);null!==i&&o.push(i)}function O(e,t,o){var r=new XMLHttpRequest;r.onload=function(){try{o.push(JSON.parse(r.response)),window.convivialProfiler._processValues(e,o)}catch(e){r.onerror()}},r.onerror=function(){console.debug('Unable to fetch values of "'+t.resource_url+'".')},r.open("GET",t.resource_url),r.send()}function U(e,t,o){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?o.push("mobile"):o.push("desktop")}function j(e,t,o){var r,i=function(e,t){var o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=function(e,t){if(e){if("string"==typeof e)return x(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?x(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){o&&(e=o);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,n=!0,l=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return n=e.done,e},e:function(e){l=!0,a=e},f:function(){try{n||null==o.return||o.return()}finally{if(l)throw a}}}}(document.querySelectorAll('meta[name="'+t.attribute_name+'"]'));try{for(i.s();!(r=i.n()).done;){var a=r.value;o.push(a.getAttribute("content"))}}catch(e){i.e(e)}finally{i.f()}}function q(e,t,o){window.location.search.substring(1).split("&").forEach((function(e){var r=e.split("=");if(r[0]===t.param||r[0]===t.param+"[]"){var i=decodeURIComponent(r[1].replace(/\+/g," "));o.push(void 0===r[1]||i)}}))}function M(e,t,o){"hour"===t.part?o.push((new Date).getHours()):"minute"===t.part?o.push((new Date).getMinutes()):"second"===t.part&&o.push((new Date).getSeconds())}function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function R(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==L(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,"string");if("object"!==L(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===L(i)?i:String(i)),r)}var i}e.r(t),e.d(t,{default:function(){return H}});var H=function(){function e(t,o,x,L){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.version=1,this.config=t,this.siteId=o,this.licenseKey=x,this.clientId=L||function(){var e=r("ConvivialProfilerClientId");if(null===e){var t=new Uint8Array(10);(window.crypto||window.msCrypto).getRandomValues(t),e="";for(var o=0;o<t.length;o++)e+=("0"+t[o].toString(16)).slice(-2);i("ConvivialProfilerClientId",e,365)}return e}(),this.storage=this._loadStorage(),this.storage.temp={},window.convivialProfiler=window.convivialProfiler||{},this.profilerSource={},this.profilerSource.acceptlang=T,this.profilerSource.cookie=A,this.profilerSource.get=O,this.profilerSource.meta=j,this.profilerSource.query=q,this.profilerSource.time=M,this.profilerSource.httpuseragent=U,this.profilerProcessor={},this.profilerProcessor.accumulation=a,this.profilerProcessor.dimension=n,this.profilerProcessor.extreme_geoip=l,this.profilerProcessor.language_simple=c,this.profilerProcessor.language_full=s,this.profilerProcessor.map=u,this.profilerProcessor.pageview=f,this.profilerProcessor.searchquery=g,this.profilerProcessor.store=v,this.profilerProcessor.unstore_value=p,this.profilerProcessor.temp=h,this.profilerDestination={},this.profilerDestination.bestpick=d,this.profilerDestination.copy=y,this.profilerDestination.datalayer_event=_,this.profilerDestination.flag=m,this.profilerDestination.formfiller=w,this.profilerDestination.formtracker=k,this.profilerDestination.officehours=S,this.profilerDestination.range=b,this.profilerDestination.remove=P,this.profilerDestination.season=I,this.profilerDestination.set=V,this.profilerDestination.threshold=D,this.profilerDestination.top=E,this.profilerDestination.unset=C}var t,x;return t=e,(x=[{key:"collect",value:function(){var e=this,t=o();if(Object.keys(this.config.profilers).forEach((function(o){var r=e.config.profilers[o];if(r.deferred){var i=e._getValue("fetchers."+o);if(void 0!==i&&i.expire>t)return}var a=[];r.sources.forEach((function(t){void 0!==e.profilerSource[t.type]?e.profilerSource[t.type](r,t,a):console.debug('Invalid profiler source type "'+t.type+'".')})),e._processValues(r,a),r.destinations.forEach((function(t){void 0!==e.profilerDestination[t.type]?e.profilerDestination[t.type](r,t,a):console.debug('Invalid profiler destination type "'+t.type+'".')}))})),void 0!==this._getValue("store")){for(var r in this.storage.store)this.storage.store.hasOwnProperty(r)&&this.storage.store[r].expire<t&&delete this.storage.store[r];this._saveStorage()}}},{key:"_processValues",value:function(e,t){var o=this;e.processors.forEach((function(r){void 0!==o.profilerProcessor[r.type]?o.profilerProcessor[r.type](e,r,t):console.debug('Invalid profiler processor type "'+r.type+'".')}))}},{key:"_loadStorage",value:function(){var e=JSON.parse(localStorage.getItem("convivial_profiler"))||{};return!0===this._getConfig("client_cleanup")&&e._clientId!==this.clientId?(localStorage.removeItem("convivial_profiler"),{}):e[this.siteId]||{}}},{key:"_saveStorage",value:function(){var e=JSON.parse(localStorage.getItem("convivial_profiler"))||{};e._clientId=this.clientId,e._version=this.version,e._licenseKey=this.licenseKey,e[this.siteId]=this.storage,localStorage.setItem("convivial_profiler",JSON.stringify(e))}},{key:"_getValue",value:function(e,t){return t=t||this.storage,(Array.isArray(e)?e:e.split(".")).reduce((function(e,t){return e&&e[t]}),t)}},{key:"_deleteValue",value:function(e,t){this.storage[e]=this.storage[e]||{},delete this.storage[e][t],this._saveStorage()}},{key:"_getConfig",value:function(e){return this._getValue(e,this.config)}},{key:"_setValue",value:function(e,t,o){this.storage[e]=this.storage[e]||{},this.storage[e][t]=o,this._saveStorage()}},{key:"_increaseValue",value:function(e,t,o){this.storage[e]=this.storage[e]||{},this.storage[e][t]=this.storage[e][t]||0,this.storage[e][t]+=parseFloat(o)||1,this._saveStorage()}},{key:"_increaseSubValue",value:function(e,t,o,r){this.storage[e]=this.storage[e]||{},this.storage[e][t]=this.storage[e][t]||{},this.storage[e][t][o]=this.storage[e][t][o]||0,this.storage[e][t][o]+=parseFloat(r)||1,this._saveStorage()}},{key:"_logValue",value:function(e,t,o){this.storage.log=this.storage.log||{},this.storage.log[e]=this.storage.log[e]||[],void 0!==o&&this.storage.log[e].length==o&&this.storage.log[e].shift(),this.storage.log[e].push(t),this._saveStorage()}}])&&R(t.prototype,x),Object.defineProperty(t,"prototype",{writable:!1}),e}();return t}()}));