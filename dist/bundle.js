!function(o,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("ConvivialProfiler",[],e):"object"==typeof exports?exports.ConvivialProfiler=e():o.ConvivialProfiler=e()}(self,(function(){return(()=>{var o={992:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorHandler=o.convivialProfiler.processorHandler||{},o.convivialProfiler.processorHandler.accumulation=function(e,r,i){i.forEach((function(e){o.convivialProfiler._increaseValue("accumulators",r.key,e)}))}}(window)},523:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorHandler=o.convivialProfiler.processorHandler||{},o.convivialProfiler.processorHandler.datalayer_event=function(e,r,i){i.forEach((function(e){o.dataLayer=o.dataLayer||[],o.dataLayer.push({event:"convivialProfiler.event",category:r.category,action:r.action,label:e,value:r.normalize?1/i.length:1})}))}}(window)},868:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorHandler=o.convivialProfiler.processorHandler||{},o.convivialProfiler.processorHandler.dimension=function(e,r,i){i.forEach((function(e){r.normalize?o.convivialProfiler._increaseSubValue("dimensions",r.key,e,1/i.length):o.convivialProfiler._increaseSubValue("dimensions",r.key,e)}))}}(window)},215:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorHandler=o.convivialProfiler.processorHandler||{},o.convivialProfiler.processorHandler.extreme_geoip=function(e,r,i){i.forEach((function(e){o.convivialProfiler._setValue("fetchers",r.key,{value:e,expire:o.convivialProfiler._getTime()+r.ttl})}))}}(window)},158:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorHandler=o.convivialProfiler.processorHandler||{},o.convivialProfiler.processorHandler.language_full=function(e,r,i){var l=o.convivialProfiler._getTime()+r.ttl;null!==r.ttl&&r.ttl>0&&(l=o.convivialProfiler._getTime()-1),i.forEach((function(e){o.convivialProfiler._setValue("store",r.key,{value:e.toLowerCase(),expire:l})}))}}(window)},134:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorHandler=o.convivialProfiler.processorHandler||{},o.convivialProfiler.processorHandler.language_simple=function(e,r,i){var l=o.convivialProfiler._getTime()+r.ttl;null!==r.ttl&&r.ttl>0&&(l=o.convivialProfiler._getTime()-1),i.forEach((function(e){o.convivialProfiler._setValue("store",r.key,{value:e.split("-")[0].toLowerCase(),expire:l})}))}}(window)},516:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorHandler=o.convivialProfiler.processorHandler||{},o.convivialProfiler.processorHandler.pageview=function(e,r,i){o.convivialProfiler.track("pageview",o.location.href)}}(window)},480:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorHandler=o.convivialProfiler.processorHandler||{},o.convivialProfiler.processorHandler.store=function(e,r,i){var l=o.convivialProfiler._getTime()+r.ttl;null!==r.ttl&&r.ttl>0&&(l=o.convivialProfiler._getTime()-1),i.forEach((function(e){o.convivialProfiler._setValue("store",r.key,{value:e,expire:l})}))}}(window)},651:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.bestpick=function(r,i){i=i.filter((function(o){return null!=o&&""!=o})),"localstorage"===r.storage.localstorage&&e.setItem(r.key,i[0]),"cookie"===r.storage.cookie&&o.convivialProfiler._setCookie(r.key,i[0])}}(window,localStorage)},889:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.copy=function(r,i){"localstorage"===r.storage.localstorage&&e.setItem(r.key,i[0]),"cookie"===r.storage.cookie&&o.convivialProfiler._setCookie(r.key,i[0])}}(window,localStorage)},746:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.range=function(r,i){r.ranges.forEach((function(l){i[0]>=l.min&&i[0]<l.max&&("localstorage"===r.storage.localstorage&&e.setItem(r.key,l.key),"cookie"===r.storage.cookie&&o.convivialProfiler._setCookie(r.key,l.key))}))}}(window,localStorage)},380:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.remove=function(r,i){i.forEach((function(i){e.removeItem(i),"localstorage"===r.storage.localstorage&&e.removeItem(i),"cookie"===r.storage.cookie&&o.convivialProfiler._setCookie(i,"",0)}))}}(window,localStorage)},51:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.season=function(r,i){var l=["winter","winter","spring","spring","spring","summer","summer","summer","autumn","autumn","autumn","winter"],n=i[0]<0?6:0,t=((new Date).getMonth()+n)%12;"localstorage"===r.storage.localstorage&&e.setItem(r.key,l[t]),"cookie"===r.storage.cookie&&o.convivialProfiler._setCookie(r.key,l[t])}}(window,localStorage)},846:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.set=function(r,i){i.forEach((function(i){"localstorage"===r.storage.localstorage&&e.setItem(i,"1"),"cookie"===r.storage.cookie&&o.convivialProfiler._setCookie(i,"1")}))}}(window,localStorage)},733:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.threshold=function(o,r){if(r[0]>o.threshold_number&&("localstorage"===o.storage.localstorage&&e.setItem(o.storage_key,o.storage_value),"cookie"===o.storage.cookie)){var i=new Date(Date.now()+864e5).toUTCString();document.cookie=o.storage_key+"="+encodeURIComponent(o.storage_value)+";path=/;expires="+i}}}(window,localStorage)},819:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.top=function(r,i){var l=null,n=null;i.forEach((function(o){for(var e in o)(o.hasOwnProperty(e)&&null===n||o[e]>n)&&(l=e,n=o[e])})),"localstorage"===r.storage.localstorage&&e.setItem(r.key,l),"cookie"===r.storage.cookie&&o.convivialProfiler._setCookie(r.key,l)}}(window,localStorage)},658:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorPublisher=o.convivialProfiler.processorPublisher||{},o.convivialProfiler.processorPublisher.unset=function(r,i){i.forEach((function(i){"localstorage"===r.storage.localstorage&&e.setItem(i,"0"),"cookie"===r.storage.cookie&&o.convivialProfiler._setCookie(i,"0")}))}}(window,localStorage)},669:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorSource=o.convivialProfiler.processorSource||{},o.convivialProfiler.processorSource.acceptlang=function(o,e,r){null!==navigator.language&&navigator.language.includes("-")?r.push(navigator.language):r.push("en-AU")}}(window,document)},429:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorSource=o.convivialProfiler.processorSource||{},o.convivialProfiler.processorSource.cookie=function(e,r,i){var l=o.convivialProfiler._getCookie(r.key);null!==l&&i.push(l)}}(window)},393:()=>{!function(o,e,r){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorSource=o.convivialProfiler.processorSource||{},o.convivialProfiler.processorSource.get=function(i,l,n){var t=new e;t.onload=function(){try{n.push(JSON.parse(t.response)),o.convivialProfiler._processValues(i,n)}catch(o){t.onerror()}},t.onerror=function(){r.debug('Unable to fetch values of "'+l.url+'".')},t.open("GET",l.url),t.send()}}(window,XMLHttpRequest,console)},287:()=>{function o(o,e){(null==e||e>o.length)&&(e=o.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=o[r];return i}!function(e,r){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.processorSource=e.convivialProfiler.processorSource||{},e.convivialProfiler.processorSource.meta=function(e,i,l){var n,t=function(e,r){var i="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!i){if(Array.isArray(e)||(i=function(e,r){if(e){if("string"==typeof e)return o(e,r);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?o(e,r):void 0}}(e))||r&&e&&"number"==typeof e.length){i&&(e=i);var l=0,n=function(){};return{s:n,n:function(){return l>=e.length?{done:!0}:{done:!1,value:e[l++]}},e:function(o){throw o},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var t,a=!0,s=!1;return{s:function(){i=i.call(e)},n:function(){var o=i.next();return a=o.done,o},e:function(o){s=!0,t=o},f:function(){try{a||null==i.return||i.return()}finally{if(s)throw t}}}}(r.querySelectorAll('meta[name="'+i.key+'"]'));try{for(t.s();!(n=t.n()).done;){var a=n.value;l.push(a.getAttribute("content"))}}catch(o){t.e(o)}finally{t.f()}}}(window,document)},726:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorSource=o.convivialProfiler.processorSource||{},o.convivialProfiler.processorSource.query=function(e,r,i){o.location.search.substring(1).split("&").forEach((function(o){var e=o.split("=");if(e[0]===r.key||e[0]===r.key+"[]"){var l=decodeURIComponent(e[1].replace(/\+/g," "));i.push(void 0===e[1]||l)}}))}}(window)},957:()=>{!function(o){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorSource=o.convivialProfiler.processorSource||{},o.convivialProfiler.processorSource.time=function(o,e,r){"hour"===e.key?r.push((new Date).getHours()):"minute"===e.key?r.push((new Date).getMinutes()):"second"===e.key&&r.push((new Date).getSeconds())}}(window)},222:()=>{!function(o,e){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.processorSource=o.convivialProfiler.processorSource||{},o.convivialProfiler.processorSource.useragent=function(o,e,r){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?r.push("mobile"):r.push("desktop")}}(window,document)}},e={};function r(i){var l=e[i];if(void 0!==l)return l.exports;var n=e[i]={exports:{}};return o[i](n,n.exports,r),n.exports}r.n=o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return r.d(e,{a:e}),e},r.d=(o,e)=>{for(var i in e)r.o(e,i)&&!r.o(o,i)&&Object.defineProperty(o,i,{enumerable:!0,get:e[i]})},r.o=(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r.r=o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})};var i={};return(()=>{"use strict";function o(o,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(o,i.key,i)}}r.r(i),r.d(i,{default:()=>e}),r(992),r(523),r(868),r(215),r(134),r(158),r(516),r(480),r(651),r(889),r(746),r(380),r(51),r(846),r(733),r(819),r(658),r(669),r(429),r(393),r(287),r(726),r(957),r(222);const e=function(){function e(o,r,i,l){!function(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.version=1,this.config=o,this.siteId=r,this.licenseKey=i,this.clientId=l||this.getClientId(),this.storage=this._loadStorage(),window.convivialProfiler=window.convivialProfiler||{},this.processorSource=window.convivialProfiler.processorSource||{},this.processorHandler=window.convivialProfiler.processorHandler||{},this.processorPublisher=window.convivialProfiler.processorPublisher||{}}var r,i;return r=e,(i=[{key:"getClientId",value:function(){var o=this._getCookie("ConvivialProfilerClientId");if(null===o){if(null!==(o=this._getCookie("BasilClientId")))return this._setCookie("ConvivialProfilerClientId",o,365),this._setCookie("BasilClientId","",0),o;var e=new Uint8Array(10);(window.crypto||window.msCrypto).getRandomValues(e),o="";for(var r=0;r<e.length;r++)o+=("0"+e[r].toString(16)).substr(-2);this._setCookie("ConvivialProfilerClientId",o,365)}return o}},{key:"track",value:function(o,e){this._increaseValue("counters",o),this._logValue(o,e)}},{key:"collect",value:function(){var o=this,e=this._getTime();if(Object.keys(this.config.processors).forEach((function(r){var i=o.config.processors[r];if(i.deferred){var l=o._getValue("fetchers."+r);if(void 0!==l&&l.expire>e)return}var n=[];i.sources.forEach((function(e){void 0!==o.processorSource[e.type]?o.processorSource[e.type](i,e,n):console.debug('Invalid processor source type "'+e.type+'".')})),o._processValues(i,n)})),void 0!==this._getValue("store")){for(var r in this.storage.store)this.storage.store.hasOwnProperty(r)&&this.storage.store[r].expire<e&&delete this.storage.store[r];this._saveStorage()}}},{key:"_processValues",value:function(o,e){var r=this;o.handlers.forEach((function(i){void 0!==r.processorHandler[i.type]?r.processorHandler[i.type](o,i,e):console.debug('Invalid processor handler type "'+i.type+'".')})),o.publishers&&this._publish(o.publishers)}},{key:"_publish",value:function(o){var e=this;o.forEach((function(o){var r=e._getConfig("publishers."+o);if(void 0!==r){var i=[];r.key=o,r.paths.forEach((function(o){if(r.global_storage&&void 0!==r.global_storage&&null!==localStorage.getItem(o))var l=localStorage.getItem(o);else l=e._getValue(o);void 0!==l?i.push(l):r.default_value&&void 0!==r.default_value&&i.push(r.default_value)})),i.length?void 0!==e.processorPublisher[r.type]?e.processorPublisher[r.type](r,i):console.debug('Invalid processor publisher type "'+r.type+'".'):r.remove_empty&&localStorage.removeItem(r.key)}}))}},{key:"_loadStorage",value:function(){var o=JSON.parse(localStorage.getItem("convivial_profiler"))||{};if(!Object.keys(o).length){var e=localStorage.getItem("basil");null!==e&&(o=JSON.parse(e)||{},localStorage.setItem("convivial_profiler",e),localStorage.removeItem("basil"))}return Object.keys(o).length>0&&null!==o[this.siteId]&&null!==o[this.siteId].currents&&(o[this.siteId].store=o[this.siteId].currents,delete o[this.siteId].currents,localStorage.setItem("convivial_profiler",JSON.stringify(o))),!0===this._getConfig("client_cleanup")&&o._clientId!==this.clientId?(localStorage.removeItem("convivial_profiler"),{}):o[this.siteId]||{}}},{key:"_saveStorage",value:function(){var o=JSON.parse(localStorage.getItem("convivial_profiler"))||{};o._clientId=this.clientId,o._version=this.version,o._licenseKey=this.licenseKey,o[this.siteId]=this.storage,localStorage.setItem("convivial_profiler",JSON.stringify(o))}},{key:"_getValue",value:function(o,e){return e=e||this.storage,(Array.isArray(o)?o:o.split(".")).reduce((function(o,e){return o&&o[e]}),e)}},{key:"_getConfig",value:function(o){return this._getValue(o,this.config)}},{key:"_setValue",value:function(o,e,r){this.storage[o]=this.storage[o]||{},this.storage[o][e]=r,this._saveStorage()}},{key:"_increaseValue",value:function(o,e,r){this.storage[o]=this.storage[o]||{},this.storage[o][e]=this.storage[o][e]||0,this.storage[o][e]+=parseFloat(r)||1,this._saveStorage()}},{key:"_increaseSubValue",value:function(o,e,r,i){this.storage[o]=this.storage[o]||{},this.storage[o][e]=this.storage[o][e]||{},this.storage[o][e][r]=this.storage[o][e][r]||0,this.storage[o][e][r]+=parseFloat(i)||1,this._saveStorage()}},{key:"_logValue",value:function(o,e,r){this.storage.log=this.storage.log||{},this.storage.log[o]=this.storage.log[o]||[],this.storage.log[o].push([e,r||this._getTime()]),this._saveStorage()}},{key:"_getTime",value:function(){return Math.round((new Date).getTime()/1e3)}},{key:"_getCookie",value:function(o){var e=document.cookie.match("(^|;) ?"+o+"=([^;]*)(;|$)");return e?decodeURIComponent(e[2]):null}},{key:"_setCookie",value:function(o,e,r){var i=new Date(Date.now()+864e5*r).toUTCString();document.cookie=o+"="+encodeURIComponent(e)+";path=/;expires="+i}}])&&o(r.prototype,i),Object.defineProperty(r,"prototype",{writable:!1}),e}()})(),i})()}));