!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ConvivialProfiler",[],t):"object"==typeof exports?exports.ConvivialProfiler=t():e.ConvivialProfiler=t()}(self,(()=>(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function o(){return Math.round((new Date).getTime()/1e3)}function r(e){var t=document.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return t?decodeURIComponent(t[2]):null}function i(e,t,o){var r=new Date(Date.now()+864e5*o).toUTCString();document.cookie=e+"="+encodeURIComponent(t)+";path=/;expires="+r}function a(){try{if("undefined"==typeof localStorage)return!1;var e="test";return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(e){return console.log("Convivial Profiler will not work because the browser local storage is not enabled or accessible."),!1}}function l(e,t,o){o.forEach((e=>{window.convivialProfiler._increaseValue("accumulators",t.storage_key,e)}))}function s(e,t,o){o.forEach((e=>{t.normalize?window.convivialProfiler._increaseSubValue("dimensions",t.storage_key,e,1/o.length):window.convivialProfiler._increaseSubValue("dimensions",t.storage_key,e)}))}function n(e,t,r){r.forEach((e=>{window.convivialProfiler._setValue("fetchers",t.storage_key,{value:e,expire:o()+t.ttl})}))}function c(e,t,r){var i=o()+t.ttl;null!==t.ttl&&t.ttl>0&&(i=o()-1),r.forEach((e=>{window.convivialProfiler._setValue("store",t.storage_key,{value:e.toLowerCase(),expire:i})}))}function g(e,t,r){var i=o()+t.ttl;null!==t.ttl&&t.ttl>0&&(i=o()-1),r.forEach((e=>{window.convivialProfiler._setValue("store",t.storage_key,{value:e.split("-")[0].toLowerCase(),expire:i})}))}function u(e,t,r){if(r&&r.length>0&&r[0]&&t.mappings&&t.mappings.length>0){var i=t.mappings.filter((e=>e.includes(r[0]+"|")));i&&i.length>0&&i[0]?window.convivialProfiler._setValue("store",t.storage_key,{value:i[0].replace(r[0]+"|",""),expire:o()}):window.convivialProfiler._setValue("store",t.storage_key,{value:t.fallback_value,expire:o()})}else window.convivialProfiler._setValue("store",t.storage_key,{value:t.default_value,expire:o()})}function f(e,t,r){!0===t.log&&window.convivialProfiler._logValue(t.storage_key,[window.location.href,o()]),!0===t.track&&window.convivialProfiler._increaseValue("counters",t.storage_key)}function v(e,t,o){if(window.location.pathname.includes(t.search_path)&&window.location.search.substring(1).length>0){var r=[],i="";if(window.location.search.substring(1).split("&").forEach((e=>{r.push(e.split("=")[0]),e.split("=")[0]===t.query_param&&(i=e.split("=")[1])})),r.includes(t.query_param)&&!r.includes(t.exclude_param)&&""!==i){var a=window.convivialProfiler._getValue("log."+t.storage_key)||[],l=i.split("+").join(" ");void 0===a.find((e=>e.title==l))&&(!0===t.log&&window.convivialProfiler._logValue(t.storage_key,{title:l,url:window.location.href},t.size),!0===t.track&&window.convivialProfiler._increaseValue("counters",t.storage_key))}}}function p(e,t,r){var i=o()+t.ttl;null!==t.ttl&&-1===t.ttl&&(i=o()+31536e3),r.forEach((e=>{window.convivialProfiler._setValue("store",t.storage_key,{value:e,expire:i})}))}function h(e,t,o){o.forEach((e=>{e==window.convivialProfiler._getValue("store."+t.unstore_key+".value")&&(window.convivialProfiler._deleteValue("store",t.unstore_key),window.convivialProfiler._setValue("temp",t.storage_key,{value:t.storage_value}))}))}function _(e,t,o){o.forEach((e=>{window.convivialProfiler._setValue("temp",t.storage_key,{value:e})}))}function d(e,t,o){var r=[];t.storage_keys.forEach((e=>{var t=localStorage.getItem(e);void 0!==t&&r.push(t)})),r=r.filter((e=>null!=e&&""!=e)),Array.isArray(r)&&0===r.length&&t.default_value&&void 0!==t.default_value&&r.push(t.default_value),r.length?("localstorage"===t.target_location.localstorage&&r[0]&&localStorage.setItem(t.target_key,r[0]),"cookie"===t.target_location.cookie&&r[0]&&i(t.target_key,r[0])):t.remove_empty&&!r.length&&localStorage.removeItem(t.target_key)}function y(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r?(void 0!==t.stringify&&t.stringify&&(r=JSON.stringify(r)),"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,r),"cookie"===t.target_location.cookie&&i(t.target_key,r)):t.remove_empty&&!r&&localStorage.removeItem(t.target_key)}function m(e,t,o){o.forEach((e=>{window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"convivialProfiler.event",category:t.category,action:t.action,label:e,value:t.normalize?1/o.length:1})}))}function w(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);if(r){var a=r;t.flag_prefix&&(a=t.flag_prefix+a),t.flag_suffix&&(a+=t.flag_suffix),"localstorage"===t.target_location.localstorage&&localStorage.setItem(a,a),"cookie"===t.target_location.cookie&&i(a,a)}}function k(e,t,o){var i="form"+t.form_selector,a=document.querySelector(i);null!==a&&t.fields_selector.forEach((e=>{var o=e.split("|")[0],i=e.split("|")[1];null!==a.querySelector('input[name="'+o+'"]')&&null!==i&&("localstorage"===t.storage_source.localstorage&&(a.querySelector('input[name="'+o+'"]').value=localStorage.getItem(i)),"cookie"===t.storage_source.cookie&&(a.querySelector('input[name="'+o+'"]').value=r(i)))}))}function S(e,t,o){var r="form"+t.form_selector,i=document.querySelector(r);function a(e){var o="form"+t.form_selector+' input[name="'+t.field_name+'"]',r=document.querySelector(o).value;"radio"!==document.querySelector(o).type&&"checkbox"!==document.querySelector(o).type||null!=document.querySelector(o+":checked")&&(r=document.querySelector(o+":checked").value),window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"convivialProfiler.event",category:t.event_category,action:t.event_action,label:r,value:1})}null!==i&&(i.addEventListener?i.addEventListener("submit",a,!1):i.attachEvent&&i.attachEvent("onsubmit",a))}function P(e,t,o){var r=new Date,a=t.daylight_saving_offset;r.getTime()>=Date.parse(t.normal_start)&&r.getTime()<=Date.parse(t.normal_end)&&(a=t.normal_offset);var l=new Date(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds(),r.getUTCMilliseconds()).getTime()+36e5*a,s=new Date(l),n=s.getDay(),c=0;if(t.office_times){var g=t.office_times.filter((e=>n===e.day));g&&g.length>0&&g.forEach((e=>{c=s.getHours()>=parseInt(e.start)&&s.getHours()<=parseInt(e.close)?1:0}))}"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,c),"cookie"===t.target_location.cookie&&i(t.target_key,c)}function I(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r?t.ranges.forEach((e=>{r>=e.min&&r<e.max&&("localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,e.key),"cookie"===t.target_location.cookie&&i(t.target_key,e.key))})):t.remove_empty&&!r&&localStorage.removeItem(t.target_key)}function V(e,t,o){var r=[];t.storage_keys.forEach((e=>{var t=window.convivialProfiler._getValue(e);void 0!==t&&r.push(t)})),r.length&&(r=r.filter((e=>null!=e&&""!=e)),Array.isArray(r)&&t.static_values&&void 0!==t.static_values&&t.static_values.forEach((e=>{void 0!==e&&r.push(e)})),r.forEach((e=>{"localstorage"===t.target_location.localstorage&&localStorage.removeItem(e),"cookie"===t.target_location.cookie&&i(e,"",0)})))}function b(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);if(r){var a=["winter","winter","spring","spring","spring","summer","summer","summer","autumn","autumn","autumn","winter"],l=r<0?6:0,s=((new Date).getMonth()+l)%12;"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,a[s]),"cookie"===t.target_location.cookie&&i(t.target_key,a[s])}else t.remove_empty&&!r&&localStorage.removeItem(t.target_key)}function D(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r&&("localstorage"===t.target_location.localstorage&&localStorage.setItem(r,"1"),"cookie"===t.target_location.cookie&&i(r,"1"))}function E(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r&&r>=t.threshold_number&&("localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,t.target_value),"cookie"===t.target_location.cookie&&i(t.target_key,t.target_value))}function C(e,t,o){var r=window.convivialProfiler._getValue(t.dimension_key);if(r){var a=null,l=null;for(var s in r)(null===l||r[s]>l)&&(a=s,l=r[s]);"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,a),"cookie"===t.target_location.cookie&&i(t.target_key,a)}else t.remove_empty&&!r&&localStorage.removeItem(t.target_key)}function x(e,t,o){var r=window.convivialProfiler._getValue(t.dimension_key);if(r)a=(a=Object.entries(r).sort(((e,t)=>t[1]-e[1])).slice(0,t.length)).map((e=>e[0]));else if(t.default_value&&!r)var a=t.default_value.split(",").map((e=>e.trim()));void 0!==t.stringify&&t.stringify&&(a=JSON.stringify(a)),"localstorage"===t.target_location.localstorage&&localStorage.setItem(t.target_key,a),"cookie"===t.target_location.cookie&&i(t.target_key,a)}function q(e,t,o){var r=window.convivialProfiler._getValue(t.storage_key);r&&("localstorage"===t.target_location.localstorage&&localStorage.setItem(r,"0"),"cookie"===t.target_location.cookie&&i(r,"0"))}function O(e,t,o){null!==navigator.language&&navigator.language.includes("-")?o.push(navigator.language):o.push("en-AU")}function T(e,t,o){var i=r(t.name);null!==i&&o.push(i)}function U(e,t,o){var r=new XMLHttpRequest;r.onload=function(){try{o.push(JSON.parse(r.response)),window.convivialProfiler._processValues(e,o)}catch(e){r.onerror()}},r.onerror=function(){console.debug('Unable to fetch values of "'+t.resource_url+'".')},r.open("GET",t.resource_url),r.send()}function A(e,t,o){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?o.push("mobile"):o.push("desktop")}function L(e,t,o){var r=document.querySelectorAll('meta[name="'+t.attribute_name+'"]');for(var i of r)o.push(i.getAttribute("content"))}function M(e,t,o){window.location.search.substring(1).split("&").forEach((e=>{var r=e.split("=");if(r[0]===t.param||r[0]===t.param+"[]"){var i=decodeURIComponent(r[1].replace(/\+/g," "));o.push(void 0===r[1]||i)}}))}function j(e,t,o){"hour"===t.part?o.push((new Date).getHours()):"minute"===t.part?o.push((new Date).getMinutes()):"second"===t.part&&o.push((new Date).getSeconds())}e.r(t),e.d(t,{default:()=>J});const J=class{constructor(e,t,o,J){this.version=1,this.config=e,this.siteId=t,this.licenseKey=o,this.clientId=J||function(){var e=r("ConvivialProfilerClientId");if(null===e){var t=new Uint8Array(10);(window.crypto||window.msCrypto).getRandomValues(t),e="";for(var o=0;o<t.length;o++)e+=("0"+t[o].toString(16)).slice(-2);i("ConvivialProfilerClientId",e,365)}return e}(),a()&&(this.storage=this._loadStorage(),this.storage.temp={},window.convivialProfiler=window.convivialProfiler||{},this.profilerSource={},this.profilerSource.acceptlang=O,this.profilerSource.cookie=T,this.profilerSource.get=U,this.profilerSource.meta=L,this.profilerSource.query=M,this.profilerSource.time=j,this.profilerSource.httpuseragent=A,this.profilerProcessor={},this.profilerProcessor.accumulation=l,this.profilerProcessor.dimension=s,this.profilerProcessor.extreme_geoip=n,this.profilerProcessor.language_simple=g,this.profilerProcessor.language_full=c,this.profilerProcessor.map=u,this.profilerProcessor.pageview=f,this.profilerProcessor.searchquery=v,this.profilerProcessor.store=p,this.profilerProcessor.unstore_value=h,this.profilerProcessor.temp=_,this.profilerDestination={},this.profilerDestination.bestpick=d,this.profilerDestination.copy=y,this.profilerDestination.datalayer_event=m,this.profilerDestination.flag=w,this.profilerDestination.formfiller=k,this.profilerDestination.formtracker=S,this.profilerDestination.officehours=P,this.profilerDestination.range=I,this.profilerDestination.remove=V,this.profilerDestination.season=b,this.profilerDestination.set=D,this.profilerDestination.threshold=E,this.profilerDestination.top=C,this.profilerDestination.tops=x,this.profilerDestination.unset=q)}collect(){if(a()){var e=o();if(Object.keys(this.config.profilers).forEach((t=>{var o=this.config.profilers[t];if(o.deferred){var r=this._getValue("fetchers."+t);if(void 0!==r&&r.expire>e)return}var i=[];o.sources.forEach((e=>{void 0!==this.profilerSource[e.type]?this.profilerSource[e.type](o,e,i):console.debug('Invalid profiler source type "'+e.type+'".')})),this._processValues(o,i),o.destinations.forEach((e=>{void 0!==this.profilerDestination[e.type]?this.profilerDestination[e.type](o,e,i):console.debug('Invalid profiler destination type "'+e.type+'".')}))})),void 0!==this._getValue("store")){for(var t in this.storage.store)this.storage.store.hasOwnProperty(t)&&this.storage.store[t].expire<e&&delete this.storage.store[t];this._saveStorage()}}}_processValues(e,t){e.processors.forEach((o=>{void 0!==this.profilerProcessor[o.type]?this.profilerProcessor[o.type](e,o,t):console.debug('Invalid profiler processor type "'+o.type+'".')}))}_loadStorage(){var e=JSON.parse(localStorage.getItem("convivial_profiler"))||{};return!0===this._getConfig("client_cleanup")&&e._clientId!==this.clientId?(localStorage.removeItem("convivial_profiler"),{}):e[this.siteId]||{}}_saveStorage(){var e=JSON.parse(localStorage.getItem("convivial_profiler"))||{};e._clientId=this.clientId,e._version=this.version,e._licenseKey=this.licenseKey,e[this.siteId]=this.storage,localStorage.setItem("convivial_profiler",JSON.stringify(e))}_getValue(e,t){return t=t||this.storage,(Array.isArray(e)?e:e.split(".")).reduce(((e,t)=>e&&e[t]),t)}_deleteValue(e,t){this.storage[e]=this.storage[e]||{},delete this.storage[e][t],this._saveStorage()}_getConfig(e){return this._getValue(e,this.config)}_setValue(e,t,o){this.storage[e]=this.storage[e]||{},this.storage[e][t]=o,this._saveStorage()}_increaseValue(e,t,o){this.storage[e]=this.storage[e]||{},this.storage[e][t]=this.storage[e][t]||0,this.storage[e][t]+=parseFloat(o)||1,this._saveStorage()}_increaseSubValue(e,t,o,r){this.storage[e]=this.storage[e]||{},this.storage[e][t]=this.storage[e][t]||{},this.storage[e][t][o]=this.storage[e][t][o]||0,this.storage[e][t][o]+=parseFloat(r)||1,this._saveStorage()}_logValue(e,t,o){this.storage.log=this.storage.log||{},this.storage.log[e]=this.storage.log[e]||[],void 0!==o&&this.storage.log[e].length==o&&this.storage.log[e].shift(),this.storage.log[e].push(t),this._saveStorage()}};return t})()));