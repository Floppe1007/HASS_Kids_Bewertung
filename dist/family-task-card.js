/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

function today() {
    return new Date().toISOString().split('T')[0];
}
function parseTaskState(raw) {
    const empty = { date: '', done: [] };
    try {
        const parsed = JSON.parse(raw);
        if (parsed &&
            typeof parsed.date === 'string' &&
            Array.isArray(parsed.done)) {
            return parsed;
        }
    }
    catch {
        // fall through to empty
    }
    return empty;
}
function serializeTaskState(state) {
    return JSON.stringify(state);
}
function checkAndResetIfNewDay(state) {
    if (state.date !== today()) {
        return { date: today(), done: [] };
    }
    return state;
}
function validatePin(input, expected) {
    return input === expected;
}

let FamilyTaskCardEditor = class FamilyTaskCardEditor extends i {
    setConfig(config) {
        this._config = config;
    }
    _fire(config) {
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config },
            bubbles: true,
            composed: true,
        }));
    }
    _set(field, value) {
        this._fire({ ...this._config, [field]: value });
    }
    _setTask(index, field, value) {
        const tasks = this._config.tasks.map((t, i) => i === index ? { ...t, [field]: value } : t);
        this._fire({ ...this._config, tasks });
    }
    _addTask() {
        var _a;
        const tasks = [
            ...((_a = this._config.tasks) !== null && _a !== void 0 ? _a : []),
            { id: `task_${Date.now()}`, name: '', icon: '⭐', minutes: 10 },
        ];
        this._fire({ ...this._config, tasks });
    }
    _removeTask(index) {
        const tasks = this._config.tasks.filter((_, i) => i !== index);
        this._fire({ ...this._config, tasks });
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        if (!this._config)
            return b ``;
        return b `
      <div class="editor">
        <ha-textfield
          label="Name des Kindes"
          .value=${(_a = this._config.name) !== null && _a !== void 0 ? _a : ''}
          @change=${(e) => this._set('name', e.target.value)}
        ></ha-textfield>

        <ha-entity-picker
          label="Medienzeit-Entität (input_number)"
          .hass=${this.hass}
          .value=${(_b = this._config.entity_media_time) !== null && _b !== void 0 ? _b : ''}
          .includeDomains=${['input_number']}
          @value-changed=${(e) => this._set('entity_media_time', e.detail.value)}
        ></ha-entity-picker>

        <ha-entity-picker
          label="Aufgaben-Status-Entität (input_text)"
          .hass=${this.hass}
          .value=${(_c = this._config.entity_task_state) !== null && _c !== void 0 ? _c : ''}
          .includeDomains=${['input_text']}
          @value-changed=${(e) => this._set('entity_task_state', e.detail.value)}
        ></ha-entity-picker>

        <ha-textfield
          label="PIN (4-stellig)"
          .value=${(_d = this._config.pin) !== null && _d !== void 0 ? _d : ''}
          @change=${(e) => this._set('pin', e.target.value)}
        ></ha-textfield>

        <ha-textfield
          label="Einlöse-Beträge (Minuten, kommagetrennt, z.B. 30,60)"
          .value=${((_e = this._config.redeem_amounts) !== null && _e !== void 0 ? _e : []).join(', ')}
          @change=${(e) => {
            const amounts = e.target.value
                .split(',')
                .map(n => parseInt(n.trim(), 10))
                .filter(n => !isNaN(n));
            this._set('redeem_amounts', amounts);
        }}
        ></ha-textfield>

        <h3 class="tasks-heading">Aufgaben</h3>
        ${((_f = this._config.tasks) !== null && _f !== void 0 ? _f : []).map((task, i) => b `
          <div class="task-row">
            <ha-textfield
              label="Icon"
              .value=${task.icon}
              class="icon-field"
              @change=${(e) => this._setTask(i, 'icon', e.target.value)}
            ></ha-textfield>
            <ha-textfield
              label="Name"
              .value=${task.name}
              class="name-field"
              @change=${(e) => this._setTask(i, 'name', e.target.value)}
            ></ha-textfield>
            <ha-textfield
              label="Min"
              type="number"
              .value=${String(task.minutes)}
              class="min-field"
              @change=${(e) => this._setTask(i, 'minutes', parseInt(e.target.value, 10))}
            ></ha-textfield>
            <ha-icon-button
              .path=${'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'}
              @click=${() => this._removeTask(i)}
            ></ha-icon-button>
          </div>
        `)}
        <mwc-button @click=${this._addTask.bind(this)}>+ Aufgabe hinzufügen</mwc-button>
      </div>
    `;
    }
    static get styles() {
        return i$3 `
      .editor { display: flex; flex-direction: column; gap: 8px; padding: 16px; }
      ha-textfield, ha-entity-picker { display: block; width: 100%; }
      .tasks-heading { margin: 8px 0 4px; font-size: 14px; }
      .task-row { display: flex; align-items: center; gap: 8px; }
      .icon-field { width: 64px; flex-shrink: 0; }
      .name-field { flex: 1; }
      .min-field { width: 72px; flex-shrink: 0; }
    `;
    }
};
__decorate([
    n({ attribute: false })
], FamilyTaskCardEditor.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], FamilyTaskCardEditor.prototype, "_config", void 0);
FamilyTaskCardEditor = __decorate([
    t('family-task-card-editor')
], FamilyTaskCardEditor);

let FamilyTaskCard = class FamilyTaskCard extends i {
    constructor() {
        super(...arguments);
        this._dialog = 'none';
        this._pin = '';
        this._pinError = false;
        this._newTaskIcon = '⭐';
        this._newTaskName = '';
        this._newTaskMinutes = 10;
    }
    static getConfigElement() {
        return document.createElement('family-task-card-editor');
    }
    static getStubConfig() {
        return { name: 'Kind', redeem_amounts: [30, 60], tasks: [] };
    }
    setConfig(config) {
        if (!config.entity_media_time || !config.entity_task_state) {
            throw new Error('entity_media_time and entity_task_state are required');
        }
        this._config = config;
    }
    getCardSize() {
        var _a, _b, _c;
        return 3 + Math.ceil(((_c = (_b = (_a = this._config) === null || _a === void 0 ? void 0 : _a.tasks) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) / 2);
    }
    updated(changed) {
        if (changed.has('hass') && this.hass) {
            this._triggerDailyResetIfNeeded();
        }
    }
    async _triggerDailyResetIfNeeded() {
        var _a, _b;
        const raw = (_b = (_a = this.hass.states[this._config.entity_task_state]) === null || _a === void 0 ? void 0 : _a.state) !== null && _b !== void 0 ? _b : '';
        const state = parseTaskState(raw);
        if (state.date !== today()) {
            await this._writeTaskState({ date: today(), done: [] });
        }
    }
    get _taskState() {
        var _a, _b, _c;
        const raw = (_c = (_b = (_a = this.hass) === null || _a === void 0 ? void 0 : _a.states[this._config.entity_task_state]) === null || _b === void 0 ? void 0 : _b.state) !== null && _c !== void 0 ? _c : '';
        return checkAndResetIfNewDay(parseTaskState(raw));
    }
    get _mediaMinutes() {
        var _a, _b, _c;
        return Math.round(Number((_c = (_b = (_a = this.hass) === null || _a === void 0 ? void 0 : _a.states[this._config.entity_media_time]) === null || _b === void 0 ? void 0 : _b.state) !== null && _c !== void 0 ? _c : 0));
    }
    async _writeTaskState(state) {
        await this.hass.callService('input_text', 'set_value', {
            entity_id: this._config.entity_task_state,
            value: serializeTaskState(state),
        });
    }
    async _writeMediaMinutes(minutes) {
        await this.hass.callService('input_number', 'set_value', {
            entity_id: this._config.entity_media_time,
            value: Math.max(0, minutes),
        });
    }
    async _toggleTask(taskId, minutes) {
        const state = this._taskState;
        const isDone = state.done.includes(taskId);
        const newDone = isDone
            ? state.done.filter(id => id !== taskId)
            : [...state.done, taskId];
        const delta = isDone ? -minutes : minutes;
        await Promise.all([
            this._writeTaskState({ ...state, done: newDone }),
            this._writeMediaMinutes(this._mediaMinutes + delta),
        ]);
    }
    _openPin(action) {
        this._dialog = action === 'redeem' ? 'pin-redeem' : 'pin-reset';
        this._pin = '';
        this._pinError = false;
    }
    _handleDigit(digit) {
        if (this._pin.length >= 4)
            return;
        this._pin = this._pin + digit;
        if (this._pin.length === 4)
            this._submitPin();
    }
    async _submitPin() {
        if (!validatePin(this._pin, this._config.pin)) {
            this._pinError = true;
            this._pin = '';
            setTimeout(() => { this._pinError = false; }, 600);
            return;
        }
        this._pin = '';
        if (this._dialog === 'pin-reset') {
            await this._executeReset();
        }
        else {
            this._dialog = 'redeem';
        }
    }
    async _executeRedeem(amount) {
        const newMinutes = amount === 'all' ? 0 : this._mediaMinutes - amount;
        await this._writeMediaMinutes(newMinutes);
        this._dialog = 'none';
    }
    async _executeReset() {
        await this._writeTaskState({ date: today(), done: [] });
        this._dialog = 'none';
    }
    _closeDialog() {
        this._dialog = 'none';
        this._pin = '';
    }
    _openAddTask() {
        this._newTaskIcon = '⭐';
        this._newTaskName = '';
        this._newTaskMinutes = 10;
        this._dialog = 'add-task';
    }
    _saveNewTask() {
        var _a;
        if (!this._newTaskName.trim())
            return;
        const updatedConfig = {
            ...this._config,
            tasks: [
                ...((_a = this._config.tasks) !== null && _a !== void 0 ? _a : []),
                {
                    id: `task_${Date.now()}`,
                    name: this._newTaskName.trim(),
                    icon: this._newTaskIcon || '⭐',
                    minutes: Math.max(1, this._newTaskMinutes || 10),
                },
            ],
        };
        this._config = updatedConfig;
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: updatedConfig },
            bubbles: true,
            composed: true,
        }));
        this._dialog = 'none';
    }
    render() {
        var _a;
        if (!this._config || !this.hass)
            return b ``;
        const state = this._taskState;
        const minutes = this._mediaMinutes;
        return b `
      <ha-card>
        <div class="container">
          <div class="hero">
            <div class="hero-label">🧒 ${this._config.name} hat verdient</div>
            <div class="hero-minutes">${minutes} Min</div>
            <div class="hero-sublabel">Medienzeit 🎮</div>
          </div>
          <div class="tasks">
            ${((_a = this._config.tasks) !== null && _a !== void 0 ? _a : []).map(task => {
            const done = state.done.includes(task.id);
            return b `
                <div
                  class="task ${done ? 'done' : ''}"
                  @click=${() => this._toggleTask(task.id, task.minutes)}
                >
                  <span class="task-icon">${task.icon}</span>
                  <span class="task-name">${task.name}</span>
                  <span class="task-badge">${done ? '✓ ' : ''}${task.minutes} Min</span>
                </div>
              `;
        })}
            <div class="add-task-row" @click=${() => this._openAddTask()}>
              <span class="add-task-plus">＋</span>
              <span>Neue Aufgabe</span>
            </div>
          </div>
          <div class="actions">
            <button class="btn-reset" @click=${() => this._openPin('reset')}>↺ Reset</button>
            <button class="btn-redeem" @click=${() => this._openPin('redeem')}>✓ Einlösen</button>
          </div>
          ${this._dialog !== 'none' ? this._renderOverlay(minutes) : ''}
        </div>
      </ha-card>
    `;
    }
    _renderOverlay(minutes) {
        var _a;
        if (this._dialog === 'add-task') {
            return b `
        <div class="overlay" @click=${(e) => { if (e.target === e.currentTarget)
                this._closeDialog(); }}>
          <div class="dialog">
            <div class="dialog-title">Neue Aufgabe</div>
            <div class="task-form">
              <div class="form-row">
                <input class="form-icon" type="text"
                  .value=${this._newTaskIcon}
                  @input=${(e) => { this._newTaskIcon = e.target.value; }}
                />
                <input class="form-name" type="text" placeholder="Aufgabe..."
                  .value=${this._newTaskName}
                  @input=${(e) => { this._newTaskName = e.target.value; }}
                />
              </div>
              <div class="form-row form-row-min">
                <input class="form-min" type="number" min="1"
                  .value=${String(this._newTaskMinutes)}
                  @input=${(e) => { this._newTaskMinutes = parseInt(e.target.value, 10) || 10; }}
                />
                <span class="form-label">Minuten Medienzeit</span>
              </div>
            </div>
            <button class="redeem-btn" @click=${this._saveNewTask.bind(this)}>Hinzufügen</button>
            <button class="redeem-btn cancel" @click=${this._closeDialog.bind(this)}>Abbrechen</button>
          </div>
        </div>
      `;
        }
        if (this._dialog === 'pin-redeem' || this._dialog === 'pin-reset') {
            return b `
        <div class="overlay" @click=${(e) => { if (e.target === e.currentTarget)
                this._closeDialog(); }}>
          <div class="dialog ${this._pinError ? 'shake' : ''}">
            <div class="dialog-title">🔒 Eltern-PIN eingeben</div>
            <div class="pin-dots">
              ${[0, 1, 2, 3].map(i => b `
                <div class="dot ${i < this._pin.length ? 'filled' : ''}"></div>
              `)}
            </div>
            <div class="numpad">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => b `
                <button class="num" @click=${() => this._handleDigit(String(n))}>${n}</button>
              `)}
              <button class="num secondary" @click=${this._closeDialog.bind(this)}>✕</button>
              <button class="num" @click=${() => this._handleDigit('0')}>0</button>
              <button class="num secondary" @click=${() => { this._pin = this._pin.slice(0, -1); }}>⌫</button>
            </div>
          </div>
        </div>
      `;
        }
        const amounts = (_a = this._config.redeem_amounts) !== null && _a !== void 0 ? _a : [30, 60];
        return b `
      <div class="overlay" @click=${(e) => { if (e.target === e.currentTarget)
            this._closeDialog(); }}>
        <div class="dialog">
          <div class="dialog-title">Wie viel einlösen?</div>
          ${amounts.map(amount => b `
            <button class="redeem-btn" @click=${() => this._executeRedeem(amount)}>
              ${amount} Minuten
            </button>
          `)}
          <button class="redeem-btn all" @click=${() => this._executeRedeem('all')}>
            Alles (${minutes} Min)
          </button>
          <button class="redeem-btn cancel" @click=${this._closeDialog.bind(this)}>Abbrechen</button>
        </div>
      </div>
    `;
    }
    static get styles() {
        return i$3 `
      .container { position: relative; overflow: hidden; }

      .hero {
        background: linear-gradient(135deg, #2a9d8f, #457b9d);
        padding: 20px; text-align: center; color: white;
      }
      .hero-label { font-size: 14px; opacity: 0.85; margin-bottom: 4px; }
      .hero-minutes { font-size: 40px; font-weight: 700; letter-spacing: -1px; }
      .hero-sublabel { font-size: 12px; opacity: 0.75; margin-top: 2px; }

      .tasks { padding: 8px 12px; }
      .task {
        display: flex; align-items: center; gap: 10px;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color, #eee);
        cursor: pointer; user-select: none; transition: opacity 0.15s;
      }
      .task:last-child { border-bottom: none; }
      .task.done { opacity: 0.5; }
      .task.done .task-name { text-decoration: line-through; }
      .task-icon { font-size: 20px; }
      .task-name { flex: 1; font-size: 14px; }
      .task-badge {
        font-size: 12px; padding: 2px 8px; border-radius: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--secondary-text-color, #555);
      }
      .task.done .task-badge {
        background: var(--success-color, #2a9d8f); color: white;
      }

      .actions {
        display: flex; gap: 8px; padding: 12px;
        border-top: 1px solid var(--divider-color, #eee);
      }
      .btn-reset {
        flex: 1; padding: 8px; border-radius: 8px;
        border: 1px solid var(--error-color, #e76f51);
        background: transparent; color: var(--error-color, #e76f51);
        cursor: pointer; font-size: 13px;
      }
      .btn-redeem {
        flex: 2; padding: 8px; border-radius: 8px; border: none;
        background: var(--primary-color, #457b9d); color: white;
        cursor: pointer; font-size: 13px;
      }

      .overlay {
        position: absolute; inset: 0; z-index: 10;
        background: rgba(0, 0, 0, 0.6);
        display: flex; align-items: center; justify-content: center;
      }
      .dialog {
        background: var(--card-background-color, #fff);
        border-radius: 12px; padding: 20px; width: 220px; text-align: center;
      }
      .dialog.shake { animation: shake 0.4s ease-in-out; }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-8px); }
        40%, 80% { transform: translateX(8px); }
      }
      .dialog-title {
        font-size: 14px; color: var(--secondary-text-color); margin-bottom: 16px;
      }

      .pin-dots { display: flex; justify-content: center; gap: 12px; margin-bottom: 20px; }
      .dot {
        width: 14px; height: 14px; border-radius: 50%;
        border: 2px solid var(--secondary-text-color, #999);
        transition: background 0.1s, border-color 0.1s;
      }
      .dot.filled {
        background: var(--primary-color, #457b9d);
        border-color: var(--primary-color, #457b9d);
      }

      .numpad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
      .num {
        padding: 12px; border-radius: 8px; border: none;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--primary-text-color, #333);
        font-size: 16px; cursor: pointer;
      }
      .num.secondary { font-size: 13px; color: var(--secondary-text-color); }

      .redeem-btn {
        display: block; width: 100%; padding: 10px; margin-bottom: 8px;
        border-radius: 8px; border: 1px solid var(--primary-color, #457b9d);
        background: transparent; color: var(--primary-color, #457b9d);
        font-size: 14px; cursor: pointer;
      }
      .redeem-btn.all {
        border-color: var(--success-color, #2a9d8f);
        color: var(--success-color, #2a9d8f);
      }
      .redeem-btn.cancel {
        border-color: var(--divider-color, #ddd);
        color: var(--secondary-text-color, #999);
      }

      .add-task-row {
        display: flex; align-items: center; gap: 10px;
        padding: 8px 4px; cursor: pointer;
        color: var(--primary-color, #457b9d);
        border-top: 1px dashed var(--divider-color, #ddd);
        margin-top: 4px; font-size: 13px; opacity: 0.65;
        transition: opacity 0.15s;
      }
      .add-task-row:hover { opacity: 1; }
      .add-task-plus { font-size: 18px; line-height: 1; }

      .task-form { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
      .form-row { display: flex; gap: 8px; align-items: center; }
      .form-row-min { justify-content: center; }
      .form-icon {
        width: 44px; text-align: center; font-size: 18px;
        border: 1px solid var(--divider-color, #ddd); border-radius: 8px; padding: 6px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #333); flex-shrink: 0;
      }
      .form-name {
        flex: 1; border: 1px solid var(--divider-color, #ddd); border-radius: 8px; padding: 8px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #333); font-size: 14px;
      }
      .form-min {
        width: 64px; border: 1px solid var(--divider-color, #ddd); border-radius: 8px; padding: 8px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #333); font-size: 14px; text-align: center;
      }
      .form-label { font-size: 12px; color: var(--secondary-text-color, #999); }
    `;
    }
};
__decorate([
    n({ attribute: false })
], FamilyTaskCard.prototype, "hass", void 0);
__decorate([
    r()
], FamilyTaskCard.prototype, "_config", void 0);
__decorate([
    r()
], FamilyTaskCard.prototype, "_dialog", void 0);
__decorate([
    r()
], FamilyTaskCard.prototype, "_pin", void 0);
__decorate([
    r()
], FamilyTaskCard.prototype, "_pinError", void 0);
__decorate([
    r()
], FamilyTaskCard.prototype, "_newTaskIcon", void 0);
__decorate([
    r()
], FamilyTaskCard.prototype, "_newTaskName", void 0);
__decorate([
    r()
], FamilyTaskCard.prototype, "_newTaskMinutes", void 0);
FamilyTaskCard = __decorate([
    t('family-task-card')
], FamilyTaskCard);
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'family-task-card',
    name: 'Family Task Card',
    description: 'Kinder sammeln Medienzeit durch das Erledigen von Aufgaben',
});

export { FamilyTaskCard };
