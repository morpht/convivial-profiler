!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define("ConvivialProfiler",[],o):"object"==typeof exports?exports.ConvivialProfiler=o():e.ConvivialProfiler=o()}(self,(function(){return(()=>{var e={485:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.bestpick=function(i,r,t){var l=[];r.storage_keys.forEach((function(e){var i=o.getItem(e);void 0!==i&&l.push(i)})),l=l.filter((function(e){return null!=e&&""!=e})),Array.isArray(l)&&0===l.length&&r.default_value&&void 0!==r.default_value&&l.push(r.default_value),l.length?("localstorage"===r.target_location.localstorage&&l[0]&&o.setItem(r.target_key,l[0]),"cookie"===r.target_location.cookie&&l[0]&&e.convivialProfiler._setCookie(r.target_key,l[0])):r.remove_empty&&!l.length&&o.removeItem(r.target_key)}}(window,localStorage)},194:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.copy=function(i,r,t){var l=e.convivialProfiler._getValue(r.storage_key);l?(void 0!==r.stringify&&r.stringify&&(l=JSON.stringify(l)),"localstorage"===r.target_location.localstorage&&o.setItem(r.target_key,l),"cookie"===r.target_location.cookie&&e.convivialProfiler._setCookie(r.target_key,l)):r.remove_empty&&!l&&o.removeItem(r.target_key)}}(window,localStorage)},629:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.datalayer_event=function(o,i,r){r.forEach((function(o){e.dataLayer=e.dataLayer||[],e.dataLayer.push({event:"convivialProfiler.event",category:i.category,action:i.action,label:o,value:i.normalize?1/r.length:1})}))}}(window)},88:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.formfiller=function(i,r,t){var l="form"+r.form_selector,n=document.querySelector(l);null!==n&&r.fields_selector.forEach((function(i){var t=i.split("|")[0],l=i.split("|")[1];null!==n.querySelector('input[name="'+t+'"]')&&null!==l&&("localstorage"===r.storage_source.localstorage&&(n.querySelector('input[name="'+t+'"]').value=o.getItem(l)),"cookie"===r.storage_source.cookie&&(n.querySelector('input[name="'+t+'"]').value=e.convivialProfiler._getCookie(l)))}))}}(window,localStorage)},665:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.formtracker=function(o,i,r){var t="form"+i.form_selector,l=document.querySelector(t);function n(o){var r="form"+i.form_selector+' input[name="'+i.field_name+'"]',t=document.querySelector(r).value;"radio"!==document.querySelector(r).type&&"checkbox"!==document.querySelector(r).type||null!=document.querySelector(r+":checked")&&(t=document.querySelector(r+":checked").value),e.dataLayer=e.dataLayer||[],e.dataLayer.push({event:"convivialProfiler.event",category:i.event_category,action:i.event_action,label:t,value:1})}null!==l&&(l.addEventListener?l.addEventListener("submit",n,!1):l.attachEvent&&l.attachEvent("onsubmit",n))}}(window,localStorage)},452:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.officehours=function(i,r,t){var l=new Date,n=r.daylight_saving_offset;l.getTime()>=Date.parse(r.normal_start)&&l.getTime()<=Date.parse(r.normal_end)&&(n=r.normal_offset);var a=new Date(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate(),l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()).getTime()+36e5*n,c=new Date(a),v=c.getDay(),f=0;if(r.office_times){var s=r.office_times.filter((function(e){return v===e.day}));s&&s.length>0&&s.forEach((function(e){f=c.getHours()>=parseInt(e.start)&&c.getHours()<=parseInt(e.close)?1:0}))}"localstorage"===r.target_location.localstorage&&o.setItem(r.target_key,f),"cookie"===r.target_location.cookie&&e.convivialProfiler._setCookie(r.target_key,f)}}(window,localStorage)},499:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.range=function(i,r,t){var l=e.convivialProfiler._getValue(r.storage_key);l?r.ranges.forEach((function(i){l>=i.min&&l<i.max&&("localstorage"===r.target_location.localstorage&&o.setItem(r.target_key,i.key),"cookie"===r.target_location.cookie&&e.convivialProfiler._setCookie(r.target_key,i.key))})):r.remove_empty&&!l&&o.removeItem(r.target_key)}}(window,localStorage)},348:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.remove=function(i,r,t){var l=[];r.storage_keys.forEach((function(o){var i=e.convivialProfiler._getValue(o);void 0!==i&&l.push(i)})),l.length&&(l=l.filter((function(e){return null!=e&&""!=e})),Array.isArray(l)&&r.static_values&&void 0!==r.static_values&&r.static_values.forEach((function(e){void 0!==e&&l.push(e)})),l.forEach((function(i){"localstorage"===r.target_location.localstorage&&o.removeItem(i),"cookie"===r.target_location.cookie&&e.convivialProfiler._setCookie(i,"",0)})))}}(window,localStorage)},205:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.season=function(i,r,t){var l=e.convivialProfiler._getValue(r.storage_key);if(l){var n=["winter","winter","spring","spring","spring","summer","summer","summer","autumn","autumn","autumn","winter"],a=l<0?6:0,c=((new Date).getMonth()+a)%12;"localstorage"===r.target_location.localstorage&&o.setItem(r.target_key,n[c]),"cookie"===r.target_location.cookie&&e.convivialProfiler._setCookie(r.target_key,n[c])}else r.remove_empty&&!l&&o.removeItem(r.target_key)}}(window,localStorage)},433:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.set=function(i,r,t){var l=e.convivialProfiler._getValue(r.storage_key);l&&("localstorage"===r.target_location.localstorage&&o.setItem(l,"1"),"cookie"===r.target_location.cookie&&e.convivialProfiler._setCookie(l,"1"))}}(window,localStorage)},706:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.threshold=function(i,r,t){var l=e.convivialProfiler._getValue(r.storage_key);if(l&&l>=r.threshold_number&&("localstorage"===r.target_location.localstorage&&o.setItem(r.target_key,r.target_value),"cookie"===r.target_location.cookie)){var n=new Date(Date.now()+864e5).toUTCString();document.cookie=r.target_key+"="+encodeURIComponent(r.target_value)+";path=/;expires="+n}}}(window,localStorage)},414:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.top=function(i,r,t){var l=e.convivialProfiler._getValue(r.dimension_key);if(l){var n=null,a=null;for(var c in l)(null===a||l[c]>a)&&(n=c,a=l[c]);"localstorage"===r.target_location.localstorage&&o.setItem(r.target_key,n),"cookie"===r.target_location.cookie&&e.convivialProfiler._setCookie(r.target_key,n)}else r.remove_empty&&!l&&o.removeItem(r.target_key)}}(window,localStorage)},231:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerDestination=e.convivialProfiler.profilerDestination||{},e.convivialProfiler.profilerDestination.unset=function(i,r,t){var l=e.convivialProfiler._getValue(r.storage_key);l&&("localstorage"===r.target_location.localstorage&&o.setItem(l,"0"),"cookie"===r.target_location.cookie&&e.convivialProfiler._setCookie(l,"0"))}}(window,localStorage)},898:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.accumulation=function(o,i,r){r.forEach((function(o){e.convivialProfiler._increaseValue("accumulators",i.storage_key,o)}))}}(window)},23:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.dimension=function(o,i,r){r.forEach((function(o){i.normalize?e.convivialProfiler._increaseSubValue("dimensions",i.storage_key,o,1/r.length):e.convivialProfiler._increaseSubValue("dimensions",i.storage_key,o)}))}}(window)},633:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.extreme_geoip=function(o,i,r){r.forEach((function(o){e.convivialProfiler._setValue("fetchers",i.storage_key,{value:o,expire:e.convivialProfiler._getTime()+i.ttl})}))}}(window)},657:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.language_full=function(o,i,r){var t=e.convivialProfiler._getTime()+i.ttl;null!==i.ttl&&i.ttl>0&&(t=e.convivialProfiler._getTime()-1),r.forEach((function(o){e.convivialProfiler._setValue("store",i.storage_key,{value:o.toLowerCase(),expire:t})}))}}(window)},731:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.language_simple=function(o,i,r){var t=e.convivialProfiler._getTime()+i.ttl;null!==i.ttl&&i.ttl>0&&(t=e.convivialProfiler._getTime()-1),r.forEach((function(o){e.convivialProfiler._setValue("store",i.storage_key,{value:o.split("-")[0].toLowerCase(),expire:t})}))}}(window)},780:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.map=function(o,i,r){if(r&&r.length>0&&r[0]&&i.mappings&&i.mappings.length>0){var t=i.mappings.filter((function(e){return e.includes(r[0]+"|")}));t&&t.length>0&&t[0]?e.convivialProfiler._setValue("store",i.storage_key,{value:t[0].replace(r[0]+"|",""),expire:e.convivialProfiler._getTime()}):e.convivialProfiler._setValue("store",i.storage_key,{value:i.fallback_value,expire:e.convivialProfiler._getTime()})}else e.convivialProfiler._setValue("store",i.storage_key,{value:i.default_value,expire:e.convivialProfiler._getTime()})}}(window)},744:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.pageview=function(o,i,r){!0===i.log&&e.convivialProfiler._logValue(i.storage_key,[e.location.href,e.convivialProfiler._getTime()]),!0===i.track&&e.convivialProfiler._increaseValue("counters",i.storage_key)}}(window)},776:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.searchquery=function(o,i,r){if(e.location.pathname.includes(i.search_path)&&e.location.search.substring(1).length>0){var t=[],l="";if(e.location.search.substring(1).split("&").forEach((function(e){t.push(e.split("=")[0]),e.split("=")[0]===i.query_param&&(l=e.split("=")[1])})),t.includes(i.query_param)&&!t.includes(i.exclude_param)&&""!==l){var n=e.convivialProfiler._getValue("log."+i.storage_key)||[],a=l.split("+").join(" ");void 0===n.find((function(e){return e.title==a}))&&(!0===i.log&&e.convivialProfiler._logValue(i.storage_key,{title:a,url:e.location.href},i.size),!0===i.track&&e.convivialProfiler._increaseValue("counters",i.storage_key))}}}}(window)},705:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.store=function(o,i,r){var t=e.convivialProfiler._getTime()+i.ttl;null!==i.ttl&&i.ttl<1&&(t=e.convivialProfiler._getTime()-1),r.forEach((function(o){e.convivialProfiler._setValue("store",i.storage_key,{value:o,expire:t})}))}}(window)},525:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerProcessor=e.convivialProfiler.profilerProcessor||{},e.convivialProfiler.profilerProcessor.temp=function(o,i,r){r.forEach((function(o){e.convivialProfiler._setValue("temp",i.storage_key,{value:o})}))}}(window)},301:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerSource=e.convivialProfiler.profilerSource||{},e.convivialProfiler.profilerSource.acceptlang=function(e,o,i){null!==navigator.language&&navigator.language.includes("-")?i.push(navigator.language):i.push("en-AU")}}(window,document)},802:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerSource=e.convivialProfiler.profilerSource||{},e.convivialProfiler.profilerSource.cookie=function(o,i,r){var t=e.convivialProfiler._getCookie(i.name);null!==t&&r.push(t)}}(window)},793:()=>{!function(e,o,i){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerSource=e.convivialProfiler.profilerSource||{},e.convivialProfiler.profilerSource.get=function(r,t,l){var n=new o;n.onload=function(){try{l.push(JSON.parse(n.response)),e.convivialProfiler._processValues(r,l)}catch(e){n.onerror()}},n.onerror=function(){i.debug('Unable to fetch values of "'+t.resource_url+'".')},n.open("GET",t.resource_url),n.send()}}(window,XMLHttpRequest,console)},632:()=>{!function(e,o){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerSource=e.convivialProfiler.profilerSource||{},e.convivialProfiler.profilerSource.httpuseragent=function(e,o,i){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?i.push("mobile"):i.push("desktop")}}(window,document)},136:()=>{function e(e,o){(null==o||o>e.length)&&(o=e.length);for(var i=0,r=new Array(o);i<o;i++)r[i]=e[i];return r}!function(o,i){o.convivialProfiler=o.convivialProfiler||{},o.convivialProfiler.profilerSource=o.convivialProfiler.profilerSource||{},o.convivialProfiler.profilerSource.meta=function(o,r,t){var l,n=function(o,i){var r="undefined"!=typeof Symbol&&o[Symbol.iterator]||o["@@iterator"];if(!r){if(Array.isArray(o)||(r=function(o,i){if(o){if("string"==typeof o)return e(o,i);var r=Object.prototype.toString.call(o).slice(8,-1);return"Object"===r&&o.constructor&&(r=o.constructor.name),"Map"===r||"Set"===r?Array.from(o):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(o,i):void 0}}(o))||i&&o&&"number"==typeof o.length){r&&(o=r);var t=0,l=function(){};return{s:l,n:function(){return t>=o.length?{done:!0}:{done:!1,value:o[t++]}},e:function(e){throw e},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a=!0,c=!1;return{s:function(){r=r.call(o)},n:function(){var e=r.next();return a=e.done,e},e:function(e){c=!0,n=e},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw n}}}}(i.querySelectorAll('meta[name="'+r.attribute_name+'"]'));try{for(n.s();!(l=n.n()).done;){var a=l.value;t.push(a.getAttribute("content"))}}catch(e){n.e(e)}finally{n.f()}}}(window,document)},131:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerSource=e.convivialProfiler.profilerSource||{},e.convivialProfiler.profilerSource.query=function(o,i,r){e.location.search.substring(1).split("&").forEach((function(e){var o=e.split("=");if(o[0]===i.param||o[0]===i.param+"[]"){var t=decodeURIComponent(o[1].replace(/\+/g," "));r.push(void 0===o[1]||t)}}))}}(window)},599:()=>{!function(e){e.convivialProfiler=e.convivialProfiler||{},e.convivialProfiler.profilerSource=e.convivialProfiler.profilerSource||{},e.convivialProfiler.profilerSource.time=function(e,o,i){"hour"===o.part?i.push((new Date).getHours()):"minute"===o.part?i.push((new Date).getMinutes()):"second"===o.part&&i.push((new Date).getSeconds())}}(window)}},o={};function i(r){var t=o[r];if(void 0!==t)return t.exports;var l=o[r]={exports:{}};return e[r](l,l.exports,i),l.exports}i.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return i.d(o,{a:o}),o},i.d=(e,o)=>{for(var r in o)i.o(o,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},i.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return(()=>{"use strict";function e(e,o){for(var i=0;i<o.length;i++){var r=o[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}i.r(r),i.d(r,{default:()=>o}),i(898),i(23),i(633),i(731),i(657),i(780),i(744),i(776),i(705),i(525),i(485),i(194),i(629),i(88),i(665),i(452),i(499),i(348),i(205),i(433),i(706),i(414),i(231),i(301),i(802),i(793),i(136),i(131),i(599),i(632);const o=function(){function o(e,i,r,t){!function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,o),this.version=1,this.config=e,this.siteId=i,this.licenseKey=r,this.clientId=t||this.getClientId(),this.storage=this._loadStorage(),this.storage.temp={},window.convivialProfiler=window.convivialProfiler||{},this.profilerSource=window.convivialProfiler.profilerSource||{},this.profilerProcessor=window.convivialProfiler.profilerProcessor||{},this.profilerDestination=window.convivialProfiler.profilerDestination||{}}var i,r;return i=o,(r=[{key:"getClientId",value:function(){var e=this._getCookie("ConvivialProfilerClientId");if(null===e){var o=new Uint8Array(10);(window.crypto||window.msCrypto).getRandomValues(o),e="";for(var i=0;i<o.length;i++)e+=("0"+o[i].toString(16)).substr(-2);this._setCookie("ConvivialProfilerClientId",e,365)}return e}},{key:"track",value:function(e,o){this._increaseValue("counters",e),this._logValue(e,[o,this._getTime()])}},{key:"collect",value:function(){var e=this,o=this._getTime();if(Object.keys(this.config.profilers).forEach((function(i){var r=e.config.profilers[i];if(r.deferred){var t=e._getValue("fetchers."+i);if(void 0!==t&&t.expire>o)return}var l=[];r.sources.forEach((function(o){void 0!==e.profilerSource[o.type]?e.profilerSource[o.type](r,o,l):console.debug('Invalid profiler source type "'+o.type+'".')})),e._processValues(r,l),r.destinations.forEach((function(o){void 0!==e.profilerDestination[o.type]?e.profilerDestination[o.type](r,o,l):console.debug('Invalid profiler destination type "'+o.type+'".')}))})),void 0!==this._getValue("store")){for(var i in this.storage.store)this.storage.store.hasOwnProperty(i)&&this.storage.store[i].expire<o&&delete this.storage.store[i];this._saveStorage()}}},{key:"_processValues",value:function(e,o){var i=this;e.processors.forEach((function(r){void 0!==i.profilerProcessor[r.type]?i.profilerProcessor[r.type](e,r,o):console.debug('Invalid profiler processor type "'+r.type+'".')}))}},{key:"_loadStorage",value:function(){var e=JSON.parse(localStorage.getItem("convivial_profiler"))||{};return!0===this._getConfig("client_cleanup")&&e._clientId!==this.clientId?(localStorage.removeItem("convivial_profiler"),{}):e[this.siteId]||{}}},{key:"_saveStorage",value:function(){var e=JSON.parse(localStorage.getItem("convivial_profiler"))||{};e._clientId=this.clientId,e._version=this.version,e._licenseKey=this.licenseKey,e[this.siteId]=this.storage,localStorage.setItem("convivial_profiler",JSON.stringify(e))}},{key:"_getValue",value:function(e,o){return o=o||this.storage,(Array.isArray(e)?e:e.split(".")).reduce((function(e,o){return e&&e[o]}),o)}},{key:"_getConfig",value:function(e){return this._getValue(e,this.config)}},{key:"_setValue",value:function(e,o,i){this.storage[e]=this.storage[e]||{},this.storage[e][o]=i,this._saveStorage()}},{key:"_increaseValue",value:function(e,o,i){this.storage[e]=this.storage[e]||{},this.storage[e][o]=this.storage[e][o]||0,this.storage[e][o]+=parseFloat(i)||1,this._saveStorage()}},{key:"_increaseSubValue",value:function(e,o,i,r){this.storage[e]=this.storage[e]||{},this.storage[e][o]=this.storage[e][o]||{},this.storage[e][o][i]=this.storage[e][o][i]||0,this.storage[e][o][i]+=parseFloat(r)||1,this._saveStorage()}},{key:"_logValue",value:function(e,o,i){this.storage.log=this.storage.log||{},this.storage.log[e]=this.storage.log[e]||[],void 0!==i&&this.storage.log[e].length==i&&this.storage.log[e].shift(),this.storage.log[e].push(o),this._saveStorage()}},{key:"_getTime",value:function(){return Math.round((new Date).getTime()/1e3)}},{key:"_getCookie",value:function(e){var o=document.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return o?decodeURIComponent(o[2]):null}},{key:"_setCookie",value:function(e,o,i){var r=new Date(Date.now()+864e5*i).toUTCString();document.cookie=e+"="+encodeURIComponent(o)+";path=/;expires="+r}}])&&e(i.prototype,r),Object.defineProperty(i,"prototype",{writable:!1}),o}()})(),r})()}));