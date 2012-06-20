(function(){function g(a){if(typeof requirejs!="undefined"){var e=b.define;b.define=function(a,b,c){return typeof c!="function"?e.apply(this,arguments):e(a,b,function(a,d,e){return b[2]=="module"&&(e.packaged=!0),c.apply(this,arguments)})},b.define.packaged=!0;return}var f=function(a,b){return d("",a,b)};f.packaged=!0;var g=b;a&&(b[a]||(b[a]={}),g=b[a]),g.define&&(c.original=g.define),g.define=c,g.require&&(d.original=g.require),g.require=f}var a="",b=function(){return this}(),c=function(a,b,d){if(typeof a!="string"){c.original?c.original.apply(window,arguments):(console.error("dropping module because define wasn't a string."),console.trace());return}arguments.length==2&&(d=b),c.modules||(c.modules={}),c.modules[a]=d},d=function(a,b,c){if(Object.prototype.toString.call(b)==="[object Array]"){var e=[];for(var g=0,h=b.length;g<h;++g){var i=f(a,b[g]);if(!i&&d.original)return d.original.apply(window,arguments);e.push(i)}c&&c.apply(null,e)}else{if(typeof b=="string"){var j=f(a,b);return!j&&d.original?d.original.apply(window,arguments):(c&&c(),j)}if(d.original)return d.original.apply(window,arguments)}},e=function(a,b){if(b.indexOf("!")!==-1){var c=b.split("!");return e(a,c[0])+"!"+e(a,c[1])}if(b.charAt(0)=="."){var d=a.split("/").slice(0,-1).join("/");b=d+"/"+b;while(b.indexOf(".")!==-1&&f!=b){var f=b;b=b.replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}}return b},f=function(a,b){b=e(a,b);var f=c.modules[b];if(!f)return null;if(typeof f=="function"){var g={},h={id:b,uri:"",exports:g,packaged:!0},i=function(a,c){return d(b,a,c)},j=f(i,g,h);return g=j||h.exports,c.modules[b]=g,g}return f};g(a)})(),define("ace/ace",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/dom","ace/lib/event","ace/editor","ace/edit_session","ace/undomanager","ace/virtual_renderer","ace/multi_select","ace/worker/worker_client","ace/keyboard/hash_handler","ace/keyboard/state_handler","ace/placeholder","ace/config","ace/theme/textmate"],function(a,b,c){a("./lib/fixoldbrowsers");var d=a("./lib/dom"),e=a("./lib/event"),f=a("./editor").Editor,g=a("./edit_session").EditSession,h=a("./undomanager").UndoManager,i=a("./virtual_renderer").VirtualRenderer,j=a("./multi_select").MultiSelect;a("./worker/worker_client"),a("./keyboard/hash_handler"),a("./keyboard/state_handler"),a("./placeholder"),b.config=a("./config"),b.edit=function(b){typeof b=="string"&&(b=document.getElementById(b));if(b.env&&b.env.editor instanceof f)return b.env.editor;var c=new g(d.getInnerText(b));c.setUndoManager(new h),b.innerHTML="";var k=new f(new i(b,a("./theme/textmate")));new j(k),k.setSession(c);var l={};return l.document=c,l.editor=k,k.resize(),e.addListener(window,"resize",function(){k.resize()}),b.env=l,k.env=l,k}}),define("ace/lib/fixoldbrowsers",["require","exports","module","ace/lib/regexp","ace/lib/es5-shim"],function(a,b,c){a("./regexp"),a("./es5-shim")}),define("ace/lib/regexp",["require","exports","module"],function(a,b,c){function g(a){return(a.global?"g":"")+(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.extended?"x":"")+(a.sticky?"y":"")}function h(a,b,c){if(Array.prototype.indexOf)return a.indexOf(b,c);for(var d=c||0;d<a.length;d++)if(a[d]===b)return d;return-1}var d={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},e=d.exec.call(/()??/,"")[1]===undefined,f=function(){var a=/^/g;return d.test.call(a,""),!a.lastIndex}();if(f&&e)return;RegExp.prototype.exec=function(a){var b=d.exec.apply(this,arguments),c,i;if(typeof a=="string"&&b){!e&&b.length>1&&h(b,"")>-1&&(i=RegExp(this.source,d.replace.call(g(this),"g","")),d.replace.call(a.slice(b.index),i,function(){for(var a=1;a<arguments.length-2;a++)arguments[a]===undefined&&(b[a]=undefined)}));if(this._xregexp&&this._xregexp.captureNames)for(var j=1;j<b.length;j++)c=this._xregexp.captureNames[j-1],c&&(b[c]=b[j]);!f&&this.global&&!b[0].length&&this.lastIndex>b.index&&this.lastIndex--}return b},f||(RegExp.prototype.test=function(a){var b=d.exec.call(this,a);return b&&this.global&&!b[0].length&&this.lastIndex>b.index&&this.lastIndex--,!!b})}),define("ace/lib/es5-shim",["require","exports","module"],function(a,b,c){function p(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(b){}}Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=g.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,h=c.apply(f,d.concat(g.call(arguments)));return h!==null&&Object(h)===h?h:f}return c.apply(b,d.concat(g.call(arguments)))};return e});var d=Function.prototype.call,e=Array.prototype,f=Object.prototype,g=e.slice,h=d.bind(f.toString),i=d.bind(f.hasOwnProperty),j,k,l,m,n;if(n=i(f,"__defineGetter__"))j=d.bind(f.__defineGetter__),k=d.bind(f.__defineSetter__),l=d.bind(f.__lookupGetter__),m=d.bind(f.__lookupSetter__);Array.isArray||(Array.isArray=function(b){return h(b)=="[object Array]"}),Array.prototype.forEach||(Array.prototype.forEach=function(b){var c=G(this),d=arguments[1],e=0,f=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;while(e<f)e in c&&b.call(d,c[e],e,c),e++}),Array.prototype.map||(Array.prototype.map=function(b){var c=G(this),d=c.length>>>0,e=Array(d),f=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var g=0;g<d;g++)g in c&&(e[g]=b.call(f,c[g],g,c));return e}),Array.prototype.filter||(Array.prototype.filter=function(b){var c=G(this),d=c.length>>>0,e=[],f=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var g=0;g<d;g++)g in c&&b.call(f,c[g],g,c)&&e.push(c[g]);return e}),Array.prototype.every||(Array.prototype.every=function(b){var c=G(this),d=c.length>>>0,e=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var f=0;f<d;f++)if(f in c&&!b.call(e,c[f],f,c))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(b){var c=G(this),d=c.length>>>0,e=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var f=0;f<d;f++)if(f in c&&b.call(e,c[f],f,c))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(b){var c=G(this),d=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;if(!d&&arguments.length==1)throw new TypeError;var e=0,f;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);for(;e<d;e++)e in c&&(f=b.call(void 0,f,c[e],e,c));return f}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(b){var c=G(this),d=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;if(!d&&arguments.length==1)throw new TypeError;var e,f=d-1;if(arguments.length>=2)e=arguments[1];else do{if(f in c){e=c[f--];break}if(--f<0)throw new TypeError}while(!0);do f in this&&(e=b.call(void 0,e,c[f],f,c));while(f--);return e}),Array.prototype.indexOf||(Array.prototype.indexOf=function(b){var c=G(this),d=c.length>>>0;if(!d)return-1;var e=0;arguments.length>1&&(e=E(arguments[1])),e=e>=0?e:Math.max(0,d+e);for(;e<d;e++)if(e in c&&c[e]===b)return e;return-1}),Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(b){var c=G(this),d=c.length>>>0;if(!d)return-1;var e=d-1;arguments.length>1&&(e=Math.min(e,E(arguments[1]))),e=e>=0?e:d-Math.abs(e);for(;e>=0;e--)if(e in c&&b===c[e])return e;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(b){return b.__proto__||(b.constructor?b.constructor.prototype:f)});if(!Object.getOwnPropertyDescriptor){var o="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(b,c){if(typeof b!="object"&&typeof b!="function"||b===null)throw new TypeError(o+b);if(!i(b,c))return;var d,e,g;d={enumerable:!0,configurable:!0};if(n){var h=b.__proto__;b.__proto__=f;var e=l(b,c),g=m(b,c);b.__proto__=h;if(e||g)return e&&(d.get=e),g&&(d.set=g),d}return d.value=b[c],d}}Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(b){return Object.keys(b)}),Object.create||(Object.create=function(b,c){var d;if(b===null)d={__proto__:null};else{if(typeof b!="object")throw new TypeError("typeof prototype["+typeof b+"] != 'object'");var e=function(){};e.prototype=b,d=new e,d.__proto__=b}return c!==void 0&&Object.defineProperties(d,c),d});if(Object.defineProperty){var q=p({}),r=typeof document=="undefined"||p(document.createElement("div"));if(!q||!r)var s=Object.defineProperty}if(!Object.defineProperty||s){var t="Property description must be an object: ",u="Object.defineProperty called on non-object: ",v="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(b,c,d){if(typeof b!="object"&&typeof b!="function"||b===null)throw new TypeError(u+b);if(typeof d!="object"&&typeof d!="function"||d===null)throw new TypeError(t+d);if(s)try{return s.call(Object,b,c,d)}catch(e){}if(i(d,"value"))if(n&&(l(b,c)||m(b,c))){var g=b.__proto__;b.__proto__=f,delete b[c],b[c]=d.value,b.__proto__=g}else b[c]=d.value;else{if(!n)throw new TypeError(v);i(d,"get")&&j(b,c,d.get),i(d,"set")&&k(b,c,d.set)}return b}}Object.defineProperties||(Object.defineProperties=function(b,c){for(var d in c)i(c,d)&&Object.defineProperty(b,d,c[d]);return b}),Object.seal||(Object.seal=function(b){return b}),Object.freeze||(Object.freeze=function(b){return b});try{Object.freeze(function(){})}catch(w){Object.freeze=function(b){return function(c){return typeof c=="function"?c:b(c)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(b){return b}),Object.isSealed||(Object.isSealed=function(b){return!1}),Object.isFrozen||(Object.isFrozen=function(b){return!1}),Object.isExtensible||(Object.isExtensible=function(b){if(Object(b)===b)throw new TypeError;var c="";while(i(b,c))c+="?";b[c]=!0;var d=i(b,c);return delete b[c],d});if(!Object.keys){var x=!0,y=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],z=y.length;for(var A in{toString:null})x=!1;Object.keys=function H(a){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.keys called on a non-object");var H=[];for(var b in a)i(a,b)&&H.push(b);if(x)for(var c=0,d=z;c<d;c++){var e=y[c];i(a,e)&&H.push(e)}return H}}if(!Date.prototype.toISOString||(new Date(-621987552e5)).toISOString().indexOf("-000001")===-1)Date.prototype.toISOString=function(){var b,c,d,e;if(!isFinite(this))throw new RangeError;b=[this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],e=this.getUTCFullYear(),e=(e<0?"-":e>9999?"+":"")+("00000"+Math.abs(e)).slice(0<=e&&e<=9999?-4:-6),c=b.length;while(c--)d=b[c],d<10&&(b[c]="0"+d);return e+"-"+b.slice(0,2).join("-")+"T"+b.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"};Date.now||(Date.now=function(){return(new Date).getTime()}),Date.prototype.toJSON||(Date.prototype.toJSON=function(b){if(typeof this.toISOString!="function")throw new TypeError;return this.toISOString()}),Date.parse("+275760-09-13T00:00:00.000Z")!==864e13&&(Date=function(a){var b=function e(b,c,d,f,g,h,i){var j=arguments.length;if(this instanceof a){var k=j==1&&String(b)===b?new a(e.parse(b)):j>=7?new a(b,c,d,f,g,h,i):j>=6?new a(b,c,d,f,g,h):j>=5?new a(b,c,d,f,g):j>=4?new a(b,c,d,f):j>=3?new a(b,c,d):j>=2?new a(b,c):j>=1?new a(b):new a;return k.constructor=e,k}return a.apply(this,arguments)},c=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");for(var d in a)b[d]=a[d];return b.now=a.now,b.UTC=a.UTC,b.prototype=a.prototype,b.prototype.constructor=b,b.parse=function(d){var e=c.exec(d);if(e){e.shift();for(var f=1;f<7;f++)e[f]=+(e[f]||(f<3?1:0)),f==1&&e[f]--;var g=+e.pop(),h=+e.pop(),i=e.pop(),j=0;if(i){if(h>23||g>59)return NaN;j=(h*60+g)*6e4*(i=="+"?-1:1)}var k=+e[0];return 0<=k&&k<=99?(e[0]=k+400,a.UTC.apply(this,e)+j-126227808e5):a.UTC.apply(this,e)+j}return a.parse.apply(this,arguments)},b}(Date));var B="	\n\f\r   ᠎             　\u2028\u2029﻿";if(!String.prototype.trim||B.trim()){B="["+B+"]";var C=new RegExp("^"+B+B+"*"),D=new RegExp(B+B+"*$");String.prototype.trim=function(){return String(this).replace(C,"").replace(D,"")}}var E=function(a){return a=+a,a!==a?a=0:a!==0&&a!==1/0&&a!==-Infinity&&(a=(a>0||-1)*Math.floor(Math.abs(a))),a},F="a"[0]!="a",G=function(a){if(a==null)throw new TypeError;return F&&typeof a=="string"&&a?a.split(""):Object(a)}}),define("ace/lib/dom",["require","exports","module"],function(a,b,c){var d="http://www.w3.org/1999/xhtml";b.createElement=function(a,b){return document.createElementNS?document.createElementNS(b||d,a):document.createElement(a)},b.setText=function(a,b){a.innerText!==undefined&&(a.innerText=b),a.textContent!==undefined&&(a.textContent=b)},b.hasCssClass=function(a,b){var c=a.className.split(/\s+/g);return c.indexOf(b)!==-1},b.addCssClass=function(a,c){b.hasCssClass(a,c)||(a.className+=" "+c)},b.removeCssClass=function(a,b){var c=a.className.split(/\s+/g);for(;;){var d=c.indexOf(b);if(d==-1)break;c.splice(d,1)}a.className=c.join(" ")},b.toggleCssClass=function(a,b){var c=a.className.split(/\s+/g),d=!0;for(;;){var e=c.indexOf(b);if(e==-1)break;d=!1,c.splice(e,1)}return d&&c.push(b),a.className=c.join(" "),d},b.setCssClass=function(a,c,d){d?b.addCssClass(a,c):b.removeCssClass(a,c)},b.hasCssString=function(a,b){var c=0,d;b=b||document;if(b.createStyleSheet&&(d=b.styleSheets)){while(c<d.length)if(d[c++].owningElement.id===a)return!0}else if(d=b.getElementsByTagName("style"))while(c<d.length)if(d[c++].id===a)return!0;return!1},b.importCssString=function(c,e,f){f=f||document;if(e&&b.hasCssString(e,f))return null;var g;if(f.createStyleSheet)g=f.createStyleSheet(),g.cssText=c,e&&(g.owningElement.id=e);else{g=f.createElementNS?f.createElementNS(d,"style"):f.createElement("style"),g.appendChild(f.createTextNode(c)),e&&(g.id=e);var h=f.getElementsByTagName("head")[0]||f.documentElement;h.appendChild(g)}},b.importCssStylsheet=function(a,c){if(c.createStyleSheet)c.createStyleSheet(a);else{var d=b.createElement("link");d.rel="stylesheet",d.href=a;var e=c.getElementsByTagName("head")[0]||c.documentElement;e.appendChild(d)}},b.getInnerWidth=function(a){return parseInt(b.computedStyle(a,"paddingLeft"),10)+parseInt(b.computedStyle(a,"paddingRight"),10)+a.clientWidth},b.getInnerHeight=function(a){return parseInt(b.computedStyle(a,"paddingTop"),10)+parseInt(b.computedStyle(a,"paddingBottom"),10)+a.clientHeight},window.pageYOffset!==undefined?(b.getPageScrollTop=function(){return window.pageYOffset},b.getPageScrollLeft=function(){return window.pageXOffset}):(b.getPageScrollTop=function(){return document.body.scrollTop},b.getPageScrollLeft=function(){return document.body.scrollLeft}),window.getComputedStyle?b.computedStyle=function(a,b){return b?(window.getComputedStyle(a,"")||{})[b]||"":window.getComputedStyle(a,"")||{}}:b.computedStyle=function(a,b){return b?a.currentStyle[b]:a.currentStyle},b.scrollbarWidth=function(a){var c=b.createElement("p");c.style.width="100%",c.style.minWidth="0px",c.style.height="200px";var d=b.createElement("div"),e=d.style;e.position="absolute",e.left="-10000px",e.overflow="hidden",e.width="200px",e.minWidth="0px",e.height="150px",d.appendChild(c);var f=a.body||a.documentElement;f.appendChild(d);var g=c.offsetWidth;e.overflow="scroll";var h=c.offsetWidth;return g==h&&(h=d.clientWidth),f.removeChild(d),g-h},b.setInnerHtml=function(a,b){var c=a.cloneNode(!1);return c.innerHTML=b,a.parentNode.replaceChild(c,a),c},b.setInnerText=function(a,b){var c=a.ownerDocument;c.body&&"textContent"in c.body?a.textContent=b:a.innerText=b},b.getInnerText=function(a){var b=a.ownerDocument;return b.body&&"textContent"in b.body?a.textContent:a.innerText||a.textContent||""},b.getParentWindow=function(a){return a.defaultView||a.parentWindow}}),define("ace/lib/event",["require","exports","module","ace/lib/keys","ace/lib/useragent","ace/lib/dom"],function(a,b,c){function g(a,b,c){var f=0;e.isOpera&&e.isMac?f=0|(b.metaKey?1:0)|(b.altKey?2:0)|(b.shiftKey?4:0)|(b.ctrlKey?8:0):f=0|(b.ctrlKey?1:0)|(b.altKey?2:0)|(b.shiftKey?4:0)|(b.metaKey?8:0);if(c in d.MODIFIER_KEYS){switch(d.MODIFIER_KEYS[c]){case"Alt":f=2;break;case"Shift":f=4;break;case"Ctrl":f=1;break;default:f=8}c=0}return f&8&&(c==91||c==93)&&(c=0),!!f||c in d.FUNCTION_KEYS||c in d.PRINTABLE_KEYS?a(b,f,c):!1}var d=a("./keys"),e=a("./useragent"),f=a("./dom");b.addListener=function(a,b,c){if(a.addEventListener)return a.addEventListener(b,c,!1);if(a.attachEvent){var d=function(){c(window.event)};c._wrapper=d,a.attachEvent("on"+b,d)}},b.removeListener=function(a,b,c){if(a.removeEventListener)return a.removeEventListener(b,c,!1);a.detachEvent&&a.detachEvent("on"+b,c._wrapper||c)},b.stopEvent=function(a){return b.stopPropagation(a),b.preventDefault(a),!1},b.stopPropagation=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},b.preventDefault=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},b.getButton=function(a){return a.type=="dblclick"?0:a.type=="contextmenu"||a.ctrlKey&&e.isMac?2:a.preventDefault?a.button:{1:0,2:2,4:1}[a.button]},document.documentElement.setCapture?b.capture=function(a,c,d){function e(a){return c(a),b.stopPropagation(a)}function g(e){c(e),f||(f=!0,d(e)),b.removeListener(a,"mousemove",c),b.removeListener(a,"mouseup",g),b.removeListener(a,"losecapture",g),a.releaseCapture()}var f=!1;b.addListener(a,"mousemove",c),b.addListener(a,"mouseup",g),b.addListener(a,"losecapture",g),a.setCapture()}:b.capture=function(a,b,c){function d(a){b(a),a.stopPropagation()}function e(a){b&&b(a),c&&c(a),document.removeEventListener("mousemove",d,!0),document.removeEventListener("mouseup",e,!0),a.stopPropagation()}document.addEventListener("mousemove",d,!0),document.addEventListener("mouseup",e,!0)},b.addMouseWheelListener=function(a,c){var d=8,e=function(a){a.wheelDelta!==undefined?a.wheelDeltaX!==undefined?(a.wheelX=-a.wheelDeltaX/d,a.wheelY=-a.wheelDeltaY/d):(a.wheelX=0,a.wheelY=-a.wheelDelta/d):a.axis&&a.axis==a.HORIZONTAL_AXIS?(a.wheelX=(a.detail||0)*5,a.wheelY=0):(a.wheelX=0,a.wheelY=(a.detail||0)*5),c(a)};b.addListener(a,"DOMMouseScroll",e),b.addListener(a,"mousewheel",e)},b.addMultiMouseDownListener=function(a,c,d,f){var g=0,h,i,j,k={2:"dblclick",3:"tripleclick",4:"quadclick"},l=function(a){if(b.getButton(a)!=0)g=0;else{var e=Math.abs(a.clientX-h)>5||Math.abs(a.clientY-i)>5;if(!j||e)g=0;g+=1,j&&clearTimeout(j),j=setTimeout(function(){j=null},c[g-1]||600)}g==1&&(h=a.clientX,i=a.clientY),d[f]("mousedown",a);if(g>4)g=0;else if(g>1)return d[f](k[g],a)};b.addListener(a,"mousedown",l),e.isOldIE&&b.addListener(a,"dblclick",l)},b.addCommandKeyListener=function(a,c){var d=b.addListener;if(e.isOldGecko||e.isOpera){var f=null;d(a,"keydown",function(a){f=a.keyCode}),d(a,"keypress",function(a){return g(c,a,f)})}else{var h=null;d(a,"keydown",function(a){return h=a.keyIdentifier||a.keyCode,g(c,a,a.keyCode)})}};if(window.postMessage){var h=1;b.nextTick=function(a,c){c=c||window;var d="zero-timeout-message-"+h;b.addListener(c,"message",function e(f){f.data==d&&(b.stopPropagation(f),b.removeListener(c,"message",e),a())}),c.postMessage(d,"*")}}else b.nextTick=function(a,b){b=b||window,window.setTimeout(a,0)}}),define("ace/lib/keys",["require","exports","module","ace/lib/oop"],function(a,b,c){var d=a("./oop"),e=function(){var a={MODIFIER_KEYS:{16:"Shift",17:"Ctrl",18:"Alt",224:"Meta"},KEY_MODS:{ctrl:1,alt:2,option:2,shift:4,meta:8,command:8},FUNCTION_KEYS:{8:"Backspace",9:"Tab",13:"Return",19:"Pause",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"Print",45:"Insert",46:"Delete",96:"Numpad0",97:"Numpad1",98:"Numpad2",99:"Numpad3",100:"Numpad4",101:"Numpad5",102:"Numpad6",103:"Numpad7",104:"Numpad8",105:"Numpad9",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Numlock",145:"Scrolllock"},PRINTABLE_KEYS:{32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"}};for(var b in a.FUNCTION_KEYS){var c=a.FUNCTION_KEYS[b].toUpperCase();a[c]=parseInt(b,10)}return d.mixin(a,a.MODIFIER_KEYS),d.mixin(a,a.PRINTABLE_KEYS),d.mixin(a,a.FUNCTION_KEYS),a}();d.mixin(b,e),b.keyCodeToString=function(a){return(e[a]||String.fromCharCode(a)).toLowerCase()}}),define("ace/lib/oop",["require","exports","module"],function(a,b,c){b.inherits=function(){var a=function(){};return function(b,c){a.prototype=c.prototype,b.super_=c.prototype,b.prototype=new a,b.prototype.constructor=b}}(),b.mixin=function(a,b){for(var c in b)a[c]=b[c]},b.implement=function(a,c){b.mixin(a,c)}}),define("ace/lib/useragent",["require","exports","module"],function(a,b,c){var d=(navigator.platform.match(/mac|win|linux/i)||["other"])[0].toLowerCase(),e=navigator.userAgent;b.isWin=d=="win",b.isMac=d=="mac",b.isLinux=d=="linux",b.isIE=navigator.appName=="Microsoft Internet Explorer"&&parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]),b.isOldIE=b.isIE&&b.isIE<9,b.isGecko=b.isMozilla=window.controllers&&window.navigator.product==="Gecko",b.isOldGecko=b.isGecko&&parseInt((navigator.userAgent.match(/rv\:(\d+)/)||[])[1],10)<4,b.isOpera=window.opera&&Object.prototype.toString.call(window.opera)=="[object Opera]",b.isWebKit=parseFloat(e.split("WebKit/")[1])||undefined,b.isChrome=parseFloat(e.split(" Chrome/")[1])||undefined,b.isAIR=e.indexOf("AdobeAIR")>=0,b.isIPad=e.indexOf("iPad")>=0,b.isTouchPad=e.indexOf("TouchPad")>=0,b.OS={LINUX:"LINUX",MAC:"MAC",WINDOWS:"WINDOWS"},b.getOS=function(){return b.isMac?b.OS.MAC:b.isLinux?b.OS.LINUX:b.OS.WINDOWS}}),define("ace/editor",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/oop","ace/lib/lang","ace/lib/useragent","ace/keyboard/textinput","ace/mouse/mouse_handler","ace/mouse/fold_handler","ace/keyboard/keybinding","ace/edit_session","ace/search","ace/range","ace/lib/event_emitter","ace/commands/command_manager","ace/commands/default_commands"],function(a,b,c){a("./lib/fixoldbrowsers");var d=a("./lib/oop"),e=a("./lib/lang"),f=a("./lib/useragent"),g=a("./keyboard/textinput").TextInput,h=a("./mouse/mouse_handler").MouseHandler,i=a("./mouse/fold_handler").FoldHandler,j=a("./keyboard/keybinding").KeyBinding,k=a("./edit_session").EditSession,l=a("./search").Search,m=a("./range").Range,n=a("./lib/event_emitter").EventEmitter,o=a("./commands/command_manager").CommandManager,p=a("./commands/default_commands").commands,q=function(a,b){var c=a.getContainerElement();this.container=c,this.renderer=a,this.commands=new o(f.isMac?"mac":"win",p),this.textInput=new g(a.getTextAreaContainer(),this),this.renderer.textarea=this.textInput.getElement(),this.keyBinding=new j(this),f.isIPad||(this.$mouseHandler=new h(this),new i(this)),this.$blockScrolling=0,this.$search=(new l).set({wrap:!0}),this.setSession(b||new k(""))};(function(){d.implement(this,n),this.setKeyboardHandler=function(a){this.keyBinding.setKeyboardHandler(a)},this.getKeyboardHandler=function(){return this.keyBinding.getKeyboardHandler()},this.setSession=function(a){if(this.session==a)return;if(this.session){var b=this.session;this.session.removeEventListener("change",this.$onDocumentChange),this.session.removeEventListener("changeMode",this.$onChangeMode),this.session.removeEventListener("tokenizerUpdate",this.$onTokenizerUpdate),this.session.removeEventListener("changeTabSize",this.$onChangeTabSize),this.session.removeEventListener("changeWrapLimit",this.$onChangeWrapLimit),this.session.removeEventListener("changeWrapMode",this.$onChangeWrapMode),this.session.removeEventListener("onChangeFold",this.$onChangeFold),this.session.removeEventListener("changeFrontMarker",this.$onChangeFrontMarker),this.session.removeEventListener("changeBackMarker",this.$onChangeBackMarker),this.session.removeEventListener("changeBreakpoint",this.$onChangeBreakpoint),this.session.removeEventListener("changeAnnotation",this.$onChangeAnnotation),this.session.removeEventListener("changeOverwrite",this.$onCursorChange),this.session.removeEventListener("changeScrollTop",this.$onScrollTopChange),this.session.removeEventListener("changeLeftTop",this.$onScrollLeftChange);var c=this.session.getSelection();c.removeEventListener("changeCursor",this.$onCursorChange),c.removeEventListener("changeSelection",this.$onSelectionChange)}this.session=a,this.$onDocumentChange=this.onDocumentChange.bind(this),a.addEventListener("change",this.$onDocumentChange),this.renderer.setSession(a),this.$onChangeMode=this.onChangeMode.bind(this),a.addEventListener("changeMode",this.$onChangeMode),this.$onTokenizerUpdate=this.onTokenizerUpdate.bind(this),a.addEventListener("tokenizerUpdate",this.$onTokenizerUpdate),this.$onChangeTabSize=this.renderer.updateText.bind(this.renderer),a.addEventListener("changeTabSize",this.$onChangeTabSize),this.$onChangeWrapLimit=this.onChangeWrapLimit.bind(this),a.addEventListener("changeWrapLimit",this.$onChangeWrapLimit),this.$onChangeWrapMode=this.onChangeWrapMode.bind(this),a.addEventListener("changeWrapMode",this.$onChangeWrapMode),this.$onChangeFold=this.onChangeFold.bind(this),a.addEventListener("changeFold",this.$onChangeFold),this.$onChangeFrontMarker=this.onChangeFrontMarker.bind(this),this.session.addEventListener("changeFrontMarker",this.$onChangeFrontMarker),this.$onChangeBackMarker=this.onChangeBackMarker.bind(this),this.session.addEventListener("changeBackMarker",this.$onChangeBackMarker),this.$onChangeBreakpoint=this.onChangeBreakpoint.bind(this),this.session.addEventListener("changeBreakpoint",this.$onChangeBreakpoint),this.$onChangeAnnotation=this.onChangeAnnotation.bind(this),this.session.addEventListener("changeAnnotation",this.$onChangeAnnotation),this.$onCursorChange=this.onCursorChange.bind(this),this.session.addEventListener("changeOverwrite",this.$onCursorChange),this.$onScrollTopChange=this.onScrollTopChange.bind(this),this.session.addEventListener("changeScrollTop",this.$onScrollTopChange),this.$onScrollLeftChange=this.onScrollLeftChange.bind(this),this.session.addEventListener("changeScrollLeft",this.$onScrollLeftChange),this.selection=a.getSelection(),this.selection.addEventListener("changeCursor",this.$onCursorChange),this.$onSelectionChange=this.onSelectionChange.bind(this),this.selection.addEventListener("changeSelection",this.$onSelectionChange),this.onChangeMode(),this.$blockScrolling+=1,this.onCursorChange(),this.$blockScrolling-=1,this.onScrollTopChange(),this.onScrollLeftChange(),this.onSelectionChange(),this.onChangeFrontMarker(),this.onChangeBackMarker(),this.onChangeBreakpoint(),this.onChangeAnnotation(),this.session.getUseWrapMode()&&this.renderer.adjustWrapLimit(),this.renderer.updateFull(),this._emit("changeSession",{session:a,oldSession:b})},this.getSession=function(){return this.session},this.setValue=function(a,b){return this.session.doc.setValue(a),b?b==1?this.navigateFileEnd():b==-1&&this.navigateFileStart():this.selectAll(),a},this.getValue=function(){return this.session.getValue()},this.getSelection=function(){return this.selection},this.resize=function(a){this.renderer.onResize(a)},this.setTheme=function(a){this.renderer.setTheme(a)},this.getTheme=function(){return this.renderer.getTheme()},this.setStyle=function(a){this.renderer.setStyle(a)},this.unsetStyle=function(a){this.renderer.unsetStyle(a)},this.setFontSize=function(a){this.container.style.fontSize=a,this.renderer.updateFontSize()},this.$highlightBrackets=function(){this.session.$bracketHighlight&&(this.session.removeMarker(this.session.$bracketHighlight),this.session.$bracketHighlight=null);if(this.$highlightPending)return;var a=this;this.$highlightPending=!0,setTimeout(function(){a.$highlightPending=!1;var b=a.session.findMatchingBracket(a.getCursorPosition());if(b){var c=new m(b.row,b.column,b.row,b.column+1);a.session.$bracketHighlight=a.session.addMarker(c,"ace_bracket","text")}},10)},this.focus=function(){var a=this;setTimeout(function(){a.textInput.focus()}),this.textInput.focus()},this.isFocused=function(){return this.textInput.isFocused()},this.blur=function(){this.textInput.blur()},this.onFocus=function(){if(this.$isFocused)return;this.$isFocused=!0,this.renderer.showCursor(),this.renderer.visualizeFocus(),this._emit("focus")},this.onBlur=function(){if(!this.$isFocused)return;this.$isFocused=!1,this.renderer.hideCursor(),this.renderer.visualizeBlur(),this._emit("blur")},this.$cursorChange=function(){this.renderer.updateCursor()},this.onDocumentChange=function(a){var b=a.data,c=b.range,d;c.start.row==c.end.row&&b.action!="insertLines"&&b.action!="removeLines"?d=c.end.row:d=Infinity,this.renderer.updateLines(c.start.row,d),this._emit("change",a),this.$cursorChange()},this.onTokenizerUpdate=function(a){var b=a.data;this.renderer.updateLines(b.first,b.last)},this.onScrollTopChange=function(){this.renderer.scrollToY(this.session.getScrollTop())},this.onScrollLeftChange=function(){this.renderer.scrollToX(this.session.getScrollLeft())},this.onCursorChange=function(){this.$cursorChange(),this.$blockScrolling||this.renderer.scrollCursorIntoView(),this.$highlightBrackets(),this.$updateHighlightActiveLine()},this.$updateHighlightActiveLine=function(){var a=this.getSession();a.$highlightLineMarker&&a.removeMarker(a.$highlightLineMarker),a.$highlightLineMarker=null;if(this.$highlightActiveLine){var b=this.getCursorPosition(),c=this.session.getFoldLine(b.row);if(this.getSelectionStyle()!="line"||!this.selection.isMultiLine()){var d;c?d=new m(c.start.row,0,c.end.row+1,0):d=new m(b.row,0,b.row+1,0),a.$highlightLineMarker=a.addMarker(d,"ace_active_line","background")}}},this.onSelectionChange=function(a){var b=this.session;b.$selectionMarker&&b.removeMarker(b.$selectionMarker),b.$selectionMarker=null;if(!this.selection.isEmpty()){var c=this.selection.getRange(),d=this.getSelectionStyle();b.$selectionMarker=b.addMarker(c,"ace_selection",d)}else this.$updateHighlightActiveLine();var e=this.$highlightSelectedWord&&this.$getSelectionHighLightRegexp();this.session.highlight(e)},this.$getSelectionHighLightRegexp=function(){var a=this.session,b=this.getSelectionRange();if(b.isEmpty()||b.isMultiLine())return;var c=b.start.column-1,d=b.end.column+1,e=a.getLine(b.start.row),f=e.length,g=e.substring(Math.max(c,0),Math.min(d,f));if(c>=0&&/^[\w\d]/.test(g)||d<=f&&/[\w\d]$/.test(g))return;g=e.substring(b.start.column,b.end.column);if(!/^[\w\d]+$/.test(g))return;var h=this.$search.$assembleRegExp({wholeWord:!0,caseSensitive:!0,needle:g});return h},this.onChangeFrontMarker=function(){this.renderer.updateFrontMarkers()},this.onChangeBackMarker=function(){this.renderer.updateBackMarkers()},this.onChangeBreakpoint=function(){this.renderer.updateBreakpoints()},this.onChangeAnnotation=function(){this.renderer.setAnnotations(this.session.getAnnotations())},this.onChangeMode=function(){this.renderer.updateText()},this.onChangeWrapLimit=function(){this.renderer.updateFull()},this.onChangeWrapMode=function(){this.renderer.onResize(!0)},this.onChangeFold=function(){this.$updateHighlightActiveLine(),this.renderer.updateFull()},this.getCopyText=function(){var a="";return this.selection.isEmpty()||(a=this.session.getTextRange(this.getSelectionRange())),this._emit("copy",a),a},this.onCopy=function(){this.commands.exec("copy",this)},this.onCut=function(){this.commands.exec("cut",this)},this.onPaste=function(a){this._emit("paste",a),this.insert(a)},this.insert=function(a){var b=this.session,c=b.getMode(),d=this.getCursorPosition();if(this.getBehavioursEnabled()){var e=c.transformAction(b.getState(d.row),"insertion",this,b,a);e&&(a=e.text)}a=a.replace("	",this.session.getTabString());if(!this.selection.isEmpty())d=this.session.remove(this.getSelectionRange()),this.clearSelection();else if(this.session.getOverwrite()){var f=new m.fromPoints(d,d);f.end.column+=a.length,this.session.remove(f)}this.clearSelection();var g=d.column,h=b.getState(d.row),i=c.checkOutdent(h,b.getLine(d.row),a),j=b.getLine(d.row),k=c.getNextLineIndent(h,j.slice(0,d.column),b.getTabString()),l=b.insert(d,a);e&&e.selection&&(e.selection.length==2?this.selection.setSelectionRange(new m(d.row,g+e.selection[0],d.row,g+e.selection[1])):this.selection.setSelectionRange(new m(d.row+e.selection[0],e.selection[1],d.row+e.selection[2],e.selection[3])));var h=b.getState(d.row);if(b.getDocument().isNewLine(a)){this.moveCursorTo(d.row+1,0);var n=b.getTabSize(),o=Number.MAX_VALUE;for(var p=d.row+1;p<=l.row;++p){var q=0;j=b.getLine(p);for(var r=0;r<j.length;++r)if(j.charAt(r)=="	")q+=n;else{if(j.charAt(r)!=" ")break;q+=1}/[^\s]/.test(j)&&(o=Math.min(q,o))}for(var p=d.row+1;p<=l.row;++p){var s=o;j=b.getLine(p);for(var r=0;r<j.length&&s>0;++r)j.charAt(r)=="	"?s-=n:j.charAt(r)==" "&&(s-=1);b.remove(new m(p,0,p,r))}b.indentRows(d.row+1,l.row,k)}i&&c.autoOutdent(h,b,d.row)},this.onTextInput=function(a){this.keyBinding.onTextInput(a)},this.onCommandKey=function(a,b,c){this.keyBinding.onCommandKey(a,b,c)},this.setOverwrite=function(a){this.session.setOverwrite(a)},this.getOverwrite=function(){return this.session.getOverwrite()},this.toggleOverwrite=function(){this.session.toggleOverwrite()},this.setScrollSpeed=function(a){this.$mouseHandler.setScrollSpeed(a)},this.getScrollSpeed=function(){return this.$mouseHandler.getScrollSpeed()},this.setDragDelay=function(a){this.$mouseHandler.setDragDelay(a)},this.getDragDelay=function(){return this.$mouseHandler.getDragDelay()},this.$selectionStyle="line",this.setSelectionStyle=function(a){if(this.$selectionStyle==a)return;this.$selectionStyle=a,this.onSelectionChange(),this._emit("changeSelectionStyle",{data:a})},this.getSelectionStyle=function(){return this.$selectionStyle},this.$highlightActiveLine=!0,this.setHighlightActiveLine=function(a){if(this.$highlightActiveLine==a)return;this.$highlightActiveLine=a,this.$updateHighlightActiveLine()},this.getHighlightActiveLine=function(){return this.$highlightActiveLine},this.$highlightGutterLine=!0,this.setHighlightGutterLine=function(a){if(this.$highlightGutterLine==a)return;this.renderer.setHighlightGutterLine(a),this.$highlightGutterLine=a},this.getHighlightGutterLine=function(){return this.$highlightGutterLine},this.$highlightSelectedWord=!0,this.setHighlightSelectedWord=function(a){if(this.$highlightSelectedWord==a)return;this.$highlightSelectedWord=a,this.$onSelectionChange()},this.getHighlightSelectedWord=function(){return this.$highlightSelectedWord},this.setAnimatedScroll=function(a){this.renderer.setAnimatedScroll(a)},this.getAnimatedScroll=function(){return this.renderer.getAnimatedScroll()},this.setShowInvisibles=function(a){if(this.getShowInvisibles()==a)return;this.renderer.setShowInvisibles(a)},this.getShowInvisibles=function(){return this.renderer.getShowInvisibles()},this.setShowPrintMargin=function(a){this.renderer.setShowPrintMargin(a)},this.getShowPrintMargin=function(){return this.renderer.getShowPrintMargin()},this.setPrintMarginColumn=function(a){this.renderer.setPrintMarginColumn(a)},this.getPrintMarginColumn=function(){return this.renderer.getPrintMarginColumn()},this.$readOnly=!1,this.setReadOnly=function(a){this.$readOnly=a},this.getReadOnly=function(){return this.$readOnly},this.$modeBehaviours=!0,this.setBehavioursEnabled=function(a){this.$modeBehaviours=a},this.getBehavioursEnabled=function(){return this.$modeBehaviours},this.setShowFoldWidgets=function(a){var b=this.renderer.$gutterLayer;if(b.getShowFoldWidgets()==a)return;this.renderer.$gutterLayer.setShowFoldWidgets(a),this.$showFoldWidgets=a,this.renderer.updateFull()},this.getShowFoldWidgets=function(){return this.renderer.$gutterLayer.getShowFoldWidgets()},this.setFadeFoldWidgets=function(a){this.renderer.setFadeFoldWidgets(a)},this.getFadeFoldWidgets=function(){return this.renderer.getFadeFoldWidgets()},this.remove=function(a){this.selection.isEmpty()&&(a=="left"?this.selection.selectLeft():this.selection.selectRight());var b=this.getSelectionRange();if(this.getBehavioursEnabled()){var c=this.session,d=c.getState(b.start.row),e=c.getMode().transformAction(d,"deletion",this,c,b);e&&(b=e)}this.session.remove(b),this.clearSelection()},this.removeWordRight=function(){this.selection.isEmpty()&&this.selection.selectWordRight(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeWordLeft=function(){this.selection.isEmpty()&&this.selection.selectWordLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeToLineStart=function(){this.selection.isEmpty()&&this.selection.selectLineStart(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeToLineEnd=function(){this.selection.isEmpty()&&this.selection.selectLineEnd();var a=this.getSelectionRange();a.start.column==a.end.column&&a.start.row==a.end.row&&(a.end.column=0,a.end.row++),this.session.remove(a),this.clearSelection()},this.splitLine=function(){this.selection.isEmpty()||(this.session.remove(this.getSelectionRange()),this.clearSelection());var a=this.getCursorPosition();this.insert("\n"),this.moveCursorToPosition(a)},this.transposeLetters=function(){if(!this.selection.isEmpty())return;var a=this.getCursorPosition(),b=a.column;if(b===0)return;var c=this.session.getLine(a.row),d,e;b<c.length?(d=c.charAt(b)+c.charAt(b-1),e=new m(a.row,b-1,a.row,b+1)):(d=c.charAt(b-1)+c.charAt(b-2),e=new m(a.row,b-2,a.row,b)),this.session.replace(e,d)},this.toLowerCase=function(){var a=this.getSelectionRange();this.selection.isEmpty()&&this.selection.selectWord();var b=this.getSelectionRange(),c=this.session.getTextRange(b);this.session.replace(b,c.toLowerCase()),this.selection.setSelectionRange(a)},this.toUpperCase=function(){var a=this.getSelectionRange();this.selection.isEmpty()&&this.selection.selectWord();var b=this.getSelectionRange(),c=this.session.getTextRange(b);this.session.replace(b,c.toUpperCase()),this.selection.setSelectionRange(a)},this.indent=function(){var a=this.session,b=this.getSelectionRange();if(!(b.start.row<b.end.row||b.start.column<b.end.column)){var d;if(this.session.getUseSoftTabs()){var f=a.getTabSize(),g=this.getCursorPosition(),h=a.documentToScreenColumn(g.row,g.column),i=f-h%f;d=e.stringRepeat(" ",i)}else d="	";return this.insert(d)}var c=this.$getSelectedRows();a.indentRows(c.first,c.last,"	")},this.blockOutdent=function(){var a=this.session.getSelection();this.session.outdentRows(a.getRange())},this.toggleCommentLines=function(){var a=this.session.getState(this.getCursorPosition().row),b=this.$getSelectedRows();this.session.getMode().toggleCommentLines(a,this.session,b.first,b.last)},this.removeLines=function(){var a=this.$getSelectedRows(),b;a.first===0||a.last+1<this.session.getLength()?b=new m(a.first,0,a.last+1,0):b=new m(a.first-1,this.session.getLine(a.first-1).length,a.last,this.session.getLine(a.last).length),this.session.remove(b),this.clearSelection()},this.duplicateSelection=function(){var a=this.selection,b=this.session,c=a.getRange();if(c.isEmpty()){var d=c.start.row;b.duplicateLines(d,d)}else{var e=a.isBackwards(),f=a.isBackwards()?c.start:c.end,g=b.insert(f,b.getTextRange(c),!1);c.start=f,c.end=g,a.setSelectionRange(c,e)}},this.moveLinesDown=function(){this.$moveLines(function(a,b){return this.session.moveLinesDown(a,b)})},this.moveLinesUp=function(){this.$moveLines(function(a,b){return this.session.moveLinesUp(a,b)})},this.moveText=function(a,b){return this.$readOnly?null:this.session.moveText(a,b)},this.copyLinesUp=function(){this.$moveLines(function(a,b){return this.session.duplicateLines(a,b),0})},this.copyLinesDown=function(){this.$moveLines(function(a,b){return this.session.duplicateLines(a,b)})},this.$moveLines=function(a){var b=this.$getSelectedRows(),c=this.selection;if(!c.isMultiLine())var d=c.getRange(),e=c.isBackwards();var f=a.call(this,b.first,b.last);d?(d.start.row+=f,d.end.row+=f,c.setSelectionRange(d,e)):(c.setSelectionAnchor(b.last+f+1,0),c.$moveSelection(function(){c.moveCursorTo(b.first+f,0)}))},this.$getSelectedRows=function(){var a=this.getSelectionRange().collapseRows();return{first:a.start.row,last:a.end.row}},this.onCompositionStart=function(a){this.renderer.showComposition(this.getCursorPosition())},this.onCompositionUpdate=function(a){this.renderer.setCompositionText(a)},this.onCompositionEnd=function(){this.renderer.hideComposition()},this.getFirstVisibleRow=function(){return this.renderer.getFirstVisibleRow()},this.getLastVisibleRow=function(){return this.renderer.getLastVisibleRow()},this.isRowVisible=function(a){return a>=this.getFirstVisibleRow()&&a<=this.getLastVisibleRow()},this.isRowFullyVisible=function(a){return a>=this.renderer.getFirstFullyVisibleRow()&&a<=this.renderer.getLastFullyVisibleRow()},this.$getVisibleRowCount=function(){return this.renderer.getScrollBottomRow()-this.renderer.getScrollTopRow()+1},this.$moveByPage=function(a,b){var c=this.renderer,d=this.renderer.layerConfig,e=a*Math.floor(d.height/d.lineHeight);this.$blockScrolling++,b==1?this.selection.$moveSelection(function(){this.moveCursorBy(e,0)}):b==0&&(this.selection.moveCursorBy(e,0),this.selection.clearSelection()),this.$blockScrolling--;var f=c.scrollTop;c.scrollBy(0,e*d.lineHeight),b!=null&&c.scrollCursorIntoView(null,.5),c.animateScrolling(f)},this.selectPageDown=function(){this.$moveByPage(1,!0)},this.selectPageUp=function(){this.$moveByPage(-1,!0)},this.gotoPageDown=function(){this.$moveByPage(1,!1)},this.gotoPageUp=function(){this.$moveByPage(-1,!1)},this.scrollPageDown=function(){this.$moveByPage(1)},this.scrollPageUp=function(){this.$moveByPage(-1)},this.scrollToRow=function(a){this.renderer.scrollToRow(a)},this.scrollToLine=function(a,b,c,d){this.renderer.scrollToLine(a,b,c,d)},this.centerSelection=function(){var a=this.getSelectionRange(),b={row:Math.floor(a.start.row+(a.end.row-a.start.row)/2),column:Math.floor(a.start.column+(a.end.column-a.start.column)/2)};this.renderer.alignCursor(b,.5)},this.getCursorPosition=function(){return this.selection.getCursor()},this.getCursorPositionScreen=function(){return this.session.documentToScreenPosition(this.getCursorPosition())},this.getSelectionRange=function(){return this.selection.getRange()},this.selectAll=function(){this.$blockScrolling+=1,this.selection.selectAll(),this.$blockScrolling-=1},this.clearSelection=function(){this.selection.clearSelection()},this.moveCursorTo=function(a,b){this.selection.moveCursorTo(a,b)},this.moveCursorToPosition=function(a){this.selection.moveCursorToPosition(a)},this.jumpToMatching=function(a){var b=this.getCursorPosition(),c=this.session.getBracketRange(b);if(!c){c=editor.find({needle:/[{}()\[\]]/g,preventScroll:!0,start:{row:b.row,column:b.column-1}});if(!c)return;var d=c.start;d.row==b.row&&Math.abs(d.column-b.column)<2&&(c=this.session.getBracketRange(d))}d=c&&c.cursor||d,d&&(a?c&&c.isEqual(editor.getSelectionRange())?this.clearSelection():this.selection.selectTo(d.row,d.column):(this.clearSelection(),this.moveCursorTo(d.row,d.column)))},this.gotoLine=function(a,b,c){this.selection.clearSelection(),this.session.unfold({row:a-1,column:b||0}),this.$blockScrolling+=1,this.moveCursorTo(a-1,b||0),this.$blockScrolling-=1,this.isRowFullyVisible(a-1)||this.scrollToLine(a-1,!0,c)},this.navigateTo=function(a,b){this.clearSelection(),this.moveCursorTo(a,b)},this.navigateUp=function(a){this.selection.clearSelection(),a=a||1,this.selection.moveCursorBy(-a,0)},this.navigateDown=function(a){this.selection.clearSelection(),a=a||1,this.selection.moveCursorBy(a,0)},this.navigateLeft=function(a){if(!this.selection.isEmpty()){var b=this.getSelectionRange().start;this.moveCursorToPosition(b)}else{a=a||1;while(a--)this.selection.moveCursorLeft()}this.clearSelection()},this.navigateRight=function(a){if(!this.selection.isEmpty()){var b=this.getSelectionRange().end;this.moveCursorToPosition(b)}else{a=a||1;while(a--)this.selection.moveCursorRight()}this.clearSelection()},this.navigateLineStart=function(){this.selection.moveCursorLineStart(),this.clearSelection()},this.navigateLineEnd=function(){this.selection.moveCursorLineEnd(),this.clearSelection()},this.navigateFileEnd=function(){var a=this.renderer.scrollTop;this.selection.moveCursorFileEnd(),this.clearSelection(),this.renderer.animateScrolling(a)},this.navigateFileStart=function(){var a=this.renderer.scrollTop;this.selection.moveCursorFileStart(),this.clearSelection(),this.renderer.animateScrolling(a)},this.navigateWordRight=function(){this.selection.moveCursorWordRight(),this.clearSelection()},this.navigateWordLeft=function(){this.selection.moveCursorWordLeft(),this.clearSelection()},this.replace=function(a,b){b&&this.$search.set(b);var c=this.$search.find(this.session),d=0;return c?(this.$tryReplace(c,a)&&(d=1),c!==null&&(this.selection.setSelectionRange(c),this.renderer.scrollSelectionIntoView(c.start,c.end)),d):d},this.replaceAll=function(a,b){b&&this.$search.set(b);var c=this.$search.findAll(this.session),d=0;if(!c.length)return d;this.$blockScrolling+=1;var e=this.getSelectionRange();this.clearSelection(),this.selection.moveCursorTo(0,0);for(var f=c.length-1;f>=0;--f)this.$tryReplace(c[f],a)&&d++;return this.selection.setSelectionRange(e),this.$blockScrolling-=1,d},this.$tryReplace=function(a,b){var c=this.session.getTextRange(a);return b=this.$search.replace(c,b),b!==null?(a.end=this.session.replace(a,b),a):null},this.getLastSearchOptions=function(){return this.$search.getOptions()},this.find=function(a,b,c){b||(b={}),typeof a=="string"||a instanceof RegExp?b.needle=a:typeof a=="object"&&d.mixin(b,a);var e=this.selection.getRange();b.needle==null&&(a=this.session.getTextRange(e)||this.$search.$options.needle,a||(e=this.session.getWordRange(e.start.row,e.start.column),a=this.session.getTextRange(e)),this.$search.set({needle:a})),this.$search.set(b),b.start||this.$search.set({start:e});var f=this.$search.find(this.session);if(b.preventScroll)return f;if(f)return this.revealRange(f,c),f;b.backwards?e.start=e.end:e.end=e.start,this.selection.setRange(e)},this.findNext=function(a,b){this.find({skipCurrent:!0,backwards:!1},a,b)},this.findPrevious=function(a,b){this.find(a,{skipCurrent:!0,backwards:!0},b)},this.revealRange=function(a,b){this.$blockScrolling+=1,this.session.unfold(a),this.selection.setSelectionRange(a),this.$blockScrolling-=1;var c=this.renderer.scrollTop;this.renderer.scrollSelectionIntoView(a.start,a.end,.5),b!=0&&this.renderer.animateScrolling(c)},this.undo=function(){this.$blockScrolling++,this.session.getUndoManager().undo(),this.$blockScrolling--,this.renderer.scrollCursorIntoView(null,.5)},this.redo=function(){this.$blockScrolling++,this.session.getUndoManager().redo(),this.$blockScrolling--,this.renderer.scrollCursorIntoView(null,.5)},this.destroy=function(){this.renderer.destroy()}}).call(q.prototype),b.Editor=q}),define("ace/lib/lang",["require","exports","module"],function(a,b,c){b.stringReverse=function(a){return a.split("").reverse().join("")},b.stringRepeat=function(a,b){return(new Array(b+1)).join(a)};var d=/^\s\s*/,e=/\s\s*$/;b.stringTrimLeft=function(a){return a.replace(d,"")},b.stringTrimRight=function(a){return a.replace(e,"")},b.copyObject=function(a){var b={};for(var c in a)b[c]=a[c];return b},b.copyArray=function(a){var b=[];for(var c=0,d=a.length;c<d;c++)a[c]&&typeof a[c]=="object"?b[c]=this.copyObject(a[c]):b[c]=a[c];return b},b.deepCopy=function(a){if(typeof a!="object")return a;var b=a.constructor();for(var c in a)typeof a[c]=="object"?b[c]=this.deepCopy(a[c]):b[c]=a[c];return b},b.arrayToMap=function(a){var b={};for(var c=0;c<a.length;c++)b[a[c]]=1;return b},b.arrayRemove=function(a,b){for(var c=0;c<=a.length;c++)b===a[c]&&a.splice(c,1)},b.escapeRegExp=function(a){return a.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},b.getMatchOffsets=function(a,b){var c=[];return a.replace(b,function(a){c.push({offset:arguments[arguments.length-2],length:a.length})}),c},b.deferredCall=function(a){var b=null,c=function(){b=null,a()},d=function(a){return d.cancel(),b=setTimeout(c,a||0),d};return d.schedule=d,d.call=function(){return this.cancel(),a(),d},d.cancel=function(){return clearTimeout(b),b=null,d},d}}),define("ace/keyboard/textinput",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/lib/dom"],function(a,b,c){var d=a("../lib/event"),e=a("../lib/useragent"),f=a("../lib/dom"),g=function(a,b){function l(a){try{a?(c.value=g,c.selectionStart=0,c.selectionEnd=1):c.select()}catch(b){}}function m(a){if(!i){var d=a||c.value;d&&(d.length>1&&(d.charAt(0)==g?d=d.substr(1):d.charAt(d.length-1)==g&&(d=d.slice(0,-1))),d&&d!=g&&(j?b.onPaste(d):b.onTextInput(d)))}i=!1,j=!1,l(!0)}function u(){return document.activeElement===c}function v(){setTimeout(function(){k&&(c.style.cssText=k,k=""),m(),b.renderer.$keepTextAreaAtCursor==null&&(b.renderer.$keepTextAreaAtCursor=!0,b.renderer.$moveTextAreaToCursor())},0)}var c=f.createElement("textarea");e.isTouchPad&&c.setAttribute("x-palm-disable-auto-cap",!0),c.setAttribute("wrap","off"),c.style.top="-2em",a.insertBefore(c,a.firstChild);var g=e.isIE?"":"";m();var h=!1,i=!1,j=!1,k="",n=function(a){h||m(a.data),setTimeout(function(){h||l(!0)},0)},o=function(a){setTimeout(function(){h||m()},0)},p=function(a){h=!0,b.onCompositionStart(),setTimeout(q,0)},q=function(){if(!h)return;b.onCompositionUpdate(c.value)},r=function(a){h=!1,b.onCompositionEnd()},s=function(a){i=!0;var d=b.getCopyText();d?c.value=d:a.preventDefault(),l(),setTimeout(function(){m()},0)},t=function(a){i=!0;var d=b.getCopyText();d?(c.value=d,b.onCut()):a.preventDefault(),l(),setTimeout(function(){m()},0)};d.addCommandKeyListener(c,b.onCommandKey.bind(b)),d.addListener(c,"input",e.isIE?o:n),d.addListener(c,"paste",function(a){j=!0,a.clipboardData&&a.clipboardData.getData?(m(a.clipboardData.getData("text/plain")),a.preventDefault()):o()}),"onbeforecopy"in c&&typeof clipboardData!="undefined"?(d.addListener(c,"beforecopy",function(a){if(k)return;var c=b.getCopyText();c?clipboardData.setData("Text",c):a.preventDefault()}),d.addListener(a,"keydown",function(a){if(a.ctrlKey&&a.keyCode==88){var c=b.getCopyText();c&&(clipboardData.setData("Text",c),b.onCut()),d.preventDefault(a)}}),d.addListener(c,"cut",t)):e.isOpera?d.addListener(a,"keydown",function(a){if(e.isMac&&!a.metaKey||!a.ctrlKey)return;if(a.keyCode==88||a.keyCode==67){var d=b.getCopyText();d&&(c.value=d,c.select(),a.keyCode==88&&b.onCut())}}):(d.addListener(c,"copy",s),d.addListener(c,"cut",t)),d.addListener(c,"compositionstart",p),e.isGecko&&d.addListener(c,"text",q),e.isWebKit&&d.addListener(c,"keyup",q),d.addListener(c,"compositionend",r),d.addListener(c,"blur",function(){b.onBlur()}),d.addListener(c,"focus",function(){b.onFocus(),l()}),this.focus=function(){l(),c.focus()},this.blur=function(){c.blur()},this.isFocused=u,this.getElement=function(){return c},this.onContextMenu=function(a){k||(k=c.style.cssText),c.style.cssText="position:fixed; z-index:100000;left:"+(a.clientX-2)+"px; top:"+(a.clientY-2)+"px;",b.selection.isEmpty()&&(c.value="");if(a.type!="mousedown")return;b.renderer.$keepTextAreaAtCursor&&(b.renderer.$keepTextAreaAtCursor=null),e.isGecko&&e.isWin&&d.capture(b.container,function(a){c.style.left=a.clientX-2+"px",c.style.top=a.clientY-2+"px"},v)},this.onContextMenuClose=v,e.isGecko||d.addListener(c,"contextmenu",function(a){b.textInput.onContextMenu(a),v()})};b.TextInput=g}),define("ace/mouse/mouse_handler",["require","exports","module","ace/lib/event","ace/mouse/default_handlers","ace/mouse/default_gutter_handler","ace/mouse/mouse_event","ace/mouse/dragdrop"],function(a,b,c){var d=a("../lib/event"),e=a("./default_handlers").DefaultHandlers,f=a("./default_gutter_handler").GutterHandler,g=a("./mouse_event").MouseEvent,h=a("./dragdrop").DragdropHandler,i=function(a){this.editor=a,new e(this),new f(this),new h(this),d.addListener(a.container,"mousedown",function(b){return a.focus(),d.preventDefault(b)});var b=a.renderer.getMouseEventTarget();d.addListener(b,"click",this.onMouseEvent.bind(this,"click")),d.addListener(b,"mousemove",this.onMouseMove.bind(this,"mousemove")),d.addMultiMouseDownListener(b,[300,300,250],this,"onMouseEvent"),d.addMouseWheelListener(a.container,this.onMouseWheel.bind(this,"mousewheel"));var c=a.renderer.$gutter;d.addListener(c,"mousedown",this.onMouseEvent.bind(this,"guttermousedown")),d.addListener(c,"click",this.onMouseEvent.bind(this,"gutterclick")),d.addListener(c,"dblclick",this.onMouseEvent.bind(this,"gutterdblclick")),d.addListener(c,"mousemove",this.onMouseMove.bind(this,"gutter"))};(function(){this.$scrollSpeed=1,this.setScrollSpeed=function(a){this.$scrollSpeed=a},this.getScrollSpeed=function(){return this.$scrollSpeed},this.onMouseEvent=function(a,b){this.editor._emit(a,new g(b,this.editor))},this.$dragDelay=250,this.setDragDelay=function(a){this.$dragDelay=a},this.getDragDelay=function(){return this.$dragDelay},this.onMouseMove=function(a,b){var c=this.editor._eventRegistry&&this.editor._eventRegistry.mousemove;if(!c||!c.length)return;this.editor._emit(a,new g(b,this.editor))},this.onMouseWheel=function(a,b){var c=new g(b,this.editor);c.speed=this.$scrollSpeed*2,c.wheelX=b.wheelX,c.wheelY=b.wheelY,this.editor._emit(a,c)},this.setState=function(a){this.state=a},this.captureMouse=function(a,b){b&&this.setState(b),this.x=a.x,this.y=a.y;var c=this.editor.renderer;c.$keepTextAreaAtCursor&&(c.$keepTextAreaAtCursor=null);var e=this,f=function(a){e.x=a.clientX,e.y=a.clientY},g=function(a){clearInterval(i),e[e.state+"End"]&&e[e.state+"End"](a),e.$clickSelection=null,c.$keepTextAreaAtCursor==null&&(c.$keepTextAreaAtCursor=!0,c.$moveTextAreaToCursor())},h=function(){e[e.state]&&e[e.state]()};d.capture(this.editor.container,f,g);var i=setInterval(h,20)}}).call(i.prototype),b.MouseHandler=i}),define("ace/mouse/default_handlers",["require","exports","module","ace/lib/dom","ace/lib/useragent"],function(a,b,c){function g(a){a.$clickSelection=null;var b=a.editor;b.setDefaultHandler("mousedown",this.onMouseDown.bind(a)),b.setDefaultHandler("dblclick",this.onDoubleClick.bind(a)),b.setDefaultHandler("tripleclick",this.onTripleClick.bind(a)),b.setDefaultHandler("quadclick",this.onQuadClick.bind(a)),b.setDefaultHandler("mousewheel",this.onScroll.bind(a));var c=["select","startSelect","drag","dragEnd","dragWait","dragWaitEnd","startDrag","focusWait"];c.forEach(function(b){a[b]=this[b]},this),a.selectByLines=this.extendSelectionBy.bind(a,"getLineRange"),a.selectByWords=this.extendSelectionBy.bind(a,"getWordRange"),a.$focusWaitTimout=250}function h(a,b,c,d){return Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2))}function i(a,b){if(a.start.row==a.end.row)var c=2*b.column-a.start.column-a.end.column;else var c=2*b.row-a.start.row-a.end.row;return c<0?{cursor:a.start,anchor:a.end}:{cursor:a.end,anchor:a.start}}var d=a("../lib/dom"),e=a("../lib/useragent"),f=5;(function(){this.onMouseDown=function(a){var b=a.inSelection(),c=a.getDocumentPosition();this.mousedownEvent=a;var d=this.editor,e=this,f=a.getButton();if(f!==0){var g=d.getSelectionRange(),h=g.isEmpty();h&&(d.moveCursorToPosition(c),d.selection.clearSelection()),d.textInput.onContextMenu(a.domEvent);return}if(b&&!d.isFocused()){d.focus();if(this.$focusWaitTimout&&!this.$clickSelection)return this.setState("focusWait"),this.captureMouse(a),a.preventDefault()}return!b||this.$clickSelection||a.getShiftKey()?this.startSelect(c):b&&(this.mousedownEvent.time=(new Date).getTime(),this.setState("dragWait")),this.captureMouse(a),a.preventDefault()},this.startSelect=function(a){a=a||this.editor.renderer.screenToTextCoordinates(this.x,this.y),this.mousedownEvent.getShiftKey()?this.editor.selection.selectToPosition(a):this.$clickSelection||(this.editor.moveCursorToPosition(a),this.editor.selection.clearSelection()),this.setState("select")},this.select=function(){var a,b=this.editor,c=b.renderer.screenToTextCoordinates(this.x,this.y);if(this.$clickSelection){var d=this.$clickSelection.comparePoint(c);if(d==-1)a=this.$clickSelection.end;else if(d==1)a=this.$clickSelection.start;else{var e=i(this.$clickSelection,c);c=e.cursor,a=e.anchor}b.selection.setSelectionAnchor(a.row,a.column)}b.selection.selectToPosition(c),b.renderer.scrollCursorIntoView()},this.extendSelectionBy=function(a){var b,c=this.editor,d=c.renderer.screenToTextCoordinates(this.x,this.y),e=c.selection[a](d.row,d.column);if(this.$clickSelection){var f=this.$clickSelection.comparePoint(e.start),g=this.$clickSelection.comparePoint(e.end);if(f==-1&&g<=0)b=this.$clickSelection.end,d=e.start;else if(g==1&&f>=0)b=this.$clickSelection.start,d=e.end;else if(f==-1&&g==1)d=e.end,b=e.start;else{var h=i(this.$clickSelection,d);d=h.cursor,b=h.anchor}c.selection.setSelectionAnchor(b.row,b.column)}c.selection.selectToPosition(d),c.renderer.scrollCursorIntoView()},this.startDrag=function(){var a=this.editor;this.setState("drag"),this.dragRange=a.getSelectionRange();var b=a.getSelectionStyle();this.dragSelectionMarker=a.session.addMarker(this.dragRange,"ace_selection",b),a.clearSelection(),d.addCssClass(a.container,"ace_dragging"),this.$dragKeybinding||(this.$dragKeybinding={handleKeyboard:function(a,b,c,d){if(c=="esc")return{command:this.command}},command:{exec:function(a){var b=a.$mouseHandler;b.dragCursor=null,b.dragEnd(),b.startSelect()}}}),a.keyBinding.addKeyboardHandler(this.$dragKeybinding)},this.focusWait=function(){var a=h(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y),b=(new Date).getTime();(a>f||b-this.mousedownEvent.time>this.$focusWaitTimout)&&this.startSelect()},this.dragWait=function(a){var b=h(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y),c=(new Date).getTime(),d=this.editor;b>f?this.startSelect():c-this.mousedownEvent.time>d.getDragDelay()&&this.startDrag()},this.dragWaitEnd=function(a){this.mousedownEvent.domEvent=a,this.startSelect()},this.drag=function(){var a=this.editor;this.dragCursor=a.renderer.screenToTextCoordinates(this.x,this.y),a.moveCursorToPosition(this.dragCursor),a.renderer.scrollCursorIntoView()},this.dragEnd=function(a){var b=this.editor,c=this.dragCursor,e=this.dragRange;d.removeCssClass(b.container,"ace_dragging"),b.session.removeMarker(this.dragSelectionMarker),b.keyBinding.removeKeyboardHandler(this.$dragKeybinding);if(!c)return;b.clearSelection();if(a&&(a.ctrlKey||a.altKey)){var f=b.session,g=e;g.end=f.insert(c,f.getTextRange(e)),g.start=c}else{if(e.contains(c.row,c.column))return;var g=b.moveText(e,c)}if(!g)return;b.selection.setSelectionRange(g)},this.onDoubleClick=function(a){var b=a.getDocumentPosition(),c=this.editor,d=c.session,e=d.getBracketRange(b);if(e){e.isEmpty()&&(e.start.column--,e.end.column++),this.$clickSelection=e,this.setState("select");return}this.$clickSelection=c.selection.getWordRange(b.row,b.column),this.setState("selectByWords")},this.onTripleClick=function(a){var b=a.getDocumentPosition(),c=this.editor;this.setState("selectByLines"),c.moveCursorToPosition(b),c.selection.selectLine(),this.$clickSelection=c.getSelectionRange()},this.onQuadClick=function(a){var b=this.editor;b.selectAll(),this.$clickSelection=b.getSelectionRange(),this.setState("null")},this.onScroll=function(a){var b=this.editor,c=b.renderer.isScrollableBy(a.wheelX*a.speed,a.wheelY*a.speed);if(c)this.$passScrollEvent=!1;else{if(this.$passScrollEvent)return;if(!this.$scrollStopTimeout){var d=this;this.$scrollStopTimeout=setTimeout(function(){d.$passScrollEvent=!0,d.$scrollStopTimeout=null},200)}}return b.renderer.scrollBy(a.wheelX*a.speed,a.wheelY*a.speed),a.preventDefault()}}).call(g.prototype),b.DefaultHandlers=g}),define("ace/mouse/default_gutter_handler",["require","exports","module","ace/lib/dom"],function(a,b,c){function e(a){var b=a.editor;a.editor.setDefaultHandler("guttermousedown",function(c){var e=c.domEvent.target;if(e.className.indexOf("ace_gutter-cell")==-1)return;if(!b.isFocused())return;var f=parseInt(d.computedStyle(e).paddingLeft);if(c.x<f+e.getBoundingClientRect().left+1)return;var g=c.getDocumentPosition().row,h=b.session.selection;return c.getShiftKey()?h.selectTo(g,0):(h.moveCursorTo(g,0),h.selectLine(),a.$clickSelection=h.getRange()),a.captureMouse(c,"selectByLines"),c.preventDefault()})}var d=a("../lib/dom");b.GutterHandler=e}),define("ace/mouse/mouse_event",["require","exports","module","ace/lib/event","ace/lib/useragent"],function(a,b,c){var d=a("../lib/event"),e=a("../lib/useragent"),f=b.MouseEvent=function(a,b){this.domEvent=a,this.editor=b,this.x=this.clientX=a.clientX,this.y=this.clientY=a.clientY,this.$pos=null,this.$inSelection=null,this.propagationStopped=!1,this.defaultPrevented=!1};(function(){this.stopPropagation=function(){d.stopPropagation(this.domEvent),this.propagationStopped=!0},this.preventDefault=function(){d.preventDefault(this.domEvent),this.defaultPrevented=!0},this.stop=function(){this.stopPropagation(),this.preventDefault()},this.getDocumentPosition=function(){return this.$pos?this.$pos:(this.$pos=this.editor.renderer.screenToTextCoordinates(this.clientX,this.clientY),this.$pos)},this.inSelection=function(){if(this.$inSelection!==null)return this.$inSelection;var a=this.editor;if(a.getReadOnly())this.$inSelection=!1;else{var b=a.getSelectionRange();if(b.isEmpty())this.$inSelection=!1;else{var c=this.getDocumentPosition();this.$inSelection=b.contains(c.row,c.column)}}return this.$inSelection},this.getButton=function(){return d.getButton(this.domEvent)},this.getShiftKey=function(){return this.domEvent.shiftKey},this.getAccelKey=e.isMac?function(){return this.domEvent.metaKey}:function(){return this.domEvent.ctrlKey}}).call(f.prototype)}),define("ace/mouse/dragdrop",["require","exports","module","ace/lib/event"],function(a,b,c){var d=a("../lib/event"),e=function(a){var b=a.editor,c,e,f,g,h,i,j,k=0,l=b.container;d.addListener(l,"dragenter",function(a){console.log(a.type,k,a.target),k++;if(!c){h=b.getSelectionRange(),i=b.selection.isBackwards();var e=b.getSelectionStyle();c=b.session.addMarker(h,"ace_selection",e),b.clearSelection(),clearInterval(g),g=setInterval(m,20)}return d.preventDefault(a)}),d.addListener(l,"dragover",function(a){return e=a.clientX,f=a.clientY,d.preventDefault(a)});var m=function(){j=b.renderer.screenToTextCoordinates(e,f),b.moveCursorToPosition(j),b.renderer.scrollCursorIntoView()};d.addListener(l,"dragleave",function(a){console.log(a.type,k,a.target),k--;if(k>0)return;return console.log(a.type,k,a.target),clearInterval(g),b.session.removeMarker(c),c=null,b.selection.setSelectionRange(h,i),d.preventDefault(a)}),d.addListener(l,"drop",function(a){return console.log(a.type,k,a.target),k=0,clearInterval(g),b.session.removeMarker(c),c=null,h.end=b.session.insert(j,a.dataTransfer.getData("Text")),h.start=j,b.focus(),b.selection.setSelectionRange(h),d.preventDefault(a)})};b.DragdropHandler=e}),define("ace/mouse/fold_handler",["require","exports","module"],function(a,b,c){function d(a){a.on("click",function(b){var c=b.getDocumentPosition(),d=a.session,e=d.getFoldAt(c.row,c.column,1);e&&(b.getAccelKey()?d.removeFold(e):d.expandFold(e),b.stop())}),a.on("gutterclick",function(b){if(b.domEvent.target.className.indexOf("ace_fold-widget")!=-1){var c=b.getDocumentPosition().row;a.session.onFoldWidgetClick(c,b.domEvent),b.stop()}})}b.FoldHandler=d}),define("ace/keyboard/keybinding",["require","exports","module","ace/lib/keys","ace/lib/event"],function(a,b,c){var d=a("../lib/keys"),e=a("../lib/event"),f=function(a){this.$editor=a,this.$data={},this.$handlers=[],this.setDefaultHandler(a.commands)};(function(){this.setDefaultHandler=function(a){this.removeKeyboardHandler(this.$defaultHandler),this.$defaultHandler=a,this.addKeyboardHandler(a,0),this.$data={editor:this.$editor}},this.setKeyboardHandler=function(a){if(this.$handlers[this.$handlers.length-1]==a)return;while(this.$handlers[1])this.removeKeyboardHandler(this.$handlers[1]);this.addKeyboardHandler(a,1)},this.addKeyboardHandler=function(a,b){if(!a)return;var c=this.$handlers.indexOf(a);c!=-1&&this.$handlers.splice(c,1),b==undefined?this.$handlers.push(a):this.$handlers.splice(b,0,a),c==-1&&a.attach&&a.attach(this.$editor)},this.removeKeyboardHandler=function(a){var b=this.$handlers.indexOf(a);return b==-1?!1:(this.$handlers.splice(b,1),a.detach&&a.detach(this.$editor),!0)},this.getKeyboardHandler=function(){return this.$handlers[this.$handlers.length-1]},this.$callKeyboardHandlers=function(a,b,c,d){var f;for(var g=this.$handlers.length;g--;){f=this.$handlers[g].handleKeyboard(this.$data,a,b,c,d);if(f&&f.command)break}if(!f||!f.command)return!1;var h=!1,i=this.$editor.commands;return f.command!="null"?h=i.exec(f.command,this.$editor,f.args,d):h=f.passEvent!=1,h&&d&&a!=-1&&e.stopEvent(d),h},this.onCommandKey=function(a,b,c){var e=d.keyCodeToString(c);this.$callKeyboardHandlers(b,e,c,a)},this.onTextInput=function(a){var b=this.$callKeyboardHandlers(-1,a);b||this.$editor.commands.exec("insertstring",this.$editor,a)}}).call(f.prototype),b.KeyBinding=f}),define("ace/edit_session",["require","exports","module","ace/config","ace/lib/oop","ace/lib/lang","ace/lib/net","ace/lib/event_emitter","ace/selection","ace/mode/text","ace/range","ace/document","ace/background_tokenizer","ace/search_highlight","ace/edit_session/folding","ace/edit_session/bracket_match"],function(a,b,c){var d=a("./config"),e=a("./lib/oop"),f=a("./lib/lang"),g=a("./lib/net"),h=a("./lib/event_emitter").EventEmitter,i=a("./selection").Selection,j=a("./mode/text").Mode,k=a("./range").Range,l=a("./document").Document,m=a("./background_tokenizer").BackgroundTokenizer,n=a("./search_highlight").SearchHighlight,o=function(a,b){this.$modified=!0,this.$breakpoints=[],this.$frontMarkers={},this.$backMarkers={},this.$markerId=1,this.$resetRowCache(0),this.$wrapData=[],this.$foldData=[],this.$rowLengthCache=[],this.$undoSelect=!0,this.$foldData.toString=function(){var a="";return this.forEach(function(b){a+="\n"+b.toString()}),a},typeof a=="object"&&a.getLine?this.setDocument(a):this.setDocument(new l(a)),this.selection=new i(this),this.setMode(b)};(function(){function s(a){return a<4352?!1:a>=4352&&a<=4447||a>=4515&&a<=4519||a>=4602&&a<=4607||a>=9001&&a<=9002||a>=11904&&a<=11929||a>=11931&&a<=12019||a>=12032&&a<=12245||a>=12272&&a<=12283||a>=12288&&a<=12350||a>=12353&&a<=12438||a>=12441&&a<=12543||a>=12549&&a<=12589||a>=12593&&a<=12686||a>=12688&&a<=12730||a>=12736&&a<=12771||a>=12784&&a<=12830||a>=12832&&a<=12871||a>=12880&&a<=13054||a>=13056&&a<=19903||a>=19968&&a<=42124||a>=42128&&a<=42182||a>=43360&&a<=43388||a>=44032&&a<=55203||a>=55216&&a<=55238||a>=55243&&a<=55291||a>=63744&&a<=64255||a>=65040&&a<=65049||a>=65072&&a<=65106||a>=65108&&a<=65126||a>=65128&&a<=65131||a>=65281&&a<=65376||a>=65504&&a<=65510}e.implement(this,h),this.setDocument=function(a){if(this.doc)throw new Error("Document is already set");this.doc=a,a.on("change",this.onChange.bind(this)),this.on("changeFold",this.onChangeFold.bind(this)),this.bgTokenizer&&(this.bgTokenizer.setDocument(this.getDocument()),this.bgTokenizer.start(0))},this.getDocument=function(){return this.doc},this.$resetRowCache=function(a){if(!a){this.$docRowCache=[],this.$screenRowCache=[];return}var b=this.$getRowCacheIndex(this.$docRowCache,a)+1,c=this.$docRowCache.length;this.$docRowCache.splice(b,c),this.$screenRowCache.splice(b,c)},this.$getRowCacheIndex=function(a,b){var c=0,d=a.length-1;while(c<=d){var e=c+d>>1,f=a[e];if(b>f)c=e+1;else{if(!(b<f))return e;d=e-1}}return c&&c-1},this.onChangeFold=function(a){var b=a.data;this.$resetRowCache(b.start.row)},this.onChange=function(a){var b=a.data;this.$modified=!0,this.$resetRowCache(b.range.start.row);var c=this.$updateInternalDataOnChange(a);!this.$fromUndo&&this.$undoManager&&!b.ignore&&(this.$deltasDoc.push(b),c&&c.length!=0&&this.$deltasFold.push({action:"removeFolds",folds:c}),this.$informUndoManager.schedule()),this.bgTokenizer.$updateOnChange(b),this._emit("change",a)},this.setValue=function(a){this.doc.setValue(a),this.selection.moveCursorTo(0,0),this.selection.clearSelection(),this.$resetRowCache(0),this.$deltas=[],this.$deltasDoc=[],this.$deltasFold=[],this.getUndoManager().reset()},this.getValue=this.toString=function(){return this.doc.getValue()},this.getSelection=function(){return this.selection},this.getState=function(a){return this.bgTokenizer.getState(a)},this.getTokens=function(a){return this.bgTokenizer.getTokens(a)},this.getTokenAt=function(a,b){var c=this.bgTokenizer.getTokens(a),d,e=0;if(b==null)f=c.length-1,e=this.getLine(a).length;else for(var f=0;f<c.length;f++){e+=c[f].value.length;if(e>=b)break}return d=c[f],d?(d.index=f,d.start=e-d.value.length,d):null},this.highlight=function(a){if(!this.$searchHighlight){var b=new n(null,"ace_selected_word","text");this.$searchHighlight=this.addDynamicMarker(b)}this.$searchHighlight.setRegexp(a)},this.setUndoManager=function(a){this.$undoManager=a,this.$deltas=[],this.$deltasDoc=[],this.$deltasFold=[],this.$informUndoManager&&this.$informUndoManager.cancel();if(a){var b=this;this.$syncInformUndoManager=function(){b.$informUndoManager.cancel(),b.$deltasFold.length&&(b.$deltas.push({group:"fold",deltas:b.$deltasFold}),b.$deltasFold=[]),b.$deltasDoc.length&&(b.$deltas.push({group:"doc",deltas:b.$deltasDoc}),b.$deltasDoc=[]),b.$deltas.length>0&&a.execute({action:"aceupdate",args:[b.$deltas,b]}),b.$deltas=[]},this.$informUndoManager=f.deferredCall(this.$syncInformUndoManager)}},this.$defaultUndoManager={undo:function(){},redo:function(){},reset:function(){}},this.getUndoManager=function(){return this.$undoManager||this.$defaultUndoManager},this.getTabString=function(){return this.getUseSoftTabs()?f.stringRepeat(" ",this.getTabSize()):"	"},this.$useSoftTabs=!0,this.setUseSoftTabs=function(a){if(this.$useSoftTabs===a)return;this.$useSoftTabs=a},this.getUseSoftTabs=function(){return this.$useSoftTabs},this.$tabSize=4,this.setTabSize=function(a){if(isNaN(a)||this.$tabSize===a)return;this.$modified=!0,this.$rowLengthCache=[],this.$tabSize=a,this._emit("changeTabSize")},this.getTabSize=function(){return this.$tabSize},this.isTabStop=function(a){return this.$useSoftTabs&&a.column%this.$tabSize==0},this.$overwrite=!1,this.setOverwrite=function(a){if(this.$overwrite==a)return;this.$overwrite=a,this._emit("changeOverwrite")},this.getOverwrite=function(){return this.$overwrite},this.toggleOverwrite=function(){this.setOverwrite(!this.$overwrite)},this.getBreakpoints=function(){return this.$breakpoints},this.setBreakpoints=function(a){this.$breakpoints=[];for(var b=0;b<a.length;b++)this.$breakpoints[a[b]]=!0;this._emit("changeBreakpoint",{})},this.clearBreakpoints=function(){this.$breakpoints=[],this._emit("changeBreakpoint",{})},this.setBreakpoint=function(a){this.$breakpoints[a]=!0,this._emit("changeBreakpoint",{})},this.clearBreakpoint=function(a){delete this.$breakpoints[a],this._emit("changeBreakpoint",{})},this.addMarker=function(a,b,c,d){var e=this.$markerId++,f={range:a,type:c||"line",renderer:typeof c=="function"?c:null,clazz:b,inFront:!!d,id:e};return d?(this.$frontMarkers[e]=f,this._emit("changeFrontMarker")):(this.$backMarkers[e]=f,this._emit("changeBackMarker")),e},this.addDynamicMarker=function(a,b){if(!a.update)return;var c=this.$markerId++;return a.id=c,a.inFront=!!b,b?(this.$frontMarkers[c]=a,this._emit("changeFrontMarker")):(this.$backMarkers[c]=a,this._emit("changeBackMarker")),a},this.removeMarker=function(a){var b=this.$frontMarkers[a]||this.$backMarkers[a];if(!b)return;var c=b.inFront?this.$frontMarkers:this.$backMarkers;b&&(delete c[a],this._emit(b.inFront?"changeFrontMarker":"changeBackMarker"))},this.getMarkers=function(a){return a?this.$frontMarkers:this.$backMarkers},this.setAnnotations=function(a){this.$annotations={};for(var b=0;b<a.length;b++){var c=a[b],d=c.row;this.$annotations[d]?this.$annotations[d].push(c):this.$annotations[d]=[c]}this._emit("changeAnnotation",{})},this.getAnnotations=function(){return this.$annotations||{}},this.clearAnnotations=function(){this.$annotations={},this._emit("changeAnnotation",{})},this.$detectNewLine=function(a){var b=a.match(/^.*?(\r?\n)/m);b?this.$autoNewLine=b[1]:this.$autoNewLine="\n"},this.getWordRange=function(a,b){var c=this.getLine(a),d=!1;b>0&&(d=!!c.charAt(b-1).match(this.tokenRe)),d||(d=!!c.charAt(b).match(this.tokenRe));if(d)var e=this.tokenRe;else if(/^\s+$/.test(c.slice(b-1,b+1)))var e=/\s/;else var e=this.nonTokenRe;var f=b;if(f>0){do f--;while(f>=0&&c.charAt(f).match(e));f++}var g=b;while(g<c.length&&c.charAt(g).match(e))g++;return new k(a,f,a,g)},this.getAWordRange=function(a,b){var c=this.getWordRange(a,b),d=this.getLine(c.end.row);while(d.charAt(c.end.column).match(/[ \t]/))c.end.column+=1;return c},this.setNewLineMode=function(a){this.doc.setNewLineMode(a)},this.getNewLineMode=function(){return this.doc.getNewLineMode()},this.$useWorker=!0,this.setUseWorker=function(a){if(this.$useWorker==a)return;this.$useWorker=a,this.$stopWorker(),a&&this.$startWorker()},this.getUseWorker=function(){return this.$useWorker},this.onReloadTokenizer=function(a){var b=a.data;this.bgTokenizer.start(b.first),this._emit("tokenizerUpdate",a)},this.$modes={},this._loadMode=function(b,c){function i(a){if(e.$modes[b])return c(e.$modes[b]);e.$modes[b]=new a.Mode,e.$modes[b].$id=b,e._emit("loadmode",{name:b,mode:e.$modes[b]}),c(e.$modes[b])}function k(a){if(!d.get("packaged"))return a();var c=b.split("/").pop(),e=d.get("modePath")+"/mode-"+c+".js";g.loadScript(e,a)}this.$modes["null"]||(this.$modes["null"]=this.$modes["ace/mode/text"]=new j);if(this.$modes[b])return c(this.$modes[b]);var e=this,f;try{f=a(b)}catch(h){}if(f&&f.Mode)return i(f);this.$mode||this.$setModePlaceholder(),k(function(){a([b],i)})},this.$setModePlaceholder=function(){this.$mode=this.$modes["null"];var a=this.$mode.getTokenizer();if(!this.bgTokenizer){this.bgTokenizer=new m(a);var b=this;this.bgTokenizer.addEventListener("update",function(a){b._emit("tokenizerUpdate",a)})}else this.bgTokenizer.setTokenizer(a);this.bgTokenizer.setDocument(this.getDocument()),this.tokenRe=this.$mode.tokenRe,this.nonTokenRe=this.$mode.nonTokenRe},this.$mode=null,this.$modeId=null,this.setMode=function(a){a=a||"null";if(typeof a=="string"){if(this.$modeId==a)return;this.$modeId=a;var b=this;this._loadMode(a,function(c){if(b.$modeId!==a)return;b.setMode(c)});return}if(this.$mode===a)return;this.$mode=a,this.$modeId=a.$id,this.$stopWorker(),this.$useWorker&&this.$startWorker();var c=a.getTokenizer();if(c.addEventListener!==undefined){var d=this.onReloadTokenizer.bind(this);c.addEventListener("update",d)}if(!this.bgTokenizer){this.bgTokenizer=new m(c);var b=this;this.bgTokenizer.addEventListener("update",function(a){b._emit("tokenizerUpdate",a)})}else this.bgTokenizer.setTokenizer(c);this.bgTokenizer.setDocument(this.getDocument()),this.bgTokenizer.start(0),this.tokenRe=a.tokenRe,this.nonTokenRe=a.nonTokenRe,this.$setFolding(a.foldingRules),this._emit("changeMode")},this.$stopWorker=function(){this.$worker&&this.$worker.terminate(),this.$worker=null},this.$startWorker=function(){if(typeof Worker!="undefined"&&!a.noWorker)try{this.$worker=this.$mode.createWorker(this)}catch(b){console.log("Could not load worker"),console.log(b),this.$worker=null}else this.$worker=null},this.getMode=function(){return this.$mode},this.$scrollTop=0,this.setScrollTop=function(a){a=Math.round(Math.max(0,a));if(this.$scrollTop===a)return;this.$scrollTop=a,this._emit("changeScrollTop",a)},this.getScrollTop=function(){return this.$scrollTop},this.$scrollLeft=0,this.setScrollLeft=function(a){a=Math.round(Math.max(0,a));if(this.$scrollLeft===a)return;this.$scrollLeft=a,this._emit("changeScrollLeft",a)},this.getScrollLeft=function(){return this.$scrollLeft},this.getScreenWidth=function(){return this.$computeWidth(),this.screenWidth},this.$computeWidth=function(a){if(this.$modified||a){this.$modified=!1;if(this.$useWrapMode)return this.screenWidth=this.$wrapLimit;var b=this.doc.getAllLines(),c=this.$rowLengthCache,d=0,e=0,f=this.$foldData[e],g=f?f.start.row:Infinity,h=b.length;for(var i=0;i<h;i++){if(i>g){i=f.end.row+1;if(i>=h)break;f=this.$foldData[e++],g=f?f.start.row:Infinity}c[i]==null&&(c[i]=this.$getStringScreenWidth(b[i])[0]),c[i]>d&&(d=c[i])}this.screenWidth=d}},this.getLine=function(a){return this.doc.getLine(a)},this.getLines=function(a,b){return this.doc.getLines(a,b)},this.getLength=function(){return this.doc.getLength()},this.getTextRange=function(a){return this.doc.getTextRange(a||this.selection.getRange())},this.insert=function(a,b){return this.doc.insert(a,b)},this.remove=function(a){return this.doc.remove(a)},this.undoChanges=function(a,b){if(!a.length)return;this.$fromUndo=!0;var c=null;for(var d=a.length-1;d!=-1;d--){var e=a[d];e.group=="doc"?(this.doc.revertDeltas(e.deltas),c=this.$getUndoSelection(e.deltas,!0,c)):e.deltas.forEach(function(a){this.addFolds(a.folds)},this)}return this.$fromUndo=!1,c&&this.$undoSelect&&!b&&this.selection.setSelectionRange(c),c},this.redoChanges=function(a,b){if(!a.length)return;this.$fromUndo=!0;var c=null;for(var d=0;d<a.length;d++){var e=a[d];e.group=="doc"&&(this.doc.applyDeltas(e.deltas),c=this.$getUndoSelection(e.deltas,!1,c))}return this.$fromUndo=!1,c&&this.$undoSelect&&!b&&this.selection.setSelectionRange(c),c},this.setUndoSelect=function(a){this.$undoSelect=a},this.$getUndoSelection=function(a,b,c){function d(a){var c=a.action=="insertText"||a.action=="insertLines";return b?!c:c}var e=a[0],f,g,h=!1;d(e)?(f=e.range.clone(),h=!0):(f=k.fromPoints(e.range.start,e.range.start),h=!1);for(var i=1;i<a.length;i++)e=a[i],d(e)?(g=e.range.start,f.compare(g.row,g.column)==-1&&f.setStart(e.range.start),g=e.range.end,f.compare(g.row,g.column)==1&&f.setEnd(e.range.end),h=!0):(g=e.range.start,f.compare(g.row,g.column)==-1&&(f=k.fromPoints(e.range.start,e.range.start)),h=!1);if(c!=null){var j=c.compareRange(f);j==1?f.setStart(c.start):j==-1&&f.setEnd(c.end)}return f},this.replace=function(a,b){return this.doc.replace(a,b)},this.moveText=function(a,b){var c=this.getTextRange(a);this.remove(a);var d=b.row,e=b.column;!a.isMultiLine()&&a.start.row==d&&a.end.column<e&&(e-=c.length);if(a.isMultiLine()&&a.end.row<d){var f=this.doc.$split(c);d-=f.length-1}var g=d+a.end.row-a.start.row,h=a.isMultiLine()?a.end.column:e+a.end.column-a.start.column,i=new k(d,e,g,h);return this.insert(i.start,c),i},this.indentRows=function(a,b,c){c=c.replace(/\t/g,this.getTabString());for(var d=a;d<=b;d++)this.insert({row:d,column:0},c)},this.outdentRows=function(a){var b=a.collapseRows(),c=new k(0,0,0,0),d=this.getTabSize();for(var e=b.start.row;e<=b.end.row;++e){var f=this.getLine(e);c.start.row=e,c.end.row=e;for(var g=0;g<d;++g)if(f.charAt(g)!=" ")break;g<d&&f.charAt(g)=="	"?(c.start.column=g,c.end.column=g+1):(c.start.column=0,c.end.column=g),this.remove(c)}},this.moveLinesUp=function(a,b){if(a<=0)return 0;var c=this.doc.removeLines(a,b);return this.doc.insertLines(a-1,c),-1},this.moveLinesDown=function(a,b){if(b>=this.doc.getLength()-1)return 0;var c=this.doc.removeLines(a,b);return this.doc.insertLines(a+1,c),1},this.duplicateLines=function(a,b){var a=this.$clipRowToDocument(a),b=this.$clipRowToDocument(b),c=this.getLines(a,b);this.doc.insertLines(a,c);var d=b-a+1;return d},this.$clipRowToDocument=function(a){return Math.max(0,Math.min(a,this.doc.getLength()-1))},this.$clipColumnToRow=function(a,b){return b<0?0:Math.min(this.doc.getLine(a).length,b)},this.$clipPositionToDocument=function(a,b){b=Math.max(0,b);if(a<0)a=0,b=0;else{var c=this.doc.getLength();a>=c?(a=c-1,b=this.doc.getLine(c-1).length):b=Math.min(this.doc.getLine(a).length,b)}return{row:a,column:b}},this.$clipRangeToDocument=function(a){a.start.row<0?(a.start.row=0,a.start.column=0):a.start.column=this.$clipColumnToRow(a.start.row,a.start.column);var b=this.doc.getLength()-1;return a.end.row>b?(a.end.row=b,a.end.column=this.doc.getLine(b).length):a.end.column=this.$clipColumnToRow(a.end.row,a.end.column),a},this.$wrapLimit=80,this.$useWrapMode=!1,this.$wrapLimitRange={min:null,max:null},this.setUseWrapMode=function(a){if(a!=this.$useWrapMode){this.$useWrapMode=a,this.$modified=!0,this.$resetRowCache(0);if(a){var b=this.getLength();this.$wrapData=[];for(var c=0;c<b;c++)this.$wrapData.push([]);this.$updateWrapData(0,b-1)}this._emit("changeWrapMode")}},this.getUseWrapMode=function(){return this.$useWrapMode},this.setWrapLimitRange=function(a,b){if(this.$wrapLimitRange.min!==a||this.$wrapLimitRange.max!==b)this.$wrapLimitRange.min=a,this.$wrapLimitRange.max=b,this.$modified=!0,this._emit("changeWrapMode")},this.adjustWrapLimit=function(a){var b=this.$constrainWrapLimit(a);return b!=this.$wrapLimit&&b>0?(this.$wrapLimit=b,this.$modified=!0,this.$useWrapMode&&(this.$updateWrapData(0,this.getLength()-1),this.$resetRowCache(0),this._emit("changeWrapLimit")),!0):!1},this.$constrainWrapLimit=function(a){var b=this.$wrapLimitRange.min;b&&(a=Math.max(b,a));var c=this.$wrapLimitRange.max;return c&&(a=Math.min(c,a)),Math.max(1,a)},this.getWrapLimit=function(){return this.$wrapLimit},this.getWrapLimitRange=function(){return{min:this.$wrapLimitRange.min,max:this.$wrapLimitRange.max}},this.$updateInternalDataOnChange=function(a){var b=this.$useWrapMode,c,d=a.data.action,e=a.data.range.start.row,f=a.data.range.end.row,g=a.data.range.start,h=a.data.range.end,i=null;d.indexOf("Lines")!=-1?(d=="insertLines"?f=e+a.data.lines.length:f=e,c=a.data.lines?a.data.lines.length:f-e):c=f-e;if(c!=0)if(d.indexOf("remove")!=-1){this[b?"$wrapData":"$rowLengthCache"].splice(e,c);var j=this.$foldData;i=this.getFoldsInRange(a.data.range),this.removeFolds(i);var k=this.getFoldLine(h.row),l=0;if(k){k.addRemoveChars(h.row,h.column,g.column-h.column),k.shiftRow(-c);var m=this.getFoldLine(e);m&&m!==k&&(m.merge(k),k=m),l=j.indexOf(k)+1}for(l;l<j.length;l++){var k=j[l];k.start.row>=h.row&&k.shiftRow(-c)}f=e}else{var n;if(b){n=[e,0];for(var o=0;o<c;o++)n.push([]);this.$wrapData.splice.apply(this.$wrapData,n)}else n=Array(c),n.unshift(e,0),this.$rowLengthCache.splice.apply(this.$rowLengthCache,n);var j=this.$foldData,k=this.getFoldLine(e),l=0;if(k){var p=k.range.compareInside(g.row,g.column);p==0?(k=k.split(g.row,g.column),k.shiftRow(c),k.addRemoveChars(f,0,h.column-g.column)):p==-1&&(k.addRemoveChars(e,0,h.column-g.column),k.shiftRow(c)),l=j.indexOf(k)+1}for(l;l<j.length;l++){var k=j[l];k.start.row>=e&&k.shiftRow(c)}}else{c=Math.abs(a.data.range.start.column-a.data.range.end.column),d.indexOf("remove")!=-1&&(i=this.getFoldsInRange(a.data.range),this.removeFolds(i),c=-c);var k=this.getFoldLine(e);k&&k.addRemoveChars(e,g.column,c)}return b&&this.$wrapData.length!=this.doc.getLength()&&console.error("doc.getLength() and $wrapData.length have to be the same!"),b?this.$updateWrapData(e,f):this.$updateRowLengthCache(e,f),i},this.$updateRowLengthCache=function(a,b,c){this.$rowLengthCache[a]=null,this.$rowLengthCache[b]=null},this.$updateWrapData=function(a,b){var c=this.doc.getAllLines(),d=this.getTabSize(),e=this.$wrapData,g=this.$wrapLimit,h,j,k=a;b=Math.min(b,c.length-1);while(k<=b){j=this.getFoldLine(k,j);if(!j)h=this.$getDisplayTokens(f.stringTrimRight(c[k])),e[k]=this.$computeWrapSplits(h,g,d),k++;else{h=[],j.walk(function(a,b,d,e){var f;if(a){f=this.$getDisplayTokens(a,h.length),f[0]=i;for(var g=1;g<f.length;g++)f[g]=l}else f=this.$getDisplayTokens(c[b].substring(e,d),h.length);h=h.concat(f)}.bind(this),j.end.row,c[j.end.row].length+1);while(h.length!=0&&h[h.length-1]>=p)h.pop();e[j.start.row]=this.$computeWrapSplits(h,g,d),k=j.end.row+1}}};var b=1,c=2,i=3,l=4,o=9,p=10,q=11,r=12;this.$computeWrapSplits=function(a,b){function g(b){var d=a.slice(e,b),g=d.length;d.join("").replace(/12/g,function(){g-=1}).replace(/2/g,function(){g-=1}),f+=g,c.push(f),e=b}if(a.length==0)return[];var c=[],d=a.length,e=0,f=0;while(d-e>b){var h=e+b;if(a[h]>=p){while(a[h]>=p)h++;g(h);continue}if(a[h]==i||a[h]==l){for(h;h!=e-1;h--)if(a[h]==i)break;if(h>e){g(h);continue}h=e+b;for(h;h<a.length;h++)if(a[h]!=l)break;if(h==a.length)break;g(h);continue}var j=Math.max(h-10,e-1);while(h>j&&a[h]<i)h--;while(h>j&&a[h]==o)h--;if(h>j){g(++h);continue}h=e+b,g(h)}return c},this.$getDisplayTokens=function(a,d){var e=[],f;d=d||0;for(var g=0;g<a.length;g++){var h=a.charCodeAt(g);if(h==9){f=this.getScreenTabSize(e.length+d),e.push(q);for(var i=1;i<f;i++)e.push(r)}else h==32?e.push(p):h>39&&h<48||h>57&&h<64?e.push(o):h>=4352&&s(h)?e.push(b,c):e.push(b)}return e},this.$getStringScreenWidth=function(a,b,c){if(b==0)return[0,0];b==null&&(b=Infinity),c=c||0;var d,e;for(e=0;e<a.length;e++){d=a.charCodeAt(e),d==9?c+=this.getScreenTabSize(c):d>=4352&&s(d)?c+=2:c+=1;if(c>b)break}return[c,e]},this.getRowLength=function(a){return!this.$useWrapMode||!this.$wrapData[a]?1:this.$wrapData[a].length+1},this.getRowHeight=function(a,b){return this.getRowLength(b)*a.lineHeight},this.getScreenLastRowColumn=function(a){var b=this.screenToDocumentPosition(a,Number.MAX_VALUE);return this.documentToScreenColumn(b.row,b.column)},this.getDocumentLastRowColumn=function(a,b){var c=this.documentToScreenRow(a,b);return this.getScreenLastRowColumn(c)},this.getDocumentLastRowColumnPosition=function(a,b){var c=this.documentToScreenRow(a,b);return this.screenToDocumentPosition(c,Number.MAX_VALUE/10)},this.getRowSplitData=function(a){return this.$useWrapMode?this.$wrapData[a]:undefined},this.getScreenTabSize=function(a){return this.$tabSize-a%this.$tabSize},this.screenToDocumentRow=function(a,b){return this.screenToDocumentPosition(a,b).row},this.screenToDocumentColumn=function(a,b){return this.screenToDocumentPosition(a,b).column},this.screenToDocumentPosition=function(a,b){if(a<0)return{row:0,column:0};var c,d=0,e=0,f,g=0,h=0,i=this.$screenRowCache,j=this.$getRowCacheIndex(i,a),k=i[j],l=this.$docRowCache[j];if(0<j&&j<i.length)var g=i[j],d=this.$docRowCache[j],m=a>g||a==g&&j==i.length-1;else var m=!0;var n=this.getLength()-1,o=this.getNextFoldLine(d),p=o?o.start.row:Infinity;while(g<=a){h=this.getRowLength(d);if(g+h-1>=a||d>=n)break;g+=h,d++,d>p&&(d=o.end.row+1,o=this.getNextFoldLine(d,o),p=o?o.start.row:Infinity),m&&(this.$docRowCache.push(d),this.$screenRowCache.push(g))}if(o&&o.start.row<=d)c=this.getFoldDisplayLine(o),d=o.start.row;else{if(g+h<=a||d>n)return{row:n,column:this.getLine(n).length};c=this.getLine(d),o=null}if(this.$useWrapMode){var q=this.$wrapData[d];q&&(f=q[a-g],a>g&&q.length&&(e=q[a-g-1]||q[q.length-1],c=c.substring(e)))}return e+=this.$getStringScreenWidth(c,b)[1],this.$useWrapMode&&e>=f&&(e=f-1),o?o.idxToPosition(e):{row:d,column:e}},this.documentToScreenPosition=function(a,b){if(typeof b=="undefined")var c=this.$clipPositionToDocument(a.row,a.column);else c=this.$clipPositionToDocument(a,b);a=c.row,b=c.column;var d=0,e=null,f=null;f=this.getFoldAt(a,b,1),f&&(a=f.start.row,b=f.start.column);var g,h=0,i=this.$docRowCache,j=this.$getRowCacheIndex(i,a);if(0<j&&j<i.length)var h=i[j],d=this.$screenRowCache[j],k=a>h||a==h&&j==i.length-1;else var k=!0;var l=this.getNextFoldLine(h),m=l?l.start.row:Infinity;while(h<a){if(h>=m){g=l.end.row+1;if(g>a)break;l=this.getNextFoldLine(g,l),m=l?l.start.row:Infinity}else g=h+1;d+=this.getRowLength(h),h=g,k&&(this.$docRowCache.push(h),this.$screenRowCache.push(d))}var n="";l&&h>=m?(n=this.getFoldDisplayLine(l,a,b),e=l.start.row):(n=this.getLine(a).substring(0,b),e=a);if(this.$useWrapMode){var o=this.$wrapData[e],p=0;while(n.length>=o[p])d++,p++;n=n.substring(o[p-1]||0,n.length)}return{row:d,column:this.$getStringScreenWidth(n)[0]}},this.documentToScreenColumn=function(a,b){return this.documentToScreenPosition(a,b).column},this.documentToScreenRow=function(a,b){return this.documentToScreenPosition(a,b).row},this.getScreenLength=function(){var a=0,b=null;if(!this.$useWrapMode){a=this.getLength();var c=this.$foldData;for(var d=0;d<c.length;d++)b=c[d],a-=b.end.row-b.start.row}else{var e=this.$wrapData.length,f=0,d=0,b=this.$foldData[d++],g=b?b.start.row:Infinity;while(f<e)a+=this.$wrapData[f].length+1,f++,f>g&&(f=b.end.row+1,b=this.$foldData[d++],g=b?b.start.row:Infinity)}return a}}).call(o.prototype),a("./edit_session/folding").Folding.call(o.prototype),a("./edit_session/bracket_match").BracketMatch.call(o.prototype),b.EditSession=o}),define("ace/config",["require","exports","module","ace/lib/lang"],function(a,b,c){function g(a){return a.replace(/-(.)/g,function(a,b){return b.toUpperCase()})}"no use strict";var d=a("./lib/lang"),e=function(){return this}(),f={packaged:!1,workerPath:"",modePath:"",themePath:"",suffix:".js"};b.get=function(a){if(!f.hasOwnProperty(a))throw new Error("Unknown config key: "+a);return f[a]},b.set=function(a,b){if(!f.hasOwnProperty(a))throw new Error("Unknown config key: "+a);f[a]=b},b.all=function(){return d.copyObject(f)},b.init=function(){f.packaged=a.packaged||c.packaged||e.define&&define.packaged;if(!e.document)return"";var d={},h="",i=document.getElementsByTagName("script");for(var j=0;j<i.length;j++){var k=i[j],l=k.src||k.getAttribute("src");if(!l)continue;var m=k.attributes;for(var n=0,o=m.length;n<o;n++){var p=m[n];p.name.indexOf("data-ace-")===0&&(d[g(p.name.replace(/^data-ace-/,""))]=p.value)}var q=l.match(/^(?:(.*\/)ace\.js)(?:\?|$)/);q&&(h=q[1]||q[2])}h&&(d.base=d.base||h,d.packaged=!0),d.workerPath=d.workerPath||d.base,d.modePath=d.modePath||d.base,d.themePath=d.themePath||d.base,delete d.base;for(var r in d)typeof d[r]!="undefined"&&b.set(r,d[r])}}),define("ace/lib/net",["require","exports","module"],function(a,b,c){b.get=function(a,c){var d=b.createXhr();d.open("GET",a,!0),d.onreadystatechange=function(a){d.readyState===4&&c(d.responseText)},d.send(null)};var d=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];b.createXhr=function(){var a,b,c;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(b=0;b<3;b++){c=d[b];try{a=new ActiveXObject(c)}catch(e){}if(a){d=[c];break}}if(!a)throw new Error("createXhr(): XMLHttpRequest not available");return a},b.loadScript=function(a,b){var c=document.getElementsByTagName("head")[0],d=document.createElement("script");d.src=a,c.appendChild(d),d.onload=b}}),define("ace/lib/event_emitter",["require","exports","module"],function(a,b,c){var d={};d._emit=d._dispatchEvent=function(a,b){this._eventRegistry=this._eventRegistry||{},this._defaultHandlers=this._defaultHandlers||{};var c=this._eventRegistry[a]||[],d=this._defaultHandlers[a];if(!c.length&&!d)return;b=b||{},b.type=a,b.stopPropagation||(b.stopPropagation=function(){this.propagationStopped=!0}),b.preventDefault||(b.preventDefault=function(){this.defaultPrevented=!0});for(var e=0;e<c.length;e++){c[e](b);if(b.propagationStopped)break}if(d&&!b.defaultPrevented)return d(b)},d.setDefaultHandler=function(a,b){this._defaultHandlers=this._defaultHandlers||{};if(this._defaultHandlers[a])throw new Error("The default handler for '"+a+"' is already set");this._defaultHandlers[a]=b},d.on=d.addEventListener=function(a,b){this._eventRegistry=this._eventRegistry||{};var c=this._eventRegistry[a];if(!c)var c=this._eventRegistry[a]=[];c.indexOf(b)==-1&&c.push(b)},d.removeListener=d.removeEventListener=function(a,b){this._eventRegistry=this._eventRegistry||{};var c=this._eventRegistry[a];if(!c)return;var d=c.indexOf(b);d!==-1&&c.splice(d,1)},d.removeAllListeners=function(a){this._eventRegistry&&(this._eventRegistry[a]=[])},b.EventEmitter=d}),define("ace/selection",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/range"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/lang"),f=a("./lib/event_emitter").EventEmitter,g=a("./range").Range,h=function(a){this.session=a,this.doc=a.getDocument(),this.clearSelection(),this.lead=this.selectionLead=this.doc.createAnchor(0,0),this.anchor=this.selectionAnchor=this.doc.createAnchor(0,0);var b=this;this.lead.on("change",function(a){b._emit("changeCursor"),b.$isEmpty||b._emit("changeSelection"),!b.$keepDesiredColumnOnChange&&a.old.column!=a.value.column&&(b.$desiredColumn=null)}),this.selectionAnchor.on("change",function(){b.$isEmpty||b._emit("changeSelection")})};(function(){d.implement(this,f),this.isEmpty=function(){return this.$isEmpty||this.anchor.row==this.lead.row&&this.anchor.column==this.lead.column},this.isMultiLine=function(){return this.isEmpty()?!1:this.getRange().isMultiLine()},this.getCursor=function(){return this.lead.getPosition()},this.setSelectionAnchor=function(a,b){this.anchor.setPosition(a,b),this.$isEmpty&&(this.$isEmpty=!1,this._emit("changeSelection"))},this.getSelectionAnchor=function(){return this.$isEmpty?this.getSelectionLead():this.anchor.getPosition()},this.getSelectionLead=function(){return this.lead.getPosition()},this.shiftSelection=function(a){if(this.$isEmpty){this.moveCursorTo(this.lead.row,this.lead.column+a);return}var b=this.getSelectionAnchor(),c=this.getSelectionLead(),d=this.isBackwards();(!d||b.column!==0)&&this.setSelectionAnchor(b.row,b.column+a),(d||c.column!==0)&&this.$moveSelection(function(){this.moveCursorTo(c.row,c.column+a)})},this.isBackwards=function(){var a=this.anchor,b=this.lead;return a.row>b.row||a.row==b.row&&a.column>b.column},this.getRange=function(){var a=this.anchor,b=this.lead;return this.isEmpty()?g.fromPoints(b,b):this.isBackwards()?g.fromPoints(b,a):g.fromPoints(a,b)},this.clearSelection=function(){this.$isEmpty||(this.$isEmpty=!0,this._emit("changeSelection"))},this.selectAll=function(){var a=this.doc.getLength()-1;this.setSelectionAnchor(0,0),this.moveCursorTo(a,this.doc.getLine(a).length)},this.setRange=this.setSelectionRange=function(a,b){b?(this.setSelectionAnchor(a.end.row,a.end.column),this.selectTo(a.start.row,a.start.column)):(this.setSelectionAnchor(a.start.row,a.start.column),this.selectTo(a.end.row,a.end.column)),this.$desiredColumn=null},this.$moveSelection=function(a){var b=this.lead;this.$isEmpty&&this.setSelectionAnchor(b.row,b.column),a.call(this)},this.selectTo=function(a,b){this.$moveSelection(function(){this.moveCursorTo(a,b)})},this.selectToPosition=function(a){this.$moveSelection(function(){this.moveCursorToPosition(a)})},this.selectUp=function(){this.$moveSelection(this.moveCursorUp)},this.selectDown=function(){this.$moveSelection(this.moveCursorDown)},this.selectRight=function(){this.$moveSelection(this.moveCursorRight)},this.selectLeft=function(){this.$moveSelection(this.moveCursorLeft)},this.selectLineStart=function(){this.$moveSelection(this.moveCursorLineStart)},this.selectLineEnd=function(){this.$moveSelection(this.moveCursorLineEnd)},this.selectFileEnd=function(){this.$moveSelection(this.moveCursorFileEnd)},this.selectFileStart=function(){this.$moveSelection(this.moveCursorFileStart)},this.selectWordRight=function(){this.$moveSelection(this.moveCursorWordRight)},this.selectWordLeft=function(){this.$moveSelection(this.moveCursorWordLeft)},this.getWordRange=function(a,b){if(typeof b=="undefined"){var c=a||this.lead;a=c.row,b=c.column}return this.session.getWordRange(a,b)},this.selectWord=function(){this.setSelectionRange(this.getWordRange())},this.selectAWord=function(){var a=this.getCursor(),b=this.session.getAWordRange(a.row,a.column);this.setSelectionRange(b)},this.getLineRange=function(a,b){var c=typeof a=="number"?a:this.lead.row,d,e=this.session.getFoldLine(c);return e?(c=e.start.row,d=e.end.row):d=c,b?new g(c,0,d,this.session.getLine(d).length):new g(c,0,d+1,0)},this.selectLine=function(){this.setSelectionRange(this.getLineRange())},this.moveCursorUp=function(){this.moveCursorBy(-1,0)},this.moveCursorDown=function(){this.moveCursorBy(1,0)},this.moveCursorLeft=function(){var a=this.lead.getPosition(),b;if(b=this.session.getFoldAt(a.row,a.column,-1))this.moveCursorTo(b.start.row,b.start.column);else if(a.column==0)a.row>0&&this.moveCursorTo(a.row-1,this.doc.getLine(a.row-1).length);else{var c=this.session.getTabSize();this.session.isTabStop(a)&&this.doc.getLine(a.row).slice(a.column-c,a.column).split(" ").length-1==c?this.moveCursorBy(0,-c):this.moveCursorBy(0,-1)}},this.moveCursorRight=function(){var a=this.lead.getPosition(),b;if(b=this.session.getFoldAt(a.row,a.column,1))this.moveCursorTo(b.end.row,b.end.column);else if(this.lead.column==this.doc.getLine(this.lead.row).length)this.lead.row<this.doc.getLength()-1&&this.moveCursorTo(this.lead.row+1,0);else{var c=this.session.getTabSize(),a=this.lead;this.session.isTabStop(a)&&this.doc.getLine(a.row).slice(a.column,a.column+c).split(" ").length-1==c?this.moveCursorBy(0,c):this.moveCursorBy(0,1)}},this.moveCursorLineStart=function(){var a=this.lead.row,b=this.lead.column,c=this.session.documentToScreenRow(a,b),d=this.session.screenToDocumentPosition(c,0),e=this.session.getDisplayLine(a,null,d.row,d.column),f=e.match(/^\s*/);f[0].length==b?this.moveCursorTo(d.row,d.column):this.moveCursorTo(d.row,d.column+f[0].length)},this.moveCursorLineEnd=function(){var a=this.lead,b=this.session.getDocumentLastRowColumnPosition(a.row,a.column);this.moveCursorTo(b.row,b.column)},this.moveCursorFileEnd=function(){var a=this.doc.getLength()-1,b=this.doc.getLine(a).length;this.moveCursorTo(a,b)},this.moveCursorFileStart=function(){this.moveCursorTo(0,0)},this.moveCursorLongWordRight=function(){var a=this.lead.row,b=this.lead.column,c=this.doc.getLine(a),d=c.substring(b),e;this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0;var f=this.session.getFoldAt(a,b,1);if(f){this.moveCursorTo(f.end.row,f.end.column);return}if(e=this.session.nonTokenRe.exec(d))b+=this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex=0,d=c.substring(b);if(b>=c.length){this.moveCursorTo(a,c.length),this.moveCursorRight(),a<this.doc.getLength()-1&&this.moveCursorWordRight();return}if(e=this.session.tokenRe.exec(d))b+=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0;this.moveCursorTo(a,b)},this.moveCursorLongWordLeft=function(){var a=this.lead.row,b=this.lead.column,c;if(c=this.session.getFoldAt(a,b,-1)){this.moveCursorTo(c.start.row,c.start.column);return}var d=this.session.getFoldStringAt(a,b,-1);d==null&&(d=this.doc.getLine(a).substring(0,b));var f=e.stringReverse(d),g;this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0;if(g=this.session.nonTokenRe.exec(f))b-=this.session.nonTokenRe.lastIndex,f=f.slice(this.session.nonTokenRe.lastIndex),this.session.nonTokenRe.lastIndex=0;if(b<=0){this.moveCursorTo(a,0),this.moveCursorLeft(),a>0&&this.moveCursorWordLeft();return}if(g=this.session.tokenRe.exec(f))b-=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0;this.moveCursorTo(a,b)},this.$shortWordEndIndex=function(a){var b,c=0,d,e=/\s/,f=this.session.tokenRe;f.lastIndex=0;if(b=this.session.tokenRe.exec(a))c=this.session.tokenRe.lastIndex;else{while((d=a[c])&&e.test(d))c++;if(c<=1){f.lastIndex=0;while((d=a[c])&&!f.test(d)){f.lastIndex=0,c++;if(e.test(d)){if(c>2){c--;break}while((d=a[c])&&e.test(d))c++;if(c>2)break}}}}return f.lastIndex=0,c},this.moveCursorShortWordRight=function(){var a=this.lead.row,b=this.lead.column,c=this.doc.getLine(a),d=c.substring(b),e=this.session.getFoldAt(a,b,1);if(e)return this.moveCursorTo(e.end.row,e.end.column);if(b==c.length){var f=this.doc.getLength();do a++,d=this.doc.getLine(a);while(a<f&&/^\s*$/.test(d));/^\s+/.test(d)||(d=""),b=0}var g=this.$shortWordEndIndex(d);this.moveCursorTo(a,b+g)},this.moveCursorShortWordLeft=function(){var a=this.lead.row,b=this.lead.column,c;if(c=this.session.getFoldAt(a,b,-1))return this.moveCursorTo(c.start.row,c.start.column);var d=this.session.getLine(a).substring(0,b);if(b==0){do a--,d=this.doc.getLine(a);while(a>0&&/^\s*$/.test(d));b=d.length,/\s+$/.test(d)||(d="")}var f=e.stringReverse(d),g=this.$shortWordEndIndex(f);return this.moveCursorTo(a,b-g)},this.moveCursorWordRight=function(){this.session.$selectLongWords?this.moveCursorLongWordRight():this.moveCursorShortWordRight()},this.moveCursorWordLeft=function(){this.session.$selectLongWords?this.moveCursorLongWordLeft():this.moveCursorShortWordLeft()},this.moveCursorBy=function(a,b){var c=this.session.documentToScreenPosition(this.lead.row,this.lead.column);b===0&&(this.$desiredColumn?c.column=this.$desiredColumn:this.$desiredColumn=c.column);var d=this.session.screenToDocumentPosition(c.row+a,c.column);this.moveCursorTo(d.row,d.column+b,b===0)},this.moveCursorToPosition=function(a){this.moveCursorTo(a.row,a.column)},this.moveCursorTo=function(a,b,c){var d=this.session.getFoldAt(a,b,1);d&&(a=d.start.row,b=d.start.column),this.$keepDesiredColumnOnChange=!0,this.lead.setPosition(a,b),this.$keepDesiredColumnOnChange=!1,c||(this.$desiredColumn=null)},this.moveCursorToScreen=function(a,b,c){var d=this.session.screenToDocumentPosition(a,b);this.moveCursorTo(d.row,d.column,c)},this.detach=function(){this.lead.detach(),this.anchor.detach(),this.session=this.doc=null},this.fromOrientedRange=function(a){this.setSelectionRange(a,a.cursor==a.start),this.$desiredColumn=a.desiredColumn||this.$desiredColumn},this.toOrientedRange=function(a){var b=this.getRange();return a?(a.start.column=b.start.column,a.start.row=b.start.row,a.end.column=b.end.column,a.end.row=b.end.row):a=b,a.cursor=this.isBackwards()?a.start:a.end,a.desiredColumn=this.$desiredColumn,a}}).call(h.prototype),b.Selection=h}),define("ace/range",["require","exports","module"],function(a,b,c){var d=function(a,b,c,d){this.start={row:a,column:b},this.end={row:c,column:d}};(function(){this.isEqual=function(a){return this.start.row==a.start.row&&this.end.row==a.end.row&&this.start.column==a.start.column&&this.end.column==a.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(a,b){return this.compare(a,b)==0},this.compareRange=function(a){var b,c=a.end,d=a.start;return b=this.compare(c.row,c.column),b==1?(b=this.compare(d.row,d.column),b==1?2:b==0?1:0):b==-1?-2:(b=this.compare(d.row,d.column),b==-1?-1:b==1?42:0)},this.comparePoint=function(a){return this.compare(a.row,a.column)},this.containsRange=function(a){return this.comparePoint(a.start)==0&&this.comparePoint(a.end)==0},this.intersects=function(a){var b=this.compareRange(a);return b==-1||b==0||b==1},this.isEnd=function(a,b){return this.end.row==a&&this.end.column==b},this.isStart=function(a,b){return this.start.row==a&&this.start.column==b},this.setStart=function(a,b){typeof a=="object"?(this.start.column=a.column,this.start.row=a.row):(this.start.row=a,this.start.column=b)},this.setEnd=function(a,b){typeof a=="object"?(this.end.column=a.column,this.end.row=a.row):(this.end.row=a,this.end.column=b)},this.inside=function(a,b){return this.compare(a,b)==0?this.isEnd(a,b)||this.isStart(a,b)?!1:!0:!1},this.insideStart=function(a,b){return this.compare(a,b)==0?this.isEnd(a,b)?!1:!0:!1},this.insideEnd=function(a,b){return this.compare(a,b)==0?this.isStart(a,b)?!1:!0:!1},this.compare=function(a,b){return!this.isMultiLine()&&a===this.start.row?b<this.start.column?-1:b>this.end.column?1:0:a<this.start.row?-1:a>this.end.row?1:this.start.row===a?b>=this.start.column?0:-1:this.end.row===a?b<=this.end.column?0:1:0},this.compareStart=function(a,b){return this.start.row==a&&this.start.column==b?-1:this.compare(a,b)},this.compareEnd=function(a,b){return this.end.row==a&&this.end.column==b?1:this.compare(a,b)},this.compareInside=function(a,b){return this.end.row==a&&this.end.column==b?1:this.start.row==a&&this.start.column==b?-1:this.compare(a,b)},this.clipRows=function(a,b){if(this.end.row>b)var c={row:b+1,column:0};if(this.start.row>b)var e={row:b+1,column:0};if(this.start.row<a)var e={row:a,column:0};if(this.end.row<a)var c={row:a,column:0};return d.fromPoints(e||this.start,c||this.end)},this.extend=function(a,b){var c=this.compare(a,b);if(c==0)return this;if(c==-1)var e={row:a,column:b};else var f={row:a,column:b};return d.fromPoints(e||this.start,f||this.end)},this.isEmpty=function(){return this.start.row==this.end.row&&this.start.column==this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return d.fromPoints(this.start,this.end)},this.collapseRows=function(){return this.end.column==0?new d(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new d(this.start.row,0,this.end.row,0)},this.toScreenRange=function(a){var b=a.documentToScreenPosition(this.start),c=a.documentToScreenPosition(this.end);return new d(b.row,b.column,c.row,c.column)}}).call(d.prototype),d.fromPoints=function(a,b){return new d(a.row,a.column,b.row,b.column)},b.Range=d}),define("ace/mode/text",["require","exports","module","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/behaviour","ace/unicode"],function(a,b,c){var d=a("../tokenizer").Tokenizer,e=a("./text_highlight_rules").TextHighlightRules,f=a("./behaviour").Behaviour,g=a("../unicode"),h=function(){this.$tokenizer=new d((new e).getRules()),this.$behaviour=new f};(function(){this.tokenRe=new RegExp("^["+g.packages.L+g.packages.Mn+g.packages.Mc+g.packages.Nd+g.packages.Pc+"\\$_]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+g.packages.L+g.packages.Mn+g.packages.Mc+g.packages.Nd+g.packages.Pc+"\\$_]|s])+","g"),this.getTokenizer=function(){return this.$tokenizer},this.toggleCommentLines=function(a,b,c,d){},this.getNextLineIndent=function(a,b,c){return""},this.checkOutdent=function(a,b,c){return!1},this.autoOutdent=function(a,b,c){},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""},this.createWorker=function(a){return null},this.createModeDelegates=function(a){if(!this.$embeds)return;this.$modes={};for(var b=0;b<this.$embeds.length;b++)a[this.$embeds[b]]&&(this.$modes[this.$embeds[b]]=new a[this.$embeds[b]]);var c=["toggleCommentLines","getNextLineIndent","checkOutdent","autoOutdent","transformAction"];for(var b=0;b<c.length;b++)(function(a){var d=c[b],e=a[d];a[c[b]]=function(){return this.$delegator(d,arguments,e)}})(this)},this.$delegator=function(a,b,c){var d=b[0];for(var e=0;e<this.$embeds.length;e++){if(!this.$modes[this.$embeds[e]])continue;var f=d.split(this.$embeds[e]);if(!f[0]&&f[1]){b[0]=f[1];var g=this.$modes[this.$embeds[e]];return g[a].apply(g,b)}}var h=c.apply(this,b);return c?h:undefined},this.transformAction=function(a,b,c,d,e){if(this.$behaviour){var f=this.$behaviour.getBehaviours();for(var g in f)if(f[g][b]){var h=f[g][b].apply(this,arguments);if(h)return h}}}}).call(h.prototype),b.Mode=h}),define("ace/tokenizer",["require","exports","module"],function(a,b,c){var d=function(a,b){b=b?"g"+b:"g",this.rules=a,this.regExps={},this.matchMappings={};for(var c in this.rules){var d=this.rules[c],e=d,f=[],g=0,h=this.matchMappings[c]={};for(var i=0;i<e.length;i++){e[i].regex instanceof RegExp&&(e[i].regex=e[i].regex.toString().slice(1,-1));var j=(new RegExp("(?:("+e[i].regex+")|(.))")).exec("a").length-2,k=e[i].regex.replace(/\\([0-9]+)/g,function(a,b){return"\\"+(parseInt(b,10)+g+1)});if(j>1&&e[i].token.length!==j-1)throw new Error("Matching groups and length of the token array don't match in rule #"+i+" of state "+c);h[g]={rule:i,len:j},g+=j,f.push(k)}this.regExps[c]=new RegExp("(?:("+f.join(")|(")+")|(.))",b)}};(function(){this.getLineTokens=function(a,b){var c=b||"start",d=this.rules[c],e=this.matchMappings[c],f=this.regExps[c];f.lastIndex=0;var g,h=[],i=0,j={type:null,value:""};while(g=f.exec(a)){var k="text",l=null,m=[g[0]];for(var n=0;n<g.length-2;n++){if(g[n+1]===undefined)continue;l=d[e[n].rule],e[n].len>1&&(m=g.slice(n+2,n+1+e[n].len)),typeof l.token=="function"?k=l.token.apply(this,m):k=l.token,l.next&&(c=l.next,d=this.rules[c],e=this.matchMappings[c],i=f.lastIndex,f=this.regExps[c],f.lastIndex=i);break}if(m[0]){typeof k=="string"&&(m=[m.join("")],k=[k]);for(var n=0;n<m.length;n++){if(!m[n])continue;(!l||l.merge||k[n]==="text")&&j.type===k[n]?j.value+=m[n]:(j.type&&h.push(j),j={type:k[n],value:m[n]})}}if(i==a.length)break;i=f.lastIndex}return j.type&&h.push(j),{tokens:h,state:c}}}).call(d.prototype),b.Tokenizer=d}),define("ace/mode/text_highlight_rules",["require","exports","module","ace/lib/lang"],function(a,b,c){var d=a("../lib/lang"),e=function(){this.$rules={start:[{token:"empty_line",regex:"^$"},{token:"text",regex:".+"}]}};(function(){this.addRules=function(a,b){for(var c in a){var d=a[c];for(var e=0;e<d.length;e++){var f=d[e];f.next&&(f.next=b+f.next)}this.$rules[b+c]=d}},this.getRules=function(){return this.$rules},this.embedRules=function(a,b,c,e){var f=(new a).getRules();if(e)for(var g=0;g<e.length;g++)e[g]=b+e[g];else{e=[];for(var h in f)e.push(b+h)}this.addRules(f,b);for(var g=0;g<e.length;g++)Array.prototype.unshift.apply(this.$rules[e[g]],d.deepCopy(c));this.$embeds||(this.$embeds=[]),this.$embeds.push(b)},this.getEmbeds=function(){return this.$embeds}}).call(e.prototype),b.TextHighlightRules=e}),define("ace/mode/behaviour",["require","exports","module"],function(a,b,c){var d=function(){this.$behaviours={}};(function(){this.add=function(a,b,c){switch(undefined){case this.$behaviours:this.$behaviours={};case this.$behaviours[a]:this.$behaviours[a]={}}this.$behaviours[a][b]=c},this.addBehaviours=function(a){for(var b in a)for(var c in a[b])this.add(b,c,a[b][c])},this.remove=function(a){this.$behaviours&&this.$behaviours[a]&&delete this.$behaviours[a]},this.inherit=function(a,b){if(typeof a=="function")var c=(new a).getBehaviours(b);else var c=a.getBehaviours(b);this.addBehaviours(c)},this.getBehaviours=function(a){if(!a)return this.$behaviours;var b={};for(var c=0;c<a.length;c++)this.$behaviours[a[c]]&&(b[a[c]]=this.$behaviours[a[c]]);return b}}).call(d.prototype),b.Behaviour=d}),define("ace/unicode",["require","exports","module"],function(a,b,c){function d(a){var c=/\w{4}/g;for(var d in a)b.packages[d]=a[d].replace(c,"\\u$&")}b.packages={},d({L:"0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",Ll:"0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",Lu:"0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",Lt:"01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",Lm:"02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",Lo:"01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",M:"0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",Mn:"0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",Mc:"0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",Me:"0488048906DE20DD-20E020E2-20E4A670-A672",N:"0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",Nd:"0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",Nl:"16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",No:"00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",P:"0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",Pd:"002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",Ps:"0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",Pe:"0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",Pi:"00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",Pf:"00BB2019201D203A2E032E052E0A2E0D2E1D2E21",Pc:"005F203F20402054FE33FE34FE4D-FE4FFF3F",Po:"0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",S:"0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",Sm:"002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",Sc:"002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",Sk:"005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",So:"00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",Z:"002000A01680180E2000-200A20282029202F205F3000",Zs:"002000A01680180E2000-200A202F205F3000",Zl:"2028",Zp:"2029",C:"0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",Cc:"0000-001F007F-009F",Cf:"00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",Co:"E000-F8FF",Cs:"D800-DFFF",Cn:"03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"})}),define("ace/document",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/range","ace/anchor"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=a("./range").Range,g=a("./anchor").Anchor,h=function(a){this.$lines=[],a.length==0?this.$lines=[""]:Array.isArray(a)?this.insertLines(0,a):this.insert({row:0,column:0},a)};(function(){d.implement(this,e),this.setValue=function(a){var b=this.getLength();this.remove(new f(0,0,b,this.getLine(b-1).length)),this.insert({row:0,column:0},a)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(a,b){return new g(this,a,b)},"aaa".split(/a/).length==0?this.$split=function(a){return a.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(a){return a.split(/\r\n|\r|\n/)},this.$detectNewLine=function(a){var b=a.match(/^.*?(\r\n|\r|\n)/m);b?this.$autoNewLine=b[1]:this.$autoNewLine="\n"},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";case"auto":return this.$autoNewLine}},this.$autoNewLine="\n",this.$newLineMode="auto",this.setNewLineMode=function(a){if(this.$newLineMode===a)return;this.$newLineMode=a},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(a){return a=="\r\n"||a=="\r"||a=="\n"},this.getLine=function(a){return this.$lines[a]||""},this.getLines=function(a,b){return this.$lines.slice(a,b+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(a){if(a.start.row==a.end.row)return this.$lines[a.start.row].substring(a.start.column,a.end.column);var b=this.getLines(a.start.row+1,a.end.row-1);return b.unshift((this.$lines[a.start.row]||"").substring(a.start.column)),b.push((this.$lines[a.end.row]||"").substring(0,a.end.column)),b.join(this.getNewLineCharacter())},this.$clipPosition=function(a){var b=this.getLength();return a.row>=b&&(a.row=Math.max(0,b-1),a.column=this.getLine(b-1).length),a},this.insert=function(a,b){if(!b||b.length===0)return a;a=this.$clipPosition(a),this.getLength()<=1&&this.$detectNewLine(b);var c=this.$split(b),d=c.splice(0,1)[0],e=c.length==0?null:c.splice(c.length-1,1)[0];return a=this.insertInLine(a,d),e!==null&&(a=this.insertNewLine(a),a=this.insertLines(a.row,c),a=this.insertInLine(a,e||"")),a},this.insertLines=function(a,b){if(b.length==0)return{row:a,column:0};if(b.length>65535){var c=this.insertLines(a,b.slice(65535));b=b.slice(0,65535)}var d=[a,0];d.push.apply(d,b),this.$lines.splice.apply(this.$lines,d);var e=new f(a,0,a+b.length,0),g={action:"insertLines",range:e,lines:b};return this._emit("change",{data:g}),c||e.end},this.insertNewLine=function(a){a=this.$clipPosition(a);var b=this.$lines[a.row]||"";this.$lines[a.row]=b.substring(0,a.column),this.$lines.splice(a.row+1,0,b.substring(a.column,b.length));var c={row:a.row+1,column:0},d={action:"insertText",range:f.fromPoints(a,c),text:this.getNewLineCharacter()};return this._emit("change",{data:d}),c},this.insertInLine=function(a,b){if(b.length==0)return a;var c=this.$lines[a.row]||"";this.$lines[a.row]=c.substring(0,a.column)+b+c.substring(a.column);var d={row:a.row,column:a.column+b.length},e={action:"insertText",range:f.fromPoints(a,d),text:b};return this._emit("change",{data:e}),d},this.remove=function(a){a.start=this.$clipPosition(a.start),a.end=this.$clipPosition(a.end);if(a.isEmpty())return a.start;var b=a.start.row,c=a.end.row;if(a.isMultiLine()){var d=a.start.column==0?b:b+1,e=c-1;a.end.column>0&&this.removeInLine(c,0,a.end.column),e>=d&&this.removeLines(d,e),d!=b&&(this.removeInLine(b,a.start.column,this.getLine(b).length),this.removeNewLine(a.start.row))}else this.removeInLine(b,a.start.column,a.end.column);return a.start},this.removeInLine=function(a,b,c){if(b==c)return;var d=new f(a,b,a,c),e=this.getLine(a),g=e.substring(b,c),h=e.substring(0,b)+e.substring(c,e.length);this.$lines.splice(a,1,h);var i={action:"removeText",range:d,text:g};return this._emit("change",{data:i}),d.start},this.removeLines=function(a,b){var c=new f(a,0,b+1,0),d=this.$lines.splice(a,b-a+1),e={action:"removeLines",range:c,nl:this.getNewLineCharacter(),lines:d};return this._emit("change",{data:e}),d},this.removeNewLine=function(a){var b=this.getLine(a),c=this.getLine(a+1),d=new f(a,b.length,a+1,0),e=b+c;this.$lines.splice(a,2,e);var g={action:"removeText",range:d,text:this.getNewLineCharacter()};this._emit("change",{data:g})},this.replace=function(a,b){if(b.length==0&&a.isEmpty())return a.start;if(b==this.getTextRange(a))return a.end;this.remove(a);if(b)var c=this.insert(a.start,b);else c=a.start;return c},this.applyDeltas=function(a){for(var b=0;b<a.length;b++){var c=a[b],d=f.fromPoints(c.range.start,c.range.end);c.action=="insertLines"?this.insertLines(d.start.row,c.lines):c.action=="insertText"?this.insert(d.start,c.text):c.action=="removeLines"?this.removeLines(d.start.row,d.end.row-1):c.action=="removeText"&&this.remove(d)}},this.revertDeltas=function(a){for(var b=a.length-1;b>=0;b--){var c=a[b],d=f.fromPoints(c.range.start,c.range.end);c.action=="insertLines"?this.removeLines(d.start.row,d.end.row-1):c.action=="insertText"?this.remove(d):c.action=="removeLines"?this.insertLines(d.start.row,c.lines):c.action=="removeText"&&this.insert(d.start,c.text)}}}).call(h.prototype),b.Document=h}),define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=b.Anchor=function(a,b,c){this.document=a,typeof c=="undefined"?this.setPosition(b.row,b.column):this.setPosition(b,c),this.$onChange=this.onChange.bind(this),a.on("change",this.$onChange)};(function(){d.implement(this,e),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.onChange=function(a){var b=a.data,c=b.range;if(c.start.row==c.end.row&&c.start.row!=this.row)return;if(c.start.row>this.row)return;if(c.start.row==this.row&&c.start.column>this.column)return;var d=this.row,e=this.column;b.action==="insertText"?c.start.row===d&&c.start.column<=e?c.start.row===c.end.row?e+=c.end.column-c.start.column:(e-=c.start.column,d+=c.end.row-c.start.row):c.start.row!==c.end.row&&c.start.row<d&&(d+=c.end.row-c.start.row):b.action==="insertLines"?c.start.row<=d&&(d+=c.end.row-c.start.row):b.action=="removeText"?c.start.row==d&&c.start.column<e?c.end.column>=e?e=c.start.column:e=Math.max(0,e-(c.end.column-c.start.column)):c.start.row!==c.end.row&&c.start.row<d?(c.end.row==d&&(e=Math.max(0,e-c.end.column)+c.start.column),d-=c.end.row-c.start.row):c.end.row==d&&(d-=c.end.row-c.start.row,e=Math.max(0,e-c.end.column)+c.start.column):b.action=="removeLines"&&c.start.row<=d&&(c.end.row<=d?d-=c.end.row-c.start.row:(d=c.start.row,e=0)),this.setPosition(d,e,!0)},this.setPosition=function(a,b,c){var d;c?d={row:a,column:b}:d=this.$clipPositionToDocument(a,b);if(this.row==d.row&&this.column==d.column)return;var e={row:this.row,column:this.column};this.row=d.row,this.column=d.column,this._emit("change",{old:e,value:d})},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.$clipPositionToDocument=function(a,b){var c={};return a>=this.document.getLength()?(c.row=Math.max(0,this.document.getLength()-1),c.column=this.document.getLine(c.row).length):a<0?(c.row=0,c.column=0):(c.row=a,c.column=Math.min(this.document.getLine(c.row).length,Math.max(0,b))),b<0&&(c.column=0),c}}).call(f.prototype)}),define("ace/background_tokenizer",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=5e3,g=function(a,b){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.tokenizer=a;var c=this;this.$worker=function(){if(!c.running)return;var a=new Date,b=c.currentLine,d=c.doc,e=0,f=d.getLength();while(c.currentLine<f){c.$tokenizeRow(c.currentLine);while(c.lines[c.currentLine])c.currentLine++;e++;if(e%5==0&&new Date-a>20){c.fireUpdateEvent(b,c.currentLine-1),c.running=setTimeout(c.$worker,20);return}}c.running=!1,c.fireUpdateEvent(b,f-1)}};(function(){d.implement(this,e),this.setTokenizer=function(a){this.tokenizer=a,this.lines=[],this.states=[],this.start(0)},this.setDocument=function(a){this.doc=a,this.lines=[],this.states=[],this.stop()},this.fireUpdateEvent=function(a,b){var c={first:a,last:b};this._emit("update",{data:c})},this.start=function(a){this.currentLine=Math.min(a||0,this.currentLine,this.doc.getLength()),this.lines.splice(this.currentLine,this.lines.length),this.states.splice(this.currentLine,this.states.length),this.stop(),this.running=setTimeout(this.$worker,700)},this.$updateOnChange=function(a){var b=a.range,c=b.start.row,d=b.end.row-c;if(d===0)this.lines[c]=null;else if(a.action=="removeText"||a.action=="removeLines")this.lines.splice(c,d+1,null),this.states.splice(c,d+1,null);else{var e=Array(d+1);e.unshift(c,1),this.lines.splice.apply(this.lines,e),this.states.splice.apply(this.states,e)}this.currentLine=Math.min(c,this.currentLine,this.doc.getLength()),this.stop(),this.running=setTimeout(this.$worker,700)},this.stop=function(){this.running&&clearTimeout(this.running),this.running=!1},this.getTokens=function(a){return this.lines[a]||this.$tokenizeRow(a)},this.getState=function(a){return this.currentLine==a&&this.$tokenizeRow(a),this.states[a]||"start"},this.$tokenizeRow=function(a){var b=this.doc.getLine(a),c=this.states[a-1];if(b.length>f){var d={value:b.substr(f),type:"text"};b=b.slice(0,f)}var e=this.tokenizer.getLineTokens(b,c);return d&&(e.tokens.push(d),e.state="start"),this.states[a]!==e.state?(this.states[a]=e.state,this.lines[a+1]=null,this.currentLine>a+1&&(this.currentLine=a+1)):this.currentLine==a&&(this.currentLine=a+1),this.lines[a]=e.tokens}}).call(g.prototype),b.BackgroundTokenizer=g}),define("ace/search_highlight",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"],function(a,b,c){var d=a("./lib/lang"),e=a("./lib/oop"),f=a("./range").Range,g=function(a,b,c){this.setRegexp(a),this.clazz=b,this.type=c||"text"};(function(){this.setRegexp=function(a){if(this.regExp+""==a+"")return;this.regExp=a,this.cache=[]},this.update=function(a,b,c,e){if(!this.regExp)return;var g=e.firstRow,h=e.lastRow;for(var i=g;i<=h;i++){var j=this.cache[i];j==null&&(j=d.getMatchOffsets(c.getLine(i),this.regExp),j=j.map(function(a){return new f(i,a.offset,i,a.offset+a.length)}),this.cache[i]=j.length?j:"");for(var k=j.length;k--;)b.drawSingleLineMarker(a,j[k].toScreenRange(c),this.clazz,e,null,this.type)}}}).call(g.prototype),b.SearchHighlight=g}),define("ace/edit_session/folding",["require","exports","module","ace/range","ace/edit_session/fold_line","ace/edit_session/fold","ace/token_iterator"],function(a,b,c){function h(){this.getFoldAt=function(a,b,c){var d=this.getFoldLine(a);if(!d)return null;var e=d.folds;for(var f=0;f<e.length;f++){var g=e[f];if(g.range.contains(a,b)){if(c==1&&g.range.isEnd(a,b))continue;if(c==-1&&g.range.isStart(a,b))continue;return g}}},this.getFoldsInRange=function(a){a=a.clone();var b=a.start,c=a.end,d=this.$foldData,e=[];b.column+=1,c.column-=1;for(var f=0;f<d.length;f++){var g=d[f].range.compareRange(a);if(g==2)continue;if(g==-2)break;var h=d[f].folds;for(var i=0;i<h.length;i++){var j=h[i];g=j.range.compareRange(a);if(g==-2)break;if(g==2)continue;if(g==42)break;e.push(j)}}return e},this.getAllFolds=function(){function c(b){a.push(b);if(!b.subFolds)return;for(var d=0;d<b.subFolds.length;d++)c(b.subFolds[d])}var a=[],b=this.$foldData;for(var d=0;d<b.length;d++)for(var e=0;e<b[d].folds.length;e++)c(b[d].folds[e]);return a},this.getFoldStringAt=function(a,b,c,d){d=d||this.getFoldLine(a);if(!d)return null;var e={end:{column:0}},f,g;for(var h=0;h<d.folds.length;h++){g=d.folds[h];var i=g.range.compareEnd(a,b);if(i==-1){f=this.getLine(g.start.row).substring(e.end.column,g.start.column);break}if(i===0)return null;e=g}return f||(f=this.getLine(g.start.row).substring(e.end.column)),c==-1?f.substring(0,b-e.end.column):c==1?f.substring(b-e.end.column):f},this.getFoldLine=function(a,b){var c=this.$foldData,d=0;b&&(d=c.indexOf(b)),d==-1&&(d=0);for(d;d<c.length;d++){var e=c[d];if(e.start.row<=a&&e.end.row>=a)return e;if(e.end.row>a)return null}return null},this.getNextFoldLine=function(a,b){var c=this.$foldData,d=0;b&&(d=c.indexOf(b)),d==-1&&(d=0);for(d;d<c.length;d++){var e=c[d];if(e.end.row>=a)return e}return null},this.getFoldedRowCount=function(a,b){var c=this.$foldData,d=b-a+1;for(var e=0;e<c.length;e++){var f=c[e],g=f.end.row,h=f.start.row;if(g>=b){h<b&&(h>=a?d-=b-h:d=0);break}g>=a&&(h>=a?d-=g-h:d-=g-a+1)}return d},this.$addFoldLine=function(a){return this.$foldData.push(a),this.$foldData.sort(function(a,b){return a.start.row-b.start.row}),a},this.addFold=function(a,b){var c=this.$foldData,d=!1,g;a instanceof f?g=a:g=new f(b,a),this.$clipRangeToDocument(g.range);var h=g.start.row,i=g.start.column,j=g.end.row,k=g.end.column;if(g.placeholder.length<2)throw"Placeholder has to be at least 2 characters";if(h==j&&k-i<2)throw"The range has to be at least 2 characters width";var l=this.getFoldAt(h,i,1),m=this.getFoldAt(j,k,-1);if(l&&m==l)return l.addSubFold(g);if(l&&!l.range.isStart(h,i)||m&&!m.range.isEnd(j,k))throw"A fold can't intersect already existing fold"+g.range+l.range;var n=this.getFoldsInRange(g.range);n.length>0&&(this.removeFolds(n),g.subFolds=n);for(var o=0;o<c.length;o++){var p=c[o];if(j==p.start.row){p.addFold(g),d=!0;break}if(h==p.end.row){p.addFold(g),d=!0;if(!g.sameRow){var q=c[o+1];if(q&&q.start.row==j){p.merge(q);break}}break}if(j<=p.start.row)break}return d||(p=this.$addFoldLine(new e(this.$foldData,g))),this.$useWrapMode?this.$updateWrapData(p.start.row,p.start.row):this.$updateRowLengthCache(p.start.row,p.start.row),this.$modified=!0,this._emit("changeFold",{data:g}),g},this.addFolds=function(a){a.forEach(function(a){this.addFold(a)},this)},this.removeFold=function(a){var b=a.foldLine,c=b.start.row,d=b.end.row,e=this.$foldData,f=b.folds;if(f.length==1)e.splice(e.indexOf(b),1);else if(b.range.isEnd(a.end.row,a.end.column))f.pop(),b.end.row=f[f.length-1].end.row,b.end.column=f[f.length-1].end.column;else if(b.range.isStart(a.start.row,a.start.column))f.shift(),b.start.row=f[0].start.row,b.start.column=f[0].start.column;else if(a.sameRow)f.splice(f.indexOf(a),1);else{var g=b.split(a.start.row,a.start.column);f=g.folds,f.shift(),g.start.row=f[0].start.row,g.start.column=f[0].start.column}this.$useWrapMode?this.$updateWrapData(c,d):this.$updateRowLengthCache(c,d),this.$modified=!0,this._emit("changeFold",{data:a})},this.removeFolds=function(a){var b=[];for(var c=0;c<a.length;c++)b.push(a[c]);b.forEach(function(a){this.removeFold(a)},this),this.$modified=!0},this.expandFold=function(a){this.removeFold(a),a.subFolds.forEach(function(a){this.addFold(a)},this),a.subFolds=[]},this.expandFolds=function(a){a.forEach(function(a){this.expandFold(a)},this)},this.unfold=function(a,b){var c,e;a==null?c=new d(0,0,this.getLength(),0):typeof a=="number"?c=new d(a,0,a,this.getLine(a).length):"row"in a?c=d.fromPoints(a,a):c=a,e=this.getFoldsInRange(c);if(b)this.removeFolds(e);else while(e.length)this.expandFolds(e),e=this.getFoldsInRange(c)},this.isRowFolded=function(a,b){return!!this.getFoldLine(a,b)},this.getRowFoldEnd=function(a,b){var c=this.getFoldLine(a,b);return c?c.end.row:a},this.getFoldDisplayLine=function(a,b,c,d,e){d==null&&(d=a.start.row,e=0),b==null&&(b=a.end.row,c=this.getLine(b).length);var f=this.doc,g="";return a.walk(function(a,b,c,h){if(b<d)return;if(b==d){if(c<e)return;h=Math.max(e,h)}a?g+=a:g+=f.getLine(b).substring(h,c)}.bind(this),b,c),g},this.getDisplayLine=function(a,b,c,d){var e=this.getFoldLine(a);if(!e){var f;return f=this.doc.getLine(a),f.substring(d||0,b||f.length)}return this.getFoldDisplayLine(e,a,b,c,d)},this.$cloneFoldData=function(){var a=[];return a=this.$foldData.map(function(b){var c=b.folds.map(function(a){return a.clone()});return new e(a,c)}),a},this.toggleFold=function(a){var b=this.selection,c=b.getRange(),d,e;if(c.isEmpty()){var f=c.start;d=this.getFoldAt(f.row,f.column);if(d){this.expandFold(d);return}(e=this.findMatchingBracket(f))?c.comparePoint(e)==1?c.end=e:(c.start=e,c.start.column++,c.end.column--):(e=this.findMatchingBracket({row:f.row,column:f.column+1}))?(c.comparePoint(e)==1?c.end=e:c.start=e,c.start.column++):c=this.getCommentFoldRange(f.row,f.column)||c}else{var g=this.getFoldsInRange(c);if(a&&g.length){this.expandFolds(g);return}g.length==1&&(d=g[0])}d||(d=this.getFoldAt(c.start.row,c.start.column));if(d&&d.range.toString()==c.toString()){this.expandFold(d);return}var h="...";if(!c.isMultiLine()){h=this.getTextRange(c);if(h.length<4)return;h=h.trim().substring(0,2)+".."}this.addFold(h,c)},this.getCommentFoldRange=function(a,b){var c=new g(this,a,b),e=c.getCurrentToken();if(e&&/^comment|string/.test(e.type)){var f=new d,h=new RegExp(e.type.replace(/\..*/,"\\."));do e=c.stepBackward();while(e&&h.test(e.type));c.stepForward(),f.start.row=c.getCurrentTokenRow(),f.start.column=c.getCurrentTokenColumn()+2,c=new g(this,a,b);do e=c.stepForward();while(e&&h.test(e.type));return e=c.stepBackward(),f.end.row=c.getCurrentTokenRow(),f.end.column=c.getCurrentTokenColumn()+e.value.length,f}},this.foldAll=function(a,b){var c=this.foldWidgets;b=b||this.getLength();for(var d=a||0;d<b;d++){c[d]==null&&(c[d]=this.getFoldWidget(d));if(c[d]!="start")continue;var e=this.getFoldWidgetRange(d);if(e&&e.end.row<b)try{this.addFold("...",e)}catch(f){}}},this.$foldStyles={manual:1,markbegin:1,markbeginend:1},this.$foldStyle="markbegin",this.setFoldStyle=function(a){if(!this.$foldStyles[a])throw new Error("invalid fold style: "+a+"["+Object.keys(this.$foldStyles).join(", ")+"]");if(this.$foldStyle==a)return;this.$foldStyle=a,a=="manual"&&this.unfold();var b=this.$foldMode;this.$setFolding(null),this.$setFolding(b)},this.$setFolding=function(a){if(this.$foldMode==a)return;this.$foldMode=a,this.removeListener("change",this.$updateFoldWidgets),this._emit("changeAnnotation");if(!a||this.$foldStyle=="manual"){this.foldWidgets=null;return}this.foldWidgets=[],this.getFoldWidget=a.getFoldWidget.bind(a,this,this.$foldStyle),this.getFoldWidgetRange=a.getFoldWidgetRange.bind(a,this,this.$foldStyle),this.$updateFoldWidgets=this.updateFoldWidgets.bind(this),this.on("change",this.$updateFoldWidgets)},this.onFoldWidgetClick=function(a,b){var c=this.getFoldWidget(a),d=this.getLine(a),e=b.shiftKey,f=e||b.ctrlKey||b.altKey||b.metaKey,g;c=="end"?g=this.getFoldAt(a,0,-1):g=this.getFoldAt(a,d.length,1);if(g){f?this.removeFold(g):this.expandFold(g);return}var h=this.getFoldWidgetRange(a);if(h){if(!h.isMultiLine()){g=this.getFoldAt(h.start.row,h.start.column,1);if(g&&h.isEqual(g.range)){this.removeFold(g);return}}e||this.addFold("...",h),f&&this.foldAll(h.start.row+1,h.end.row)}else f&&this.foldAll(a+1,this.getLength()),b.target.className+=" invalid"},this.updateFoldWidgets=function(a){var b=a.data,c=b.range,d=c.start.row,e=c.end.row-d;if(e===0)this.foldWidgets[d]=null;else if(b.action=="removeText"||b.action=="removeLines")this.foldWidgets.splice(d,e+1,null);else{var f=Array(e+1);f.unshift(d,1),this.foldWidgets.splice.apply(this.foldWidgets,f)}}}var d=a("../range").Range,e=a("./fold_line").FoldLine,f=a("./fold").Fold,g=a("../token_iterator").TokenIterator;b.Folding=h}),define("ace/edit_session/fold_line",["require","exports","module","ace/range"],function(a,b,c){function e(a,b){this.foldData=a,Array.isArray(b)?this.folds=b:b=this.folds=[b];var c=b[b.length-1];this.range=new d(b[0].start.row,b[0].start.column,c.end.row,c.end.column),this.start=this.range.start,this.end=this.range.end,this.folds.forEach(function(a){a.setFoldLine(this)},this)}var d=a("../range").Range;(function(){this.shiftRow=function(a){this.start.row+=a,this.end.row+=a,this.folds.forEach(function(b){b.start.row+=a,b.end.row+=a})},this.addFold=function(a){if(a.sameRow){if(a.start.row<this.startRow||a.endRow>this.endRow)throw"Can't add a fold to this FoldLine as it has no connection";this.folds.push(a),this.folds.sort(function(a,b){return-a.range.compareEnd(b.start.row,b.start.column)}),this.range.compareEnd(a.start.row,a.start.column)>0?(this.end.row=a.end.row,this.end.column=a.end.column):this.range.compareStart(a.end.row,a.end.column)<0&&(this.start.row=a.start.row,this.start.column=a.start.column)}else if(a.start.row==this.end.row)this.folds.push(a),this.end.row=a.end.row,this.end.column=a.end.column;else{if(a.end.row!=this.start.row)throw"Trying to add fold to FoldRow that doesn't have a matching row";this.folds.unshift(a),this.start.row=a.start.row,this.start.column=a.start.column}a.foldLine=this},this.containsRow=function(a){return a>=this.start.row&&a<=this.end.row},this.walk=function(a,b,c){var d=0,e=this.folds,f,g,h,i=!0;b==null&&(b=this.end.row,c=this.end.column);for(var j=0;j<e.length;j++){f=e[j],g=f.range.compareStart(b,c);if(g==-1){a(null,b,c,d,i);return}h=a(null,f.start.row,f.start.column,d,i),h=!h&&a(f.placeholder,f.start.row,f.start.column,d);if(h||g==0)return;i=!f.sameRow,d=f.end.column}a(null,b,c,d,i)},this.getNextFoldTo=function(a,b){var c,d;for(var e=0;e<this.folds.length;e++){c=this.folds[e],d=c.range.compareEnd(a,b);if(d==-1)return{fold:c,kind:"after"};if(d==0)return{fold:c,kind:"inside"}}return null},this.addRemoveChars=function(a,b,c){var d=this.getNextFoldTo(a,b),e,f;if(d){e=d.fold;if(d.kind=="inside"&&e.start.column!=b&&e.start.row!=a)window.console&&window.console.log(a,b,e);else if(e.start.row==a){f=this.folds;var g=f.indexOf(e);g==0&&(this.start.column+=c);for(g;g<f.length;g++){e=f[g],e.start.column+=c;if(!e.sameRow)return;e.end.column+=c}this.end.column+=c}}},this.split=function(a,b){var c=this.getNextFoldTo(a,b).fold,d=this.folds,f=this.foldData;if(!c)return null;var g=d.indexOf(c),h=d[g-1];this.end.row=h.end.row,this.end.column=h.end.column,d=d.splice(g,d.length-g);var i=new e(f,d);return f.splice(f.indexOf(this)+1,0,i),i},this.merge=function(a){var b=a.folds;for(var c=0;c<b.length;c++)this.addFold(b[c]);var d=this.foldData;d.splice(d.indexOf(a),1)},this.toString=function(){var a=[this.range.toString()+": ["];return this.folds.forEach(function(b){a.push("  "+b.toString())}),a.push("]"),a.join("\n")},this.idxToPosition=function(a){var b=0,c;for(var d=0;d<this.folds.length;d++){var c=this.folds[d];a-=c.start.column-b;if(a<0)return{row:c.start.row,column:c.start.column+a};a-=c.placeholder.length;if(a<0)return c.start;b=c.end.column}return{row:this.end.row,column:this.end.column+a}}}).call(e.prototype),b.FoldLine=e}),define("ace/edit_session/fold",["require","exports","module"],function(a,b,c){var d=b.Fold=function(a,b){this.foldLine=null,this.placeholder=b,this.range=a,this.start=a.start,this.end=a.end,this.sameRow=a.start.row==a.end.row,this.subFolds=[]};(function(){this.toString=function(){return'"'+this.placeholder+'" '+this.range.toString()},this.setFoldLine=function(a){this.foldLine=a,this.subFolds.forEach(function(b){b.setFoldLine(a)})},this.clone=function(){var a=this.range.clone(),b=new d(a,this.placeholder);return this.subFolds.forEach(function(a){b.subFolds.push(a.clone())}),b},this.addSubFold=function(a){if(this.range.isEqual(a))return this;if(!this.range.containsRange(a))throw"A fold can't intersect already existing fold"+a.range+this.range;var b=a.range.start.row,c=a.range.start.column;for(var d=0,e=-1;d<this.subFolds.length;d++){e=this.subFolds[d].range.compare(b,c);if(e!=1)break}var f=this.subFolds[d];if(e==0)return f.addSubFold(a);var b=a.range.end.row,c=a.range.end.column;for(var g=d,e=-1;g<this.subFolds.length;g++){e=this.subFolds[g].range.compare(b,c);if(e!=1)break}var h=this.subFolds[g];if(e==0)throw"A fold can't intersect already existing fold"+a.range+this.range;var i=this.subFolds.splice(d,g-d,a);return a.setFoldLine(this.foldLine),a}}).call(d.prototype)}),define("ace/token_iterator",["require","exports","module"],function(a,b,c){var d=function(a,b,c){this.$session=a,this.$row=b,this.$rowTokens=a.getTokens(b);var d=a.getTokenAt(b,c);this.$tokenIndex=d?d.index:-1};(function(){this.stepBackward=function(){this.$tokenIndex-=1;while(this.$tokenIndex<0){this.$row-=1;if(this.$row<0)return this.$row=0,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=this.$rowTokens.length-1}return this.$rowTokens[this.$tokenIndex]},this.stepForward=function(){var a=this.$session.getLength();this.$tokenIndex+=1;while(this.$tokenIndex>=this.$rowTokens.length){this.$row+=1;if(this.$row>=a)return this.$row=a-1,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=0}return this.$rowTokens[this.$tokenIndex]},this.getCurrentToken=function(){return this.$rowTokens[this.$tokenIndex]},this.getCurrentTokenRow=function(){return this.$row},this.getCurrentTokenColumn=function(){var a=this.$rowTokens,b=this.$tokenIndex,c=a[b].start;if(c!==undefined)return c;c=0;while(b>0)b-=1,c+=a[b].value.length;return c}}).call(d.prototype),b.TokenIterator=d}),define("ace/edit_session/bracket_match",["require","exports","module","ace/token_iterator","ace/range"],function(a,b,c){function f(){this.findMatchingBracket=function(a){if(a.column==0)return null;var b=this.getLine(a.row).charAt(a.column-1);if(b=="")return null;var c=b.match(/([\(\[\{])|([\)\]\}])/);return c?c[1]?this.$findClosingBracket(c[1],a):this.$findOpeningBracket(c[2],a):null},this.getBracketRange=function(a){var b=this.getLine(a.row),c=!0,d,f=b.charAt(a.column-1),g=f&&f.match(/([\(\[\{])|([\)\]\}])/);g||(f=b.charAt(a.column),a.column++,g=f&&f.match(/([\(\[\{])|([\)\]\}])/),c=!1);if(!g)return null;if(g[1]){var h=this.$findClosingBracket(g[1],a);if(!h)return null;d=e.fromPoints(a,h),c||(d.end.column++,d.start.column--),d.cursor=d.end}else{var h=this.$findOpeningBracket(g[2],a);if(!h)return null;d=e.fromPoints(h,a),c||(d.start.column++,d.end.column--),d.cursor=d.start}return c||a.column--,d},this.$brackets={")":"(","(":")","]":"[","[":"]","{":"}","}":"{"},this.$findOpeningBracket=function(a,b,c){var e=this.$brackets[a],f=1,g=new d(this,b.row,b.column),h=g.getCurrentToken();h||(h=g.stepForward());if(!h)return;c||(c=new RegExp("(\\.?"+h.type.replace(".","\\.").replace("rparen",".paren")+")+"));var i=b.column-g.getCurrentTokenColumn()-2,j=h.value;for(;;){while(i>=0){var k=j.charAt(i);if(k==e){f-=1;if(f==0)return{row:g.getCurrentTokenRow(),column:i+g.getCurrentTokenColumn()}}else k==a&&(f+=1);i-=1}do h=g.stepBackward();while(h&&!c.test(h.type));if(h==null)break;j=h.value,i=j.length-1}return null},this.$findClosingBracket=function(a,b,c,e){var f=this.$brackets[a],g=1,h=new d(this,b.row,b.column),i=h.getCurrentToken();i||(i=h.stepForward());if(!i)return;c||(c=new RegExp("(\\.?"+i.type.replace(".","\\.").replace("lparen",".paren")+")+"));var j=b.column-h.getCurrentTokenColumn();for(;;){var k=i.value,l=k.length;while(j<l){var m=k.charAt(j);if(m==f){g-=1;if(g==0)return{row:h.getCurrentTokenRow(),column:j+h.getCurrentTokenColumn()}}else m==a&&(g+=1);j+=1}do{i=h.stepForward();if(e)if(i===null||i.type=="string")return{row:h.getCurrentTokenRow()+(i===null?1:-1),column:0}}while(i&&!c.test(i.type));if(i==null)break;j=0}return null}}var d=a("../token_iterator").TokenIterator,e=a("../range").Range;b.BracketMatch=f}),define("ace/search",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"],function(a,b,c){var d=a("./lib/lang"),e=a("./lib/oop"),f=a("./range").Range,g=function(){this.$options={}};(function(){this.set=function(a){return e.mixin(this.$options,a),this},this.getOptions=function(){return d.copyObject(this.$options)},this.setOptions=function(a){this.$options=a},this.find=function(a){var b=this.$matchIterator(a,this.$options);if(!b)return!1;var c=null;return b.forEach(function(a,b,d){if(!a.start){var e=a.offset+(d||0);c=new f(b,e,b,e+a.length)}else c=a;return!0}),c},this.findAll=function(a){var b=this.$options;if(!b.needle)return[];this.$assembleRegExp(b);if(b.range)var c=b.range,e=a.getLines(c.start.row,c.end.row);else var e=a.doc.getAllLines();var g=[],h=b.re;if(b.$isMultiLine){var i=h.length,j=e.length-i;for(var k=h.offset||0;k<j;k++){for(var l=0;l<h.length;l++)if(e[k+l].search(h[l])==-1)break;var m=e[k+l].match(h[0])[0].length,n=line.match(h[i-1])[0].length;g.push(new f(k,startLine.length-m,k+i-1,n))}}else for(var o=0;o<e.length;o++){var p=d.getMatchOffsets(e[o],h);for(var l=0;l<p.length;l++){var q=p[l];g.push(new f(o,q.offset,o,q.offset+q.length))}}if(b.range){var r=c.start.column,s=c.start.column,o=0,l=g.length-1;while(o<l&&g[o].start.column<r&&g[o].start.row==c.start.row)o++;while(o<l&&g[l].end.column>s&&g[l].end.row==c.end.row)l--;return g.slice(o,l+1)}return g},this.replace=function(a,b){var c=this.$options,d=this.$assembleRegExp(c);if(c.$isMultiLine)return b;if(!d)return;var e=d.exec(a);if(!e||e[0].length!=a.length)return null;b=a.replace(d,b);if(c.preserveCase){b=b.split("");for(var f=Math.min(a.length,a.length);f--;){var g=a[f];g&&g.toLowerCase()!=g?b[f]=b[f].toUpperCase():b[f]=b[f].toLowerCase()}b=b.join("")}return b},this.$matchIterator=function(a,b){var c=this.$assembleRegExp(b);if(!c)return!1;var e=this,g,h=b.backwards;if(b.$isMultiLine)var i=c.length,j=function(b,d,e){var h=b.search(c[0]);if(h==-1)return;for(var j=1;j<i;j++){b=a.getLine(d+j);if(b.search(c[j])==-1)return}var k=b.match(c[i-1])[0].length,l=new f(d,h,d+i-1,k);c.offset==1?(l.start.row--,l.start.column=Number.MAX_VALUE):e&&(l.start.column+=e);if(g(l))return!0};else if(h)var j=function(a,b,e){var f=d.getMatchOffsets(a,c);for(var h=f.length-1;h>=0;h--)if(g(f[h],b,e))return!0};else var j=function(a,b,e){var f=d.getMatchOffsets(a,c);for(var h=0;h<f.length;h++)if(g(f[h],b,e))return!0};return{forEach:function(c){g=c,e.$lineIterator(a,b).forEach(j)}}},this.$assembleRegExp=function(a){if(a.needle instanceof RegExp)return a.re=a.needle;var b=a.needle;if(!a.needle)return a.re=!1;a.regExp||(b=d.escapeRegExp(b)),a.wholeWord&&(b="\\b"+b+"\\b");var c=a.caseSensitive?"g":"gi";a.$isMultiLine=/[\n\r]/.test(b);if(a.$isMultiLine)return a.re=this.$assembleMultilineRegExp(b,c);try{var e=new RegExp(b,c)}catch(f){var e=!1}return a.re=e},this.$assembleMultilineRegExp=function(a,b){var c=a.replace(/\r\n|\r|\n/g,"$\n^").split("\n"),d=[];for(var e=0;e<c.length;e++)try{d.push(new RegExp(c[e],b))}catch(f){return!1}return c[0]==""?(d.shift(),d.offset=1):d.offset=0,d},this.$lineIterator=function(a,b){var c=b.range,d=b.backwards==1,e=b.skipCurrent!=0,c=b.range,f=b.start;f||(f=c?c[d?"end":"start"]:a.selection.getRange()),f.start&&(f=f[e!=d?"end":"start"]);var g=c?c.start.row:0,h=c?c.start.column:0,i=c?c.end.row:a.getLength()-1;if(!d)var j=function(c){var d=f.row,e=a.getLine(d).substr(f.column);if(c(e,d,f.column))return;for(d+=1;d<=i;d++)if(c(a.getLine(d),d))return;if(b.wrap==0)return;for(d=g,i=f.row;d<=i;d++)if(c(a.getLine(d),d))return};else var j=function(c){var d=f.row,e=a.getLine(d).substring(0,f.column);if(c(e,d))return;for(d--;d>=g;d--)if(c(a.getLine(d),d))return;if(b.wrap==0)return;for(d=i,g=f.row;d>=g;d--)if(c(a.getLine(d),d))return};return{forEach:j}}}).call(g.prototype),b.Search=g}),define("ace/commands/command_manager",["require","exports","module","ace/lib/oop","ace/keyboard/hash_handler","ace/lib/event_emitter"],function(a,b,c){var d=a("../lib/oop"),e=a("../keyboard/hash_handler").HashHandler,f=a("../lib/event_emitter").EventEmitter,g=function(a,b){this.platform=a,this.commands={},this.commmandKeyBinding={},this.addCommands(b),this.setDefaultHandler("exec",function(a){return a.command.exec(a.editor,a.args||{})})};d.inherits(g,e),function(){d.implement(this,f),this.exec=function(a,b,c){typeof a=="string"&&(a=this.commands[a]);if(!a)return!1;if(b&&b.$readOnly&&!a.readOnly)return!1;var d=this._emit("exec",{editor:b,command:a,args:c});return d===!1?!1:!0},this.toggleRecording=function(){if(this.$inReplay)return;return this.recording?(this.macro.pop(),this.removeEventListener("exec",this.$addCommandToMacro),this.macro.length||(this.macro=this.oldMacro),this.recording=!1):(this.$addCommandToMacro||(this.$addCommandToMacro=function(a){this.macro.push([a.command,a.args])}.bind(this)),this.oldMacro=this.macro,this.macro=[],this.on("exec",this.$addCommandToMacro),this.recording=!0)},this.replay=function(a){if(this.$inReplay||!this.macro)return;if(this.recording)return this.toggleRecording();try{this.$inReplay=!0,this.macro.forEach(function(b){typeof b=="string"?this.exec(b,a):this.exec(b[0],a,b[1])},this)}finally{this.$inReplay=!1}},this.trimMacro=function(a){return a.map(function(a){return typeof a[0]!="string"&&(a[0]=a[0].name),a[1]||(a=a[0]),a})}}.call(g.prototype),b.CommandManager=g}),define("ace/keyboard/hash_handler",["require","exports","module","ace/lib/keys"],function(a,b,c){function e(a,b){this.platform=b,this.commands={},this.commmandKeyBinding={},this.addCommands(a)}var d=a("../lib/keys");(function(){this.addCommand=function(a){this.commands[a.name]&&this.removeCommand(a),this.commands[a.name]=a,a.bindKey&&this._buildKeyHash(a)},this.removeCommand=function(a){var b=typeof a=="string"?a:a.name;a=this.commands[b],delete this.commands[b];var c=this.commmandKeyBinding;for(var d in c)for(var e in c[d])c[d][e]==a&&delete c[d][e]},this.bindKey=function(a,b){if(!a)return;if(typeof b=="function"){this.addCommand({exec:b,bindKey:a,name:a});return}var c=this.commmandKeyBinding;a.split("|").forEach(function(a){var d=this.parseKeys(a,b),e=d.hashId;(c[e]||(c[e]={}))[d.key]=b},this)},this.addCommands=function(a){a&&Object.keys(a).forEach(function(b){var c=a[b];if(typeof c=="string")return this.bindKey(c,b);typeof c=="function"&&(c={exec:c}),c.name||(c.name=b),this.addCommand(c)},this)},this.removeCommands=function(a){Object.keys(a).forEach(function(b){this.removeCommand(a[b])},this)},this.bindKeys=function(a){Object.keys(a).forEach(function(b){this.bindKey(b,a[b])},this)},this._buildKeyHash=function(a){var b=a.bindKey;if(!b)return;var c=typeof b=="string"?b:b[this.platform];this.bindKey(c,a)},this.parseKeys=function(a){var b,c=0,e=a.toLowerCase().trim().split(/\s*\-\s*/);for(var f=0,g=e.length;f<g;f++)d.KEY_MODS[e[f]]?c|=d.KEY_MODS[e[f]]:b=e[f]||"-";return e[0]=="text"&&e.length==2&&(c=-1,b=e[1]),{key:b,hashId:c}},this.findKeyCommand=function(b,c){var d=this.commmandKeyBinding;return d[b]&&d[b][c.toLowerCase()]},this.handleKeyboard=function(a,b,c,d){return{command:this.findKeyCommand(b,c)}}}).call(e.prototype),b.HashHandler=e}),define("ace/commands/default_commands",["require","exports","module","ace/lib/lang"],function(a,b,c){function e(a,b){return{win:a,mac:b}}var d=a("../lib/lang");b.commands=[{name:"selectall",bindKey:e("Ctrl-A","Command-A"),exec:function(a){a.selectAll()},readOnly:!0},{name:"centerselection",bindKey:e(null,"Ctrl-L"),exec:function(a){a.centerSelection()},readOnly:!0},{name:"gotoline",bindKey:e("Ctrl-L","Command-L"),exec:function(a){var b=parseInt(prompt("Enter line number:"),10);isNaN(b)||a.gotoLine(b)},readOnly:!0},{name:"fold",bindKey:e("Alt-L|Ctrl-F1","Command-Alt-L|Command-F1"),exec:function(a){a.session.toggleFold(!1)},readOnly:!0},{name:"unfold",bindKey:e("Alt-Shift-L|Ctrl-Shift-F1","Command-Alt-Shift-L|Command-Shift-F1"),exec:function(a){a.session.toggleFold(!0)},readOnly:!0},{name:"foldall",bindKey:e("Alt-0","Command-Option-0"),exec:function(a){a.session.foldAll()},readOnly:!0},{name:"unfoldall",bindKey:e("Alt-Shift-0","Command-Option-Shift-0"),exec:function(a){a.session.unfold()},readOnly:!0},{name:"findnext",bindKey:e("Ctrl-K","Command-G"),exec:function(a){a.findNext()},readOnly:!0},{name:"findprevious",bindKey:e("Ctrl-Shift-K","Command-Shift-G"),exec:function(a){a.findPrevious()},readOnly:!0},{name:"find",bindKey:e("Ctrl-F","Command-F"),exec:function(a){var b=prompt("Find:",a.getCopyText());a.find(b)},readOnly:!0},{name:"overwrite",bindKey:"Insert",exec:function(a){a.toggleOverwrite()},readOnly:!0},{name:"selecttostart",bindKey:e("Ctrl-Shift-Home","Command-Shift-Up"),exec:function(a){a.getSelection().selectFileStart()},readOnly:!0},{name:"gotostart",bindKey:e("Ctrl-Home","Command-Home|Command-Up"),exec:function(a){a.navigateFileStart()},readOnly:!0},{name:"selectup",bindKey:e("Shift-Up","Shift-Up"),exec:function(a){a.getSelection().selectUp()},multiSelectAction:"forEach",readOnly:!0},{name:"golineup",bindKey:e("Up","Up|Ctrl-P"),exec:function(a,b){a.navigateUp(b.times)},multiSelectAction:"forEach",readOnly:!0},{name:"selecttoend",bindKey:e("Ctrl-Shift-End","Command-Shift-Down"),exec:function(a){a.getSelection().selectFileEnd()},multiSelectAction:"forEach",readOnly:!0},{name:"gotoend",bindKey:e("Ctrl-End","Command-End|Command-Down"),exec:function(a){a.navigateFileEnd()},multiSelectAction:"forEach",readOnly:!0},{name:"selectdown",bindKey:e("Shift-Down","Shift-Down"),exec:function(a){a.getSelection().selectDown()},multiSelectAction:"forEach",readOnly:!0},{name:"golinedown",bindKey:e("Down","Down|Ctrl-N"),exec:function(a,b){a.navigateDown(b.times)},multiSelectAction:"forEach",readOnly:!0},{name:"selectwordleft",bindKey:e("Ctrl-Shift-Left","Option-Shift-Left"),exec:function(a){a.getSelection().selectWordLeft()},multiSelectAction:"forEach",readOnly:!0},{name:"gotowordleft",bindKey:e("Ctrl-Left","Option-Left"),exec:function(a){a.navigateWordLeft()},multiSelectAction:"forEach",readOnly:!0},{name:"selecttolinestart",bindKey:e("Alt-Shift-Left","Command-Shift-Left"),exec:function(a){a.getSelection().selectLineStart()},multiSelectAction:"forEach",readOnly:!0},{name:"gotolinestart",bindKey:e("Alt-Left|Home","Command-Left|Home|Ctrl-A"),exec:function(a){a.navigateLineStart()},multiSelectAction:"forEach",readOnly:!0},{name:"selectleft",bindKey:e("Shift-Left","Shift-Left"),exec:function(a){a.getSelection().selectLeft()},multiSelectAction:"forEach",readOnly:!0},{name:"gotoleft",bindKey:e("Left","Left|Ctrl-B"),exec:function(a,b){a.navigateLeft(b.times)},multiSelectAction:"forEach",readOnly:!0},{name:"selectwordright",bindKey:e("Ctrl-Shift-Right","Option-Shift-Right"),exec:function(a){a.getSelection().selectWordRight()},multiSelectAction:"forEach",readOnly:!0},{name:"gotowordright",bindKey:e("Ctrl-Right","Option-Right"),exec:function(a){a.navigateWordRight()},multiSelectAction:"forEach",readOnly:!0},{name:"selecttolineend",bindKey:e("Alt-Shift-Right","Command-Shift-Right"),exec:function(a){a.getSelection().selectLineEnd()},multiSelectAction:"forEach",readOnly:!0},{name:"gotolineend",bindKey:e("Alt-Right|End","Command-Right|End|Ctrl-E"),exec:function(a){a.navigateLineEnd()},multiSelectAction:"forEach",readOnly:!0},{name:"selectright",bindKey:e("Shift-Right","Shift-Right"),exec:function(a){a.getSelection().selectRight()},multiSelectAction:"forEach",readOnly:!0},{name:"gotoright",bindKey:e("Right","Right|Ctrl-F"),exec:function(a,b){a.navigateRight(b.times)},multiSelectAction:"forEach",readOnly:!0},{name:"selectpagedown",bindKey:"Shift-PageDown",exec:function(a){a.selectPageDown()},readOnly:!0},{name:"pagedown",bindKey:e(null,"Option-PageDown"),exec:function(a){a.scrollPageDown()},readOnly:!0},{name:"gotopagedown",bindKey:e("PageDown","PageDown|Ctrl-V"),exec:function(a){a.gotoPageDown()},readOnly:!0},{name:"selectpageup",bindKey:"Shift-PageUp",exec:function(a){a.selectPageUp()},readOnly:!0},{name:"pageup",bindKey:e(null,"Option-PageUp"),exec:function(a){a.scrollPageUp()},readOnly:!0},{name:"gotopageup",bindKey:"PageUp",exec:function(a){a.gotoPageUp()},readOnly:!0},{name:"scrollup",bindKey:e("Ctrl-Up",null),exec:function(a){a.renderer.scrollBy(0,-2*a.renderer.layerConfig.lineHeight)},readOnly:!0},{name:"scrolldown",bindKey:e("Ctrl-Down",null),exec:function(a){a.renderer.scrollBy(0,2*a.renderer.layerConfig.lineHeight)},readOnly:!0},{name:"selectlinestart",bindKey:"Shift-Home",exec:function(a){a.getSelection().selectLineStart()},multiSelectAction:"forEach",readOnly:!0},{name:"selectlineend",bindKey:"Shift-End",exec:function(a){a.getSelection().selectLineEnd()},multiSelectAction:"forEach",readOnly:!0},{name:"togglerecording",bindKey:e("Ctrl-Alt-E","Command-Option-E"),exec:function(a){a.commands.toggleRecording()},readOnly:!0},{name:"replaymacro",bindKey:e("Ctrl-Shift-E","Command-Shift-E"),exec:function(a){a.commands.replay(a)},readOnly:!0},{name:"jumptomatching",bindKey:e("Ctrl-P","Ctrl-P"),exec:function(a){a.jumpToMatching()},multiSelectAction:"forEach",readOnly:!0},{name:"selecttomatching",bindKey:e("Ctrl-Shift-P","Ctrl-Shift-P"),exec:function(a){a.jumpToMatching(!0)},readOnly:!0},{name:"cut",exec:function(a){var b=a.getSelectionRange();a._emit("cut",b),a.selection.isEmpty()||(a.session.remove(b),a.clearSelection())},multiSelectAction:"forEach"},{name:"removeline",bindKey:e("Ctrl-D","Command-D"),exec:function(a){a.removeLines()},multiSelectAction:"forEach"},{name:"duplicateSelection",bindKey:e("Ctrl-Shift-D","Command-Shift-D"),exec:function(a){a.duplicateSelection()},multiSelectAction:"forEach"},{name:"togglecomment",bindKey:e("Ctrl-/","Command-/"),exec:function(a){a.toggleCommentLines()},multiSelectAction:"forEach"},{name:"replace",bindKey:e("Ctrl-R","Command-Option-F"),exec:function(a){var b=prompt("Find:",a.getCopyText());if(!b)return;var c=prompt("Replacement:");if(!c)return;a.replace(c,{needle:b})}},{name:"replaceall",bindKey:e("Ctrl-Shift-R","Command-Shift-Option-F"),exec:function(a){var b=prompt("Find:");if(!b)return;var c=prompt("Replacement:");if(!c)return;a.replaceAll(c,{needle:b})}},{name:"undo",bindKey:e("Ctrl-Z","Command-Z"),exec:function(a){a.undo()}},{name:"redo",bindKey:e("Ctrl-Shift-Z|Ctrl-Y","Command-Shift-Z|Command-Y"),exec:function(a){a.redo()}},{name:"copylinesup",bindKey:e("Alt-Shift-Up","Command-Option-Up"),exec:function(a){a.copyLinesUp()}},{name:"movelinesup",bindKey:e("Alt-Up","Option-Up"),exec:function(a){a.moveLinesUp()}},{name:"copylinesdown",bindKey:e("Alt-Shift-Down","Command-Option-Down"),exec:function(a){a.copyLinesDown()}},{name:"movelinesdown",bindKey:e("Alt-Down","Option-Down"),exec:function(a){a.moveLinesDown()}},{name:"del",bindKey:e("Delete","Delete|Ctrl-D"),exec:function(a){a.remove("right")},multiSelectAction:"forEach"},{name:"backspace",bindKey:e("Command-Backspace|Option-Backspace|Shift-Backspace|Backspace","Ctrl-Backspace|Command-Backspace|Shift-Backspace|Backspace|Ctrl-H"),exec:function(a){a.remove("left")},multiSelectAction:"forEach"},{name:"removetolinestart",bindKey:e("Alt-Backspace","Command-Backspace"),exec:function(a){a.removeToLineStart()},multiSelectAction:"forEach"},{name:"removetolineend",bindKey:e("Alt-Delete","Ctrl-K"),exec:function(a){a.removeToLineEnd()},multiSelectAction:"forEach"},{name:"removewordleft",bindKey:e("Ctrl-Backspace","Alt-Backspace|Ctrl-Alt-Backspace"),exec:function(a){a.removeWordLeft()},multiSelectAction:"forEach"},{name:"removewordright",bindKey:e("Ctrl-Delete","Alt-Delete"),exec:function(a){a.removeWordRight()},multiSelectAction:"forEach"},{name:"outdent",bindKey:e("Shift-Tab","Shift-Tab"),exec:function(a){a.blockOutdent()},multiSelectAction:"forEach"},{name:"indent",bindKey:e("Tab","Tab"),exec:function(a){a.indent()},multiSelectAction:"forEach"},{name:"insertstring",exec:function(a,b){a.insert(b)},multiSelectAction:"forEach"},{name:"inserttext",exec:function(a,b){a.insert(d.stringRepeat(b.text||"",b.times||1))},multiSelectAction:"forEach"},{name:"splitline",bindKey:e(null,"Ctrl-O"),exec:function(a){a.splitLine()},multiSelectAction:"forEach"},{name:"transposeletters",bindKey:e("Ctrl-T","Ctrl-T"),exec:function(a){a.transposeLetters()},multiSelectAction:function(a){a.transposeSelections(1)}},{name:"touppercase",bindKey:e("Ctrl-U","Ctrl-U"),exec:function(a){a.toUpperCase()},multiSelectAction:"forEach"},{name:"tolowercase",bindKey:e("Ctrl-Shift-U","Ctrl-Shift-U"),exec:function(a){a.toLowerCase()},multiSelectAction:"forEach"}]}),define("ace/undomanager",["require","exports","module"],function(a,b,c){var d=function(){this.reset()};(function(){this.execute=function(a){var b=a.args[0];this.$doc=a.args[1],this.$undoStack.push(b),this.$redoStack=[]},this.undo=function(a){var b=this.$undoStack.pop(),c=null;return b&&(c=this.$doc.undoChanges(b,a),this.$redoStack.push(b)),c},this.redo=function(a){var b=this.$redoStack.pop(),c=null;return b&&(c=this.$doc.redoChanges(b,a),this.$undoStack.push(b)),c},this.reset=function(){this.$undoStack=[],this.$redoStack=[]},this.hasUndo=function(){return this.$undoStack.length>0},this.hasRedo=function(){return this.$redoStack.length>0}}).call(d.prototype),b.UndoManager=d}),define("ace/virtual_renderer",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/event","ace/lib/useragent","ace/config","ace/lib/net","ace/layer/gutter","ace/layer/marker","ace/layer/text","ace/layer/cursor","ace/scrollbar","ace/renderloop","ace/lib/event_emitter","text!ace/css/editor.css"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/dom"),f=a("./lib/event"),g=a("./lib/useragent"),h=a("./config"),i=a("./lib/net"),j=a("./layer/gutter").Gutter,k=a("./layer/marker").Marker,l=a("./layer/text").Text,m=a("./layer/cursor").Cursor,n=a("./scrollbar").ScrollBar,o=a("./renderloop").RenderLoop,p=a("./lib/event_emitter").EventEmitter,q=a("text!./css/editor.css");e.importCssString(q,"ace_editor");var r=function(a,b){var c=this;this.container=a,this.$keepTextAreaAtCursor=!g.isIE,e.addCssClass(a,"ace_editor"),this.setTheme(b),this.$gutter=e.createElement("div"),this.$gutter.className="ace_gutter",this.container.appendChild(this.$gutter),this.scroller=e.createElement("div"),this.scroller.className="ace_scroller",this.container.appendChild(this.scroller),this.content=e.createElement("div"),this.content.className="ace_content",this.scroller.appendChild(this.content),this.$gutterLayer=new j(this.$gutter),this.$gutterLayer.on("changeGutterWidth",this.onResize.bind(this,!0)),this.setFadeFoldWidgets(!0),this.$markerBack=new k(this.content);var d=this.$textLayer=new l(this.content);this.canvas=d.element,this.$markerFront=new k(this.content),this.characterWidth=d.getCharacterWidth(),this.lineHeight=d.getLineHeight(),this.$cursorLayer=new m(this.content),this.$cursorPadding=8,this.$horizScroll=!1,this.$horizScrollAlwaysVisible=!1,this.$animatedScroll=!1,this.scrollBar=new n(a),this.scrollBar.addEventListener("scroll",function(a){c.$inScrollAnimation||c.session.setScrollTop(a.data)}),this.scrollTop=0,this.scrollLeft=0,f.addListener(this.scroller,"scroll",function(){var a=c.scroller.scrollLeft;c.scrollLeft=a,c.session.setScrollLeft(a)}),this.cursorPos={row:0,column:0},this.$textLayer.addEventListener("changeCharacterSize",function(){c.characterWidth=d.getCharacterWidth(),c.lineHeight=d.getLineHeight(),c.$updatePrintMargin(),c.onResize(!0),c.$loop.schedule(c.CHANGE_FULL)}),this.$size={width:0,height:0,scrollerHeight:0,scrollerWidth:0},this.layerConfig={width:1,padding:0,firstRow:0,firstRowScreen:0,lastRow:0,lineHeight:1,characterWidth:1,minHeight:1,maxHeight:1,offset:0,height:1},this.$loop=new o(this.$renderChanges.bind(this),this.container.ownerDocument.defaultView),this.$loop.schedule(this.CHANGE_FULL),this.setPadding(4),this.$updatePrintMargin()};(function(){this.showGutter=!0,this.CHANGE_CURSOR=1,this.CHANGE_MARKER=2,this.CHANGE_GUTTER=4,this.CHANGE_SCROLL=8,this.CHANGE_LINES=16,this.CHANGE_TEXT=32,this.CHANGE_SIZE=64,this.CHANGE_MARKER_BACK=128,this.CHANGE_MARKER_FRONT=256,this.CHANGE_FULL=512,this.CHANGE_H_SCROLL=1024,d.implement(this,p),this.setSession=function(a){this.session=a,this.scroller.className="ace_scroller",this.$cursorLayer.setSession(a),this.$markerBack.setSession(a),this.$markerFront.setSession(a),this.$gutterLayer.setSession(a),this.$textLayer.setSession(a),this.$loop.schedule(this.CHANGE_FULL)},this.updateLines=function(a,b){b===undefined&&(b=Infinity),this.$changedLines?(this.$changedLines.firstRow>a&&(this.$changedLines.firstRow=a),this.$changedLines.lastRow<b&&(this.$changedLines.lastRow=b)):this.$changedLines={firstRow:a,lastRow:b},this.$loop.schedule(this.CHANGE_LINES)},this.updateText=function(){this.$loop.schedule(this.CHANGE_TEXT)},this.updateFull=function(){this.$loop.schedule(this.CHANGE_FULL)},this.updateFontSize=function(){this.$textLayer.checkForSizeChanges()},this.onResize=function(a){var b=this.CHANGE_SIZE,c=this.$size,d=e.getInnerHeight(this.container);if(a||c.height!=d)c.height=d,this.scroller.style.height=d+"px",c.scrollerHeight=this.scroller.clientHeight,this.scrollBar.setHeight(c.scrollerHeight),this.session&&(this.session.setScrollTop(this.getScrollTop()),b|=this.CHANGE_FULL);var f=e.getInnerWidth(this.container);if(a||c.width!=f){c.width=f;var g=this.showGutter?this.$gutter.offsetWidth:0;this.scroller.style.left=g+"px",c.scrollerWidth=Math.max(0,f-g-this.scrollBar.getWidth()),this.scroller.style.width=c.scrollerWidth+"px";if(this.session.getUseWrapMode()&&this.adjustWrapLimit()||a)b|=this.CHANGE_FULL}this.$loop.schedule(b)},this.adjustWrapLimit=function(){var a=this.$size.scrollerWidth-this.$padding*2,b=Math.floor(a/this.characterWidth);return this.session.adjustWrapLimit(b)},this.setAnimatedScroll=function(a){this.$animatedScroll=a},this.getAnimatedScroll=function(){return this.$animatedScroll},this.setShowInvisibles=function(a){this.$textLayer.setShowInvisibles(a)&&this.$loop.schedule(this.CHANGE_TEXT)},this.getShowInvisibles=function(){return this.$textLayer.showInvisibles},this.$showPrintMargin=!0,this.setShowPrintMargin=function(a){this.$showPrintMargin=a,this.$updatePrintMargin()},this.getShowPrintMargin=function(){return this.$showPrintMargin},this.$printMarginColumn=80,this.setPrintMarginColumn=function(a){this.$printMarginColumn=a,this.$updatePrintMargin()},this.getPrintMarginColumn=function(){return this.$printMarginColumn},this.getShowGutter=function(){return this.showGutter},this.setShowGutter=function(a){if(this.showGutter===a)return;this.$gutter.style.display=a?"block":"none",this.showGutter=a,this.onResize(!0)},this.getFadeFoldWidgets=function(){return e.hasCssClass(this.$gutter,"ace_fade-fold-widgets")},this.setFadeFoldWidgets=function(a){a?e.addCssClass(this.$gutter,"ace_fade-fold-widgets"):e.removeCssClass(this.$gutter,"ace_fade-fold-widgets")},this.$highlightGutterLine=!0,this.setHighlightGutterLine=function(a){if(this.$highlightGutterLine==a)return;this.$highlightGutterLine=a,this.$loop.schedule(this.CHANGE_GUTTER)},this.getHighlightGutterLine=function(){return this.$highlightGutterLine},this.$updateGutterLineHighlight=function(a){var b=this.session.selection.lead.row;if(b==this.$gutterLineHighlight)return;if(!a){var c,d=this.$gutterLayer.element.children,f=this.$gutterLineHighlight-this.layerConfig.firstRow;f>=0&&(c=d[f])&&e.removeCssClass(c,"ace_gutter_active_line"),f=b-this.layerConfig.firstRow,f>=0&&(c=d[f])&&e.addCssClass(c,"ace_gutter_active_line")}this.$gutterLayer.removeGutterDecoration(this.$gutterLineHighlight,"ace_gutter_active_line"),this.$gutterLayer.addGutterDecoration(b,"ace_gutter_active_line"),this.$gutterLineHighlight=b},this.$updatePrintMargin=function(){var a;if(!this.$showPrintMargin&&!this.$printMarginEl)return;this.$printMarginEl||(a=e.createElement("div"),a.className="ace_print_margin_layer",this.$printMarginEl=e.createElement("div"),this.$printMarginEl.className="ace_print_margin",a.appendChild(this.$printMarginEl),this.content.insertBefore(a,this.$textLayer.element));var b=this.$printMarginEl.style;b.left=this.characterWidth*this.$printMarginColumn+this.$padding+"px",b.visibility=this.$showPrintMargin?"visible":"hidden"},this.getContainerElement=function(){return this.container},this.getMouseEventTarget=function(){return this.content},this.getTextAreaContainer=function(){return this.container},this.$moveTextAreaToCursor=function(){if(!this.$keepTextAreaAtCursor)return;var a=this.$cursorLayer.$pixelPos.top,b=this.$cursorLayer.$pixelPos.left;a-=this.layerConfig.offset;if(a<0||a>this.layerConfig.height-this.lineHeight)return;var c=this.characterWidth;this.$composition&&(c+=this.textarea.scrollWidth),b-=this.scrollLeft,b>this.$size.scrollerWidth-c&&(b=this.$size.scrollerWidth-c),this.showGutter&&(b+=this.$gutterLayer.gutterWidth),this.textarea.style.height=this.lineHeight+"px",this.textarea.style.width=c+"px",this.textarea.style.left=b+"px",this.textarea.style.top=a-1+"px"},this.getFirstVisibleRow=function(){return this.layerConfig.firstRow},this.getFirstFullyVisibleRow=function(){return this.layerConfig.firstRow+(this.layerConfig.offset===0?0:1)},this.getLastFullyVisibleRow=function(){var a=Math.floor((this.layerConfig.height+this.layerConfig.offset)/this.layerConfig.lineHeight);return this.layerConfig.firstRow-1+a},this.getLastVisibleRow=function(){return this.layerConfig.lastRow},this.$padding=null,this.setPadding=function(a){this.$padding=a,this.$textLayer.setPadding(a),this.$cursorLayer.setPadding(a),this.$markerFront.setPadding(a),this.$markerBack.setPadding(a),this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()},this.getHScrollBarAlwaysVisible=function(){return this.$horizScrollAlwaysVisible},this.setHScrollBarAlwaysVisible=function(a){this.$horizScrollAlwaysVisible!=a&&(this.$horizScrollAlwaysVisible=a,(!this.$horizScrollAlwaysVisible||!this.$horizScroll)&&this.$loop.schedule(this.CHANGE_SCROLL))},this.$updateScrollBar=function(){this.scrollBar.setInnerHeight(this.layerConfig.maxHeight),this.scrollBar.setScrollTop(this.scrollTop)},this.$renderChanges=function(a){if(!a||!this.session||!this.container.offsetWidth)return;(a&this.CHANGE_FULL||a&this.CHANGE_SIZE||a&this.CHANGE_TEXT||a&this.CHANGE_LINES||a&this.CHANGE_SCROLL)&&this.$computeLayerConfig();if(a&this.CHANGE_H_SCROLL){this.scroller.scrollLeft=this.scrollLeft;var b=this.scroller.scrollLeft;this.scrollLeft=b,this.session.setScrollLeft(b),this.scroller.className=this.scrollLeft==0?"ace_scroller":"ace_scroller horscroll"}if(a&this.CHANGE_FULL){this.$textLayer.checkForSizeChanges(),this.$updateScrollBar(),this.$textLayer.update(this.layerConfig),this.showGutter&&(this.$highlightGutterLine&&this.$updateGutterLineHighlight(!0),this.$gutterLayer.update(this.layerConfig)),this.$markerBack.update(this.layerConfig),this.$markerFront.update(this.layerConfig),this.$cursorLayer.update(this.layerConfig),this.$moveTextAreaToCursor();return}if(a&this.CHANGE_SCROLL){this.$updateScrollBar(),a&this.CHANGE_TEXT||a&this.CHANGE_LINES?this.$textLayer.update(this.layerConfig):this.$textLayer.scrollLines(this.layerConfig),this.showGutter&&(this.$highlightGutterLine&&this.$updateGutterLineHighlight(!0),this.$gutterLayer.update(this.layerConfig)),this.$markerBack.update(this.layerConfig),this.$markerFront.update(this.layerConfig),this.$cursorLayer.update(this.layerConfig),this.$moveTextAreaToCursor();return}a&this.CHANGE_TEXT?(this.$textLayer.update(this.layerConfig),this.showGutter&&this.$gutterLayer.update(this.layerConfig)):a&this.CHANGE_LINES?this.$updateLines()&&(this.$updateScrollBar(),this.showGutter&&this.$gutterLayer.update(this.layerConfig)):a&this.CHANGE_GUTTER&&this.showGutter&&this.$gutterLayer.update(this.layerConfig),a&this.CHANGE_CURSOR&&(this.$cursorLayer.update(this.layerConfig),this.$moveTextAreaToCursor(),this.$highlightGutterLine&&this.$updateGutterLineHighlight(!1)),a&(this.CHANGE_MARKER|this.CHANGE_MARKER_FRONT)&&this.$markerFront.update(this.layerConfig),a&(this.CHANGE_MARKER|this.CHANGE_MARKER_BACK)&&this.$markerBack.update(this.layerConfig),a&this.CHANGE_SIZE&&this.$updateScrollBar()},this.$computeLayerConfig=function(){var a=this.session,b=this.scrollTop%this.lineHeight,c=this.$size.scrollerHeight+this.lineHeight,d=this.$getLongestLine(),e=this.$horizScrollAlwaysVisible||this.$size.scrollerWidth-d<0,f=this.$horizScroll!==e;this.$horizScroll=e,f&&(this.scroller.style.overflowX=e?"scroll":"hidden",e||this.session.setScrollLeft(0));var g=this.session.getScreenLength()*this.lineHeight;this.session.setScrollTop(Math.max(0,Math.min(this.scrollTop,g-this.$size.scrollerHeight)));var h=Math.ceil(c/this.lineHeight)-1,i=Math.max(0,Math.round((this.scrollTop-b)/this.lineHeight)),j=i+h,k,l,m={lineHeight:this.lineHeight};i=a.screenToDocumentRow(i,0);var n=a.getFoldLine(i);n&&(i=n.start.row),k=a.documentToScreenRow(i,0),l=a.getRowHeight(m,i),j=Math.min(a.screenToDocumentRow(j,0),a.getLength()-1),c=this.$size.scrollerHeight+a.getRowHeight(m,j)+l,b=this.scrollTop-k*this.lineHeight,this.layerConfig={width:d,padding:this.$padding,firstRow:i,firstRowScreen:k,lastRow:j,lineHeight:this.lineHeight,characterWidth:this.characterWidth,minHeight:c,maxHeight:g,offset:b,height:this.$size.scrollerHeight},this.$gutterLayer.element.style.marginTop=-b+"px",this.content.style.marginTop=-b+"px",this.content.style.width=d+2*this.$padding+"px",this.content.style.height=c+"px",f&&this.onResize(!0)},this.$updateLines=function(){var a=this.$changedLines.firstRow,b=this.$changedLines.lastRow;this.$changedLines=null;var c=this.layerConfig;if(a>c.lastRow+1)return;if(b<c.firstRow)return;if(b===Infinity){this.showGutter&&this.$gutterLayer.update(c),this.$textLayer.update(c);return}return this.$textLayer.updateLines(c,a,b),!0},this.$getLongestLine=function(){var a=this.session.getScreenWidth();return this.$textLayer.showInvisibles&&(a+=1),Math.max(this.$size.scrollerWidth-2*this.$padding,Math.round(a*this.characterWidth))},this.updateFrontMarkers=function(){this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)},this.updateBackMarkers=function(){this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)},this.addGutterDecoration=function(a,b){this.$gutterLayer.addGutterDecoration(a,b),this.$loop.schedule(this.CHANGE_GUTTER)},this.removeGutterDecoration=function(a,b){this.$gutterLayer.removeGutterDecoration(a,b),this.$loop.schedule(this.CHANGE_GUTTER)},this.updateBreakpoints=function(a){this.$loop.schedule(this.CHANGE_GUTTER)},this.setAnnotations=function(a){this.$gutterLayer.setAnnotations(a),this.$loop.schedule(this.CHANGE_GUTTER)},this.updateCursor=function(){this.$loop.schedule(this.CHANGE_CURSOR)},this.hideCursor=function(){this.$cursorLayer.hideCursor()},this.showCursor=function(){this.$cursorLayer.showCursor()},this.scrollSelectionIntoView=function(a,b,c){this.scrollCursorIntoView(a,c),this.scrollCursorIntoView(b,c)},this.scrollCursorIntoView=function(a,b){if(this.$size.scrollerHeight===0)return;var c=this.$cursorLayer.getPixelPosition(a),d=c.left,e=c.top;this.scrollTop>e?(b&&(e-=b*this.$size.scrollerHeight),this.session.setScrollTop(e)):this.scrollTop+this.$size.scrollerHeight<e+this.lineHeight&&(b&&(e+=b*this.$size.scrollerHeight),this.session.setScrollTop(e+this.lineHeight-this.$size.scrollerHeight));var f=this.scrollLeft;f>d?(d<this.$padding+2*this.layerConfig.characterWidth&&(d=0),this.session.setScrollLeft(d)):f+this.$size.scrollerWidth<d+this.characterWidth&&this.session.setScrollLeft(Math.round(d+this.characterWidth-this.$size.scrollerWidth))},this.getScrollTop=function(){return this.session.getScrollTop()},this.getScrollLeft=function(){return this.session.getScrollLeft()},this.getScrollTopRow=function(){return this.scrollTop/this.lineHeight},this.getScrollBottomRow=function(){return Math.max(0,Math.floor((this.scrollTop+this.$size.scrollerHeight)/this.lineHeight)-1)},this.scrollToRow=function(a){this.session.setScrollTop(a*this.lineHeight)},this.alignCursor=function(a,b){typeof a=="number"&&(a={row:a,column:0});var c=this.$cursorLayer.getPixelPosition(a),d=c.top-this.$size.scrollerHeight*(b||0);this.session.setScrollTop(d)},this.STEPS=8,this.$calcSteps=function(a,b){var c=0,d=this.STEPS,e=[],f=function(a,b,c){return c*(Math.pow(a-1,3)+1)+b};for(c=0;c<d;++c)e.push(f(c/this.STEPS,a,b-a));return e},this.scrollToLine=function(a,b,c,d){var e=this.$cursorLayer.getPixelPosition({row:a,column:0}),f=e.top;b&&(f-=this.$size.scrollerHeight/2);var g=this.scrollTop;this.session.setScrollTop(f),c!==!1&&this.animateScrolling(g,d)},this.animateScrolling=function(a,b){var c=this.scrollTop;if(this.$animatedScroll&&Math.abs(a-c)<1e5){var d=this,e=d.$calcSteps(a,c);this.$inScrollAnimation=!0,clearInterval(this.$timer),d.session.setScrollTop(e.shift()),this.$timer=setInterval(function(){e.length?(d.session.setScrollTop(e.shift()),d.session.$scrollTop=c):c!=null?(d.session.$scrollTop=-1,d.session.setScrollTop(c),c=null):(d.$timer=clearInterval(d.$timer),d.$inScrollAnimation=!1,b&&b())},10)}},this.scrollToY=function(a){this.scrollTop!==a&&(this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop=a)},this.scrollToX=function(a){a<0&&(a=0),this.scrollLeft!==a&&(this.scrollLeft=a),this.$loop.schedule(this.CHANGE_H_SCROLL)},this.scrollBy=function(a,b){b&&this.session.setScrollTop(this.session.getScrollTop()+b),a&&this.session.setScrollLeft(this.session.getScrollLeft()+a)},this.isScrollableBy=function(a,b){if(b<0&&this.session.getScrollTop()>0)return!0;if(b>0&&this.session.getScrollTop()+this.$size.scrollerHeight<this.layerConfig.maxHeight)return!0},this.pixelToScreenCoordinates=function(a,b){var c=this.scroller.getBoundingClientRect(),d=(a+this.scrollLeft-c.left-this.$padding)/this.characterWidth,e=Math.floor((b+this.scrollTop-c.top)/this.lineHeight),f=Math.round(d);return{row:e,column:f,side:d-f>0?1:-1}},this.screenToTextCoordinates=function(a,b){var c=this.scroller.getBoundingClientRect(),d=Math.round((a+this.scrollLeft-c.left-this.$padding)/this.characterWidth),e=Math.floor((b+this.scrollTop-c.top)/this.lineHeight);return this.session.screenToDocumentPosition(e,Math.max(d,0))},this.textToScreenCoordinates=function(a,b){var c=this.scroller.getBoundingClientRect(),d=this.session.documentToScreenPosition(a,b),e=this.$padding+Math.round(d.column*this.characterWidth),f=d.row*this.lineHeight;return{pageX:c.left+e-this.scrollLeft,pageY:c.top+f-this.scrollTop}},this.visualizeFocus=function(){e.addCssClass(this.container,"ace_focus")},this.visualizeBlur=function(){e.removeCssClass(this.container,"ace_focus")},this.showComposition=function(a){this.$composition||(this.$composition={keepTextAreaAtCursor:this.$keepTextAreaAtCursor,cssText:this.textarea.style.cssText}),this.$keepTextAreaAtCursor=!0,e.addCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText="",this.$moveTextAreaToCursor()},this.setCompositionText=function(a){this.$moveTextAreaToCursor()},this.hideComposition=function(){if(!this.$composition)return;e.removeCssClass(this.textarea,"ace_composition"),this.$keepTextAreaAtCursor=this.$composition.keepTextAreaAtCursor,this.textarea.style.cssText=this.$composition.cssText,this.$composition=null},this._loadTheme=function(a,b){if(!h.get("packaged"))return b();var c=a.split("/").pop(),d=h.get("themePath")+"/theme-"+c+h.get("suffix");i.loadScript(d,b)},this.setTheme=function(b){function h(a){e.importCssString(a.cssText,a.cssClass,c.container.ownerDocument),c.$theme&&e.removeCssClass(c.container,c.$theme),c.$theme=a?a.cssClass:null,c.$theme&&e.addCssClass(c.container,c.$theme),a&&a.isDark?e.addCssClass(c.container,"ace_dark"):e.removeCssClass(c.container,"ace_dark"),c.$size&&(c.$size.width=0,c.onResize())}var c=this;this.$themeValue=b;if(!b||typeof b=="string"){var d=b||"ace/theme/textmate",f;try{f=a(d)}catch(g){}if(f)return h(f);c._loadTheme(d,function(){a([d],function(a){if(c.$themeValue!==b)return;h(a)})})}else h(b)},this.getTheme=function(){return this.$themeValue},this.setStyle=function(b){e.addCssClass(this.container,b)},this.unsetStyle=function(b){e.removeCssClass(this.container,b)},this.destroy=function(){this.$textLayer.destroy(),this.$cursorLayer.destroy()}}).call(r.prototype),b.VirtualRenderer=r}),define("ace/layer/gutter",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){var d=a("../lib/dom"),e=a("../lib/oop"),f=a("../lib/event_emitter").EventEmitter,g=function(a){this.element=d.createElement("div"),this.element.className="ace_layer ace_gutter-layer",a.appendChild(this.element),this.setShowFoldWidgets(this.$showFoldWidgets),this.gutterWidth=0,this.$breakpoints=[],this.$annotations=[],this.$decorations=[]};(function(){e.implement(this,f),this.setSession=function(a){this.session=a},this.addGutterDecoration=function(a,b){this.$decorations[a]||(this.$decorations[a]=""),this.$decorations[a]+=" "+b},this.removeGutterDecoration=function(a,b){this.$decorations[a]=(this.$decorations[a]||"").replace(" "+b,"")},this.setAnnotations=function(a){this.$annotations=[];for(var b in a)if(a.hasOwnProperty(b)){var c=a[b];if(!c)continue;var d=this.$annotations[b]={text:[]};for(var e=0;e<c.length;e++){var f=c[e],g=f.text.replace(/"/g,"&quot;").replace(/'/g,"&#8217;").replace(/</,"&lt;");d.text.indexOf(g)===-1&&d.text.push(g);var h=f.type;h=="error"?d.className="ace_error":h=="warning"&&d.className!="ace_error"?d.className="ace_warning":h=="info"&&!d.className&&(d.className="ace_info")}}},this.update=function(a){this.$config=a;var b={className:"",text:[]},c=[],e=a.firstRow,f=a.lastRow,g=this.session.getNextFoldLine(e),h=g?g.start.row:Infinity,i=this.$showFoldWidgets&&this.session.foldWidgets,j=this.session.$breakpoints;for(;;){e>h&&(e=g.end.row+1,g=this.session.getNextFoldLine(e,g),h=g?g.start.row:Infinity);if(e>f)break;var k=this.$annotations[e]||b;c.push("<div class='ace_gutter-cell",this.$decorations[e]||"",j[e]?" ace_breakpoint ":" ",k.className,"' title='",k.text.join("\n"),"' style='height:",this.session.getRowLength(e)*a.lineHeight,"px;'>",e+1);if(i){var l=i[e];l==null&&(l=i[e]=this.session.getFoldWidget(e)),l&&c.push("<span class='ace_fold-widget ",l,l=="start"&&e==h&&e<g.end.row?" closed":" open","'></span>")}c.push("</div>"),e++}this.session.$useWrapMode&&c.push("<div class='ace_gutter-cell' style='pointer-events:none;opacity:0'>",this.session.getLength()-1,"</div>"),this.element=d.setInnerHtml(this.element,c.join("")),this.element.style.height=a.minHeight+"px";var m=this.element.offsetWidth;m!==this.gutterWidth&&(this.gutterWidth=m,this._emit("changeGutterWidth",m))},this.$showFoldWidgets=!0,this.setShowFoldWidgets=function(a){a?d.addCssClass(this.element,"ace_folding-enabled"):d.removeCssClass(this.element,"ace_folding-enabled"),this.$showFoldWidgets=a},this.getShowFoldWidgets=function(){return this.$showFoldWidgets}}).call(g.prototype),b.Gutter=g}),define("ace/layer/marker",["require","exports","module","ace/range","ace/lib/dom"],function(a,b,c){var d=a("../range").Range,e=a("../lib/dom"),f=function(a){this.element=e.createElement("div"),this.element.className="ace_layer ace_marker-layer",a.appendChild(this.element)};(function(){this.$padding=0,this.setPadding=function(a){this.$padding=a},this.setSession=function(a){this.session=a},this.setMarkers=function(a){this.markers=a},this.update=function(a){var a=a||this.config;if(!a)return;this.config=a;var b=[];for(var c in this.markers){var d=this.markers[c];if(!d.range){d.update(b,this,this.session,a);continue}var f=d.range.clipRows(a.firstRow,a.lastRow);if(f.isEmpty())continue;f=f.toScreenRange(this.session);if(d.renderer){var g=this.$getTop(f.start.row,a),h=Math.round(this.$padding+f.start.column*a.characterWidth);d.renderer(b,f,h,g,a)}else f.isMultiLine()?d.type=="text"?this.drawTextMarker(b,f,d.clazz,a):this.drawMultiLineMarker(b,f,d.clazz,a,d.type):this.drawSingleLineMarker(b,f,d.clazz+" start",a,null,d.type)}this.element=e.setInnerHtml(this.element,b.join(""))},this.$getTop=function(a,b){return(a-b.firstRowScreen)*b.lineHeight},this.drawTextMarker=function(a,b,c,e){var f=b.start.row,g=new d(f,b.start.column,f,this.session.getScreenLastRowColumn(f));this.drawSingleLineMarker(a,g,c+" start",e,1,"text"),f=b.end.row,g=new d(f,0,f,b.end.column),this.drawSingleLineMarker(a,g,c,e,0,"text");for(f=b.start.row+1;f<b.end.row;f++)g.start.row=f,g.end.row=f,g.end.column=this.session.getScreenLastRowColumn(f),this.drawSingleLineMarker(a,g,c,e,1,"text")},this.drawMultiLineMarker=function(a,b,c,d,e){var f=e==="background"?0:this.$padding,g=d.width+2*this.$padding-f,h=d.lineHeight,i=Math.round(g-b.start.column*d.characterWidth),j=this.$getTop(b.start.row,d),k=Math.round(f+b.start.column*d.characterWidth);a.push("<div class='",c," start' style='","height:",h,"px;","width:",i,"px;","top:",j,"px;","left:",k,"px;'></div>"),j=this.$getTop(b.end.row,d),i=Math.round(b.end.column*d.characterWidth),a.push("<div class='",c,"' style='","height:",h,"px;","width:",i,"px;","top:",j,"px;","left:",f,"px;'></div>"),h=(b.end.row-b.start.row-1)*d.lineHeight;if(h<0)return;j=this.$getTop(b.start.row+1,d),a.push("<div class='",c,"' style='","height:",h,"px;","width:",g,"px;","top:",j,"px;","left:",f,"px;'></div>")},this.drawSingleLineMarker=function(a,b,c,d,e,f){var g=f==="background"?0:this.$padding,h=d.lineHeight;if(f==="background")var i=d.width;else i=Math.round((b.end.column+(e||0)-b.start.column)*d.characterWidth);var j=this.$getTop(b.start.row,d),k=Math.round(g+b.start.column*d.characterWidth);a.push("<div class='",c,"' style='","height:",h,"px;","width:",i,"px;","top:",j,"px;","left:",k,"px;'></div>")}}).call(f.prototype),b.Marker=f}),define("ace/layer/text",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/useragent","ace/lib/event_emitter"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/dom"),f=a("../lib/lang"),g=a("../lib/useragent"),h=a("../lib/event_emitter").EventEmitter,i=function(a){this.element=e.createElement("div"),this.element.className="ace_layer ace_text-layer",a.appendChild(this.element),this.$characterSize=this.$measureSizes()||{width:0,height:0},this.$pollSizeChanges()};(function(){d.implement(this,h),this.EOF_CHAR="¶",this.EOL_CHAR="¬",this.TAB_CHAR="→",this.SPACE_CHAR="·",this.$padding=0,this.setPadding=function(a){this.$padding=a,this.element.style.padding="0 "+a+"px"},this.getLineHeight=function(){return this.$characterSize.height||1},this.getCharacterWidth=function(){return this.$characterSize.width||1},this.checkForSizeChanges=function(){var a=this.$measureSizes();a&&(this.$characterSize.width!==a.width||this.$characterSize.height!==a.height)&&(this.$characterSize=a,this._emit("changeCharacterSize",{data:a}))},this.$pollSizeChanges=function(){var a=this;this.$pollSizeChangesTimer=setInterval(function(){a.checkForSizeChanges()},500)},this.$fontStyles={fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},this.$measureSizes=g.isIE||g.isOldGecko?function(){var a=1e3;if(!this.$measureNode){var b=this.$measureNode=e.createElement("div"),c=b.style;c.width=c.height="auto",c.left=c.top=-a*40+"px",c.visibility="hidden",c.position="fixed",c.overflow="visible",c.whiteSpace="nowrap",b.innerHTML=f.stringRepeat("Xy",a);if(this.element.ownerDocument.body)this.element.ownerDocument.body.appendChild(b);else{var d=this.element.parentNode;while(!e.hasCssClass(d,"ace_editor"))d=d.parentNode;d.appendChild(b)}}if(!this.element.offsetWidth)return null;var c=this.$measureNode.style,g=e.computedStyle(this.element);for(var h in this.$fontStyles)c[h]=g[h];var i={height:this.$measureNode.offsetHeight,width:this.$measureNode.offsetWidth/(a*2)};return i.width==0||i.height==0?null:i}:function(){if(!this.$measureNode){var a=this.$measureNode=e.createElement("div"),b=a.style;b.width=b.height="auto",b.left=b.top="-100px",b.visibility="hidden",b.position="fixed",b.overflow="visible",b.whiteSpace="nowrap",a.innerHTML="X";var c=this.element.parentNode;while(c&&!e.hasCssClass(c,"ace_editor"))c=c.parentNode;if(!c)return this.$measureNode=null;c.appendChild(a)}var d=this.$measureNode.getBoundingClientRect(),f={height:d.height,width:d.width};return f.width==0||f.height==0?null:f},this.setSession=function(a){this.session=a},this.showInvisibles=!1,this.setShowInvisibles=function(a){return this.showInvisibles==a?!1:(this.showInvisibles=a,!0)},this.$tabStrings=[],this.$computeTabString=function(){var a=this.session.getTabSize(),b=this.$tabStrings=[0];for(var c=1;c<a+1;c++)this.showInvisibles?b.push("<span class='ace_invisible'>"+this.TAB_CHAR+(new Array(c)).join("&#160;")+"</span>"):b.push((new Array(c+1)).join("&#160;"))},this.updateLines=function(a,b,c){this.$computeTabString(),(this.config.lastRow!=a.lastRow||this.config.firstRow!=a.firstRow)&&this.scrollLines(a),this.config=a;var d=Math.max(b,a.firstRow),f=Math.min(c,a.lastRow),g=this.element.childNodes,h=0;for(var i=a.firstRow;i<d;i++){var j=this.session.getFoldLine(i);if(j){if(j.containsRow(d)){d=j.start.row;break}i=j.end.row}h++}for(var k=d;k<=f;k++){var l=g[h++];if(!l)continue;var m=[],n=this.session.getTokens(k);this.$renderLine(m,k,n,!this.$useLineGroups()),l=e.setInnerHtml(l,m.join("")),k=this.session.getRowFoldEnd(k)}},this.scrollLines=function(a){this.$computeTabString();var b=this.config;this.config=a;if(!b||b.lastRow<a.firstRow)return this.update(a);if(a.lastRow<b.firstRow)return this.update(a);var c=this.element;if(b.firstRow<a.firstRow)for(var d=this.session.getFoldedRowCount(b.firstRow,a.firstRow-1);d>0;d--)c.removeChild(c.firstChild);if(b.lastRow>a.lastRow)for(var d=this.session.getFoldedRowCount(a.lastRow+1,b.lastRow);d>0;d--)c.removeChild(c.lastChild);if(a.firstRow<b.firstRow){var e=this.$renderLinesFragment(a,a.firstRow,b.firstRow-1);c.firstChild?c.insertBefore(e,c.firstChild):c.appendChild(e)}if(a.lastRow>b.lastRow){var e=this.$renderLinesFragment(a,b.lastRow+1,a.lastRow);c.appendChild(e)}},this.$renderLinesFragment=function(a,b,c){var d=this.element.ownerDocument.createDocumentFragment(),f=b,g=this.session.getNextFoldLine(f),h=g?g.start.row:Infinity;for(;;){f>h&&(f=g.end.row+1,g=this.session.getNextFoldLine(f,g),h=g?g.start.row:Infinity);if(f>c)break;var i=e.createElement("div"),j=[],k=this.session.getTokens(f);this.$renderLine(j,f,k,!1),i.innerHTML=j.join("");if(this.$useLineGroups())i.className="ace_line_group",d.appendChild(i);else{var l=i.childNodes;while(l.length)d.appendChild(l[0])}f++}return d},this.update=function(a){this.$computeTabString(),this.config=a;var b=[],c=a.firstRow,d=a.lastRow,f=c,g=this.session.getNextFoldLine(f),h=g?g.start.row:Infinity;for(;;){f>h&&(f=g.end.row+1,g=this.session.getNextFoldLine(f,g),h=g?g.start.row:Infinity);if(f>d)break;this.$useLineGroups()&&b.push("<div class='ace_line_group'>");var i=this.session.getTokens(f);this.$renderLine(b,f,i,!1),this.$useLineGroups()&&b.push("</div>"),f++}this.element=e.setInnerHtml(this.element,b.join(""))},this.$textToken={text:!0,rparen:!0,lparen:!0},this.$renderToken=function(a,b,c,d){var e=this,f=/\t|&|<|( +)|([\u0000-\u0019\u00a0\u1680\u180E\u2000-\u200b\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g,g=function(a,c,d,f,g){if(c)return(new Array(a.length+1)).join("&#160;");if(a=="&")return"&#38;";if(a=="<")return"&#60;";if(a=="	"){var h=e.session.getScreenTabSize(b+f);return b+=h-1,e.$tabStrings[h]}if(a=="　"){var i=e.showInvisibles?"ace_cjk ace_invisible":"ace_cjk",j=e.showInvisibles?e.SPACE_CHAR:"";return b+=1,"<span class='"+i+"' style='width:"+e.config.characterWidth*2+"px'>"+j+"</span>"}return d?"<span class='ace_invisible ace_invalid'>"+e.SPACE_CHAR+"</span>":(b+=1,"<span class='ace_cjk' style='width:"+e.config.characterWidth*2+"px'>"+a+"</span>")},h=d.replace(f,g);if(!this.$textToken[c.type]){var i="ace_"+c.type.replace(/\./g," ace_"),j="";c.type=="fold"&&(j=" style='width:"+c.value.length*this.config.characterWidth+"px;' "),a.push("<span class='",i,"'",j,">",h,"</span>")}else a.push(h);return b+d.length},this.$renderLineCore=function(a,b,c,d,e){var f=0,g=0,h,i=0,j=this;!d||d.length==0?h=Number.MAX_VALUE:h=d[0],e||a.push("<div class='ace_line' style='height:",this.config.lineHeight,"px","'>");for(var k=0;k<c.length;k++){var l=c[k],m=l.value;if(f+m.length<h)i=j.$renderToken(a,i,l,m),f+=m.length;else{while(f+m.length>=h)i=j.$renderToken(a,i,l,m.substring(0,h-f)),m=m.substring(h-f),f=h,e||a.push("</div>","<div class='ace_line' style='height:",this.config.lineHeight,"px","'>"),g++,i=0,h=d[g]||Number.MAX_VALUE;m.length!=0&&(f+=m.length,i=j.$renderToken(a,i,l,m))}}this.showInvisibles&&(b!==this.session.getLength()-1?a.push("<span class='ace_invisible'>"+this.EOL_CHAR+"</span>"):a.push("<span class='ace_invisible'>"+this.EOF_CHAR+"</span>")),e||a.push("</div>")},this.$renderLine=function(a,b,c,d){if(!this.session.isRowFolded(b)){var e=this.session.getRowSplitData(b);this.$renderLineCore(a,b,c,e,d)}else this.$renderFoldLine(a,b,c,d)},this.$renderFoldLine=function(a,b,c,d){function h(a,b,c){var d=0,e=0;while(e+a[d].value.length<b){e+=a[d].value.length,d++;if(d==a.length)return}if(e!=b){var f=a[d].value.substring(b-e);f.length>c-b&&(f=f.substring(0,c-b)),g.push({type:a[d].type,value:f}),e=b+f.length,d+=1}while(e<c){var f=a[d].value;f.length+e>c&&(f=f.substring(0,c-e)),g.push({type:a[d].type,value:f}),e+=f.length,d+=1}}var e=this.session,f=e.getFoldLine(b),g=[];f.walk(function(a,b,d,e,f){a?g.push({type:"fold",value:a}):(f&&(c=this.session.getTokens(b)),c.length&&h(c,e,d))}.bind(this),f.end.row,this.session.getLine(f.end.row).length);var i=this.session.$useWrapMode?this.session.$wrapData[b]:null;this.$renderLineCore(a,b,g,i,d)},this.$useLineGroups=function(){return this.session.getUseWrapMode()},this.destroy=function(){clearInterval(this.$pollSizeChangesTimer),this.$measureNode&&this.$measureNode.parentNode.removeChild(this.$measureNode),delete this.$measureNode}}).call(i.prototype),b.Text=i}),define("ace/layer/cursor",["require","exports","module","ace/lib/dom"],function(a,b,c){var d=a("../lib/dom"),e=function(a){this.element=d.createElement("div"),this.element.className="ace_layer ace_cursor-layer",a.appendChild(this.element),this.isVisible=!1,this.cursors=[],this.cursor=this.addCursor()};(function(){this.$padding=0,this.setPadding=function(a){this.$padding=a},this.setSession=function(a){this.session=a},this.addCursor=function(){var a=d.createElement("div"),b="ace_cursor";return this.isVisible||(b+=" ace_hidden"),this.overwrite&&(b+=" ace_overwrite"),a.className=b,this.element.appendChild(a),this.cursors.push(a),a},this.removeCursor=function(){if(this.cursors.length>1){var a=this.cursors.pop();return a.parentNode.removeChild(a),a}},this.hideCursor=function(){this.isVisible=!1;for(var a=this.cursors.length;a--;)d.addCssClass(this.cursors[a],"ace_hidden");clearInterval(this.blinkId)},this.showCursor=function(){this.isVisible=!0;for(var a=this.cursors.length;a--;)d.removeCssClass(this.cursors[a],"ace_hidden");this.element.style.visibility="",this.restartTimer()},this.restartTimer=function(){clearInterval(this.blinkId);if(!this.isVisible)return;var a=this.cursors.length==1?this.cursor:this.element;this.blinkId=setInterval(function(){a.style.visibility="hidden",setTimeout(function(){a.style.visibility=""},400)},1e3)},this.getPixelPosition=function(a,b){if(!this.config||!this.session)return{left:0,top:0};a||(a=this.session.selection.getCursor());var c=this.session.documentToScreenPosition(a),d=Math.round(this.$padding+c.column*this.config.characterWidth),e=(c.row-(b?this.config.firstRowScreen:0))*this.config.lineHeight;return{left:d,top:e}},this.update=function(a){this.config=a;if(this.session.selectionMarkerCount>0){var b=this.session.$selectionMarkers,c=0,d,e=0;for(var c=b.length;c--;){d=b[c];var f=this.getPixelPosition(d.cursor,!0),g=(this.cursors[e++]||this.addCursor()).style;g.left=f.left+"px",g.top=f.top+"px",g.width=a.characterWidth+"px",g.height=a.lineHeight+"px"}if(e>1)while(this.cursors.length>e)this.removeCursor()}else{var f=this.getPixelPosition(null,!0),g=this.cursor.style;g.left=f.left+"px",g.top=f.top+"px",g.width=a.characterWidth+"px",g.height=a.lineHeight+"px";while(this.cursors.length>1)this.removeCursor()}var h=this.session.getOverwrite();h!=this.overwrite&&this.$setOverite(h),this.$pixelPos=f,this.restartTimer()},this.$setOverite=function(a){this.overwrite=a;for(var b=this.cursors.length;b--;)a?d.addCssClass(this.cursors[b],"ace_overwrite"):d.removeCssClass(this.cursors[b],"ace_overwrite")},this.destroy=function(){clearInterval(this.blinkId)}}).call(e.prototype),b.Cursor=e}),define("ace/scrollbar",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/event","ace/lib/event_emitter"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/dom"),f=a("./lib/event"),g=a("./lib/event_emitter").EventEmitter,h=function(a){this.element=e.createElement("div"),this.element.className="ace_sb",this.inner=e.createElement("div"),this.element.appendChild(this.inner),a.appendChild(this.element),this.width=e.scrollbarWidth(a.ownerDocument),this.element.style.width=(this.width||15)+5+"px",f.addListener(this.element,"scroll",this.onScroll.bind(this))};(function(){d.implement(this,g),this.onScroll=function(){this._emit("scroll",{data:this.element.scrollTop})},this.getWidth=function(){return this.width},this.setHeight=function(a){this.element.style.height=a+"px"},this.setInnerHeight=function(a){this.inner.style.height=a+"px"},this.setScrollTop=function(a){this.element.scrollTop=a}}).call(h.prototype),b.ScrollBar=h}),define("ace/renderloop",["require","exports","module","ace/lib/event"],function(a,b,c){var d=a("./lib/event"),e=function(a,b){this.onRender=a,this.pending=!1,this.changes=0,this.window=b||window};(function(){this.schedule=function(a){this.changes=this.changes|a;if(!this.pending){this.pending=!0;var b=this;d.nextTick(function(){b.pending=!1;var a;while(a=b.changes)b.changes=0,b.onRender(a)},this.window)}}}).call(e.prototype),b.RenderLoop=e}),define("text!ace/css/editor.css",[],".ace_editor {\n    position: absolute;\n    overflow: hidden;\n    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Droid Sans Mono', 'Consolas', monospace;\n    font-size: 12px;\n}\n\n.ace_scroller {\n    position: absolute;\n    overflow: hidden;\n}\n\n.ace_content {\n    position: absolute;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    cursor: text;\n}\n\n.ace_gutter {\n    position: absolute;\n    overflow : hidden;\n    height: 100%;\n    width: auto;\n    cursor: default;\n    z-index: 4;\n}\n\n.ace_scroller.horscroll {\n    box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;\n}\n\n.ace_gutter-cell {\n    padding-left: 19px;\n    padding-right: 6px;\n}\n\n.ace_gutter-cell.ace_error {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTQ4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTU4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBMjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBMzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgXxbAAAAJbSURBVHjapFNNaBNBFH4zs5vdZLP5sQmNpT82QY209heh1ioWisaDRcSKF0WKJ0GQnrzrxasHsR6EnlrwD0TagxJabaVEpFYxLWlLSS822tr87m66ccfd2GKyVhA6MMybgfe97/vmPUQphd0sZjto9XIn9OOsvlu2nkqRzVU+6vvlzPf8W6bk8dxQ0NPbxAALgCgg2JkaQuhzQau/El0zbmUA7U0Es8v2CiYmKQJHGO1QICCLoqilMhkmurDAyapKgqItezi/USRdJqEYY4D5jCy03ht2yMkkvL91jTTX10qzyyu2hruPRN7jgbH+EOsXcMLgYiThEgAMhABW85oqy1DXdRIdvP1AHJ2acQXvDIrVHcdQNrEKNYSVMSZGMjEzIIAwDXIo+6G/FxcGnzkC3T2oMhLjre49sBB+RRcHLqdafK6sYdE/GGBwU1VpFNj0aN8pJbe+BkZyevUrvLl6Xmm0W9IuTc0DxrDNAJd5oEvI/KRsNC3bQyNjPO9yQ1YHcfj2QvfQc/5TUhJTBc2iM0U7AWDQtc1nJHvD/cfO2s7jaGkiTEfa/Ep8coLu7zmNmh8+dc5lZDuUeFAGUNA/OY6JVaypQ0vjr7XYjUvJM37vt+j1vuTK5DgVfVUoTjVe+y3/LxMxY2GgU+CSLy4cpfsYorRXuXIOi0Vt40h67uZFTdIo6nLaZcwUJWAzwNS0tBnqqKzQDnjdG/iPyZxo46HaKUpbvYkj8qYRTZsBhge+JHhZyh0x9b95JqjVJkT084kZIPwu/mPWqPgfQ5jXh2+92Ay7HedfAgwA6KDWafb4w3cAAAAASUVORK5CYII=\");\n    background-repeat: no-repeat;\n    background-position: 2px center;\n}\n\n.ace_gutter-cell.ace_warning {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTg4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTk4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBNjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBNzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgd7PfIAAAGmSURBVHjaYvr//z8DJZiJgUIANoCRkREb9gLiSVAaQx4OQM7AAkwd7XU2/v++/rOttdYGEB9dASEvOMydGKfH8Gv/p4XTkvRBfLxeQAP+1cUhXopyvzhP7P/IoSj7g7Mw09cNKO6J1QQ0L4gICPIv/veg/8W+JdFvQNLHVsW9/nmn9zk7B+cCkDwhL7gt6knSZnx9/LuCEOcvkIAMP+cvto9nfqyZmmUAksfnBUtbM60gX/3/kgyv3/xSFOL5DZT+L8vP+Yfh5cvfPvp/xUHyQHXGyAYwgpwBjZYFT3Y1OEl/OfCH4ffv3wzc4iwMvNIsDJ+f/mH4+vIPAxsb631WW0Yln6ZpQLXdMK/DXGDflh+sIv37EivD5x//Gb7+YWT4y86sl7BCCkSD+Z++/1dkvsFRl+HnD1Rvje4F8whjMXmGj58YGf5zsDMwcnAwfPvKcml62DsQDeaDxN+/Y0qwlpEHqrdB94IRNIDUgfgfKJChGK4OikEW3gTiXUB950ASLFAF54AC94A0G9QAfOnmF9DCDzABFqS08IHYDIScdijOjQABBgC+/9awBH96jwAAAABJRU5ErkJggg==\");\n    background-repeat: no-repeat;\n    background-position: 2px center;\n}\n\n.ace_gutter-cell.ace_info {\n    background-image: url(\"data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAEFBQVJSUl5eXmRkZGtra39/f4WFhYmJiZGRkaampry8vMPDw8zMzNXV1dzc3OTk5Orq6vDw8P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABQALAAAAAAQABAAAAUuICWOZGmeaBml5XGwFCQSBGyXRSAwtqQIiRuiwIM5BoYVbEFIyGCQoeJGrVptIQA7\");\n    background-repeat: no-repeat;\n    background-position: 2px center;\n}\n\n.ace_editor .ace_sb {\n    position: absolute;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    right: 0;\n}\n\n.ace_editor .ace_sb div {\n    position: absolute;\n    width: 1px;\n    left: 0;\n}\n\n.ace_editor .ace_print_margin_layer {\n    z-index: 0;\n    position: absolute;\n    overflow: hidden;\n    margin: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n}\n\n.ace_editor .ace_print_margin {\n    position: absolute;\n    height: 100%;\n}\n\n.ace_editor > textarea {\n    position: absolute;\n    z-index: 0;\n    width: 0.5em;\n    height: 1em;\n    opacity: 0;\n    background: transparent;\n    appearance: none;\n    -moz-appearance: none;\n    border: none;\n    resize: none;\n    outline: none;\n    overflow: hidden;\n}\n\n.ace_editor > textarea.ace_composition {\n    background: #fff;\n    color: #000;\n    z-index: 1000;\n    opacity: 1;\n    border: solid lightgray 1px;\n    margin: -1px\n}\n\n.ace_layer {\n    z-index: 1;\n    position: absolute;\n    overflow: hidden;\n    white-space: nowrap;\n    height: 100%;\n    width: 100%;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    /* setting pointer-events: auto; on node under the mouse, which changes\n        during scroll, will break mouse wheel scrolling in Safari */\n    pointer-events: none;\n}\n\n.ace_gutter .ace_layer {\n    position: relative;\n    min-width: 40px;\n    width: auto;\n    text-align: right;\n    pointer-events: auto;\n}\n\n.ace_text-layer {\n    color: black;\n    font: inherit !important;\n}\n\n.ace_cjk {\n    display: inline-block;\n    text-align: center;\n}\n\n.ace_cursor-layer {\n    z-index: 4;\n}\n\n.ace_cursor {\n    z-index: 4;\n    position: absolute;\n}\n\n.ace_cursor.ace_hidden {\n    opacity: 0.2;\n}\n\n.ace_editor.multiselect .ace_cursor {\n    border-left-width: 1px;\n}\n\n.ace_line {\n    white-space: nowrap;\n}\n\n.ace_marker-layer .ace_step {\n    position: absolute;\n    z-index: 3;\n}\n\n.ace_marker-layer .ace_selection {\n    position: absolute;\n    z-index: 5;\n}\n\n.ace_marker-layer .ace_bracket {\n    position: absolute;\n    z-index: 6;\n}\n\n.ace_marker-layer .ace_active_line {\n    position: absolute;\n    z-index: 2;\n}\n\n.ace_marker-layer .ace_selected_word {\n    position: absolute;\n    z-index: 4;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n}\n\n.ace_line .ace_fold {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n\n    display: inline-block;\n    height: 11px;\n    margin-top: -2px;\n    vertical-align: middle;\n\n    background-image:\n        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),\n        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%3AIDAT8%11c%FC%FF%FF%7F%18%03%1A%60%01%F2%3F%A0%891%80%04%FF%11-%F8%17%9BJ%E2%05%B1ZD%81v%26t%E7%80%F8%A3%82h%A12%1A%20%A3%01%02%0F%01%BA%25%06%00%19%C0%0D%AEF%D5%3ES%00%00%00%00IEND%AEB%60%82\");\n    background-repeat: no-repeat, repeat-x;\n    background-position: center center, top left;\n    color: transparent;\n\n    border: 1px solid black;\n    -moz-border-radius: 2px;\n    -webkit-border-radius: 2px;\n    border-radius: 2px;\n\n    cursor: pointer;\n    pointer-events: auto;\n}\n\n.ace_dark .ace_fold {\n}\n\n.ace_fold:hover{\n    background-image:\n        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),\n        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%003IDAT8%11c%FC%FF%FF%7F%3E%03%1A%60%01%F2%3F%A3%891%80%04%FFQ%26%F8w%C0%B43%A1%DB%0C%E2%8F%0A%A2%85%CAh%80%8C%06%08%3C%04%E8%96%18%00%A3S%0D%CD%CF%D8%C1%9D%00%00%00%00IEND%AEB%60%82\");\n    background-repeat: no-repeat, repeat-x;\n    background-position: center center, top left;\n}\n\n.ace_dragging .ace_content {\n    cursor: move;\n}\n\n.ace_folding-enabled > .ace_gutter-cell {\n    padding-right: 13px;\n}\n\n.ace_fold-widget {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n\n    margin: 0 -12px 1px 1px;\n    display: inline-block;\n    height: 14px;\n    width: 11px;\n    vertical-align: text-bottom;\n\n    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAe%8A%B1%0D%000%0C%C2%F2%2CK%96%BC%D0%8F9%81%88H%E9%D0%0E%96%C0%10%92%3E%02%80%5E%82%E4%A9*-%EEsw%C8%CC%11%EE%96w%D8%DC%E9*Eh%0C%151(%00%00%00%00IEND%AEB%60%82\");\n    background-repeat: no-repeat;\n    background-position: center 5px;\n\n    border-radius: 3px;\n}\n\n.ace_fold-widget.end {\n    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAm%C7%C1%09%000%08C%D1%8C%ECE%C8E(%8E%EC%02)%1EZJ%F1%C1'%04%07I%E1%E5%EE%CAL%F5%A2%99%99%22%E2%D6%1FU%B5%FE0%D9x%A7%26Wz5%0E%D5%00%00%00%00IEND%AEB%60%82\");\n}\n\n.ace_fold-widget.closed {\n    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%03%00%00%00%06%08%06%00%00%00%06%E5%24%0C%00%00%009IDATx%DA5%CA%C1%09%000%08%03%C0%AC*(%3E%04%C1%0D%BA%B1%23%A4Uh%E0%20%81%C0%CC%F8%82%81%AA%A2%AArGfr%88%08%11%11%1C%DD%7D%E0%EE%5B%F6%F6%CB%B8%05Q%2F%E9tai%D9%00%00%00%00IEND%AEB%60%82\");\n}\n\n.ace_fold-widget:hover {\n    border: 1px solid rgba(0, 0, 0, 0.3);\n    background-color: rgba(255, 255, 255, 0.2);\n    -moz-box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.7);\n    -moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n    -webkit-box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.7);\n    -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n    box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.7);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n    background-position: center 4px;\n}\n\n.ace_fold-widget:active {\n    border: 1px solid rgba(0, 0, 0, 0.4);\n    background-color: rgba(0, 0, 0, 0.05);\n    -moz-box-shadow:inset 0 1px 1px rgba(255, 255, 255);\n    -moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\n    -webkit-box-shadow:inset 0 1px 1px rgba(255, 255, 255);\n    -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\n    box-shadow:inset 0 1px 1px rgba(255, 255, 255);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\n}\n\n.ace_fold-widget.invalid {\n    background-color: #FFB4B4;\n    border-color: #DE5555;\n}\n\n.ace_fade-fold-widgets .ace_fold-widget {\n       -moz-transition: opacity 0.4s ease 0.05s;\n    -webkit-transition: opacity 0.4s ease 0.05s;\n         -o-transition: opacity 0.4s ease 0.05s;\n        -ms-transition: opacity 0.4s ease 0.05s;\n            transition: opacity 0.4s ease 0.05s;\n    opacity: 0;\n}\n\n.ace_fade-fold-widgets:hover .ace_fold-widget {\n       -moz-transition: opacity 0.05s ease 0.05s;\n    -webkit-transition: opacity 0.05s ease 0.05s;\n         -o-transition: opacity 0.05s ease 0.05s;\n        -ms-transition: opacity 0.05s ease 0.05s;\n            transition: opacity 0.05s ease 0.05s;\n    opacity:1;\n}\n"),define("ace/multi_select",["require","exports","module","ace/range_list","ace/range","ace/selection","ace/mouse/multi_select_handler","ace/lib/event","ace/commands/multi_select_commands","ace/search","ace/edit_session","ace/editor"],function(a,b,c){function l(a,b,c){return k.$options.wrap=!0,k.$options.needle=b,k.$options.backwards=c==-1,k.find(a)}function o(a,b){return a.row==b.row&&a.column==b.column}function p(a){a.$onAddRange=a.$onAddRange.bind(a),a.$onRemoveRange=a.$onRemoveRange.bind(a),a.$onMultiSelect=a.$onMultiSelect.bind(a),a.$onSingleSelect=a.$onSingleSelect.bind(a),b.onSessionChange.call(a,a),a.on("changeSession",b.onSessionChange.bind(a)),a.on("mousedown",g),a.commands.addCommands(i.defaultCommands),q(a)}function q(a){function e(){c&&(d.style.cursor="",c=!1)}var b=a.textInput.getElement(),c=!1,d=a.renderer.content;h.addListener(b,"keydown",function(a){a.keyCode==18&&!(a.ctrlKey||a.shiftKey||a.metaKey)?c||(d.style.cursor="crosshair",c=!0):c&&(d.style.cursor="")}),h.addListener(b,"keyup",e),h.addListener(b,"blur",e)}var d=a("./range_list").RangeList,e=a("./range").Range,f=a("./selection").Selection,g=a("./mouse/multi_select_handler").onMouseDown,h=a("./lib/event"),i=a("./commands/multi_select_commands");b.commands=i.defaultCommands.concat(i.multiSelectCommands);var j=a("./search").Search,k=new j,m=a("./edit_session").EditSession;(function(){this.getSelectionMarkers=function(){return this.$selectionMarkers}}).call(m.prototype),function(){this.ranges=null,this.rangeList=null,this.addRange=function(a,b){if(!a)return;if(!this.inMultiSelectMode&&this.rangeCount==0){var c=this.toOrientedRange();if(a.intersects(c))return b||this.fromOrientedRange(a);this.rangeList.add(c),this.$onAddRange(c)}a.cursor||(a.cursor=a.end);var d=this.rangeList.add(a);return this.$onAddRange(a),d.length&&this.$onRemoveRange(d),this.rangeCount>1&&!this.inMultiSelectMode&&(this._emit("multiSelect"),this.inMultiSelectMode=!0,this.session.$undoSelect=!1,this.rangeList.attach(this.session)),b||this.fromOrientedRange(a)},this.toSingleRange=function(a){a=a||this.ranges[0];var b=this.rangeList.removeAll();b.length&&this.$onRemoveRange(b),a&&this.fromOrientedRange(a)},this.substractPoint=function(a){var b=this.rangeList.substractPoint(a);if(b)return this.$onRemoveRange(b),b[0]},this.mergeOverlappingRanges=function(){var a=this.rangeList.merge();a.length?this.$onRemoveRange(a):this.ranges[0]&&this.fromOrientedRange(this.ranges[0])},this.$onAddRange=function(a){this.rangeCount=this.rangeList.ranges.length,this.ranges.unshift(a),this._emit("addRange",{range:a})},this.$onRemoveRange=function(a){this.rangeCount=this.rangeList.ranges.length;if(this.rangeCount==1&&this.inMultiSelectMode){var b=this.rangeList.ranges.pop();a.push(b),this.rangeCount=0}for(var c=a.length;c--;){var d=this.ranges.indexOf(a[c]);this.ranges.splice(d,1)}this._emit("removeRange",{ranges:a}),this.rangeCount==0&&this.inMultiSelectMode&&(this.inMultiSelectMode=!1,this._emit("singleSelect"),this.session.$undoSelect=!0,this.rangeList.detach(this.session)),b=b||this.ranges[0],b&&!b.isEqual(this.getRange())&&this.fromOrientedRange(b)},this.$initRangeList=function(){if(this.rangeList)return;this.rangeList=new d,this.ranges=[],this.rangeCount=0},this.getAllRanges=function(){return this.rangeList.ranges.concat()},this.splitIntoLines=function(){if(this.rangeCount>1){var a=this.rangeList.ranges,b=a[a.length-1],c=e.fromPoints(a[0].start,b.end);this.toSingleRange(),this.setSelectionRange(c,b.cursor==b.start)}else{var c=this.getRange(),d=c.start.row,f=c.end.row;if(d==f)return;var g=[],h=this.getLineRange(d,!0);h.start.column=c.start.column,g.push(h);for(var i=d+1;i<f;i++)g.push(this.getLineRange(i,!0));h=this.getLineRange(f,!0),h.end.column=c.end.column,g.push(h),g.forEach(this.addRange,this)}},this.toggleBlockSelection=function(){if(this.rangeCount>1){var a=this.rangeList.ranges,b=a[a.length-1],c=e.fromPoints(a[0].start,b.end);this.toSingleRange(),this.setSelectionRange(c,b.cursor==b.start)}else{var d=this.session.documentToScreenPosition(this.selectionLead),f=this.session.documentToScreenPosition(this.selectionAnchor),g=this.rectangularRangeBlock(d,f);g.forEach(this.addRange,this)}},this.rectangularRangeBlock=function(a,b,c){var d=[],f=a.column<b.column;if(f)var g=a.column,h=b.column;else var g=b.column,h=a.column;var i=a.row<b.row;if(i)var j=a.row,k=b.row;else var j=b.row,k=a.row;g<0&&(g=0),j<0&&(j=0),j==k&&(c=!0);for(var l=j;l<=k;l++){var m=e.fromPoints(this.session.screenToDocumentPosition(l,g),this.session.screenToDocumentPosition(l,h));if(m.isEmpty()){if(n&&o(m.end,n))break;var n=m.end}m.cursor=f?m.start:m.end,d.push(m)}i&&d.reverse();if(!c){var p=d.length-1;while(d[p].isEmpty()&&p>0)p--;if(p>0){var q=0;while(d[q].isEmpty())q++}for(var r=p;r>=q;r--)d[r].isEmpty()&&d.splice(r,1)}return d}}.call(f.prototype);var n=a("./editor").Editor;(function(){this.updateSelectionMarkers=function(){this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.addSelectionMarker=function(a){a.cursor||(a.cursor=a.end);var b=this.getSelectionStyle();return a.marker=this.session.addMarker(a,"ace_selection",b),this.session.$selectionMarkers.push(a),this.session.selectionMarkerCount=this.session.$selectionMarkers.length,a},this.removeSelectionMarker=function(a){if(!a.marker)return;this.session.removeMarker(a.marker);var b=this.session.$selectionMarkers.indexOf(a);b!=-1&&this.session.$selectionMarkers.splice(b,1),this.session.selectionMarkerCount=this.session.$selectionMarkers.length},this.removeSelectionMarkers=function(a){var b=this.session.$selectionMarkers;for(var c=a.length;c--;){var d=a[c];if(!d.marker)continue;this.session.removeMarker(d.marker);var e=b.indexOf(d);e!=-1&&b.splice(e,1)}this.session.selectionMarkerCount=b.length},this.$onAddRange=function(a){this.addSelectionMarker(a.range),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onRemoveRange=function(a){this.removeSelectionMarkers(a.ranges),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelect=function(a){if(this.inMultiSelectMode)return;this.inMultiSelectMode=!0,this.setStyle("multiselect"),this.keyBinding.addKeyboardHandler(i.keyboardHandler),this.commands.on("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onSingleSelect=function(a){if(this.session.multiSelect.inVirtualMode)return;this.inMultiSelectMode=!1,this.unsetStyle("multiselect"),this.keyBinding.removeKeyboardHandler(i.keyboardHandler),this.commands.removeEventListener("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelectExec=function(a){var b=a.command,c=a.editor;if(!c.multiSelect)return;b.multiSelectAction?b.multiSelectAction=="forEach"?c.forEachSelection(b,a.args):b.multiSelectAction=="single"?(c.exitMultiSelectMode(),b.exec(c,a.args||{})):b.multiSelectAction(c,a.args||{}):(b.exec(c,a.args||{}),c.multiSelect.addRange(c.multiSelect.toOrientedRange()),c.multiSelect.mergeOverlappingRanges()),a.preventDefault()},this.forEachSelection=function(a,b){if(this.inVirtualSelectionMode)return;var c=this.session,d=this.selection,e=d.rangeList,g=d._eventRegistry;d._eventRegistry={};var h=new f(c);this.inVirtualSelectionMode=!0;for(var i=e.ranges.length;i--;)h.fromOrientedRange(e.ranges[i]),this.selection=c.selection=h,a.exec(this,b||{}),h.toOrientedRange(e.ranges[i]);h.detach(),this.selection=c.selection=d,this.inVirtualSelectionMode=!1,d._eventRegistry=g,d.mergeOverlappingRanges(),this.onCursorChange(),this.onSelectionChange()},this.exitMultiSelectMode=function(){if(this.inVirtualSelectionMode)return;this.multiSelect.toSingleRange()},this.getCopyText=function(){var a="";if(this.inMultiSelectMode){var b=this.multiSelect.rangeList.ranges;a=[];for(var c=0;c<b.length;c++)a.push(this.session.getTextRange(b[c]));a=a.join(this.session.getDocument().getNewLineCharacter())}else this.selection.isEmpty()||(a=this.session.getTextRange(this.getSelectionRange()));return a},this.onPaste=function(a){this._emit("paste",a);if(!this.inMultiSelectMode)return this.insert(a);var b=a.split(/\r\n|\r|\n/),c=this.selection.rangeList.ranges;if(b.length>c.length||b.length<=2||!b[1])return this.commands.exec("insertstring",this,a);for(var d=c.length;d--;){var e=c[d];e.isEmpty()||this.session.remove(e),this.session.insert(e.start,b[d])}},this.findAll=function(a,b,c){b=b||{},b.needle=a||b.needle,this.$search.set(b);var d=this.$search.findAll(this.session);if(!d.length)return 0;this.$blockScrolling+=1;var e=this.multiSelect;c||e.toSingleRange(d[0]);for(var f=d.length;f--;)e.addRange(d[f],!0);return this.$blockScrolling-=1,d.length},this.selectMoreLines=function(a,b){var c=this.selection.toOrientedRange(),d=c.cursor==c.end,f=this.session.documentToScreenPosition(c.cursor);this.selection.$desiredColumn&&(f.column=this.selection.$desiredColumn);var g=this.session.screenToDocumentPosition(f.row+a,f.column);if(!c.isEmpty())var h=this.session.documentToScreenPosition(d?c.end:c.start),i=this.session.screenToDocumentPosition(h.row+a,h.column);else var i=g;if(d){var j=e.fromPoints(g,i);j.cursor=j.start}else{var j=e.fromPoints(i,g);j.cursor=j.end}j.desiredColumn=f.column;if(!this.selection.inMultiSelectMode)this.selection.addRange(c);else if(b)var k=c.cursor;this.selection.addRange(j),k&&this.selection.substractPoint(k)},this.transposeSelections=function(a){var b=this.session,c=b.multiSelect,d=c.ranges;for(var e=d.length;e--;){var f=d[e];if(f.isEmpty()){var g=b.getWordRange(f.start.row,f.start.column);f.start.row=g.start.row,f.start.column=g.start.column,f.end.row=g.end.row,f.end.column=g.end.column}}c.mergeOverlappingRanges();var h=[];for(var e=d.length;e--;){var f=d[e];h.unshift(b.getTextRange(f))}a<0?h.unshift(h.pop()):h.push(h.shift());for(var e=d.length;e--;){var f=d[e],g=f.clone();b.replace(f,h[e]),f.start.row=g.start.row,f.start.column=g.start.column}},this.selectMore=function(a,b){var c=this.session,d=c.multiSelect,e=d.toOrientedRange();if(e.isEmpty()){var e=c.getWordRange(e.start.row,e.start.column);e.cursor=e.end,this.multiSelect.addRange(e)}var f=c.getTextRange(e),g=l(c,f,a);g&&(g.cursor=a==-1?g.start:g.end,this.multiSelect.addRange(g)),b&&this.multiSelect.substractPoint(e.cursor)}}).call(n.prototype),b.onSessionChange=function(a){var b=a.session;b.multiSelect||(b.$selectionMarkers=[],b.selection.$initRangeList(),b.multiSelect=b.selection),this.multiSelect=b.multiSelect;var c=a.oldSession;c&&(c.multiSelect&&c.multiSelect.editor==this&&(c.multiSelect.editor=null),b.multiSelect.removeEventListener("addRange",this.$onAddRange),b.multiSelect.removeEventListener("removeRange",this.$onRemoveRange),b.multiSelect.removeEventListener("multiSelect",this.$onMultiSelect),b.multiSelect.removeEventListener("singleSelect",this.$onSingleSelect)),b.multiSelect.on("addRange",this.$onAddRange),b.multiSelect.on("removeRange",this.$onRemoveRange),b.multiSelect.on("multiSelect",this.$onMultiSelect),b.multiSelect.on("singleSelect",this.$onSingleSelect),this.inMultiSelectMode!=b.selection.inMultiSelectMode&&(b.selection.inMultiSelectMode?this.$onMultiSelect():this.$onSingleSelect())},b.MultiSelect=p}),define("ace/range_list",["require","exports","module"],function(a,b,c){var d=function(){this.ranges=[]};(function(){this.comparePoints=function(a,b){return a.row-b.row||a.column-b.column},this.pointIndex=function(a,b){var c=this.ranges;for(var d=b||0;d<c.length;d++){var e=c[d],f=this.comparePoints(a,e.end);if(f>0)continue;return f==0?d:(f=this.comparePoints(a,e.start),f>=0?d:-d-1)}return-d-1},this.add=function(a){var b=this.pointIndex(a.start);b<0&&(b=-b-1);var c=this.pointIndex(a.end,b);return c<0?c=-c-1:c++,this.ranges.splice(b,c-b,a)},this.addList=function(a){var b=[];for(var c=a.length;c--;)b.push.call(b,this.add(a[c]));return b},this.substractPoint=function(a){var b=this.pointIndex(a);if(b>=0)return this.ranges.splice(b,1)},this.merge=function(){var a=[],b=this.ranges,c=b[0],d;for(var e=1;e<b.length;e++){d=c,c=b[e];var f=this.comparePoints(d.end,c.start);if(f<0)continue;if(f==0&&!d.isEmpty()&&!c.isEmpty())continue;this.comparePoints(d.end,c.end)<0&&(d.end.row=c.end.row,d.end.column=c.end.column),b.splice(e,1),a.push(c),c=d,e--}return a},this.contains=function(a,b){return this.pointIndex({row:a,column:b})>=0},this.containsPoint=function(a){return this.pointIndex(a)>=0},this.rangeAtPoint=function(a){var b=this.pointIndex(a);if(b>=0)return this.ranges[b]},this.clipRows=function(a,b){var c=this.ranges;if(c[0].start.row>b||c[c.length-1].start.row<a)return[];var d=this.pointIndex({row:a,column:0});d<0&&(d=-d-1);var e=this.pointIndex({row:b,column:0},d);e<0&&(e=-e-1);var f=[];for(var g=d;g<e;g++)f.push(c[g]);return f},this.removeAll=function(){return this.ranges.splice(0,this.ranges.length)},this.attach=function(a){this.session&&this.detach(),this.session=a,this.onChange=this.$onChange.bind(this),this.session.on("change",this.onChange)},this.detach=function(){if(!this.session)return;this.session.removeListener("change",this.onChange),this.session=null},this.$onChange=function(a){var b=a.data.range;if(a.data.action[0]=="i")var c=b.start,d=b.end;else var d=b.start,c=b.end;var e=c.row,f=d.row,g=f-e,h=-c.column+d.column,i=this.ranges;for(var j=0,k=i.length;j<k;j++){var l=i[j];if(l.end.row<e)continue;if(l.start.row>e)break;l.start.row==e&&l.start.column>=c.column&&(l.start.column+=h,l.start.row+=g),l.end.row==e&&l.end.column>=c.column&&(l.end.column+=h,l.end.row+=g)}if(g!=0&&j<k)for(;j<k;j++){var l=i[j];l.start.row+=g,l.end.row+=g}}}).call(d.prototype),b.RangeList=d}),define("ace/mouse/multi_select_handler",["require","exports","module","ace/lib/event"],function(a,b,c){function e(a,b){return a.row==b.row&&a.column==b.column}function f(a){var b=a.domEvent,c=b.altKey,f=b.shiftKey,g=a.getAccelKey(),h=a.getButton();if(a.editor.inMultiSelectMode&&h==2){a.editor.textInput.onContextMenu(a.domEvent);return}if(!g&&!c){h==0&&a.editor.inMultiSelectMode&&a.editor.exitMultiSelectMode();return}var i=a.editor,j=i.selection,k=i.inMultiSelectMode,l=a.getDocumentPosition(),m=j.getCursor(),n=a.inSelection()||j.isEmpty()&&e(l,m),o=a.x,p=a.y,q=function(a){o=a.clientX,p=a.clientY},r=function(){var a=i.renderer.pixelToScreenCoordinates(o,p),b=s.screenToDocumentPosition(a.row,a.column);if(e(u,a)&&e(b,j.selectionLead))return;u=a,i.selection.moveCursorToPosition(b),i.selection.clearSelection(),i.renderer.scrollCursorIntoView(),i.removeSelectionMarkers(x),x=j.rectangularRangeBlock(u,t),x.forEach(i.addSelectionMarker,i),i.updateSelectionMarkers()},s=i.session,t=i.renderer.pixelToScreenCoordinates(o,p),u=t;if(g&&!f&&!c&&h==0){if(!k&&n)return;if(!k){var v=j.toOrientedRange();i.addSelectionMarker(v)}var w=j.rangeList.rangeAtPoint(l);d.capture(i.container,function(){},function(){var a=j.toOrientedRange();w&&a.isEmpty()&&e(w.cursor,a.cursor)?j.substractPoint(a.cursor):(v&&(i.removeSelectionMarker(v),j.addRange(v)),j.addRange(a))})}else if(!f&&c&&h==0){a.stop(),k&&!g?j.toSingleRange():!k&&g&&j.addRange(),j.moveCursorToPosition(l),j.clearSelection();var x=[],y=function(a){clearInterval(A),i.removeSelectionMarkers(x);for(var b=0;b<x.length;b++)j.addRange(x[b])},z=r;d.capture(i.container,q,y);var A=setInterval(function(){z()},20);return a.preventDefault()}}var d=a("../lib/event");b.onMouseDown=f}),define("ace/commands/multi_select_commands",["require","exports","module","ace/keyboard/hash_handler"],function(a,b,c){b.defaultCommands=[{name:"addCursorAbove",exec:function(a){a.selectMoreLines(-1)},bindKey:{win:"Ctrl-Alt-Up",mac:"Ctrl-Alt-Up"},readonly:!0},{name:"addCursorBelow",exec:function(a){a.selectMoreLines(1)},bindKey:{win:"Ctrl-Alt-Down",mac:"Ctrl-Alt-Down"},readonly:!0},{name:"addCursorAboveSkipCurrent",exec:function(a){a.selectMoreLines(-1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Up",mac:"Ctrl-Alt-Shift-Up"},readonly:!0},{name:"addCursorBelowSkipCurrent",exec:function(a){a.selectMoreLines(1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Down",mac:"Ctrl-Alt-Shift-Down"},readonly:!0},{name:"selectMoreBefore",exec:function(a){a.selectMore(-1)},bindKey:{win:"Ctrl-Alt-Left",mac:"Ctrl-Alt-Left"},readonly:!0},{name:"selectMoreAfter",exec:function(a){a.selectMore(1)},bindKey:{win:"Ctrl-Alt-Right",mac:"Ctrl-Alt-Right"},readonly:!0},{name:"selectNextBefore",exec:function(a){a.selectMore(-1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Left",mac:"Ctrl-Alt-Shift-Left"},readonly:!0},{name:"selectNextAfter",exec:function(a){a.selectMore(1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Right",mac:"Ctrl-Alt-Shift-Right"},readonly:!0},{name:"splitIntoLines",exec:function(a){a.multiSelect.splitIntoLines()},bindKey:{win:"Ctrl-Shift-L",mac:"Ctrl-Shift-L"},readonly:!0}],b.multiSelectCommands=[{name:"singleSelection",bindKey:"esc",exec:function(a){a.exitMultiSelectMode()},readonly:!0,isAvailable:function(a){return a.inMultiSelectMode}}];var d=a("../keyboard/hash_handler").HashHandler;b.keyboardHandler=new d(b.multiSelectCommands)}),define("ace/worker/worker_client",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/config"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/event_emitter").EventEmitter,f=a("../config"),g=function(b,c,d,e){this.changeListener=this.changeListener.bind(this);if(f.get("packaged"))this.$worker=new Worker(f.get("workerPath")+"/"+c);else{var g;typeof a.supports!="undefined"&&a.supports.indexOf("ucjs2-pinf-0")>=0?g=a.nameToUrl("ace/worker/worker_sourcemint"):(a.nameToUrl&&!a.toUrl&&(a.toUrl=a.nameToUrl),g=this.$normalizePath(a.toUrl("ace/worker/worker",null,"_"))),this.$worker=new Worker(g);var h={};for(var i=0;i<b.length;i++){var j=b[i],k=this.$normalizePath(a.toUrl(j,null,"_").replace(/.js$/,""));h[j]=k}}this.$worker.postMessage({init:!0,tlns:h,module:d,classname:e}),this.callbackId=1,this.callbacks={};var l=this;this.$worker.onerror=function(a){throw window.console&&console.log&&console.log(a),a},this.$worker.onmessage=function(a){var b=a.data;switch(b.type){case"log":window.console&&console.log&&console.log(b.data);break;case"event":l._emit(b.name,{data:b.data});break;case"call":var c=l.callbacks[b.id];c&&(c(b.data),delete l.callbacks[b.id])}}};(function(){d.implement(this,e),this.$normalizePath=function(a){return a=a.replace(/^[a-z]+:\/\/[^\/]+/,""),a=location.protocol+"//"+location.host+(a.charAt(0)=="/"?"":location.pathname.replace(/\/[^\/]*$/,""))+"/"+a.replace(/^[\/]+/,""),a},this.terminate=function(){this._emit("terminate",{}),this.$worker.terminate(),this.$worker=null,this.$doc.removeEventListener("change",this.changeListener),this.$doc=null},this.send=function(a,b){this.$worker.postMessage({command:a,args:b})},this.call=function(a,b,c){if(c){var d=this.callbackId++;this.callbacks[d]=c,b.push(d)}this.send(a,b)},this.emit=function(a,b){try{this.$worker.postMessage({event:a,data:{data:b.data}})}catch(c){}},this.attachToDocument=function(a){this.$doc&&this.terminate(),this.$doc=a,this.call("setValue",[a.getValue()]),a.on("change",this.changeListener)},this.changeListener=function(a){a.range={start:a.data.range.start,end:a.data.range.end},this.emit("change",a)}}).call(g.prototype),b.WorkerClient=g}),define("ace/keyboard/state_handler",["require","exports","module"],function(a,b,c){function e(a){this.keymapping=this.$buildKeymappingRegex(a)}var d=!1;e.prototype={$buildKeymappingRegex:function(a){for(var b in a)this.$buildBindingsRegex(a[b]);return a},$buildBindingsRegex:function(a){a.forEach(function(a){a.key?a.key=new RegExp("^"+a.key+"$"):Array.isArray(a.regex)?("key"in a||(a.key=new RegExp("^"+a.regex[1]+"$")),a.regex=new RegExp(a.regex.join("")+"$")):a.regex&&(a.regex=new RegExp(a.regex+"$"))})},$composeBuffer:function(a,b,c,d){if(a.state==null||a.buffer==null)a.state="start",a.buffer="";var e=[];b&1&&e.push("ctrl"),b&8&&e.push("command"),b&2&&e.push("option"),b&4&&e.push("shift"),c&&e.push(c);var f=e.join("-"),g=a.buffer+f;b!=2&&(a.buffer=g);var h={bufferToUse:g,symbolicName:f};return d&&(h.keyIdentifier=d.keyIdentifier),h},$find:function(a,b,c,e,f,g){var h={};return this.keymapping[a.state].some(function(i){var j;if(i.key&&!i.key.test(c))return!1;if(i.regex&&!(j=i.regex.exec(b)))return!1;if(i.match&&!i.match(b,e,f,c,g))return!1;if(i.disallowMatches)for(var k=0;k<i.disallowMatches.length;k++)if(!!j[i.disallowMatches[k]])return!1;if(i.exec){h.command=i.exec;if(i.params){var l;h.args={},i.params.forEach(function(a){a.match!=null&&j!=null?l=j[a.match]||a.defaultValue:l=a.defaultValue,a.type==="number"&&(l=parseInt(l)),h.args[a.name]=l})}a.buffer=""}return i.then&&(a.state=i.then,a.buffer=""),h.command==null&&(h.command="null"),d&&console.log("KeyboardStateMapper#find",i),!0}),h.command?h:(a.buffer="",!1)},handleKeyboard:function(a,b,c,e,f){b==-1&&(b=0);if(b==0||c!=""&&c!=String.fromCharCode(0)){var g=this.$composeBuffer(a,b,c,f),h=g.bufferToUse,i=g.symbolicName,j=g.keyIdentifier;return g=this.$find(a,h,i,b,c,j),d&&console.log("KeyboardStateMapper#match",h,i,g),g}return null}},b.matchCharacterOnly=function(a,b,c,d){return b==0?!0:b==4&&c.length==1?!0:!1},b.StateHandler=e}),define("ace/placeholder",["require","exports","module","ace/range","ace/lib/event_emitter","ace/lib/oop"],function(a,b,c){var d=a("./range").Range,e=a("./lib/event_emitter").EventEmitter,f=a("./lib/oop"),g=function(a,b,c,d,e,f){var g=this;this.length=b,this.session=a,this.doc=a.getDocument(),this.mainClass=e,this.othersClass=f,this.$onUpdate=this.onUpdate.bind(this),this.doc.on("change",this.$onUpdate),this.$others=d,this.$onCursorChange=function(){setTimeout(function(){g.onCursorChange()})},this.$pos=c;var h=a.getUndoManager().$undoStack||a.getUndoManager().$undostack||{length:-1};this.$undoStackDepth=h.length,this.setup(),a.selection.on("changeCursor",this.$onCursorChange)};(function(){f.implement(this,e),this.setup=function(){var a=this,b=this.doc,c=this.session,e=this.$pos;this.pos=b.createAnchor(e.row,e.column),this.markerId=c.addMarker(new d(e.row,e.column,e.row,e.column+this.length),this.mainClass,null,!1),this.pos.on("change",function(b){c.removeMarker(a.markerId),a.markerId=c.addMarker(new d(b.value.row,b.value.column,b.value.row,b.value.column+a.length),a.mainClass,null,!1)}),this.others=[],this.$others.forEach(function(c){var d=b.createAnchor(c.row,c.column);a.others.push(d)}),c.setUndoSelect(!1)},this.showOtherMarkers=function(){if(this.othersActive)return;var a=this.session,b=this;this.othersActive=!0,this.others.forEach(function(c){c.markerId=a.addMarker(new d(c.row,c.column,c.row,c.column+b.length),b.othersClass,null,!1),c.on("change",function(e){a.removeMarker(c.markerId),c.markerId=a.addMarker(new d(e.value.row,e.value.column,e.value.row,e.value.column+b.length),b.othersClass,null,!1)})})},this.hideOtherMarkers=function(){if(!this.othersActive)return;this.othersActive=!1;for(var a=0;a<this.others.length;a++)this.session.removeMarker(this.others[a].markerId)},this.onUpdate=function(a){var b=a.data,c=b.range;if(c.start.row!==c.end.row)return;if(c.start.row!==this.pos.row)return;if(this.$updating)return;this.$updating=!0;var e=b.action==="insertText"?c.end.column-c.start.column:c.start.column-c.end.column;if(c.start.column>=this.pos.column&&c.start.column<=this.pos.column+this.length+1){var f=c.start.column-this.pos.column;this.length+=e;if(!this.session.$fromUndo){if(b.action==="insertText")for(var g=this.others.length-1;g>=0;g--){var h=this.others[g],i={row:h.row,column:h.column+f};h.row===c.start.row&&c.start.column<h.column&&(i.column+=e),this.doc.insert(i,b.text)}else if(b.action==="removeText")for(var g=this.others.length-1;g>=0;g--){var h=this.others[g],i={row:h.row,column:h.column+f};h.row===c.start.row&&c.start.column<h.column&&(i.column+=e),this.doc.remove(new d(i.row,i.column,i.row,i.column-e))}c.start.column===this.pos.column&&b.action==="insertText"?setTimeout(function(){this.pos.setPosition(this.pos.row,this.pos.column-e);for(var a=0;a<this.others.length;a++){var b=this.others[a],d={row:b.row,column:b.column-e};b.row===c.start.row&&c.start.column<b.column&&(d.column+=e),b.setPosition(d.row,d.column)}}.bind(this),0):c.start.column===this.pos.column&&b.action==="removeText"&&setTimeout(function(){for(var a=0;a<this.others.length;a++){var b=this.others[a];b.row===c.start.row&&c.start.column<b.column&&b.setPosition(b.row,b.column-e)}}.bind(this),0)}this.pos._emit("change",{value:this.pos});for(var g=0;g<this.others.length;g++)this.others[g]._emit("change",{value:this.others[g]})}this.$updating=!1},this.onCursorChange=function(a){if(this.$updating)return;var b=this.session.selection.getCursor();b.row===this.pos.row&&b.column>=this.pos.column&&b.column<=this.pos.column+this.length?(this.showOtherMarkers(),this._emit("cursorEnter",a)):(this.hideOtherMarkers(),this._emit("cursorLeave",a))},this.detach=function(){this.session.removeMarker(this.markerId),this.hideOtherMarkers(),this.doc.removeEventListener("change",this.$onUpdate),this.session.selection.removeEventListener("changeCursor",this.$onCursorChange),this.pos.detach();for(var a=0;a<this.others.length;a++)this.others[a].detach();this.session.setUndoSelect(!0)},this.cancel=function(){if(this.$undoStackDepth===-1)throw Error("Canceling placeholders only supported with undo manager attached to session.");var a=this.session.getUndoManager(),b=(a.$undoStack||a.$undostack).length-this.$undoStackDepth;for(var c=0;c<b;c++)a.undo(!0)}}).call(g.prototype),b.PlaceHolder=g}),define("ace/theme/textmate",["require","exports","module","text!ace/theme/textmate.css","ace/lib/dom"],function(a,b,c){b.isDark=!1,b.cssClass="ace-tm",b.cssText=a("text!./textmate.css");var d=a("../lib/dom");d.importCssString(b.cssText,b.cssClass)}),define("text!ace/theme/textmate.css",[],".ace-tm .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-tm .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-tm .ace_gutter {\n  background: #e8e8e8;\n  color: #333;\n}\n\n.ace-tm .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-tm .ace_fold {\n    background-color: #6B72E6;\n}\n\n.ace-tm .ace_text-layer {\n  cursor: text;\n}\n\n.ace-tm .ace_cursor {\n  border-left: 2px solid black;\n}\n\n.ace-tm .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid black;\n}\n        \n.ace-tm .ace_line .ace_invisible {\n  color: rgb(191, 191, 191);\n}\n\n.ace-tm .ace_line .ace_storage,\n.ace-tm .ace_line .ace_keyword {\n  color: blue;\n}\n\n.ace-tm .ace_line .ace_constant {\n  color: rgb(197, 6, 11);\n}\n\n.ace-tm .ace_line .ace_constant.ace_buildin {\n  color: rgb(88, 72, 246);\n}\n\n.ace-tm .ace_line .ace_constant.ace_language {\n  color: rgb(88, 92, 246);\n}\n\n.ace-tm .ace_line .ace_constant.ace_library {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_line .ace_invalid {\n  background-color: rgba(255, 0, 0, 0.1);\n  color: red;\n}\n\n.ace-tm .ace_line .ace_support.ace_function {\n  color: rgb(60, 76, 114);\n}\n\n.ace-tm .ace_line .ace_support.ace_constant {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_line .ace_support.ace_type,\n.ace-tm .ace_line .ace_support.ace_class {\n  color: rgb(109, 121, 222);\n}\n\n.ace-tm .ace_line .ace_keyword.ace_operator {\n  color: rgb(104, 118, 135);\n}\n\n.ace-tm .ace_line .ace_string {\n  color: rgb(3, 106, 7);\n}\n\n.ace-tm .ace_line .ace_comment {\n  color: rgb(76, 136, 107);\n}\n\n.ace-tm .ace_line .ace_comment.ace_doc {\n  color: rgb(0, 102, 255);\n}\n\n.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {\n  color: rgb(128, 159, 191);\n}\n\n.ace-tm .ace_line .ace_constant.ace_numeric {\n  color: rgb(0, 0, 205);\n}\n\n.ace-tm .ace_line .ace_variable {\n  color: rgb(49, 132, 149);\n}\n\n.ace-tm .ace_line .ace_xml_pe {\n  color: rgb(104, 104, 91);\n}\n\n.ace-tm .ace_entity.ace_name.ace_function {\n  color: #0000A2;\n}\n\n.ace-tm .ace_markup.ace_markupine {\n    text-decoration:underline;\n}\n\n.ace-tm .ace_markup.ace_heading {\n  color: rgb(12, 7, 255);\n}\n\n.ace-tm .ace_markup.ace_list {\n  color:rgb(185, 6, 144);\n}\n\n.ace-tm .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n.ace-tm.multiselect .ace_selection.start {\n  box-shadow: 0 0 3px 0px white;\n  border-radius: 2px;\n}\n.ace-tm .ace_marker-layer .ace_step {\n  background: rgb(252, 255, 0);\n}\n\n.ace-tm .ace_marker-layer .ace_stack {\n  background: rgb(164, 229, 101);\n}\n\n.ace-tm .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-tm .ace_marker-layer .ace_active_line {\n  background: rgba(0, 0, 0, 0.07);\n}\n.ace-tm .ace_gutter_active_line{\n    background-color : #dcdcdc;\n}\n\n.ace-tm .ace_marker-layer .ace_selected_word {\n  background: rgb(250, 250, 255);\n  border: 1px solid rgb(200, 200, 250);\n}\n\n.ace-tm .ace_meta.ace_tag {\n  color:rgb(0, 50, 198);\n}\n\n.ace-tm .ace_string.ace_regex {\n  color: rgb(255, 0, 0)\n}");
            (function() {
                window.require(["ace/ace"], function(a) {
                    a && a.config.init();
                    if (!window.ace)
                        window.ace = {};
                    for (var key in a) if (a.hasOwnProperty(key))
                        ace[key] = a[key];
                });
            })();
        
define("ace/theme/textmate",["require","exports","module","ace/lib/dom"],function(a,b,c){b.isDark=!1,b.cssClass="ace-tm",b.cssText=".ace-tm .ace_editor {  border: 2px solid rgb(159, 159, 159);}.ace-tm .ace_editor.ace_focus {  border: 2px solid #327fbd;}.ace-tm .ace_gutter {  background: #e8e8e8;  color: #333;}.ace-tm .ace_print_margin {  width: 1px;  background: #e8e8e8;}.ace-tm .ace_fold {    background-color: #6B72E6;}.ace-tm .ace_text-layer {  cursor: text;}.ace-tm .ace_cursor {  border-left: 2px solid black;}.ace-tm .ace_cursor.ace_overwrite {  border-left: 0px;  border-bottom: 1px solid black;}        .ace-tm .ace_line .ace_invisible {  color: rgb(191, 191, 191);}.ace-tm .ace_line .ace_storage,.ace-tm .ace_line .ace_keyword {  color: blue;}.ace-tm .ace_line .ace_constant {  color: rgb(197, 6, 11);}.ace-tm .ace_line .ace_constant.ace_buildin {  color: rgb(88, 72, 246);}.ace-tm .ace_line .ace_constant.ace_language {  color: rgb(88, 92, 246);}.ace-tm .ace_line .ace_constant.ace_library {  color: rgb(6, 150, 14);}.ace-tm .ace_line .ace_invalid {  background-color: rgba(255, 0, 0, 0.1);  color: red;}.ace-tm .ace_line .ace_support.ace_function {  color: rgb(60, 76, 114);}.ace-tm .ace_line .ace_support.ace_constant {  color: rgb(6, 150, 14);}.ace-tm .ace_line .ace_support.ace_type,.ace-tm .ace_line .ace_support.ace_class {  color: rgb(109, 121, 222);}.ace-tm .ace_line .ace_keyword.ace_operator {  color: rgb(104, 118, 135);}.ace-tm .ace_line .ace_string {  color: rgb(3, 106, 7);}.ace-tm .ace_line .ace_comment {  color: rgb(76, 136, 107);}.ace-tm .ace_line .ace_comment.ace_doc {  color: rgb(0, 102, 255);}.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {  color: rgb(128, 159, 191);}.ace-tm .ace_line .ace_constant.ace_numeric {  color: rgb(0, 0, 205);}.ace-tm .ace_line .ace_variable {  color: rgb(49, 132, 149);}.ace-tm .ace_line .ace_xml_pe {  color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {  color: #0000A2;}.ace-tm .ace_markup.ace_markupine {    text-decoration:underline;}.ace-tm .ace_markup.ace_heading {  color: rgb(12, 7, 255);}.ace-tm .ace_markup.ace_list {  color:rgb(185, 6, 144);}.ace-tm .ace_marker-layer .ace_selection {  background: rgb(181, 213, 255);}.ace-tm.multiselect .ace_selection.start {  box-shadow: 0 0 3px 0px white;  border-radius: 2px;}.ace-tm .ace_marker-layer .ace_step {  background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {  background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {  margin: -1px 0 0 -1px;  border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active_line {  background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter_active_line{    background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected_word {  background: rgb(250, 250, 255);  border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_meta.ace_tag {  color:rgb(0, 50, 198);}.ace-tm .ace_string.ace_regex {  color: rgb(255, 0, 0)}";var d=a("../lib/dom");d.importCssString(b.cssText,b.cssClass)})
;
define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./javascript_highlight_rules").JavaScriptHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("../range").Range,j=a("../worker/worker_client").WorkerClient,k=a("./behaviour/cstyle").CstyleBehaviour,l=a("./folding/cstyle").FoldMode,m=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h,this.$behaviour=new k,this.foldingRules=new l};d.inherits(m,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=/^(\s*)\/\//;for(var g=c;g<=d;g++)if(!f.test(b.getLine(g))){e=!1;break}if(e){var h=new i(0,0,0,0);for(var g=c;g<=d;g++){var j=b.getLine(g),k=j.match(f);h.start.row=g,h.end.row=g,h.end.column=k[0].length,b.replace(h,k[1])}}else b.indentRows(c,d,"//")},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens,g=e.state;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"||a=="regex_allowed"){var h=b.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);h&&(d+=c)}else if(a=="doc-start"){if(g=="start"||a=="regex_allowed")return"";var h=b.match(/^\s*(\/?)\*/);h&&(h[1]&&(d+=" "),d+="* ")}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new j(["ace"],"worker-javascript.js","ace/mode/javascript_worker","JavaScriptWorker");return b.attachToDocument(a.getDocument()),b.on("jslint",function(b){var c=[];for(var d=0;d<b.data.length;d++){var e=b.data[d];e&&c.push({row:e.line-1,column:e.character-1,text:e.reason,type:"warning",lint:e})}a.setAnnotations(c)}),b.on("narcissus",function(b){a.setAnnotations([b.data])}),b.on("terminate",function(){a.clearAnnotations()}),b}}.call(m.prototype),b.Mode=m}),define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/unicode","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/lang"),f=a("../unicode"),g=a("./doc_comment_highlight_rules").DocCommentHighlightRules,h=a("./text_highlight_rules").TextHighlightRules,i=function(){var a=e.arrayToMap("Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document".split("|")),b=e.arrayToMap("break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|const|yield|import|get|set".split("|")),c="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield",d=e.arrayToMap("__parent__|__count__|escape|unescape|with|__proto__".split("|")),h=e.arrayToMap("const|let|var|function".split("|")),i=e.arrayToMap("null|Infinity|NaN|undefined".split("|")),j=e.arrayToMap("class|enum|extends|super|export|implements|private|public|interface|package|protected|static".split("|")),k="["+f.packages.L+"\\$_]["+f.packages.L+f.packages.Mn+f.packages.Mc+f.packages.Nd+f.packages.Pc+"\\$_]*\\b",l="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";this.$rules={start:[{token:"comment",regex:/\/\/.*$/},g.getStartRule("doc-start"),{token:"comment",merge:!0,regex:/\/\*/,next:"comment"},{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+k+")(\\.)(prototype)(\\.)("+k+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator","text"],regex:"("+k+")(\\.)(prototype)(\\.)("+k+")(\\s*)(=)(\\s*)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+k+")(\\.)("+k+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+k+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+k+")(\\.)("+k+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+k+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+k+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"constant.language.boolean",regex:/(?:true|false)\b/},{token:"keyword",regex:"(?:"+c+")\\b",next:"regex_allowed"},{token:["punctuation.operator","support.function"],regex:/(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:opzzzz|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:["punctuation.operator","support.function.dom"],regex:/(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:["punctuation.operator","support.constant"],regex:/(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/},{token:function(c){return a.hasOwnProperty(c)?"variable.language":d.hasOwnProperty(c)?"invalid.deprecated":h.hasOwnProperty(c)?"storage.type":b.hasOwnProperty(c)?"keyword":i.hasOwnProperty(c)?"constant.language":j.hasOwnProperty(c)?"invalid.illegal":c=="debugger"?"invalid.deprecated":"identifier"},regex:k},{token:"keyword.operator",regex:/!|\$|%|&|\*|\-\-|\-|\+\+|\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=|\b(?:in|instanceof|new|delete|typeof|void)/,next:"regex_allowed"},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./,next:"regex_allowed"},{token:"paren.lparen",regex:/[\[({]/,next:"regex_allowed"},{token:"paren.rparen",regex:/[\])}]/},{token:"keyword.operator",regex:/\/=?/,next:"regex_allowed"},{token:"comment",regex:/^#!.*$/},{token:"text",regex:/\s+/}],regex_allowed:[g.getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/.*$"},{token:"string.regexp",regex:"\\/",next:"regex",merge:!0},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/\\w*",next:"start",merge:!0},{token:"string.regexp",regex:"[^\\\\/\\[]+",merge:!0},{token:"string.regexp.charachterclass",regex:"\\[",next:"regex_character_class",merge:!0},{token:"empty",regex:"",next:"start"}],regex_character_class:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp.charachterclass",regex:"]",next:"regex",merge:!0},{token:"string.regexp.charachterclass",regex:"[^\\\\\\]]+",merge:!0},{token:"empty",regex:"",next:"start"}],function_arguments:[{token:"variable.parameter",regex:k},{token:"punctuation.operator",regex:"[, ]+",merge:!0},{token:"punctuation.operator",regex:"$",merge:!0},{token:"empty",regex:"",next:"start"}],comment_regex_allowed:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"regex_allowed"},{token:"comment",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"constant.language.escape",regex:l},{token:"string",regex:'[^"\\\\]+',merge:!0},{token:"string",regex:"\\\\$",next:"qqstring",merge:!0},{token:"string",regex:'"|$',next:"start",merge:!0}],qstring:[{token:"constant.language.escape",regex:l},{token:"string",regex:"[^'\\\\]+",merge:!0},{token:"string",regex:"\\\\$",next:"qstring",merge:!0},{token:"string",regex:"'|$",next:"start",merge:!0}]},this.embedRules(g,"doc-",[g.getEndRule("start")])};d.inherits(i,h),b.JavaScriptHighlightRules=i}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};d.inherits(f,e),f.getStartRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:a}},f.getEndRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:a}},b.DocCommentHighlightRules=f}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}}).call(e.prototype),b.MatchingBraceOutdent=e}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(a,b,c){var d=a("../../lib/oop"),e=a("../behaviour").Behaviour,f=function(){this.add("braces","insertion",function(a,b,c,d,e){if(e=="{"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"{"+g+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(e=="}"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var k=d.$findOpeningBracket("}",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var l=d.findMatchingBracket({row:h.row,column:h.column+1});if(!l)return null;var m=this.getNextLineIndent(a,i.substring(0,i.length-1),d.getTabString()),n=this.$getIndent(d.doc.getLine(l.row));return{text:"\n"+m+"\n"+n,selection:[1,m.length,1,m.length]}}}}),this.add("braces","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="{"){var g=d.doc.getLine(e.start.row),h=g.substring(e.end.column,e.end.column+1);if(h=="}")return e.end.column++,e}}),this.add("parens","insertion",function(a,b,c,d,e){if(e=="("){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"("+g+")",selection:!1}:{text:"()",selection:[1,1]}}if(e==")"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==")"){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="("){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==")")return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if(e=='"'||e=="'"){var f=e,g=c.getSelectionRange(),h=d.doc.getTextRange(g);if(h!=="")return{text:f+h+f,selection:!1};var i=c.getCursorPosition(),j=d.doc.getLine(i.row),k=j.substring(i.column-1,i.column);if(k=="\\")return null;var l=d.getTokens(g.start.row),m=0,n,o=-1;for(var p=0;p<l.length;p++){n=l[p],n.type=="string"?o=-1:o<0&&(o=n.value.indexOf(f));if(n.value.length+m>g.start.column)break;m+=l[p].value.length}if(!n||o<0&&n.type!=="comment"&&(n.type!=="string"||g.start.column!==n.value.length+m-1&&n.value.lastIndexOf(f)===n.value.length-1))return{text:f+f,selection:[1,1]};if(n&&n.type==="string"){var q=j.substring(i.column,i.column+1);if(q==f)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&(f=='"'||f=="'")){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h=='"')return e.end.column++,e}})};d.inherits(f,e),b.CstyleBehaviour=f}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(){};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c){var d=a.getLine(c),f=d.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length);return h.end.column-=2,h}if(b!=="markbeginend")return;var f=d.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;if(f[2]){var h=a.getCommentFoldRange(c,g);return h.end.column-=2,h}var i={row:c,column:g},j=a.$findOpeningBracket(f[1],i);if(!j)return;return j.column++,i.column--,e.fromPoints(j,i)}}}.call(g.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){var d=a("../../range").Range,e=b.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);return this.foldingStartMarker.test(d)?"start":b=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(d)?"end":""},this.getFoldWidgetRange=function(a,b,c){return null},this.indentationBlock=function(a,b,c){var e=/^\s*/,f=b,g=b,h=a.getLine(b),i=c||h.length,j=h.match(e)[0].length,k=a.getLength();while(++b<k){h=a.getLine(b);var l=h.match(e)[0].length;if(l==h.length)continue;if(l<=j)break;g=b}if(g>f){var m=a.getLine(g).length;return new d(f,i,g,m)}},this.openingBracketBlock=function(a,b,c,e,f,g){var h={row:c,column:e+1},i=a.$findClosingBracket(b,h,f,g);if(!i)return;var j=a.foldWidgets[i.row];return j==null&&(j=this.getFoldWidget(a,i.row)),j=="start"&&(i.row--,i.column=a.getLine(i.row).length),d.fromPoints(h,i)}}).call(e.prototype)})
;
define("ace/mode/html",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript","ace/mode/css","ace/tokenizer","ace/mode/html_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/html"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("./javascript").Mode,g=a("./css").Mode,h=a("../tokenizer").Tokenizer,i=a("./html_highlight_rules").HtmlHighlightRules,j=a("./behaviour/xml").XmlBehaviour,k=a("./folding/html").FoldMode,l=function(){var a=new i;this.$tokenizer=new h(a.getRules()),this.$behaviour=new j,this.$embeds=a.getEmbeds(),this.createModeDelegates({"js-":f,"css-":g}),this.foldingRules=new k};d.inherits(l,e),function(){this.toggleCommentLines=function(a,b,c,d){return 0},this.getNextLineIndent=function(a,b,c){return this.$getIndent(b)},this.checkOutdent=function(a,b,c){return!1}}.call(l.prototype),b.Mode=l}),define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./javascript_highlight_rules").JavaScriptHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("../range").Range,j=a("../worker/worker_client").WorkerClient,k=a("./behaviour/cstyle").CstyleBehaviour,l=a("./folding/cstyle").FoldMode,m=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h,this.$behaviour=new k,this.foldingRules=new l};d.inherits(m,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=/^(\s*)\/\//;for(var g=c;g<=d;g++)if(!f.test(b.getLine(g))){e=!1;break}if(e){var h=new i(0,0,0,0);for(var g=c;g<=d;g++){var j=b.getLine(g),k=j.match(f);h.start.row=g,h.end.row=g,h.end.column=k[0].length,b.replace(h,k[1])}}else b.indentRows(c,d,"//")},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens,g=e.state;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"||a=="regex_allowed"){var h=b.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);h&&(d+=c)}else if(a=="doc-start"){if(g=="start"||a=="regex_allowed")return"";var h=b.match(/^\s*(\/?)\*/);h&&(h[1]&&(d+=" "),d+="* ")}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new j(["ace"],"worker-javascript.js","ace/mode/javascript_worker","JavaScriptWorker");return b.attachToDocument(a.getDocument()),b.on("jslint",function(b){var c=[];for(var d=0;d<b.data.length;d++){var e=b.data[d];e&&c.push({row:e.line-1,column:e.character-1,text:e.reason,type:"warning",lint:e})}a.setAnnotations(c)}),b.on("narcissus",function(b){a.setAnnotations([b.data])}),b.on("terminate",function(){a.clearAnnotations()}),b}}.call(m.prototype),b.Mode=m}),define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/unicode","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/lang"),f=a("../unicode"),g=a("./doc_comment_highlight_rules").DocCommentHighlightRules,h=a("./text_highlight_rules").TextHighlightRules,i=function(){var a=e.arrayToMap("Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document".split("|")),b=e.arrayToMap("break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|const|yield|import|get|set".split("|")),c="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield",d=e.arrayToMap("__parent__|__count__|escape|unescape|with|__proto__".split("|")),h=e.arrayToMap("const|let|var|function".split("|")),i=e.arrayToMap("null|Infinity|NaN|undefined".split("|")),j=e.arrayToMap("class|enum|extends|super|export|implements|private|public|interface|package|protected|static".split("|")),k="["+f.packages.L+"\\$_]["+f.packages.L+f.packages.Mn+f.packages.Mc+f.packages.Nd+f.packages.Pc+"\\$_]*\\b",l="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";this.$rules={start:[{token:"comment",regex:/\/\/.*$/},g.getStartRule("doc-start"),{token:"comment",merge:!0,regex:/\/\*/,next:"comment"},{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+k+")(\\.)(prototype)(\\.)("+k+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator","text"],regex:"("+k+")(\\.)(prototype)(\\.)("+k+")(\\s*)(=)(\\s*)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+k+")(\\.)("+k+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+k+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+k+")(\\.)("+k+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+k+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+k+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"constant.language.boolean",regex:/(?:true|false)\b/},{token:"keyword",regex:"(?:"+c+")\\b",next:"regex_allowed"},{token:["punctuation.operator","support.function"],regex:/(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:opzzzz|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:["punctuation.operator","support.function.dom"],regex:/(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:["punctuation.operator","support.constant"],regex:/(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/},{token:function(c){return a.hasOwnProperty(c)?"variable.language":d.hasOwnProperty(c)?"invalid.deprecated":h.hasOwnProperty(c)?"storage.type":b.hasOwnProperty(c)?"keyword":i.hasOwnProperty(c)?"constant.language":j.hasOwnProperty(c)?"invalid.illegal":c=="debugger"?"invalid.deprecated":"identifier"},regex:k},{token:"keyword.operator",regex:/!|\$|%|&|\*|\-\-|\-|\+\+|\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=|\b(?:in|instanceof|new|delete|typeof|void)/,next:"regex_allowed"},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./,next:"regex_allowed"},{token:"paren.lparen",regex:/[\[({]/,next:"regex_allowed"},{token:"paren.rparen",regex:/[\])}]/},{token:"keyword.operator",regex:/\/=?/,next:"regex_allowed"},{token:"comment",regex:/^#!.*$/},{token:"text",regex:/\s+/}],regex_allowed:[g.getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/.*$"},{token:"string.regexp",regex:"\\/",next:"regex",merge:!0},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/\\w*",next:"start",merge:!0},{token:"string.regexp",regex:"[^\\\\/\\[]+",merge:!0},{token:"string.regexp.charachterclass",regex:"\\[",next:"regex_character_class",merge:!0},{token:"empty",regex:"",next:"start"}],regex_character_class:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp.charachterclass",regex:"]",next:"regex",merge:!0},{token:"string.regexp.charachterclass",regex:"[^\\\\\\]]+",merge:!0},{token:"empty",regex:"",next:"start"}],function_arguments:[{token:"variable.parameter",regex:k},{token:"punctuation.operator",regex:"[, ]+",merge:!0},{token:"punctuation.operator",regex:"$",merge:!0},{token:"empty",regex:"",next:"start"}],comment_regex_allowed:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"regex_allowed"},{token:"comment",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"constant.language.escape",regex:l},{token:"string",regex:'[^"\\\\]+',merge:!0},{token:"string",regex:"\\\\$",next:"qqstring",merge:!0},{token:"string",regex:'"|$',next:"start",merge:!0}],qstring:[{token:"constant.language.escape",regex:l},{token:"string",regex:"[^'\\\\]+",merge:!0},{token:"string",regex:"\\\\$",next:"qstring",merge:!0},{token:"string",regex:"'|$",next:"start",merge:!0}]},this.embedRules(g,"doc-",[g.getEndRule("start")])};d.inherits(i,h),b.JavaScriptHighlightRules=i}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};d.inherits(f,e),f.getStartRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:a}},f.getEndRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:a}},b.DocCommentHighlightRules=f}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}}).call(e.prototype),b.MatchingBraceOutdent=e}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(a,b,c){var d=a("../../lib/oop"),e=a("../behaviour").Behaviour,f=function(){this.add("braces","insertion",function(a,b,c,d,e){if(e=="{"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"{"+g+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(e=="}"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var k=d.$findOpeningBracket("}",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var l=d.findMatchingBracket({row:h.row,column:h.column+1});if(!l)return null;var m=this.getNextLineIndent(a,i.substring(0,i.length-1),d.getTabString()),n=this.$getIndent(d.doc.getLine(l.row));return{text:"\n"+m+"\n"+n,selection:[1,m.length,1,m.length]}}}}),this.add("braces","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="{"){var g=d.doc.getLine(e.start.row),h=g.substring(e.end.column,e.end.column+1);if(h=="}")return e.end.column++,e}}),this.add("parens","insertion",function(a,b,c,d,e){if(e=="("){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"("+g+")",selection:!1}:{text:"()",selection:[1,1]}}if(e==")"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==")"){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="("){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==")")return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if(e=='"'||e=="'"){var f=e,g=c.getSelectionRange(),h=d.doc.getTextRange(g);if(h!=="")return{text:f+h+f,selection:!1};var i=c.getCursorPosition(),j=d.doc.getLine(i.row),k=j.substring(i.column-1,i.column);if(k=="\\")return null;var l=d.getTokens(g.start.row),m=0,n,o=-1;for(var p=0;p<l.length;p++){n=l[p],n.type=="string"?o=-1:o<0&&(o=n.value.indexOf(f));if(n.value.length+m>g.start.column)break;m+=l[p].value.length}if(!n||o<0&&n.type!=="comment"&&(n.type!=="string"||g.start.column!==n.value.length+m-1&&n.value.lastIndexOf(f)===n.value.length-1))return{text:f+f,selection:[1,1]};if(n&&n.type==="string"){var q=j.substring(i.column,i.column+1);if(q==f)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&(f=='"'||f=="'")){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h=='"')return e.end.column++,e}})};d.inherits(f,e),b.CstyleBehaviour=f}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(){};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c){var d=a.getLine(c),f=d.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length);return h.end.column-=2,h}if(b!=="markbeginend")return;var f=d.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;if(f[2]){var h=a.getCommentFoldRange(c,g);return h.end.column-=2,h}var i={row:c,column:g},j=a.$findOpeningBracket(f[1],i);if(!j)return;return j.column++,i.column--,e.fromPoints(j,i)}}}.call(g.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){var d=a("../../range").Range,e=b.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);return this.foldingStartMarker.test(d)?"start":b=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(d)?"end":""},this.getFoldWidgetRange=function(a,b,c){return null},this.indentationBlock=function(a,b,c){var e=/^\s*/,f=b,g=b,h=a.getLine(b),i=c||h.length,j=h.match(e)[0].length,k=a.getLength();while(++b<k){h=a.getLine(b);var l=h.match(e)[0].length;if(l==h.length)continue;if(l<=j)break;g=b}if(g>f){var m=a.getLine(g).length;return new d(f,i,g,m)}},this.openingBracketBlock=function(a,b,c,e,f,g){var h={row:c,column:e+1},i=a.$findClosingBracket(b,h,f,g);if(!i)return;var j=a.foldWidgets[i.row];return j==null&&(j=this.getFoldWidget(a,i.row)),j=="start"&&(i.row--,i.column=a.getLine(i.row).length),d.fromPoints(h,i)}}).call(e.prototype)}),define("ace/mode/css",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/css_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/folding/cstyle"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./css_highlight_rules").CssHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("../worker/worker_client").WorkerClient,j=a("./folding/cstyle").FoldMode,k=function(){this.$tokenizer=new f((new g).getRules(),"i"),this.$outdent=new h,this.foldingRules=new j};d.inherits(k,e),function(){this.foldingRules="cStyle",this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a).tokens;if(e.length&&e[e.length-1].type=="comment")return d;var f=b.match(/^.*\{\s*$/);return f&&(d+=c),d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new i(["ace"],"worker-css.js","ace/mode/css_worker","Worker");return b.attachToDocument(a.getDocument()),b.on("csslint",function(b){var c=[];b.data.forEach(function(a){c.push({row:a.line-1,column:a.col-1,text:a.message,type:a.type,lint:a})}),a.setAnnotations(c)}),b}}.call(k.prototype),b.Mode=k}),define("ace/mode/css_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/lang"),f=a("./text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap("animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index".split("|")),b=e.arrayToMap("rgb|rgba|url|attr|counter|counters".split("|")),c=e.arrayToMap("absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|font-size|font|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|top|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero".split("|")),d=e.arrayToMap("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow".split("|")),f=e.arrayToMap("arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace".split("|")),g="\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))",h="(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",i="(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",j=[{token:"comment",merge:!0,regex:"\\/\\*",next:"ruleset_comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:["constant.numeric","keyword"],regex:"("+g+")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"},{token:["constant.numeric"],regex:"([0-9]+)"},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:["punctuation","entity.other.attribute-name.pseudo-element.css"],regex:h},{token:["punctuation","entity.other.attribute-name.pseudo-class.css"],regex:i},{token:function(e){return a.hasOwnProperty(e.toLowerCase())?"support.type":b.hasOwnProperty(e.toLowerCase())?"support.function":c.hasOwnProperty(e.toLowerCase())?"support.constant":d.hasOwnProperty(e.toLowerCase())?"support.constant.color":f.hasOwnProperty(e.toLowerCase())?"support.constant.fonts":"text"},regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"}],k=e.copyArray(j);k.unshift({token:"paren.rparen",regex:"\\}",next:"start"});var l=e.copyArray(j);l.unshift({token:"paren.rparen",regex:"\\}",next:"media"});var m=[{token:"comment",merge:!0,regex:".+"}],n=e.copyArray(m);n.unshift({token:"comment",regex:".*?\\*\\/",next:"start"});var o=e.copyArray(m);o.unshift({token:"comment",regex:".*?\\*\\/",next:"media"});var p=e.copyArray(m);p.unshift({token:"comment",regex:".*?\\*\\/",next:"ruleset"}),this.$rules={start:[{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"paren.lparen",regex:"\\{",next:"ruleset"},{token:"string",regex:"@.*?{",next:"media"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant",regex:"[a-z0-9-_]+"}],media:[{token:"comment",merge:!0,regex:"\\/\\*",next:"media_comment"},{token:"paren.lparen",regex:"\\{",next:"media_ruleset"},{token:"string",regex:"\\}",next:"start"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant",regex:"[a-z0-9-_]+"}],comment:n,ruleset:k,ruleset_comment:p,media_ruleset:l,media_comment:o}};d.inherits(g,f),b.CssHighlightRules=g}),define("ace/mode/html_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/css_highlight_rules","ace/mode/javascript_highlight_rules","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("./css_highlight_rules").CssHighlightRules,f=a("./javascript_highlight_rules").JavaScriptHighlightRules,g=a("./xml_util"),h=a("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"text",merge:!0,regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",merge:!0,regex:"<\\!--",next:"comment"},{token:"xml_pe",regex:"<\\!.*?>"},{token:"meta.tag",regex:"<(?=s*script\\b)",next:"script"},{token:"meta.tag",regex:"<(?=s*style\\b)",next:"style"},{token:"meta.tag",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"constant.character.entity",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{token:"text",regex:"[^<]+"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",merge:!0,regex:"\\s+"},{token:"text",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",merge:!0,regex:".+"}]},g.tag(this.$rules,"tag","start"),g.tag(this.$rules,"style","css-start"),g.tag(this.$rules,"script","js-start"),this.embedRules(f,"js-",[{token:"comment",regex:"\\/\\/.*(?=<\\/script>)",next:"tag"},{token:"meta.tag",regex:"<\\/(?=script)",next:"tag"}]),this.embedRules(e,"css-",[{token:"meta.tag",regex:"<\\/(?=style)",next:"tag"}])};d.inherits(i,h),b.HtmlHighlightRules=i}),define("ace/mode/xml_util",["require","exports","module","ace/lib/lang"],function(a,b,c){function g(a){return[{token:"string",regex:'".*?"'},{token:"string",merge:!0,regex:'["].*',next:a+"_qqstring"},{token:"string",regex:"'.*?'"},{token:"string",merge:!0,regex:"['].*",next:a+"_qstring"}]}function h(a,b){return[{token:"string",merge:!0,regex:".*?"+a,next:b},{token:"string",merge:!0,regex:".+"}]}var d=a("../lib/lang"),e=d.arrayToMap("button|form|input|label|select|textarea".split("|")),f=d.arrayToMap("table|tbody|td|tfoot|th|tr".split("|"));b.tag=function(a,b,c){a[b]=[{token:"text",regex:"\\s+"},{token:function(a){return a==="a"?"meta.tag.anchor":a==="img"?"meta.tag.image":a==="script"?"meta.tag.script":a==="style"?"meta.tag.style":e.hasOwnProperty(a.toLowerCase())?"meta.tag.form":f.hasOwnProperty(a.toLowerCase())?"meta.tag.table":"meta.tag"},merge:!0,regex:"[-_a-zA-Z0-9:]+",next:b+"_embed_attribute_list"},{token:"empty",regex:"",next:b+"_embed_attribute_list"}],a[b+"_qstring"]=h("'",b+"_embed_attribute_list"),a[b+"_qqstring"]=h('"',b+"_embed_attribute_list"),a[b+"_embed_attribute_list"]=[{token:"meta.tag",merge:!0,regex:"/?>",next:c},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(g(b))}}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(a,b,c){var d=a("../../lib/oop"),e=a("../behaviour").Behaviour,f=a("./cstyle").CstyleBehaviour,g=function(){this.inherit(f,["string_dquotes"]),this.add("brackets","insertion",function(a,b,c,d,e){if(e=="<"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?!1:{text:"<>",selection:[1,1]}}if(e==">"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==">")return{text:"",selection:[1,1]}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),k=i.substring(h.column,h.column+2);if(k=="</"){var l=this.$getIndent(d.doc.getLine(h.row))+d.getTabString(),m=this.$getIndent(d.doc.getLine(h.row));return{text:"\n"+l+"\n"+m,selection:[1,l.length,1,l.length]}}}})};d.inherits(g,e),b.XmlBehaviour=g}),define("ace/mode/folding/html",["require","exports","module","ace/lib/oop","ace/mode/folding/mixed","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(a,b,c){var d=a("../../lib/oop"),e=a("./mixed").FoldMode,f=a("./xml").FoldMode,g=a("./cstyle").FoldMode,h=b.FoldMode=function(){e.call(this,new f({area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1,li:1,dt:1,dd:1,p:1,rt:1,rp:1,optgroup:1,option:1,colgroup:1,td:1,th:1}),{"js-":new g,"css-":new g})};d.inherits(h,e)}),define("ace/mode/folding/mixed",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(a,b,c){var d=a("../../lib/oop"),e=a("./fold_mode").FoldMode,f=b.FoldMode=function(a,b){this.defaultMode=a,this.subModes=b};d.inherits(f,e),function(){this.$getMode=function(a){for(var b in this.subModes)if(a.indexOf(b)===0)return this.subModes[b];return null},this.$tryMode=function(a,b,c,d){var e=this.$getMode(a);return e?e.getFoldWidget(b,c,d):""},this.getFoldWidget=function(a,b,c){return this.$tryMode(a.getState(c-1),a,b,c)||this.$tryMode(a.getState(c),a,b,c)||this.defaultMode.getFoldWidget(a,b,c)},this.getFoldWidgetRange=function(a,b,c){var d=this.$getMode(a.getState(c-1));if(!d||!d.getFoldWidget(a,b,c))d=this.$getMode(a.getState(c));if(!d||!d.getFoldWidget(a,b,c))d=this.defaultMode;return d.getFoldWidgetRange(a,b,c)}}.call(f.prototype)}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(a,b,c){var d=a("../../lib/oop"),e=a("../../lib/lang"),f=a("../../range").Range,g=a("./fold_mode").FoldMode,h=a("../../token_iterator").TokenIterator,i=b.FoldMode=function(a){g.call(this),this.voidElements=a||{}};d.inherits(i,g),function(){this.getFoldWidget=function(a,b,c){var d=this._getFirstTagInLine(a,c);return d.closing?b=="markbeginend"?"end":"":!d.tagName||this.voidElements[d.tagName.toLowerCase()]?"":d.selfClosing?"":d.value.indexOf("/"+d.tagName)!==-1?"":"start"},this._getFirstTagInLine=function(a,b){var c=a.getTokens(b),d="";for(var f=0;f<c.length;f++){var g=c[f];g.type.indexOf("meta.tag")===0?d+=g.value:d+=e.stringRepeat(" ",g.value.length)}return this._parseTag(d)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(a){var b=this.tagRe.exec(a),c=this.tagRe.lastIndex||0;return this.tagRe.lastIndex=0,{value:a,match:b?b[2]:"",closing:b?!!b[3]:!1,selfClosing:b?!!b[5]||b[2]=="/>":!1,tagName:b?b[4]:"",column:b[1]?c+b[1].length:c}},this._readTagForward=function(a){var b=a.getCurrentToken();if(!b)return null;var c="",d;do if(b.type.indexOf("meta.tag")===0){if(!d)var d={row:a.getCurrentTokenRow(),column:a.getCurrentTokenColumn()};c+=b.value;if(c.indexOf(">")!==-1){var e=this._parseTag(c);return e.start=d,e.end={row:a.getCurrentTokenRow(),column:a.getCurrentTokenColumn()+b.value.length},a.stepForward(),e}}while(b=a.stepForward());return null},this._readTagBackward=function(a){var b=a.getCurrentToken();if(!b)return null;var c="",d;do if(b.type.indexOf("meta.tag")===0){d||(d={row:a.getCurrentTokenRow(),column:a.getCurrentTokenColumn()+b.value.length}),c=b.value+c;if(c.indexOf("<")!==-1){var e=this._parseTag(c);return e.end=d,e.start={row:a.getCurrentTokenRow(),column:a.getCurrentTokenColumn()},a.stepBackward(),e}}while(b=a.stepBackward());return null},this._pop=function(a,b){while(a.length){var c=a[a.length-1];if(!b||c.tagName==b.tagName)return a.pop();if(this.voidElements[b.tagName])return;if(this.voidElements[c.tagName]){a.pop();continue}return null}},this.getFoldWidgetRange=function(a,b,c){var d=this._getFirstTagInLine(a,c);if(!d.match)return null;var e=d.closing||d.selfClosing,g=[],i;if(!e){var j=new h(a,c,d.column),k={row:c,column:d.column+d.tagName.length+2};while(i=this._readTagForward(j)){if(i.selfClosing){if(!g.length)return i.start.column+=i.tagName.length+2,i.end.column-=2,f.fromPoints(i.start,i.end);continue}if(i.closing){this._pop(g,i);if(g.length==0)return f.fromPoints(k,i.start)}else g.push(i)}}else{var j=new h(a,c,d.column+d.match.length),l={row:c,column:d.column};while(i=this._readTagBackward(j)){if(i.selfClosing){if(!g.length)return i.start.column+=i.tagName.length+2,i.end.column-=2,f.fromPoints(i.start,i.end);continue}if(!i.closing){this._pop(g,i);if(g.length==0)return i.start.column+=i.tagName.length+2,f.fromPoints(i.start,l)}else g.push(i)}}}}.call(i.prototype)})
;
define("ace/mode/css",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/css_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/folding/cstyle"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./css_highlight_rules").CssHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("../worker/worker_client").WorkerClient,j=a("./folding/cstyle").FoldMode,k=function(){this.$tokenizer=new f((new g).getRules(),"i"),this.$outdent=new h,this.foldingRules=new j};d.inherits(k,e),function(){this.foldingRules="cStyle",this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a).tokens;if(e.length&&e[e.length-1].type=="comment")return d;var f=b.match(/^.*\{\s*$/);return f&&(d+=c),d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new i(["ace"],"worker-css.js","ace/mode/css_worker","Worker");return b.attachToDocument(a.getDocument()),b.on("csslint",function(b){var c=[];b.data.forEach(function(a){c.push({row:a.line-1,column:a.col-1,text:a.message,type:a.type,lint:a})}),a.setAnnotations(c)}),b}}.call(k.prototype),b.Mode=k}),define("ace/mode/css_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/lang"),f=a("./text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap("animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index".split("|")),b=e.arrayToMap("rgb|rgba|url|attr|counter|counters".split("|")),c=e.arrayToMap("absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|font-size|font|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|top|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero".split("|")),d=e.arrayToMap("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow".split("|")),f=e.arrayToMap("arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace".split("|")),g="\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))",h="(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",i="(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",j=[{token:"comment",merge:!0,regex:"\\/\\*",next:"ruleset_comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:["constant.numeric","keyword"],regex:"("+g+")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"},{token:["constant.numeric"],regex:"([0-9]+)"},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:["punctuation","entity.other.attribute-name.pseudo-element.css"],regex:h},{token:["punctuation","entity.other.attribute-name.pseudo-class.css"],regex:i},{token:function(e){return a.hasOwnProperty(e.toLowerCase())?"support.type":b.hasOwnProperty(e.toLowerCase())?"support.function":c.hasOwnProperty(e.toLowerCase())?"support.constant":d.hasOwnProperty(e.toLowerCase())?"support.constant.color":f.hasOwnProperty(e.toLowerCase())?"support.constant.fonts":"text"},regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"}],k=e.copyArray(j);k.unshift({token:"paren.rparen",regex:"\\}",next:"start"});var l=e.copyArray(j);l.unshift({token:"paren.rparen",regex:"\\}",next:"media"});var m=[{token:"comment",merge:!0,regex:".+"}],n=e.copyArray(m);n.unshift({token:"comment",regex:".*?\\*\\/",next:"start"});var o=e.copyArray(m);o.unshift({token:"comment",regex:".*?\\*\\/",next:"media"});var p=e.copyArray(m);p.unshift({token:"comment",regex:".*?\\*\\/",next:"ruleset"}),this.$rules={start:[{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"paren.lparen",regex:"\\{",next:"ruleset"},{token:"string",regex:"@.*?{",next:"media"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant",regex:"[a-z0-9-_]+"}],media:[{token:"comment",merge:!0,regex:"\\/\\*",next:"media_comment"},{token:"paren.lparen",regex:"\\{",next:"media_ruleset"},{token:"string",regex:"\\}",next:"start"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant",regex:"[a-z0-9-_]+"}],comment:n,ruleset:k,ruleset_comment:p,media_ruleset:l,media_comment:o}};d.inherits(g,f),b.CssHighlightRules=g}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}}).call(e.prototype),b.MatchingBraceOutdent=e}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(){};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c){var d=a.getLine(c),f=d.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length);return h.end.column-=2,h}if(b!=="markbeginend")return;var f=d.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;if(f[2]){var h=a.getCommentFoldRange(c,g);return h.end.column-=2,h}var i={row:c,column:g},j=a.$findOpeningBracket(f[1],i);if(!j)return;return j.column++,i.column--,e.fromPoints(j,i)}}}.call(g.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){var d=a("../../range").Range,e=b.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);return this.foldingStartMarker.test(d)?"start":b=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(d)?"end":""},this.getFoldWidgetRange=function(a,b,c){return null},this.indentationBlock=function(a,b,c){var e=/^\s*/,f=b,g=b,h=a.getLine(b),i=c||h.length,j=h.match(e)[0].length,k=a.getLength();while(++b<k){h=a.getLine(b);var l=h.match(e)[0].length;if(l==h.length)continue;if(l<=j)break;g=b}if(g>f){var m=a.getLine(g).length;return new d(f,i,g,m)}},this.openingBracketBlock=function(a,b,c,e,f,g){var h={row:c,column:e+1},i=a.$findClosingBracket(b,h,f,g);if(!i)return;var j=a.foldWidgets[i.row];return j==null&&(j=this.getFoldWidget(a,i.row)),j=="start"&&(i.row--,i.column=a.getLine(i.row).length),d.fromPoints(h,i)}}).call(e.prototype)})
;
define("ace/mode/scss",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/scss_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./scss_highlight_rules").ScssHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("./folding/cstyle").FoldMode,j=function(){this.$tokenizer=new f((new g).getRules(),"i"),this.$outdent=new h,this.foldingRules=new i};d.inherits(j,e),function(){this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a).tokens;if(e.length&&e[e.length-1].type=="comment")return d;var f=b.match(/^.*\{\s*$/);return f&&(d+=c),d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)}}.call(j.prototype),b.Mode=j}),define("ace/mode/scss_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/lang"),f=a("./text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap(function(){var a="-webkit-|-moz-|-o-|-ms-|-svg-|-pie-|-khtml-".split("|"),b="appearance|background-clip|background-inline-policy|background-origin|background-size|binding|border-bottom-colors|border-left-colors|border-right-colors|border-top-colors|border-end|border-end-color|border-end-style|border-end-width|border-image|border-start|border-start-color|border-start-style|border-start-width|box-align|box-direction|box-flex|box-flexgroup|box-ordinal-group|box-orient|box-pack|box-sizing|column-count|column-gap|column-width|column-rule|column-rule-width|column-rule-style|column-rule-color|float-edge|font-feature-settings|font-language-override|force-broken-image-icon|image-region|margin-end|margin-start|opacity|outline|outline-color|outline-offset|outline-radius|outline-radius-bottomleft|outline-radius-bottomright|outline-radius-topleft|outline-radius-topright|outline-style|outline-width|padding-end|padding-start|stack-sizing|tab-size|text-blink|text-decoration-color|text-decoration-line|text-decoration-style|transform|transform-origin|transition|transition-delay|transition-duration|transition-property|transition-timing-function|user-focus|user-input|user-modify|user-select|window-shadow|border-radius".split("|"),c="azimuth|background-attachment|background-color|background-image|background-position|background-repeat|background|border-bottom-color|border-bottom-style|border-bottom-width|border-bottom|border-collapse|border-color|border-left-color|border-left-style|border-left-width|border-left|border-right-color|border-right-style|border-right-width|border-right|border-spacing|border-style|border-top-color|border-top-style|border-top-width|border-top|border-width|border|bottom|box-sizing|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue-after|cue-before|cue|cursor|direction|display|elevation|empty-cells|float|font-family|font-size-adjust|font-size|font-stretch|font-style|font-variant|font-weight|font|height|left|letter-spacing|line-height|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|marker-offset|margin|marks|max-height|max-width|min-height|min-width|opacity|orphans|outline-color|outline-style|outline-width|outline|overflow|overflow-x|overflow-y|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page|pause-after|pause-before|pause|pitch-range|pitch|play-during|position|quotes|richness|right|size|speak-header|speak-numeral|speak-punctuation|speech-rate|speak|stress|table-layout|text-align|text-decoration|text-indent|text-shadow|text-transform|top|unicode-bidi|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-spacing|z-index".split("|"),d=[];for(var e=0,f=a.length;e<f;e++)Array.prototype.push.apply(d,(a[e]+b.join("|"+a[e])).split("|"));return Array.prototype.push.apply(d,b),Array.prototype.push.apply(d,c),d}()),b=e.arrayToMap("hsl|hsla|rgb|rgba|url|attr|counter|counters|abs|adjust_color|adjust_hue|alpha|join|blue|ceil|change_color|comparable|complement|darken|desaturate|floor|grayscale|green|hue|if|invert|join|length|lighten|lightness|mix|nth|opacify|opacity|percentage|quote|red|round|saturate|saturation|scale_color|transparentize|type_of|unit|unitless|unqoute".split("|")),c=e.arrayToMap("absolute|all-scroll|always|armenian|auto|baseline|below|bidi-override|block|bold|bolder|border-box|both|bottom|break-all|break-word|capitalize|center|char|circle|cjk-ideographic|col-resize|collapse|content-box|crosshair|dashed|decimal-leading-zero|decimal|default|disabled|disc|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ellipsis|fixed|georgian|groove|hand|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|inactive|inherit|inline-block|inline|inset|inside|inter-ideograph|inter-word|italic|justify|katakana-iroha|katakana|keep-all|left|lighter|line-edge|line-through|line|list-item|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|medium|middle|move|n-resize|ne-resize|newspaper|no-drop|no-repeat|nw-resize|none|normal|not-allowed|nowrap|oblique|outset|outside|overline|pointer|progress|relative|repeat-x|repeat-y|repeat|right|ridge|row-resize|rtl|s-resize|scroll|se-resize|separate|small-caps|solid|square|static|strict|super|sw-resize|table-footer-group|table-header-group|tb-rl|text-bottom|text-top|text|thick|thin|top|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|zero".split("|")),d=e.arrayToMap("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow".split("|")),f=e.arrayToMap("@mixin|@extend|@include|@import|@media|@debug|@warn|@if|@for|@each|@while|@else|@font-face|@-webkit-keyframes|if|and|!default|module|def|end|declare".split("|")),g=e.arrayToMap("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp".split("|")),h="\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:!0,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:!0,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:h+"(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)"},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:"constant.numeric",regex:h},{token:function(e){return a.hasOwnProperty(e.toLowerCase())?"support.type":f.hasOwnProperty(e)?"keyword":c.hasOwnProperty(e)?"constant.language":b.hasOwnProperty(e)?"support.function":d.hasOwnProperty(e.toLowerCase())?"support.constant.color":g.hasOwnProperty(e.toLowerCase())?"variable.language":"text"},regex:"\\-?[@a-z_][@a-z0-9_\\-]*"},{token:"variable",regex:"[a-z_\\-$][a-z0-9_\\-$]*\\b"},{token:"variable.language",regex:"#[a-z0-9-_]+"},{token:"variable.language",regex:"\\.[a-z0-9-_]+"},{token:"variable.language",regex:":[a-z0-9-_]+"},{token:"constant",regex:"[a-z0-9-_]+"},{token:"keyword.operator",regex:"<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:!0,regex:".+"}]}};d.inherits(g,f),b.ScssHighlightRules=g}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}}).call(e.prototype),b.MatchingBraceOutdent=e}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(){};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c){var d=a.getLine(c),f=d.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length);return h.end.column-=2,h}if(b!=="markbeginend")return;var f=d.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;if(f[2]){var h=a.getCommentFoldRange(c,g);return h.end.column-=2,h}var i={row:c,column:g},j=a.$findOpeningBracket(f[1],i);if(!j)return;return j.column++,i.column--,e.fromPoints(j,i)}}}.call(g.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){var d=a("../../range").Range,e=b.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);return this.foldingStartMarker.test(d)?"start":b=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(d)?"end":""},this.getFoldWidgetRange=function(a,b,c){return null},this.indentationBlock=function(a,b,c){var e=/^\s*/,f=b,g=b,h=a.getLine(b),i=c||h.length,j=h.match(e)[0].length,k=a.getLength();while(++b<k){h=a.getLine(b);var l=h.match(e)[0].length;if(l==h.length)continue;if(l<=j)break;g=b}if(g>f){var m=a.getLine(g).length;return new d(f,i,g,m)}},this.openingBracketBlock=function(a,b,c,e,f,g){var h={row:c,column:e+1},i=a.$findClosingBracket(b,h,f,g);if(!i)return;var j=a.foldWidgets[i.row];return j==null&&(j=this.getFoldWidget(a,i.row)),j=="start"&&(i.row--,i.column=a.getLine(i.row).length),d.fromPoints(h,i)}}).call(e.prototype)})
;
define("ace/mode/textile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/textile_highlight_rules","ace/mode/matching_brace_outdent"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./textile_highlight_rules").TextileHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h};d.inherits(i,e),function(){this.getNextLineIndent=function(a,b,c){return a=="intag"?c:""},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)}}.call(i.prototype),b.Mode=i}),define("ace/mode/textile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:function(a){return a.match(/^h\d$/)?"markup.heading."+a.charAt(1):"markup.heading"},regex:"h1|h2|h3|h4|h5|h6|bq|p|bc|pre",next:"blocktag"},{token:"keyword",regex:"[\\*]+|[#]+"},{token:"text",regex:".+"}],blocktag:[{token:"keyword",regex:"\\. ",next:"start"},{token:"keyword",regex:"\\(",next:"blocktagproperties"}],blocktagproperties:[{token:"keyword",regex:"\\)",next:"blocktag"},{token:"string",regex:"[a-zA-Z0-9\\-_]+"},{token:"keyword",regex:"#"}]}};d.inherits(f,e),b.TextileHighlightRules=f}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}}).call(e.prototype),b.MatchingBraceOutdent=e})
;
function initBaseUrls(a){require.tlns=a}function initSender(){var a=require(null,"ace/lib/event_emitter").EventEmitter,b=require(null,"ace/lib/oop"),c=function(){};return function(){b.implement(this,a),this.callback=function(a,b){postMessage({type:"call",id:b,data:a})},this.emit=function(a,b){postMessage({type:"event",name:a,data:b})}}.call(c.prototype),new c}"no use strict";var console={log:function(a){postMessage({type:"log",data:a})}},window={console:console},normalizeModule=function(a,b){if(b.indexOf("!")!==-1){var c=b.split("!");return normalizeModule(a,c[0])+"!"+normalizeModule(a,c[1])}if(b.charAt(0)=="."){var d=a.split("/").slice(0,-1).join("/"),b=d+"/"+b;while(b.indexOf(".")!==-1&&e!=b)var e=b,b=b.replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}return b},require=function(a,b){var b=normalizeModule(a,b),c=require.modules[b];if(c)return c.initialized||(c.exports=c.factory().exports,c.initialized=!0),c.exports;var d=b.split("/");d[0]=require.tlns[d[0]]||d[0];var e=d.join("/")+".js";return require.id=b,importScripts(e),require(a,b)};require.modules={},require.tlns={};var define=function(a,b,c){arguments.length==2?c=b:arguments.length==1&&(c=a,a=require.id);if(a.indexOf("text!")===0)return;var d=function(b,c){return require(a,b,c)};require.modules[a]={factory:function(){var a={exports:{}},b=c(d,a.exports,a);return b&&(a.exports=b),a}}},main,sender;onmessage=function(a){var b=a.data;if(b.command)main[b.command].apply(main,b.args);else if(b.init){initBaseUrls(b.tlns),require(null,"ace/lib/fixoldbrowsers"),sender=initSender();var c=require(null,b.module)[b.classname];main=new c(sender)}else b.event&&sender&&sender._emit(b.event,b.data)},define("ace/lib/fixoldbrowsers",["require","exports","module","ace/lib/regexp","ace/lib/es5-shim"],function(a,b,c){a("./regexp"),a("./es5-shim")}),define("ace/lib/regexp",["require","exports","module"],function(a,b,c){function g(a){return(a.global?"g":"")+(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.extended?"x":"")+(a.sticky?"y":"")}function h(a,b,c){if(Array.prototype.indexOf)return a.indexOf(b,c);for(var d=c||0;d<a.length;d++)if(a[d]===b)return d;return-1}var d={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},e=d.exec.call(/()??/,"")[1]===undefined,f=function(){var a=/^/g;return d.test.call(a,""),!a.lastIndex}();if(f&&e)return;RegExp.prototype.exec=function(a){var b=d.exec.apply(this,arguments),c,i;if(typeof a=="string"&&b){!e&&b.length>1&&h(b,"")>-1&&(i=RegExp(this.source,d.replace.call(g(this),"g","")),d.replace.call(a.slice(b.index),i,function(){for(var a=1;a<arguments.length-2;a++)arguments[a]===undefined&&(b[a]=undefined)}));if(this._xregexp&&this._xregexp.captureNames)for(var j=1;j<b.length;j++)c=this._xregexp.captureNames[j-1],c&&(b[c]=b[j]);!f&&this.global&&!b[0].length&&this.lastIndex>b.index&&this.lastIndex--}return b},f||(RegExp.prototype.test=function(a){var b=d.exec.call(this,a);return b&&this.global&&!b[0].length&&this.lastIndex>b.index&&this.lastIndex--,!!b})}),define("ace/lib/es5-shim",["require","exports","module"],function(a,b,c){function p(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(b){}}Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=g.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,h=c.apply(f,d.concat(g.call(arguments)));return h!==null&&Object(h)===h?h:f}return c.apply(b,d.concat(g.call(arguments)))};return e});var d=Function.prototype.call,e=Array.prototype,f=Object.prototype,g=e.slice,h=d.bind(f.toString),i=d.bind(f.hasOwnProperty),j,k,l,m,n;if(n=i(f,"__defineGetter__"))j=d.bind(f.__defineGetter__),k=d.bind(f.__defineSetter__),l=d.bind(f.__lookupGetter__),m=d.bind(f.__lookupSetter__);Array.isArray||(Array.isArray=function(b){return h(b)=="[object Array]"}),Array.prototype.forEach||(Array.prototype.forEach=function(b){var c=G(this),d=arguments[1],e=0,f=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;while(e<f)e in c&&b.call(d,c[e],e,c),e++}),Array.prototype.map||(Array.prototype.map=function(b){var c=G(this),d=c.length>>>0,e=Array(d),f=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var g=0;g<d;g++)g in c&&(e[g]=b.call(f,c[g],g,c));return e}),Array.prototype.filter||(Array.prototype.filter=function(b){var c=G(this),d=c.length>>>0,e=[],f=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var g=0;g<d;g++)g in c&&b.call(f,c[g],g,c)&&e.push(c[g]);return e}),Array.prototype.every||(Array.prototype.every=function(b){var c=G(this),d=c.length>>>0,e=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var f=0;f<d;f++)if(f in c&&!b.call(e,c[f],f,c))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(b){var c=G(this),d=c.length>>>0,e=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var f=0;f<d;f++)if(f in c&&b.call(e,c[f],f,c))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(b){var c=G(this),d=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;if(!d&&arguments.length==1)throw new TypeError;var e=0,f;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);for(;e<d;e++)e in c&&(f=b.call(void 0,f,c[e],e,c));return f}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(b){var c=G(this),d=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;if(!d&&arguments.length==1)throw new TypeError;var e,f=d-1;if(arguments.length>=2)e=arguments[1];else do{if(f in c){e=c[f--];break}if(--f<0)throw new TypeError}while(!0);do f in this&&(e=b.call(void 0,e,c[f],f,c));while(f--);return e}),Array.prototype.indexOf||(Array.prototype.indexOf=function(b){var c=G(this),d=c.length>>>0;if(!d)return-1;var e=0;arguments.length>1&&(e=E(arguments[1])),e=e>=0?e:Math.max(0,d+e);for(;e<d;e++)if(e in c&&c[e]===b)return e;return-1}),Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(b){var c=G(this),d=c.length>>>0;if(!d)return-1;var e=d-1;arguments.length>1&&(e=Math.min(e,E(arguments[1]))),e=e>=0?e:d-Math.abs(e);for(;e>=0;e--)if(e in c&&b===c[e])return e;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(b){return b.__proto__||(b.constructor?b.constructor.prototype:f)});if(!Object.getOwnPropertyDescriptor){var o="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(b,c){if(typeof b!="object"&&typeof b!="function"||b===null)throw new TypeError(o+b);if(!i(b,c))return;var d,e,g;d={enumerable:!0,configurable:!0};if(n){var h=b.__proto__;b.__proto__=f;var e=l(b,c),g=m(b,c);b.__proto__=h;if(e||g)return e&&(d.get=e),g&&(d.set=g),d}return d.value=b[c],d}}Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(b){return Object.keys(b)}),Object.create||(Object.create=function(b,c){var d;if(b===null)d={__proto__:null};else{if(typeof b!="object")throw new TypeError("typeof prototype["+typeof b+"] != 'object'");var e=function(){};e.prototype=b,d=new e,d.__proto__=b}return c!==void 0&&Object.defineProperties(d,c),d});if(Object.defineProperty){var q=p({}),r=typeof document=="undefined"||p(document.createElement("div"));if(!q||!r)var s=Object.defineProperty}if(!Object.defineProperty||s){var t="Property description must be an object: ",u="Object.defineProperty called on non-object: ",v="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(b,c,d){if(typeof b!="object"&&typeof b!="function"||b===null)throw new TypeError(u+b);if(typeof d!="object"&&typeof d!="function"||d===null)throw new TypeError(t+d);if(s)try{return s.call(Object,b,c,d)}catch(e){}if(i(d,"value"))if(n&&(l(b,c)||m(b,c))){var g=b.__proto__;b.__proto__=f,delete b[c],b[c]=d.value,b.__proto__=g}else b[c]=d.value;else{if(!n)throw new TypeError(v);i(d,"get")&&j(b,c,d.get),i(d,"set")&&k(b,c,d.set)}return b}}Object.defineProperties||(Object.defineProperties=function(b,c){for(var d in c)i(c,d)&&Object.defineProperty(b,d,c[d]);return b}),Object.seal||(Object.seal=function(b){return b}),Object.freeze||(Object.freeze=function(b){return b});try{Object.freeze(function(){})}catch(w){Object.freeze=function(b){return function(c){return typeof c=="function"?c:b(c)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(b){return b}),Object.isSealed||(Object.isSealed=function(b){return!1}),Object.isFrozen||(Object.isFrozen=function(b){return!1}),Object.isExtensible||(Object.isExtensible=function(b){if(Object(b)===b)throw new TypeError;var c="";while(i(b,c))c+="?";b[c]=!0;var d=i(b,c);return delete b[c],d});if(!Object.keys){var x=!0,y=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],z=y.length;for(var A in{toString:null})x=!1;Object.keys=function H(a){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.keys called on a non-object");var H=[];for(var b in a)i(a,b)&&H.push(b);if(x)for(var c=0,d=z;c<d;c++){var e=y[c];i(a,e)&&H.push(e)}return H}}if(!Date.prototype.toISOString||(new Date(-621987552e5)).toISOString().indexOf("-000001")===-1)Date.prototype.toISOString=function(){var b,c,d,e;if(!isFinite(this))throw new RangeError;b=[this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],e=this.getUTCFullYear(),e=(e<0?"-":e>9999?"+":"")+("00000"+Math.abs(e)).slice(0<=e&&e<=9999?-4:-6),c=b.length;while(c--)d=b[c],d<10&&(b[c]="0"+d);return e+"-"+b.slice(0,2).join("-")+"T"+b.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"};Date.now||(Date.now=function(){return(new Date).getTime()}),Date.prototype.toJSON||(Date.prototype.toJSON=function(b){if(typeof this.toISOString!="function")throw new TypeError;return this.toISOString()}),Date.parse("+275760-09-13T00:00:00.000Z")!==864e13&&(Date=function(a){var b=function e(b,c,d,f,g,h,i){var j=arguments.length;if(this instanceof a){var k=j==1&&String(b)===b?new a(e.parse(b)):j>=7?new a(b,c,d,f,g,h,i):j>=6?new a(b,c,d,f,g,h):j>=5?new a(b,c,d,f,g):j>=4?new a(b,c,d,f):j>=3?new a(b,c,d):j>=2?new a(b,c):j>=1?new a(b):new a;return k.constructor=e,k}return a.apply(this,arguments)},c=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");for(var d in a)b[d]=a[d];return b.now=a.now,b.UTC=a.UTC,b.prototype=a.prototype,b.prototype.constructor=b,b.parse=function(d){var e=c.exec(d);if(e){e.shift();for(var f=1;f<7;f++)e[f]=+(e[f]||(f<3?1:0)),f==1&&e[f]--;var g=+e.pop(),h=+e.pop(),i=e.pop(),j=0;if(i){if(h>23||g>59)return NaN;j=(h*60+g)*6e4*(i=="+"?-1:1)}var k=+e[0];return 0<=k&&k<=99?(e[0]=k+400,a.UTC.apply(this,e)+j-126227808e5):a.UTC.apply(this,e)+j}return a.parse.apply(this,arguments)},b}(Date));var B="	\n\f\r   ᠎             　\u2028\u2029﻿";if(!String.prototype.trim||B.trim()){B="["+B+"]";var C=new RegExp("^"+B+B+"*"),D=new RegExp(B+B+"*$");String.prototype.trim=function(){return String(this).replace(C,"").replace(D,"")}}var E=function(a){return a=+a,a!==a?a=0:a!==0&&a!==1/0&&a!==-Infinity&&(a=(a>0||-1)*Math.floor(Math.abs(a))),a},F="a"[0]!="a",G=function(a){if(a==null)throw new TypeError;return F&&typeof a=="string"&&a?a.split(""):Object(a)}}),define("ace/lib/event_emitter",["require","exports","module"],function(a,b,c){var d={};d._emit=d._dispatchEvent=function(a,b){this._eventRegistry=this._eventRegistry||{},this._defaultHandlers=this._defaultHandlers||{};var c=this._eventRegistry[a]||[],d=this._defaultHandlers[a];if(!c.length&&!d)return;b=b||{},b.type=a,b.stopPropagation||(b.stopPropagation=function(){this.propagationStopped=!0}),b.preventDefault||(b.preventDefault=function(){this.defaultPrevented=!0});for(var e=0;e<c.length;e++){c[e](b);if(b.propagationStopped)break}if(d&&!b.defaultPrevented)return d(b)},d.setDefaultHandler=function(a,b){this._defaultHandlers=this._defaultHandlers||{};if(this._defaultHandlers[a])throw new Error("The default handler for '"+a+"' is already set");this._defaultHandlers[a]=b},d.on=d.addEventListener=function(a,b){this._eventRegistry=this._eventRegistry||{};var c=this._eventRegistry[a];if(!c)var c=this._eventRegistry[a]=[];c.indexOf(b)==-1&&c.push(b)},d.removeListener=d.removeEventListener=function(a,b){this._eventRegistry=this._eventRegistry||{};var c=this._eventRegistry[a];if(!c)return;var d=c.indexOf(b);d!==-1&&c.splice(d,1)},d.removeAllListeners=function(a){this._eventRegistry&&(this._eventRegistry[a]=[])},b.EventEmitter=d}),define("ace/lib/oop",["require","exports","module"],function(a,b,c){b.inherits=function(){var a=function(){};return function(b,c){a.prototype=c.prototype,b.super_=c.prototype,b.prototype=new a,b.prototype.constructor=b}}(),b.mixin=function(a,b){for(var c in b)a[c]=b[c]},b.implement=function(a,c){b.mixin(a,c)}}),define("ace/mode/css_worker",["require","exports","module","ace/lib/oop","ace/worker/mirror","ace/mode/css/csslint"],function(a,b,c){var d=a("../lib/oop"),e=a("../worker/mirror").Mirror,f=a("./css/csslint").CSSLint,g=b.Worker=function(a){e.call(this,a),this.setTimeout(200)};d.inherits(g,e),function(){this.onUpdate=function(){var a=this.doc.getValue(),b=f.verify(a);this.sender.emit("csslint",b.messages.map(function(a){return delete a.rule,a}))}}.call(g.prototype)}),define("ace/worker/mirror",["require","exports","module","ace/document","ace/lib/lang"],function(a,b,c){var d=a("../document").Document,e=a("../lib/lang"),f=b.Mirror=function(a){this.sender=a;var b=this.doc=new d(""),c=this.deferredUpdate=e.deferredCall(this.onUpdate.bind(this)),f=this;a.on("change",function(a){b.applyDeltas([a.data]),c.schedule(f.$timeout)})};(function(){this.$timeout=500,this.setTimeout=function(a){this.$timeout=a},this.setValue=function(a){this.doc.setValue(a),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(a){this.sender.callback(this.doc.getValue(),a)},this.onUpdate=function(){}}).call(f.prototype)}),define("ace/document",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/range","ace/anchor"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=a("./range").Range,g=a("./anchor").Anchor,h=function(a){this.$lines=[],a.length==0?this.$lines=[""]:Array.isArray(a)?this.insertLines(0,a):this.insert({row:0,column:0},a)};(function(){d.implement(this,e),this.setValue=function(a){var b=this.getLength();this.remove(new f(0,0,b,this.getLine(b-1).length)),this.insert({row:0,column:0},a)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(a,b){return new g(this,a,b)},"aaa".split(/a/).length==0?this.$split=function(a){return a.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(a){return a.split(/\r\n|\r|\n/)},this.$detectNewLine=function(a){var b=a.match(/^.*?(\r\n|\r|\n)/m);b?this.$autoNewLine=b[1]:this.$autoNewLine="\n"},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";case"auto":return this.$autoNewLine}},this.$autoNewLine="\n",this.$newLineMode="auto",this.setNewLineMode=function(a){if(this.$newLineMode===a)return;this.$newLineMode=a},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(a){return a=="\r\n"||a=="\r"||a=="\n"},this.getLine=function(a){return this.$lines[a]||""},this.getLines=function(a,b){return this.$lines.slice(a,b+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(a){if(a.start.row==a.end.row)return this.$lines[a.start.row].substring(a.start.column,a.end.column);var b=this.getLines(a.start.row+1,a.end.row-1);return b.unshift((this.$lines[a.start.row]||"").substring(a.start.column)),b.push((this.$lines[a.end.row]||"").substring(0,a.end.column)),b.join(this.getNewLineCharacter())},this.$clipPosition=function(a){var b=this.getLength();return a.row>=b&&(a.row=Math.max(0,b-1),a.column=this.getLine(b-1).length),a},this.insert=function(a,b){if(!b||b.length===0)return a;a=this.$clipPosition(a),this.getLength()<=1&&this.$detectNewLine(b);var c=this.$split(b),d=c.splice(0,1)[0],e=c.length==0?null:c.splice(c.length-1,1)[0];return a=this.insertInLine(a,d),e!==null&&(a=this.insertNewLine(a),a=this.insertLines(a.row,c),a=this.insertInLine(a,e||"")),a},this.insertLines=function(a,b){if(b.length==0)return{row:a,column:0};if(b.length>65535){var c=this.insertLines(a,b.slice(65535));b=b.slice(0,65535)}var d=[a,0];d.push.apply(d,b),this.$lines.splice.apply(this.$lines,d);var e=new f(a,0,a+b.length,0),g={action:"insertLines",range:e,lines:b};return this._emit("change",{data:g}),c||e.end},this.insertNewLine=function(a){a=this.$clipPosition(a);var b=this.$lines[a.row]||"";this.$lines[a.row]=b.substring(0,a.column),this.$lines.splice(a.row+1,0,b.substring(a.column,b.length));var c={row:a.row+1,column:0},d={action:"insertText",range:f.fromPoints(a,c),text:this.getNewLineCharacter()};return this._emit("change",{data:d}),c},this.insertInLine=function(a,b){if(b.length==0)return a;var c=this.$lines[a.row]||"";this.$lines[a.row]=c.substring(0,a.column)+b+c.substring(a.column);var d={row:a.row,column:a.column+b.length},e={action:"insertText",range:f.fromPoints(a,d),text:b};return this._emit("change",{data:e}),d},this.remove=function(a){a.start=this.$clipPosition(a.start),a.end=this.$clipPosition(a.end);if(a.isEmpty())return a.start;var b=a.start.row,c=a.end.row;if(a.isMultiLine()){var d=a.start.column==0?b:b+1,e=c-1;a.end.column>0&&this.removeInLine(c,0,a.end.column),e>=d&&this.removeLines(d,e),d!=b&&(this.removeInLine(b,a.start.column,this.getLine(b).length),this.removeNewLine(a.start.row))}else this.removeInLine(b,a.start.column,a.end.column);return a.start},this.removeInLine=function(a,b,c){if(b==c)return;var d=new f(a,b,a,c),e=this.getLine(a),g=e.substring(b,c),h=e.substring(0,b)+e.substring(c,e.length);this.$lines.splice(a,1,h);var i={action:"removeText",range:d,text:g};return this._emit("change",{data:i}),d.start},this.removeLines=function(a,b){var c=new f(a,0,b+1,0),d=this.$lines.splice(a,b-a+1),e={action:"removeLines",range:c,nl:this.getNewLineCharacter(),lines:d};return this._emit("change",{data:e}),d},this.removeNewLine=function(a){var b=this.getLine(a),c=this.getLine(a+1),d=new f(a,b.length,a+1,0),e=b+c;this.$lines.splice(a,2,e);var g={action:"removeText",range:d,text:this.getNewLineCharacter()};this._emit("change",{data:g})},this.replace=function(a,b){if(b.length==0&&a.isEmpty())return a.start;if(b==this.getTextRange(a))return a.end;this.remove(a);if(b)var c=this.insert(a.start,b);else c=a.start;return c},this.applyDeltas=function(a){for(var b=0;b<a.length;b++){var c=a[b],d=f.fromPoints(c.range.start,c.range.end);c.action=="insertLines"?this.insertLines(d.start.row,c.lines):c.action=="insertText"?this.insert(d.start,c.text):c.action=="removeLines"?this.removeLines(d.start.row,d.end.row-1):c.action=="removeText"&&this.remove(d)}},this.revertDeltas=function(a){for(var b=a.length-1;b>=0;b--){var c=a[b],d=f.fromPoints(c.range.start,c.range.end);c.action=="insertLines"?this.removeLines(d.start.row,d.end.row-1):c.action=="insertText"?this.remove(d):c.action=="removeLines"?this.insertLines(d.start.row,c.lines):c.action=="removeText"&&this.insert(d.start,c.text)}}}).call(h.prototype),b.Document=h}),define("ace/range",["require","exports","module"],function(a,b,c){var d=function(a,b,c,d){this.start={row:a,column:b},this.end={row:c,column:d}};(function(){this.isEqual=function(a){return this.start.row==a.start.row&&this.end.row==a.end.row&&this.start.column==a.start.column&&this.end.column==a.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(a,b){return this.compare(a,b)==0},this.compareRange=function(a){var b,c=a.end,d=a.start;return b=this.compare(c.row,c.column),b==1?(b=this.compare(d.row,d.column),b==1?2:b==0?1:0):b==-1?-2:(b=this.compare(d.row,d.column),b==-1?-1:b==1?42:0)},this.comparePoint=function(a){return this.compare(a.row,a.column)},this.containsRange=function(a){return this.comparePoint(a.start)==0&&this.comparePoint(a.end)==0},this.intersects=function(a){var b=this.compareRange(a);return b==-1||b==0||b==1},this.isEnd=function(a,b){return this.end.row==a&&this.end.column==b},this.isStart=function(a,b){return this.start.row==a&&this.start.column==b},this.setStart=function(a,b){typeof a=="object"?(this.start.column=a.column,this.start.row=a.row):(this.start.row=a,this.start.column=b)},this.setEnd=function(a,b){typeof a=="object"?(this.end.column=a.column,this.end.row=a.row):(this.end.row=a,this.end.column=b)},this.inside=function(a,b){return this.compare(a,b)==0?this.isEnd(a,b)||this.isStart(a,b)?!1:!0:!1},this.insideStart=function(a,b){return this.compare(a,b)==0?this.isEnd(a,b)?!1:!0:!1},this.insideEnd=function(a,b){return this.compare(a,b)==0?this.isStart(a,b)?!1:!0:!1},this.compare=function(a,b){return!this.isMultiLine()&&a===this.start.row?b<this.start.column?-1:b>this.end.column?1:0:a<this.start.row?-1:a>this.end.row?1:this.start.row===a?b>=this.start.column?0:-1:this.end.row===a?b<=this.end.column?0:1:0},this.compareStart=function(a,b){return this.start.row==a&&this.start.column==b?-1:this.compare(a,b)},this.compareEnd=function(a,b){return this.end.row==a&&this.end.column==b?1:this.compare(a,b)},this.compareInside=function(a,b){return this.end.row==a&&this.end.column==b?1:this.start.row==a&&this.start.column==b?-1:this.compare(a,b)},this.clipRows=function(a,b){if(this.end.row>b)var c={row:b+1,column:0};if(this.start.row>b)var e={row:b+1,column:0};if(this.start.row<a)var e={row:a,column:0};if(this.end.row<a)var c={row:a,column:0};return d.fromPoints(e||this.start,c||this.end)},this.extend=function(a,b){var c=this.compare(a,b);if(c==0)return this;if(c==-1)var e={row:a,column:b};else var f={row:a,column:b};return d.fromPoints(e||this.start,f||this.end)},this.isEmpty=function(){return this.start.row==this.end.row&&this.start.column==this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return d.fromPoints(this.start,this.end)},this.collapseRows=function(){return this.end.column==0?new d(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new d(this.start.row,0,this.end.row,0)},this.toScreenRange=function(a){var b=a.documentToScreenPosition(this.start),c=a.documentToScreenPosition(this.end);return new d(b.row,b.column,c.row,c.column)}}).call(d.prototype),d.fromPoints=function(a,b){return new d(a.row,a.column,b.row,b.column)},b.Range=d}),define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=b.Anchor=function(a,b,c){this.document=a,typeof c=="undefined"?this.setPosition(b.row,b.column):this.setPosition(b,c),this.$onChange=this.onChange.bind(this),a.on("change",this.$onChange)};(function(){d.implement(this,e),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.onChange=function(a){var b=a.data,c=b.range;if(c.start.row==c.end.row&&c.start.row!=this.row)return;if(c.start.row>this.row)return;if(c.start.row==this.row&&c.start.column>this.column)return;var d=this.row,e=this.column;b.action==="insertText"?c.start.row===d&&c.start.column<=e?c.start.row===c.end.row?e+=c.end.column-c.start.column:(e-=c.start.column,d+=c.end.row-c.start.row):c.start.row!==c.end.row&&c.start.row<d&&(d+=c.end.row-c.start.row):b.action==="insertLines"?c.start.row<=d&&(d+=c.end.row-c.start.row):b.action=="removeText"?c.start.row==d&&c.start.column<e?c.end.column>=e?e=c.start.column:e=Math.max(0,e-(c.end.column-c.start.column)):c.start.row!==c.end.row&&c.start.row<d?(c.end.row==d&&(e=Math.max(0,e-c.end.column)+c.start.column),d-=c.end.row-c.start.row):c.end.row==d&&(d-=c.end.row-c.start.row,e=Math.max(0,e-c.end.column)+c.start.column):b.action=="removeLines"&&c.start.row<=d&&(c.end.row<=d?d-=c.end.row-c.start.row:(d=c.start.row,e=0)),this.setPosition(d,e,!0)},this.setPosition=function(a,b,c){var d;c?d={row:a,column:b}:d=this.$clipPositionToDocument(a,b);if(this.row==d.row&&this.column==d.column)return;var e={row:this.row,column:this.column};this.row=d.row,this.column=d.column,this._emit("change",{old:e,value:d})},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.$clipPositionToDocument=function(a,b){var c={};return a>=this.document.getLength()?(c.row=Math.max(0,this.document.getLength()-1),c.column=this.document.getLine(c.row).length):a<0?(c.row=0,c.column=0):(c.row=a,c.column=Math.min(this.document.getLine(c.row).length,Math.max(0,b))),b<0&&(c.column=0),c}}).call(f.prototype)}),define("ace/lib/lang",["require","exports","module"],function(a,b,c){b.stringReverse=function(a){return a.split("").reverse().join("")},b.stringRepeat=function(a,b){return(new Array(b+1)).join(a)};var d=/^\s\s*/,e=/\s\s*$/;b.stringTrimLeft=function(a){return a.replace(d,"")},b.stringTrimRight=function(a){return a.replace(e,"")},b.copyObject=function(a){var b={};for(var c in a)b[c]=a[c];return b},b.copyArray=function(a){var b=[];for(var c=0,d=a.length;c<d;c++)a[c]&&typeof a[c]=="object"?b[c]=this.copyObject(a[c]):b[c]=a[c];return b},b.deepCopy=function(a){if(typeof a!="object")return a;var b=a.constructor();for(var c in a)typeof a[c]=="object"?b[c]=this.deepCopy(a[c]):b[c]=a[c];return b},b.arrayToMap=function(a){var b={};for(var c=0;c<a.length;c++)b[a[c]]=1;return b},b.arrayRemove=function(a,b){for(var c=0;c<=a.length;c++)b===a[c]&&a.splice(c,1)},b.escapeRegExp=function(a){return a.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},b.getMatchOffsets=function(a,b){var c=[];return a.replace(b,function(a){c.push({offset:arguments[arguments.length-2],length:a.length})}),c},b.deferredCall=function(a){var b=null,c=function(){b=null,a()},d=function(a){return d.cancel(),b=setTimeout(c,a||0),d};return d.schedule=d,d.call=function(){return this.cancel(),a(),d},d.cancel=function(){return clearTimeout(b),b=null,d},d}}),define("ace/mode/css/csslint",["require","exports","module"],function(require,exports,module){function Reporter(a,b){this.messages=[],this.stats=[],this.lines=a,this.ruleset=b}var parserlib={};(function(){function a(){this._listeners={}}function b(a){this._input=a.replace(/\n\r?/g,"\n"),this._line=1,this._col=1,this._cursor=0}function c(a,b,c){this.col=c,this.line=b,this.message=a}function d(a,b,c,d){this.col=c,this.line=b,this.text=a,this.type=d}function e(a,c){this._reader=a?new b(a.toString()):null,this._token=null,this._tokenData=c,this._lt=[],this._ltIndex=0,this._ltIndexCache=[]}a.prototype={constructor:a,addListener:function(a,b){this._listeners[a]||(this._listeners[a]=[]),this._listeners[a].push(b)},fire:function(a){typeof a=="string"&&(a={type:a}),typeof a.target!="undefined"&&(a.target=this);if(typeof a.type=="undefined")throw new Error("Event object missing 'type' property.");if(this._listeners[a.type]){var b=this._listeners[a.type].concat();for(var c=0,d=b.length;c<d;c++)b[c].call(this,a)}},removeListener:function(a,b){if(this._listeners[a]){var c=this._listeners[a];for(var d=0,e=c.length;d<e;d++)if(c[d]===b){c.splice(d,1);break}}}},b.prototype={constructor:b,getCol:function(){return this._col},getLine:function(){return this._line},eof:function(){return this._cursor==this._input.length},peek:function(a){var b=null;return a=typeof a=="undefined"?1:a,this._cursor<this._input.length&&(b=this._input.charAt(this._cursor+a-1)),b},read:function(){var a=null;return this._cursor<this._input.length&&(this._input.charAt(this._cursor)=="\n"?(this._line++,this._col=1):this._col++,a=this._input.charAt(this._cursor++)),a},mark:function(){this._bookmark={cursor:this._cursor,line:this._line,col:this._col}},reset:function(){this._bookmark&&(this._cursor=this._bookmark.cursor,this._line=this._bookmark.line,this._col=this._bookmark.col,delete this._bookmark)},readTo:function(a){var b="",c;while(b.length<a.length||b.lastIndexOf(a)!=b.length-a.length){c=this.read();if(!c)throw new Error('Expected "'+a+'" at line '+this._line+", col "+this._col+".");b+=c}return b},readWhile:function(a){var b="",c=this.read();while(c!==null&&a(c))b+=c,c=this.read();return b},readMatch:function(a){var b=this._input.substring(this._cursor),c=null;return typeof a=="string"?b.indexOf(a)===0&&(c=this.readCount(a.length)):a instanceof RegExp&&a.test(b)&&(c=this.readCount(RegExp.lastMatch.length)),c},readCount:function(a){var b="";while(a--)b+=this.read();return b}},c.prototype=new Error,d.fromToken=function(a){return new d(a.value,a.startLine,a.startCol)},d.prototype={constructor:d,valueOf:function(){return this.toString()},toString:function(){return this.text}},e.createTokenData=function(a){var b=[],c={},d=a.concat([]),e=0,f=d.length+1;d.UNKNOWN=-1,d.unshift({name:"EOF"});for(;e<f;e++)b.push(d[e].name),d[d[e].name]=e,d[e].text&&(c[d[e].text]=e);return d.name=function(a){return b[a]},d.type=function(a){return c[a]},d},e.prototype={constructor:e,match:function(a,b){a instanceof Array||(a=[a]);var c=this.get(b),d=0,e=a.length;while(d<e)if(c==a[d++])return!0;return this.unget(),!1},mustMatch:function(a,b){var d;a instanceof Array||(a=[a]);if(!this.match.apply(this,arguments))throw d=this.LT(1),new c("Expected "+this._tokenData[a[0]].name+" at line "+d.startLine+", col "+d.startCol+".",d.startLine,d.startCol)},advance:function(a,b){while(this.LA(0)!==0&&!this.match(a,b))this.get();return this.LA(0)},get:function(a){var b=this._tokenData,c=this._reader,d,e=0,f=b.length,g=!1,h,i;if(this._lt.length&&this._ltIndex>=0&&this._ltIndex<this._lt.length){e++,this._token=this._lt[this._ltIndex++],i=b[this._token.type];while(i.channel!==undefined&&a!==i.channel&&this._ltIndex<this._lt.length)this._token=this._lt[this._ltIndex++],i=b[this._token.type],e++;if((i.channel===undefined||a===i.channel)&&this._ltIndex<=this._lt.length)return this._ltIndexCache.push(e),this._token.type}return h=this._getToken(),h.type>-1&&!b[h.type].hide&&(h.channel=b[h.type].channel,this._token=h,this._lt.push(h),this._ltIndexCache.push(this._lt.length-this._ltIndex+e),this._lt.length>5&&this._lt.shift(),this._ltIndexCache.length>5&&this._ltIndexCache.shift(),this._ltIndex=this._lt.length),i=b[h.type],i&&(i.hide||i.channel!==undefined&&a!==i.channel)?this.get(a):h.type},LA:function(a){var b=a,c;if(a>0){if(a>5)throw new Error("Too much lookahead.");while(b)c=this.get(),b--;while(b<a)this.unget(),b++}else if(a<0){if(!this._lt[this._ltIndex+a])throw new Error("Too much lookbehind.");c=this._lt[this._ltIndex+a].type}else c=this._token.type;return c},LT:function(a){return this.LA(a),this._lt[this._ltIndex+a-1]},peek:function(){return this.LA(1)},token:function(){return this._token},tokenName:function(a){return a<0||a>this._tokenData.length?"UNKNOWN_TOKEN":this._tokenData[a].name},tokenType:function(a){return this._tokenData[a]||-1},unget:function(){if(!this._ltIndexCache.length)throw new Error("Too much lookahead.");this._ltIndex-=this._ltIndexCache.pop(),this._token=this._lt[this._ltIndex-1]}},parserlib.util={StringReader:b,SyntaxError:c,SyntaxUnit:d,EventTarget:a,TokenStreamBase:e}})(),function(){function Combinator(a,b,c){SyntaxUnit.call(this,a,b,c,Parser.COMBINATOR_TYPE),this.type="unknown",/^\s+$/.test(a)?this.type="descendant":a==">"?this.type="child":a=="+"?this.type="adjacent-sibling":a=="~"&&(this.type="sibling")}function MediaFeature(a,b){SyntaxUnit.call(this,"("+a+(b!==null?":"+b:"")+")",a.startLine,a.startCol,Parser.MEDIA_FEATURE_TYPE),this.name=a,this.value=b}function MediaQuery(a,b,c,d,e){SyntaxUnit.call(this,(a?a+" ":"")+(b?b+" ":"")+c.join(" and "),d,e,Parser.MEDIA_QUERY_TYPE),this.modifier=a,this.mediaType=b,this.features=c}function Parser(a){EventTarget.call(this),this.options=a||{},this._tokenStream=null}function PropertyName(a,b,c,d){SyntaxUnit.call(this,a,c,d,Parser.PROPERTY_NAME_TYPE),this.hack=b}function PropertyValue(a,b,c){SyntaxUnit.call(this,a.join(" "),b,c,Parser.PROPERTY_VALUE_TYPE),this.parts=a}function PropertyValueIterator(a){this._i=0,this._parts=a.parts,this._marks=[],this.value=a}function PropertyValuePart(text,line,col){SyntaxUnit.call(this,text,line,col,Parser.PROPERTY_VALUE_PART_TYPE),this.type="unknown";var temp;if(/^([+\-]?[\d\.]+)([a-z]+)$/i.test(text)){this.type="dimension",this.value=+RegExp.$1,this.units=RegExp.$2;switch(this.units.toLowerCase()){case"em":case"rem":case"ex":case"px":case"cm":case"mm":case"in":case"pt":case"pc":case"ch":this.type="length";break;case"deg":case"rad":case"grad":this.type="angle";break;case"ms":case"s":this.type="time";break;case"hz":case"khz":this.type="frequency";break;case"dpi":case"dpcm":this.type="resolution"}}else/^([+\-]?[\d\.]+)%$/i.test(text)?(this.type="percentage",this.value=+RegExp.$1):/^([+\-]?[\d\.]+)%$/i.test(text)?(this.type="percentage",this.value=+RegExp.$1):/^([+\-]?\d+)$/i.test(text)?(this.type="integer",this.value=+RegExp.$1):/^([+\-]?[\d\.]+)$/i.test(text)?(this.type="number",this.value=+RegExp.$1):/^#([a-f0-9]{3,6})/i.test(text)?(this.type="color",temp=RegExp.$1,temp.length==3?(this.red=parseInt(temp.charAt(0)+temp.charAt(0),16),this.green=parseInt(temp.charAt(1)+temp.charAt(1),16),this.blue=parseInt(temp.charAt(2)+temp.charAt(2),16)):(this.red=parseInt(temp.substring(0,2),16),this.green=parseInt(temp.substring(2,4),16),this.blue=parseInt(temp.substring(4,6),16))):/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.test(text)?(this.type="color",this.red=+RegExp.$1,this.green=+RegExp.$2,this.blue=+RegExp.$3):/^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)?(this.type="color",this.red=+RegExp.$1*255/100,this.green=+RegExp.$2*255/100,this.blue=+RegExp.$3*255/100):/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/i.test(text)?(this.type="color",this.red=+RegExp.$1,this.green=+RegExp.$2,this.blue=+RegExp.$3,this.alpha=+RegExp.$4):/^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)?(this.type="color",this.red=+RegExp.$1*255/100,this.green=+RegExp.$2*255/100,this.blue=+RegExp.$3*255/100,this.alpha=+RegExp.$4):/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)?(this.type="color",this.hue=+RegExp.$1,this.saturation=+RegExp.$2/100,this.lightness=+RegExp.$3/100):/^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)?(this.type="color",this.hue=+RegExp.$1,this.saturation=+RegExp.$2/100,this.lightness=+RegExp.$3/100,this.alpha=+RegExp.$4):/^url\(["']?([^\)"']+)["']?\)/i.test(text)?(this.type="uri",this.uri=RegExp.$1):/^([^\(]+)\(/i.test(text)?(this.type="function",this.name=RegExp.$1,this.value=text):/^["'][^"']*["']/.test(text)?(this.type="string",this.value=eval(text)):Colors[text.toLowerCase()]?(this.type="color",temp=Colors[text.toLowerCase()].substring(1),this.red=parseInt(temp.substring(0,2),16),this.green=parseInt(temp.substring(2,4),16),this.blue=parseInt(temp.substring(4,6),16)):/^[\,\/]$/.test(text)?(this.type="operator",this.value=text):/^[a-z\-\u0080-\uFFFF][a-z0-9\-\u0080-\uFFFF]*$/i.test(text)&&(this.type="identifier",this.value=text)}function Selector(a,b,c){SyntaxUnit.call(this,a.join(" "),b,c,Parser.SELECTOR_TYPE),this.parts=a,this.specificity=Specificity.calculate(this)}function SelectorPart(a,b,c,d,e){SyntaxUnit.call(this,c,d,e,Parser.SELECTOR_PART_TYPE),this.elementName=a,this.modifiers=b}function SelectorSubPart(a,b,c,d){SyntaxUnit.call(this,a,c,d,Parser.SELECTOR_SUB_PART_TYPE),this.type=b,this.args=[]}function Specificity(a,b,c,d){this.a=a,this.b=b,this.c=c,this.d=d}function isHexDigit(a){return a!==null&&h.test(a)}function isDigit(a){return a!==null&&/\d/.test(a)}function isWhitespace(a){return a!==null&&/\s/.test(a)}function isNewLine(a){return a!==null&&nl.test(a)}function isNameStart(a){return a!==null&&/[a-z_\u0080-\uFFFF\\]/i.test(a)}function isNameChar(a){return a!==null&&(isNameStart(a)||/[0-9\-\\]/.test(a))}function isIdentStart(a){return a!==null&&(isNameStart(a)||/\-\\/.test(a))}function mix(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function TokenStream(a){TokenStreamBase.call(this,a,Tokens)}function ValidationError(a,b,c){this.col=c,this.line=b,this.message=a}var EventTarget=parserlib.util.EventTarget,TokenStreamBase=parserlib.util.TokenStreamBase,StringReader=parserlib.util.StringReader,SyntaxError=parserlib.util.SyntaxError,SyntaxUnit=parserlib.util.SyntaxUnit,Colors={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};Combinator.prototype=new SyntaxUnit,Combinator.prototype.constructor=Combinator,MediaFeature.prototype=new SyntaxUnit,MediaFeature.prototype.constructor=MediaFeature,MediaQuery.prototype=new SyntaxUnit,MediaQuery.prototype.constructor=MediaQuery,Parser.DEFAULT_TYPE=0,Parser.COMBINATOR_TYPE=1,Parser.MEDIA_FEATURE_TYPE=2,Parser.MEDIA_QUERY_TYPE=3,Parser.PROPERTY_NAME_TYPE=4,Parser.PROPERTY_VALUE_TYPE=5,Parser.PROPERTY_VALUE_PART_TYPE=6,Parser.SELECTOR_TYPE=7,Parser.SELECTOR_PART_TYPE=8,Parser.SELECTOR_SUB_PART_TYPE=9,Parser.prototype=function(){var a=new EventTarget,b,c={constructor:Parser,DEFAULT_TYPE:0,COMBINATOR_TYPE:1,MEDIA_FEATURE_TYPE:2,MEDIA_QUERY_TYPE:3,PROPERTY_NAME_TYPE:4,PROPERTY_VALUE_TYPE:5,PROPERTY_VALUE_PART_TYPE:6,SELECTOR_TYPE:7,SELECTOR_PART_TYPE:8,SELECTOR_SUB_PART_TYPE:9,_stylesheet:function(){var a=this._tokenStream,b=null,c,d,e;this.fire("startstylesheet"),this._charset(),this._skipCruft();while(a.peek()==Tokens.IMPORT_SYM)this._import(),this._skipCruft();while(a.peek()==Tokens.NAMESPACE_SYM)this._namespace(),this._skipCruft();e=a.peek();while(e>Tokens.EOF){try{switch(e){case Tokens.MEDIA_SYM:this._media(),this._skipCruft();break;case Tokens.PAGE_SYM:this._page(),this._skipCruft();break;case Tokens.FONT_FACE_SYM:this._font_face(),this._skipCruft();break;case Tokens.KEYFRAMES_SYM:this._keyframes(),this._skipCruft();break;case Tokens.UNKNOWN_SYM:a.get();if(!!this.options.strict)throw new SyntaxError("Unknown @ rule.",a.LT(0).startLine,a.LT(0).startCol);this.fire({type:"error",error:null,message:"Unknown @ rule: "+a.LT(0).value+".",line:a.LT(0).startLine,col:a.LT(0).startCol}),c=0;while(a.advance([Tokens.LBRACE,Tokens.RBRACE])==Tokens.LBRACE)c++;while(c)a.advance([Tokens.RBRACE]),c--;break;case Tokens.S:this._readWhitespace();break;default:if(!this._ruleset())switch(e){case Tokens.CHARSET_SYM:throw d=a.LT(1),this._charset(!1),new SyntaxError("@charset not allowed here.",d.startLine,d.startCol);case Tokens.IMPORT_SYM:throw d=a.LT(1),this._import(!1),new SyntaxError("@import not allowed here.",d.startLine,d.startCol);case Tokens.NAMESPACE_SYM:throw d=a.LT(1),this._namespace(!1),new SyntaxError("@namespace not allowed here.",d.startLine,d.startCol);default:a.get(),this._unexpectedToken(a.token())}}}catch(f){if(!(f instanceof SyntaxError&&!this.options.strict))throw f;this.fire({type:"error",error:f,message:f.message,line:f.line,col:f.col})}e=a.peek()}e!=Tokens.EOF&&this._unexpectedToken(a.token()),this.fire("endstylesheet")},_charset:function(a){var b=this._tokenStream,c,d,e,f;b.match(Tokens.CHARSET_SYM)&&(e=b.token().startLine,f=b.token().startCol,this._readWhitespace(),b.mustMatch(Tokens.STRING),d=b.token(),c=d.value,this._readWhitespace(),b.mustMatch(Tokens.SEMICOLON),a!==!1&&this.fire({type:"charset",charset:c,line:e,col:f}))},_import:function(a){var b=this._tokenStream,c,d,e,f=[];b.mustMatch(Tokens.IMPORT_SYM),e=b.token(),this._readWhitespace(),b.mustMatch([Tokens.STRING,Tokens.URI]),d=b.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/,"$1"),this._readWhitespace(),f=this._media_query_list(),b.mustMatch(Tokens.SEMICOLON),this._readWhitespace(),a!==!1&&this.fire({type:"import",uri:d,media:f,line:e.startLine,col:e.startCol})},_namespace:function(a){var b=this._tokenStream,c,d,e,f;b.mustMatch(Tokens.NAMESPACE_SYM),c=b.token().startLine,d=b.token().startCol,this._readWhitespace(),b.match(Tokens.IDENT)&&(e=b.token().value,this._readWhitespace()),b.mustMatch([Tokens.STRING,Tokens.URI]),f=b.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/,"$1"),this._readWhitespace(),b.mustMatch(Tokens.SEMICOLON),this._readWhitespace(),a!==!1&&this.fire({type:"namespace",prefix:e,uri:f,line:c,col:d})},_media:function(){var a=this._tokenStream,b,c,d;a.mustMatch(Tokens.MEDIA_SYM),b=a.token().startLine,c=a.token().startCol,this._readWhitespace(),d=this._media_query_list(),a.mustMatch(Tokens.LBRACE),this._readWhitespace(),this.fire({type:"startmedia",media:d,line:b,col:c});for(;;)if(a.peek()==Tokens.PAGE_SYM)this._page();else if(!this._ruleset())break;a.mustMatch(Tokens.RBRACE),this._readWhitespace(),this.fire({type:"endmedia",media:d,line:b,col:c})},_media_query_list:function(){var a=this._tokenStream,b=[];this._readWhitespace(),(a.peek()==Tokens.IDENT||a.peek()==Tokens.LPAREN)&&b.push(this._media_query());while(a.match(Tokens.COMMA))this._readWhitespace(),b.push(this._media_query());return b},_media_query:function(){var a=this._tokenStream,b=null,c=null,d=null,e=[];a.match(Tokens.IDENT)&&(c=a.token().value.toLowerCase(),c!="only"&&c!="not"?(a.unget(),c=null):d=a.token()),this._readWhitespace(),a.peek()==Tokens.IDENT?(b=this._media_type(),d===null&&(d=a.token())):a.peek()==Tokens.LPAREN&&(d===null&&(d=a.LT(1)),e.push(this._media_expression()));if(b===null&&e.length===0)return null;this._readWhitespace();while(a.match(Tokens.IDENT))a.token().value.toLowerCase()!="and"&&this._unexpectedToken(a.token()),this._readWhitespace(),e.push(this._media_expression());return new MediaQuery(c,b,e,d.startLine,d.startCol)},_media_type:function(){return this._media_feature()},_media_expression:function(){var a=this._tokenStream,b=null,c,d=null;return a.mustMatch(Tokens.LPAREN),b=this._media_feature(),this._readWhitespace(),a.match(Tokens.COLON)&&(this._readWhitespace(),c=a.LT(1),d=this._expression()),a.mustMatch(Tokens.RPAREN),this._readWhitespace(),new MediaFeature(b,d?new SyntaxUnit(d,c.startLine,c.startCol):null)},_media_feature:function(){var a=this._tokenStream;return a.mustMatch(Tokens.IDENT),SyntaxUnit.fromToken(a.token())},_page:function(){var a=this._tokenStream,b,c,d=null,e=null;a.mustMatch(Tokens.PAGE_SYM),b=a.token().startLine,c=a.token().startCol,this._readWhitespace(),a.match(Tokens.IDENT)&&(d=a.token().value,d.toLowerCase()==="auto"&&this._unexpectedToken(a.token())),a.peek()==Tokens.COLON&&(e=this._pseudo_page()),this._readWhitespace(),this.fire({type:"startpage",id:d,pseudo:e,line:b,col:c}),this._readDeclarations(!0,!0),this.fire({type:"endpage",id:d,pseudo:e,line:b,col:c})},_margin:function(){var a=this._tokenStream,b,c,d=this._margin_sym();return d?(b=a.token().startLine,c=a.token().startCol,this.fire({type:"startpagemargin",margin:d,line:b,col:c}),this._readDeclarations(!0),this.fire({type:"endpagemargin",margin:d,line:b,col:c}),!0):!1},_margin_sym:function(){var a=this._tokenStream;return a.match([Tokens.TOPLEFTCORNER_SYM,Tokens.TOPLEFT_SYM,Tokens.TOPCENTER_SYM,Tokens.TOPRIGHT_SYM,Tokens.TOPRIGHTCORNER_SYM,Tokens.BOTTOMLEFTCORNER_SYM,Tokens.BOTTOMLEFT_SYM,Tokens.BOTTOMCENTER_SYM,Tokens.BOTTOMRIGHT_SYM,Tokens.BOTTOMRIGHTCORNER_SYM,Tokens.LEFTTOP_SYM,Tokens.LEFTMIDDLE_SYM,Tokens.LEFTBOTTOM_SYM,Tokens.RIGHTTOP_SYM,Tokens.RIGHTMIDDLE_SYM,Tokens.RIGHTBOTTOM_SYM])?SyntaxUnit.fromToken(a.token()):null},_pseudo_page:function(){var a=this._tokenStream;return a.mustMatch(Tokens.COLON),a.mustMatch(Tokens.IDENT),a.token().value},_font_face:function(){var a=this._tokenStream,b,c;a.mustMatch(Tokens.FONT_FACE_SYM),b=a.token().startLine,c=a.token().startCol,this._readWhitespace(),this.fire({type:"startfontface",line:b,col:c}),this._readDeclarations(!0),this.fire({type:"endfontface",line:b,col:c})},_operator:function(){var a=this._tokenStream,b=null;return a.match([Tokens.SLASH,Tokens.COMMA])&&(b=a.token(),this._readWhitespace()),b?PropertyValuePart.fromToken(b):null},_combinator:function(){var a=this._tokenStream,b=null,c;return a.match([Tokens.PLUS,Tokens.GREATER,Tokens.TILDE])&&(c=a.token(),b=new Combinator(c.value,c.startLine,c.startCol),this._readWhitespace()),b},_unary_operator:function(){var a=this._tokenStream;return a.match([Tokens.MINUS,Tokens.PLUS])?a.token().value:null},_property:function(){var a=this._tokenStream,b=null,c=null,d,e,f,g;return a.peek()==Tokens.STAR&&this.options.starHack&&(a.get(),e=a.token(),c=e.value,f=e.startLine,g=e.startCol),a.match(Tokens.IDENT)&&(e=a.token(),d=e.value,d.charAt(0)=="_"&&this.options.underscoreHack&&(c="_",d=d.substring(1)),b=new PropertyName(d,c,f||e.startLine,g||e.startCol),this._readWhitespace()),b},_ruleset:function(){var a=this._tokenStream,b,c;try{c=this._selectors_group()}catch(d){if(d instanceof SyntaxError&&!this.options.strict){this.fire({type:"error",error:d,message:d.message,line:d.line,col:d.col}),b=a.advance([Tokens.RBRACE]);if(b!=Tokens.RBRACE)throw d;return!0}throw d}return c&&(this.fire({type:"startrule",selectors:c,line:c[0].line,col:c[0].col}),this._readDeclarations(!0),this.fire({type:"endrule",selectors:c,line:c[0].line,col:c[0].col})),c},_selectors_group:function(){var a=this._tokenStream,b=[],c;c=this._selector();if(c!==null){b.push(c);while(a.match(Tokens.COMMA))this._readWhitespace(),c=this._selector(),c!==null?b.push(c):this._unexpectedToken(a.LT(1))}return b.length?b:null},_selector:function(){var a=this._tokenStream,b=[],c=null,d=null,e=null;c=this._simple_selector_sequence();if(c===null)return null;b.push(c);do{d=this._combinator();if(d!==null)b.push(d),c=this._simple_selector_sequence(),c===null?this._unexpectedToken(this.LT(1)):b.push(c);else{if(!this._readWhitespace())break;e=new Combinator(a.token().value,a.token().startLine,a.token().startCol),d=this._combinator(),c=this._simple_selector_sequence(),c===null?d!==null&&this._unexpectedToken(a.LT(1)):(d!==null?b.push(d):b.push(e),b.push(c))}}while(!0);return new Selector(b,b[0].line,b[0].col)},_simple_selector_sequence:function(){var a=this._tokenStream,b=null,c=[],d="",e=[function(){return a.match(Tokens.HASH)?new SelectorSubPart(a.token().value,"id",a.token().startLine,a.token().startCol):null},this._class,this._attrib,this._pseudo,this._negation],f=0,g=e.length,h=null,i=!1,j,k;j=a.LT(1).startLine,k=a.LT(1).startCol,b=this._type_selector(),b||(b=this._universal()),b!==null&&(d+=b);for(;;){if(a.peek()===Tokens.S)break;while(f<g&&h===null)h=e[f++].call(this);if(h===null){if(d==="")return null;break}f=0,c.push(h),d+=h.toString(),h=null}return d!==""?new SelectorPart(b,c,d,j,k):null},_type_selector:function(){var a=this._tokenStream,b=this._namespace_prefix(),c=this._element_name();return c?(b&&(c.text=b+c.text,c.col-=b.length),c):(b&&(a.unget(),b.length>1&&a.unget()),null)},_class:function(){var a=this._tokenStream,b;return a.match(Tokens.DOT)?(a.mustMatch(Tokens.IDENT),b=a.token(),new SelectorSubPart("."+b.value,"class",b.startLine,b.startCol-1)):null},_element_name:function(){var a=this._tokenStream,b;return a.match(Tokens.IDENT)?(b=a.token(),new SelectorSubPart(b.value,"elementName",b.startLine,b.startCol)):null},_namespace_prefix:function(){var a=this._tokenStream,b="";if(a.LA(1)===Tokens.PIPE||a.LA(2)===Tokens.PIPE)a.match([Tokens.IDENT,Tokens.STAR])&&(b+=a.token().value),a.mustMatch(Tokens.PIPE),b+="|";return b.length?b:null},_universal:function(){var a=this._tokenStream,b="",c;return c=this._namespace_prefix(),c&&(b+=c),a.match(Tokens.STAR)&&(b+="*"),b.length?b:null},_attrib:function(){var a=this._tokenStream,b=null,c,d;return a.match(Tokens.LBRACKET)?(d=a.token(),b=d.value,b+=this._readWhitespace(),c=this._namespace_prefix(),c&&(b+=c),a.mustMatch(Tokens.IDENT),b+=a.token().value,b+=this._readWhitespace(),a.match([Tokens.PREFIXMATCH,Tokens.SUFFIXMATCH,Tokens.SUBSTRINGMATCH,Tokens.EQUALS,Tokens.INCLUDES,Tokens.DASHMATCH])&&(b+=a.token().value,b+=this._readWhitespace(),a.mustMatch([Tokens.IDENT,Tokens.STRING]),b+=a.token().value,b+=this._readWhitespace()),a.mustMatch(Tokens.RBRACKET),new SelectorSubPart(b+"]","attribute",d.startLine,d.startCol)):null},_pseudo:function(){var a=this._tokenStream,b=null,c=":",d,e;return a.match(Tokens.COLON)&&(a.match(Tokens.COLON)&&(c+=":"),a.match(Tokens.IDENT)?(b=a.token().value,d=a.token().startLine,e=a.token().startCol-c.length):a.peek()==Tokens.FUNCTION&&(d=a.LT(1).startLine,e=a.LT(1).startCol-c.length,b=this._functional_pseudo()),b&&(b=new SelectorSubPart(c+b,"pseudo",d,e))),b},_functional_pseudo:function(){var a=this._tokenStream,b=null;return a.match(Tokens.FUNCTION)&&(b=a.token().value,b+=this._readWhitespace(),b+=this._expression(),a.mustMatch(Tokens.RPAREN),b+=")"),b},_expression:function(){var a=this._tokenStream,b="";while(a.match([Tokens.PLUS,Tokens.MINUS,Tokens.DIMENSION,Tokens.NUMBER,Tokens.STRING,Tokens.IDENT,Tokens.LENGTH,Tokens.FREQ,Tokens.ANGLE,Tokens.TIME,Tokens.RESOLUTION]))b+=a.token().value,b+=this._readWhitespace();return b.length?b:null},_negation:function(){var a=this._tokenStream,b,c,d="",e,f=null;return a.match(Tokens.NOT)&&(d=a.token().value,b=a.token().startLine,c=a.token().startCol,d+=this._readWhitespace(),e=this._negation_arg(),d+=e,d+=this._readWhitespace(),a.match(Tokens.RPAREN),d+=a.token().value,f=new SelectorSubPart(d,"not",b,c),f.args.push(e)),f},_negation_arg:function(){var a=this._tokenStream,b=[this._type_selector,this._universal,function(){return a.match(Tokens.HASH)?new SelectorSubPart(a.token().value,"id",a.token().startLine,a.token().startCol):null},this._class,this._attrib,this._pseudo],c=null,d=0,e=b.length,f,g,h,i;g=a.LT(1).startLine,h=a.LT(1).startCol;while(d<e&&c===null)c=b[d].call(this),d++;return c===null&&this._unexpectedToken(a.LT(1)),c.type=="elementName"?i=new SelectorPart(c,[],c.toString(),g,h):i=new SelectorPart(null,[c],c.toString(),g,h),i},_declaration:function(){var a=this._tokenStream,b=null,c=null,d=null,e=null,f=null;b=this._property();if(b!==null){a.mustMatch(Tokens.COLON),this._readWhitespace(),c=this._expr(),(!c||c.length===0)&&this._unexpectedToken(a.LT(1)),d=this._prio();try{this._validateProperty(b,c)}catch(g){f=g}return this.fire({type:"property",property:b,value:c,important:d,line:b.line,col:b.col,invalid:f}),!0}return!1},_prio:function(){var a=this._tokenStream,b=a.match(Tokens.IMPORTANT_SYM);return this._readWhitespace(),b},_expr:function(){var a=this._tokenStream,b=[],c=null,d=null;c=this._term();if(c!==null){b.push(c);do{d=this._operator(),d&&b.push(d),c=this._term();if(c===null)break;b.push(c)}while(!0)}return b.length>0?new PropertyValue(b,b[0].line,b[0].col):null},_term:function(){var a=this._tokenStream,b=null,c=null,d,e,f;return b=this._unary_operator(),b!==null&&(e=a.token().startLine,f=a.token().startCol),a.peek()==Tokens.IE_FUNCTION&&this.options.ieFilters?(c=this._ie_function(),b===null&&(e=a.token().startLine,f=a.token().startCol)):a.match([Tokens.NUMBER,Tokens.PERCENTAGE,Tokens.LENGTH,Tokens.ANGLE,Tokens.TIME,Tokens.FREQ,Tokens.STRING,Tokens.IDENT,Tokens.URI,Tokens.UNICODE_RANGE])?(c=a.token().value,b===null&&(e=a.token().startLine,f=a.token().startCol),this._readWhitespace()):(d=this._hexcolor(),d===null?(b===null&&(e=a.LT(1).startLine,f=a.LT(1).startCol),c===null&&(a.LA(3)==Tokens.EQUALS&&this.options.ieFilters?c=this._ie_function():c=this._function())):(c=d.value,b===null&&(e=d.startLine,f=d.startCol))),c!==null?new PropertyValuePart(b!==null?b+c:c,e,f):null},_function:function(){var a=this._tokenStream,b=null,c=null,d;if(a.match(Tokens.FUNCTION)){b=a.token().value,this._readWhitespace(),c=this._expr(),b+=c;if(this.options.ieFilters&&a.peek()==Tokens.EQUALS)do{this._readWhitespace()&&(b+=a.token().value),a.LA(0)==Tokens.COMMA&&(b+=a.token().value),a.match(Tokens.IDENT),b+=a.token().value,a.match(Tokens.EQUALS),b+=a.token().value,d=a.peek();while(d!=Tokens.COMMA&&d!=Tokens.S&&d!=Tokens.RPAREN)a.get(),b+=a.token().value,d=a.peek()}while(a.match([Tokens.COMMA,Tokens.S]));a.match(Tokens.RPAREN),b+=")",this._readWhitespace()}return b},_ie_function:function(){var a=this._tokenStream,b=null,c=null,d;if(a.match([Tokens.IE_FUNCTION,Tokens.FUNCTION])){b=a.token().value;do{this._readWhitespace()&&(b+=a.token().value),a.LA(0)==Tokens.COMMA&&(b+=a.token().value),a.match(Tokens.IDENT),b+=a.token().value,a.match(Tokens.EQUALS),b+=a.token().value,d=a.peek();while(d!=Tokens.COMMA&&d!=Tokens.S&&d!=Tokens.RPAREN)a.get(),b+=a.token().value,d=a.peek()}while(a.match([Tokens.COMMA,Tokens.S]));a.match(Tokens.RPAREN),b+=")",this._readWhitespace()}return b},_hexcolor:function(){var a=this._tokenStream,b=null,c;if(a.match(Tokens.HASH)){b=a.token(),c=b.value;if(!/#[a-f0-9]{3,6}/i.test(c))throw new SyntaxError("Expected a hex color but found '"+c+"' at line "+b.startLine+", col "+b.startCol+".",b.startLine,b.startCol);this._readWhitespace()}return b},_keyframes:function(){var a=this._tokenStream,b,c,d;a.mustMatch(Tokens.KEYFRAMES_SYM),this._readWhitespace(),d=this._keyframe_name(),this._readWhitespace(),a.mustMatch(Tokens.LBRACE),this.fire({type:"startkeyframes",name:d,line:d.line,col:d.col}),this._readWhitespace(),c=a.peek();while(c==Tokens.IDENT||c==Tokens.PERCENTAGE)this._keyframe_rule(),this._readWhitespace(),c=a.peek();this.fire({type:"endkeyframes",name:d,line:d.line,col:d.col}),this._readWhitespace(),a.mustMatch(Tokens.RBRACE)},_keyframe_name:function(){var a=this._tokenStream,b;return a.mustMatch([Tokens.IDENT,Tokens.STRING]),SyntaxUnit.fromToken(a.token())},_keyframe_rule:function(){var a=this._tokenStream,b,c=this._key_list();this.fire({type:"startkeyframerule",keys:c,line:c[0].line,col:c[0].col}),this._readDeclarations(!0),this.fire({type:"endkeyframerule",keys:c,line:c[0].line,col:c[0].col})},_key_list:function(){var a=this._tokenStream,b,c,d=[];d.push(this._key()),this._readWhitespace();while(a.match(Tokens.COMMA))this._readWhitespace(),d.push(this._key()),this._readWhitespace();return d},_key:function(){var a=this._tokenStream,b;if(a.match(Tokens.PERCENTAGE))return SyntaxUnit.fromToken(a.token());if(a.match(Tokens.IDENT)){b=a.token();if(/from|to/i.test(b.value))return SyntaxUnit.fromToken(b);a.unget()}this._unexpectedToken(a.LT(1))},_skipCruft:function(){while(this._tokenStream.match([Tokens.S,Tokens.CDO,Tokens.CDC]));},_readDeclarations:function(a,b){var c=this._tokenStream,d;this._readWhitespace(),a&&c.mustMatch(Tokens.LBRACE),this._readWhitespace();try{for(;;){if(!(c.match(Tokens.SEMICOLON)||b&&this._margin())){if(!this._declaration())break;if(!c.match(Tokens.SEMICOLON))break}this._readWhitespace()}c.mustMatch(Tokens.RBRACE),this._readWhitespace()}catch(e){if(!(e instanceof SyntaxError&&!this.options.strict))throw e;this.fire({type:"error",error:e,message:e.message,line:e.line,col:e.col}),d=c.advance([Tokens.SEMICOLON,Tokens.RBRACE]);if(d==Tokens.SEMICOLON)this._readDeclarations(!1,b);else if(d!=Tokens.RBRACE)throw e}},_readWhitespace:function(){var a=this._tokenStream,b="";while(a.match(Tokens.S))b+=a.token().value;return b},_unexpectedToken:function(a){throw new SyntaxError("Unexpected token '"+a.value+"' at line "+a.startLine+", col "+a.startCol+".",a.startLine,a.startCol)},_verifyEnd:function(){this._tokenStream.LA(1)!=Tokens.EOF&&this._unexpectedToken(this._tokenStream.LT(1))},_validateProperty:function(a,b){Validation.validate(a,b)},parse:function(a){this._tokenStream=new TokenStream(a,Tokens),this._stylesheet()},parseStyleSheet:function(a){return this.parse(a)},parseMediaQuery:function(a){this._tokenStream=new TokenStream(a,Tokens);var b=this._media_query();return this._verifyEnd(),b},parsePropertyValue:function(a){this._tokenStream=new TokenStream(a,Tokens),this._readWhitespace();var b=this._expr();return this._readWhitespace(),this._verifyEnd(),b},parseRule:function(a){this._tokenStream=new TokenStream(a,Tokens),this._readWhitespace();var b=this._ruleset();return this._readWhitespace(),this._verifyEnd(),b},parseSelector:function(a){this._tokenStream=new TokenStream(a,Tokens),this._readWhitespace();var b=this._selector();return this._readWhitespace(),this._verifyEnd(),b},parseStyleAttribute:function(a){a+="}",this._tokenStream=new TokenStream(a,Tokens),this._readDeclarations()}};for(b in c)c.hasOwnProperty(b)&&(a[b]=c[b]);return a}();var Properties={"alignment-adjust":"auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | <percentage> | <length>","alignment-baseline":"baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",animation:1,"animation-delay":{multi:"<time>",comma:!0},"animation-direction":{multi:"normal | alternate",comma:!0},"animation-duration":{multi:"<time>",comma:!0},"animation-iteration-count":{multi:"<number> | infinite",comma:!0},"animation-name":{multi:"none | <ident>",comma:!0},"animation-play-state":{multi:"running | paused",comma:!0},"animation-timing-function":1,"-moz-animation-delay":{multi:"<time>",comma:!0},"-moz-animation-direction":{multi:"normal | alternate",comma:!0},"-moz-animation-duration":{multi:"<time>",comma:!0},"-moz-animation-iteration-count":{multi:"<number> | infinite",comma:!0},"-moz-animation-name":{multi:"none | <ident>",comma:!0},"-moz-animation-play-state":{multi:"running | paused",comma:!0},"-ms-animation-delay":{multi:"<time>",comma:!0},"-ms-animation-direction":{multi:"normal | alternate",comma:!0},"-ms-animation-duration":{multi:"<time>",comma:!0},"-ms-animation-iteration-count":{multi:"<number> | infinite",comma:!0},"-ms-animation-name":{multi:"none | <ident>",comma:!0},"-ms-animation-play-state":{multi:"running | paused",comma:!0},"-webkit-animation-delay":{multi:"<time>",comma:!0},"-webkit-animation-direction":{multi:"normal | alternate",comma:!0},"-webkit-animation-duration":{multi:"<time>",comma:!0},"-webkit-animation-iteration-count":{multi:"<number> | infinite",comma:!0},"-webkit-animation-name":{multi:"none | <ident>",comma:!0},"-webkit-animation-play-state":{multi:"running | paused",comma:!0},"-o-animation-delay":{multi:"<time>",comma:!0},"-o-animation-direction":{multi:"normal | alternate",comma:!0},"-o-animation-duration":{multi:"<time>",comma:!0},"-o-animation-iteration-count":{multi:"<number> | infinite",comma:!0},"-o-animation-name":{multi:"none | <ident>",comma:!0},"-o-animation-play-state":{multi:"running | paused",comma:!0},appearance:"icon | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal | inherit",azimuth:function(a){var b="<angle> | leftwards | rightwards | inherit",c="left-side | far-left | left | center-left | center | center-right | right | far-right | right-side",d=!1,e=!1,f;ValidationTypes.isAny(a,b)||(ValidationTypes.isAny(a,"behind")&&(d=!0,e=!0),ValidationTypes.isAny(a,c)&&(e=!0,d||ValidationTypes.isAny(a,"behind")));if(a.hasNext())throw f=a.next(),e?new ValidationError("Expected end of value but found '"+f+"'.",f.line,f.col):new ValidationError("Expected (<'azimuth'>) but found '"+f+"'.",f.line,f.col)},"backface-visibility":"visible | hidden",background:1,"background-attachment":{multi:"<attachment>",comma:!0},"background-clip":{multi:"<box>",comma:!0},"background-color":"<color> | inherit","background-image":{multi:"<bg-image>",comma:!0},"background-origin":{multi:"<box>",comma:!0},"background-position":{multi:"<bg-position>",comma:!0},"background-repeat":{multi:"<repeat-style>"},"background-size":{multi:"<bg-size>",comma:!0},"baseline-shift":"baseline | sub | super | <percentage> | <length>",binding:1,bleed:"<length>","bookmark-label":"<content> | <attr> | <string>","bookmark-level":"none | <integer>","bookmark-state":"open | closed","bookmark-target":"none | <uri> | <attr>",border:"<border-width> || <border-style> || <color>","border-bottom":"<border-width> || <border-style> || <color>","border-bottom-color":"<color>","border-bottom-left-radius":"<x-one-radius>","border-bottom-right-radius":"<x-one-radius>","border-bottom-style":"<border-style>","border-bottom-width":"<border-width>","border-collapse":"collapse | separate | inherit","border-color":{multi:"<color> | inherit",max:4},"border-image":1,"border-image-outset":{multi:"<length> | <number>",max:4},"border-image-repeat":{multi:"stretch | repeat | round",max:2},"border-image-slice":function(a){var b=!1,c="<number> | <percentage>",d=!1,e=0,f=4,g;ValidationTypes.isAny(a,"fill")&&(d=!0,b=!0);while(a.hasNext()&&e<f){b=ValidationTypes.isAny(a,c);if(!b)break;e++}d?b=!0:ValidationTypes.isAny(a,"fill");if(a.hasNext())throw g=a.next(),b?new ValidationError("Expected end of value but found '"+g+"'.",g.line,g.col):new ValidationError("Expected ([<number> | <percentage>]{1,4} && fill?) but found '"+g+"'.",g.line,g.col)},"border-image-source":"<image> | none","border-image-width":{multi:"<length> | <percentage> | <number> | auto",max:4},"border-left":"<border-width> || <border-style> || <color>","border-left-color":"<color> | inherit","border-left-style":"<border-style>","border-left-width":"<border-width>","border-radius":function(a){var b=!1,c="<length> | <percentage>",d=!1,e=!1,f=0,g=8,h;while(a.hasNext()&&f<g){b=ValidationTypes.isAny(a,c);if(!b){if(!(a.peek()=="/"&&f>1&&!d))break;d=!0,g=f+5,a.next()}f++}if(a.hasNext())throw h=a.next(),b?new ValidationError("Expected end of value but found '"+h+"'.",h.line,h.col):new ValidationError("Expected (<'border-radius'>) but found '"+h+"'.",h.line,h.col)},"border-right":"<border-width> || <border-style> || <color>","border-right-color":"<color> | inherit","border-right-style":"<border-style>","border-right-width":"<border-width>","border-spacing":{multi:"<length> | inherit",max:2},"border-style":{multi:"<border-style>",max:4},"border-top":"<border-width> || <border-style> || <color>","border-top-color":"<color> | inherit","border-top-left-radius":"<x-one-radius>","border-top-right-radius":"<x-one-radius>","border-top-style":"<border-style>","border-top-width":"<border-width>","border-width":{multi:"<border-width>",max:4},bottom:"<margin-width> | inherit","box-align":"start | end | center | baseline | stretch","box-decoration-break":"slice |clone","box-direction":"normal | reverse | inherit","box-flex":"<number>","box-flex-group":"<integer>","box-lines":"single | multiple","box-ordinal-group":"<integer>","box-orient":"horizontal | vertical | inline-axis | block-axis | inherit","box-pack":"start | end | center | justify","box-shadow":function(a){var b=!1,c;if(!ValidationTypes.isAny(a,"none"))Validation.multiProperty("<shadow>",a,!0,Infinity);else if(a.hasNext())throw c=a.next(),new ValidationError("Expected end of value but found '"+c+"'.",c.line,c.col)},"box-sizing":"content-box | border-box | inherit","break-after":"auto | always | avoid | left | right | page | column | avoid-page | avoid-column","break-before":"auto | always | avoid | left | right | page | column | avoid-page | avoid-column","break-inside":"auto | avoid | avoid-page | avoid-column","caption-side":"top | bottom | inherit",clear:"none | right | left | both | inherit",clip:1,color:"<color> | inherit","color-profile":1,"column-count":"<integer> | auto","column-fill":"auto | balance","column-gap":"<length> | normal","column-rule":"<border-width> || <border-style> || <color>","column-rule-color":"<color>","column-rule-style":"<border-style>","column-rule-width":"<border-width>","column-span":"none | all","column-width":"<length> | auto",columns:1,content:1,"counter-increment":1,"counter-reset":1,crop:"<shape> | auto",cue:"cue-after | cue-before | inherit","cue-after":1,"cue-before":1,cursor:1,direction:"ltr | rtl | inherit",display:"inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | box | inline-box | grid | inline-grid | none | inherit","dominant-baseline":1,"drop-initial-after-adjust":"central | middle | after-edge | text-after-edge | ideographic | alphabetic | mathematical | <percentage> | <length>","drop-initial-after-align":"baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical","drop-initial-before-adjust":"before-edge | text-before-edge | central | middle | hanging | mathematical | <percentage> | <length>","drop-initial-before-align":"caps-height | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical","drop-initial-size":"auto | line | <length> | <percentage>","drop-initial-value":"initial | <integer>",elevation:"<angle> | below | level | above | higher | lower | inherit","empty-cells":"show | hide | inherit",filter:1,fit:"fill | hidden | meet | slice","fit-position":1,"float":"left | right | none | inherit","float-offset":1,font:1,"font-family":1,"font-size":"<absolute-size> | <relative-size> | <length> | <percentage> | inherit","font-size-adjust":"<number> | none | inherit","font-stretch":"normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit","font-style":"normal | italic | oblique | inherit","font-variant":"normal | small-caps | inherit","font-weight":"normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit","grid-cell-stacking":"columns | rows | layer","grid-column":1,"grid-columns":1,"grid-column-align":"start | end | center | stretch","grid-column-sizing":1,"grid-column-span":"<integer>","grid-flow":"none | rows | columns","grid-layer":"<integer>","grid-row":1,"grid-rows":1,"grid-row-align":"start | end | center | stretch","grid-row-span":"<integer>","grid-row-sizing":1,"hanging-punctuation":1,height:"<margin-width> | inherit","hyphenate-after":"<integer> | auto","hyphenate-before":"<integer> | auto","hyphenate-character":"<string> | auto","hyphenate-lines":"no-limit | <integer>","hyphenate-resource":1,hyphens:"none | manual | auto",icon:1,"image-orientation":"angle | auto","image-rendering":1,"image-resolution":1,"inline-box-align":"initial | last | <integer>",left:"<margin-width> | inherit","letter-spacing":"<length> | normal | inherit","line-height":"<number> | <length> | <percentage> | normal | inherit","line-break":"auto | loose | normal | strict","line-stacking":1,"line-stacking-ruby":"exclude-ruby | include-ruby","line-stacking-shift":"consider-shifts | disregard-shifts","line-stacking-strategy":"inline-line-height | block-line-height | max-height | grid-height","list-style":1,"list-style-image":"<uri> | none | inherit","list-style-position":"inside | outside | inherit","list-style-type":"disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha | none | inherit",margin:{multi:"<margin-width> | inherit",max:4},"margin-bottom":"<margin-width> | inherit","margin-left":"<margin-width> | inherit","margin-right":"<margin-width> | inherit","margin-top":"<margin-width> | inherit",mark:1,"mark-after":1,"mark-before":1,marks:1,"marquee-direction":1,"marquee-play-count":1,"marquee-speed":1,"marquee-style":1,"max-height":"<length> | <percentage> | none | inherit","max-width":"<length> | <percentage> | none | inherit","min-height":"<length> | <percentage> | inherit","min-width":"<length> | <percentage> | inherit","move-to":1,"nav-down":1,"nav-index":1,"nav-left":1,"nav-right":1,"nav-up":1,opacity:"<number> | inherit",orphans:"<integer> | inherit",outline:1,"outline-color":"<color> | invert | inherit","outline-offset":1,"outline-style":"<border-style> | inherit","outline-width":"<border-width> | inherit",overflow:"visible | hidden | scroll | auto | inherit","overflow-style":1,"overflow-x":1,"overflow-y":1,padding:{multi:"<padding-width> | inherit",max:4},"padding-bottom":"<padding-width> | inherit","padding-left":"<padding-width> | inherit","padding-right":"<padding-width> | inherit","padding-top":"<padding-width> | inherit",page:1,"page-break-after":"auto | always | avoid | left | right | inherit","page-break-before":"auto | always | avoid | left | right | inherit","page-break-inside":"auto | avoid | inherit","page-policy":1,pause:1,"pause-after":1,"pause-before":1,perspective:1,"perspective-origin":1,phonemes:1,pitch:1,"pitch-range":1,"play-during":1,position:"static | relative | absolute | fixed | inherit","presentation-level":1,"punctuation-trim":1,quotes:1,"rendering-intent":1,resize:1,rest:1,"rest-after":1,"rest-before":1,richness:1,right:"<margin-width> | inherit",rotation:1,"rotation-point":1,"ruby-align":1,"ruby-overhang":1,"ruby-position":1,"ruby-span":1,size:1,speak:"normal | none | spell-out | inherit","speak-header":"once | always | inherit","speak-numeral":"digits | continuous | inherit","speak-punctuation":"code | none | inherit","speech-rate":1,src:1,stress:1,"string-set":1,"table-layout":"auto | fixed | inherit","tab-size":"<integer> | <length>",target:1,"target-name":1,"target-new":1,"target-position":1,"text-align":"left | right | center | justify | inherit","text-align-last":1,"text-decoration":1,"text-emphasis":1,"text-height":1,"text-indent":"<length> | <percentage> | inherit","text-justify":"auto | none | inter-word | inter-ideograph | inter-cluster | distribute | kashida","text-outline":1,"text-overflow":1,"text-shadow":1,"text-transform":"capitalize | uppercase | lowercase | none | inherit","text-wrap":"normal | none | avoid",top:"<margin-width> | inherit",transform:1,"transform-origin":1,"transform-style":1,transition:1,"transition-delay":1,"transition-duration":1,"transition-property":1,"transition-timing-function":1,"unicode-bidi":"normal | embed | bidi-override | inherit","user-modify":"read-only | read-write | write-only | inherit","user-select":"none | text | toggle | element | elements | all | inherit","vertical-align":"<percentage> | <length> | baseline | sub | super | top | text-top | middle | bottom | text-bottom | inherit",visibility:"visible | hidden | collapse | inherit","voice-balance":1,"voice-duration":1,"voice-family":1,"voice-pitch":1,"voice-pitch-range":1,"voice-rate":1,"voice-stress":1,"voice-volume":1,volume:1,"white-space":"normal | pre | nowrap | pre-wrap | pre-line | inherit","white-space-collapse":1,widows:"<integer> | inherit",width:"<length> | <percentage> | auto | inherit","word-break":"normal | keep-all | break-all","word-spacing":"<length> | normal | inherit","word-wrap":1,"z-index":"<integer> | auto | inherit",zoom:"<number> | <percentage> | normal"};PropertyName.prototype=new SyntaxUnit,PropertyName.prototype.constructor=PropertyName,PropertyName.prototype.toString=function(){return(this.hack?this.hack:"")+this.text},PropertyValue.prototype=new SyntaxUnit,PropertyValue.prototype.constructor=PropertyValue,PropertyValueIterator.prototype.count=function(){return this._parts.length},PropertyValueIterator.prototype.isFirst=function(){return this._i===0},PropertyValueIterator.prototype.hasNext=function(){return this._i<this._parts.length},PropertyValueIterator.prototype.mark=function(){this._marks.push(this._i)},PropertyValueIterator.prototype.peek=function(a){return this.hasNext()?this._parts[this._i+(a||0)]:null},PropertyValueIterator.prototype.next=function(){return this.hasNext()?this._parts[this._i++]:null},PropertyValueIterator.prototype.previous=function(){return this._i>0?this._parts[--this._i]:null},PropertyValueIterator.prototype.restore=function(){this._marks.length&&(this._i=this._marks.pop())},PropertyValuePart.prototype=new SyntaxUnit,PropertyValuePart.prototype.constructor=PropertyValuePart,PropertyValuePart.fromToken=function(a){return new PropertyValuePart(a.value,a.startLine,a.startCol)};var Pseudos={":first-letter":1,":first-line":1,":before":1,":after":1};Pseudos.ELEMENT=1,Pseudos.CLASS=2,Pseudos.isElement=function(a){return a.indexOf("::")===0||Pseudos[a.toLowerCase()]==Pseudos.ELEMENT},Selector.prototype=new SyntaxUnit,Selector.prototype.constructor=Selector,SelectorPart.prototype=new SyntaxUnit,SelectorPart.prototype.constructor=SelectorPart,SelectorSubPart.prototype=new SyntaxUnit,SelectorSubPart.prototype.constructor=SelectorSubPart,Specificity.prototype={constructor:Specificity,compare:function(a){var b=["a","b","c","d"],c,d;for(c=0,d=b.length;c<d;c++){if(this[b[c]]<a[b[c]])return-1;if(this[b[c]]>a[b[c]])return 1}return 0},valueOf:function(){return this.a*1e3+this.b*100+this.c*10+this.d},toString:function(){return this.a+","+this.b+","+this.c+","+this.d}},Specificity.calculate=function(a){function h(a){var b,c,d,i,j=a.elementName?a.elementName.text:"",k;j&&j.charAt(j.length-1)!="*"&&g++;for(b=0,d=a.modifiers.length;b<d;b++){k=a.modifiers[b];switch(k.type){case"class":case"attribute":f++;break;case"id":e++;break;case"pseudo":Pseudos.isElement(k.text)?g++:f++;break;case"not":for(c=0,i=k.args.length;c<i;c++)h(k.args[c])}}}var b,c,d,e=0,f=0,g=0;for(b=0,c=a.parts.length;b<c;b++)d=a.parts[b],d instanceof SelectorPart&&h(d);return new Specificity(0,e,f,g)};var h=/^[0-9a-fA-F]$/,nonascii=/^[\u0080-\uFFFF]$/,nl=/\n|\r\n|\r|\f/;TokenStream.prototype=mix(new TokenStreamBase,{_getToken:function(a){var b,c=this._reader,d=null,e=c.getLine(),f=c.getCol();b=c.read();while(b){switch(b){case"/":c.peek()=="*"?d=this.commentToken(b,e,f):d=this.charToken(b,e,f);break;case"|":case"~":case"^":case"$":case"*":c.peek()=="="?d=this.comparisonToken(b,e,f):d=this.charToken(b,e,f);break;case'"':case"'":d=this.stringToken(b,e,f);break;case"#":isNameChar(c.peek())?d=this.hashToken(b,e,f):d=this.charToken(b,e,f);break;case".":isDigit(c.peek())?d=this.numberToken(b,e,f):d=this.charToken(b,e,f);break;case"-":c.peek()=="-"?d=this.htmlCommentEndToken(b,e,f):isNameStart(c.peek())?d=this.identOrFunctionToken(b,e,f):d=this.charToken(b,e,f);break;case"!":d=this.importantToken(b,e,f);break;case"@":d=this.atRuleToken(b,e,f);break;case":":d=this.notToken(b,e,f);break;case"<":d=this.htmlCommentStartToken(b,e,f);break;case"U":case"u":if(c.peek()=="+"){d=this.unicodeRangeToken(b,e,f);break};default:isDigit(b)?d=this.numberToken(b,e,f):isWhitespace(b)?d=this.whitespaceToken(b,e,f):isIdentStart(b)?d=this.identOrFunctionToken(b,e,f):d=this.charToken(b,e,f)}break}return!d&&b===null&&(d=this.createToken(Tokens.EOF,null,e,f)),d},createToken:function(a,b,c,d,e){var f=this._reader;return e=e||{},{value:b,type:a,channel:e.channel,hide:e.hide||!1,startLine:c,startCol:d,endLine:f.getLine(),endCol:f.getCol()}},atRuleToken:function(a,b,c){var d=a,e=this._reader,f=Tokens.CHAR,g=!1,h,i;e.mark(),h=this.readName(),d=a+h,f=Tokens.type(d.toLowerCase());if(f==Tokens.CHAR||f==Tokens.UNKNOWN)d.length>1?f=Tokens.UNKNOWN_SYM:(f=Tokens.CHAR,d=a,e.reset());return this.createToken(f,d,b,c)},charToken:function(a,b,c){var d=Tokens.type(a);return d==-1&&(d=Tokens.CHAR),this.createToken(d,a,b,c)},commentToken:function(a,b,c){var d=this._reader,e=this.readComment(a);return this.createToken(Tokens.COMMENT,e,b,c)},comparisonToken:function(a,b,c){var d=this._reader,e=a+d.read(),f=Tokens.type(e)||Tokens.CHAR;return this.createToken(f,e,b,c)},hashToken:function(a,b,c){var d=this._reader,e=this.readName(a);return this.createToken(Tokens.HASH,e,b,c)},htmlCommentStartToken:function(a,b,c){var d=this._reader,e=a;return d.mark(),e+=d.readCount(3),e=="<!--"?this.createToken(Tokens.CDO,e,b,c):(d.reset(),this.charToken(a,b,c))},htmlCommentEndToken:function(a,b,c){var d=this._reader,e=a;return d.mark(),e+=d.readCount(2),e=="-->"?this.createToken(Tokens.CDC,e,b,c):(d.reset(),this.charToken(a,b,c))},identOrFunctionToken:function(a,b,c){var d=this._reader,e=this.readName(a),f=Tokens.IDENT;return d.peek()=="("?(e+=d.read(),e.toLowerCase()=="url("?(f=Tokens.URI,e=this.readURI(e),e.toLowerCase()=="url("&&(f=Tokens.FUNCTION)):f=Tokens.FUNCTION):d.peek()==":"&&e.toLowerCase()=="progid"&&(e+=d.readTo("("),f=Tokens.IE_FUNCTION),this.createToken(f,e,b,c)},importantToken:function(a,b,c){var d=this._reader,e=a,f=Tokens.CHAR,g,h;d.mark(),h=d.read();while(h){if(h=="/"){if(d.peek()!="*")break;g=this.readComment(h);if(g==="")break}else{if(!isWhitespace(h)){if(/i/i.test(h)){g=d.readCount(8),/mportant/i.test(g)&&(e+=h+g,f=Tokens.IMPORTANT_SYM);break}break}e+=h+this.readWhitespace()}h=d.read()}return f==Tokens.CHAR?(d.reset(),this.charToken(a,b,c)):this.createToken(f,e,b,c)},notToken:function(a,b,c){var d=this._reader,e=a;return d.mark(),e+=d.readCount(4),e.toLowerCase()==":not("?this.createToken(Tokens.NOT,e,b,c):(d.reset(),this.charToken(a,b,c))},numberToken:function(a,b,c){var d=this._reader,e=this.readNumber(a),f,g=Tokens.NUMBER,h=d.peek();return isIdentStart(h)?(f=this.readName(d.read()),e+=f,/^em$|^ex$|^px$|^gd$|^rem$|^vw$|^vh$|^vm$|^ch$|^cm$|^mm$|^in$|^pt$|^pc$/i.test(f)?g=Tokens.LENGTH:/^deg|^rad$|^grad$/i.test(f)?g=Tokens.ANGLE:/^ms$|^s$/i.test(f)?g=Tokens.TIME:/^hz$|^khz$/i.test(f)?g=Tokens.FREQ:/^dpi$|^dpcm$/i.test(f)?g=Tokens.RESOLUTION:g=Tokens.DIMENSION):h=="%"&&(e+=d.read(),g=Tokens.PERCENTAGE),this.createToken(g,e,b,c)},stringToken:function(a,b,c){var d=a,e=a,f=this._reader,g=a,h=Tokens.STRING,i=f.read();while(i){e+=i;if(i==d&&g!="\\")break;if(isNewLine(f.peek())&&i!="\\"){h=Tokens.INVALID;break}g=i,i=f.read()}return i===null&&(h=Tokens.INVALID),this.createToken(h,e,b,c)},unicodeRangeToken:function(a,b,c){var d=this._reader,e=a,f,g=Tokens.CHAR;return d.peek()=="+"&&(d.mark(),e+=d.read(),e+=this.readUnicodeRangePart(!0),e.length==2?d.reset():(g=Tokens.UNICODE_RANGE,e.indexOf("?")==-1&&d.peek()=="-"&&(d.mark(),f=d.read(),f+=this.readUnicodeRangePart(!1),f.length==1?d.reset():e+=f))),this.createToken(g,e,b,c)},whitespaceToken:function(a,b,c){var d=this._reader,e=a+this.readWhitespace();return this.createToken(Tokens.S,e,b,c)},readUnicodeRangePart:function(a){var b=this._reader,c="",d=b.peek();while(isHexDigit(d)&&c.length<6)b.read(),c+=d,d=b.peek();if(a)while(d=="?"&&c.length<6)b.read(),c+=d,d=b.peek();return c},readWhitespace:function(){var a=this._reader,b="",c=a.peek();while(isWhitespace(c))a.read(),b+=c,c=a.peek();return b},readNumber:function(a){var b=this._reader,c=a,d=a==".",e=b.peek();while(e){if(isDigit(e))c+=b.read();else{if(e!=".")break;if(d)break;d=!0,c+=b.read()}e=b.peek()}return c},readString:function(){var a=this._reader,b=a.read(),c=b,d=b,e=a.peek();while(e){e=a.read(),c+=e;if(e==b&&d!="\\")break;if(isNewLine(a.peek())&&e!="\\"){c="";break}d=e,e=a.peek()}return e===null&&(c=""),c},readURI:function(a){var b=this._reader,c=a,d="",e=b.peek();b.mark();while(e&&isWhitespace(e))b.read(),e=b.peek();e=="'"||e=='"'?d=this.readString():d=this.readURL(),e=b.peek();while(e&&isWhitespace(e))b.read(),e=b.peek();return d===""||e!=")"?(c=a,b.reset()):c+=d+b.read(),c},readURL:function(){var a=this._reader,b="",c=a.peek();while(/^[!#$%&\\*-~]$/.test(c))b+=a.read(),c=a.peek();return b},readName:function(a){var b=this._reader,c=a||"",d=b.peek();for(;;)if(d=="\\")c+=this.readEscape(b.read()),d=b.peek();else{if(!d||!isNameChar(d))break;c+=b.read(),d=b.peek()}return c},readEscape:function(a){var b=this._reader,c=a||"",d=0,e=b.peek();if(isHexDigit(e))do c+=b.read(),e=b.peek();while(e&&isHexDigit(e)&&++d<6);return c.length==3&&/\s/.test(e)||c.length==7||c.length==1?b.read():e="",c+e},readComment:function(a){var b=this._reader,c=a||"",d=b.read();if(d=="*"){while(d){c+=d;if(c.length>2&&d=="*"&&b.peek()=="/"){c+=b.read();break}d=b.read()}return c}return""}});var Tokens=[{name:"CDO"},{name:"CDC"},{name:"S",whitespace:!0},{name:"COMMENT",comment:!0,hide:!0,channel:"comment"},{name:"INCLUDES",text:"~="},{name:"DASHMATCH",text:"|="},{name:"PREFIXMATCH",text:"^="},{name:"SUFFIXMATCH",text:"$="},{name:"SUBSTRINGMATCH",text:"*="},{name:"STRING"},{name:"IDENT"},{name:"HASH"},{name:"IMPORT_SYM",text:"@import"},{name:"PAGE_SYM",text:"@page"},{name:"MEDIA_SYM",text:"@media"},{name:"FONT_FACE_SYM",text:"@font-face"},{name:"CHARSET_SYM",text:"@charset"},{name:"NAMESPACE_SYM",text:"@namespace"},{name:"UNKNOWN_SYM"},{name:"KEYFRAMES_SYM",text:["@keyframes","@-webkit-keyframes","@-moz-keyframes","@-ms-keyframes"]},{name:"IMPORTANT_SYM"},{name:"LENGTH"},{name:"ANGLE"},{name:"TIME"},{name:"FREQ"},{name:"DIMENSION"},{name:"PERCENTAGE"},{name:"NUMBER"},{name:"URI"},{name:"FUNCTION"},{name:"UNICODE_RANGE"},{name:"INVALID"},{name:"PLUS",text:"+"},{name:"GREATER",text:">"},{name:"COMMA",text:","},{name:"TILDE",text:"~"},{name:"NOT"},{name:"TOPLEFTCORNER_SYM",text:"@top-left-corner"},{name:"TOPLEFT_SYM",text:"@top-left"},{name:"TOPCENTER_SYM",text:"@top-center"},{name:"TOPRIGHT_SYM",text:"@top-right"},{name:"TOPRIGHTCORNER_SYM",text:"@top-right-corner"},{name:"BOTTOMLEFTCORNER_SYM",text:"@bottom-left-corner"},{name:"BOTTOMLEFT_SYM",text:"@bottom-left"},{name:"BOTTOMCENTER_SYM",text:"@bottom-center"},{name:"BOTTOMRIGHT_SYM",text:"@bottom-right"},{name:"BOTTOMRIGHTCORNER_SYM",text:"@bottom-right-corner"},{name:"LEFTTOP_SYM",text:"@left-top"},{name:"LEFTMIDDLE_SYM",text:"@left-middle"},{name:"LEFTBOTTOM_SYM",text:"@left-bottom"},{name:"RIGHTTOP_SYM",text:"@right-top"},{name:"RIGHTMIDDLE_SYM",text:"@right-middle"},{name:"RIGHTBOTTOM_SYM",text:"@right-bottom"},{name:"RESOLUTION",state:"media"},{name:"IE_FUNCTION"},{name:"CHAR"},{name:"PIPE",text:"|"},{name:"SLASH",text:"/"},{name:"MINUS",text:"-"},{name:"STAR",text:"*"},{name:"LBRACE",text:"{"},{name:"RBRACE",text:"}"},{name:"LBRACKET",text:"["},{name:"RBRACKET",text:"]"},{name:"EQUALS",text:"="},{name:"COLON",text:":"},{name:"SEMICOLON",text:";"},{name:"LPAREN",text:"("},{name:"RPAREN",text:")"},{name:"DOT",text:"."}];(function(){var a=[],b={};Tokens.UNKNOWN=-1,Tokens.unshift({name:"EOF"});for(var c=0,d=Tokens.length;c<d;c++){a.push(Tokens[c].name),Tokens[Tokens[c].name]=c;if(Tokens[c].text)if(Tokens[c].text instanceof Array)for(var e=0;e<Tokens[c].text.length;e++)b[Tokens[c].text[e]]=c;else b[Tokens[c].text]=c}Tokens.name=function(b){return a[b]},Tokens.type=function(a){return b[a]||-1}})();var Validation={validate:function(a,b){var c=a.toString().toLowerCase(),d=b.parts,e=new PropertyValueIterator(b),f=Properties[c],g,h,i,j,k,l,m,n,o,p,q;if(!f){if(c.indexOf("-")!==0)throw new ValidationError("Unknown property '"+a+"'.",a.line,a.col)}else typeof f!="number"&&(typeof f=="string"?f.indexOf("||")>-1?this.groupProperty(f,e):this.singleProperty(f,e,1):f.multi?this.multiProperty(f.multi,e,f.comma,f.max||Infinity):typeof f=="function"&&f(e))},singleProperty:function(a,b,c,d){var e=!1,f=b.value,g=0,h;while(b.hasNext()&&g<c){e=ValidationTypes.isAny(b,a);if(!e)break;g++}if(!e)throw b.hasNext()&&!b.isFirst()?(h=b.peek(),new ValidationError("Expected end of value but found '"+h+"'.",h.line,h.col)):new ValidationError("Expected ("+a+") but found '"+f+"'.",f.line,f.col);if(b.hasNext())throw h=b.next(),new ValidationError("Expected end of value but found '"+h+"'.",h.line,h.col)},multiProperty:function(a,b,c,d){var e=!1,f=b.value,g=0,h=!1,i;while(b.hasNext()&&!e&&g<d){if(!ValidationTypes.isAny(b,a))break;g++;if(!b.hasNext())e=!0;else if(c){if(b.peek()!=",")break;i=b.next()}}if(!e)throw b.hasNext()&&!b.isFirst()?(i=b.peek(),new ValidationError("Expected end of value but found '"+i+"'.",i.line,i.col)):(i=b.previous(),c&&i==","?new ValidationError("Expected end of value but found '"+i+"'.",i.line,i.col):new ValidationError("Expected ("+a+") but found '"+f+"'.",f.line,f.col));if(b.hasNext())throw i=b.next(),new ValidationError("Expected end of value but found '"+i+"'.",i.line,i.col)},groupProperty:function(a,b,c){var d=!1,e=b.value,f=a.split("||").length,g={count:0},h=!1,i,j;while(b.hasNext()&&!d){i=ValidationTypes.isAnyOfGroup(b,a);if(!i)break;if(g[i])break;g[i]=1,g.count++,h=!0;if(g.count==f||!b.hasNext())d=!0}if(!d)throw h&&b.hasNext()?(j=b.peek(),new ValidationError("Expected end of value but found '"+j+"'.",j.line,j.col)):new ValidationError("Expected ("+a+") but found '"+e+"'.",e.line,e.col);if(b.hasNext())throw j=b.next(),new ValidationError("Expected end of value but found '"+j+"'.",j.line,j.col)}};ValidationError.prototype=new Error;var ValidationTypes={isLiteral:function(a,b){var c=a.text.toString().toLowerCase(),d=b.split(" | "),e,f,g=!1;for(e=0,f=d.length;e<f&&!g;e++)c==d[e]&&(g=!0);return g},isSimple:function(a){return!!this.simple[a]},isComplex:function(a){return!!this.complex[a]},isAny:function(a,b){var c=b.split(" | "),d,e,f=!1;for(d=0,e=c.length;d<e&&!f&&a.hasNext();d++)f=this.isType(a,c[d]);return f},isAnyOfGroup:function(a,b){var c=b.split(" || "),d,e,f=!1;for(d=0,e=c.length;d<e&&!f;d++)f=this.isType(a,c[d]);return f?c[d-1]:!1},isType:function(a,b){var c=a.peek(),d=!1;return b.charAt(0)!="<"?(d=this.isLiteral(c,b),d&&a.next()):this.simple[b]?(d=this.simple[b](c),d&&a.next()):d=this.complex[b](a),d},simple:{"<absolute-size>":function(a){return ValidationTypes.isLiteral(a,"xx-small | x-small | small | medium | large | x-large | xx-large")},"<attachment>":function(a){return ValidationTypes.isLiteral(a,"scroll | fixed | local")},"<attr>":function(a){return a.type=="function"&&a.name=="attr"},"<bg-image>":function(a){return this["<image>"](a)||this["<gradient>"](a)||a=="none"},"<gradient>":function(a){return a.type=="function"&&/^(?:\-(?:ms|moz|o|webkit)\-)?(?:repeating\-)?(?:radial|linear)\-gradient/i.test(a)},"<box>":function(a){return ValidationTypes.isLiteral(a,"padding-box | border-box | content-box")},"<content>":function(a){return a.type=="function"&&a.name=="content"},"<relative-size>":function(a){return ValidationTypes.isLiteral(a,"smaller | larger")},"<ident>":function(a){return a.type=="identifier"},"<length>":function(a){return a.type=="length"||a.type=="number"||a.type=="integer"||a=="0"},"<color>":function(a){return a.type=="color"||a=="transparent"},"<number>":function(a){return a.type=="number"||this["<integer>"](a)},"<integer>":function(a){return a.type=="integer"},"<line>":function(a){return a.type=="integer"},"<angle>":function(a){return a.type=="angle"},"<uri>":function(a){return a.type=="uri"},"<image>":function(a){return this["<uri>"](a)},"<percentage>":function(a){return a.type=="percentage"||a=="0"},"<border-width>":function(a){return this["<length>"](a)||ValidationTypes.isLiteral(a,"thin | medium | thick")},"<border-style>":function(a){return ValidationTypes.isLiteral(a,"none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset")},"<margin-width>":function(a){return this["<length>"](a)||this["<percentage>"](a)||ValidationTypes.isLiteral(a,"auto")},"<padding-width>":function(a){return this["<length>"](a)||this["<percentage>"](a)},"<shape>":function(a){return a.type=="function"&&(a.name=="rect"||a.name=="inset-rect")},"<time>":function(a){return a.type=="time"}},complex:{"<bg-position>":function(a){var b=this,c=!1,d="<percentage> | <length>",e="left | center | right",f="top | center | bottom",g,h,i;return ValidationTypes.isAny(a,"top | bottom")?c=!0:ValidationTypes.isAny(a,d)?a.hasNext()&&(c=ValidationTypes.isAny(a,d+" | "+f)):ValidationTypes.isAny(a,e)&&a.hasNext()&&(ValidationTypes.isAny(a,f)?(c=!0,ValidationTypes.isAny(a,d)):ValidationTypes.isAny(a,d)&&(ValidationTypes.isAny(a,f)&&ValidationTypes.isAny(a,d),c=!0)),c},"<bg-size>":function(a){var b=this,c=!1,d="<percentage> | <length> | auto",e,f,g;return ValidationTypes.isAny(a,"cover | contain")?c=!0:ValidationTypes.isAny(a,d)&&(c=!0,ValidationTypes.isAny(a,d)),c},"<repeat-style>":function(a){var b=!1,c="repeat | space | round | no-repeat",d;return a.hasNext()&&(d=a.next(),ValidationTypes.isLiteral(d,"repeat-x | repeat-y")?b=!0:ValidationTypes.isLiteral(d,c)&&(b=!0,a.hasNext()&&ValidationTypes.isLiteral(a.peek(),c)&&a.next())),b},"<shadow>":function(a){var b=!1,c=0,d=!1,e=!1,f;if(a.hasNext()){ValidationTypes.isAny(a,"inset")&&(d=!0),ValidationTypes.isAny(a,"<color>")&&(e=!0);while(ValidationTypes.isAny(a,"<length>")&&c<4)c++;a.hasNext()&&(e||ValidationTypes.isAny(a,"<color>"),d||ValidationTypes.isAny(a,"inset")),b=c>=2&&c<=4}return b},"<x-one-radius>":function(a){var b=!1,c=0,d="<length> | <percentage>",e;return ValidationTypes.isAny(a,d)&&(b=!0,ValidationTypes.isAny(a,d)),b}}};parserlib.css={Colors:Colors,Combinator:Combinator,Parser:Parser,PropertyName:PropertyName,PropertyValue:PropertyValue,PropertyValuePart:PropertyValuePart,MediaFeature:MediaFeature,MediaQuery:MediaQuery,Selector:Selector,SelectorPart:SelectorPart,SelectorSubPart:SelectorSubPart,Specificity:Specificity,TokenStream:TokenStream,Tokens:Tokens,ValidationError:ValidationError}}();var CSSLint=function(){var a=[],b=[],c=new parserlib.util.EventTarget;return c.version="0.9.7",c.addRule=function(b){a.push(b),a[b.id]=b},c.clearRules=function(){a=[]},c.getRules=function(){return[].concat(a).sort(function(a,b){return a.id>b.id?1:0})},c.addFormatter=function(a){b[a.id]=a},c.getFormatter=function(a){return b[a]},c.format=function(a,b,c,d){var e=this.getFormatter(c),f=null;return e&&(f=e.startFormat(),f+=e.formatResults(a,b,d||{}),f+=e.endFormat()),f},c.hasFormat=function(a){return b.hasOwnProperty(a)},c.verify=function(b,c){var d=0,e=a.length,f,g,h,i=new parserlib.css.Parser({starHack:!0,ieFilters:!0,underscoreHack:!0,strict:!1});g=b.replace(/\n\r?/g,"$split$").split("$split$");if(!c){c={};while(d<e)c[a[d++].id]=1}f=new Reporter(g,c),c.errors=2;for(d in c)c.hasOwnProperty(d)&&a[d]&&a[d].init(i,f);try{i.parse(b)}catch(j){f.error("Fatal error, cannot continue: "+j.message,j.line,j.col,{})}return h={messages:f.messages,stats:f.stats},h.messages.sort(function(a,b){return a.rollup&&!b.rollup?1:!a.rollup&&b.rollup?-1:a.line-b.line}),h},c}();Reporter.prototype={constructor:Reporter,error:function(a,b,c,d){this.messages.push({type:"error",line:b,col:c,message:a,evidence:this.lines[b-1],rule:d||{}})},warn:function(a,b,c,d){this.report(a,b,c,d)},report:function(a,b,c,d){this.messages.push({type:this.ruleset[d.id]==2?"error":"warning",line:b,col:c,message:a,evidence:this.lines[b-1],rule:d})},info:function(a,b,c,d){this.messages.push({type:"info",line:b,col:c,message:a,evidence:this.lines[b-1],rule:d})},rollupError:function(a,b){this.messages.push({type:"error",rollup:!0,message:a,rule:b})},rollupWarn:function(a,b){this.messages.push({type:"warning",rollup:!0,message:a,rule:b})},stat:function(a,b){this.stats[a]=b}},CSSLint._Reporter=Reporter,CSSLint.Util={mix:function(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return c},indexOf:function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},forEach:function(a,b){if(a.forEach)return a.forEach(b);for(var c=0,d=a.length;c<d;c++)b(a[c],c,a)}},CSSLint.addRule({id:"adjoining-classes",name:"Disallow adjoining classes",desc:"Don't use adjoining classes.",browsers:"IE6",init:function(a,b){var c=this;a.addListener("startrule",function(d){var e=d.selectors,f,g,h,i,j,k,l;for(j=0;j<e.length;j++){f=e[j];for(k=0;k<f.parts.length;k++){g=f.parts[k];if(g.type==a.SELECTOR_PART_TYPE){i=0;for(l=0;l<g.modifiers.length;l++)h=g.modifiers[l],h.type=="class"&&i++,i>1&&b.report("Don't use adjoining classes.",g.line,g.col,c)}}}})}}),CSSLint.addRule({id:"box-model",name:"Beware of broken box size",desc:"Don't use width or height when using padding or border.",browsers:"All",init:function(a,b){function g(){f={}}function h(){var a;if(f.height)for(a in e)e.hasOwnProperty(a)&&f[a]&&(a!="padding"||f[a].value.parts.length!==2||f[a].value.parts[0].value!==0)&&b.report("Using height with "+a+" can sometimes make elements larger than you expect.",f[a].line,f[a].col,c);if(f.width)for(a in d)d.hasOwnProperty(a)&&f[a]&&(a!="padding"||f[a].value.parts.length!==2||f[a].value.parts[1].value!==0)&&b.report("Using width with "+a+" can sometimes make elements larger than you expect.",f[a].line,f[a].col,c)}var c=this,d={border:1,"border-left":1,"border-right":1,padding:1,"padding-left":1,"padding-right":1},e={border:1,"border-bottom":1,"border-top":1,padding:1,"padding-bottom":1,"padding-top":1},f;a.addListener("startrule",g),a.addListener("startfontface",g),a.addListener("startpage",g),a.addListener("startpagemargin",g),a.addListener("startkeyframerule",g),a.addListener("property",function(a){var b=a.property.text.toLowerCase();if(e[b]||d[b])!/^0\S*$/.test(a.value)&&(b!="border"||a.value!="none")&&(f[b]={line:a.property.line,col:a.property.col,value:a.value});else if(b=="width"||b=="height")f[b]=1}),a.addListener("endrule",h),a.addListener("endfontface",h),a.addListener("endpage",h),a.addListener("endpagemargin",h),a.addListener("endkeyframerule",h)}}),CSSLint.addRule({id:"box-sizing",name:"Disallow use of box-sizing",desc:"The box-sizing properties isn't supported in IE6 and IE7.",browsers:"IE6, IE7",tags:["Compatibility"],init:function(a,b){var c=this;a.addListener("property",function(a){var d=a.property.text.toLowerCase();d=="box-sizing"&&b.report("The box-sizing property isn't supported in IE6 and IE7.",a.line,a.col,c)})}}),CSSLint.addRule({id:"compatible-vendor-prefixes",name:"Require compatible vendor prefixes",desc:"Include all compatible vendor prefixes to reach a wider range of users.",browsers:"All",init:function(a,b){var c=this,d,e,f,g,h,i,j,k=Array.prototype.push,l=[];d={animation:"webkit moz ms","animation-delay":"webkit moz ms","animation-direction":"webkit moz ms","animation-duration":"webkit moz ms","animation-fill-mode":"webkit moz ms","animation-iteration-count":"webkit moz ms","animation-name":"webkit moz ms","animation-play-state":"webkit moz ms","animation-timing-function":"webkit moz ms",appearance:"webkit moz","border-end":"webkit moz","border-end-color":"webkit moz","border-end-style":"webkit moz","border-end-width":"webkit moz","border-image":"webkit moz o","border-radius":"webkit moz","border-start":"webkit moz","border-start-color":"webkit moz","border-start-style":"webkit moz","border-start-width":"webkit moz","box-align":"webkit moz ms","box-direction":"webkit moz ms","box-flex":"webkit moz ms","box-lines":"webkit ms","box-ordinal-group":"webkit moz ms","box-orient":"webkit moz ms","box-pack":"webkit moz ms","box-sizing":"webkit moz","box-shadow":"webkit moz","column-count":"webkit moz ms","column-gap":"webkit moz ms","column-rule":"webkit moz ms","column-rule-color":"webkit moz ms","column-rule-style":"webkit moz ms","column-rule-width":"webkit moz ms","column-width":"webkit moz ms",hyphens:"epub moz","line-break":"webkit ms","margin-end":"webkit moz","margin-start":"webkit moz","marquee-speed":"webkit wap","marquee-style":"webkit wap","padding-end":"webkit moz","padding-start":"webkit moz","tab-size":"moz o","text-size-adjust":"webkit ms",transform:"webkit moz ms o","transform-origin":"webkit moz ms o",transition:"webkit moz o ms","transition-delay":"webkit moz o ms","transition-duration":"webkit moz o ms","transition-property":"webkit moz o ms","transition-timing-function":"webkit moz o ms","user-modify":"webkit moz","user-select":"webkit moz ms","word-break":"epub ms","writing-mode":"epub ms"};for(f in d)if(d.hasOwnProperty(f)){g=[],h=d[f].split(" ");for(i=0,j=h.length;i<j;i++)g.push("-"+h[i]+"-"+f);d[f]=g,k.apply(l,g)}a.addListener("startrule",function(){e=[]}),a.addListener("property",function(a){var b=a.property;CSSLint.Util.indexOf(l,b.text)>-1&&e.push(b)}),a.addListener("endrule",function(a){if(!e.length)return;var f={},g,h,i,j,k,l,m,n,o,p;for(g=0,h=e.length;g<h;g++){i=e[g];for(j in d)d.hasOwnProperty(j)&&(k=d[j],CSSLint.Util.indexOf(k,i.text)>-1&&(f[j]||(f[j]={full:k.slice(0),actual:[],actualNodes:[]}),CSSLint.Util.indexOf(f[j].actual,i.text)===-1&&(f[j].actual.push(i.text),f[j].actualNodes.push(i))))}for(j in f)if(f.hasOwnProperty(j)){l=f[j],m=l.full,n=l.actual;if(m.length>n.length)for(g=0,h=m.length;g<h;g++)o=m[g],CSSLint.Util.indexOf(n,o)===-1&&(p=n.length===1?n[0]:n.length==2?n.join(" and "):n.join(", "),b.report("The property "+o+" is compatible with "+p+" and should be included as well.",l.actualNodes[0].line,l.actualNodes[0].col,c))}})}}),CSSLint.addRule({id:"display-property-grouping",name:"Require properties appropriate for display",desc:"Certain properties shouldn't be used with certain display property values.",browsers:"All",init:function(a,b){function f(a,f,g){e[a]&&(typeof d[a]!="string"||e[a].value.toLowerCase()!=d[a])&&b.report(g||a+" can't be used with display: "+f+".",e[a].line,e[a].col,c)}function g(){e={}}function h(){var a=e.display?e.display.value:null;if(a)switch(a){case"inline":f("height",a),f("width",a),f("margin",a),f("margin-top",a),f("margin-bottom",a),f("float",a,"display:inline has no effect on floated elements (but may be used to fix the IE6 double-margin bug).");break;case"block":f("vertical-align",a);break;case"inline-block":f("float",a);break;default:a.indexOf("table-")===0&&(f("margin",a),f("margin-left",a),f("margin-right",a),f("margin-top",a),f("margin-bottom",a),f("float",a))}}var c=this,d={display:1,"float":"none",height:1,width:1,margin:1,"margin-left":1,"margin-right":1,"margin-bottom":1,"margin-top":1,padding:1,"padding-left":1,"padding-right":1,"padding-bottom":1,"padding-top":1,"vertical-align":1},e;a.addListener("startrule",g),a.addListener("startfontface",g),a.addListener("startkeyframerule",g),a.addListener("startpagemargin",g),a.addListener("startpage",g),a.addListener("property",function(a){var b=a.property.text.toLowerCase();d[b]&&(e[b]={value:a.value.text,line:a.property.line,col:a.property.col})}),a.addListener("endrule",h),a.addListener("endfontface",h),a.addListener("endkeyframerule",h),a.addListener("endpagemargin",h),a.addListener("endpage",h)}}),CSSLint.addRule({id:"duplicate-background-images",name:"Disallow duplicate background images",desc:"Every background-image should be unique. Use a common class for e.g. sprites.",browsers:"All",init:function(a,b){var c=this,d={};a.addListener("property",function(a){var e=a.property.text,f=a.value,g,h;if(e.match(/background/i))for(g=0,h=f.parts.length;g<h;g++)f.parts[g].type=="uri"&&(typeof d[f.parts[g].uri]=="undefined"?d[f.parts[g].uri]=a:b.report("Background image '"+f.parts[g].uri+"' was used multiple times, first declared at line "+d[f.parts[g].uri].line+", col "+d[f.parts[g].uri].col+".",a.line,a.col,c))})}}),CSSLint.addRule({id:"duplicate-properties",name:"Disallow duplicate properties",desc:"Duplicate properties must appear one after the other.",browsers:"All",init:function(a,b){function f(a){d={}}var c=this,d,e;a.addListener("startrule",f),a.addListener("startfontface",f),a.addListener("startpage",f),a.addListener("startpagemargin",f),a.addListener("startkeyframerule",f),a.addListener("property",function(a){var f=a.property,g=f.text.toLowerCase();d[g]&&(e!=g||d[g]==a.value.text)&&b.report("Duplicate property '"+a.property+"' found.",a.line,a.col,c),d[g]=a.value.text,e=g})}}),CSSLint.addRule({id:"empty-rules",name:"Disallow empty rules",desc:"Rules without any properties specified should be removed.",browsers:"All",init:function(a,b){var c=this,d=0;a.addListener("startrule",function(){d=0}),a.addListener("property",function(){d++}),a.addListener("endrule",function(a){var e=a.selectors;d===0&&b.report("Rule is empty.",e[0].line,e[0].col,c)})}}),CSSLint.addRule({id:"errors",name:"Parsing Errors",desc:"This rule looks for recoverable syntax errors.",browsers:"All",init:function(a,b){var c=this;a.addListener("error",function(a){b.error(a.message,a.line,a.col,c)})}}),CSSLint.addRule({id:"fallback-colors",name:"Require fallback colors",desc:"For older browsers that don't support RGBA, HSL, or HSLA, provide a fallback color.",browsers:"IE6,IE7,IE8",init:function(a,b){function g(a){f={},d=null}var c=this,d,e={color:1,background:1,"background-color":1},f;a.addListener("startrule",g),a.addListener("startfontface",g),a.addListener("startpage",g),a.addListener("startpagemargin",g),a.addListener("startkeyframerule",g),a.addListener("property",function(a){var f=a.property,g=f.text.toLowerCase(),h=a.value.parts,i=0,j="",k=h.length;if(e[g])while(i<k)h[i].type=="color"&&("alpha"in h[i]||"hue"in h[i]?(/([^\)]+)\(/.test(h[i])&&(j=RegExp.$1.toUpperCase()),(!d||d.property.text.toLowerCase()!=g||d.colorType!="compat")&&b.report("Fallback "+g+" (hex or RGB) should precede "+j+" "+g+".",a.line,a.col,c)):a.colorType="compat"),i++;d=a})}}),CSSLint.addRule({id:"floats",name:"Disallow too many floats",desc:"This rule tests if the float property is used too many times",browsers:"All",init:function(a,b){var c=this,d=0;a.addListener("property",function(a){a.property.text.toLowerCase()=="float"&&a.value.text.toLowerCase()!="none"&&d++}),a.addListener("endstylesheet",function(){b.stat("floats",d),d>=10&&b.rollupWarn("Too many floats ("+d+"), you're probably using them for layout. Consider using a grid system instead.",c)})}}),CSSLint.addRule({id:"font-faces",name:"Don't use too many web fonts",desc:"Too many different web fonts in the same stylesheet.",browsers:"All",init:function(a,b){var c=this,d=0;a.addListener("startfontface",function(){d++}),a.addListener("endstylesheet",function(){d>5&&b.rollupWarn("Too many @font-face declarations ("+d+").",c)})}}),CSSLint.addRule({id:"font-sizes",name:"Disallow too many font sizes",desc:"Checks the number of font-size declarations.",browsers:"All",init:function(a,b){var c=this,d=0;a.addListener("property",function(a){a.property=="font-size"&&d++}),a.addListener("endstylesheet",function(){b.stat("font-sizes",d),d>=10&&b.rollupWarn("Too many font-size declarations ("+d+"), abstraction needed.",c)})}}),CSSLint.addRule({id:"gradients",name:"Require all gradient definitions",desc:"When using a vendor-prefixed gradient, make sure to use them all.",browsers:"All",init:function(a,b){var c=this,d;a.addListener("startrule",function(){d={moz:0,webkit:0,oldWebkit:0,ms:0,o:0}}),a.addListener("property",function(a){/\-(moz|ms|o|webkit)(?:\-(?:linear|radial))\-gradient/i.test(a.value)?d[RegExp.$1]=1:/\-webkit\-gradient/i.test(a.value)&&(d.oldWebkit=1)}),a.addListener("endrule",function(a){var e=[];d.moz||e.push("Firefox 3.6+"),d.webkit||e.push("Webkit (Safari 5+, Chrome)"),d.oldWebkit||e.push("Old Webkit (Safari 4+, Chrome)"),d.ms||e.push("Internet Explorer 10+"),d.o||e.push("Opera 11.1+"),e.length&&e.length<5&&b.report("Missing vendor-prefixed CSS gradients for "+e.join(", ")+".",a.selectors[0].line,a.selectors[0].col,c)})}}),CSSLint.addRule({id:"ids",name:"Disallow IDs in selectors",desc:"Selectors should not contain IDs.",browsers:"All",init:function(a,b){var c=this;a.addListener("startrule",function(d){var e=d.selectors,f,g,h,i,j,k,l;for(j=0;j<e.length;j++){f=e[j],i=0;for(k=0;k<f.parts.length;k++){g=f.parts[k];if(g.type==a.SELECTOR_PART_TYPE)for(l=0;l<g.modifiers.length;l++)h=g.modifiers[l],h.type=="id"&&i++}i==1?b.report("Don't use IDs in selectors.",f.line,f.col,c):i>1&&b.report(i+" IDs in the selector, really?",f.line,f.col,c)}})}}),CSSLint.addRule({id:"import",name:"Disallow @import",desc:"Don't use @import, use <link> instead.",browsers:"All",init:function(a,b){var c=this;a.addListener("import",function(a){b.report("@import prevents parallel downloads, use <link> instead.",a.line,a.col,c)})}}),CSSLint.addRule({id:"important",name:"Disallow !important",desc:"Be careful when using !important declaration",browsers:"All",init:function(a,b){var c=this,d=0;a.addListener("property",function(a){a.important===!0&&(d++,b.report("Use of !important",a.line,a.col,c))}),a.addListener("endstylesheet",function(){b.stat("important",d),d>=10&&b.rollupWarn("Too many !important declarations ("+d+"), try to use less than 10 to avoid specifity issues.",c)})}}),CSSLint.addRule({id:"known-properties",name:"Require use of known properties",desc:"Properties should be known (listed in CSS specification) or be a vendor-prefixed property.",browsers:"All",init:function(a,b){var c=this,d={"alignment-adjust":1,"alignment-baseline":1,animation:1,"animation-delay":1,"animation-direction":1,"animation-duration":1,"animation-fill-mode":1,"animation-iteration-count":1,"animation-name":1,"animation-play-state":1,"animation-timing-function":1,appearance:1,azimuth:1,"backface-visibility":1,background:1,"background-attachment":1,"background-break":1,"background-clip":1,"background-color":1,"background-image":1,"background-origin":1,"background-position":1,"background-repeat":1,"background-size":1,"baseline-shift":1,binding:1,bleed:1,"bookmark-label":1,"bookmark-level":1,"bookmark-state":1,"bookmark-target":1,border:1,"border-bottom":1,"border-bottom-color":1,"border-bottom-left-radius":1,"border-bottom-right-radius":1,"border-bottom-style":1,"border-bottom-width":1,"border-collapse":1,"border-color":1,"border-image":1,"border-image-outset":1,"border-image-repeat":1,"border-image-slice":1,"border-image-source":1,"border-image-width":1,"border-left":1,"border-left-color":1,"border-left-style":1,"border-left-width":1,"border-radius":1,"border-right":1,"border-right-color":1,"border-right-style":1,"border-right-width":1,"border-spacing":1,"border-style":1,"border-top":1,"border-top-color":1,"border-top-left-radius":1,"border-top-right-radius":1,"border-top-style":1,"border-top-width":1,"border-width":1,bottom:1,"box-align":1,"box-decoration-break":1,"box-direction":1,"box-flex":1,"box-flex-group":1,"box-lines":1,"box-ordinal-group":1,"box-orient":1,"box-pack":1,"box-shadow":1,"box-sizing":1,"break-after":1,"break-before":1,"break-inside":1,"caption-side":1,clear:1,clip:1,color:1,"color-profile":1,"column-count":1,"column-fill":1,"column-gap":1,"column-rule":1,"column-rule-color":1,"column-rule-style":1,"column-rule-width":1,"column-span":1,"column-width":1,columns:1,content:1,"counter-increment":1,"counter-reset":1,crop:1,cue:1,"cue-after":1,"cue-before":1,cursor:1,direction:1,display:1,"dominant-baseline":1,"drop-initial-after-adjust":1,"drop-initial-after-align":1,"drop-initial-before-adjust":1,"drop-initial-before-align":1,"drop-initial-size":1,"drop-initial-value":1,elevation:1,"empty-cells":1,fit:1,"fit-position":1,"float":1,"float-offset":1,font:1,"font-family":1,"font-size":1,"font-size-adjust":1,"font-stretch":1,"font-style":1,"font-variant":1,"font-weight":1,"grid-columns":1,"grid-rows":1,"hanging-punctuation":1,height:1,"hyphenate-after":1,"hyphenate-before":1,"hyphenate-character":1,"hyphenate-lines":1,"hyphenate-resource":1,hyphens:1,icon:1,"image-orientation":1,"image-rendering":1,"image-resolution":1,"inline-box-align":1,left:1,"letter-spacing":1,"line-height":1,"line-stacking":1,"line-stacking-ruby":1,"line-stacking-shift":1,"line-stacking-strategy":1,"list-style":1,"list-style-image":1,"list-style-position":1,"list-style-type":1,margin:1,"margin-bottom":1,"margin-left":1,"margin-right":1,"margin-top":1,mark:1,"mark-after":1,"mark-before":1,marks:1,"marquee-direction":1,"marquee-play-count":1,"marquee-speed":1,"marquee-style":1,"max-height":1,"max-width":1,"min-height":1,"min-width":1,"move-to":1,"nav-down":1,"nav-index":1,"nav-left":1,"nav-right":1,"nav-up":1,opacity:1,orphans:1,outline:1,"outline-color":1,"outline-offset":1,"outline-style":1,"outline-width":1,overflow:1,"overflow-style":1,"overflow-x":1,"overflow-y":1,padding:1,"padding-bottom":1,"padding-left":1,"padding-right":1,"padding-top":1,page:1,"page-break-after":1,"page-break-before":1,"page-break-inside":1,"page-policy":1,pause:1,"pause-after":1,"pause-before":1,perspective:1,"perspective-origin":1,phonemes:1,pitch:1,"pitch-range":1,"play-during":1,position:1,"presentation-level":1,"punctuation-trim":1,quotes:1,"rendering-intent":1,resize:1,rest:1,"rest-after":1,"rest-before":1,richness:1,right:1,rotation:1,"rotation-point":1,"ruby-align":1,"ruby-overhang":1,"ruby-position":1,"ruby-span":1,size:1,speak:1,"speak-header":1,"speak-numeral":1,"speak-punctuation":1,"speech-rate":1,stress:1,"string-set":1,"table-layout":1,target:1,"target-name":1,"target-new":1,"target-position":1,"text-align":1,"text-align-last":1,"text-decoration":1,"text-emphasis":1,"text-height":1,"text-indent":1,"text-justify":1,"text-outline":1,"text-shadow":1,"text-transform":1,"text-wrap":1,top:1,transform:1,"transform-origin":1,"transform-style":1,transition:1,"transition-delay":1,"transition-duration":1,"transition-property":1,"transition-timing-function":1,"unicode-bidi":1,"user-modify":1,"user-select":1,"vertical-align":1,visibility:1,"voice-balance":1,"voice-duration":1,"voice-family":1,"voice-pitch":1,"voice-pitch-range":1,"voice-rate":1,"voice-stress":1,"voice-volume":1,volume:1,"white-space":1,"white-space-collapse":1,widows:1,width:1,"word-break":1,"word-spacing":1,"word-wrap":1,"z-index":1,filter:1,zoom:1,src:1};a.addListener("property",function(a){var d=a.property.text.toLowerCase();a.invalid&&b.report(a.invalid.message,a.line,a.col,c)})}}),CSSLint.addRule({id:"outline-none",name:"Disallow outline: none",desc:"Use of outline: none or outline: 0 should be limited to :focus rules.",browsers:"All",tags:["Accessibility"],init:function(a,b){function e(a){a.selectors?d={line:a.line,col:a.col,selectors:a.selectors,propCount:0,outline:!1}:d=null}function f(a){d&&d.outline&&(d.selectors.toString().toLowerCase().indexOf(":focus")==-1?b.report("Outlines should only be modified using :focus.",d.line,d.col,c):d.propCount==1&&b.report("Outlines shouldn't be hidden unless other visual changes are made.",d.line,d.col,c))}var c=this,d;a.addListener("startrule",e),a.addListener("startfontface",e),a.addListener("startpage",e),a.addListener("startpagemargin",e),a.addListener("startkeyframerule",e),a.addListener("property",function(a){var b=a.property.text.toLowerCase(),c=a.value;d&&(d.propCount++,b=="outline"&&(c=="none"||c=="0")&&(d.outline=!0))}),a.addListener("endrule",f),a.addListener("endfontface",f),a.addListener("endpage",f),a.addListener("endpagemargin",f),a.addListener("endkeyframerule",f)}}),CSSLint.addRule({id:"overqualified-elements",name:"Disallow overqualified elements",desc:"Don't use classes or IDs with elements (a.foo or a#foo).",browsers:"All",init:function(a,b){var c=this,d={};a.addListener("startrule",function(e){var f=e.selectors,g,h,i,j,k,l;for(j=0;j<f.length;j++){g=f[j];for(k=0;k<g.parts.length;k++){h=g.parts[k];if(h.type==a.SELECTOR_PART_TYPE)for(l=0;l<h.modifiers.length;l++)i=h.modifiers[l],h.elementName&&i.type=="id"?b.report("Element ("+h+") is overqualified, just use "+i+" without element name.",h.line,h.col,c):i.type=="class"&&(d[i]||(d[i]=[]),d[i].push({modifier:i,part:h}))}}}),a.addListener("endstylesheet",function(){var a;for(a in d)d.hasOwnProperty(a)&&d[a].length==1&&d[a][0].part.elementName&&b.report("Element ("+d[a][0].part+") is overqualified, just use "+d[a][0].modifier+" without element name.",d[a][0].part.line,d[a][0].part.col,c)})}}),CSSLint.addRule({id:"qualified-headings",name:"Disallow qualified headings",desc:"Headings should not be qualified (namespaced).",browsers:"All",init:function(a,b){var c=this;a.addListener("startrule",function(d){var e=d.selectors,f,g,h,i;for(h=0;h<e.length;h++){f=e[h];for(i=0;i<f.parts.length;i++)g=f.parts[i],g.type==a.SELECTOR_PART_TYPE&&g.elementName&&/h[1-6]/.test(g.elementName.toString())&&i>0&&b.report("Heading ("+g.elementName+") should not be qualified.",g.line,g.col,c)}})}}),CSSLint.addRule({id:"regex-selectors",name:"Disallow selectors that look like regexs",desc:"Selectors that look like regular expressions are slow and should be avoided.",browsers:"All",init:function(a,b){var c=this;a.addListener("startrule",function(d){var e=d.selectors,f,g,h,i,j,k;for(i=0;i<e.length;i++){f=e[i];for(j=0;j<f.parts.length;j++){g=f.parts[j];if(g.type==a.SELECTOR_PART_TYPE)for(k=0;k<g.modifiers.length;k++)h=g.modifiers[k],h.type=="attribute"&&/([\~\|\^\$\*]=)/.test(h)&&b.report("Attribute selectors with "+RegExp.$1+" are slow!",h.line,h.col,c)}}})}}),CSSLint.addRule({id:"rules-count",name:"Rules Count",desc:"Track how many rules there are.",browsers:"All",init:function(a,b){var c=this,d=0;a.addListener("startrule",function(){d++}),a.addListener("endstylesheet",function(){b.stat("rule-count",d)})}}),CSSLint.addRule({id:"shorthand",name:"Require shorthand properties",desc:"Use shorthand properties where possible.",browsers:"All",init:function(a,b){function j(a){h={}}function k(a){var d,e,f,g;for(d in i)if(i.hasOwnProperty(d)){g=0;for(e=0,f=i[d].length;e<f;e++)g+=h[i[d][e]]?1:0;g==i[d].length&&b.report("The properties "+i[d].join(", ")+" can be replaced by "+d+".",a.line,a.col,c)}}var c=this,d,e,f,g={},h,i={margin:["margin-top","margin-bottom","margin-left","margin-right"],padding:["padding-top","padding-bottom","padding-left","padding-right"]};for(d in i)if(i.hasOwnProperty(d))for(e=0,f=i[d].length;e<f;e++)g[i[d][e]]=d;a.addListener("startrule",j),a.addListener("startfontface",j),a.addListener("property",function(a){var b=a.property.toString().toLowerCase(),c=a.value.parts[0].value;g[b]&&(h[b]=1)}),a.addListener("endrule",k),a.addListener("endfontface",k)}}),CSSLint.addRule({id:"text-indent",name:"Disallow negative text-indent",desc:"Checks for text indent less than -99px",browsers:"All",init:function(a,b){function e(a){d=!1}function f(a){d&&b.report("Negative text-indent doesn't work well with RTL. If you use text-indent for image replacement explicitly set direction for that item to ltr.",d.line,d.col,c)}var c=this,d=!1;a.addListener("startrule",e),a.addListener("startfontface",e),a.addListener("property",function(a){var b=a.property.toString().toLowerCase(),c=a.value;b=="text-indent"&&c.parts[0].value<-99?d=a.property:b=="direction"&&c=="ltr"&&(d=!1)}),a.addListener("endrule",f),a.addListener("endfontface",f)}}),CSSLint.addRule({id:"unique-headings",name:"Headings should only be defined once",desc:"Headings should be defined only once.",browsers:"All",init:function(a,b){var c=this,d={h1:0,h2:0,h3:0,h4:0,h5:0,h6:0};a.addListener("startrule",function(a){var e=a.selectors,f,g,h,i,j;for(i=0;i<e.length;i++){f=e[i],g=f.parts[f.parts.length-1];if(g.elementName&&/(h[1-6])/i.test(g.elementName.toString())){for(j=0;j<g.modifiers.length;j++)if(g.modifiers[j].type=="pseudo"){h=!0;break}h||(d[RegExp.$1]++,d[RegExp.$1]>1&&b.report("Heading ("+g.elementName+") has already been defined.",g.line,g.col,c))}}}),a.addListener("endstylesheet",function(a){var e,f=[];for(e in d)d.hasOwnProperty(e)&&d[e]>1&&f.push(d[e]+" "+e+"s");f.length&&b.rollupWarn("You have "+f.join(", ")+" defined in this stylesheet.",c)})}}),CSSLint.addRule({id:"universal-selector",name:"Disallow universal selector",desc:"The universal selector (*) is known to be slow.",browsers:"All",init:function(a,b){var c=this;a.addListener("startrule",function(a){var d=a.selectors,e,f,g,h,i,j;for(h=0;h<d.length;h++)e=d[h],f=e.parts[e.parts.length-1],f.elementName=="*"&&b.report(c.desc,f.line,f.col,c)})}}),CSSLint.addRule({id:"unqualified-attributes",name:"Disallow unqualified attribute selectors",desc:"Unqualified attribute selectors are known to be slow.",browsers:"All",init:function(a,b){var c=this;a.addListener("startrule",function(d){var e=d.selectors,f,g,h,i,j,k;for(i=0;i<e.length;i++){f=e[i],g=f.parts[f.parts.length-1];if(g.type==a.SELECTOR_PART_TYPE)for(k=0;k<g.modifiers.length;k++)h=g.modifiers[k],h.type=="attribute"&&(!g.elementName||g.elementName=="*")&&b.report(c.desc,g.line,g.col,c)}})}}),CSSLint.addRule({id:"vendor-prefix",name:"Require standard property with vendor prefix",desc:"When using a vendor-prefixed property, make sure to include the standard one.",browsers:"All",init:function(a,b){function g(){d={},e=1}function h(a){var e,g,h,i,j,k,l=[];for(e in d)f[e]&&l.push({actual:e,needed:f[e]});for(g=0,h=l.length;g<h;g++)j=l[g].needed,k=l[g].actual,d[j]?d[j][0].pos<d[k][0].pos&&b.report("Standard property '"+j+"' should come after vendor-prefixed property '"+k+"'.",d[k][0].name.line,d[k][0].name.col,c):b.report("Missing standard property '"+j+"' to go along with '"+k+"'.",d[k][0].name.line,d[k][0].name.col,c)}var c=this,d,e,f={"-webkit-border-radius":"border-radius","-webkit-border-top-left-radius":"border-top-left-radius","-webkit-border-top-right-radius":"border-top-right-radius","-webkit-border-bottom-left-radius":"border-bottom-left-radius","-webkit-border-bottom-right-radius":"border-bottom-right-radius","-o-border-radius":"border-radius","-o-border-top-left-radius":"border-top-left-radius","-o-border-top-right-radius":"border-top-right-radius","-o-border-bottom-left-radius":"border-bottom-left-radius","-o-border-bottom-right-radius":"border-bottom-right-radius","-moz-border-radius":"border-radius","-moz-border-radius-topleft":"border-top-left-radius","-moz-border-radius-topright":"border-top-right-radius","-moz-border-radius-bottomleft":"border-bottom-left-radius","-moz-border-radius-bottomright":"border-bottom-right-radius","-moz-column-count":"column-count","-webkit-column-count":"column-count","-moz-column-gap":"column-gap","-webkit-column-gap":"column-gap","-moz-column-rule":"column-rule","-webkit-column-rule":"column-rule","-moz-column-rule-style":"column-rule-style","-webkit-column-rule-style":"column-rule-style","-moz-column-rule-color":"column-rule-color","-webkit-column-rule-color":"column-rule-color","-moz-column-rule-width":"column-rule-width","-webkit-column-rule-width":"column-rule-width","-moz-column-width":"column-width","-webkit-column-width":"column-width","-webkit-column-span":"column-span","-webkit-columns":"columns","-moz-box-shadow":"box-shadow","-webkit-box-shadow":"box-shadow","-moz-transform":"transform","-webkit-transform":"transform","-o-transform":"transform","-ms-transform":"transform","-moz-transform-origin":"transform-origin","-webkit-transform-origin":"transform-origin","-o-transform-origin":"transform-origin","-ms-transform-origin":"transform-origin","-moz-box-sizing":"box-sizing","-webkit-box-sizing":"box-sizing","-moz-user-select":"user-select","-khtml-user-select":"user-select","-webkit-user-select":"user-select"};a.addListener("startrule",g),a.addListener("startfontface",g),a.addListener("startpage",g),a.addListener("startpagemargin",g),a.addListener("startkeyframerule",g),a.addListener("property",function(a){var b=a.property.text.toLowerCase();d[b]||(d[b]=[]),d[b].push({name:a.property,value:a.value,pos:e++})}),a.addListener("endrule",h),a.addListener("endfontface",h),a.addListener("endpage",h),a.addListener("endpagemargin",h),a.addListener("endkeyframerule",h)}}),CSSLint.addRule({id:"zero-units",name:"Disallow units for 0 values",desc:"You don't need to specify units when a value is 0.",browsers:"All",init:function(a,b){var c=this;a.addListener("property",function(a){var d=a.value.parts,e=0,f=d.length;while(e<f)(d[e].units||d[e].type=="percentage")&&d[e].value===0&&d[e].type!="time"&&b.report("Values of 0 shouldn't have units specified.",d[e].line,d[e].col,c),e++})}}),CSSLint.addFormatter({id:"checkstyle-xml",name:"Checkstyle XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><checkstyle>'},endFormat:function(){return"</checkstyle>"},formatResults:function(a,b,c){var d=a.messages,e=[],f=function(a){return!!a&&"name"in a?"net.csslint."+a.name.replace(/\s/g,""):""},g=function(a){return!a||a.constructor!==String?"":a.replace(/\"/g,"'").replace(/</g,"&lt;").replace(/>/g,"&gt;")};return d.length>0&&(e.push('<file name="'+b+'">'),CSSLint.Util.forEach(d,function(a,b){a.rollup||e.push('<error line="'+a.line+'" column="'+a.col+'" severity="'+a.type+'"'+' message="'+g(a.message)+'" source="'+f(a.rule)+'"/>')}),e.push("</file>")),e.join("")}}),CSSLint.addFormatter({id:"compact",name:"Compact, 'porcelain' format",startFormat:function(){return""},endFormat:function(){return""},formatResults:function(a,b,c){var d=a.messages,e="";c=c||{};var f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)};return d.length===0?c.quiet?"":b+": Lint Free!":(CSSLint.Util.forEach(d,function(a,c){a.rollup?e+=b+": "+f(a.type)+" - "+a.message+"\n":e+=b+": "+"line "+a.line+", col "+a.col+", "+f(a.type)+" - "+a.message+"\n"}),e)}}),CSSLint.addFormatter({id:"csslint-xml",name:"CSSLint XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><csslint>'},endFormat:function(){return"</csslint>"},formatResults:function(a,b,c){var d=a.messages,e=[],f=function(a){return!a||a.constructor!==String?"":a.replace(/\"/g,"'").replace(/</g,"&lt;").replace(/>/g,"&gt;")};return d.length>0&&(e.push('<file name="'+b+'">'),CSSLint.Util.forEach(d,function(a,b){a.rollup?e.push('<issue severity="'+a.type+'" reason="'+f(a.message)+'" evidence="'+f(a.evidence)+'"/>'):e.push('<issue line="'+a.line+'" char="'+a.col+'" severity="'+a.type+'"'+' reason="'+f(a.message)+'" evidence="'+f(a.evidence)+'"/>')}),e.push("</file>")),e.join("")}}),CSSLint.addFormatter({id:"lint-xml",name:"Lint XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><lint>'},endFormat:function(){return"</lint>"},formatResults:function(a,b,c){var d=a.messages,e=[],f=function(a){return!a||a.constructor!==String?"":a.replace(/\"/g,"'").replace(/</g,"&lt;").replace(/>/g,"&gt;")};return d.length>0&&(e.push('<file name="'+b+'">'),CSSLint.Util.forEach(d,function(a,b){a.rollup?e.push('<issue severity="'+a.type+'" reason="'+f(a.message)+'" evidence="'+f(a.evidence)+'"/>'):e.push('<issue line="'+a.line+'" char="'+a.col+'" severity="'+a.type+'"'+' reason="'+f(a.message)+'" evidence="'+f(a.evidence)+'"/>')}),e.push("</file>")),e.join("")}}),CSSLint.addFormatter({id:"text",name:"Plain Text",startFormat:function(){return""},endFormat:function(){return""},formatResults:function(a,b,c){var d=a.messages,e="";c=c||{};if(d.length===0)return c.quiet?"":"\n\ncsslint: No errors in "+b+".";e="\n\ncsslint: There are "+d.length+" problems in "+b+".";var f=b.lastIndexOf("/"),g=b;return f===-1&&(f=b.lastIndexOf("\\")),f>-1&&(g=b.substring(f+1)),CSSLint.Util.forEach(d,function(a,b){e=e+"\n\n"+g,a.rollup?(e+="\n"+(b+1)+": "+a.type,e+="\n"+a.message):(e+="\n"+(b+1)+": "+a.type+" at line "+a.line+", col "+a.col,e+="\n"+a.message,e+="\n"+a.evidence)}),e}}),exports.CSSLint=CSSLint})
;
function initBaseUrls(a){require.tlns=a}function initSender(){var a=require(null,"ace/lib/event_emitter").EventEmitter,b=require(null,"ace/lib/oop"),c=function(){};return function(){b.implement(this,a),this.callback=function(a,b){postMessage({type:"call",id:b,data:a})},this.emit=function(a,b){postMessage({type:"event",name:a,data:b})}}.call(c.prototype),new c}"no use strict";var console={log:function(a){postMessage({type:"log",data:a})}},window={console:console},normalizeModule=function(a,b){if(b.indexOf("!")!==-1){var c=b.split("!");return normalizeModule(a,c[0])+"!"+normalizeModule(a,c[1])}if(b.charAt(0)=="."){var d=a.split("/").slice(0,-1).join("/"),b=d+"/"+b;while(b.indexOf(".")!==-1&&e!=b)var e=b,b=b.replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}return b},require=function(a,b){var b=normalizeModule(a,b),c=require.modules[b];if(c)return c.initialized||(c.exports=c.factory().exports,c.initialized=!0),c.exports;var d=b.split("/");d[0]=require.tlns[d[0]]||d[0];var e=d.join("/")+".js";return require.id=b,importScripts(e),require(a,b)};require.modules={},require.tlns={};var define=function(a,b,c){arguments.length==2?c=b:arguments.length==1&&(c=a,a=require.id);if(a.indexOf("text!")===0)return;var d=function(b,c){return require(a,b,c)};require.modules[a]={factory:function(){var a={exports:{}},b=c(d,a.exports,a);return b&&(a.exports=b),a}}},main,sender;onmessage=function(a){var b=a.data;if(b.command)main[b.command].apply(main,b.args);else if(b.init){initBaseUrls(b.tlns),require(null,"ace/lib/fixoldbrowsers"),sender=initSender();var c=require(null,b.module)[b.classname];main=new c(sender)}else b.event&&sender&&sender._emit(b.event,b.data)},define("ace/lib/fixoldbrowsers",["require","exports","module","ace/lib/regexp","ace/lib/es5-shim"],function(a,b,c){a("./regexp"),a("./es5-shim")}),define("ace/lib/regexp",["require","exports","module"],function(a,b,c){function g(a){return(a.global?"g":"")+(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.extended?"x":"")+(a.sticky?"y":"")}function h(a,b,c){if(Array.prototype.indexOf)return a.indexOf(b,c);for(var d=c||0;d<a.length;d++)if(a[d]===b)return d;return-1}var d={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},e=d.exec.call(/()??/,"")[1]===undefined,f=function(){var a=/^/g;return d.test.call(a,""),!a.lastIndex}();if(f&&e)return;RegExp.prototype.exec=function(a){var b=d.exec.apply(this,arguments),c,i;if(typeof a=="string"&&b){!e&&b.length>1&&h(b,"")>-1&&(i=RegExp(this.source,d.replace.call(g(this),"g","")),d.replace.call(a.slice(b.index),i,function(){for(var a=1;a<arguments.length-2;a++)arguments[a]===undefined&&(b[a]=undefined)}));if(this._xregexp&&this._xregexp.captureNames)for(var j=1;j<b.length;j++)c=this._xregexp.captureNames[j-1],c&&(b[c]=b[j]);!f&&this.global&&!b[0].length&&this.lastIndex>b.index&&this.lastIndex--}return b},f||(RegExp.prototype.test=function(a){var b=d.exec.call(this,a);return b&&this.global&&!b[0].length&&this.lastIndex>b.index&&this.lastIndex--,!!b})}),define("ace/lib/es5-shim",["require","exports","module"],function(a,b,c){function p(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(b){}}Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=g.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,h=c.apply(f,d.concat(g.call(arguments)));return h!==null&&Object(h)===h?h:f}return c.apply(b,d.concat(g.call(arguments)))};return e});var d=Function.prototype.call,e=Array.prototype,f=Object.prototype,g=e.slice,h=d.bind(f.toString),i=d.bind(f.hasOwnProperty),j,k,l,m,n;if(n=i(f,"__defineGetter__"))j=d.bind(f.__defineGetter__),k=d.bind(f.__defineSetter__),l=d.bind(f.__lookupGetter__),m=d.bind(f.__lookupSetter__);Array.isArray||(Array.isArray=function(b){return h(b)=="[object Array]"}),Array.prototype.forEach||(Array.prototype.forEach=function(b){var c=G(this),d=arguments[1],e=0,f=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;while(e<f)e in c&&b.call(d,c[e],e,c),e++}),Array.prototype.map||(Array.prototype.map=function(b){var c=G(this),d=c.length>>>0,e=Array(d),f=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var g=0;g<d;g++)g in c&&(e[g]=b.call(f,c[g],g,c));return e}),Array.prototype.filter||(Array.prototype.filter=function(b){var c=G(this),d=c.length>>>0,e=[],f=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var g=0;g<d;g++)g in c&&b.call(f,c[g],g,c)&&e.push(c[g]);return e}),Array.prototype.every||(Array.prototype.every=function(b){var c=G(this),d=c.length>>>0,e=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var f=0;f<d;f++)if(f in c&&!b.call(e,c[f],f,c))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(b){var c=G(this),d=c.length>>>0,e=arguments[1];if(h(b)!="[object Function]")throw new TypeError;for(var f=0;f<d;f++)if(f in c&&b.call(e,c[f],f,c))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(b){var c=G(this),d=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;if(!d&&arguments.length==1)throw new TypeError;var e=0,f;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);for(;e<d;e++)e in c&&(f=b.call(void 0,f,c[e],e,c));return f}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(b){var c=G(this),d=c.length>>>0;if(h(b)!="[object Function]")throw new TypeError;if(!d&&arguments.length==1)throw new TypeError;var e,f=d-1;if(arguments.length>=2)e=arguments[1];else do{if(f in c){e=c[f--];break}if(--f<0)throw new TypeError}while(!0);do f in this&&(e=b.call(void 0,e,c[f],f,c));while(f--);return e}),Array.prototype.indexOf||(Array.prototype.indexOf=function(b){var c=G(this),d=c.length>>>0;if(!d)return-1;var e=0;arguments.length>1&&(e=E(arguments[1])),e=e>=0?e:Math.max(0,d+e);for(;e<d;e++)if(e in c&&c[e]===b)return e;return-1}),Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(b){var c=G(this),d=c.length>>>0;if(!d)return-1;var e=d-1;arguments.length>1&&(e=Math.min(e,E(arguments[1]))),e=e>=0?e:d-Math.abs(e);for(;e>=0;e--)if(e in c&&b===c[e])return e;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(b){return b.__proto__||(b.constructor?b.constructor.prototype:f)});if(!Object.getOwnPropertyDescriptor){var o="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(b,c){if(typeof b!="object"&&typeof b!="function"||b===null)throw new TypeError(o+b);if(!i(b,c))return;var d,e,g;d={enumerable:!0,configurable:!0};if(n){var h=b.__proto__;b.__proto__=f;var e=l(b,c),g=m(b,c);b.__proto__=h;if(e||g)return e&&(d.get=e),g&&(d.set=g),d}return d.value=b[c],d}}Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(b){return Object.keys(b)}),Object.create||(Object.create=function(b,c){var d;if(b===null)d={__proto__:null};else{if(typeof b!="object")throw new TypeError("typeof prototype["+typeof b+"] != 'object'");var e=function(){};e.prototype=b,d=new e,d.__proto__=b}return c!==void 0&&Object.defineProperties(d,c),d});if(Object.defineProperty){var q=p({}),r=typeof document=="undefined"||p(document.createElement("div"));if(!q||!r)var s=Object.defineProperty}if(!Object.defineProperty||s){var t="Property description must be an object: ",u="Object.defineProperty called on non-object: ",v="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(b,c,d){if(typeof b!="object"&&typeof b!="function"||b===null)throw new TypeError(u+b);if(typeof d!="object"&&typeof d!="function"||d===null)throw new TypeError(t+d);if(s)try{return s.call(Object,b,c,d)}catch(e){}if(i(d,"value"))if(n&&(l(b,c)||m(b,c))){var g=b.__proto__;b.__proto__=f,delete b[c],b[c]=d.value,b.__proto__=g}else b[c]=d.value;else{if(!n)throw new TypeError(v);i(d,"get")&&j(b,c,d.get),i(d,"set")&&k(b,c,d.set)}return b}}Object.defineProperties||(Object.defineProperties=function(b,c){for(var d in c)i(c,d)&&Object.defineProperty(b,d,c[d]);return b}),Object.seal||(Object.seal=function(b){return b}),Object.freeze||(Object.freeze=function(b){return b});try{Object.freeze(function(){})}catch(w){Object.freeze=function(b){return function(c){return typeof c=="function"?c:b(c)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(b){return b}),Object.isSealed||(Object.isSealed=function(b){return!1}),Object.isFrozen||(Object.isFrozen=function(b){return!1}),Object.isExtensible||(Object.isExtensible=function(b){if(Object(b)===b)throw new TypeError;var c="";while(i(b,c))c+="?";b[c]=!0;var d=i(b,c);return delete b[c],d});if(!Object.keys){var x=!0,y=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],z=y.length;for(var A in{toString:null})x=!1;Object.keys=function H(a){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.keys called on a non-object");var H=[];for(var b in a)i(a,b)&&H.push(b);if(x)for(var c=0,d=z;c<d;c++){var e=y[c];i(a,e)&&H.push(e)}return H}}if(!Date.prototype.toISOString||(new Date(-621987552e5)).toISOString().indexOf("-000001")===-1)Date.prototype.toISOString=function(){var b,c,d,e;if(!isFinite(this))throw new RangeError;b=[this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],e=this.getUTCFullYear(),e=(e<0?"-":e>9999?"+":"")+("00000"+Math.abs(e)).slice(0<=e&&e<=9999?-4:-6),c=b.length;while(c--)d=b[c],d<10&&(b[c]="0"+d);return e+"-"+b.slice(0,2).join("-")+"T"+b.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"};Date.now||(Date.now=function(){return(new Date).getTime()}),Date.prototype.toJSON||(Date.prototype.toJSON=function(b){if(typeof this.toISOString!="function")throw new TypeError;return this.toISOString()}),Date.parse("+275760-09-13T00:00:00.000Z")!==864e13&&(Date=function(a){var b=function e(b,c,d,f,g,h,i){var j=arguments.length;if(this instanceof a){var k=j==1&&String(b)===b?new a(e.parse(b)):j>=7?new a(b,c,d,f,g,h,i):j>=6?new a(b,c,d,f,g,h):j>=5?new a(b,c,d,f,g):j>=4?new a(b,c,d,f):j>=3?new a(b,c,d):j>=2?new a(b,c):j>=1?new a(b):new a;return k.constructor=e,k}return a.apply(this,arguments)},c=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");for(var d in a)b[d]=a[d];return b.now=a.now,b.UTC=a.UTC,b.prototype=a.prototype,b.prototype.constructor=b,b.parse=function(d){var e=c.exec(d);if(e){e.shift();for(var f=1;f<7;f++)e[f]=+(e[f]||(f<3?1:0)),f==1&&e[f]--;var g=+e.pop(),h=+e.pop(),i=e.pop(),j=0;if(i){if(h>23||g>59)return NaN;j=(h*60+g)*6e4*(i=="+"?-1:1)}var k=+e[0];return 0<=k&&k<=99?(e[0]=k+400,a.UTC.apply(this,e)+j-126227808e5):a.UTC.apply(this,e)+j}return a.parse.apply(this,arguments)},b}(Date));var B="	\n\f\r   ᠎             　\u2028\u2029﻿";if(!String.prototype.trim||B.trim()){B="["+B+"]";var C=new RegExp("^"+B+B+"*"),D=new RegExp(B+B+"*$");String.prototype.trim=function(){return String(this).replace(C,"").replace(D,"")}}var E=function(a){return a=+a,a!==a?a=0:a!==0&&a!==1/0&&a!==-Infinity&&(a=(a>0||-1)*Math.floor(Math.abs(a))),a},F="a"[0]!="a",G=function(a){if(a==null)throw new TypeError;return F&&typeof a=="string"&&a?a.split(""):Object(a)}}),define("ace/lib/event_emitter",["require","exports","module"],function(a,b,c){var d={};d._emit=d._dispatchEvent=function(a,b){this._eventRegistry=this._eventRegistry||{},this._defaultHandlers=this._defaultHandlers||{};var c=this._eventRegistry[a]||[],d=this._defaultHandlers[a];if(!c.length&&!d)return;b=b||{},b.type=a,b.stopPropagation||(b.stopPropagation=function(){this.propagationStopped=!0}),b.preventDefault||(b.preventDefault=function(){this.defaultPrevented=!0});for(var e=0;e<c.length;e++){c[e](b);if(b.propagationStopped)break}if(d&&!b.defaultPrevented)return d(b)},d.setDefaultHandler=function(a,b){this._defaultHandlers=this._defaultHandlers||{};if(this._defaultHandlers[a])throw new Error("The default handler for '"+a+"' is already set");this._defaultHandlers[a]=b},d.on=d.addEventListener=function(a,b){this._eventRegistry=this._eventRegistry||{};var c=this._eventRegistry[a];if(!c)var c=this._eventRegistry[a]=[];c.indexOf(b)==-1&&c.push(b)},d.removeListener=d.removeEventListener=function(a,b){this._eventRegistry=this._eventRegistry||{};var c=this._eventRegistry[a];if(!c)return;var d=c.indexOf(b);d!==-1&&c.splice(d,1)},d.removeAllListeners=function(a){this._eventRegistry&&(this._eventRegistry[a]=[])},b.EventEmitter=d}),define("ace/lib/oop",["require","exports","module"],function(a,b,c){b.inherits=function(){var a=function(){};return function(b,c){a.prototype=c.prototype,b.super_=c.prototype,b.prototype=new a,b.prototype.constructor=b}}(),b.mixin=function(a,b){for(var c in b)a[c]=b[c]},b.implement=function(a,c){b.mixin(a,c)}}),define("ace/mode/javascript_worker",["require","exports","module","ace/lib/oop","ace/worker/mirror","ace/worker/jshint","ace/narcissus/parser"],function(a,b,c){var d=a("../lib/oop"),e=a("../worker/mirror").Mirror,f=a("../worker/jshint").JSHINT,g=a("../narcissus/parser"),h=b.JavaScriptWorker=function(a){e.call(this,a),this.setTimeout(500)};d.inherits(h,e),function(){this.onUpdate=function(){var a=this.doc.getValue();a=a.replace(/^#!.*\n/,"\n");try{g.parse(a)}catch(b){var c=b.message.split(":"),d=c.pop().trim(),e=parseInt(c.pop().trim())-1;this.sender.emit("narcissus",{row:e,column:null,text:d,type:"error"});return}finally{}f(a,{undef:!1,onevar:!1,passfail:!1}),this.sender.emit("jslint",f.errors)}}.call(h.prototype)}),define("ace/worker/mirror",["require","exports","module","ace/document","ace/lib/lang"],function(a,b,c){var d=a("../document").Document,e=a("../lib/lang"),f=b.Mirror=function(a){this.sender=a;var b=this.doc=new d(""),c=this.deferredUpdate=e.deferredCall(this.onUpdate.bind(this)),f=this;a.on("change",function(a){b.applyDeltas([a.data]),c.schedule(f.$timeout)})};(function(){this.$timeout=500,this.setTimeout=function(a){this.$timeout=a},this.setValue=function(a){this.doc.setValue(a),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(a){this.sender.callback(this.doc.getValue(),a)},this.onUpdate=function(){}}).call(f.prototype)}),define("ace/document",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/range","ace/anchor"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=a("./range").Range,g=a("./anchor").Anchor,h=function(a){this.$lines=[],a.length==0?this.$lines=[""]:Array.isArray(a)?this.insertLines(0,a):this.insert({row:0,column:0},a)};(function(){d.implement(this,e),this.setValue=function(a){var b=this.getLength();this.remove(new f(0,0,b,this.getLine(b-1).length)),this.insert({row:0,column:0},a)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(a,b){return new g(this,a,b)},"aaa".split(/a/).length==0?this.$split=function(a){return a.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(a){return a.split(/\r\n|\r|\n/)},this.$detectNewLine=function(a){var b=a.match(/^.*?(\r\n|\r|\n)/m);b?this.$autoNewLine=b[1]:this.$autoNewLine="\n"},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";case"auto":return this.$autoNewLine}},this.$autoNewLine="\n",this.$newLineMode="auto",this.setNewLineMode=function(a){if(this.$newLineMode===a)return;this.$newLineMode=a},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(a){return a=="\r\n"||a=="\r"||a=="\n"},this.getLine=function(a){return this.$lines[a]||""},this.getLines=function(a,b){return this.$lines.slice(a,b+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(a){if(a.start.row==a.end.row)return this.$lines[a.start.row].substring(a.start.column,a.end.column);var b=this.getLines(a.start.row+1,a.end.row-1);return b.unshift((this.$lines[a.start.row]||"").substring(a.start.column)),b.push((this.$lines[a.end.row]||"").substring(0,a.end.column)),b.join(this.getNewLineCharacter())},this.$clipPosition=function(a){var b=this.getLength();return a.row>=b&&(a.row=Math.max(0,b-1),a.column=this.getLine(b-1).length),a},this.insert=function(a,b){if(!b||b.length===0)return a;a=this.$clipPosition(a),this.getLength()<=1&&this.$detectNewLine(b);var c=this.$split(b),d=c.splice(0,1)[0],e=c.length==0?null:c.splice(c.length-1,1)[0];return a=this.insertInLine(a,d),e!==null&&(a=this.insertNewLine(a),a=this.insertLines(a.row,c),a=this.insertInLine(a,e||"")),a},this.insertLines=function(a,b){if(b.length==0)return{row:a,column:0};if(b.length>65535){var c=this.insertLines(a,b.slice(65535));b=b.slice(0,65535)}var d=[a,0];d.push.apply(d,b),this.$lines.splice.apply(this.$lines,d);var e=new f(a,0,a+b.length,0),g={action:"insertLines",range:e,lines:b};return this._emit("change",{data:g}),c||e.end},this.insertNewLine=function(a){a=this.$clipPosition(a);var b=this.$lines[a.row]||"";this.$lines[a.row]=b.substring(0,a.column),this.$lines.splice(a.row+1,0,b.substring(a.column,b.length));var c={row:a.row+1,column:0},d={action:"insertText",range:f.fromPoints(a,c),text:this.getNewLineCharacter()};return this._emit("change",{data:d}),c},this.insertInLine=function(a,b){if(b.length==0)return a;var c=this.$lines[a.row]||"";this.$lines[a.row]=c.substring(0,a.column)+b+c.substring(a.column);var d={row:a.row,column:a.column+b.length},e={action:"insertText",range:f.fromPoints(a,d),text:b};return this._emit("change",{data:e}),d},this.remove=function(a){a.start=this.$clipPosition(a.start),a.end=this.$clipPosition(a.end);if(a.isEmpty())return a.start;var b=a.start.row,c=a.end.row;if(a.isMultiLine()){var d=a.start.column==0?b:b+1,e=c-1;a.end.column>0&&this.removeInLine(c,0,a.end.column),e>=d&&this.removeLines(d,e),d!=b&&(this.removeInLine(b,a.start.column,this.getLine(b).length),this.removeNewLine(a.start.row))}else this.removeInLine(b,a.start.column,a.end.column);return a.start},this.removeInLine=function(a,b,c){if(b==c)return;var d=new f(a,b,a,c),e=this.getLine(a),g=e.substring(b,c),h=e.substring(0,b)+e.substring(c,e.length);this.$lines.splice(a,1,h);var i={action:"removeText",range:d,text:g};return this._emit("change",{data:i}),d.start},this.removeLines=function(a,b){var c=new f(a,0,b+1,0),d=this.$lines.splice(a,b-a+1),e={action:"removeLines",range:c,nl:this.getNewLineCharacter(),lines:d};return this._emit("change",{data:e}),d},this.removeNewLine=function(a){var b=this.getLine(a),c=this.getLine(a+1),d=new f(a,b.length,a+1,0),e=b+c;this.$lines.splice(a,2,e);var g={action:"removeText",range:d,text:this.getNewLineCharacter()};this._emit("change",{data:g})},this.replace=function(a,b){if(b.length==0&&a.isEmpty())return a.start;if(b==this.getTextRange(a))return a.end;this.remove(a);if(b)var c=this.insert(a.start,b);else c=a.start;return c},this.applyDeltas=function(a){for(var b=0;b<a.length;b++){var c=a[b],d=f.fromPoints(c.range.start,c.range.end);c.action=="insertLines"?this.insertLines(d.start.row,c.lines):c.action=="insertText"?this.insert(d.start,c.text):c.action=="removeLines"?this.removeLines(d.start.row,d.end.row-1):c.action=="removeText"&&this.remove(d)}},this.revertDeltas=function(a){for(var b=a.length-1;b>=0;b--){var c=a[b],d=f.fromPoints(c.range.start,c.range.end);c.action=="insertLines"?this.removeLines(d.start.row,d.end.row-1):c.action=="insertText"?this.remove(d):c.action=="removeLines"?this.insertLines(d.start.row,c.lines):c.action=="removeText"&&this.insert(d.start,c.text)}}}).call(h.prototype),b.Document=h}),define("ace/range",["require","exports","module"],function(a,b,c){var d=function(a,b,c,d){this.start={row:a,column:b},this.end={row:c,column:d}};(function(){this.isEqual=function(a){return this.start.row==a.start.row&&this.end.row==a.end.row&&this.start.column==a.start.column&&this.end.column==a.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(a,b){return this.compare(a,b)==0},this.compareRange=function(a){var b,c=a.end,d=a.start;return b=this.compare(c.row,c.column),b==1?(b=this.compare(d.row,d.column),b==1?2:b==0?1:0):b==-1?-2:(b=this.compare(d.row,d.column),b==-1?-1:b==1?42:0)},this.comparePoint=function(a){return this.compare(a.row,a.column)},this.containsRange=function(a){return this.comparePoint(a.start)==0&&this.comparePoint(a.end)==0},this.intersects=function(a){var b=this.compareRange(a);return b==-1||b==0||b==1},this.isEnd=function(a,b){return this.end.row==a&&this.end.column==b},this.isStart=function(a,b){return this.start.row==a&&this.start.column==b},this.setStart=function(a,b){typeof a=="object"?(this.start.column=a.column,this.start.row=a.row):(this.start.row=a,this.start.column=b)},this.setEnd=function(a,b){typeof a=="object"?(this.end.column=a.column,this.end.row=a.row):(this.end.row=a,this.end.column=b)},this.inside=function(a,b){return this.compare(a,b)==0?this.isEnd(a,b)||this.isStart(a,b)?!1:!0:!1},this.insideStart=function(a,b){return this.compare(a,b)==0?this.isEnd(a,b)?!1:!0:!1},this.insideEnd=function(a,b){return this.compare(a,b)==0?this.isStart(a,b)?!1:!0:!1},this.compare=function(a,b){return!this.isMultiLine()&&a===this.start.row?b<this.start.column?-1:b>this.end.column?1:0:a<this.start.row?-1:a>this.end.row?1:this.start.row===a?b>=this.start.column?0:-1:this.end.row===a?b<=this.end.column?0:1:0},this.compareStart=function(a,b){return this.start.row==a&&this.start.column==b?-1:this.compare(a,b)},this.compareEnd=function(a,b){return this.end.row==a&&this.end.column==b?1:this.compare(a,b)},this.compareInside=function(a,b){return this.end.row==a&&this.end.column==b?1:this.start.row==a&&this.start.column==b?-1:this.compare(a,b)},this.clipRows=function(a,b){if(this.end.row>b)var c={row:b+1,column:0};if(this.start.row>b)var e={row:b+1,column:0};if(this.start.row<a)var e={row:a,column:0};if(this.end.row<a)var c={row:a,column:0};return d.fromPoints(e||this.start,c||this.end)},this.extend=function(a,b){var c=this.compare(a,b);if(c==0)return this;if(c==-1)var e={row:a,column:b};else var f={row:a,column:b};return d.fromPoints(e||this.start,f||this.end)},this.isEmpty=function(){return this.start.row==this.end.row&&this.start.column==this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return d.fromPoints(this.start,this.end)},this.collapseRows=function(){return this.end.column==0?new d(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new d(this.start.row,0,this.end.row,0)},this.toScreenRange=function(a){var b=a.documentToScreenPosition(this.start),c=a.documentToScreenPosition(this.end);return new d(b.row,b.column,c.row,c.column)}}).call(d.prototype),d.fromPoints=function(a,b){return new d(a.row,a.column,b.row,b.column)},b.Range=d}),define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=b.Anchor=function(a,b,c){this.document=a,typeof c=="undefined"?this.setPosition(b.row,b.column):this.setPosition(b,c),this.$onChange=this.onChange.bind(this),a.on("change",this.$onChange)};(function(){d.implement(this,e),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.onChange=function(a){var b=a.data,c=b.range;if(c.start.row==c.end.row&&c.start.row!=this.row)return;if(c.start.row>this.row)return;if(c.start.row==this.row&&c.start.column>this.column)return;var d=this.row,e=this.column;b.action==="insertText"?c.start.row===d&&c.start.column<=e?c.start.row===c.end.row?e+=c.end.column-c.start.column:(e-=c.start.column,d+=c.end.row-c.start.row):c.start.row!==c.end.row&&c.start.row<d&&(d+=c.end.row-c.start.row):b.action==="insertLines"?c.start.row<=d&&(d+=c.end.row-c.start.row):b.action=="removeText"?c.start.row==d&&c.start.column<e?c.end.column>=e?e=c.start.column:e=Math.max(0,e-(c.end.column-c.start.column)):c.start.row!==c.end.row&&c.start.row<d?(c.end.row==d&&(e=Math.max(0,e-c.end.column)+c.start.column),d-=c.end.row-c.start.row):c.end.row==d&&(d-=c.end.row-c.start.row,e=Math.max(0,e-c.end.column)+c.start.column):b.action=="removeLines"&&c.start.row<=d&&(c.end.row<=d?d-=c.end.row-c.start.row:(d=c.start.row,e=0)),this.setPosition(d,e,!0)},this.setPosition=function(a,b,c){var d;c?d={row:a,column:b}:d=this.$clipPositionToDocument(a,b);if(this.row==d.row&&this.column==d.column)return;var e={row:this.row,column:this.column};this.row=d.row,this.column=d.column,this._emit("change",{old:e,value:d})},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.$clipPositionToDocument=function(a,b){var c={};return a>=this.document.getLength()?(c.row=Math.max(0,this.document.getLength()-1),c.column=this.document.getLine(c.row).length):a<0?(c.row=0,c.column=0):(c.row=a,c.column=Math.min(this.document.getLine(c.row).length,Math.max(0,b))),b<0&&(c.column=0),c}}).call(f.prototype)}),define("ace/lib/lang",["require","exports","module"],function(a,b,c){b.stringReverse=function(a){return a.split("").reverse().join("")},b.stringRepeat=function(a,b){return(new Array(b+1)).join(a)};var d=/^\s\s*/,e=/\s\s*$/;b.stringTrimLeft=function(a){return a.replace(d,"")},b.stringTrimRight=function(a){return a.replace(e,"")},b.copyObject=function(a){var b={};for(var c in a)b[c]=a[c];return b},b.copyArray=function(a){var b=[];for(var c=0,d=a.length;c<d;c++)a[c]&&typeof a[c]=="object"?b[c]=this.copyObject(a[c]):b[c]=a[c];return b},b.deepCopy=function(a){if(typeof a!="object")return a;var b=a.constructor();for(var c in a)typeof a[c]=="object"?b[c]=this.deepCopy(a[c]):b[c]=a[c];return b},b.arrayToMap=function(a){var b={};for(var c=0;c<a.length;c++)b[a[c]]=1;return b},b.arrayRemove=function(a,b){for(var c=0;c<=a.length;c++)b===a[c]&&a.splice(c,1)},b.escapeRegExp=function(a){return a.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},b.getMatchOffsets=function(a,b){var c=[];return a.replace(b,function(a){c.push({offset:arguments[arguments.length-2],length:a.length})}),c},b.deferredCall=function(a){var b=null,c=function(){b=null,a()},d=function(a){return d.cancel(),b=setTimeout(c,a||0),d};return d.schedule=d,d.call=function(){return this.cancel(),a(),d},d.cancel=function(){return clearTimeout(b),b=null,d},d}}),define("ace/worker/jshint",["require","exports","module"],function(a,b,c){var d=function(){function bb(){}function cb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function db(a,b){e[a]===undefined&&c[a]===undefined&&ib("Bad option: '"+a+"'.",b)}function eb(a,b){var c;for(c in b)cb(b,c)&&(a[c]=b[c])}function fb(){B.couch&&eb(C,g),B.rhino&&eb(C,G),B.prototypejs&&eb(C,F),B.node&&(eb(C,z),B.globalstrict=!0),B.devel&&eb(C,h),B.dojo&&eb(C,i),B.browser&&eb(C,f),B.nonstandard&&eb(C,K),B.jquery&&eb(C,s),B.mootools&&eb(C,x),B.wsh&&eb(C,T),B.esnext&&R(),B.globalstrict&&B.strict!==!1&&(B.strict=!0)}function gb(a,b,c){var d=Math.floor(b/t.length*100);throw{name:"JSHintError",line:b,character:c,message:a+" ("+d+"% scanned).",raw:a}}function hb(a,b,c,e){return d.undefs.push([a,b,c,e])}function ib(a,b,c,e,f,g){var h,i,j;return b=b||y,b.id==="(end)"&&(b=P),i=b.line||0,h=b.from||0,j={id:"(error)",raw:a,evidence:t[i-1]||"",line:i,character:h,a:c,b:e,c:f,d:g},j.reason=a.supplant(j),d.errors.push(j),B.passfail&&gb("Stopping. ",i,h),S+=1,S>=B.maxerr&&gb("Too many errors.",i,h),j}function jb(a,b,c,d,e,f,g){return ib(a,{line:b,from:c},d,e,f,g)}function kb(a,b,c,d,e,f){var g=ib(a,b,c,d,e,f)}function lb(a,b,c,d,e,f,g){return kb(a,{line:b,from:c},d,e,f,g)}function nb(a,b){a==="hasOwnProperty"&&ib("'hasOwnProperty' is a really bad name."),cb(k,a)&&!k["(global)"]&&(k[a]===!0?B.latedef&&ib("'{a}' was used before it was defined.",y,a):!B.shadow&&b!=="exception"&&ib("'{a}' is already defined.",y,a)),k[a]=b,k["(global)"]?(n[a]=k,cb(o,a)&&(B.latedef&&ib("'{a}' was used before it was defined.",y,a),delete o[a])):H[a]=k}function ob(){var a,b,d,e=y.value,f,g;switch(e){case"*/":kb("Unbegun comment.");break;case"/*members":case"/*member":e="/*members",w||(w={}),b=w;break;case"/*jshint":case"/*jslint":b=B,d=c;break;case"/*global":b=C;break;default:kb("What?")}f=mb.token();a:for(;;){for(;;){if(f.type==="special"&&f.value==="*/")break a;if(f.id!=="(endline)"&&f.id!==",")break;f=mb.token()}f.type!=="(string)"&&f.type!=="(identifier)"&&e!=="/*members"&&kb("Bad option.",f),g=mb.token(),g.id===":"?(g=mb.token(),b===w&&kb("Expected '{a}' and instead saw '{b}'.",f,"*/",":"),e==="/*jshint"&&db(f.value,f),f.value!=="indent"||e!=="/*jshint"&&e!=="/*jslint"?f.value!=="maxerr"||e!=="/*jshint"&&e!=="/*jslint"?f.value!=="maxlen"||e!=="/*jshint"&&e!=="/*jslint"?f.value==="validthis"?k["(global)"]?kb("Option 'validthis' can't be used in a global scope."):g.value==="true"||g.value==="false"?b[f.value]=g.value==="true":kb("Bad option value.",g):g.value==="true"?b[f.value]=!0:g.value==="false"?b[f.value]=!1:kb("Bad option value.",g):(a=+g.value,(typeof a!="number"||!isFinite(a)||a<=0||Math.floor(a)!==a)&&kb("Expected a small integer and instead saw '{a}'.",g,g.value),b.maxlen=a):(a=+g.value,(typeof a!="number"||!isFinite(a)||a<=0||Math.floor(a)!==a)&&kb("Expected a small integer and instead saw '{a}'.",g,g.value),b.maxerr=a):(a=+g.value,(typeof a!="number"||!isFinite(a)||a<=0||Math.floor(a)!==a)&&kb("Expected a small integer and instead saw '{a}'.",g,g.value),b.white=!0,b.indent=a),f=mb.token()):((e==="/*jshint"||e==="/*jslint")&&kb("Missing option value.",f),b[f.value]=!1,f=g)}d&&fb()}function pb(a){var b=a||0,c=0,d;while(c<=b)d=u[c],d||(d=u[c]=mb.token()),c+=1;return d}function qb(b,c){switch(P.id){case"(number)":y.id==="."&&ib("A dot following a number can be confused with a decimal point.",P);break;case"-":(y.id==="-"||y.id==="--")&&ib("Confusing minusses.");break;case"+":(y.id==="+"||y.id==="++")&&ib("Confusing plusses.")}if(P.type==="(string)"||P.identifier)a=P.value;b&&y.id!==b&&(c?y.id==="(end)"?ib("Unmatched '{a}'.",c,c.id):ib("Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'.",y,b,c.id,c.line,y.value):(y.type!=="(identifier)"||y.value!==b)&&ib("Expected '{a}' and instead saw '{b}'.",y,b,y.value)),E=P,P=y;for(;;){y=u.shift()||mb.token();if(y.id==="(end)"||y.id==="(error)")return;if(y.type==="special")ob();else if(y.id!=="(endline)")break}}function rb(b,c){var d,e=!1,f=!1;y.id==="(end)"&&kb("Unexpected early end of program.",P),qb(),c&&(a="anonymous",k["(verb)"]=P.value);if(c===!0&&P.fud)d=P.fud();else{if(P.nud)d=P.nud();else{if(y.type==="(number)"&&P.id===".")return ib("A leading decimal point can be confused with a dot: '.{a}'.",P,y.value),qb(),P;kb("Expected an identifier and instead saw '{a}'.",P,P.id)}while(b<y.lbp)e=P.value==="Array",f=P.value==="Object",qb(),e&&P.id==="("&&y.id===")"&&ib("Use the array literal notation [].",P),f&&P.id==="("&&y.id===")"&&ib("Use the object literal notation {}.",P),P.led?d=P.led(d):kb("Expected an operator and instead saw '{a}'.",P,P.id)}return d}function sb(a,b){a=a||P,b=b||y,B.white&&a.character!==b.from&&a.line===b.line&&(a.from+=a.character-a.from,ib("Unexpected space after '{a}'.",a,a.value))}function tb(a,b){a=a||P,b=b||y,B.white&&(a.character!==b.from||a.line!==b.line)&&ib("Unexpected space before '{a}'.",b,b.value)}function ub(a,b){a=a||P,b=b||y,B.white&&!a.comment&&a.line===b.line&&sb(a,b)}function vb(a,b){B.white&&(a=a||P,b=b||y,a.line===b.line&&a.character===b.from&&(a.from+=a.character-a.from,ib("Missing space after '{a}'.",a,a.value)))}function wb(a,b){a=a||P,b=b||y,!B.laxbreak&&a.line!==b.line?ib("Bad line breaking before '{a}'.",b,b.id):B.white&&(a=a||P,b=b||y,a.character===b.from&&(a.from+=a.character-a.from,ib("Missing space after '{a}'.",a,a.value)))}function xb(a){var b;B.white&&y.id!=="(end)"&&(b=q+(a||0),y.from!==b&&ib("Expected '{a}' to have an indentation at {b} instead at {c}.",y,y.value,b,y.from))}function yb(a){a=a||P,a.line!==y.line&&ib("Line breaking error '{a}'.",a,a.value)}function zb(){P.line!==y.line?B.laxcomma||(zb.first&&(ib("Comma warnings can be turned off with 'laxcomma'"),zb.first=!1),ib("Bad line breaking before '{a}'.",P,y.id)):!P.comment&&P.character!==y.from&&B.white&&(P.from+=P.character-P.from,ib("Unexpected space after '{a}'.",P,P.value)),qb(","),vb(P,y)}function Ab(a,b){var c=N[a];if(!c||typeof c!="object")N[a]=c={id:a,lbp:b,value:a};return c}function Bb(a){return Ab(a,0)}function Cb(a,b){var c=Bb(a);return c.identifier=c.reserved=!0,c.fud=b,c}function Db(a,b){var c=Cb(a,b);return c.block=!0,c}function Eb(a){var b=a.id.charAt(0);if(b>="a"&&b<="z"||b>="A"&&b<="Z")a.identifier=a.reserved=!0;return a}function Fb(a,b){var c=Ab(a,150);return Eb(c),c.nud=typeof b=="function"?b:function(){this.right=rb(150),this.arity="unary";if(this.id==="++"||this.id==="--")B.plusplus?ib("Unexpected use of '{a}'.",this,this.id):(!this.right.identifier||this.right.reserved)&&this.right.id!=="."&&this.right.id!=="["&&ib("Bad operand.",this);return this},c}function Gb(a,b){var c=Bb(a);return c.type=a,c.nud=b,c}function Hb(a,b){var c=Gb(a,b);return c.identifier=c.reserved=!0,c}function Ib(a,b){return Hb(a,function(){return typeof b=="function"&&b(this),this})}function Jb(a,b,c,d){var e=Ab(a,c);return Eb(e),e.led=function(e){return d||(wb(E,P),vb(P,y)),a==="in"&&e.id==="!"&&ib("Confusing use of '{a}'.",e,"!"),typeof b=="function"?b(e,this):(this.left=e,this.right=rb(c),this)},e}function Kb(a,b){var c=Ab(a,100);return c.led=function(a){wb(E,P),vb(P,y);var c=rb(100);return a&&a.id==="NaN"||c&&c.id==="NaN"?ib("Use the isNaN function to compare with NaN.",this):b&&b.apply(this,[a,c]),a.id==="!"&&ib("Confusing use of '{a}'.",a,"!"),c.id==="!"&&ib("Confusing use of '{a}'.",c,"!"),this.left=a,this.right=c,this},c}function Lb(a){return a&&(a.type==="(number)"&&+a.value===0||a.type==="(string)"&&a.value===""||a.type==="null"&&!B.eqnull||a.type==="true"||a.type==="false"||a.type==="undefined")}function Mb(a,b){return Ab(a,20).exps=!0,Jb(a,function(a,b){var c;b.left=a,C[a.value]===!1&&H[a.value]["(global)"]===!0?ib("Read only.",a):a["function"]&&ib("'{a}' is a function.",a,a.value);if(a){B.esnext&&k[a.value]==="const"&&ib("Attempting to override '{a}' which is a constant",a,a.value);if(a.id==="."||a.id==="[")return(!a.left||a.left.value==="arguments")&&ib("Bad assignment.",b),b.right=rb(19),b;if(a.identifier&&!a.reserved)return k[a.value]==="exception"&&ib("Do not assign to the exception parameter.",a),b.right=rb(19),b;a===N["function"]&&ib("Expected an identifier in an assignment and instead saw a function invocation.",P)}kb("Bad assignment.",b)},20)}function Nb(a,b,c){var d=Ab(a,c);return Eb(d),d.led=typeof b=="function"?b:function(a){return B.bitwise&&ib("Unexpected use of '{a}'.",this,this.id),this.left=a,this.right=rb(c),this},d}function Ob(a){return Ab(a,20).exps=!0,Jb(a,function(a,b){B.bitwise&&ib("Unexpected use of '{a}'.",b,b.id),vb(E,P),vb(P,y);if(a)return a.id==="."||a.id==="["||a.identifier&&!a.reserved?(rb(19),b):(a===N["function"]&&ib("Expected an identifier in an assignment, and instead saw a function invocation.",P),b);kb("Bad assignment.",b)},20)}function Pb(a,b){var c=Ab(a,150);return c.led=function(a){return B.plusplus?ib("Unexpected use of '{a}'.",this,this.id):(!a.identifier||a.reserved)&&a.id!=="."&&a.id!=="["&&ib("Bad operand.",this),this.left=a,this},c}function Qb(a){if(y.identifier)return qb(),P.reserved&&!B.es5&&(!a||P.value!=="undefined")&&ib("Expected an identifier and instead saw '{a}' (a reserved word).",P,P.id),P.value}function Rb(a){var b=Qb(a);if(b)return b;P.id==="function"&&y.id==="("?ib("Missing name in function declaration."):kb("Expected an identifier and instead saw '{a}'.",y,y.value)}function Sb(a){var b=0,c;if(y.id!==";"||A)return;for(;;){c=pb(b);if(c.reach)return;if(c.id!=="(endline)"){if(c.id==="function"){if(!B.latedef)break;ib("Inner functions should be listed at the top of the outer function.",c);break}ib("Unreachable '{a}' after '{b}'.",c,c.value,a);break}b+=1}}function Tb(a){var b=q,c,d=H,e=y;if(e.id===";"){qb(";");return}e.identifier&&!e.reserved&&pb().id===":"&&(qb(),qb(":"),H=Object.create(d),nb(e.value,"label"),y.labelled||ib("Label '{a}' on {b} statement.",y,e.value,y.value),_.test(e.value+":")&&ib("Label '{a}' looks like a javascript url.",e,e.value),y.label=e.value,e=y),a||xb(),c=rb(0,!0);if(!e.block){!B.expr&&(!c||!c.exps)?ib("Expected an assignment or function call and instead saw an expression.",P):B.nonew&&c.id==="("&&c.left.id==="new"&&ib("Do not use 'new' for side effects.");if(y.id===",")return zb();y.id!==";"?B.asi||(!B.lastsemic||y.id!=="}"||y.line!==P.line)&&jb("Missing semicolon.",P.line,P.character):(sb(P,y),qb(";"),vb(P,y))}return q=b,H=d,c}function Ub(a){var b=[],c,d;while(!y.reach&&y.id!=="(end)")y.id===";"?(d=pb(),(!d||d.id!=="(")&&ib("Unnecessary semicolon."),qb(";")):b.push(Tb(a===y.line));return b}function Vb(){var a,b,c;for(;;){if(y.id==="(string)"){b=pb(0);if(b.id==="(endline)"){a=1;do c=pb(a),a+=1;while(c.id==="(endline)");if(c.id!==";"){if(c.id!=="(string)"&&c.id!=="(number)"&&c.id!=="(regexp)"&&c.identifier!==!0&&c.id!=="}")break;ib("Missing semicolon.",y)}else b=c}else if(b.id==="}")ib("Missing semicolon.",b);else if(b.id!==";")break;xb(),qb(),M[P.value]&&ib('Unnecessary directive "{a}".',P,P.value),P.value==="use strict"&&(B.newcap=!0,B.undef=!0),M[P.value]=!0,b.id===";"&&qb(";");continue}break}}function Wb(a,b,c){var d,e=p,f=q,g,h=H,i,j,l;p=a;if(!a||!B.funcscope)H=Object.create(H);vb(P,y),i=y;if(y.id==="{"){qb("{"),j=P.line;if(y.id!=="}"){q+=B.indent;while(!a&&y.from>q)q+=B.indent;if(c){g={};for(l in M)cb(M,l)&&(g[l]=M[l]);Vb(),B.strict&&k["(context)"]["(global)"]&&!g["use strict"]&&!M["use strict"]&&ib('Missing "use strict" statement.')}d=Ub(j),c&&(M=g),q-=B.indent,j!==y.line&&xb()}else j!==y.line&&xb();qb("}",i),q=f}else a?((!b||B.curly)&&ib("Expected '{a}' and instead saw '{b}'.",y,"{",y.value),A=!0,q+=B.indent,d=[Tb(y.line===P.line)],q-=B.indent,A=!1):kb("Expected '{a}' and instead saw '{b}'.",y,"{",y.value);k["(verb)"]=null;if(!a||!B.funcscope)H=h;return p=e,a&&B.noempty&&(!d||d.length===0)&&ib("Empty block."),d}function Xb(a){w&&typeof w[a]!="boolean"&&ib("Unexpected /*member '{a}'.",P,a),typeof v[a]=="number"?v[a]+=1:v[a]=1}function Yb(a){var b=a.value,c=a.line,d=o[b];typeof d=="function"&&(d=!1),d?d[d.length-1]!==c&&d.push(c):(d=[c],o[b]=d)}function Zb(){var a=Qb(!0);return a||(y.id==="(string)"?(a=y.value,qb()):y.id==="(number)"&&(a=y.value.toString(),qb())),a}function $b(){var a,b=y,c=[];qb("("),ub();if(y.id===")"){qb(")");return}for(;;){a=Rb(!0),c.push(a),nb(a,"parameter");if(y.id!==",")return qb(")",b),ub(E,P),c;zb()}}function _b(b,c){var d,e=B,f=H;return B=Object.create(B),H=Object.create(H),k={"(name)":b||'"'+a+'"',"(line)":y.line,"(context)":k,"(breakage)":0,"(loopage)":0,"(scope)":H,"(statement)":c},d=k,P.funct=k,m.push(k),b&&nb(b,"function"),k["(params)"]=$b(),Wb(!1,!1,!0),H=f,B=e,k["(last)"]=P.line,k=k["(context)"],d}function bc(){function a(){var a={},b=y;qb("{");if(y.id!=="}")for(;;){if(y.id==="(end)")kb("Missing '}' to match '{' from line {a}.",y,b.line);else{if(y.id==="}"){ib("Unexpected comma.",P);break}y.id===","?kb("Unexpected comma.",y):y.id!=="(string)"&&ib("Expected a string and instead saw {a}.",y,y.value)}a[y.value]===!0?ib("Duplicate key '{a}'.",y,y.value):y.value==="__proto__"&&!B.proto||y.value==="__iterator__"&&!B.iterator?ib("The '{a}' key may produce unexpected results.",y,y.value):a[y.value]=!0,qb(),qb(":"),bc();if(y.id!==",")break;qb(",")}qb("}")}function b(){var a=y;qb("[");if(y.id!=="]")for(;;){if(y.id==="(end)")kb("Missing ']' to match '[' from line {a}.",y,a.line);else{if(y.id==="]"){ib("Unexpected comma.",P);break}y.id===","&&kb("Unexpected comma.",y)}bc();if(y.id!==",")break;qb(",")}qb("]")}switch(y.id){case"{":a();break;case"[":b();break;case"true":case"false":case"null":case"(number)":case"(string)":qb();break;case"-":qb("-"),P.character!==y.from&&ib("Unexpected space after '-'.",P),sb(P,y),qb("(number)");break;default:kb("Expected a JSON value.",y)}}var a,b={"<":!0,"<=":!0,"==":!0,"===":!0,"!==":!0,"!=":!0,">":!0,">=":!0,"+":!0,"-":!0,"*":!0,"/":!0,"%":!0},c={asi:!0,bitwise:!0,boss:!0,browser:!0,couch:!0,curly:!0,debug:!0,devel:!0,dojo:!0,eqeqeq:!0,eqnull:!0,es5:!0,esnext:!0,evil:!0,expr:!0,forin:!0,funcscope:!0,globalstrict:!0,immed:!0,iterator:!0,jquery:!0,lastsemic:!0,latedef:!0,laxbreak:!0,laxcomma:!0,loopfunc:!0,mootools:!0,multistr:!0,newcap:!0,noarg:!0,node:!0,noempty:!0,nonew:!0,nonstandard:!0,nomen:!0,onevar:!0,onecase:!0,passfail:!0,plusplus:!0,proto:!0,prototypejs:!0,regexdash:!0,regexp:!0,rhino:!0,undef:!0,scripturl:!0,shadow:!0,smarttabs:!0,strict:!0,sub:!0,supernew:!0,trailing:!0,validthis:!0,withstmt:!0,white:!0,wsh:!0},e={maxlen:!1,indent:!1,maxerr:!1,predef:!1},f={ArrayBuffer:!1,ArrayBufferView:!1,Audio:!1,addEventListener:!1,applicationCache:!1,atob:!1,blur:!1,btoa:!1,clearInterval:!1,clearTimeout:!1,close:!1,closed:!1,DataView:!1,DOMParser:!1,defaultStatus:!1,document:!1,event:!1,FileReader:!1,Float32Array:!1,Float64Array:!1,FormData:!1,focus:!1,frames:!1,getComputedStyle:!1,HTMLElement:!1,HTMLAnchorElement:!1,HTMLBaseElement:!1,HTMLBlockquoteElement:!1,HTMLBodyElement:!1,HTMLBRElement:!1,HTMLButtonElement:!1,HTMLCanvasElement:!1,HTMLDirectoryElement:!1,HTMLDivElement:!1,HTMLDListElement:!1,HTMLFieldSetElement:!1,HTMLFontElement:!1,HTMLFormElement:!1,HTMLFrameElement:!1,HTMLFrameSetElement:!1,HTMLHeadElement:!1,HTMLHeadingElement:!1,HTMLHRElement:!1,HTMLHtmlElement:!1,HTMLIFrameElement:!1,HTMLImageElement:!1,HTMLInputElement:!1,HTMLIsIndexElement:!1,HTMLLabelElement:!1,HTMLLayerElement:!1,HTMLLegendElement:!1,HTMLLIElement:!1,HTMLLinkElement:!1,HTMLMapElement:!1,HTMLMenuElement:!1,HTMLMetaElement:!1,HTMLModElement:!1,HTMLObjectElement:!1,HTMLOListElement:!1,HTMLOptGroupElement:!1,HTMLOptionElement:!1,HTMLParagraphElement:!1,HTMLParamElement:!1,HTMLPreElement:!1,HTMLQuoteElement:!1,HTMLScriptElement:!1,HTMLSelectElement:!1,HTMLStyleElement:!1,HTMLTableCaptionElement:!1,HTMLTableCellElement:!1,HTMLTableColElement:!1,HTMLTableElement:!1,HTMLTableRowElement:!1,HTMLTableSectionElement:!1,HTMLTextAreaElement:!1,HTMLTitleElement:!1,HTMLUListElement:!1,HTMLVideoElement:!1,history:!1,Int16Array:!1,Int32Array:!1,Int8Array:!1,Image:!1,length:!1,localStorage:!1,location:!1,MessageChannel:!1,MessageEvent:!1,MessagePort:!1,moveBy:!1,moveTo:!1,name:!1,navigator:!1,onbeforeunload:!0,onblur:!0,onerror:!0,onfocus:!0,onload:!0,onresize:!0,onunload:!0,open:!1,openDatabase:!1,opener:!1,Option:!1,parent:!1,print:!1,removeEventListener:!1,resizeBy:!1,resizeTo:!1,screen:!1,scroll:!1,scrollBy:!1,scrollTo:!1,sessionStorage:!1,setInterval:!1,setTimeout:!1,SharedWorker:!1,status:!1,top:!1,Uint16Array:!1,Uint32Array:!1,Uint8Array:!1,WebSocket:!1,window:!1,Worker:!1,XMLHttpRequest:!1,XMLSerializer:!1,XPathEvaluator:!1,XPathException:!1,XPathExpression:!1,XPathNamespace:!1,XPathNSResolver:!1,XPathResult:!1},g={require:!1,respond:!1,getRow:!1,emit:!1,send:!1,start:!1,sum:!1,log:!1,exports:!1,module:!1,provides:!1},h={alert:!1,confirm:!1,console:!1,Debug:!1,opera:!1,prompt:!1},i={dojo:!1,dijit:!1,dojox:!1,define:!1,require:!1},j={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"/":"\\/","\\":"\\\\"},k,l=["closure","exception","global","label","outer","unused","var"],m,n,o,p,q,r,s={$:!1,jQuery:!1},t,u,v,w,x={$:!1,$$:!1,Assets:!1,Browser:!1,Chain:!1,Class:!1,Color:!1,Cookie:!1,Core:!1,Document:!1,DomReady:!1,DOMReady:!1,Drag:!1,Element:!1,Elements:!1,Event:!1,Events:!1,Fx:!1,Group:!1,Hash:!1,HtmlTable:!1,Iframe:!1,IframeShim:!1,InputValidator:!1,instanceOf:!1,Keyboard:!1,Locale:!1,Mask:!1,MooTools:!1,Native:!1,Options:!1,OverText:!1,Request:!1,Scroller:!1,Slick:!1,Slider:!1,Sortables:!1,Spinner:!1,Swiff:!1,Tips:!1,Type:!1,typeOf:!1,URI:!1,Window:!1},y,z={__filename:!1,__dirname:!1,Buffer:!1,console:!1,exports:!1,GLOBAL:!1,global:!1,module:!1,process:!1,require:!1,setTimeout:!1,clearTimeout:!1,setInterval:!1,clearInterval:!1},A,B,C,D,E,F={$:!1,$$:!1,$A:!1,$F:!1,$H:!1,$R:!1,$break:!1,$continue:!1,$w:!1,Abstract:!1,Ajax:!1,Class:!1,Enumerable:!1,Element:!1,Event:!1,Field:!1,Form:!1,Hash:!1,Insertion:!1,ObjectRange:!1,PeriodicalExecuter:!1,Position:!1,Prototype:!1,Selector:!1,Template:!1,Toggle:!1,Try:!1,Autocompleter:!1,Builder:!1,Control:!1,Draggable:!1,Draggables:!1,Droppables:!1,Effect:!1,Sortable:!1,SortableObserver:!1,Sound:!1,Scriptaculous:!1},G={defineClass:!1,deserialize:!1,gc:!1,help:!1,importPackage:!1,java:!1,load:!1,loadClass:!1,print:!1,quit:!1,readFile:!1,readUrl:!1,runCommand:!1,seal:!1,serialize:!1,spawn:!1,sync:!1,toint32:!1,version:!1},H,I,J={Array:!1,Boolean:!1,Date:!1,decodeURI:!1,decodeURIComponent:!1,encodeURI:!1,encodeURIComponent:!1,Error:!1,eval:!1,EvalError:!1,Function:!1,hasOwnProperty:!1,isFinite:!1,isNaN:!1,JSON:!1,Math:!1,Number:!1,Object:!1,parseInt:!1,parseFloat:!1,RangeError:!1,ReferenceError:!1,RegExp:!1,String:!1,SyntaxError:!1,TypeError:!1,URIError:!1},K={escape:!1,unescape:!1},L={E:!0,LN2:!0,LN10:!0,LOG2E:!0,LOG10E:!0,MAX_VALUE:!0,MIN_VALUE:!0,NEGATIVE_INFINITY:!0,PI:!0,POSITIVE_INFINITY:!0,SQRT1_2:!0,SQRT2:!0},M,N={},O,P,Q,R,S,T={ActiveXObject:!0,Enumerator:!0,GetObject:!0,ScriptEngine:!0,ScriptEngineBuildVersion:!0,ScriptEngineMajorVersion:!0,ScriptEngineMinorVersion:!0,VBArray:!0,WSH:!0,WScript:!0,XDomainRequest:!0},U,V,W,X,Y,Z,$,_,ab;(function(){U=/@cc|<\/?|script|\]\s*\]|<\s*!|&lt/i,V=/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,W=/^\s*([(){}\[.,:;'"~\?\]#@]|==?=?|\/(\*(jshint|jslint|members?|global)?|=|\/)?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|%=?|&[&=]?|\|[|=]?|>>?>?=?|<([\/=!]|\!(\[|--)?|<=?)?|\^=?|\!=?=?|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+([xX][0-9a-fA-F]+|\.[0-9]*)?([eE][+\-]?[0-9]+)?)/,X=/[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,Y=/[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,Z=/\*\/|\/\*/,$=/^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,_=/^(?:javascript|jscript|ecmascript|vbscript|mocha|livescript)\s*:/i,ab=/^\s*\/\*\s*falls\sthrough\s*\*\/\s*$/})(),typeof Array.isArray!="function"&&(Array.isArray=function(a){return Object.prototype.toString.apply(a)==="[object Array]"}),typeof Object.create!="function"&&(Object.create=function(a){return bb.prototype=a,new bb}),typeof Object.keys!="function"&&(Object.keys=function(a){var b=[],c;for(c in a)cb(a,c)&&b.push(c);return b}),typeof String.prototype.entityify!="function"&&(String.prototype.entityify=function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}),typeof String.prototype.isAlpha!="function"&&(String.prototype.isAlpha=function(){return this>="a"&&this<="z￿"||this>="A"&&this<="Z￿"}),typeof String.prototype.isDigit!="function"&&(String.prototype.isDigit=function(){return this>="0"&&this<="9"}),typeof String.prototype.supplant!="function"&&(String.prototype.supplant=function(a){return this.replace(/\{([^{}]*)\}/g,function(b,c){var d=a[c];return typeof d=="string"||typeof d=="number"?d:b})}),typeof String.prototype.name!="function"&&(String.prototype.name=function(){return $.test(this)?this:X.test(this)?'"'+this.replace(Y,function(a){var b=j[a];return b?b:"\\u"+("0000"+a.charCodeAt().toString(16)).slice(-4)})+'"':'"'+this+'"'});var mb=function(){function f(){var a,c;return d>=t.length?!1:(b=1,e=t[d],d+=1,B.smarttabs?a=e.search(/ \t/):a=e.search(/ \t|\t /),a>=0&&jb("Mixed spaces and tabs.",d,a+1),e=e.replace(/\t/g,O),a=e.search(V),a>=0&&jb("Unsafe character.",d,a),B.maxlen&&B.maxlen<e.length&&jb("Line too long.",d,e.length),c=B.trailing&&e.match(/^(.*?)\s+$/),c&&!/^\s+$/.test(e)&&jb("Trailing whitespace.",d,c[1].length+1),!0)}function g(a,e){var f,g;return a==="(color)"||a==="(range)"?g={type:a}:a==="(punctuator)"||a==="(identifier)"&&cb(N,e)?g=N[e]||N["(error)"]:g=N[a],g=Object.create(g),(a==="(string)"||a==="(range)")&&!B.scripturl&&_.test(e)&&jb("Script URL.",d,c),a==="(identifier)"&&(g.identifier=!0,e==="__proto__"&&!B.proto?jb("The '{a}' property is deprecated.",d,c,e):e==="__iterator__"&&!B.iterator?jb("'{a}' is only available in JavaScript 1.7.",d,c,e):B.nomen&&(e.charAt(0)==="_"||e.charAt(e.length-1)==="_")&&(!B.node||P.id==="."||e!=="__dirname"&&e!=="__filename")&&jb("Unexpected {a} in '{b}'.",d,c,"dangling '_'",e)),g.value=e,g.line=d,g.character=b,g.from=c,f=g.id,f!=="(endline)"&&(D=f&&("(,=:[!&|?{};".indexOf(f.charAt(f.length-1))>=0||f==="return"||f==="case")),g}var b,c,d,e;return{init:function(a){typeof a=="string"?t=a.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n"):t=a,t[0]&&t[0].substr(0,2)==="#!"&&(t[0]=""),d=0,f(),c=1},range:function(a,f){var h,i="";c=b,e.charAt(0)!==a&&lb("Expected '{a}' and instead saw '{b}'.",d,b,a,e.charAt(0));for(;;){e=e.slice(1),b+=1,h=e.charAt(0);switch(h){case"":lb("Missing '{a}'.",d,b,h);break;case f:return e=e.slice(1),b+=1,g("(range)",i);case"\\":jb("Unexpected '{a}'.",d,b,h)}i+=h}},token:function(){function v(a){var d=a.exec(e),f;if(d)return n=d[0].length,f=d[1],h=f.charAt(0),e=e.substr(n),c=b+n-f.length,b+=n,f}function w(a){function l(a){var c=parseInt(e.substr(i+1,a),16);i+=a,c>=32&&c<=126&&c!==34&&c!==92&&c!==39&&jb("Unnecessary escapement.",d,b),b+=a,h=String.fromCharCode(c)}var h,i,j="",k=!1;r&&a!=='"'&&jb("Strings must use doublequote.",d,b),i=0;a:for(;;){while(i>=e.length){i=0;var m=d,n=c;if(!f()){lb("Unclosed string.",m,n);break a}k?k=!1:jb("Unclosed string.",m,n)}h=e.charAt(i);if(h===a)return b+=1,e=e.substr(i+1),g("(string)",j,a);if(h<" "){if(h==="\n"||h==="\r")break;jb("Control character in string: {a}.",d,b+i,e.slice(0,i))}else if(h==="\\"){i+=1,b+=1,h=e.charAt(i),u=e.charAt(i+1);switch(h){case"\\":case'"':case"/":break;case"'":r&&jb("Avoid \\'.",d,b);break;case"b":h="\b";break;case"f":h="\f";break;case"n":h="\n";break;case"r":h="\r";break;case"t":h="	";break;case"0":h="\0",u>=0&&u<=7&&M["use strict"]&&jb("Octal literals are not allowed in strict mode.",d,b);break;case"u":l(4);break;case"v":r&&jb("Avoid \\v.",d,b),h="";break;case"x":r&&jb("Avoid \\x-.",d,b),l(2);break;case"":k=!0;if(B.multistr){r&&jb("Avoid EOL escapement.",d,b),h="",b-=1;break}jb("Bad escapement of EOL. Use option multistr if needed.",d,b);break;default:jb("Bad escapement.",d,b)}}j+=h,b+=1,i+=1}}var a,h,i,j,k,l,m,n,o,p,q,s,t,u;for(;;){if(!e)return g(f()?"(endline)":"(end)","");q=v(W);if(!q){q="",h="";while(e&&e<"!")e=e.substr(1);e&&(lb("Unexpected '{a}'.",d,b,e.substr(0,1)),e="")}else{if(h.isAlpha()||h==="_"||h==="$")return g("(identifier)",q);if(h.isDigit())return isFinite(Number(q))||jb("Bad number '{a}'.",d,b,q),e.substr(0,1).isAlpha()&&jb("Missing space after '{a}'.",d,b,q),h==="0"&&(j=q.substr(1,1),j.isDigit()?P.id!=="."&&jb("Don't use extra leading zeros '{a}'.",d,b,q):r&&(j==="x"||j==="X")&&jb("Avoid 0x-. '{a}'.",d,b,q)),q.substr(q.length-1)==="."&&jb("A trailing decimal point can be confused with a dot '{a}'.",d,b,q),g("(number)",q);switch(q){case'"':case"'":return w(q);case"//":e="",P.comment=!0;break;case"/*":for(;;){m=e.search(Z);if(m>=0)break;f()||lb("Unclosed comment.",d,b)}b+=m+2,e.substr(m,1)==="/"&&lb("Nested comment.",d,b),e=e.substr(m+2),P.comment=!0;break;case"/*members":case"/*member":case"/*jshint":case"/*jslint":case"/*global":case"*/":return{value:q,type:"special",line:d,character:b,from:c};case"":break;case"/":P.id==="/="&&lb("A regular expression literal can be confused with '/='.",d,c);if(D){k=0,i=0,n=0;for(;;){a=!0,h=e.charAt(n),n+=1;switch(h){case"":return lb("Unclosed regular expression.",d,c),gb("Stopping.",d,c);case"/":k>0&&jb("{a} unterminated regular expression group(s).",d,c+n,k),h=e.substr(0,n-1),p={g:!0,i:!0,m:!0};while(p[e.charAt(n)]===!0)p[e.charAt(n)]=!1,n+=1;return b+=n,e=e.substr(n),p=e.charAt(0),(p==="/"||p==="*")&&lb("Confusing regular expression.",d,c),g("(regexp)",h);case"\\":h=e.charAt(n),h<" "?jb("Unexpected control character in regular expression.",d,c+n):h==="<"&&jb("Unexpected escaped character '{a}' in regular expression.",d,c+n,h),n+=1;break;case"(":k+=1,a=!1;if(e.charAt(n)==="?"){n+=1;switch(e.charAt(n)){case":":case"=":case"!":n+=1;break;default:jb("Expected '{a}' and instead saw '{b}'.",d,c+n,":",e.charAt(n))}}else i+=1;break;case"|":a=!1;break;case")":k===0?jb("Unescaped '{a}'.",d,c+n,")"):k-=1;break;case" ":p=1;while(e.charAt(n)===" ")n+=1,p+=1;p>1&&jb("Spaces are hard to count. Use {{a}}.",d,c+n,p);break;case"[":h=e.charAt(n),h==="^"&&(n+=1,B.regexp?jb("Insecure '{a}'.",d,c+n,h):e.charAt(n)==="]"&&lb("Unescaped '{a}'.",d,c+n,"^")),h==="]"&&jb("Empty class.",d,c+n-1),s=!1,t=!1;a:do{h=e.charAt(n),n+=1;switch(h){case"[":case"^":jb("Unescaped '{a}'.",d,c+n,h),t?t=!1:s=!0;break;case"-":s&&!t?(s=!1,t=!0):t?t=!1:e.charAt(n)==="]"?t=!0:(B.regexdash!==(n===2||n===3&&e.charAt(1)==="^")&&jb("Unescaped '{a}'.",d,c+n-1,"-"),s=!0);break;case"]":t&&!B.regexdash&&jb("Unescaped '{a}'.",d,c+n-1,"-");break a;case"\\":h=e.charAt(n),h<" "?jb("Unexpected control character in regular expression.",d,c+n):h==="<"&&jb("Unexpected escaped character '{a}' in regular expression.",d,c+n,h),n+=1,/[wsd]/i.test(h)?(t&&(jb("Unescaped '{a}'.",d,c+n,"-"),t=!1),s=!1):t?t=!1:s=!0;break;case"/":jb("Unescaped '{a}'.",d,c+n-1,"/"),t?t=!1:s=!0;break;case"<":t?t=!1:s=!0;break;default:t?t=!1:s=!0}}while(h);break;case".":B.regexp&&jb("Insecure '{a}'.",d,c+n,h);break;case"]":case"?":case"{":case"}":case"+":case"*":jb("Unescaped '{a}'.",d,c+n,h)}if(a)switch(e.charAt(n)){case"?":case"+":case"*":n+=1,e.charAt(n)==="?"&&(n+=1);break;case"{":n+=1,h=e.charAt(n),(h<"0"||h>"9")&&jb("Expected a number and instead saw '{a}'.",d,c+n,h),n+=1,o=+h;for(;;){h=e.charAt(n);if(h<"0"||h>"9")break;n+=1,o=+h+o*10}l=o;if(h===","){n+=1,l=Infinity,h=e.charAt(n);if(h>="0"&&h<="9"){n+=1,l=+h;for(;;){h=e.charAt(n);if(h<"0"||h>"9")break;n+=1,l=+h+l*10}}}e.charAt(n)!=="}"?jb("Expected '{a}' and instead saw '{b}'.",d,c+n,"}",h):n+=1,e.charAt(n)==="?"&&(n+=1),o>l&&jb("'{a}' should not be greater than '{b}'.",d,c+n,o,l)}}return h=e.substr(0,n-1),b+=n,e=e.substr(n),g("(regexp)",h)}return g("(punctuator)",q);case"#":return g("(punctuator)",q);default:return g("(punctuator)",q)}}}}}}();Gb("(number)",function(){return this}),Gb("(string)",function(){return this}),N["(identifier)"]={type:"(identifier)",lbp:0,identifier:!0,nud:function(){var b=this.value,c=H[b],d;typeof c=="function"?c=undefined:typeof c=="boolean"&&(d=k,k=m[0],nb(b,"var"),c=k,k=d);if(k===c)switch(k[b]){case"unused":k[b]="var";break;case"unction":k[b]="function",this["function"]=!0;break;case"function":this["function"]=!0;break;case"label":ib("'{a}' is a statement label.",P,b)}else if(k["(global)"])B.undef&&typeof C[b]!="boolean"&&(a!=="typeof"&&a!=="delete"||y&&(y.value==="."||y.value==="["))&&hb(k,"'{a}' is not defined.",P,b),Yb(P);else switch(k[b]){case"closure":case"function":case"var":case"unused":ib("'{a}' used out of scope.",P,b);break;case"label":ib("'{a}' is a statement label.",P,b);break;case"outer":case"global":break;default:if(c===!0)k[b]=!0;else if(c===null)ib("'{a}' is not allowed.",P,b),Yb(P);else if(typeof c!="object")B.undef&&(a!=="typeof"&&a!=="delete"||y&&(y.value==="."||y.value==="["))&&hb(k,"'{a}' is not defined.",P,b),k[b]=!0,Yb(P);else switch(c[b]){case"function":case"unction":this["function"]=!0,c[b]="closure",k[b]=c["(global)"]?"global":"outer";break;case"var":case"unused":c[b]="closure",k[b]=c["(global)"]?"global":"outer";break;case"closure":case"parameter":k[b]=c["(global)"]?"global":"outer";break;case"label":ib("'{a}' is a statement label.",P,b)}}return this},led:function(){kb("Expected an operator and instead saw '{a}'.",y,y.value)}},Gb("(regexp)",function(){return this}),Bb("(endline)"),Bb("(begin)"),Bb("(end)").reach=!0,Bb("</").reach=!0,Bb("<!"),Bb("<!--"),Bb("-->"),Bb("(error)").reach=!0,Bb("}").reach=!0,Bb(")"),Bb("]"),Bb('"').reach=!0,Bb("'").reach=!0,Bb(";"),Bb(":").reach=!0,Bb(","),Bb("#"),Bb("@"),Hb("else"),Hb("case").reach=!0,Hb("catch"),Hb("default").reach=!0,Hb("finally"),Ib("arguments",function(a){M["use strict"]&&k["(global)"]&&ib("Strict violation.",a)}),Ib("eval"),Ib("false"),Ib("Infinity"),Ib("NaN"),Ib("null"),Ib("this",function(a){M["use strict"]&&!B.validthis&&(k["(statement)"]&&k["(name)"].charAt(0)>"Z"||k["(global)"])&&ib("Possible strict violation.",a)}),Ib("true"),Ib("undefined"),Mb("=","assign",20),Mb("+=","assignadd",20),Mb("-=","assignsub",20),Mb("*=","assignmult",20),Mb("/=","assigndiv",20).nud=function(){kb("A regular expression literal can be confused with '/='.")},Mb("%=","assignmod",20),Ob("&=","assignbitand",20),Ob("|=","assignbitor",20),Ob("^=","assignbitxor",20),Ob("<<=","assignshiftleft",20),Ob(">>=","assignshiftright",20),Ob(">>>=","assignshiftrightunsigned",20),Jb("?",function(a,b){return b.left=a,b.right=rb(10),qb(":"),b["else"]=rb(10),b},30),Jb("||","or",40),Jb("&&","and",50),Nb("|","bitor",70),Nb("^","bitxor",80),Nb("&","bitand",90),Kb("==",function(a,b){var c=B.eqnull&&(a.value==="null"||b.value==="null");return!c&&B.eqeqeq?ib("Expected '{a}' and instead saw '{b}'.",this,"===","=="):Lb(a)?ib("Use '{a}' to compare with '{b}'.",this,"===",a.value):Lb(b)&&ib("Use '{a}' to compare with '{b}'.",this,"===",b.value),this}),Kb("==="),Kb("!=",function(a,b){var c=B.eqnull&&(a.value==="null"||b.value==="null");return!c&&B.eqeqeq?ib("Expected '{a}' and instead saw '{b}'.",this,"!==","!="):Lb(a)?ib("Use '{a}' to compare with '{b}'.",this,"!==",a.value):Lb(b)&&ib("Use '{a}' to compare with '{b}'.",this,"!==",b.value),this}),Kb("!=="),Kb("<"),Kb(">"),Kb("<="),Kb(">="),Nb("<<","shiftleft",120),Nb(">>","shiftright",120),Nb(">>>","shiftrightunsigned",120),Jb("in","in",120),Jb("instanceof","instanceof",120),Jb("+",function(a,b){var c=rb(130);return a&&c&&a.id==="(string)"&&c.id==="(string)"?(a.value+=c.value,a.character=c.character,!B.scripturl&&_.test(a.value)&&ib("JavaScript URL.",a),a):(b.left=a,b.right=c,b)},130),Fb("+","num"),Fb("+++",function(){return ib("Confusing pluses."),this.right=rb(150),this.arity="unary",this}),Jb("+++",function(a){return ib("Confusing pluses."),this.left=a,this.right=rb(130),this},130),Jb("-","sub",130),Fb("-","neg"),Fb("---",function(){return ib("Confusing minuses."),this.right=rb(150),this.arity="unary",this}),Jb("---",function(a){return ib("Confusing minuses."),this.left=a,this.right=rb(130),this},130),Jb("*","mult",140),Jb("/","div",140),Jb("%","mod",140),Pb("++","postinc"),Fb("++","preinc"),N["++"].exps=!0,Pb("--","postdec"),Fb("--","predec"),N["--"].exps=!0,Fb("delete",function(){var a=rb(0);return(!a||a.id!=="."&&a.id!=="[")&&ib("Variables should not be deleted."),this.first=a,this}).exps=!0,Fb("~",function(){return B.bitwise&&ib("Unexpected '{a}'.",this,"~"),rb(150),this}),Fb("!",function(){return this.right=rb(150),this.arity="unary",b[this.right.id]===!0&&ib("Confusing use of '{a}'.",this,"!"),this}),Fb("typeof","typeof"),Fb("new",function(){var a=rb(155),b;if(a&&a.id!=="function")if(a.identifier){a["new"]=!0;switch(a.value){case"Number":case"String":case"Boolean":case"Math":case"JSON":ib("Do not use {a} as a constructor.",P,a.value);break;case"Function":B.evil||ib("The Function constructor is eval.");break;case"Date":case"RegExp":break;default:a.id!=="function"&&(b=a.value.substr(0,1),B.newcap&&(b<"A"||b>"Z")&&ib("A constructor name should start with an uppercase letter.",P))}}else a.id!=="."&&a.id!=="["&&a.id!=="("&&ib("Bad constructor.",P);else B.supernew||ib("Weird construction. Delete 'new'.",this);return sb(P,y),y.id!=="("&&!B.supernew&&ib("Missing '()' invoking a constructor."),this.first=a,this}),N["new"].exps=!0,Fb("void").exps=!0,Jb(".",function(a,b){sb(E,P),tb();var c=Rb();return typeof c=="string"&&Xb(c),b.left=a,b.right=c,!a||a.value!=="arguments"||c!=="callee"&&c!=="caller"?!B.evil&&a&&a.value==="document"&&(c==="write"||c==="writeln")&&ib("document.write can be a form of eval.",a):B.noarg?ib("Avoid arguments.{a}.",a,c):M["use strict"]&&kb("Strict violation."),!B.evil&&(c==="eval"||c==="execScript")&&ib("eval is evil."),b},160,!0),Jb("(",function(a,b){E.id!=="}"&&E.id!==")"&&tb(E,P),ub(),B.immed&&!a.immed&&a.id==="function"&&ib("Wrap an immediate function invocation in parentheses to assist the reader in understanding that the expression is the result of a function, and not the function itself.");var c=0,d=[];a&&a.type==="(identifier)"&&a.value.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/)&&a.value!=="Number"&&a.value!=="String"&&a.value!=="Boolean"&&a.value!=="Date"&&(a.value==="Math"?ib("Math is not a function.",a):B.newcap&&ib("Missing 'new' prefix when invoking a constructor.",a));if(y.id!==")")for(;;){d[d.length]=rb(10),c+=1;if(y.id!==",")break;zb()}return qb(")"),ub(E,P),typeof a=="object"&&(a.value==="parseInt"&&c===1&&ib("Missing radix parameter.",a),B.evil||(a.value==="eval"||a.value==="Function"||a.value==="execScript"?ib("eval is evil.",a):d[0]&&d[0].id==="(string)"&&(a.value==="setTimeout"||a.value==="setInterval")&&ib("Implied eval is evil. Pass a function instead of a string.",a)),!a.identifier&&a.id!=="."&&a.id!=="["&&a.id!=="("&&a.id!=="&&"&&a.id!=="||"&&a.id!=="?"&&ib("Bad invocation.",a)),b.left=a,b},155,!0).exps=!0,Fb("(",function(){ub(),y.id==="function"&&(y.immed=!0);var a=rb(0);return qb(")",this),ub(E,P),B.immed&&a.id==="function"&&(y.id==="("||y.id==="."&&(pb().value==="call"||pb().value==="apply")?ib("Move the invocation into the parens that contain the function.",y):ib("Do not wrap function literals in parens unless they are to be immediately invoked.",this)),a}),Jb("[",function(a,b){tb(E,P),ub();var c=rb(0),d;return c&&c.type==="(string)"&&(!B.evil&&(c.value==="eval"||c.value==="execScript")&&ib("eval is evil.",b),Xb(c.value),!B.sub&&$.test(c.value)&&(d=N[c.value],(!d||!d.reserved)&&ib("['{a}'] is better written in dot notation.",c,c.value))),qb("]",b),ub(E,P),b.left=a,b.right=c,b},160,!0),Fb("[",function(){var a=P.line!==y.line;this.first=[],a&&(q+=B.indent,y.from===q+B.indent&&(q+=B.indent));while(y.id!=="(end)"){while(y.id===",")ib("Extra comma."),qb(",");if(y.id==="]")break;a&&P.line!==y.line&&xb(),this.first.push(rb(10));if(y.id!==",")break;zb();if(y.id==="]"&&!B.es5){ib("Extra comma.",P);break}}return a&&(q-=B.indent,xb()),qb("]",this),this},160),function(a){a.nud=function(){function h(a,b){g[a]&&cb(g,a)?ib("Duplicate member '{a}'.",y,c):g[a]={},g[a].basic=!0,g[a].basicToken=b}function i(a,b){g[a]&&cb(g,a)?(g[a].basic||g[a].setter)&&ib("Duplicate member '{a}'.",y,c):g[a]={},g[a].setter=!0,g[a].setterToken=b}function j(a){g[a]&&cb(g,a)?(g[a].basic||g[a].getter)&&ib("Duplicate member '{a}'.",y,c):g[a]={},g[a].getter=!0,g[a].getterToken=P}var a,b,c,d,e,f,g={};a=P.line!==y.line,a&&(q+=B.indent,y.from===q+B.indent&&(q+=B.indent));for(;;){if(y.id==="}")break;a&&xb();if(y.value==="get"&&pb().id!==":")qb("get"),B.es5||kb("get/set are ES5 features."),c=Zb(),c||kb("Missing property name."),j(c),f=y,sb(P,y),b=_b(),e=b["(params)"],e&&ib("Unexpected parameter '{a}' in get {b} function.",f,e[0],c),sb(P,y);else if(y.value==="set"&&pb().id!==":")qb("set"),B.es5||kb("get/set are ES5 features."),c=Zb(),c||kb("Missing property name."),i(c,y),f=y,sb(P,y),b=_b(),e=b["(params)"],(!e||e.length!==1)&&ib("Expected a single parameter in set {a} function.",f,c);else{c=Zb(),h(c,y);if(typeof c!="string")break;qb(":"),vb(P,y),rb(10)}Xb(c);if(y.id!==",")break;zb(),y.id===","?ib("Extra comma.",P):y.id==="}"&&!B.es5&&ib("Extra comma.",P)}a&&(q-=B.indent,xb()),qb("}",this);if(B.es5)for(var k in g)cb(g,k)&&g[k].setter&&!g[k].getter&&ib("Setter is defined without getter.",g[k].setterToken);return this},a.fud=function(){kb("Expected to see a statement and instead saw a block.",P)}}(Bb("{")),R=function(){var a=Cb("const",function(a){var b,c,d;this.first=[];for(;;){vb(P,y),b=Rb(),k[b]==="const"&&ib("const '"+b+"' has already been declared"),k["(global)"]&&C[b]===!1&&ib("Redefinition of '{a}'.",P,b),nb(b,"const");if(a)break;c=P,this.first.push(P),y.id!=="="&&ib("const '{a}' is initialized to 'undefined'.",P,b),y.id==="="&&(vb(P,y),qb("="),vb(P,y),y.id==="undefined"&&ib("It is not necessary to initialize '{a}' to 'undefined'.",P,b),pb(0).id==="="&&y.identifier&&kb("Constant {a} was not declared correctly.",y,y.value),d=rb(0),c.first=d);if(y.id!==",")break;zb()}return this});a.exps=!0};var ac=Cb("var",function(a){var b,c,d;k["(onevar)"]&&B.onevar?ib("Too many var statements."):k["(global)"]||(k["(onevar)"]=!0),this.first=[];for(;;){vb(P,y),b=Rb(),B.esnext&&k[b]==="const"&&ib("const '"+b+"' has already been declared"),k["(global)"]&&C[b]===!1&&ib("Redefinition of '{a}'.",P,b),nb(b,"unused");if(a)break;c=P,this.first.push(P),y.id==="="&&(vb(P,y),qb("="),vb(P,y),y.id==="undefined"&&ib("It is not necessary to initialize '{a}' to 'undefined'.",P,b),pb(0).id==="="&&y.identifier&&kb("Variable {a} was not declared correctly.",y,y.value),d=rb(0),c.first=d);if(y.id!==",")break;zb()}return this});ac.exps=!0,Db("function",function(){p&&ib("Function declarations should not be placed in blocks. Use a function expression or move the statement to the top of the outer function.",P);var a=Rb();return B.esnext&&k[a]==="const"&&ib("const '"+a+"' has already been declared"),sb(P,y),nb(a,"unction"),_b(a,!0),y.id==="("&&y.line===P.line&&kb("Function declarations are not invocable. Wrap the whole function invocation in parens."),this}),Fb("function",function(){var a=Qb();return a?sb(P,y):vb(P,y),_b(a),!B.loopfunc&&k["(loopage)"]&&ib("Don't make functions within a loop."),this}),Db("if",function(){var a=y;return qb("("),vb(this,a),ub(),rb(20),y.id==="="&&(B.boss||ib("Expected a conditional expression and instead saw an assignment."),qb("="),rb(20)),qb(")",a),ub(E,P),Wb(!0,!0),y.id==="else"&&(vb(P,y),qb("else"),y.id==="if"||y.id==="switch"?Tb(!0):Wb(!0,!0)),this}),Db("try",function(){var a,b,c;Wb(!1),y.id==="catch"&&(qb("catch"),vb(P,y),qb("("),c=H,H=Object.create(c),b=y.value,y.type!=="(identifier)"?ib("Expected an identifier and instead saw '{a}'.",y,b):nb(b,"exception"),qb(),qb(")"),Wb(!1),a=!0,H=c);if(y.id==="finally"){qb("finally"),Wb(!1);return}return a||kb("Expected '{a}' and instead saw '{b}'.",y,"catch",y.value),this}),Db("while",function(){var a=y;return k["(breakage)"]+=1,k["(loopage)"]+=1,qb("("),vb(this,a),ub(),rb(20),y.id==="="&&(B.boss||ib("Expected a conditional expression and instead saw an assignment."),qb("="),rb(20)),qb(")",a),ub(E,P),Wb(!0,!0),k["(breakage)"]-=1,k["(loopage)"]-=1,this}).labelled=!0,Db("with",function(){var a=y;return M["use strict"]?kb("'with' is not allowed in strict mode.",P):B.withstmt||ib("Don't use 'with'.",P),qb("("),vb(this,a),ub(),rb(0),qb(")",a),ub(E,P),Wb(!0,!0),this}),Db("switch",function(){var a=y,b=!1;k["(breakage)"]+=1,qb("("),vb(this,a),ub(),this.condition=rb(20),qb(")",a),ub(E,P),vb(P,y),a=y,qb("{"),vb(P,y),q+=B.indent,this.cases=[];for(;;)switch(y.id){case"case":switch(k["(verb)"]){case"break":case"case":case"continue":case"return":case"switch":case"throw":break;default:ab.test(t[y.line-2])||ib("Expected a 'break' statement before 'case'.",P)}xb(-B.indent),qb("case"),this.cases.push(rb(20)),b=!0,qb(":"),k["(verb)"]="case";break;case"default":switch(k["(verb)"]){case"break":case"continue":case"return":case"throw":break;default:ab.test(t[y.line-2])||ib("Expected a 'break' statement before 'default'.",P)}xb(-B.indent),qb("default"),b=!0,qb(":");break;case"}":q-=B.indent,xb(),qb("}",a);if(this.cases.length===1||this.condition.id==="true"||this.condition.id==="false")B.onecase||ib("This 'switch' should be an 'if'.",this);k["(breakage)"]-=1,k["(verb)"]=undefined;return;case"(end)":kb("Missing '{a}'.",y,"}");return;default:if(b)switch(P.id){case",":kb("Each value should have its own case label.");return;case":":b=!1,Ub();break;default:kb("Missing ':' on a case clause.",P);return}else{if(P.id!==":"){kb("Expected '{a}' and instead saw '{b}'.",y,"case",y.value);return}qb(":"),kb("Unexpected '{a}'.",P,":"),Ub()}}}).labelled=!0,Cb("debugger",function(){return B.debug||ib("All 'debugger' statements should be removed."),this}).exps=!0,function(){var a=Cb("do",function(){k["(breakage)"]+=1,k["(loopage)"]+=1,this.first=Wb(!0),qb("while");var a=y;return vb(P,a),qb("("),ub(),rb(20),y.id==="="&&(B.boss||ib("Expected a conditional expression and instead saw an assignment."),qb("="),rb(20)),qb(")",a),ub(E,P),k["(breakage)"]-=1,k["(loopage)"]-=1,this});a.labelled=!0,a.exps=!0}(),Db("for",function(){var a,b=y;k["(breakage)"]+=1,k["(loopage)"]+=1,qb("("),vb(this,b),ub();if(pb(y.id==="var"?1:0).id==="in"){if(y.id==="var")qb("var"),ac.fud.call(ac,!0);else{switch(k[y.value]){case"unused":k[y.value]="var";break;case"var":break;default:ib("Bad for in variable '{a}'.",y,y.value)}qb()}return qb("in"),rb(20),qb(")",b),a=Wb(!0,!0),B.forin&&a&&(a.length>1||typeof a[0]!="object"||a[0].value!=="if")&&ib("The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.",this),k["(breakage)"]-=1,k["(loopage)"]-=1,this}if(y.id!==";")if(y.id==="var")qb("var"),ac.fud.call(ac);else for(;;){rb(0,"for");if(y.id!==",")break;zb()}yb(P),qb(";"),y.id!==";"&&(rb(20),y.id==="="&&(B.boss||ib("Expected a conditional expression and instead saw an assignment."),qb("="),rb(20))),yb(P),qb(";"),y.id===";"&&kb("Expected '{a}' and instead saw '{b}'.",y,")",";");if(y.id!==")")for(;;){rb(0,"for");if(y.id!==",")break;zb()}return qb(")",b),ub(E,P),Wb(!0,!0),k["(breakage)"]-=1,k["(loopage)"]-=1,this}).labelled=!0,Cb("break",function(){var a=y.value;return k["(breakage)"]===0&&ib("Unexpected '{a}'.",y,this.value),B.asi||yb(this),y.id!==";"&&P.line===y.line&&(k[a]!=="label"?ib("'{a}' is not a statement label.",y,a):H[a]!==k&&ib("'{a}' is out of scope.",y,a),this.first=y,qb()),Sb("break"),this}).exps=!0,Cb("continue",function(){var a=y.value;return k["(breakage)"]===0&&ib("Unexpected '{a}'.",y,this.value),B.asi||yb(this),y.id!==";"?P.line===y.line&&(k[a]!=="label"?ib("'{a}' is not a statement label.",y,a):H[a]!==k&&ib("'{a}' is out of scope.",y,a),this.first=y,qb()):k["(loopage)"]||ib("Unexpected '{a}'.",y,this.value),Sb("continue"),this}).exps=!0,Cb("return",function(){return this.line===y.line?(y.id==="(regexp)"&&ib("Wrap the /regexp/ literal in parens to disambiguate the slash operator."),y.id!==";"&&!y.reach&&(vb(P,y),pb().value==="="&&!B.boss&&jb("Did you mean to return a conditional instead of an assignment?",P.line,P.character+1),this.first=rb(0))):B.asi||yb(this),Sb("return"),this}).exps=!0,Cb("throw",function(){return yb(this),vb(P,y),this.first=rb(20),Sb("throw"),this}).exps=!0,Hb("class"),Hb("const"),Hb("enum"),Hb("export"),Hb("extends"),Hb("import"),Hb("super"),Hb("let"),Hb("yield"),Hb("implements"),Hb("interface"),Hb("package"),Hb("private"),Hb("protected"),Hb("public"),Hb("static");var cc=function(a,b,c){var e,f,g;d.errors=[],d.undefs=[],C=Object.create(J),eb(C,c||{});if(b){e=b.predef;if(e)if(Array.isArray(e))for(f=0;f<e.length;f+=1)C[e[f]]=!0;else if(typeof e=="object"){g=Object.keys(e);for(f=0;f<g.length;f+=1)C[g[f]]=!!e[g[f]]}B=b}else B={};B.indent=B.indent||4,B.maxerr=B.maxerr||50,O="";for(f=0;f<B.indent;f+=1)O+=" ";q=1,n=Object.create(C),H=n,k={"(global)":!0,"(name)":"(global)","(scope)":H,"(breakage)":0,"(loopage)":0},m=[k],Q=[],I=null,v={},w=null,o={},p=!1,u=[],r=!1,S=0,mb.init(a),D=!0,M={},E=P=y=N["(begin)"];for(var h in b)cb(b,h)&&db(h,P);fb(),eb(C,c||{}),zb.first=!0;try{qb();switch(y.id){case"{":case"[":B.laxbreak=!0,r=!0,bc();break;default:Vb(),M["use strict"]&&!B.globalstrict&&ib('Use the function form of "use strict".',E),Ub()}qb("(end)");var i=function(a,b){do{if(typeof b[a]=="string")return b[a]==="unused"?b[a]="var":b[a]==="unction"&&(b[a]="closure"),!0;b=b["(context)"]}while(b);return!1},j=function(a,b){if(!o[a])return;var c=[];for(var d=0;d<o[a].length;d+=1)o[a][d]!==b&&c.push(o[a][d]);c.length===0?delete o[a]:o[a]=c};for(f=0;f<d.undefs.length;f+=1)g=d.undefs[f].slice(0),i(g[2].value,g[0])?j(g[2].value,g[2].line):ib.apply(ib,g.slice(1))}catch(l){if(l){var s=y||{};d.errors.push({raw:l.raw,reason:l.message,line:l.line||s.line,character:l.character||s.from},null)}}return d.errors.length===0};return cc.data=function(){var a={functions:[],options:B},b,c,d=[],e,f,g,h=[],i,j=[],k;cc.errors.length&&(a.errors=cc.errors),r&&(a.json=!0);for(i in o)cb(o,i)&&d.push({name:i,line:o[i]});d.length>0&&(a.implieds=d),Q.length>0&&(a.urls=Q),c=Object.keys(H),c.length>0&&(a.globals=c);for(f=1;f<m.length;f+=1){e=m[f],b={};for(g=0;g<l.length;g+=1)b[l[g]]=[];for(i in e)cb(e,i)&&i.charAt(0)!=="("&&(k=e[i],k==="unction"&&(k="unused"),Array.isArray(b[k])&&(b[k].push(i),k==="unused"&&j.push({name:i,line:e["(line)"],"function":e["(name)"]})));for(g=0;g<l.length;g+=1)b[l[g]].length===0&&delete b[l[g]];b.name=e["(name)"],b.param=e["(params)"],b.line=e["(line)"],b.last=e["(last)"],a.functions.push(b)}j.length>0&&(a.unused=j),h=[];for(i in v)if(typeof v[i]=="number"){a.member=v;break}return a},cc.report=function(a){function o(a,b){var c,d,e;if(b){m.push("<div><i>"+a+"</i> "),b=b.sort();for(d=0;d<b.length;d+=1)b[d]!==e&&(e=b[d],m.push((c?", ":"")+e),c=!0);m.push("</div>")}}var b=cc.data(),c=[],d,e,f,g,h,i,j,k="",l,m=[],n;if(b.errors||b.implieds||b.unused){f=!0,m.push("<div id=errors><i>Error:</i>");if(b.errors)for(h=0;h<b.errors.length;h+=1)d=b.errors[h],d&&(e=d.evidence||"",m.push("<p>Problem"+(isFinite(d.line)?" at line "+d.line+" character "+d.character:"")+": "+d.reason.entityify()+"</p><p class=evidence>"+(e&&(e.length>80?e.slice(0,77)+"...":e).entityify())+"</p>"));if(b.implieds){n=[];for(h=0;h<b.implieds.length;h+=1)n[h]="<code>"+b.implieds[h].name+"</code>&nbsp;<i>"+b.implieds[h].line+"</i>";m.push("<p><i>Implied global:</i> "+n.join(", ")+"</p>")}if(b.unused){n=[];for(h=0;h<b.unused.length;h+=1)n[h]="<code><u>"+b.unused[h].name+"</u></code>&nbsp;<i>"+b.unused[h].line+"</i> <code>"+b.unused[h]["function"]+"</code>";m.push("<p><i>Unused variable:</i> "+n.join(", ")+"</p>")}b.json&&m.push("<p>JSON: bad.</p>"),m.push("</div>")}if(!a){m.push("<br><div id=functions>"),b.urls&&o("URLs<br>",b.urls,"<br>"),b.json&&!f?m.push("<p>JSON: good.</p>"):b.globals?m.push("<div><i>Global</i> "+b.globals.sort().join(", ")+"</div>"):m.push("<div><i>No new global variables introduced.</i></div>");for(h=0;h<b.functions.length;h+=1)g=b.functions[h],m.push("<br><div class=function><i>"+g.line+"-"+g.last+"</i> "+(g.name||"")+"("+(g.param?g.param.join(", "):"")+")</div>"),o("<big><b>Unused</b></big>",g.unused),o("Closure",g.closure),o("Variable",g["var"]),o("Exception",g.exception),o("Outer",g.outer),o("Global",g.global),o("Label",g.label);if(b.member){c=Object.keys(b.member);if(c.length){c=c.sort(),k="<br><pre id=members>/*members ",j=10;for(h=0;h<c.length;h+=1)i=c[h],l=i.name(),j+l.length>72&&(m.push(k+"<br>"),k="    ",j=1),j+=l.length+2,b.member[i]===1&&(l="<i>"+l+"</i>"),h<c.length-1&&(l+=", "),k+=l;m.push(k+"<br>*/</pre>")}m.push("</div>")}}return m.join("")},cc.jshint=cc,cc}();typeof b=="object"&&b&&(b.JSHINT=d)}),define("ace/narcissus/parser",["require","exports","module","ace/narcissus/lexer","ace/narcissus/definitions","ace/narcissus/options"],function(require,exports,module){function pushDestructuringVarDecls(a,b){for(var c in a){var d=a[c];d.type===IDENTIFIER?b.varDecls.push(d):pushDestructuringVarDecls(d,b)}}function Parser(a){a.parser=this,this.t=a,this.x=null,this.unexpectedEOF=!1,options.mozillaMode&&(this.mozillaMode=!0),options.parenFreeMode&&(this.parenFreeMode=!0)}function StaticContext(a,b,c,d,e){this.parentScript=a,this.parentBlock=b||a,this.inModule=c||!1,this.inFunction=d||!1,this.inForLoopInit=!1,this.topLevel=!0,this.allLabels=new Stack,this.currentLabels=new Stack,this.labeledTargets=new Stack,this.defaultLoopTarget=null,this.defaultTarget=null,this.strictMode=e}function Pragma(a){if(a.type===SEMICOLON){var b=a.expression;if(b.type===STRING&&b.value==="use strict")return a.pragma="strict",!0}return!1}function Node(a,b){var c=a.token;c?(this.type=c.type,this.value=c.value,this.lineno=c.lineno,this.start=c.start,this.end=c.end):this.lineno=a.lineno,this.filename=a.filename,this.children=[];for(var d in b)this[d]=b[d]}function SyntheticNode(a){this.children=[];for(var b in a)this[b]=a[b];this.synthetic=!0}function unevalableConst(a){var b=definitions.tokens[a],c=definitions.opTypeNames.hasOwnProperty(b)?definitions.opTypeNames[b]:b in definitions.keywords?b.toUpperCase():b;return{toSource:function(){return c}}}function tokenString(a){var b=definitions.tokens[a];return/^\W/.test(b)?definitions.opTypeNames[b]:b.toUpperCase()}function blockInit(){return{type:BLOCK,varDecls:[]}}function scriptInit(){return{type:SCRIPT,funDecls:[],varDecls:[],modDefns:new Dict,modAssns:new Dict,modDecls:new Dict,modLoads:new Dict,impDecls:[],expDecls:[],exports:new Dict,hasEmptyReturn:!1,hasReturnWithValue:!1,hasYield:!1}}function Export(a,b){this.node=a,this.isDefinition=b,this.resolved=null}function registerExport(a,b){function c(b,c){if(a.has(b))throw new SyntaxError("multiple exports of "+b);a.set(b,c)}switch(b.type){case MODULE:case FUNCTION:c(b.name,new Export(b,!0));break;case VAR:for(var d=0;d<b.children.length;d++)c(b.children[d].name,new Export(b.children[d],!0));break;case LET:case CONST:throw new Error("NYI: "+definitions.tokens[b.type]);case EXPORT:for(var d=0;d<b.pathList.length;d++){var e=b.pathList[d];switch(e.type){case OBJECT_INIT:for(var f=0;f<e.children.length;f++){var g=e.children[f];g.type===IDENTIFIER?c(g.value,new Export(g,!1)):c(g.children[0].value,new Export(g.children[1],!1))}break;case DOT:c(e.children[1].value,new Export(e,!1));break;case IDENTIFIER:c(e.value,new Export(e,!1));break;default:throw new Error("unexpected export path: "+definitions.tokens[e.type])}}break;default:throw new Error("unexpected export decl: "+definitions.tokens[exp.type])}}function Module(a){var b=a.body.exports,c=a.body.modDefns,d=new Dict;b.forEach(function(a,b){var e=b.node;if(e.type===MODULE)d.set(a,e);else if(!b.isDefinition&&e.type===IDENTIFIER&&c.has(e.value)){var f=c.get(e.value);d.set(a,f)}}),this.node=a,this.exports=b,this.exportedModules=d}function isPragmaToken(a){switch(a){case IDENTIFIER:case STRING:case NUMBER:case NULL:case TRUE:case FALSE:return!0}return!1}function parse(a,b,c){var d=new Tokenizer(a,b,c,options.allowHTMLComments),e=new Parser(d);return e.Script(!1,!1,!0)}function parseFunction(a,b,c,d,e){var f=new Tokenizer(a,d,e),g=new Parser(f);return g.x=new StaticContext(null,null,!1,!1,!1),g.FunctionDefinition(b,c)}function parseStdin(a,b,c,d){if(a.match(/^[\s]*\.begin[\s]*$/))return++b.value,parseMultiline(b,c);d(a.trim())&&(a="");for(;;)try{var e=new Tokenizer(a,"stdin",b.value,!1),f=new Parser(e),g=f.Script(!1,!1);return b.value=e.lineno,g}catch(h){if(!f.unexpectedEOF)throw h;var i;do{c&&putstr(c),i=readline();if(!i)throw h}while(d(i.trim()));a+="\n"+i}}function parseMultiline(a,b){var c="";for(;;){b&&putstr(b);var d=readline();if(d===null)return null;if(d.match(/^[\s]*\.end[\s]*$/))break;c+="\n"+d}var e=new Tokenizer(c,"stdin",a.value,!1),f=new Parser(e),g=f.Script(!1,!1);return a.value=e.lineno,g}var lexer=require("./lexer"),definitions=require("./definitions"),options=require("./options"),Tokenizer=lexer.Tokenizer,Dict=definitions.Dict,Stack=definitions.Stack;eval(definitions.consts),StaticContext.prototype={update:function(a){var b={};for(var c in a)b[c]={value:a[c],writable:!0,enumerable:!0,configurable:!0};return Object.create(this,b)},pushLabel:function(a){return this.update({currentLabels:this.currentLabels.push(a),allLabels:this.allLabels.push(a)})},pushTarget:function(a){var b=a.isLoop,c=b||a.type===SWITCH;return this.currentLabels.isEmpty()?(b&&this.update({defaultLoopTarget:a}),c&&this.update({defaultTarget:a}),this):(a.labels=new Dict,this.currentLabels.forEach(function(b){a.labels.set(b,!0)}),this.update({currentLabels:new Stack,labeledTargets:this.labeledTargets.push(a),defaultLoopTarget:b?a:this.defaultLoopTarget,defaultTarget:c?a:this.defaultTarget}))},nest:function(){return this.topLevel?this.update({topLevel:!1}):this},canImport:function(){return this.topLevel&&!this.inFunction},canExport:function(){return this.inModule&&this.topLevel&&!this.inFunction},banWith:function(){return this.strictMode||this.inModule},modulesAllowed:function(){return this.topLevel&&!this.inFunction}};var Pp=Parser.prototype;Pp.mozillaMode=!1,Pp.parenFreeMode=!1,Pp.withContext=function(a,b){var c=this.x;this.x=a;var d=b.call(this);return this.x=c,d},Pp.newNode=function(b){return new Node(this.t,b)},Pp.fail=function(b){throw this.t.newSyntaxError(b)},Pp.match=function(b,c,d){return this.t.match(b,c,d)},Pp.mustMatch=function(b,c){return this.t.mustMatch(b,c)},Pp.peek=function(b){return this.t.peek(b)},Pp.peekOnSameLine=function(b){return this.t.peekOnSameLine(b)},Pp.done=function(){return this.t.done},Pp.Script=function(b,c,d){var e=this.newNode(scriptInit()),f=new StaticContext(e,e,b,c);return this.withContext(f,function(){this.Statements(e,!0)}),d&&!this.done()&&this.fail("expected end of input"),e};var Np=Node.prototype=SyntheticNode.prototype={};Np.constructor=Node;var TO_SOURCE_SKIP={type:!0,value:!0,lineno:!0,start:!0,end:!0,tokenizer:!0,assignOp:!0};Np.toSource=function(){var b={},c=this;b.type=unevalableConst(this.type);if(this.generatingSource)return b.toSource();this.generatingSource=!0,"value"in this&&(b.value=this.value),"lineno"in this&&(b.lineno=this.lineno),"start"in this&&(b.start=this.start),"end"in this&&(b.end=this.end),this.assignOp&&(b.assignOp=unevalableConst(this.assignOp));for(var d in this)this.hasOwnProperty(d)&&!(d in TO_SOURCE_SKIP)&&(b[d]=this[d]);try{return b.toSource()}finally{delete this.generatingSource}},Np.push=function(a){return a!==null&&(a.start<this.start&&(this.start=a.start),this.end<a.end&&(this.end=a.end)),this.children.push(a)},Node.indentLevel=0,Np.toString=function(){var a=[];for(var b in this)this.hasOwnProperty(b)&&b!=="type"&&b!=="target"&&a.push({id:b,value:this[b]});a.sort(function(a,b){return a.id<b.id?-1:1});var c="    ",d=++Node.indentLevel,e="{\n"+c.repeat(d)+"type: "+tokenString(this.type);for(b=0;b<a.length;b++)e+=",\n"+c.repeat(d)+a[b].id+": "+a[b].value;return d=--Node.indentLevel,e+="\n"+c.repeat(d)+"}",e},Np.synth=function(a){var b=new SyntheticNode(a);return b.filename=this.filename,b.lineno=this.lineno,b.start=this.start,b.end=this.end,b};var LOOP_INIT={isLoop:!0};definitions.defineGetter(Np,"length",function(){throw new Error("Node.prototype.length is gone; use n.children.length instead")}),definitions.defineProperty(String.prototype,"repeat",function(a){var b="",c=this+b;while(--a>=0)b+=c;return b},!1,!1,!0),Pp.MaybeLeftParen=function(){return this.parenFreeMode?this.match(LEFT_PAREN)?LEFT_PAREN:END:this.mustMatch(LEFT_PAREN).type},Pp.MaybeRightParen=function(b){b===LEFT_PAREN&&this.mustMatch(RIGHT_PAREN)},Pp.Statements=function(b,c){var d=!!c;try{while(!this.done()&&this.peek(!0)!==RIGHT_CURLY){var e=this.Statement();b.push(e),d&&Pragma(e)?(this.x.strictMode=!0,b.strict=!0):d=!1}}catch(f){try{this.done()&&(this.unexpectedEOF=!0)}catch(f){}throw f}},Pp.Block=function(){this.mustMatch(LEFT_CURLY);var b=this.newNode(blockInit()),c=this.x.update({parentBlock:b}).pushTarget(b);return this.withContext(c,function(){this.Statements(b)}),this.mustMatch(RIGHT_CURLY),b};var DECLARED_FORM=0,EXPRESSED_FORM=1,STATEMENT_FORM=2;Pp.Statement=function(){var b,c,d,e,f,g,h,i=this.t.get(!0),j,k,l,m,n=this.t.blockComments;switch(i){case IMPORT:this.x.canImport()||this.fail("illegal context for import statement"),d=this.newNode(),d.pathList=this.ImportPathList(),this.x.parentScript.impDecls.push(d);break;case EXPORT:this.x.canExport()||this.fail("export statement not in module top level");switch(this.peek()){case MODULE:case FUNCTION:case LET:case VAR:case CONST:return d=this.Statement(),d.blockComments=n,d.exported=!0,this.x.parentScript.expDecls.push(d),registerExport(this.x.parentScript.exports,d),d}d=this.newNode(),d.pathList=this.ExportPathList(),this.x.parentScript.expDecls.push(d),registerExport(this.x.parentScript.exports,d);break;case FUNCTION:return this.FunctionDefinition(!0,this.x.topLevel?DECLARED_FORM:STATEMENT_FORM,n);case LEFT_CURLY:return d=this.newNode(blockInit()),l=this.x.update({parentBlock:d}).pushTarget(d).nest(),this.withContext(l,function(){this.Statements(d)}),this.mustMatch(RIGHT_CURLY),d;case IF:return d=this.newNode(),d.condition=this.HeadExpression(),l=this.x.pushTarget(d).nest(),this.withContext(l,function(){d.thenPart=this.Statement(),d.elsePart=this.match(ELSE,!0)?this.Statement():null}),d;case SWITCH:return d=this.newNode({cases:[],defaultIndex:-1}),d.discriminant=this.HeadExpression(),l=this.x.pushTarget(d).nest(),this.withContext(l,function(){this.mustMatch(LEFT_CURLY);while((i=this.t.get())!==RIGHT_CURLY){switch(i){case DEFAULT:d.defaultIndex>=0&&this.fail("More than one switch default");case CASE:e=this.newNode(),i===DEFAULT?d.defaultIndex=d.cases.length:e.caseLabel=this.Expression(COLON);break;default:this.fail("Invalid switch case")}this.mustMatch(COLON),e.statements=this.newNode(blockInit());while((i=this.peek(!0))!==CASE&&i!==DEFAULT&&i!==RIGHT_CURLY)e.statements.push(this.Statement());d.cases.push(e)}}),d;case FOR:return d=this.newNode(LOOP_INIT),d.blockComments=n,this.match(IDENTIFIER)&&(this.t.token.value==="each"?d.isEach=!0:this.t.unget()),this.parenFreeMode||this.mustMatch(LEFT_PAREN),l=this.x.pushTarget(d).nest(),m=this.x.update({inForLoopInit:!0}),e=null,(i=this.peek(!0))!==SEMICOLON&&this.withContext(m,function(){i===VAR||i===CONST?(this.t.get(),e=this.Variables()):i===LET?(this.t.get(),this.peek()===LEFT_PAREN?e=this.LetBlock(!1):(this.x.parentBlock=d,d.varDecls=[],e=this.Variables())):e=this.Expression()}),e&&this.match(IN)?(d.type=FOR_IN,this.withContext(m,function(){d.object=this.Expression();if(e.type===VAR||e.type===LET){g=e.children;if(g.length!==1&&e.destructurings.length!==1)throw new SyntaxError("Invalid for..in left-hand side",this.filename,e.lineno);e.destructurings.length>0?d.iterator=e.destructurings[0]:d.iterator=g[0],d.varDecl=e}else{if(e.type===ARRAY_INIT||e.type===OBJECT_INIT)e.destructuredNames=this.checkDestructuring(e);d.iterator=e}})):(m.inForLoopInit=!1,d.setup=e,this.mustMatch(SEMICOLON),d.isEach&&this.fail("Invalid for each..in loop"),this.withContext(m,function(){d.condition=this.peek(!0)===SEMICOLON?null:this.Expression(),this.mustMatch(SEMICOLON),j=this.peek(!0),d.update=(this.parenFreeMode?j===LEFT_CURLY||definitions.isStatementStartCode[j]:j===RIGHT_PAREN)?null:this.Expression()})),this.parenFreeMode||this.mustMatch(RIGHT_PAREN),this.withContext(l,function(){d.body=this.Statement()}),d;case WHILE:return d=this.newNode({isLoop:!0}),d.blockComments=n,d.condition=this.HeadExpression(),l=this.x.pushTarget(d).nest(),this.withContext(l,function(){d.body=this.Statement()}),d;case DO:return d=this.newNode({isLoop:!0}),d.blockComments=n,l=this.x.pushTarget(d).next(),this.withContext(l,function(){d.body=this.Statement()}),this.mustMatch(WHILE),d.condition=this.HeadExpression(),this.match(SEMICOLON),d;case BREAK:case CONTINUE:d=this.newNode(),d.blockComments=n,l=this.x.pushTarget(d),this.peekOnSameLine()===IDENTIFIER&&(this.t.get(),d.label=this.t.token.value),d.label?d.target=l.labeledTargets.find(function(a){return a.labels.has(d.label)}):i===CONTINUE?d.target=l.defaultLoopTarget:d.target=l.defaultTarget,d.target||this.fail("Invalid "+(i===BREAK?"break":"continue")),!d.target.isLoop&&i===CONTINUE&&this.fail("Invalid continue");break;case TRY:d=this.newNode({catchClauses:[]}),d.blockComments=n,d.tryBlock=this.Block();while(this.match(CATCH)){e=this.newNode(),f=this.MaybeLeftParen();switch(this.t.get()){case LEFT_BRACKET:case LEFT_CURLY:this.t.unget(),e.varName=this.DestructuringExpression(!0);break;case IDENTIFIER:e.varName=this.t.token.value;break;default:this.fail("missing identifier in catch")}this.match(IF)&&(this.mozillaMode||this.fail("Illegal catch guard"),d.catchClauses.length&&!d.catchClauses.top().guard&&this.fail("Guarded catch after unguarded"),e.guard=this.Expression()),this.MaybeRightParen(f),e.block=this.Block(),d.catchClauses.push(e)}return this.match(FINALLY)&&(d.finallyBlock=this.Block()),!d.catchClauses.length&&!d.finallyBlock&&this.fail("Invalid try statement"),d;case CATCH:case FINALLY:this.fail(definitions.tokens[i]+" without preceding try");case THROW:d=this.newNode(),d.exception=this.Expression();break;case RETURN:d=this.ReturnOrYield();break;case WITH:return this.x.banWith()&&this.fail("with statements not allowed in strict code or modules"),d=this.newNode(),d.blockComments=n,d.object=this.HeadExpression(),l=this.x.pushTarget(d).next(),this.withContext(l,function(){d.body=this.Statement()}),d;case VAR:case CONST:d=this.Variables();break;case LET:if(this.peek()===LEFT_PAREN)return d=this.LetBlock(!0),d;d=this.Variables();break;case DEBUGGER:d=this.newNode();break;case NEWLINE:case SEMICOLON:return d=this.newNode({type:SEMICOLON}),d.blockComments=n,d.expression=null,d;case IDENTIFIER:case USE:case MODULE:switch(this.t.token.value){case"use":if(!isPragmaToken(this.peekOnSameLine())){this.t.unget();break}return this.newNode({type:USE,params:this.Pragmas()});case"module":this.x.modulesAllowed()||this.fail("module declaration not at top level"),this.x.parentScript.hasModules=!0,i=this.peekOnSameLine();if(i!==IDENTIFIER&&i!==LEFT_CURLY){this.t.unget();break}d=this.newNode({type:MODULE}),d.blockComments=n,this.mustMatch(IDENTIFIER),c=this.t.token.value;if(this.match(LEFT_CURLY))return d.name=c,d.body=this.Script(!0,!1),d.module=new Module(d),this.mustMatch(RIGHT_CURLY),this.x.parentScript.modDefns.set(d.name,d),d;return this.t.unget(),this.ModuleVariables(d),d;default:i=this.peek();if(i===COLON)return c=this.t.token.value,this.x.allLabels.has(c)&&this.fail("Duplicate label: "+c),this.t.get(),d=this.newNode({type:LABEL,label:c}),d.blockComments=n,l=this.x.pushLabel(c).nest(),this.withContext(l,function(){d.statement=this.Statement()}),d.target=d.statement.type===LABEL?d.statement.target:d.statement,d};default:d=this.newNode({type:SEMICOLON}),this.t.unget(),d.blockComments=n,d.expression=this.Expression(),d.end=d.expression.end}return d.blockComments=n,this.MagicalSemicolon(),d},Pp.Pragmas=function(){var b=[];do b.push(this.Pragma());while(this.match(COMMA));return this.MagicalSemicolon(),b},Pp.Pragma=function(){var b=[],c;do c=this.t.get(!0),b.push(this.t.token);while(isPragmaToken(this.peek()));return b},Pp.MagicalSemicolon=function(){var b;this.t.lineno===this.t.token.lineno&&(b=this.peekOnSameLine(),b!==END&&b!==NEWLINE&&b!==SEMICOLON&&b!==RIGHT_CURLY&&this.fail("missing ; before statement")),this.match(SEMICOLON)},Pp.ReturnOrYield=function(){var b,c,d=this.t.token.type,e,f=this.x.parentScript;return d===RETURN?this.x.inFunction||this.fail("Return not in function"):(this.x.inFunction||this.fail("Yield not in function"),f.hasYield=!0),b=this.newNode({value:undefined}),e=d===RETURN?this.peekOnSameLine(!0):this.peek(!0),e!==END&&e!==NEWLINE&&e!==SEMICOLON&&e!==RIGHT_CURLY&&(d!==YIELD||e!==d&&e!==RIGHT_BRACKET&&e!==RIGHT_PAREN&&e!==COLON&&e!==COMMA)?d===RETURN?(b.value=this.Expression(),f.hasReturnWithValue=!0):b.value=this.AssignExpression():d===RETURN&&(f.hasEmptyReturn=!0),b},Pp.ModuleExpression=function(){return this.match(STRING)?this.newNode():this.QualifiedPath()},Pp.ImportPathList=function(){var b=[];do b.push(this.ImportPath());while(this.match(COMMA));return b},Pp.ImportPath=function(){var b=this.QualifiedPath();if(!this.match(DOT))return b.type===IDENTIFIER&&this.fail("cannot import local variable"),b;var c=this.newNode();return c.push(b),c.push(this.ImportSpecifierSet()),c},Pp.ExplicitSpecifierSet=function(b){var c,d,e,f;c=this.newNode({type:OBJECT_INIT}),this.mustMatch(LEFT_CURLY);if(!this.match(RIGHT_CURLY))do e=this.Identifier(),this.match(COLON)?(d=this.newNode({type:PROPERTY_INIT}),d.push(e),d.push(b()),c.push(d)):c.push(e);while(!this.match(RIGHT_CURLY)&&this.mustMatch(COMMA));return c},Pp.ImportSpecifierSet=function(){var b=this;return this.match(MUL)?this.newNode({type:IDENTIFIER,name:"*"}):ExplicitSpecifierSet(function(){return b.Identifier()})},Pp.Identifier=function(){return this.mustMatch(IDENTIFIER),this.newNode({type:IDENTIFIER})},Pp.IdentifierName=function(){return this.mustMatch(IDENTIFIER,!0),this.newNode({type:IDENTIFIER})},Pp.QualifiedPath=function(){var b,c;b=this.Identifier();while(this.match(DOT)){if(this.peek()!==IDENTIFIER){this.t.unget();break}c=this.newNode(),c.push(b),c.push(this.Identifier()),b=c}return b},Pp.ExportPath=function(){var b=this;return this.peek()===LEFT_CURLY?this.ExplicitSpecifierSet(function(){return b.QualifiedPath()}):this.QualifiedPath()},Pp.ExportPathList=function(){var b=[];do b.push(this.ExportPath());while(this.match(COMMA));return b},Pp.FunctionDefinition=function(b,c,d){var e,f=this.newNode({params:[],paramComments:[]});typeof d=="undefined"&&(d=null),f.blockComments=d,f.type!==FUNCTION&&(f.type=f.value==="get"?GETTER:SETTER),this.match(MUL)&&(f.isExplicitGenerator=!0),this.match(IDENTIFIER,!1,!0)?f.name=this.t.token.value:b&&this.fail("missing function identifier");var g=this.x.inModule;x2=new StaticContext(null,null,g,!0,this.x.strictMode),this.withContext(x2,function(){this.mustMatch(LEFT_PAREN);if(!this.match(RIGHT_PAREN)){do{e=this.t.get(),f.paramComments.push(this.t.lastBlockComment());switch(e){case LEFT_BRACKET:case LEFT_CURLY:this.t.unget(),f.params.push(this.DestructuringExpression());break;case IDENTIFIER:f.params.push(this.t.token.value);break;default:this.fail("missing formal parameter")}}while(this.match(COMMA));this.mustMatch(RIGHT_PAREN)}e=this.t.get(!0),e!==LEFT_CURLY&&this.t.unget(),e!==LEFT_CURLY?f.body=this.AssignExpression():f.body=this.Script(g,!0)}),e===LEFT_CURLY&&this.mustMatch(RIGHT_CURLY),f.end=this.t.token.end,f.functionForm=c,c===DECLARED_FORM&&this.x.parentScript.funDecls.push(f),this.x.inModule&&!f.isExplicitGenerator&&f.body.hasYield&&this.fail("yield in non-generator function");if(f.isExplicitGenerator||f.body.hasYield)f.body=this.newNode({type:GENERATOR,body:f.body});return f},Pp.ModuleVariables=function(b){var c,d;do c=this.Identifier(),this.match(ASSIGN)&&(d=this.ModuleExpression(),c.initializer=d,d.type===STRING?this.x.parentScript.modLoads.set(c.value,d.value):this.x.parentScript.modAssns.set(c.value,c)),b.push(c);while(this.match(COMMA))},Pp.Variables=function(b){var c,d,e,f,g,h;h=this.t.token.type;switch(h){case VAR:case CONST:g=this.x.parentScript;break;case LET:g=this.x.parentBlock;break;case LEFT_PAREN:h=LET,g=b}c=this.newNode({type:h,destructurings:[]});do{h=this.t.get();if(h===LEFT_BRACKET||h===LEFT_CURLY){this.t.unget();var i=this.DestructuringExpression(!0);d=this.newNode({type:IDENTIFIER,name:i,readOnly:c.type===CONST}),c.push(d),pushDestructuringVarDecls(d.name.destructuredNames,g),c.destructurings.push({exp:i,decl:d});if(this.x.inForLoopInit&&this.peek()===IN)continue;this.mustMatch(ASSIGN),this.t.token.assignOp&&this.fail("Invalid variable initialization"),d.blockComment=this.t.lastBlockComment(),d.initializer=this.AssignExpression();continue}h!==IDENTIFIER&&this.fail("missing variable name"),d=this.newNode({type:IDENTIFIER,name:this.t.token.value,readOnly:c.type===CONST}),c.push(d),g.varDecls.push(d);if(this.match(ASSIGN)){var j=this.t.lastBlockComment();this.t.token.assignOp&&this.fail("Invalid variable initialization"),d.initializer=this.AssignExpression()}else var j=this.t.lastBlockComment();d.blockComment=j}while(this.match(COMMA));return c},Pp.LetBlock=function(b){var c,d;return c=this.newNode({type:LET_BLOCK,varDecls:[]}),this.mustMatch(LEFT_PAREN),c.variables=this.Variables(c),this.mustMatch(RIGHT_PAREN),b&&this.peek()!==LEFT_CURLY&&(d=this.newNode({type:SEMICOLON,expression:c}),b=!1),b?c.block=this.Block():c.expression=this.AssignExpression(),c},Pp.checkDestructuring=function(b,c){b.type===ARRAY_COMP&&this.fail("Invalid array comprehension left-hand side");if(b.type!==ARRAY_INIT&&b.type!==OBJECT_INIT)return;var d={},e,f,g,h,i,j=b.children;for(var k=0,l=j.length;k<l;k++){if(!(e=j[k]))continue;e.type===PROPERTY_INIT?(i=e.children,h=i[1],g=i[0].value):b.type===OBJECT_INIT?(h=e,g=e.value):(h=e,g=k),h.type===ARRAY_INIT||h.type===OBJECT_INIT?d[g]=this.checkDestructuring(h,c):(c&&h.type!==IDENTIFIER&&this.fail("missing name in pattern"),d[g]=h)}return d},Pp.DestructuringExpression=function(b){var c=this.PrimaryExpression();return c.destructuredNames=this.checkDestructuring(c,b),c},Pp.GeneratorExpression=function(b){return this.newNode({type:GENERATOR,expression:b,tail:this.ComprehensionTail()})},Pp.ComprehensionTail=function(){var b,c,d,e,f;b=this.newNode({type:COMP_TAIL});do{c=this.newNode({type:FOR_IN,isLoop:!0}),this.match(IDENTIFIER)&&(this.mozillaMode&&this.t.token.value==="each"?c.isEach=!0:this.t.unget()),f=this.MaybeLeftParen();switch(this.t.get()){case LEFT_BRACKET:case LEFT_CURLY:this.t.unget(),c.iterator=this.DestructuringExpression();break;case IDENTIFIER:c.iterator=e=this.newNode({type:IDENTIFIER}),e.name=e.value,c.varDecl=d=this.newNode({type:VAR}),d.push(e),this.x.parentScript.varDecls.push(e);break;default:this.fail("missing identifier")}this.mustMatch(IN),c.object=this.Expression(),this.MaybeRightParen(f),b.push(c)}while(this.match(FOR));return this.match(IF)&&(b.guard=this.HeadExpression()),b},Pp.HeadExpression=function(){var b=this.MaybeLeftParen(),c=this.ParenExpression();this.MaybeRightParen(b);if(b===END&&!c.parenthesized){var d=this.peek();d!==LEFT_CURLY&&!definitions.isStatementStartCode[d]&&this.fail("Unparenthesized head followed by unbraced body")}return c},Pp.ParenExpression=function(){var b=this.x.update({inForLoopInit:this.x.inForLoopInit&&this.t.token.type===LEFT_PAREN}),c=this.withContext(b,function(){return this.Expression()});return this.match(FOR)&&(c.type===YIELD&&!c.parenthesized&&this.fail("Yield expression must be parenthesized"),c.type===COMMA&&!c.parenthesized&&this.fail("Generator expression must be parenthesized"),c=this.GeneratorExpression(c)),c},Pp.Expression=function(){var b,c;b=this.AssignExpression();if(this.match(COMMA)){c=this.newNode({type:COMMA}),c.push(b),b=c;do c=b.children[b.children.length-1],c.type===YIELD&&!c.parenthesized&&this.fail("Yield expression must be parenthesized"),b.push(this.AssignExpression());while(this.match(COMMA))}return b},Pp.AssignExpression=function(){var b,c;if(this.match(YIELD,!0))return this.ReturnOrYield();b=this.newNode({type:ASSIGN}),c=this.ConditionalExpression();if(!this.match(ASSIGN))return c;b.blockComment=this.t.lastBlockComment();switch(c.type){case OBJECT_INIT:case ARRAY_INIT:c.destructuredNames=this.checkDestructuring(c);case IDENTIFIER:case DOT:case INDEX:case CALL:break;default:this.fail("Bad left-hand side of assignment")}return b.assignOp=c.assignOp=this.t.token.assignOp,b.push(c),b.push(this.AssignExpression()),b},Pp.ConditionalExpression=function(){var b,c;b=this.OrExpression();if(this.match(HOOK)){c=b,b=this.newNode({type:HOOK}),b.push(c);var d=this.x.update({inForLoopInit:!1});this.withContext(d,function(){b.push(this.AssignExpression())}),this.match(COLON)||this.fail("missing : after ?"),b.push(this.AssignExpression())}return b},Pp.OrExpression=function(){var b,c;b=this.AndExpression();while(this.match(OR))c=this.newNode(),c.push(b),c.push(this.AndExpression()),b=c;return b},Pp.AndExpression=function(){var b,c;b=this.BitwiseOrExpression();while(this.match(AND))c=this.newNode(),c.push(b),c.push(this.BitwiseOrExpression()),b=c;return b},Pp.BitwiseOrExpression=function(){var b,c;b=this.BitwiseXorExpression();while(this.match(BITWISE_OR))c=this.newNode(),c.push(b),c.push(this.BitwiseXorExpression()),b=c;return b},Pp.BitwiseXorExpression=function(){var b,c;b=this.BitwiseAndExpression();while(this.match(BITWISE_XOR))c=this.newNode(),c.push(b),c.push(this.BitwiseAndExpression()),b=c;return b},Pp.BitwiseAndExpression=function(){var b,c;b=this.EqualityExpression();while(this.match(BITWISE_AND))c=this.newNode(),c.push(b),c.push(this.EqualityExpression()),b=c;return b},Pp.EqualityExpression=function(){var b,c;b=this.RelationalExpression();while(this.match(EQ)||this.match(NE)||this.match(STRICT_EQ)||this.match(STRICT_NE))c=this.newNode(),c.push(b),c.push(this.RelationalExpression()),b=c;return b},Pp.RelationalExpression=function(){var b,c,d=this.x.update({inForLoopInit:!1});return this.withContext(d,function(){b=this.ShiftExpression();while(this.match(LT)||this.match(LE)||this.match(GE)||this.match(GT)||!this.x.inForLoopInit&&this.match(IN)||this.match(INSTANCEOF))c=this.newNode(),c.push(b),c.push(this.ShiftExpression()),b=c}),b},Pp.ShiftExpression=function(){var b,c;b=this.AddExpression();while(this.match(LSH)||this.match(RSH)||this.match(URSH))c=this.newNode(),c.push(b),c.push(this.AddExpression()),b=c;return b},Pp.AddExpression=function(){var b,c;b=this.MultiplyExpression();while(this.match(PLUS)||this.match(MINUS))c=this.newNode(),c.push(b),c.push(this.MultiplyExpression()),b=c;return b},Pp.MultiplyExpression=function(){var b,c;b=this.UnaryExpression();while(this.match(MUL)||this.match(DIV)||this.match(MOD))c=this.newNode(),c.push(b),c.push(this.UnaryExpression()),b=c;return b},Pp.UnaryExpression=function(){var b,c,d;switch(d=this.t.get(!0)){case DELETE:case VOID:case TYPEOF:case NOT:case BITWISE_NOT:case PLUS:case MINUS:d===PLUS?b=this.newNode({type:UNARY_PLUS}):d===MINUS?b=this.newNode({type:UNARY_MINUS}):b=this.newNode(),b.push(this.UnaryExpression());break;case INCREMENT:case DECREMENT:b=this.newNode(),b.push(this.MemberExpression(!0));break;default:this.t.unget(),b=this.MemberExpression(!0),this.t.tokens[this.t.tokenIndex+this.t.lookahead-1&3].lineno===this.t.lineno&&(this.match(INCREMENT)||this.match(DECREMENT))&&(c=this.newNode({postfix:!0}),c.push(b),b=c)}return b},Pp.MemberExpression=function(b){var c,d,e,f;this.match(NEW)?(c=this.newNode(),c.push(this.MemberExpression(!1)),this.match(LEFT_PAREN)&&(c.type=NEW_WITH_ARGS,c.push(this.ArgumentList()))):c=this.PrimaryExpression();while((f=this.t.get())!==END){switch(f){case DOT:d=this.newNode(),d.push(c),d.push(this.IdentifierName());break;case LEFT_BRACKET:d=this.newNode({type:INDEX}),d.push(c),d.push(this.Expression()),this.mustMatch(RIGHT_BRACKET);break;case LEFT_PAREN:if(b){d=this.newNode({type:CALL}),d.push(c),d.push(this.ArgumentList());break};default:return this.t.unget(),c}c=d}return c},Pp.ArgumentList=function(){var b,c;b=this.newNode({type:LIST});if(this.match(RIGHT_PAREN,!0))return b;do c=this.AssignExpression(),c.type===YIELD&&!c.parenthesized&&this.peek()===COMMA&&this.fail("Yield expression must be parenthesized"),this.match(FOR)&&(c=this.GeneratorExpression(c),(b.children.length>1||this.peek(!0)===COMMA)&&this.fail("Generator expression must be parenthesized")),b.push(c);while(this.match(COMMA));return this.mustMatch(RIGHT_PAREN),b},Pp.PrimaryExpression=function(){var b,c,d=this.t.get(!0);switch(d){case FUNCTION:b=this.FunctionDefinition(!1,EXPRESSED_FORM);break;case LEFT_BRACKET:b=this.newNode({type:ARRAY_INIT});while((d=this.peek(!0))!==RIGHT_BRACKET){if(d===COMMA){this.t.get(),b.push(null);continue}b.push(this.AssignExpression());if(d!==COMMA&&!this.match(COMMA))break}b.children.length===1&&this.match(FOR)&&(c=this.newNode({type:ARRAY_COMP,expression:b.children[0],tail:this.ComprehensionTail()}),b=c),this.mustMatch(RIGHT_BRACKET);break;case LEFT_CURLY:var e,f;b=this.newNode({type:OBJECT_INIT});a:if(!this.match(RIGHT_CURLY)){do{d=this.t.get();if(this.t.token.value!=="get"&&this.t.token.value!=="set"||this.peek()!==IDENTIFIER){var g=this.t.blockComments;switch(d){case IDENTIFIER:case NUMBER:case STRING:e=this.newNode({type:IDENTIFIER});break;case RIGHT_CURLY:break a;default:if(this.t.token.value in definitions.keywords){e=this.newNode({type:IDENTIFIER});break}this.fail("Invalid property name")}this.match(COLON)?(c=this.newNode({type:PROPERTY_INIT}),c.push(e),c.push(this.AssignExpression()),c.blockComments=g,b.push(c)):(this.peek()!==COMMA&&this.peek()!==RIGHT_CURLY&&this.fail("missing : after property"),b.push(e))}else b.push(this.FunctionDefinition(!0,EXPRESSED_FORM))}while(this.match(COMMA));this.mustMatch(RIGHT_CURLY)}break;case LEFT_PAREN:b=this.ParenExpression(),this.mustMatch(RIGHT_PAREN),b.parenthesized=!0;break;case LET:b=this.LetBlock(!1);break;case NULL:case THIS:case TRUE:case FALSE:case IDENTIFIER:case NUMBER:case STRING:case REGEXP:b=this.newNode();break;default:this.fail("missing operand; found "+definitions.tokens[d])}return b},exports.parse=parse,exports.parseStdin=parseStdin,exports.parseFunction=parseFunction,exports.Node=Node,exports.DECLARED_FORM=DECLARED_FORM,exports.EXPRESSED_FORM=EXPRESSED_FORM,exports.STATEMENT_FORM=STATEMENT_FORM,exports.Tokenizer=Tokenizer,exports.Parser=Parser,exports.Module=Module,exports.Export=Export}),define("ace/narcissus/lexer",["require","exports","module","ace/narcissus/definitions"],function(require,exports,module){function isValidIdentifierChar(a,b){if(a<="")return a>="a"&&a<="z"||a>="A"&&a<="Z"||a==="$"||a==="_"||!b&&a>="0"&&a<="9"?!0:!1;var c={};c["x"+a]=!0,c[a]=!0;var d=!1;try{d=Function("x","return (x."+(b?"":"x")+a+");")(c)===!0}catch(e){}return d}function isIdentifier(a){if(typeof a!="string")return!1;if(a.length===0)return!1;if(!isValidIdentifierChar(a[0],!0))return!1;for(var b=1;b<a.length;b++)if(!isValidIdentifierChar(a[b],!1))return!1;return!0}function Tokenizer(a,b,c,d){this.cursor=0,this.source=String(a),this.tokens=[],this.tokenIndex=0,this.lookahead=0,this.scanNewlines=!1,this.filename=b||"",this.lineno=c||1,this.allowHTMLComments=d,this.blockComments=null}var definitions=require("./definitions");eval(definitions.consts);var opTokens={};for(var op in definitions.opTypeNames){if(op==="\n"||op===".")continue;var node=opTokens;for(var i=0;i<op.length;i++){var ch=op[i];ch in node||(node[ch]={}),node=node[ch],node.op=op}}Tokenizer.prototype={get done(){return this.peek(!0)===END},get token(){return this.tokens[this.tokenIndex]},match:function(a,b,c){return this.get(b,c)===a||this.unget()},mustMatch:function(a,b){if(!this.match(a,!1,b))throw this.newSyntaxError("Missing "+definitions.tokens[a].toLowerCase());return this.token},peek:function(a){var b,c;return this.lookahead?(c=this.tokens[this.tokenIndex+this.lookahead&3],b=this.scanNewlines&&c.lineno!==this.lineno?NEWLINE:c.type):(b=this.get(a),this.unget()),b},peekOnSameLine:function(a){this.scanNewlines=!0;var b=this.peek(a);return this.scanNewlines=!1,b},lastBlockComment:function(){var a=this.blockComments.length;return a?this.blockComments[a-1]:null},skip:function(){var a=this.source;this.blockComments=[];for(;;){var b=a[this.cursor++],c=a[this.cursor];if(b==="\r"){if(c==="\n")continue;b="\n"}if(b==="\n"&&!this.scanNewlines)this.lineno++;else if(b==="/"&&c==="*"){var d=++this.cursor;for(;;){b=a[this.cursor++];if(b===undefined)throw this.newSyntaxError("Unterminated comment");if(b==="*"){c=a[this.cursor];if(c==="/"){var e=this.cursor-1;this.cursor++;break}}else b==="\n"&&this.lineno++}this.blockComments.push(a.substring(d,e))}else if(b==="/"&&c==="/"||this.allowHTMLComments&&b==="<"&&c==="!"&&a[this.cursor+1]==="-"&&a[this.cursor+2]==="-"&&(this.cursor+=2)){this.cursor++;for(;;){b=a[this.cursor++],c=a[this.cursor];if(b===undefined)return;b==="\r"&&c!=="\n"&&(b="\n");if(b==="\n"){this.scanNewlines?this.cursor--:this.lineno++;break}}}else if(!(b in definitions.whitespace)){this.cursor--;return}}},lexExponent:function(){var a=this.source,b=a[this.cursor];if(b==="e"||b==="E"){this.cursor++,ch=a[this.cursor++];if(ch==="+"||ch==="-")ch=a[this.cursor++];if(ch<"0"||ch>"9")throw this.newSyntaxError("Missing exponent");do ch=a[this.cursor++];while(ch>="0"&&ch<="9");return this.cursor--,!0}return!1},lexZeroNumber:function(a){var b=this.token,c=this.source;b.type=NUMBER,a=c[this.cursor++];if(a==="."){do a=c[this.cursor++];while(a>="0"&&a<="9");this.cursor--,this.lexExponent(),b.value=parseFloat(c.substring(b.start,this.cursor))}else if(a==="x"||a==="X"){do a=c[this.cursor++];while(a>="0"&&a<="9"||a>="a"&&a<="f"||a>="A"&&a<="F");this.cursor--,b.value=parseInt(c.substring(b.start,this.cursor))}else if(a>="0"&&a<="7"){do a=c[this.cursor++];while(a>="0"&&a<="7");this.cursor--,b.value=parseInt(c.substring(b.start,this.cursor))}else this.cursor--,this.lexExponent(),b.value=0},lexNumber:function(a){var b=this.token,c=this.source;b.type=NUMBER;var d=!1;do a=c[this.cursor++],a==="."&&!d&&(d=!0,a=c[this.cursor++]);while(a>="0"&&a<="9");this.cursor--;var e=this.lexExponent();d=d||e;var f=c.substring(b.start,this.cursor);b.value=d?parseFloat(f):parseInt(f)},lexDot:function(a){var b=this.token,c=this.source,d=c[this.cursor];if(d>="0"&&d<="9"){do a=c[this.cursor++];while(a>="0"&&a<="9");this.cursor--,this.lexExponent(),b.type=NUMBER,b.value=parseFloat(c.substring(b.start,this.cursor))}else b.type=DOT,b.assignOp=null,b.value="."},lexString:function(ch){var token=this.token,input=this.source;token.type=STRING;var hasEscapes=!1,delim=ch;if(input.length<=this.cursor)throw this.newSyntaxError("Unterminated string literal");while((ch=input[this.cursor++])!==delim){if(ch=="\n"||ch=="\r")throw this.newSyntaxError("Unterminated string literal");if(this.cursor==input.length)throw this.newSyntaxError("Unterminated string literal");if(ch==="\\"){hasEscapes=!0;if(++this.cursor==input.length)throw this.newSyntaxError("Unterminated string literal")}}token.value=hasEscapes?eval(input.substring(token.start,this.cursor)):input.substring(token.start+1,this.cursor-1)},lexRegExp:function(ch){var token=this.token,input=this.source;token.type=REGEXP;do{ch=input[this.cursor++];if(ch==="\\")this.cursor++;else if(ch==="["){do{if(ch===undefined)throw this.newSyntaxError("Unterminated character class");ch==="\\"&&this.cursor++,ch=input[this.cursor++]}while(ch!=="]")}else if(ch===undefined)throw this.newSyntaxError("Unterminated regex")}while(ch!=="/");do ch=input[this.cursor++];while(ch>="a"&&ch<="z");this.cursor--,token.value=eval(input.substring(token.start,this.cursor))},lexOp:function(a){var b=this.token,c=this.source,d=opTokens[a],e=c[this.cursor];e in d&&(d=d[e],this.cursor++,e=c[this.cursor],e in d&&(d=d[e],this.cursor++,e=c[this.cursor]));var f=d.op;definitions.assignOps[f]&&c[this.cursor]==="="?(this.cursor++,b.type=ASSIGN,b.assignOp=definitions.tokenIds[definitions.opTypeNames[f]],f+="="):(b.type=definitions.tokenIds[definitions.opTypeNames[f]],b.assignOp=null),b.value=f},lexIdent:function(a,b){var c=this.token,d=a;while((a=this.getValidIdentifierChar(!1))!==null)d+=a;c.type=IDENTIFIER,c.value=d;if(b)return;var e;if(this.parser.mozillaMode){e=definitions.mozillaKeywords[d];if(e){c.type=e;return}}if(this.parser.x.strictMode){e=definitions.strictKeywords[d];if(e){c.type=e;return}}e=definitions.keywords[d],e&&(c.type=e)},get:function(a,b){var c;while(this.lookahead){--this.lookahead,this.tokenIndex=this.tokenIndex+1&3,c=this.tokens[this.tokenIndex];if(c.type!==NEWLINE||this.scanNewlines)return c.type}this.skip(),this.tokenIndex=this.tokenIndex+1&3,c=this.tokens[this.tokenIndex],c||(this.tokens[this.tokenIndex]=c={});var d=this.source;if(this.cursor>=d.length)return c.type=END;c.start=this.cursor,c.lineno=this.lineno;var e=this.getValidIdentifierChar(!0),f=e===null?d[this.cursor++]:null;if(e!==null)this.lexIdent(e,b);else if(a&&f==="/")this.lexRegExp(f);else if(f in opTokens)this.lexOp(f);else if(f===".")this.lexDot(f);else if(f>="1"&&f<="9")this.lexNumber(f);else if(f==="0")this.lexZeroNumber(f);else if(f==='"'||f==="'")this.lexString(f);else{if(!this.scanNewlines||f!=="\n"&&f!=="\r")throw this.newSyntaxError("Illegal token");f==="\r"&&d[this.cursor]==="\n"&&this.cursor++,c.type=NEWLINE,c.value="\n",this.lineno++}return c.end=this.cursor,c.type},unget:function(){if(++this.lookahead===4)throw"PANIC: too much lookahead!";this.tokenIndex=this.tokenIndex-1&3},newSyntaxError:function(a){a=(this.filename?this.filename+":":"")+this.lineno+": "+a;var b=new SyntaxError(a,this.filename,this.lineno);return b.source=this.source,b.cursor=this.lookahead?this.tokens[this.tokenIndex+this.lookahead&3].start:this.cursor,b},getValidIdentifierChar:function(a){var b=this.source;if(this.cursor>=b.length)return null;var c=b[this.cursor];if(c==="\\"&&b[this.cursor+1]==="u"){try{c=String.fromCharCode(parseInt(b.substring(this.cursor+2,this.cursor+6),16))}catch(d){return null}this.cursor+=5}var e=isValidIdentifierChar(c,a);return e&&this.cursor++,e?c:null}},exports.isIdentifier=isIdentifier,exports.Tokenizer=Tokenizer}),define("ace/narcissus/definitions",["require","exports","module"],function(require,exports,module){function defineGetter(a,b,c,d,e){Object.defineProperty(a,b,{get:c,configurable:!d,enumerable:!e})}function defineGetterSetter(a,b,c,d,e,f){Object.defineProperty(a,b,{get:c,set:d,configurable:!e,enumerable:!f})}function defineMemoGetter(a,b,c,d,e){Object.defineProperty(a,b,{get:function(){var f=c();return defineProperty(a,b,f,d,!0,e),f},configurable:!0,enumerable:!e})}function defineProperty(a,b,c,d,e,f){Object.defineProperty(a,b,{value:c,writable:!e,configurable:!d,enumerable:!f})}function isNativeCode(a){return typeof a=="function"&&a.toString().match(/\[native code\]/)}function apply(a,b,c){return Fpapply.call(a,[b].concat(c))}function getPropertyDescriptor(a,b){while(a){if({}.hasOwnProperty.call(a,b))return Object.getOwnPropertyDescriptor(a,b);a=Object.getPrototypeOf(a)}}function getPropertyNames(a){var b=Object.create(null,{});while(a){var c=Object.getOwnPropertyNames(a);for(var d=0,e=c.length;d<e;d++)b[c[d]]=!0;a=Object.getPrototypeOf(a)}return Object.keys(b)}function getOwnProperties(a){var b={};for(var c in Object.getOwnPropertyNames(a))b[c]=Object.getOwnPropertyDescriptor(a,c);return b}function blacklistHandler(a,b){var c=Object.create(null,{}),d=Dict.create(b).mapObject(function(a){return c});return mixinHandler(d,a)}function whitelistHandler(a,b){var c=Object.create(null,{}),d=Dict.create(b).mapObject(function(b){return a});return mixinHandler(d,c)}function mixinHandler(a,b){function c(c){return hasOwn(a,c)?a[c]:b}function d(a){var b=getPropertyDescriptor(c(a),a);return b&&(b.configurable=!0),b}function e(){var c=Object.getOwnPropertyNames(a).filter(function(b){return b in a[b]}),d=getPropertyNames(b).filter(function(b){return!hasOwn(a,b)});return c.concat(d)}function f(){var c=Object.getOwnPropertyNames(a).filter(function(b){return b in a[b]});for(name in b)hasOwn(a,name)||c.push(name);return c}function g(a){return a in c(a)}return{getOwnPropertyDescriptor:d,getPropertyDescriptor:d,getOwnPropertyNames:e,defineProperty:function(a,b){Object.defineProperty(c(a),a,b)},"delete":function(a){var b=c(a);return delete b[a]},fix:function(){},has:g,hasOwn:g,get:function(a,b){var d=c(b);return d[b]},set:function(a,b,d){var e=c(b);return e[b]=d,!0},enumerate:f,keys:f}}function makePassthruHandler(a){return{getOwnPropertyDescriptor:function(b){var c=Object.getOwnPropertyDescriptor(a,b);return c.configurable=!0,c},getPropertyDescriptor:function(b){var c=getPropertyDescriptor(a,b);return c.configurable=!0,c},getOwnPropertyNames:function(){return Object.getOwnPropertyNames(a)},defineProperty:function(b,c){Object.defineProperty(a,b,c)},"delete":function(b){return delete a[b]},fix:function(){return Object.isFrozen(a)?getOwnProperties(a):undefined},has:function(b){return b in a},hasOwn:function(b){return{}.hasOwnProperty.call(a,b)},get:function(b,c){return a[c]},set:function(b,c,d){return a[c]=d,!0},enumerate:function(){var b=[];for(name in a)b.push(name);return b},keys:function(){return Object.keys(a)}}}function hasOwn(a,b){return hasOwnProperty.call(a,b)}function Dict(a,b){this.table=a||Object.create(null,{}),this.size=b||0}function Stack(a){this.elts=a||null}var tokens=["END","\n",";",",","=","?",":","CONDITIONAL","||","&&","|","^","&","==","!=","===","!==","<","<=",">=",">","<<",">>",">>>","+","-","*","/","%","!","~","UNARY_PLUS","UNARY_MINUS","++","--",".","[","]","{","}","(",")","SCRIPT","BLOCK","LABEL","FOR_IN","CALL","NEW_WITH_ARGS","INDEX","ARRAY_INIT","OBJECT_INIT","PROPERTY_INIT","GETTER","SETTER","GROUP","LIST","LET_BLOCK","ARRAY_COMP","GENERATOR","COMP_TAIL","IMPLEMENTS","INTERFACE","LET","MODULE","PACKAGE","PRIVATE","PROTECTED","PUBLIC","STATIC","USE","YIELD","IDENTIFIER","NUMBER","STRING","REGEXP","break","case","catch","const","continue","debugger","default","delete","do","else","export","false","finally","for","function","if","import","in","instanceof","new","null","return","switch","this","throw","true","try","typeof","var","void","while","with"],strictKeywords={__proto__:null,"implements":!0,"interface":!0,let:!0,"package":!0,"private":!0,"protected":!0,"public":!0,"static":!0,use:!0,yield:!0},statementStartTokens=["break","const","continue","debugger","do","for","if","let","return","switch","throw","try","var","yield","while","with"],whitespaceChars=["	","","\f"," "," ","﻿"," ","᠎"," "," "," "," "," "," "," "," "," "," "," "," "," ","　"],whitespace={};for(var i=0;i<whitespaceChars.length;i++)whitespace[whitespaceChars[i]]=!0;var opTypeNames={"\n":"NEWLINE",";":"SEMICOLON",",":"COMMA","?":"HOOK",":":"COLON","||":"OR","&&":"AND","|":"BITWISE_OR","^":"BITWISE_XOR","&":"BITWISE_AND","===":"STRICT_EQ","==":"EQ","=":"ASSIGN","!==":"STRICT_NE","!=":"NE","<<":"LSH","<=":"LE","<":"LT",">>>":"URSH",">>":"RSH",">=":"GE",">":"GT","++":"INCREMENT","--":"DECREMENT","+":"PLUS","-":"MINUS","*":"MUL","/":"DIV","%":"MOD","!":"NOT","~":"BITWISE_NOT",".":"DOT","[":"LEFT_BRACKET","]":"RIGHT_BRACKET","{":"LEFT_CURLY","}":"RIGHT_CURLY","(":"LEFT_PAREN",")":"RIGHT_PAREN"},keywords={__proto__:null},mozillaKeywords={__proto__:null},tokenIds={},hostSupportsEvalConst=function(){try{return eval("(function(s) { eval(s); return x })('const x = true;')")}catch(e){return!1}}(),consts=hostSupportsEvalConst?"const ":"var ";for(var i=0,j=tokens.length;i<j;i++){i>0&&(consts+=", ");var t=tokens[i],name;if(/^[a-z]/.test(t)){name=t.toUpperCase();if(name==="LET"||name==="YIELD")mozillaKeywords[name]=i;strictKeywords[name]&&(strictKeywords[name]=i),keywords[t]=i}else name=/^\W/.test(t)?opTypeNames[t]:t;consts+=name+" = "+i,tokenIds[name]=i,tokens[t]=i}consts+=";";var isStatementStartCode={__proto__:null};for(i=0,j=statementStartTokens.length;i<j;i++)isStatementStartCode[keywords[statementStartTokens[i]]]=!0;var assignOps=["|","^","&","<<",">>",">>>","+","-","*","/","%"];for(i=0,j=assignOps.length;i<j;i++)t=assignOps[i],assignOps[t]=tokens[t];var Fpapply=Function.prototype.apply,applyNew;Function.prototype.bind?applyNew=function(b,c){return new(b.bind.apply(b,[,].concat(Array.prototype.slice.call(c))))}:applyNew=function applyNew(f,a){switch(a.length){case 0:return new f;case 1:return new f(a[0]);case 2:return new f(a[0],a[1]);case 3:return new f(a[0],a[1],a[2]);default:var argStr="a[0]";for(var i=1,n=a.length;i<n;i++)argStr+=",a["+i+"]";return eval("new f("+argStr+")")}};var hasOwnProperty={}.hasOwnProperty;Dict.create=function(a){var b=Object.create(null,{}),c=0,d=Object.getOwnPropertyNames(a);for(var e=0,f=d.length;e<f;e++){var g=d[e];b[g]=a[g],c++}return new Dict(b,c)},Dict.prototype={has:function(a){return hasOwnProperty.call(this.table,a)},set:function(a,b){hasOwnProperty.call(this.table,a)||this.size++,this.table[a]=b},get:function(a){return this.table[a]},getDef:function(a,b){return hasOwnProperty.call(this.table,a)||(this.size++,this.table[a]=b()),this.table[a]},forEach:function(a){var b=this.table;for(var c in b)a.call(this,c,b[c])},map:function(a){var b=this.table,c=Object.create(null,{});return this.forEach(function(b,d){c[b]=a.call(this,d,b)}),new Dict(c,this.size)},mapObject:function(a){var b=this.table,c=Object.create(null,{});return this.forEach(function(b,d){c[b]=a.call(this,d,b)}),c},toObject:function(){return this.mapObject(function(a){return a})},choose:function(){return Object.getOwnPropertyNames(this.table)[0]},remove:function(a){hasOwnProperty.call(this.table,a)&&(this.size--,delete this.table[a])},copy:function(){var a=Object.create(null,{});for(var b in this.table)a[b]=this.table[b];return new Dict(a,this.size)},keys:function(){return Object.keys(this.table)},toString:function(){return"[object Dict]"}};var _WeakMap=typeof WeakMap=="function"?WeakMap:function(){function a(a){this.array=a||[]}function b(a,b,c,d){var e=a.array;for(var f=0,g=e.length;f<g;f++){var h=e[f];if(h.key===b)return c(h,f)}return d()}return a.prototype={has:function(a){return b(this,a,function(){return!0},function(){return!1})},set:function(a,c){var d=this.array;b(this,a,function(a){a.value=c},function(){d.push({key:a,value:c})})},get:function(a){return b(this,a,function(a){return a.value},function(){return null})},"delete":function(a){var c=this.array;b(this,a,function(a,b){c.splice(b,1)},function(){})},toString:function(){return"[object WeakMap]"}},a}();Stack.prototype={push:function(a){return new Stack({top:a,rest:this.elts})},top:function(){if(!this.elts)throw new Error("empty stack");return this.elts.top},isEmpty:function(){return this.top===null},find:function(a){for(var b=this.elts;b;b=b.rest)if(a(b.top))return b.top;return null},has:function(a){return Boolean(this.find(function(b){return b===a}))},forEach:function(a){for(var b=this.elts;b;b=b.rest)a(b.top)}},Array.prototype.copy||defineProperty(Array.prototype,"copy",function(){var a=[];for(var b=0,c=this.length;b<c;b++)a[b]=this[b];return a},!1,!1,!0),Array.prototype.top||defineProperty(Array.prototype,"top",function(){return this.length&&this[this.length-1]},!1,!1,!0),exports.tokens=tokens,exports.whitespace=whitespace,exports.opTypeNames=opTypeNames,exports.keywords=keywords,exports.mozillaKeywords=mozillaKeywords,exports.strictKeywords=strictKeywords,exports.isStatementStartCode=isStatementStartCode,exports.tokenIds=tokenIds,exports.consts=consts,exports.assignOps=assignOps,exports.defineGetter=defineGetter,exports.defineGetterSetter=defineGetterSetter,exports.defineMemoGetter=defineMemoGetter,exports.defineProperty=defineProperty,exports.isNativeCode=isNativeCode,exports.apply=apply,exports.applyNew=applyNew,exports.mixinHandler=mixinHandler,exports.whitelistHandler=whitelistHandler,exports.blacklistHandler=blacklistHandler,exports.makePassthruHandler=makePassthruHandler,exports.Dict=Dict,exports.WeakMap=_WeakMap,exports.Stack=Stack}),define("ace/narcissus/options",["require","exports","module"],function(a,b,c){b.hiddenHostGlobals={Narcissus:!0},b.desugarExtensions=!1,b.allowHTMLComments=!1,b.mozillaMode=!0,b.parenFreeMode=!1})
;
/*! jQuery v1.7.1 jquery.com | jquery.org/license */

(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


var HoganTemplate = (function () {

  function constructor(text) {
    this.text = text;
  }

  constructor.prototype = {

    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    render: function render(context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // tries to find a partial in the curent scope and render it
    rp: function(name, context, partials, indent) {
      var partial = partials[name];

      if (!partial) {
        return '';
      }

      return partial.r(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var buf = '',
          tail = context[context.length - 1];

      if (!isArray(tail)) {
        return buf = section(context, partials);
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        buf += section(context, partials);
        context.pop();
      }

      return buf;
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (!inverted && typeof val == 'function') {
        val = this.ls(val, ctx, partials, start, end, tags);
      }

      pass = (val === '') || !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {

      var names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        return ctx[ctx.length - 1];
      }

      for (var i = 1; i < names.length; i++) {
        if (val && typeof val == 'object' && names[i] in val) {
          cx = val;
          val = val[names[i]];
        } else {
          val = '';
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.lv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        if (v && typeof v == 'object' && key in v) {
          val = v[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.lv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ho: function(val, cx, partials, text, tags) {
      var t = val.call(cx, text, function(t) {
        return Hogan.compile(t, {delimiters: tags}).render(cx, partials);
      });
      var s = Hogan.compile(t.toString(), {delimiters: tags}).render(cx, partials);
      this.b = s;
      return false;
    },

    // higher order template result buffer
    b: '',

    // lambda replace section
    ls: function(val, ctx, partials, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          t = val.call(cx);

      if (val.length > 0) {
        return this.ho(val, cx, partials, this.text.substring(start, end), tags);
      }

      if (typeof t == 'function') {
        return this.ho(t, cx, partials, this.text.substring(start, end), tags);
      }

      return t;
    },

    // lambda replace variable
    lv: function(val, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      return Hogan.compile(val.call(cx).toString()).render(cx, partials);
    }

  };

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos =/\'/g,
      rQuot = /\"/g,
      hChars =/[&<>\"\']/;

  function hoganEscape(str) {
    str = String(str === null ? '' : str);
    return hChars.test(str) ?
      str
        .replace(rAmp,'&amp;')
        .replace(rLt,'&lt;')
        .replace(rGt,'&gt;')
        .replace(rApos,'&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

  return constructor;

})();

var Hogan = (function () {

  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      tagTypes = {
        '#': 1, '^': 2, '/': 3,  '!': 4, '>': 5,
        '<': 6, '=': 7, '_v': 8, '{': 9, '&': 10
      };

  function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push(new String(buf));
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (tokens[j].tag && tagTypes[tokens[j].tag] < tagTypes['_v']) ||
          (!tokens[j].tag && tokens[j].match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (!tokens[j].tag) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = tagTypes[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - ctag.length : i + otag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            i++;
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        token = null;

    while (tokens.length > 0) {
      token = tokens.shift();
      if (token.tag == '#' || token.tag == '^' || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
        instructions.push(token);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else {
        instructions.push(token);
      }
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function generate(tree, text, options) {
    var code = 'i = i || "";var c = [cx];var b = i + "";var _ = this;'
      + walk(tree)
      + 'return b;';

    if (options.asString) {
      return 'function(cx,p,i){' + code + ';}';
    }

    var template = new HoganTemplate(text);
    template.r = new Function('cx', 'p', 'i', code);
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function walk(tree) {
    var code = '';
    for (var i = 0, l = tree.length; i < l; i++) {
      var tag = tree[i].tag;
      if (tag == '#') {
        code += section(tree[i].nodes, tree[i].n, chooseMethod(tree[i].n),
                        tree[i].i, tree[i].end, tree[i].otag + " " + tree[i].ctag);
      } else if (tag == '^') {
        code += invertedSection(tree[i].nodes, tree[i].n,
                                chooseMethod(tree[i].n));
      } else if (tag == '<' || tag == '>') {
        code += partial(tree[i]);
      } else if (tag == '{' || tag == '&') {
        code += tripleStache(tree[i].n, chooseMethod(tree[i].n));
      } else if (tag == '\n') {
        code += text('"\\n"' + (tree.length-1 == i ? '' : ' + i'));
      } else if (tag == '_v') {
        code += variable(tree[i].n, chooseMethod(tree[i].n));
      } else if (tag === undefined) {
        code += text('"' + esc(tree[i]) + '"');
      }
    }
    return code;
  }

  function section(nodes, id, method, start, end, tags) {
    return 'if(_.s(_.' + method + '("' + esc(id) + '",c,p,1),' +
           'c,p,0,' + start + ',' + end + ', "' + tags + '")){' +
           'b += _.rs(c,p,' +
           'function(c,p){ var b = "";' +
           walk(nodes) +
           'return b;});c.pop();}' +
           'else{b += _.b; _.b = ""};';
  }

  function invertedSection(nodes, id, method) {
    return 'if (!_.s(_.' + method + '("' + esc(id) + '",c,p,1),c,p,1,0,0,"")){' +
           walk(nodes) +
           '};';
  }

  function partial(tok) {
    return 'b += _.rp("' +  esc(tok.n) + '",c[c.length - 1],p,"' + (tok.indent || '') + '");';
  }

  function tripleStache(id, method) {
    return 'b += (_.' + method + '("' + esc(id) + '",c,p,0));';
  }

  function variable(id, method) {
    return 'b += (_.v(_.' + method + '("' + esc(id) + '",c,p,0)));';
  }

  function text(id) {
    return 'b += ' + id + ';';
  }

  return ({
    scan: scan,

    parse: function(tokens, options) {
      options = options || {};
      return buildTree(tokens, '', [], options.sectionTags || []);
    },

    cache: {},

    compile: function(text, options) {
      // options
      //
      // asString: false (default)
      //
      // sectionTags: [{o: '_foo', c: 'foo'}]
      // An array of object with o and c fields that indicate names for custom
      // section tags. The example above allows parsing of {{_foo}}{{/foo}}.
      //
      // delimiters: A string that overrides the default delimiters.
      // Example: "<% %>"
      //
      options = options || {};

      var t = this.cache[text];

      if (t) {
        return t;
      }

      t = generate(this.parse(scan(text, options.delimiters), options), text, options);
      return this.cache[text] = t;
    }
  });
})();

// Export the hogan constructor for Node.js and CommonJS.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Hogan;
  module.exports.Template = HoganTemplate;
} else if (typeof define === 'function' && define.amd) {
  define(function () { return Hogan; });
} else if (typeof exports !== 'undefined') {
  exports.Hogan = Hogan;
  exports.HoganTemplate = HoganTemplate;
}
;
//     Underscore.js 1.3.1
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      if (index == 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return slice.call(iterable);
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var result = [];
    _.reduce(initial, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) {
        memo[memo.length] = el;
        result[result.length] = array[i];
      }
      return memo;
    }, []);
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        func.apply(context, args);
      }
      whenDone();
      throttling = true;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(/\\\\/g, '\\').replace(/\\'/g, "'");
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape || noMatch, function(match, code) {
           return "',_.escape(" + unescape(code) + "),'";
         })
         .replace(c.interpolate || noMatch, function(match, code) {
           return "'," + unescape(code) + ",'";
         })
         .replace(c.evaluate || noMatch, function(match, code) {
           return "');" + unescape(code).replace(/[\r\n\t]/g, ' ') + ";__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', '_', tmpl);
    if (data) return func(data, _);
    return function(data) {
      return func.call(this, data, _);
    };
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);
//     Backbone.js 0.9.1

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `global`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to slice/splice.
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.1';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  var $ = root.jQuery || root.Zepto || root.ender;

  // Set the JavaScript library that will be used for DOM manipulation and
  // Ajax calls (a.k.a. the `$` variable). By default Backbone will use: jQuery,
  // Zepto, or Ender; but the `setDomLibrary()` method lets you inject an
  // alternate JavaScript library (or a mock library for testing your views
  // outside of a browser).
  Backbone.setDomLibrary = function(lib) {
    $ = lib;
  };

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback functions
  // to an event; trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Backbone.Events = {

    // Bind an event, specified by a string name, `ev`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.
    on: function(events, callback, context) {
      var ev;
      events = events.split(/\s+/);
      var calls = this._callbacks || (this._callbacks = {});
      while (ev = events.shift()) {
        // Create an immutable callback list, allowing traversal during
        // modification.  The tail is an empty object that will always be used
        // as the next node.
        var list  = calls[ev] || (calls[ev] = {});
        var tail = list.tail || (list.tail = list.next = {});
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `ev` is null, removes all bound callbacks for all events.
    off: function(events, callback, context) {
      var ev, calls, node;
      if (!events) {
        delete this._callbacks;
      } else if (calls = this._callbacks) {
        events = events.split(/\s+/);
        while (ev = events.shift()) {
          node = calls[ev];
          delete calls[ev];
          if (!callback || !node) continue;
          // Create a new list, omitting the indicated event/context pairs.
          while ((node = node.next) && node.next) {
            if (node.callback === callback &&
              (!context || node.context === context)) continue;
            this.on(ev, node.callback, node.context);
          }
        }
      }
      return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls['all'];
      (events = events.split(/\s+/)).push(null);
      // Save references to the current heads & tails.
      while (event = events.shift()) {
        if (all) events.push({next: all.next, tail: all.tail, event: event});
        if (!(node = calls[event])) continue;
        events.push({next: node.next, tail: node.tail});
      }
      // Traverse each list, stopping when the saved tail is reached.
      rest = slice.call(arguments, 1);
      while (node = events.pop()) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    }

  };

  // Aliases for backwards compatibility.
  Backbone.Events.bind   = Backbone.Events.on;
  Backbone.Events.unbind = Backbone.Events.off;

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (options && options.parse) attributes = this.parse(attributes);
    if (defaults = getValue(this, 'defaults')) {
      attributes = _.extend({}, defaults, attributes);
    }
    if (options && options.collection) this.collection = options.collection;
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    if (!this.set(attributes, {silent: true})) {
      throw new Error("Can't create an invalid model");
    }
    delete this._changed;
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Backbone.Model.prototype, Backbone.Events, {

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function() {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.attributes[attr];
      return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.attributes[attr] != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, value, options) {
      var attrs, attr, val;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs instanceof Backbone.Model) attrs = attrs.attributes;
      if (options.unset) for (attr in attrs) attrs[attr] = void 0;

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var now = this.attributes;
      var escaped = this._escapedAttributes;
      var prev = this._previousAttributes || {};
      var alreadySetting = this._setting;
      this._changed || (this._changed = {});
      this._setting = true;

      // Update attributes.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(now[attr], val)) delete escaped[attr];
        options.unset ? delete now[attr] : now[attr] = val;
        if (this._changing && !_.isEqual(this._changed[attr], val)) {
          this.trigger('change:' + attr, this, val, options);
          this._moreChanges = true;
        }
        delete this._changed[attr];
        if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
          this._changed[attr] = val;
        }
      }

      // Fire the `"change"` events, if the model has been changed.
      if (!alreadySetting) {
        if (!options.silent && this.hasChanged()) this.change(options);
        this._setting = false;
      }
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      (options || (options = {})).unset = true;
      return this.set(attr, null, options);
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = Backbone.wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, value, options) {
      var attrs, current;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      options = options ? _.clone(options) : {};
      if (options.wait) current = _.clone(this.attributes);
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var serverAttrs = model.parse(resp, xhr);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (!model.set(serverAttrs, options)) return false;
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
      if (options.wait) this.set(current, silentOptions);
      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var triggerDestroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      if (this.isNew()) return triggerDestroy();
      options.success = function(resp) {
        if (options.wait) triggerDestroy();
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
      if (!options.wait) triggerDestroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = getValue(this.collection, 'url') || getValue(this, 'urlRoot') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      if (this._changing || !this.hasChanged()) return this;
      this._changing = true;
      this._moreChanges = true;
      for (var attr in this._changed) {
        this.trigger('change:' + attr, this, this._changed[attr], options);
      }
      while (this._moreChanges) {
        this._moreChanges = false;
        this.trigger('change', this, options);
      }
      this._previousAttributes = _.clone(this.attributes);
      delete this._changed;
      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (!arguments.length) return !_.isEmpty(this._changed);
      return this._changed && _.has(this._changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this._changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (!arguments.length || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Check if the model is currently in a valid state. It's only possible to
    // get into an *invalid* state if you're using silent changes.
    isValid: function() {
      return !this.validate(this.attributes);
    },

    // Run validation against a set of incoming attributes, returning `true`
    // if all is well. If a specific `error` callback has been passed,
    // call that instead of firing the general `"error"` event.
    _validate: function(attrs, options) {
      if (options.silent || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) {
        options.error(this, error, options);
      } else {
        this.trigger('error', this, error, options);
      }
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.comparator) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  };

  // Define the Collection's inheritable methods.
  _.extend(Backbone.Collection.prototype, Backbone.Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Backbone.Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function() {
      return this.map(function(model){ return model.toJSON(); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, index, length, model, cid, id, cids = {}, ids = {};
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];

      // Begin by turning bare objects into model references, and preventing
      // invalid models or duplicate models from being added.
      for (i = 0, length = models.length; i < length; i++) {
        if (!(model = models[i] = this._prepareModel(models[i], options))) {
          throw new Error("Can't add an invalid model to a collection");
        }
        if (cids[cid = model.cid] || this._byCid[cid] ||
          (((id = model.id) != null) && (ids[id] || this._byId[id]))) {
          throw new Error("Can't add the same model to a collection twice");
        }
        cids[cid] = ids[id] = model;
      }

      // Listen to added models' events, and index models for lookup by
      // `id` and by `cid`.
      for (i = 0; i < length; i++) {
        (model = models[i]).on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // Insert models into the collection, re-sorting if needed, and triggering
      // `add` events unless silenced.
      this.length += length;
      index = options.at != null ? options.at : this.models.length;
      splice.apply(this.models, [index, 0].concat(models));
      if (this.comparator) this.sort({silent: true});
      if (options.silent) return this;
      for (i = 0, length = this.models.length; i < length; i++) {
        if (!cids[(model = this.models[i]).cid]) continue;
        options.index = i;
        model.trigger('add', model, this, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.getByCid(models[i]) || this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Get a model from the set by id.
    get: function(id) {
      if (id == null) return null;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid: function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      var boundComparator = _.bind(this.comparator, this);
      if (this.comparator.length == 1) {
        this.models = this.sortBy(boundComparator);
      } else {
        this.models.sort(boundComparator);
      }
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      models  || (models = []);
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      this._reset();
      this.add(models, {silent: true, parse: options.parse});
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === undefined) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = Backbone.wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var coll = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) coll.add(model, options);
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        if (options.wait) coll.add(nextModel, options);
        if (success) {
          success(nextModel, resp);
        } else {
          nextModel.trigger('sync', model, resp, options);
        }
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(model, options) {
      if (!(model instanceof Backbone.Model)) {
        var attrs = model;
        options.collection = this;
        model = new this.model(attrs, options);
        if (!model._validate(model.attributes, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(ev, model, collection, options) {
      if ((ev == 'add' || ev == 'remove') && collection != this) return;
      if (ev == 'destroy') {
        this.remove(model, options);
      }
      if (model && ev === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Backbone.Router.prototype, Backbone.Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new Backbone.History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning leading hashes and slashes .
  var routeStripper = /^[#\/]/;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?
  var historyStarted = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(Backbone.History.prototype, Backbone.Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
        } else {
          fragment = window.location.hash;
        }
      }
      fragment = decodeURIComponent(fragment);
      if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      if (historyStarted) throw new Error("Backbone.history has already been started");
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      historyStarted = true;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = loc.hash.replace(routeStripper, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      historyStarted = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
      if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(window.location.hash);
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you which to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!historyStarted) return false;
      if (!options || options === true) options = {trigger: options};
      var frag = (fragment || '').replace(routeStripper, '');
      if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this.fragment = frag;
        this._updateHash(window.location, frag, options.replace);
        if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
          // When replace is true, we don't want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, frag, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        window.location.assign(this.options.root + fragment);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
      } else {
        location.hash = fragment;
      }
    }
  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var eventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(Backbone.View.prototype, Backbone.Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.
    remove: function() {
      this.$el.remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      this.$el = $(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = getValue(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Event "' + events[key] + '" does not exist');
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = getValue(this, 'attributes') || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.setElement(this.make(this.tagName, attrs), false);
      } else {
        this.setElement(this.el, false);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.
  Backbone.Model.extend = Backbone.Collection.extend =
    Backbone.Router.extend = Backbone.View.extend = extend;

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = getValue(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    return $.ajax(_.extend(params, options));
  };

  // Wrap an optional error callback with a fallback error event.
  Backbone.wrapError = function(onError, originalModel, options) {
    return function(model, resp) {
      resp = model === originalModel ? resp : model;
      if (onError) {
        onError(originalModel, resp, options);
      } else {
        originalModel.trigger('error', originalModel, resp, options);
      }
    };
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a value from a Backbone object as a property
  // or as a function.
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-borderradius-boxshadow-hsla-hashchange-history-iepp-mq-cssclasses-teststyles-testprop-testallprops-hasevent-domprefixes-load
 */

;window.Modernizr=function(a,b,c){function D(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+n.join(c+" ")+c).split(" ");return C(d,b)}function C(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function B(a,b){return!!~(""+a).indexOf(b)}function A(a,b){return typeof a===b}function z(a,b){return y(prefixes.join(a+";")+(b||""))}function y(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n="Webkit Moz O ms Khtml".split(" "),o={},p={},q={},r=[],s=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},t=function(b){if(a.matchMedia)return matchMedia(b).matches;var c;s("@media "+b+" { #"+i+" { position: absolute; } }",function(b){c=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position=="absolute"});return c},u=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=A(e[d],"function"),A(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),v,w={}.hasOwnProperty,x;!A(w,c)&&!A(w.call,c)?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],c)},o.hashchange=function(){return u("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},o.history=function(){return!!a.history&&!!history.pushState},o.hsla=function(){y("background-color:hsla(120,40%,100%,.5)");return B(k.backgroundColor,"rgba")||B(k.backgroundColor,"hsla")},o.borderradius=function(){return D("borderRadius")},o.boxshadow=function(){return D("boxShadow")};for(var E in o)x(o,E)&&(v=E.toLowerCase(),e[v]=o[E](),r.push((e[v]?"":"no-")+v));y(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._domPrefixes=n,e.mq=t,e.hasEvent=u,e.testProp=function(a){return C([a])},e.testAllProps=D,e.testStyles=s,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+r.join(" "):"");return e}(this,this.document),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
//     keymaster.js
//     (c) 2011 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.
(function(a){function h(a,b){var c=a.length;while(c--)if(a[c]===b)return c;return-1}function i(a){var b,g,i,j,k;b=a.keyCode;if(b==93||b==224)b=91;if(b in d){d[b]=!0;for(i in f)f[i]==b&&(l[i]=!0);return}if(!l.filter.call(this,a))return;if(!(b in c))return;for(j=0;j<c[b].length;j++){g=c[b][j];if(g.scope==e||g.scope=="all"){k=g.mods.length>0;for(i in d)if(!d[i]&&h(g.mods,+i)>-1||d[i]&&h(g.mods,+i)==-1)k=!1;(g.mods.length==0&&!d[16]&&!d[18]&&!d[17]&&!d[91]||k)&&g.method(a,g)===!1&&(a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation&&a.stopPropagation(),a.cancelBubble&&(a.cancelBubble=!0))}}}function j(a){var b=a.keyCode,c;if(b==93||b==224)b=91;if(b in d){d[b]=!1;for(c in f)f[c]==b&&(l[c]=!1)}}function k(){for(b in d)d[b]=!1;for(b in f)l[b]=!1}function l(a,b,d){var e,h,i,j;d===undefined&&(d=b,b="all"),a=a.replace(/\s/g,""),e=a.split(","),e[e.length-1]==""&&(e[e.length-2]+=",");for(i=0;i<e.length;i++){h=[],a=e[i].split("+");if(a.length>1){h=a.slice(0,a.length-1);for(j=0;j<h.length;j++)h[j]=f[h[j]];a=[a[a.length-1]]}a=a[0],a=g[a]||a.toUpperCase().charCodeAt(0),a in c||(c[a]=[]),c[a].push({shortcut:e[i],scope:b,method:d,key:e[i],mods:h})}}function m(a){var b=(a.target||a.srcElement).tagName;return b!="INPUT"&&b!="SELECT"&&b!="TEXTAREA"}function n(a){e=a||"all"}function o(){return e||"all"}function p(a){var b,d,e;for(b in c){d=c[b];for(e=0;e<d.length;)d[e].scope===a?d.splice(e,1):e++}}function q(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,function(){c(window.event)})}var b,c={},d={16:!1,18:!1,17:!1,91:!1},e="all",f={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},g={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220};for(b=1;b<20;b++)f["f"+b]=111+b;for(b in f)l[b]=!1;q(document,"keydown",i),q(document,"keyup",j),q(window,"focus",k),a.key=l,a.key.setScope=n,a.key.getScope=o,a.key.deleteScope=p,a.key.filter=m,typeof module!="undefined"&&(module.exports=key)})(this);
var Verlag = {};

Verlag.Model = {};
Verlag.Collection = {};
Verlag.View = {};

Verlag.collections = {};
Verlag.templates = {};

// Precompile and cache a given template with Hogan.js
// compiling is the most expensive part of Mustache templates
// so we attempt to only do it once
Verlag.compile_template = function(template){
  if (Verlag.templates[template]){
    return Verlag.templates[template];
  } else {
    Verlag.templates[template] = Hogan.compile($('#' + template).html());
    return Verlag.templates[template];
  }
};

Verlag.closeModal = function(){
  $('#overlay').fadeOut('fast', function(){
    $(this).remove();
  });
}

Verlag.notify = function(message, options){
  var options = options || {};
  var klass = options['class'] || 'message';
  var notice = jQuery('.notice');
  
  notice
    .html(message) 
    .addClass(klass)
    .fadeIn('fast', function(){
      setTimeout(function(){
        if (!options['persist']){
          notice.fadeOut('slow');
        }
      }, 1800);
    });
}; 
  
Verlag.hide_notice = function(){
  jQuery('.notice').fadeOut('slow');    
};

// ACE Editor keyboard shortcuts
Verlag.ace_settings = function(){
  var canon = require('pilot/canon');  
  canon.addCommand({
    name: 'save',
    bindKey: {
      win: 'Ctrl-S',
      mac: 'Command-S',
      sender: 'editor'
    },
    exec: function() {
      jQuery('form.command-save').submit();
    }
  });
}

// ACE Editor modes depending on content type
Verlag.ace_modes = {
  'javascript' : require('ace/mode/javascript').Mode,
  'html'       : require('ace/mode/html').Mode,
  'css'        : require('ace/mode/css').Mode,
  'scss'       : require('ace/mode/scss').Mode,
  'sass'       : require('ace/mode/scss').Mode,
  'textile'    : require('ace/mode/textile').Mode,
  // 'partial'    : require('ace/mode/scss').Mode,
  'none'       : require('ace/mode/scss').Mode
}

  


  
;
Verlag.Model.Asset = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  // url: function() {
  //   return '/admin/assets/' + this.id + '.json';
  // },
  
  urlRoot: '/admin/assets',
  
  initialize: function() {
    
  },
  
  admin_path: function(){
    return '/admin/folders/' + this.folder_id + '/assets/' + this.id 
  }
  
  
});
Verlag.Model.Folder = Backbone.Model.extend({
  
  urlRoot: '/admin/folders',
  
  initialize: function() {
    
  },
  
  fetch_assets: function(callback){
    var self = this;
    $.ajax({
      url: '/admin/folders/' + self.id + '/assets.json',
      success: function(response){
        var assets = new Verlag.Collection.Assets(response);
        if(callback){
          callback.call(this, assets, response);
        }
      }
    });
  },
  
  admin_path: function(){
    return '/admin/folders/' + this.id 
  }
  
  
});
Verlag.Model.Page = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  // url: function() {
  //   return '/admin/pages/' + this.id + '.json';
  // },
  
  urlRoot: '/admin/pages',
  
  initialize: function() {
    
  }, 
  
  children: function(){
    var self = this,
      children = Verlag.pages.select(function(page){
        return page.get('parent_id') == self.id;
      });
      
    return new Verlag.Collection.Pages(children);
  },
  
  childData: function(){
    return this.children().map(function(child){
      return child.pageData();
    });
  },
  
  pageData: function(){
    var attr = this.toJSON();
    
    attr['children'] = this.childData();
    return attr;
  }
  
});
Verlag.Model.PageType = Backbone.Model.extend({
  
  urlRoot: '/admin/page_types.json',
  
  initialize: function() {
    
  }
  
});
Verlag.Model.Template = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  // url: function() {
  //   return '/admin/templates/' + this.id + '.json';
  // }
  
  urlRoot: '/admin/templates',
  
});
Verlag.Model.User = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  url: function() {
    return '/admin/users/' + this.id + '.json';
  },
  
  initialize: function() {
    
  },
  
  is_admin: function(){
    return this.get('role').id >= 100;
  },
  
  is_super_user: function(){
    return this.get('role').id >= 101;
  },
  
  admin_path: function(){
    return '/admin/folders/' + this.id 
  }
  
});
Verlag.Collection.Assets = Backbone.Collection.extend({
  
  model: Verlag.Model.Asset,

  url: '/admin/assets',
  
  // url: function(folder_id){
  //   return '/admin/folders/' + folder_id + '/assets.json'
  // },

  initialize: function() {
  
  }

  
});
Verlag.Collection.Folders = Backbone.Collection.extend({
  
  model: Verlag.Model.Folder,

  url: '/admin/folders',

  initialize: function() {
  
  }
  
  // root: function(){
  //   return this.detect(function(page){
  //     return !page.get('parent_id');
  //   });
  // },
  // 
  // find_by_parent_id: function(id){
  //   return this.detect(function(page){
  //     return page.get('parent_id') == id;
  //   });
  // },
  // 
  // find_by_path: function(path){
  //   return this.detect(function(page){
  //     return page.get('path') == path;
  //   });
  // }
  
});
Verlag.Collection.PageTypes = Backbone.Collection.extend({
  
  model: Verlag.Model.PageType,
  
  url: '/admin/page_types',

  initialize: function() {
    console.log('hey')
  }
  
});
Verlag.Collection.Pages = Backbone.Collection.extend({
  
  model: Verlag.Model.Page,

  url: '/admin/pages',

  initialize: function() {
  
  }, 
  
  root: function(){
    return this.detect(function(page){
      return !page.get('parent_id');
    });
  },
  
  find_by_parent_id: function(id){
    return this.select(function(page){
      return page.get('parent_id') == id;
    });
  },
  
  find_by_path: function(path){
    return this.detect(function(page){
      return page.get('path') == path;
    });
  }
  
});
Verlag.Collection.Templates = Backbone.Collection.extend({
  
  model: Verlag.Model.Template,

  url: '/admin/templates',
  
  // url: function(folder_id){
  //   return '/admin/folders/' + folder_id + '/assets.json'
  // },

  initialize: function() {
  
  },
  
  find_by_klass: function(klass){
    return this.filter(function(template){
      return template.get('klass') === klass;
    });
  }

  
});
Verlag.View.Assets = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  events: {
    'click a[rel="show_asset"]': 'show',
    'click a.js-remove': 'remove'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    var self = this;
      
    this.folder = Verlag.folders.get(options.id);
    this.folder.fetch_assets(function(assets, response){
      self.folder.assets = assets;
      assets.on('all', function(){
        self.render();
      });
      self.render();
      
      if(options.success) options.success.call(this);
    });
  },

  render: function(callback) {
    $('#overlay').hide();

    var self = this,
        template = Verlag.compile_template('admin-assets-index'),
        partials = { 
          asset:  Verlag.compile_template('admin-assets-asset') 
        },
        data = { 
          folder: this.folder.toJSON(),
          assets: this.folder.assets.toJSON()
        };
    
    $(self.el).html(template.render(data, partials));
    $('#sidebar li.node').removeClass('active');
    $('li#folder-' + this.folder.id).addClass('active');
  }, 
  
  show: function(e){
    e.preventDefault();
    var href = $(e.currentTarget).attr('href'),
      folder_id = href.split('/')[3],
      id = href.split('/')[5];
      
    Verlag.router.navigate(href, { trigger: false });
    Verlag.modal = new Verlag.View.Asset({ folder_id: folder_id, id: id });
    Verlag.modal.render(folder_id, id);
  }, 
  
  remove: function(e){
    e.preventDefault();
    var asset = this.folder.assets.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: asset, 
      collection: 'assets' 
    });
  }

});
Verlag.View.Asset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',
  
  events: {
    'click #overlay'          : 'close_overlay',
    'click #overlay a.cancel' : 'close_modal',
    'click input#save-asset'  : 'update'
  },

  initialize: function(options) {
    var id = options.id,
        folder_id = options.folder_id;
        
    this.folder = Verlag.folders.get(folder_id);
    this.asset = this.folder.assets.get(id);
    
    $(this.el).undelegate('div#overlay a.cancel', 'click');
    $(this.el).undelegate('form#edit-asset', 'submit');
  },

  render: function() {
    var template = Verlag.compile_template('admin-assets-edit'),
        data = { 
          asset: this.asset.toJSON()
        };
    
    $(this.el).append(template.render(data));
    Verlag.loadModal('div#asset-editor', function(){
      jQuery('div#asset-editor').fadeIn(320); 
    }); 
  },
  
  close_overlay: function(e){
    e.preventDefault();
    if(e.target.id == 'overlay'){
      this.close_modal(e);
    }
  },
  
  close_modal: function(e){
    e.preventDefault();
    $('#overlay').fadeOut('fast', function(){
      $(this).remove();
    });
    Verlag.router.navigate(this.folder.get('admin_path'), { 
      trigger: false 
    });
  },
  
  update: function(e){
    e.preventDefault();

    var target = $(e.currentTarget);
    var form = target.parents('form');
    var tag_list = form.find('#asset_tag_list').val();
    var title = form.find('#asset_title').val();
    var asset = this.asset;
    
    asset = asset.save({
      title: title,
      tag_list: tag_list
    }, {
      success: function(response){
        Verlag.notify('Asset saved')
      },
      error: function(){
        alert('error')
      }
    });
  }

});
Verlag.View.DesignEdit = Backbone.View.extend({

  el: '#editor',

  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    // 'click a': 'showTemplate'
    'submit form#edit-layout': 'update'
  },

  initialize: function(options) {
    this.layout = Verlag.templates.get(options.id);
    $(this.el).undelegate();
    if(Verlag.aceEditor){
      Verlag.aceEditor.destroy();
    }
  },
  
  data: function(){
    return {
      'layout': this.layout.toJSON(),
      'layout?': false
    }
  },

  render: function() {
    var template = Verlag.compile_template('admin-templates-edit');
    
    $(this.el).html(template.render(this.data())); 
    this.intitializeAce();
  },
  
  intitializeAce: function(){
    var layout = this.layout,
        mode = layout.get('mode'),
        editorMode = Verlag.ace_modes[mode];
    
    Verlag.aceEditor = ace.edit('layout_content');
    Verlag.aceEditor.setTheme('ace/theme/textmate');
    Verlag.aceEditor.getSession().setMode(new editorMode);
    Verlag.aceEditor.session.setUseWrapMode(true);
    // Because Mustache screws up my liquid templates, 
    // I just set it manually, directly from the model
    // This also eleminates the FUC
    Verlag.aceEditor.getSession().setValue(layout.get('content'));  
  },
  
  update: function(e){
    e.preventDefault();
    
    var attributes = {
      content: Verlag.aceEditor.getSession().getValue(),
      name: $(e.target).find('input#layout_name').val()
    };
    
    this.layout.save(attributes ,{
      success: function(model, response){
        Verlag.notify('Layout saved')
      }
    });
  }
  

});
Verlag.View.DesignIndex = Backbone.View.extend({

  el: '#sidebar',

  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'show',
    'click a.js-remove': 'remove',
    'click a.js-new': 'new'
  },

  initialize: function() {
    var self = this;
    Verlag.templates.on('all', function(){
      self.render();
    });
    $(this.el).undelegate();
  },
  
  data: function(){
    return {
      templates: [{
        title: 'Layouts',
        klass: 'Layout',
        models: Verlag.templates.find_by_klass('Layout').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Partials',
        klass: 'Partial',
        models: Verlag.templates.find_by_klass('Partial').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Stylesheets',
        klass: 'Stylesheet',
        models: Verlag.templates.find_by_klass('Stylesheet').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Javascripts',
        klass: 'Javascript',
        models: Verlag.templates.find_by_klass('Javascript').map(function(l){
          return l.toJSON()
        })
      }]
    }
  },

  render: function() {
    var template = Verlag.compile_template('admin-templates-index');
    
    $(this.el).html(template.render(this.data())); 
  },
  
  new: function(e){
    e.preventDefault();
    var klass = $(e.target).data('klass');
    var template = new Verlag.Model.Template({
      klass: klass,
      content: ' '
    });
    
    Verlag.modal = new Verlag.View.New({ 
      model: template, 
      collection: 'templates' 
    });
    
  },
  
  show: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    Verlag.router.navigate(path, { trigger: true });
  },
  
  remove: function(e){
    e.preventDefault();
    var template = Verlag.templates.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: template, 
      collection: 'templates' 
    });
  }
  

});
Verlag.View.FolderIndex = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a[rel="show_folder"]': 'show',
    'click a.js-new-folder': 'new',
    'click a.js-remove': 'remove'
  },

  initialize: function() {
    Verlag.folders.on('all', this.render);
    $(this.el).undelegate();
  },

  render: function() {
    var folders = Verlag.folders,
        template = Verlag.compile_template('admin-folders-index'),
        data = { 
          folders: folders.toJSON()
        };
    
    $('#sidebar').html(template.render(data)); 
  },
  
  show: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href'),
      id = path.split('/')[3];
    
    Verlag.router.navigate(path, { trigger: false });
    Verlag.editor = new Verlag.View.Assets({ id: id });
    
  }, 
  
  new: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    var model = new Verlag.Model.Folder();
    
    Verlag.modal = new Verlag.View.New({ model: model, collection: 'folders' });
  }, 
  
  remove: function(e){
    e.preventDefault();
    var folder = Verlag.folders.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: folder, 
      collection: 'folders' 
    });
  }
  

});
Verlag.View.PageIndex = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'show',
    'click a.js-remove': 'remove',
    'click a.js-new': 'new'
  },

  initialize: function() {
    var self = this;
    Verlag.pages.on('all', function(){
      self.render()
    });
    
    $(this.el).undelegate();
    this.render();
  },
  
  data: function(){
    return { 
      root: Verlag.pages.root().pageData()
    };
  },

  render: function() {
    var template = Verlag.compile_template('admin-pages-index'),
        partials = { 
         node:  Verlag.compile_template('admin-pages-node') 
        };
        
    $(this.el).html(template.render(this.data(), partials));
  }, 

  new: function(e){
    e.preventDefault();
    var id = $(e.target).data('id');
    var parent = Verlag.pages.get(id);
    var model = new Verlag.Model.Page({
      parent_id: id
    });
    
    parent.set({ 'children?': true, 'open?': true });
    Verlag.modal = new Verlag.View.New({ 
      model: model, 
      collection: 'pages' 
    });
  },
  
  show: function(e){
    e.preventDefault();
    var href = $(e.target).attr('href'),
      id = href.split('/')[3];
    
    Verlag.router.navigate(href, { trigger: false });
    Verlag.editor = new Verlag.View.PagePreview({ id: id });
  },
  
  remove: function(e){
    e.preventDefault();
    var page = Verlag.pages.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: page, 
      collection: 'pages' 
    });
  }

});
Verlag.View.PagePreview = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    // 'submit form#editor-buttons': 'update',
    'click input#save': 'update'
  },

  initialize: function(options) {
    this.page = Verlag.pages.get(options.id);
    $(this.el).undelegate('input#save', 'click');
    this.render();
  },

  render: function(id) {
    var page = this.page,
        template = Verlag.compile_template('admin-pages-show'),
        data = { page: page.toJSON() };

    $(this.el).html(template.render(data));
    $('#sidebar li.node').removeClass('active')
    $('li#page-' + page.id).addClass('active');
    
    Verlag.iFramer.initialize('.preview iframe', function(){
      Verlag.Editor.initialize();
    }); 
  },
  
  update: function(e){
    e.preventDefault();
    var page = this.page;
    var iframe = $(this.el).find('iframe');
    var parts = page.get('contents');
    
    iframe.contents().find('div.editable').each(function(i, part){
      var id = $(part).attr('id').split('-')[1];
      var content = $(part).html();
      var p = _.detect(parts, function(p){ return p.id == id });
      if(p) p.content = content;
    });
    
    page.save({ 
      contents: parts 
    },{
      success: function(){
        Verlag.notify('Page saved')
      }
    });
  }

});
Verlag.View.Settings = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-new': 'new',
    'click a.js-remove': 'remove'
  },

  initialize: function() {
    $(this.el).undelegate();
    var self = this;
    
    $.ajax({
      url: '/admin/page_types.json',
      success: function(response){
        Verlag.page_types = new Verlag.Collection.PageTypes(response);
        Verlag.page_types.on('all', function(){
          self.render();
        });
        self.render();
      }
    });
  },
  
  data: function(){
    return {
      page_types: Verlag.page_types.toJSON()
    };
  },

  render: function() {
    var template = Verlag.compile_template('admin-settings-index');
    console.log(this.data())
        
    $(this.el).html(template.render(this.data()));
  }, 

  new: function(e){
    e.preventDefault();

    var model = new Verlag.Model.PageType();
    
    Verlag.modal = new Verlag.View.New({ 
      model: model, 
      collection: 'page_types' 
    });

  },
  
  show: function(e){
    e.preventDefault();

  },
  
  remove: function(e){
    e.preventDefault();
    var pageTypes = Verlag.page_types.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: pageTypes, 
      collection: 'page_types' 
    });

  }

});
Verlag.View.New = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'click button.js-new': 'create'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    
    this.model = options.model;
    this.parent = options.parent;
    this.collection = options.collection;
    this.render();
  },

  render: function() {
    var template = Verlag.compile_template('admin-shared-new'),
        partials = {
          form: Verlag.compile_template('admin-' + this.collection + '-new')
        },
        data = {
          model: this.model ? this.model.toJSON() : {},
          layouts: Verlag.templates.find_by_klass('Layout').map(function(l){
            return l.toJSON();
          })
        };

    $(template.render(data, partials)).hide().appendTo(this.$el).fadeIn('fast');
  },
  
  create: function(e){
    e.preventDefault();
    var self = this;
    var form = $(e.target).parents('form');
    var attr = {};
    
    form.serializeArray().forEach(function(a){
      attr[a.name] = a.value;
    });
    
    this.model.save(attr, {
      success: function(model, response){
        Verlag.notify('created');
        Verlag[self.collection].add(model);
        Verlag.router.navigate(model.get('admin_path'), { trigger: true });
        Verlag.closeModal();
      }
    });
  }
  
});
Verlag.View.Remove = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'click form.remove button': 'delete'
  },

  initialize: function(options) {
    this.model = options.model;
    this.collection = options.collection;
    $(this.el).undelegate();
    this.render();
  },

  render: function() {
    
    var template = Verlag.compile_template('admin-shared-remove'),
        data = { 
          model: this.model.toJSON()
        };

    $(template.render(data)).hide().appendTo(this.$el).fadeIn('fast');
  },
  
  delete: function(e){
    var self = this;
    
    e.preventDefault();
    this.model.destroy({
      success: function(){
        Verlag.router.navigate('/admin/' + self.collection, { trigger: true });
        Verlag.notify('removed');
        Verlag.closeModal();                         
      }
    });

  }
  
});
Verlag.Editor = {
  
  initialize: function(){
    var self = this,
      buttons = jQuery('#editor-buttons input[type=button]'),
      save = jQuery('#editor-buttons input#save');
    
    buttons.click(function(){
      // alert(jQuery(this).attr('id'));
      var cmd = jQuery(this).data('cmd'),
        bool = false,
        value = jQuery(this).data('value'),
        iframe = jQuery('iframe')[0];
      
      if (value == 'promptUser'){
        value = prompt(jQuery(this).data('text'));
      }
      if(cmd){
        iframe.contentDocument.execCommand(cmd, bool, value);
      }
    });
    
    // save.click(function(){
    //   var pathHash = document.location.pathname.split('/'),
    //     id = pathHash[pathHash.length-1],
    //     page = Page.find(id),
    //     iframe = jQuery('iframe'),
    //     parts = {};
    //   
    //   iframe.contents().find('div.editable').each(function(){
    //     var iframe = jQuery(this),
    //      id = iframe.attr('id').split('-')[1];
    //      
    //     parts[id] = iframe.html();
    //   });
    //   jQuery.each(parts, function(id, content){
    //     content = self.textilize(content);
    //     page.setPartAttributes(id, { 'content': content });
    //   });
    //   page.save();
    // });
  },
  
  textilize: function(html, escape){
    // console.log(html)
    html = html.replace(/\s*<p>((.|[\r\n])*?)<\/p>\s*/gi, "\n\n$1\n\n\n");
    // html = html.replace(/<br ?\/?>/gi, "\n");
    html = html.replace(/\s*<h1>((.|[\r\n])*?)<\/h1>\s*/gi, "h1. $1\n\n");
    html = html.replace(/\s*<h2>((.|[\r\n])*?)<\/h2>\s*/gi, "h2. $1\n\n");
    html = html.replace(/\s*<h3>((.|[\r\n])*?)<\/h3>\s*/gi, "h3. $1\n\n");
    html = html.replace(/\s*<h4>((.|[\r\n])*?)<\/h4>\s*/gi, "h4. $1\n\n");
    html = html.replace(/\s*<h5>((.|[\r\n])*?)<\/h5>\s*/gi, "h5. $1\n\n");
    html = html.replace(/\s*<h6>((.|[\r\n])*?)<\/h6>\s*/gi, "h6. $1\n\n");
    html = html.replace(/<(?:b|strong)>((.|[\r\n])*?)<\/(?:b|strong)>/gi, '*$1*');
    html = html.replace(/<(?:i|em)>((.|[\r\n])*?)<\/(?:i|em)>/gi, '_$1_');
    html = html.replace(/<(?:strike|del)>((.|[\r\n])*?)<\/(?:strike|del)>/gi, '-$1-');
    html = html.replace(/<(?:u|ins)>((.|[\r\n])*?)<\/(?:u|ins)>/gi, '+$1+');
    html = html.replace(/<a href="(.*?)">((.|[\r\n])*?)<\/a>/gi, '"$2":$1');
    html = html.replace(/<code.*?>((.|[\r\n])*?)<\/code>/gi, '@$1@');
    if (escape){
      html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');//Escape any remaining HTML
    }
    html = html.replace(/(\r\n|\n){3,}/g, "\n\n");
    html = html.replace(/^[\r\n]+|[\r\n]+$/g, '');
    return html;
  }
  
}

;
Verlag.iFramer = {       
  initialize: function(element, callback){   
    var iframe = jQuery(element);  
    var loader_el = jQuery('#loader');
    
    if(!iframe.length) return;
    // iframe.hide()
    
    // console.log(trigger) 
    // Loader.start(loader_el);
    
    // The load event is not always being fired...
    iframe.load(function(){   
      var content = iframe.contents();  
      var areas = content.find('div.editable');
      var internal_links = content.find('a'); // iFrameContent.find('a[href^="/preview"]');
      // var editor = iFrameContent.find('span.part-editor');
      // var flags = editor.find('a'); 
      
      // Sets the editable parts so they can actually be edited live
      areas.attr('contenteditable','true').css({'background': 'hsla(210, 77%, 90%, 0.4)' });
      
      // Loader.stop(loader_el); 
      // self.setEditFlags(editor); 
      // iframe.fadeIn('fast');           

      // Sets preview links to change the sammy.js routes instead of the usual route
      
      internal_links.click(function(e){
        var path = $(this).attr('href').split('?')[0].replace('/preview','');
        var page = Verlag.pages.find_by_path(path);
        
        if (page){
          e.preventDefault();
          Verlag.router.navigate(page.get('admin_path'), { trigger: true });
        }
      });
      // 
      var image_links = content.find('a.insert-image');
      image_links.click(function(e){
        e.preventDefault();
        
        var path = jQuery(this).attr('href');
        alert(path)
        // Base.trigger('image-browser', href);
      });
      
      if(callback){ callback.call(this); } 
    }); 
  }
}
;
// resizes and centers modals vertically. 
// Horizontal centering is handled with CSS...
Verlag.loadModal = function(element, callback){
  var self = this;
  var container = jQuery(element);
  if(!container.length){ return }

  // Loader.start();

  var img = container.find('img');
  if(img.length){
    setTimeout(function(){
      if(container.height() < 20){
        img.load(function(){
          self.resizeModal(img, container, callback);
        });
      } else {
        self.resizeModal(img, container, callback);
      }
    }, 13);
  } else {
    // if there is no image. This needs to move to a function
    var docWidth = jQuery(window).width();
    var docHeight = jQuery(window).height();
      
    container.css({
      'width': '640px',
      'height': '480px',
      'margin-top': (docHeight - 540)/2 + 'px'
    });
    // Loader.stop();
    if(callback){ callback.call(this); }
  }
};

Verlag.resizeModal = function(img, container, callback){
  var temp_img = img.clone(),
   width = temp_img[0].width,
   height = temp_img[0].height,
   ratio = width / height,
   docWidth = jQuery(window).width(),
   docHeight = jQuery(window).height(),
   margins = 40;
     
     
  if(container.height() >= (docHeight - 40)){
    img
      .height(docHeight - 40)
      .width((docHeight - 40) * ratio);
    container
      .height(docHeight - 40)
      .width((docHeight - 40) * ratio);
  } 
    
  if(container.width() >= (docWidth - 40)){
    img
      .height((docWidth - 40) / ratio)
      .width(docWidth - 40);
    container
      .height((docWidth - 40) / ratio)
      .width(docWidth - 40);
    container.css({
      'margin-top': (docHeight - ((docWidth - 40) / ratio))/2
    });
  } 
  if(container.width() < (docWidth - 40) && container.height() < (docHeight - 40)) {
    container.css({
      'width': (container.height() * ratio) + 'px',
      'margin-top': (docHeight - container.height())/2
    });
  }
  // Loader.stop();
  if(callback){ callback.call(this); }
};

// Backbone router
Verlag.Router = Backbone.Router.extend({
  
  routes: {
    '':                                       'show_index', 
    'admin/':                                 'show_index',
    'admin/pages':                            'show_pages',
    'admin/pages/:id':                        'show_page',
    'admin/folders':                          'folders_index',
    'admin/folders/:id':                      'show_folder',
    'admin/folders/:folder_id/assets/:id':    'show_asset',
    'admin/templates':                        'templates_index',
    'admin/templates/:id':                    'show_template',
    'admin/settings':                         'show_settings'
  },
  
  show_index: function(){
    // console.log('started');
  },
  
  // Pages
  // ------------------------------------------------------------ //
  show_pages: function(){
    this.cleanup(Verlag.sidebar);
    Verlag.sidebar = new Verlag.View.PageIndex({ el: $('#sidebar') });
    
    $('#editor').html('');
  },
  
  show_page: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
        
    Verlag.sidebar = new Verlag.View.PageIndex();
    Verlag.editor = new Verlag.View.PagePreview({ id: id });
  }, 
  
  // Folders
  // ------------------------------------------------------------ //
  folders_index: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.sidebar.render();
    
    $('#editor').html('');
  },
  
  show_folder: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.sidebar.render();
    
    Verlag.editor = new Verlag.View.Assets({ 
      id: id
    });
  },
  
  // Assets
  // ------------------------------------------------------------ //
  show_asset: function(folder_id, id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.sidebar.render();
    
    Verlag.editor = new Verlag.View.Assets({ 
      id: id,
      success: function(){
        Verlag.modal = new Verlag.View.Asset({ folder_id: folder_id, id: id });
        Verlag.modal.render();        
      }
    });
  },
  
  // Design / Templates
  // ------------------------------------------------------------ //
  templates_index: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.sidebar.render();
    
    $('#editor').html('');
  },
  
  show_template: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.sidebar.render();
    
    Verlag.editor = new Verlag.View.DesignEdit({ id: id });
    Verlag.editor.render();
  },
  
  show_settings: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.Settings();
  },
  
  // Shared
  // ------------------------------------------------------------ //
  cleanup: function(view){
    if(view){
      view.off();
      $(view.el).undelegate();
    }
  }
  
});
$(document).ready(function(){
  
  $.ajax({
    url: '/admin/sites/current.json',
    success: function(response){
      Verlag.pages = new Verlag.Collection.Pages(response.pages);
      Verlag.folders = new Verlag.Collection.Folders(response.folders);
      Verlag.templates = new Verlag.Collection.Templates(response.templates);
      
      Verlag.current_user = new Verlag.Model.User(response.current_user);
      
      Verlag.router = new Verlag.Router();
      Backbone.history.start({ pushState: true });
    }
  });
  
  // Main navigation - perhaps needs to be moved to a view
  $('div.nav a.tab').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    
    Verlag.router.navigate(href, { trigger: true });
  });  
  
  // Modal Events
  $('#overlay').live('click', function(e){
    e.preventDefault();
    if(e.target.id == 'overlay'){
      Verlag.closeModal();
    }
  });
  
  // Modal Events
  $('a.close').live('click', function(e){
    e.preventDefault();
    Verlag.closeModal();
  });
  
  Verlag.ace_settings()
  key('command+s, ctrl+s', function(e){
    e.preventDefault();
    console.log('Hijacked Command+S or Ctrl+S, damn!');
  });
  
});
// Ace

// Libraries

// Verlag

// Backbone
    
// Lib

;
