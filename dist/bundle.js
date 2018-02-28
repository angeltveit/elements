/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/attribute.js":
/*!**************************!*\
  !*** ./lib/attribute.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Attribute = Attribute;\n\nfunction Attribute(value) {\n  return function (Class) {\n    if (!Class.prototype.$attributes) Class.prototype.$attributes = [];\n    Class.prototype.$attributes.push(value);\n    Class.prototype[value] = '';\n    console.log('Added attribute', Class.prototype.$attributes); //Class.prototype.observedAttributes = Class.prototype.$attributes\n\n    Object.assign(Class.prototype.constructor, {\n      get observedAttributes() {\n        return Class.prototype.$attributes;\n      }\n\n    });\n  };\n}\n\n//# sourceURL=webpack:///./lib/attribute.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nObject.defineProperty(exports, \"Attribute\", {\n  enumerable: true,\n  get: function () {\n    return _attribute.Attribute;\n  }\n});\nObject.defineProperty(exports, \"Namespace\", {\n  enumerable: true,\n  get: function () {\n    return _namespace.Namespace;\n  }\n});\nObject.defineProperty(exports, \"Template\", {\n  enumerable: true,\n  get: function () {\n    return _template.Template;\n  }\n});\n\nvar _attribute = __webpack_require__(/*! ./attribute */ \"./lib/attribute.js\");\n\nvar _namespace = __webpack_require__(/*! ./namespace */ \"./lib/namespace.js\");\n\nvar _template = __webpack_require__(/*! ./template */ \"./lib/template.js\");\n\n//# sourceURL=webpack:///./lib/index.js?");

/***/ }),

/***/ "./lib/namespace.js":
/*!**************************!*\
  !*** ./lib/namespace.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Namespace = Namespace;\n\nvar _kebabCase = _interopRequireDefault(__webpack_require__(/*! lodash/kebabCase */ \"./node_modules/lodash/kebabCase.js\"));\n\nvar _esm = _interopRequireDefault(__webpack_require__(/*! hyperhtml/esm */ \"./node_modules/hyperhtml/esm/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction Namespace(namespace) {\n  return function (Class) {\n    const componentName = `${namespace}-${(0, _kebabCase.default)(Class.name)}`;\n    Object.assign(Class.prototype, {\n      connectedCallback() {\n        this.$attributes.forEach(attr => {\n          this[attr] = this.getAttribute((0, _kebabCase.default)(attr));\n        });\n        console.log('Attaching shadowRoot');\n        this.attachShadow({\n          mode: 'open'\n        });\n\n        if (this.$template) {\n          this.render();\n        }\n\n        this.attached && this.attached();\n      },\n\n      attributeChangedCallback(attr, oldVal, newVal) {\n        console.log('Attribute changed');\n        if (oldVal === newVal || !oldVal || !newVal) return;\n        this[attr] = newVal;\n        this.render();\n      },\n\n      render() {\n        let rendered;\n\n        if (this.$renderFunction) {\n          rendered = this.$renderFunction(this.$template, this);\n        } else {\n          rendered = this.$template.replace(/{{ *([a-zA-Z0-9]+) *}}/g, function (match, p1) {\n            return '${this.' + p1 + '}';\n          });\n        }\n\n        const template = Function(['html'], `return html \\`${rendered}\\``);\n        template.call(this, _esm.default.bind(this.shadowRoot)); // Attach eventlisteners for attributes wrapped in parentheses\n\n        const nodes = this.shadowRoot.childNodes;\n        nodes.forEach(n => {\n          const attrs = n.getAttributeNames && n.getAttributeNames();\n          if (!attrs) return;\n          attrs.forEach(attr => {\n            const binding = attr.match(/\\[(.*?)\\]/);\n\n            if (binding && binding.length) {\n              // Get variable name\n              const fnArray = attr.match(/\\[(.*?)\\]/);\n              console.log('result', fnArray);\n              if (!fnArray) return;\n              let v = fnArray[1]; // Get value\n\n              let val = n.getAttribute(attr);\n              console.log('binding', v, '=', val);\n              n.addEventListener('change', e => {\n                console.log('Change-event');\n                this[v] = val ? val : e.target && e.target.value;\n                this.render();\n              });\n            }\n\n            const listener = attr.match(/\\((.*?)\\)/);\n\n            if (listener && listener.length) {\n              // Get function name\n              const fnArray = n.getAttribute(attr).match(/[^\\(]+/);\n              console.log('Eventlistener', fnArray);\n              if (!fnArray) return;\n              let fn = fnArray[0]; // Get function value\n\n              let val = n.getAttribute(attr).match(/\\(\\'([^\\)]+)\\'\\)/);\n              if (val) val = val[1];\n              n.addEventListener(listener[1], e => {\n                if (n.getAttribute(attr).includes('(')) {\n                  console.log('function', typeof this[fn]);\n                  if (typeof this[fn] === 'function') return this[fn](val || e);\n                } else {\n                  let v = n.getAttribute(attr);\n                  if (e[v]) this[v] = e[v];\n                }\n              });\n            }\n          });\n        });\n      }\n\n    });\n    customElements.define(componentName, Class);\n  };\n}\n\n//# sourceURL=webpack:///./lib/namespace.js?");

/***/ }),

/***/ "./lib/template.js":
/*!*************************!*\
  !*** ./lib/template.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Template = Template;\n\nfunction Template(content, handler = false) {\n  //console.log(\"escaped string\", content)\n  //console.log(\"evaled\", eval(\"`\"+content+\"`\"))\n  return function (Class) {\n    if (handler) Class.prototype.$renderFunction = handler;\n    Class.prototype.$template = content;\n  };\n}\n\n//# sourceURL=webpack:///./lib/template.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/classes/Component.js":
/*!*********************************************************!*\
  !*** ./node_modules/hyperhtml/esm/classes/Component.js ***!
  \*********************************************************/
/*! exports provided: default, setup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Component; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setup\", function() { return setup; });\n// hyperHTML.Component is a very basic class\n// able to create Custom Elements like components\n// including the ability to listen to connect/disconnect\n// events via onconnect/ondisconnect attributes\nfunction Component() {}\n\n// components will lazily define html or svg properties\n// as soon as these are invoked within the .render() method\n// Such render() method is not provided by the base class\n// but it must be available through the Component extend.\nfunction setup(content) {\n  Object.defineProperties(\n    Component.prototype,\n    {\n      handleEvent: {value(e) {\n        const ct = e.currentTarget;\n        this[\n          ('getAttribute' in ct && ct.getAttribute('data-call')) ||\n          ('on' + e.type)\n        ](e);\n      }},\n      html: lazyGetter('html', content),\n      svg: lazyGetter('svg', content),\n      state: lazyGetter('state', function () { return this.defaultState; }),\n      defaultState: {get() { return {}; }},\n      setState: {value(state) {\n        const target = this.state;\n        const source = typeof state === 'function' ? state.call(this, target) : state;\n        for (const key in source) target[key] = source[key];\n        this.render();\n      }}\n    }\n  );\n}\n\n// instead of a secret key I could've used a WeakMap\n// However, attaching a property directly will result\n// into better performance with thousands of components\n// hanging around, and less memory pressure caused by the WeakMap\nconst lazyGetter = (type, fn) => {\n  const secret = '_' + type + '$';\n  return {\n    get() {\n      return this[secret] || (this[type] = fn.call(this, type));\n    },\n    set(value) {\n      Object.defineProperty(this, secret, {configurable: true, value});\n    }\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/classes/Component.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/classes/Wire.js":
/*!****************************************************!*\
  !*** ./node_modules/hyperhtml/esm/classes/Wire.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Wire; });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.js */ \"./node_modules/hyperhtml/esm/shared/utils.js\");\n/* harmony import */ var _shared_easy_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/easy-dom.js */ \"./node_modules/hyperhtml/esm/shared/easy-dom.js\");\n\n\n\nfunction Wire(childNodes) {\n  this.childNodes = childNodes;\n  this.length = childNodes.length;\n  this.first = childNodes[0];\n  this.last = childNodes[this.length - 1];\n}\n\n// when a wire is inserted, all its nodes will follow\nWire.prototype.insert = function insert() {\n  const df = Object(_shared_easy_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"fragment\"])(this.first);\n  Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"append\"])(df, this.childNodes);\n  return df;\n};\n\n// when a wire is removed, all its nodes must be removed as well\nWire.prototype.remove = function remove() {\n  const first = this.first;\n  const last = this.last;\n  if (this.length === 2) {\n    last.parentNode.removeChild(last);\n  } else {\n    const range = Object(_shared_easy_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"doc\"])(first).createRange();\n    range.setStartBefore(this.childNodes[1]);\n    range.setEndAfter(last);\n    range.deleteContents();\n  }\n  return first;\n};\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/classes/Wire.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/hyper/render.js":
/*!****************************************************!*\
  !*** ./node_modules/hyperhtml/esm/hyper/render.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/poorlyfills.js */ \"./node_modules/hyperhtml/esm/shared/poorlyfills.js\");\n/* harmony import */ var _shared_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/constants.js */ \"./node_modules/hyperhtml/esm/shared/constants.js\");\n/* harmony import */ var _objects_Updates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/Updates.js */ \"./node_modules/hyperhtml/esm/objects/Updates.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/utils.js */ \"./node_modules/hyperhtml/esm/shared/utils.js\");\n/* harmony import */ var _shared_re_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/re.js */ \"./node_modules/hyperhtml/esm/shared/re.js\");\n\n\n\n\n\n\n\n// a weak collection of contexts that\n// are already known to hyperHTML\nconst bewitched = new _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_0__[\"WeakMap\"];\n\n// the collection of all template literals\n// since these are unique and immutable\n// for the whole application life-cycle\nconst templates = new _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_0__[\"Map\"];\n\n// better known as hyper.bind(node), the render is\n// the main tag function in charge of fully upgrading\n// or simply updating, contexts used as hyperHTML targets.\n// The `this` context is either a regular DOM node or a fragment.\nfunction render(template) {\n  const wicked = bewitched.get(this);\n  if (wicked && wicked.template === Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"unique\"])(template)) {\n    update.apply(wicked.updates, arguments);\n  } else {\n    upgrade.apply(this, arguments);\n  }\n  return this;\n}\n\n// an upgrade is in charge of collecting template info,\n// parse it once, if unknown, to map all interpolations\n// as single DOM callbacks, relate such template\n// to the current context, and render it after cleaning the context up\nfunction upgrade(template) {\n  template = Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"unique\"])(template);\n  const info =  templates.get(template) ||\n                createTemplate.call(this, template);\n  const fragment = Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"importNode\"])(this.ownerDocument, info.fragment);\n  const updates = _objects_Updates_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create(fragment, info.paths);\n  bewitched.set(this, {template, updates});\n  update.apply(updates, arguments);\n  this.textContent = '';\n  this.appendChild(fragment);\n}\n\n// an update simply loops over all mapped DOM operations\nfunction update() {\n  const length = arguments.length;\n  for (let i = 1; i < length; i++) {\n    this[i - 1](arguments[i]);\n  }\n}\n\n// a template can be used to create a document fragment\n// aware of all interpolations and with a list\n// of paths used to find once those nodes that need updates,\n// no matter if these are attributes, text nodes, or regular one\nfunction createTemplate(template) {\n  const paths = [];\n  const html = template.join(_shared_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"UIDC\"]).replace(SC_RE, SC_PLACE);\n  const fragment = Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"createFragment\"])(this, html);\n  _objects_Updates_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find(fragment, paths, template.slice());\n  const info = {fragment, paths};\n  templates.set(template, info);\n  return info;\n}\n\n// some node could be special though, like a custom element\n// with a self closing tag, which should work through these changes.\nconst SC_RE = _shared_re_js__WEBPACK_IMPORTED_MODULE_4__[\"selfClosing\"];\nconst SC_PLACE = ($0, $1, $2) => {\n  return _shared_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"VOID_ELEMENTS\"].test($1) ? $0 : ('<' + $1 + $2 + '></' + $1 + '>');\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (render);\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/hyper/render.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/hyper/wire.js":
/*!**************************************************!*\
  !*** ./node_modules/hyperhtml/esm/hyper/wire.js ***!
  \**************************************************/
/*! exports provided: content, weakly, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"content\", function() { return content; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"weakly\", function() { return weakly; });\n/* harmony import */ var _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants.js */ \"./node_modules/hyperhtml/esm/shared/constants.js\");\n/* harmony import */ var _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/poorlyfills.js */ \"./node_modules/hyperhtml/esm/shared/poorlyfills.js\");\n/* harmony import */ var _shared_easy_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/easy-dom.js */ \"./node_modules/hyperhtml/esm/shared/easy-dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/utils.js */ \"./node_modules/hyperhtml/esm/shared/utils.js\");\n/* harmony import */ var _classes_Wire_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../classes/Wire.js */ \"./node_modules/hyperhtml/esm/classes/Wire.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render.js */ \"./node_modules/hyperhtml/esm/hyper/render.js\");\n\n\n\n\n\n\n\n// all wires used per each context\nconst wires = new _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_1__[\"WeakMap\"];\n\n// A wire is a callback used as tag function\n// to lazily relate a generic object to a template literal.\n// hyper.wire(user)`<div id=user>${user.name}</div>`; => the div#user\n// This provides the ability to have a unique DOM structure\n// related to a unique JS object through a reusable template literal.\n// A wire can specify a type, as svg or html, and also an id\n// via html:id or :id convention. Such :id allows same JS objects\n// to be associated to different DOM structures accordingly with\n// the used template literal without losing previously rendered parts.\nconst wire = (obj, type) => obj == null ?\n  content(type || 'html') :\n  weakly(obj, type || 'html');\n\n// A wire content is a virtual reference to one or more nodes.\n// It's represented by either a DOM node, or an Array.\n// In both cases, the wire content role is to simply update\n// all nodes through the list of related callbacks.\n// In few words, a wire content is like an invisible parent node\n// in charge of updating its content like a bound element would do.\nconst content = type => {\n  let wire, container, content, template, updates;\n  return function (statics) {\n    statics = Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"unique\"])(statics);\n    let setup = template !== statics;\n    if (setup) {\n      template = statics;\n      content = Object(_shared_easy_dom_js__WEBPACK_IMPORTED_MODULE_2__[\"fragment\"])(document);\n      container = type === 'svg' ?\n        document.createElementNS(_shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"SVG_NAMESPACE\"], 'svg') :\n        content;\n      updates = _render_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].bind(container);\n    }\n    updates.apply(null, arguments);\n    if (setup) {\n      if (type === 'svg') {\n        Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"append\"])(content, _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"slice\"].call(container.childNodes));\n      }\n      wire = wireContent(content);\n    }\n    return wire;\n  };\n};\n\n// wires are weakly created through objects.\n// Each object can have multiple wires associated\n// and this is thanks to the type + :id feature.\nconst weakly = (obj, type) => {\n  const i = type.indexOf(':');\n  let wire = wires.get(obj);\n  let id = type;\n  if (-1 < i) {\n    id = type.slice(i + 1);\n    type = type.slice(0, i) || 'html';\n  }\n  if (!wire) wires.set(obj, wire = {});\n  return wire[id] || (wire[id] = content(type));\n};\n\n// a document fragment loses its nodes as soon\n// as it's appended into another node.\n// This would easily lose wired content\n// so that on a second render call, the parent\n// node wouldn't know which node was there\n// associated to the interpolation.\n// To prevent hyperHTML to forget about wired nodes,\n// these are either returned as Array or, if there's ony one entry,\n// as single referenced node that won't disappear from the fragment.\n// The initial fragment, at this point, would be used as unique reference.\nconst wireContent = node => {\n  const childNodes = node.childNodes;\n  const length = childNodes.length;\n  const wireNodes = [];\n  for (let i = 0; i < length; i++) {\n    let child = childNodes[i];\n    if (\n      child.nodeType === _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_NODE\"] ||\n      _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_1__[\"trim\"].call(child.textContent).length !== 0\n    ) {\n      wireNodes.push(child);\n    }\n  }\n  return wireNodes.length === 1 ? wireNodes[0] : new _classes_Wire_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](wireNodes);\n};\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (wire);\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/hyper/wire.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/hyperhtml/esm/index.js ***!
  \*********************************************/
/*! exports provided: Component, bind, define, diff, hyper, wire, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bind\", function() { return bind; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return define; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hyper\", function() { return hyper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return hyper; });\n/* harmony import */ var _classes_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Component.js */ \"./node_modules/hyperhtml/esm/classes/Component.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _classes_Component_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _objects_Intent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/Intent.js */ \"./node_modules/hyperhtml/esm/objects/Intent.js\");\n/* harmony import */ var _hyper_wire_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hyper/wire.js */ \"./node_modules/hyperhtml/esm/hyper/wire.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"wire\", function() { return _hyper_wire_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _hyper_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hyper/render.js */ \"./node_modules/hyperhtml/esm/hyper/render.js\");\n/* harmony import */ var _shared_domdiff_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/domdiff.js */ \"./node_modules/hyperhtml/esm/shared/domdiff.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"diff\", function() { return _shared_domdiff_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/*! (c) Andrea Giammarchi (ISC) */\n\n\n\n\n\n\n\n// all functions are self bound to the right context\n// you can do the following\n// const {bind, wire} = hyperHTML;\n// and use them right away: bind(node)`hello!`;\nconst bind = context => _hyper_render_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].bind(context);\nconst define = _objects_Intent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].define;\n\nhyper.Component = _classes_Component_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\nhyper.bind = bind;\nhyper.define = define;\nhyper.diff = _shared_domdiff_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\nhyper.hyper = hyper;\nhyper.wire = _hyper_wire_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n\n// the wire content is the lazy defined\n// html or svg property of each hyper.Component\nObject(_classes_Component_js__WEBPACK_IMPORTED_MODULE_0__[\"setup\"])(_hyper_wire_js__WEBPACK_IMPORTED_MODULE_2__[\"content\"]);\n\n// everything is exported directly or through the\n// hyperHTML callback, when used as top level script\n\n\n// by default, hyperHTML is a smart function\n// that \"magically\" understands what's the best\n// thing to do with passed arguments\nfunction hyper(HTML) {\n  return arguments.length < 2 ?\n    (HTML == null ?\n      Object(_hyper_wire_js__WEBPACK_IMPORTED_MODULE_2__[\"content\"])('html') :\n      (typeof HTML === 'string' ?\n        hyper.wire(null, HTML) :\n        ('raw' in HTML ?\n          Object(_hyper_wire_js__WEBPACK_IMPORTED_MODULE_2__[\"content\"])('html')(HTML) :\n          ('nodeType' in HTML ?\n            hyper.bind(HTML) :\n            Object(_hyper_wire_js__WEBPACK_IMPORTED_MODULE_2__[\"weakly\"])(HTML, 'html')\n          )\n        )\n      )) :\n    ('raw' in HTML ?\n      Object(_hyper_wire_js__WEBPACK_IMPORTED_MODULE_2__[\"content\"])('html') : hyper.wire\n    ).apply(null, arguments);\n}\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/index.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/objects/Intent.js":
/*!******************************************************!*\
  !*** ./node_modules/hyperhtml/esm/objects/Intent.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst intents = {};\nconst keys = [];\nconst hasOwnProperty = intents.hasOwnProperty;\n\nlet length = 0;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n\n  // hyperHTML.define('intent', (object, update) => {...})\n  // can be used to define a third parts update mechanism\n  // when every other known mechanism failed.\n  // hyper.define('user', info => info.name);\n  // hyper(node)`<p>${{user}}</p>`;\n  define: (intent, callback) => {\n    if (!(intent in intents)) {\n      length = keys.push(intent);\n    }\n    intents[intent] = callback;\n  },\n\n  // this method is used internally as last resort\n  // to retrieve a value out of an object\n  invoke: (object, callback) => {\n    for (let i = 0; i < length; i++) {\n      let key = keys[i];\n      if (hasOwnProperty.call(object, key)) {\n        return intents[key](object[key], callback);\n      }\n    }\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/objects/Intent.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/objects/Path.js":
/*!****************************************************!*\
  !*** ./node_modules/hyperhtml/esm/objects/Path.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants.js */ \"./node_modules/hyperhtml/esm/shared/constants.js\");\n\n\n// every template literal interpolation indicates\n// a precise target in the DOM the template is representing.\n// `<p id=${'attribute'}>some ${'content'}</p>`\n// hyperHTML finds only once per template literal,\n// hence once per entire application life-cycle,\n// all nodes that are related to interpolations.\n// These nodes are stored as indexes used to retrieve,\n// once per upgrade, nodes that will change on each future update.\n// A path example is [2, 0, 1] representing the operation:\n// node.childNodes[2].childNodes[0].childNodes[1]\n// Attributes are addressed via their owner node and their name.\nconst createPath = node => {\n  const path = [];\n  let parentNode;\n  switch (node.nodeType) {\n    case _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_NODE\"]:\n    case _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"DOCUMENT_FRAGMENT_NODE\"]:\n      parentNode = node;\n      break;\n    case _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"COMMENT_NODE\"]:\n      parentNode = node.parentNode;\n      prepend(path, parentNode, node);\n      break;\n    default:\n      parentNode = node.ownerElement;\n      break;\n  }\n  for (\n    node = parentNode;\n    (parentNode = parentNode.parentNode);\n    node = parentNode\n  ) {\n    prepend(path, parentNode, node);\n  }\n  return path;\n};\n\nconst prepend = (path, parent, node) => {\n  path.unshift(path.indexOf.call(parent.childNodes, node));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  create: (type, node, name) => ({type, name, node, path: createPath(node)}),\n  find: (node, path) => {\n    const length = path.length;\n    for (let i = 0; i < length; i++) {\n      node = node.childNodes[path[i]];\n    }\n    return node;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/objects/Path.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/objects/Style.js":
/*!*****************************************************!*\
  !*** ./node_modules/hyperhtml/esm/objects/Style.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// from https://github.com/developit/preact/blob/33fc697ac11762a1cb6e71e9847670d047af7ce5/src/constants.js\nconst IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;\n\n// style is handled as both string and object\n// even if the target is an SVG element (consistency)\n/* harmony default export */ __webpack_exports__[\"default\"] = ((node, original, isSVG) => {\n  if (isSVG) {\n    const style = original.cloneNode(true);\n    style.value = '';\n    node.setAttributeNode(style);\n    return update(style, isSVG);\n  }\n  return update(node.style, isSVG);\n});\n\n// the update takes care or changing/replacing\n// only properties that are different or\n// in case of string, the whole node\nconst update = (style, isSVG) => {\n  let oldType, oldValue;\n  return newValue => {\n    switch (typeof newValue) {\n      case 'object':\n        if (newValue) {\n          if (oldType === 'object') {\n            if (!isSVG) {\n              if (oldValue !== newValue) {\n                for (const key in oldValue) {\n                  if (!(key in newValue)) {\n                    style[key] = '';\n                  }\n                }\n              }\n            }\n          } else {\n            if (isSVG) style.value = '';\n            else style.cssText = '';\n          }\n          const info = isSVG ? {} : style;\n          for (const key in newValue) {\n            const value = newValue[key];\n            info[key] = typeof value === 'number' &&\n                        !IS_NON_DIMENSIONAL.test(key) ?\n                          (value + 'px') : value;\n          }\n          oldType = 'object';\n          if (isSVG) style.value = toStyle((oldValue = info));\n          else oldValue = newValue;\n          break;\n        }\n      default:\n        if (oldValue != newValue) {\n          oldType = 'string';\n          oldValue = newValue;\n          if (isSVG) style.value = newValue || '';\n          else style.cssText = newValue || '';\n        }\n        break;\n    }\n  };\n};\n\nconst hyphen = /([^A-Z])([A-Z]+)/g;\nconst ized = ($0, $1, $2) => $1 + '-' + $2.toLowerCase();\nconst toStyle = object => {\n  const css = [];\n  for (const key in object) {\n    css.push(key.replace(hyphen, ized), ':', object[key], ';');\n  }\n  return css.join('');\n};\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/objects/Style.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/objects/Updates.js":
/*!*******************************************************!*\
  !*** ./node_modules/hyperhtml/esm/objects/Updates.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants.js */ \"./node_modules/hyperhtml/esm/shared/constants.js\");\n/* harmony import */ var _classes_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/Component.js */ \"./node_modules/hyperhtml/esm/classes/Component.js\");\n/* harmony import */ var _classes_Wire_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/Wire.js */ \"./node_modules/hyperhtml/esm/classes/Wire.js\");\n/* harmony import */ var _Path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Path.js */ \"./node_modules/hyperhtml/esm/objects/Path.js\");\n/* harmony import */ var _Style_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Style.js */ \"./node_modules/hyperhtml/esm/objects/Style.js\");\n/* harmony import */ var _Intent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Intent.js */ \"./node_modules/hyperhtml/esm/objects/Intent.js\");\n/* harmony import */ var _shared_domdiff_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/domdiff.js */ \"./node_modules/hyperhtml/esm/shared/domdiff.js\");\n/* harmony import */ var _shared_easy_dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/easy-dom.js */ \"./node_modules/hyperhtml/esm/shared/easy-dom.js\");\n/* harmony import */ var _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/poorlyfills.js */ \"./node_modules/hyperhtml/esm/shared/poorlyfills.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/utils.js */ \"./node_modules/hyperhtml/esm/shared/utils.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n// hyper.Component have a connected/disconnected\n// mechanism provided by MutationObserver\n// This weak set is used to recognize components\n// as DOM node that needs to trigger connected/disconnected events\nconst components = new _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_8__[\"WeakSet\"];\n\n// a basic dictionary used to filter already cached attributes\n// while looking for special hyperHTML values.\nfunction Cache() {}\nCache.prototype = Object.create(null);\n\n// returns an intent to explicitly inject content as html\nconst asHTML = html => ({html});\n\n// returns nodes from wires and components\nconst asNode = (item, i) => {\n  return 'ELEMENT_NODE' in item ?\n    item :\n    (item.constructor === _classes_Wire_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"] ?\n      // in the Wire case, the content can be\n      // removed, post-pended, inserted, or pre-pended and\n      // all these cases are handled by domdiff already\n      /* istanbul ignore next */\n      ((1 / i) < 0 ?\n        (i ? item.remove() : item.last) :\n        (i ? item.insert() : item.first)) :\n      asNode(item.render(), i));\n}\n\n// returns true if domdiff can handle the value\nconst canDiff = value =>  'ELEMENT_NODE' in value ||\nvalue instanceof _classes_Wire_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"] ||\nvalue instanceof _classes_Component_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n// updates are created once per context upgrade\n// within the main render function (../hyper/render.js)\n// These are an Array of callbacks to invoke passing\n// each interpolation value.\n// Updates can be related to any kind of content,\n// attributes, or special text-only cases such <style>\n// elements or <textarea>\nconst create = (root, paths) => {\n  const updates = [];\n  const length = paths.length;\n  for (let i = 0; i < length; i++) {\n    const info = paths[i];\n    const node = _Path_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].find(root, info.path);\n    switch (info.type) {\n      case 'any':\n        updates.push(setAnyContent(node, []));\n        break;\n      case 'attr':\n        updates.push(setAttribute(node, info.name, info.node));\n        break;\n      case 'text':\n        updates.push(setTextContent(node));\n        break;\n    }\n  }\n  return updates;\n};\n\n// finding all paths is a one-off operation performed\n// when a new template literal is used.\n// The goal is to map all target nodes that will be\n// used to update content/attributes every time\n// the same template literal is used to create content.\n// The result is a list of paths related to the template\n// with all the necessary info to create updates as\n// list of callbacks that target directly affected nodes.\nconst find = (node, paths, parts) => {\n  const childNodes = node.childNodes;\n  const length = childNodes.length;\n  for (let i = 0; i < length; i++) {\n    let child = childNodes[i];\n    switch (child.nodeType) {\n      case _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_NODE\"]:\n        findAttributes(child, paths, parts);\n        find(child, paths, parts);\n        break;\n      case _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"COMMENT_NODE\"]:\n        if (child.textContent === _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"UID\"]) {\n          parts.shift();\n          paths.push(\n            // basicHTML or other non standard engines\n            // might end up having comments in nodes\n            // where they shouldn't, hence this check.\n            _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"SHOULD_USE_TEXT_CONTENT\"].test(node.nodeName) ?\n              _Path_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].create('text', node) :\n              _Path_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].create('any', child)\n          );\n        }\n        break;\n      case _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"TEXT_NODE\"]:\n        // the following ignore is actually covered by browsers\n        // only basicHTML ends up on previous COMMENT_NODE case\n        // instead of TEXT_NODE because it knows nothing about\n        // special style or textarea behavior\n        /* istanbul ignore if */\n        if (\n          _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"SHOULD_USE_TEXT_CONTENT\"].test(node.nodeName) &&\n          _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_8__[\"trim\"].call(child.textContent) === _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"UIDC\"]\n        ) {\n          parts.shift();\n          paths.push(_Path_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].create('text', node));\n        }\n        break;\n    }\n  }\n};\n\n// attributes are searched via unique hyperHTML id value.\n// Despite HTML being case insensitive, hyperHTML is able\n// to recognize attributes by name in a caseSensitive way.\n// This plays well with Custom Elements definitions\n// and also with XML-like environments, without trusting\n// the resulting DOM but the template literal as the source of truth.\n// IE/Edge has a funny bug with attributes and these might be duplicated.\n// This is why there is a cache in charge of being sure no duplicated\n// attributes are ever considered in future updates.\nconst findAttributes = (node, paths, parts) => {\n  const cache = new Cache;\n  const attributes = node.attributes;\n  const array = _shared_utils_js__WEBPACK_IMPORTED_MODULE_9__[\"slice\"].call(attributes);\n  const remove = [];\n  const length = array.length;\n  for (let i = 0; i < length; i++) {\n    const attribute = array[i];\n    if (attribute.value === _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"UID\"]) {\n      const name = attribute.name;\n      // the following ignore is covered by IE\n      // and the IE9 double viewBox test\n      /* istanbul ignore else */\n      if (!(name in cache)) {\n        const realName = parts.shift().replace(/^(?:|[\\S\\s]*?\\s)(\\S+?)=['\"]?$/, '$1');\n        cache[name] = attributes[realName] ||\n                      // the following ignore is covered by browsers\n                      // while basicHTML is already case-sensitive\n                      /* istanbul ignore next */\n                      attributes[realName.toLowerCase()];\n        paths.push(_Path_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].create('attr', cache[name], realName));\n      }\n      remove.push(attribute);\n    }\n  }\n  const len = remove.length;\n  for (let i = 0; i < len; i++) {\n    node.removeAttributeNode(remove[i]);\n  }\n\n  // This is a very specific Firefox/Safari issue\n  // but since it should be a not so common pattern,\n  // it's probably worth patching regardless.\n  // Basically, scripts created through strings are death.\n  // You need to create fresh new scripts instead.\n  // TODO: is there any other node that needs such nonsense ?\n  const nodeName = node.nodeName;\n  if (/^script$/i.test(nodeName)) {\n    const script = Object(_shared_easy_dom_js__WEBPACK_IMPORTED_MODULE_7__[\"create\"])(node, nodeName);\n    for (let i = 0; i < attributes.length; i++) {\n      script.setAttributeNode(attributes[i].cloneNode(true));\n    }\n    script.textContent = node.textContent;\n    node.parentNode.replaceChild(script, node);\n  }\n};\n\n// when a Promise is used as interpolation value\n// its result must be parsed once resolved.\n// This callback is in charge of understanding what to do\n// with a returned value once the promise is resolved.\nconst invokeAtDistance = (value, callback) => {\n  callback(value.placeholder);\n  if ('text' in value) {\n    Promise.resolve(value.text).then(String).then(callback);\n  } else if ('any' in value) {\n    Promise.resolve(value.any).then(callback);\n  } else if ('html' in value) {\n    Promise.resolve(value.html).then(asHTML).then(callback);\n  } else {\n    Promise.resolve(_Intent_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].invoke(value, callback)).then(callback);\n  }\n};\n\n// quick and dirty way to check for Promise/ish values\nconst isPromise_ish = value => value != null && 'then' in value;\n\n// in a hyper(node)`<div>${content}</div>` case\n// everything could happen:\n//  * it's a JS primitive, stored as text\n//  * it's null or undefined, the node should be cleaned\n//  * it's a component, update the content by rendering it\n//  * it's a promise, update the content once resolved\n//  * it's an explicit intent, perform the desired operation\n//  * it's an Array, resolve all values if Promises and/or\n//    update the node with the resulting list of content\nconst setAnyContent = (node, childNodes) => {\n  let fastPath = false;\n  let oldValue;\n  const anyContent = value => {\n    switch (typeof value) {\n      case 'string':\n      case 'number':\n      case 'boolean':\n        if (fastPath) {\n          if (oldValue !== value) {\n            oldValue = value;\n            childNodes[0].textContent = value;\n          }\n        } else {\n          fastPath = true;\n          oldValue = value;\n          childNodes = Object(_shared_domdiff_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\n            node.parentNode,\n            childNodes,\n            [Object(_shared_easy_dom_js__WEBPACK_IMPORTED_MODULE_7__[\"text\"])(node, value)],\n            asNode,\n            node\n          );\n        }\n        break;\n      case 'object':\n      case 'undefined':\n        if (value == null) {\n          fastPath = false;\n          childNodes = Object(_shared_domdiff_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\n            node.parentNode,\n            childNodes,\n            [],\n            asNode,\n            node\n          );\n          break;\n        }\n      default:\n        fastPath = false;\n        oldValue = value;\n        if (Object(_shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_8__[\"isArray\"])(value)) {\n          if (value.length === 0) {\n            if (childNodes.length) {\n              childNodes = Object(_shared_domdiff_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\n                node.parentNode,\n                childNodes,\n                [],\n                asNode,\n                node\n              );\n            }\n          } else {\n            switch (typeof value[0]) {\n              case 'string':\n              case 'number':\n              case 'boolean':\n                anyContent({html: value});\n                break;\n              case 'object':\n                if (Object(_shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_8__[\"isArray\"])(value[0])) {\n                  value = value.concat.apply([], value);\n                }\n                if (isPromise_ish(value[0])) {\n                  Promise.all(value).then(anyContent);\n                  break;\n                }\n              default:\n                childNodes = Object(_shared_domdiff_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\n                  node.parentNode,\n                  childNodes,\n                  value,\n                  asNode,\n                  node\n                );\n                break;\n            }\n          }\n        } else if (canDiff(value)) {\n          childNodes = Object(_shared_domdiff_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\n            node.parentNode,\n            childNodes,\n            value.nodeType === _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"DOCUMENT_FRAGMENT_NODE\"] ?\n              _shared_utils_js__WEBPACK_IMPORTED_MODULE_9__[\"slice\"].call(value.childNodes) :\n              [value],\n            asNode,\n            node\n          );\n        } else if (isPromise_ish(value)) {\n          value.then(anyContent);\n        } else if ('placeholder' in value) {\n          invokeAtDistance(value, anyContent);\n        } else if ('text' in value) {\n          anyContent(String(value.text));\n        } else if ('any' in value) {\n          anyContent(value.any);\n        } else if ('html' in value) {\n          childNodes = Object(_shared_domdiff_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\n            node.parentNode,\n            childNodes,\n            _shared_utils_js__WEBPACK_IMPORTED_MODULE_9__[\"slice\"].call(\n              Object(_shared_utils_js__WEBPACK_IMPORTED_MODULE_9__[\"createFragment\"])(\n                node,\n                [].concat(value.html).join('')\n              ).childNodes\n            ),\n            asNode,\n            node\n          );\n        } else if ('length' in value) {\n          anyContent(_shared_utils_js__WEBPACK_IMPORTED_MODULE_9__[\"slice\"].call(value));\n        } else {\n          anyContent(_Intent_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].invoke(value, anyContent));\n        }\n        break;\n    }\n  };\n  return anyContent;\n};\n\n// there are four kind of attributes, and related behavior:\n//  * events, with a name starting with `on`, to add/remove event listeners\n//  * special, with a name present in their inherited prototype, accessed directly\n//  * regular, accessed through get/setAttribute standard DOM methods\n//  * style, the only regular attribute that also accepts an object as value\n//    so that you can style=${{width: 120}}. In this case, the behavior has been\n//    fully inspired by Preact library and its simplicity.\nconst setAttribute = (node, name, original) => {\n  const isSVG = _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"OWNER_SVG_ELEMENT\"] in node;\n  let oldValue;\n  // if the attribute is the style one\n  // handle it differently from others\n  if (name === 'style') {\n    return Object(_Style_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(node, original, isSVG);\n  }\n  // the name is an event one,\n  // add/remove event listeners accordingly\n  else if (/^on/.test(name)) {\n    let type = name.slice(2);\n    if (type === _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"CONNECTED\"] || type === _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"DISCONNECTED\"]) {\n      if (notObserving) {\n        notObserving = false;\n        observe();\n      }\n      components.add(node);\n    }\n    else if (name.toLowerCase() in node) {\n      type = type.toLowerCase();\n    }\n    return newValue => {\n      if (oldValue !== newValue) {\n        if (oldValue) node.removeEventListener(type, oldValue, false);\n        oldValue = newValue;\n        if (newValue) node.addEventListener(type, newValue, false);\n      }\n    };\n  }\n  // the attribute is special ('value' in input)\n  // and it's not SVG *or* the name is exactly data,\n  // in this case assign the value directly\n  else if (name === 'data' || (!isSVG && name in node)) {\n    return newValue => {\n      if (oldValue !== newValue) {\n        oldValue = newValue;\n        if (node[name] !== newValue) {\n          node[name] = newValue;\n          if (newValue == null) {\n            node.removeAttribute(name);\n          }\n        }\n      }\n    };\n  }\n  // in every other case, use the attribute node as it is\n  // update only the value, set it as node only when/if needed\n  else {\n    let owner = false;\n    const attribute = original.cloneNode(true);\n    return newValue => {\n      if (oldValue !== newValue) {\n        oldValue = newValue;\n        if (attribute.value !== newValue) {\n          if (newValue == null) {\n            if (owner) {\n              owner = false;\n              node.removeAttributeNode(attribute);\n            }\n            attribute.value = newValue;\n          } else {\n            attribute.value = newValue;\n            if (!owner) {\n              owner = true;\n              node.setAttributeNode(attribute);\n            }\n          }\n        }\n      }\n    };\n  }\n};\n\n// style or textareas don't accept HTML as content\n// it's pointless to transform or analyze anything\n// different from text there but it's worth checking\n// for possible defined intents.\nconst setTextContent = node => {\n  // avoid hyper comments inside textarea/style when value is undefined\n  let oldValue = '';\n  const textContent = value => {\n    if (oldValue !== value) {\n      oldValue = value;\n      if (typeof value === 'object' && value) {\n        if (isPromise_ish(value)) {\n          value.then(textContent);\n        } else if ('placeholder' in value) {\n          invokeAtDistance(value, textContent);\n        } else if ('text' in value) {\n          textContent(String(value.text));\n        } else if ('any' in value) {\n          textContent(value.any);\n        } else if ('html' in value) {\n          textContent([].concat(value.html).join(''));\n        } else if ('length' in value) {\n          textContent(_shared_utils_js__WEBPACK_IMPORTED_MODULE_9__[\"slice\"].call(value).join(''));\n        } else {\n          textContent(_Intent_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].invoke(value, textContent));\n        }\n      } else {\n        node.textContent = value == null ? '' : value;\n      }\n    }\n  };\n  return textContent;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({create, find});\n\n// hyper.Components might need connected/disconnected notifications\n// used by components and their onconnect/ondisconnect callbacks.\n// When one of these callbacks is encountered,\n// the document starts being observed.\nlet notObserving = true;\nfunction observe() {\n\n  // when hyper.Component related DOM nodes\n  // are appended or removed from the live tree\n  // these might listen to connected/disconnected events\n  // This utility is in charge of finding all components\n  // involved in the DOM update/change and dispatch\n  // related information to them\n  const dispatchAll = (nodes, type) => {\n    const event = new _shared_poorlyfills_js__WEBPACK_IMPORTED_MODULE_8__[\"Event\"](type);\n    const length = nodes.length;\n    for (let i = 0; i < length; i++) {\n      let node = nodes[i];\n      if (node.nodeType === _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"ELEMENT_NODE\"]) {\n        dispatchTarget(node, event);\n      }\n    }\n  };\n\n  // the way it's done is via the components weak set\n  // and recursively looking for nested components too\n  const dispatchTarget = (node, event) => {\n    if (components.has(node)) {\n      node.dispatchEvent(event);\n    }\n\n    const children = node.children;\n    const length = children.length;\n    for (let i = 0; i < length; i++) {\n      dispatchTarget(children[i], event);\n    }\n  }\n\n  // The MutationObserver is the best way to implement that\n  // but there is a fallback to deprecated DOMNodeInserted/Removed\n  // so that even older browsers/engines can help components life-cycle\n  try {\n    (new MutationObserver(records => {\n      const length = records.length;\n      for (let i = 0; i < length; i++) {\n        let record = records[i];\n        dispatchAll(record.removedNodes, _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"DISCONNECTED\"]);\n        dispatchAll(record.addedNodes, _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"CONNECTED\"]);\n      }\n    })).observe(document, {subtree: true, childList: true});\n  } catch(o_O) {\n    document.addEventListener('DOMNodeRemoved', event => {\n      dispatchAll([event.target], _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"DISCONNECTED\"]);\n    }, false);\n    document.addEventListener('DOMNodeInserted', event => {\n      dispatchAll([event.target], _shared_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"CONNECTED\"]);\n    }, false);\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/objects/Updates.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/shared/constants.js":
/*!********************************************************!*\
  !*** ./node_modules/hyperhtml/esm/shared/constants.js ***!
  \********************************************************/
/*! exports provided: G, ELEMENT_NODE, ATTRIBUTE_NODE, TEXT_NODE, COMMENT_NODE, DOCUMENT_FRAGMENT_NODE, VOID_ELEMENTS, OWNER_SVG_ELEMENT, SVG_NAMESPACE, CONNECTED, DISCONNECTED, EXPANDO, SHOULD_USE_TEXT_CONTENT, UID, UIDC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"G\", function() { return G; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ELEMENT_NODE\", function() { return ELEMENT_NODE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ATTRIBUTE_NODE\", function() { return ATTRIBUTE_NODE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TEXT_NODE\", function() { return TEXT_NODE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"COMMENT_NODE\", function() { return COMMENT_NODE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOCUMENT_FRAGMENT_NODE\", function() { return DOCUMENT_FRAGMENT_NODE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VOID_ELEMENTS\", function() { return VOID_ELEMENTS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OWNER_SVG_ELEMENT\", function() { return OWNER_SVG_ELEMENT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SVG_NAMESPACE\", function() { return SVG_NAMESPACE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONNECTED\", function() { return CONNECTED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISCONNECTED\", function() { return DISCONNECTED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EXPANDO\", function() { return EXPANDO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHOULD_USE_TEXT_CONTENT\", function() { return SHOULD_USE_TEXT_CONTENT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UID\", function() { return UID; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UIDC\", function() { return UIDC; });\nconst G = document.defaultView;\n\n// Node.CONSTANTS\n// 'cause some engine has no global Node defined\n// (i.e. Node, NativeScript, basicHTML ... )\nconst ELEMENT_NODE = 1;\nconst ATTRIBUTE_NODE = 2;\nconst TEXT_NODE = 3;\nconst COMMENT_NODE = 8;\nconst DOCUMENT_FRAGMENT_NODE = 11;\n\n// HTML related constants\nconst VOID_ELEMENTS = /^area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr$/i;\n\n// SVG related constants\nconst OWNER_SVG_ELEMENT = 'ownerSVGElement';\nconst SVG_NAMESPACE = 'http://www.w3.org/2000/svg';\n\n// Custom Elements / MutationObserver constants\nconst CONNECTED = 'connected';\nconst DISCONNECTED = 'dis' + CONNECTED;\n\n// hyperHTML related constants\nconst EXPANDO = '_hyper: ';\nconst SHOULD_USE_TEXT_CONTENT = /^style|textarea$/i;\nconst UID = EXPANDO + ((Math.random() * new Date) | 0) + ';';\nconst UIDC = '<!--' + UID + '-->';\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/shared/constants.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/shared/domdiff.js":
/*!******************************************************!*\
  !*** ./node_modules/hyperhtml/esm/shared/domdiff.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* AUTOMATICALLY IMPORTED, DO NOT MODIFY */\n/*! (c) 2017 Andrea Giammarchi (ISC) */\n\n/**\n * This code is a revisited port of the snabbdom vDOM diffing logic,\n * the same that fuels as fork Vue.js or other libraries.\n * @credits https://github.com/snabbdom/snabbdom\n */\n\nconst identity = O => O;\n\nconst domdiff = (\n  parentNode,     // where changes happen\n  currentNodes,   // Array of current items/nodes\n  futureNodes,    // Array of future items/nodes\n  getNode,        // optional way to retrieve a node from an item\n  beforeNode      // optional item/node to use as insertBefore delimiter\n) => {\n  const get = getNode || identity;\n  const before = beforeNode == null ? null : get(beforeNode, 0);\n  let currentStart = 0, futureStart = 0;\n  let currentEnd = currentNodes.length - 1;\n  let currentStartNode = currentNodes[0];\n  let currentEndNode = currentNodes[currentEnd];\n  let futureEnd = futureNodes.length - 1;\n  let futureStartNode = futureNodes[0];\n  let futureEndNode = futureNodes[futureEnd];\n  while (currentStart <= currentEnd && futureStart <= futureEnd) {\n    if (currentStartNode == null) {\n      currentStartNode = currentNodes[++currentStart];\n    }\n    else if (currentEndNode == null) {\n      currentEndNode = currentNodes[--currentEnd];\n    }\n    else if (futureStartNode == null) {\n      futureStartNode = futureNodes[++futureStart];\n    }\n    else if (futureEndNode == null) {\n      futureEndNode = futureNodes[--futureEnd];\n    }\n    else if (currentStartNode == futureStartNode) {\n      currentStartNode = currentNodes[++currentStart];\n      futureStartNode = futureNodes[++futureStart];\n    }\n    else if (currentEndNode == futureEndNode) {\n      currentEndNode = currentNodes[--currentEnd];\n      futureEndNode = futureNodes[--futureEnd];\n    }\n    else if (currentStartNode == futureEndNode) {\n      parentNode.insertBefore(\n        get(currentStartNode, 1),\n        get(currentEndNode, -0).nextSibling\n      );\n      currentStartNode = currentNodes[++currentStart];\n      futureEndNode = futureNodes[--futureEnd];\n    }\n    else if (currentEndNode == futureStartNode) {\n      parentNode.insertBefore(\n        get(currentEndNode, 1),\n        get(currentStartNode, 0)\n      );\n      currentEndNode = currentNodes[--currentEnd];\n      futureStartNode = futureNodes[++futureStart];\n    }\n    else {\n      let index = currentNodes.indexOf(futureStartNode);\n      if (index < 0) {\n        parentNode.insertBefore(\n          get(futureStartNode, 1),\n          get(currentStartNode, 0)\n        );\n        futureStartNode = futureNodes[++futureStart];\n      }\n      else {\n        let el = currentNodes[index];\n        currentNodes[index] = null;\n        parentNode.insertBefore(\n          get(el, 1),\n          get(currentStartNode, 0)\n        );\n        futureStartNode = futureNodes[++futureStart];\n      }\n    }\n  }\n  if (currentStart <= currentEnd || futureStart <= futureEnd) {\n    if (currentStart > currentEnd) {\n      const pin = futureNodes[futureEnd + 1];\n      const place = pin == null ? before : get(pin, 0);\n      if (futureStart === futureEnd) {\n        parentNode.insertBefore(get(futureNodes[futureStart], 1), place);\n      }\n      else {\n        const fragment = parentNode.ownerDocument.createDocumentFragment();\n        while (futureStart <= futureEnd) {\n          fragment.appendChild(get(futureNodes[futureStart++], 1));\n        }\n        parentNode.insertBefore(fragment, place);\n      }\n    }\n    else {\n      if (currentNodes[currentStart] == null) currentStart++;\n      if (currentStart === currentEnd) {\n        parentNode.removeChild(get(currentNodes[currentStart], -1));\n      }\n      else {\n        const range = parentNode.ownerDocument.createRange();\n        range.setStartBefore(get(currentNodes[currentStart], -1));\n        range.setEndAfter(get(currentNodes[currentEnd], -1));\n        range.deleteContents();\n      }\n    }\n  }\n  return futureNodes;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (domdiff);\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/shared/domdiff.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/shared/easy-dom.js":
/*!*******************************************************!*\
  !*** ./node_modules/hyperhtml/esm/shared/easy-dom.js ***!
  \*******************************************************/
/*! exports provided: create, doc, fragment, text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"doc\", function() { return doc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fragment\", function() { return fragment; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"text\", function() { return text; });\n// these are tiny helpers to simplify most common operations needed here\nconst create = (node, type) => doc(node).createElement(type);\nconst doc = node => node.ownerDocument || node;\nconst fragment = node => doc(node).createDocumentFragment();\nconst text = (node, text) => doc(node).createTextNode(text);\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/shared/easy-dom.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/shared/features-detection.js":
/*!*****************************************************************!*\
  !*** ./node_modules/hyperhtml/esm/shared/features-detection.js ***!
  \*****************************************************************/
/*! exports provided: hasAppend, hasContent, hasDoomedCloneNode, hasImportNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasAppend\", function() { return hasAppend; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasContent\", function() { return hasContent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasDoomedCloneNode\", function() { return hasDoomedCloneNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasImportNode\", function() { return hasImportNode; });\n/* harmony import */ var _easy_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./easy-dom.js */ \"./node_modules/hyperhtml/esm/shared/easy-dom.js\");\n\n\nconst testFragment = Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"fragment\"])(document);\n\n// DOM4 node.append(...many)\nconst hasAppend = 'append' in testFragment;\n\n// detect old browsers without HTMLTemplateElement content support\nconst hasContent = 'content' in Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(document, 'template');\n\n// IE 11 has problems with cloning templates: it \"forgets\" empty childNodes\ntestFragment.appendChild(Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"text\"])(testFragment, 'g'));\ntestFragment.appendChild(Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"text\"])(testFragment, ''));\nconst hasDoomedCloneNode = testFragment.cloneNode(true).childNodes.length === 1;\n\n// old browsers need to fallback to cloneNode\n// Custom Elements V0 and V1 will work polyfilled\n// but native implementations need importNode instead\n// (specially Chromium and its old V0 implementation)\nconst hasImportNode = 'importNode' in document;\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/shared/features-detection.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/shared/poorlyfills.js":
/*!**********************************************************!*\
  !*** ./node_modules/hyperhtml/esm/shared/poorlyfills.js ***!
  \**********************************************************/
/*! exports provided: Event, Map, WeakMap, WeakSet, isArray, trim */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Event\", function() { return Event; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return Map; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WeakMap\", function() { return WeakMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WeakSet\", function() { return WeakSet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isArray\", function() { return isArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"trim\", function() { return trim; });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./node_modules/hyperhtml/esm/shared/constants.js\");\n\n\n// you know that kind of basics you need to cover\n// your use case only but you don't want to bloat the library?\n// There's even a package in here:\n// https://www.npmjs.com/package/poorlyfills\n\n// used to dispatch simple events\nlet Event = _constants_js__WEBPACK_IMPORTED_MODULE_0__[\"G\"].Event;\ntry {\n  new Event('Event');\n} catch(o_O) {\n  Event = function (type) {\n    const e = document.createEvent('Event');\n    e.initEvent(type, false, false);\n    return e;\n  };\n}\n\n\n// used to store template literals\nconst Map = _constants_js__WEBPACK_IMPORTED_MODULE_0__[\"G\"].Map || function Map() {\n  const keys = [], values = [];\n  return {\n    get(obj) {\n      return values[keys.indexOf(obj)];\n    },\n    set(obj, value) {\n      values[keys.push(obj) - 1] = value;\n    }\n  };\n};\n\n// used to store wired content\nconst WeakMap = _constants_js__WEBPACK_IMPORTED_MODULE_0__[\"G\"].WeakMap || function WeakMap() {\n  return {\n    get(obj) { return obj[_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"UID\"]]; },\n    set(obj, value) {\n      Object.defineProperty(obj, _constants_js__WEBPACK_IMPORTED_MODULE_0__[\"UID\"], {\n        configurable: true,\n        value\n      });\n    }\n  };\n};\n\n// used to store hyper.Components\nconst WeakSet = _constants_js__WEBPACK_IMPORTED_MODULE_0__[\"G\"].WeakSet || function WeakSet() {\n  const wm = new WeakMap;\n  return {\n    add(obj) { wm.set(obj, true); },\n    has(obj) { return wm.get(obj) === true; }\n  };\n};\n\n// used to be sure IE9 or older Androids work as expected\nconst isArray = Array.isArray || (toString =>\n  arr => toString.call(arr) === '[object Array]'\n)({}.toString);\n\nconst trim = _constants_js__WEBPACK_IMPORTED_MODULE_0__[\"UID\"].trim || function () {\n  return this.replace(/^\\s+|\\s+$/g, '');\n};\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/shared/poorlyfills.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/shared/re.js":
/*!*************************************************!*\
  !*** ./node_modules/hyperhtml/esm/shared/re.js ***!
  \*************************************************/
/*! exports provided: attrName, attrSeeker, selfClosing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"attrName\", function() { return attrName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"attrSeeker\", function() { return attrSeeker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selfClosing\", function() { return selfClosing; });\n// TODO:  I'd love to code-cover RegExp too here\n//        these are fundamental for this library\n\nconst spaces = ' \\\\f\\\\n\\\\r\\\\t';\nconst almostEverything = '[^ ' + spaces + '\\\\/>\"\\'=]+';\nconst attrName = '[ ' + spaces + ']+' + almostEverything;\nconst tagName = '<([A-Za-z]+[A-Za-z0-9:_-]*)((?:';\nconst attrPartials = '(?:=(?:\\'[^\\']*?\\'|\"[^\"]*?\"|<[^>]*?>|' + almostEverything + '))?)';\n\nconst attrSeeker = new RegExp(\n  tagName + attrName + attrPartials + '+)([ ' + spaces + ']*/?>)',\n  'g'\n);\n\nconst selfClosing = new RegExp(\n  tagName + attrName + attrPartials + '*)([ ' + spaces + ']*/>)',\n  'g'\n);\n\n\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/shared/re.js?");

/***/ }),

/***/ "./node_modules/hyperhtml/esm/shared/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/hyperhtml/esm/shared/utils.js ***!
  \****************************************************/
/*! exports provided: append, createFragment, importNode, slice, unique */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"append\", function() { return append; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createFragment\", function() { return createFragment; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"importNode\", function() { return importNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"slice\", function() { return slice; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unique\", function() { return unique; });\n/* harmony import */ var _re_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./re.js */ \"./node_modules/hyperhtml/esm/shared/re.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ \"./node_modules/hyperhtml/esm/shared/constants.js\");\n/* harmony import */ var _features_detection_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./features-detection.js */ \"./node_modules/hyperhtml/esm/shared/features-detection.js\");\n/* harmony import */ var _easy_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./easy-dom.js */ \"./node_modules/hyperhtml/esm/shared/easy-dom.js\");\n\n\n\n\n\n\n\n\n// appends an array of nodes\n// to a generic node/fragment\n// When available, uses append passing all arguments at once\n// hoping that's somehow faster, even if append has more checks on type\nconst append = _features_detection_js__WEBPACK_IMPORTED_MODULE_2__[\"hasAppend\"] ?\n  (node, childNodes) => {\n    node.append.apply(node, childNodes);\n  } :\n  (node, childNodes) => {\n    const length = childNodes.length;\n    for (let i = 0; i < length; i++) {\n      node.appendChild(childNodes[i]);\n    }\n  };\n\nconst findAttributes = new RegExp('(' + _re_js__WEBPACK_IMPORTED_MODULE_0__[\"attrName\"] + '=)([\\'\"]?)' + _constants_js__WEBPACK_IMPORTED_MODULE_1__[\"UIDC\"] + '\\\\2', 'gi');\nconst comments = ($0, $1, $2, $3) =>\n  '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;\nconst replaceAttributes = ($0, $1, $2) => $1 + ($2 || '\"') + _constants_js__WEBPACK_IMPORTED_MODULE_1__[\"UID\"] + ($2 || '\"');\n\n// given a node and a generic HTML content,\n// create either an SVG or an HTML fragment\n// where such content will be injected\nconst createFragment = (node, html) =>\n  (_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"OWNER_SVG_ELEMENT\"] in node ?\n    SVGFragment :\n    HTMLFragment\n  )(node, html.replace(_re_js__WEBPACK_IMPORTED_MODULE_0__[\"attrSeeker\"], comments));\n\n// IE/Edge shenanigans proof cloneNode\n// it goes through all nodes manually\n// instead of relying the engine to suddenly\n// merge nodes together\nconst cloneNode = _features_detection_js__WEBPACK_IMPORTED_MODULE_2__[\"hasDoomedCloneNode\"] ?\n  node => {\n    const clone = node.cloneNode();\n    const childNodes = node.childNodes ||\n                      // this is an excess of caution\n                      // but some node, in IE, might not\n                      // have childNodes property.\n                      // The following fallback ensure working code\n                      // in older IE without compromising performance\n                      // or any other browser/engine involved.\n                      /* istanbul ignore next */\n                      [];\n    const length = childNodes.length;\n    for (let i = 0; i < length; i++) {\n      clone.appendChild(cloneNode(childNodes[i]));\n    }\n    return clone;\n  } :\n  // the following ignore is due code-coverage\n  // combination of not having document.importNode\n  // but having a working node.cloneNode.\n  // This shenario is common on older Android/WebKit browsers\n  // but basicHTML here tests just two major cases:\n  // with document.importNode or with broken cloneNode.\n  /* istanbul ignore next */\n  node => node.cloneNode(true);\n\n// used to import html into fragments\nconst importNode = _features_detection_js__WEBPACK_IMPORTED_MODULE_2__[\"hasImportNode\"] ?\n  (doc, node) => doc.importNode(node, true) :\n  (doc, node) => cloneNode(node)\n\n// just recycling a one-off array to use slice\n// in every needed place\nconst slice = [].slice;\n\n// lazy evaluated, returns the unique identity\n// of a template literal, as tempalte literal itself.\n// By default, ES2015 template literals are unique\n// tag`a${1}z` === tag`a${2}z`\n// even if interpolated values are different\n// the template chunks are in a frozen Array\n// that is identical each time you use the same\n// literal to represent same static content\n// around its own interpolations.\nconst unique = template => TL(template);\n\n// TL returns a unique version of the template\n// it needs lazy feature detection\n// (cannot trust literals with transpiled code)\nlet TL = template => {\n  if (\n    // TypeScript template literals are not standard\n    template.propertyIsEnumerable('raw') ||\n    (\n      // Firefox < 55 has not standard implementation neither\n      /Firefox\\/(\\d+)/.test((_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"G\"].navigator || {}).userAgent) &&\n      parseFloat(RegExp.$1) < 55\n    )\n  ) {\n    // in these cases, address templates once\n    const templateObjects = {};\n    // but always return the same template\n    TL = template => {\n      const key = '_' + template.join(_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"UID\"]);\n      return templateObjects[key] || (\n        templateObjects[key] = template\n      );\n    };\n  }\n  else {\n    // make TL an identity like function\n    TL = template => template;\n  }\n  return TL(template);\n};\n\n// create document fragments via native template\n// with a fallback for browsers that won't be able\n// to deal with some injected element such <td> or others\nconst HTMLFragment = _features_detection_js__WEBPACK_IMPORTED_MODULE_2__[\"hasContent\"] ?\n  (node, html) => {\n    const container = Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"create\"])(node, 'template');\n    container.innerHTML = html;\n    return container.content;\n  } :\n  (node, html) => {\n    const container = Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"create\"])(node, 'template');\n    const content = Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"fragment\"])(node);\n    if (/^[^\\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {\n      const selector = RegExp.$1;\n      container.innerHTML = '<table>' + html + '</table>';\n      append(content, slice.call(container.querySelectorAll(selector)));\n    } else {\n      container.innerHTML = html;\n      append(content, slice.call(container.childNodes));\n    }\n    return content;\n  };\n\n// creates SVG fragment with a fallback for IE that needs SVG\n// within the HTML content\nconst SVGFragment = _features_detection_js__WEBPACK_IMPORTED_MODULE_2__[\"hasContent\"] ?\n  (node, html) => {\n    const content = Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"fragment\"])(node);\n    const container = Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"doc\"])(node).createElementNS(_constants_js__WEBPACK_IMPORTED_MODULE_1__[\"SVG_NAMESPACE\"], 'svg');\n    container.innerHTML = html;\n    append(content, slice.call(container.childNodes));\n    return content;\n  } :\n  (node, html) => {\n    const content = Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"fragment\"])(node);\n    const container = Object(_easy_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"create\"])(node, 'div');\n    container.innerHTML = '<svg xmlns=\"' + _constants_js__WEBPACK_IMPORTED_MODULE_1__[\"SVG_NAMESPACE\"] + '\">' + html + '</svg>';\n    append(content, slice.call(container.firstChild.childNodes));\n    return content;\n  };\n\n\n//# sourceURL=webpack:///./node_modules/hyperhtml/esm/shared/utils.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.map` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the new mapped array.\n */\nfunction arrayMap(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      result = Array(length);\n\n  while (++index < length) {\n    result[index] = iteratee(array[index], index, array);\n  }\n  return result;\n}\n\nmodule.exports = arrayMap;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayReduce.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayReduce.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.reduce` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {*} [accumulator] The initial value.\n * @param {boolean} [initAccum] Specify using the first element of `array` as\n *  the initial value.\n * @returns {*} Returns the accumulated value.\n */\nfunction arrayReduce(array, iteratee, accumulator, initAccum) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  if (initAccum && length) {\n    accumulator = array[++index];\n  }\n  while (++index < length) {\n    accumulator = iteratee(accumulator, array[index], index, array);\n  }\n  return accumulator;\n}\n\nmodule.exports = arrayReduce;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayReduce.js?");

/***/ }),

/***/ "./node_modules/lodash/_asciiWords.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_asciiWords.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to match words composed of alphanumeric characters. */\nvar reAsciiWord = /[^\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\x7f]+/g;\n\n/**\n * Splits an ASCII `string` into an array of its words.\n *\n * @private\n * @param {string} The string to inspect.\n * @returns {Array} Returns the words of `string`.\n */\nfunction asciiWords(string) {\n  return string.match(reAsciiWord) || [];\n}\n\nmodule.exports = asciiWords;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_asciiWords.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_basePropertyOf.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_basePropertyOf.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.propertyOf` without support for deep paths.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Function} Returns the new accessor function.\n */\nfunction basePropertyOf(object) {\n  return function(key) {\n    return object == null ? undefined : object[key];\n  };\n}\n\nmodule.exports = basePropertyOf;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_basePropertyOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolToString = symbolProto ? symbolProto.toString : undefined;\n\n/**\n * The base implementation of `_.toString` which doesn't convert nullish\n * values to empty strings.\n *\n * @private\n * @param {*} value The value to process.\n * @returns {string} Returns the string.\n */\nfunction baseToString(value) {\n  // Exit early for strings to avoid a performance hit in some environments.\n  if (typeof value == 'string') {\n    return value;\n  }\n  if (isArray(value)) {\n    // Recursively convert values (susceptible to call stack limits).\n    return arrayMap(value, baseToString) + '';\n  }\n  if (isSymbol(value)) {\n    return symbolToString ? symbolToString.call(value) : '';\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = baseToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_createCompounder.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_createCompounder.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayReduce = __webpack_require__(/*! ./_arrayReduce */ \"./node_modules/lodash/_arrayReduce.js\"),\n    deburr = __webpack_require__(/*! ./deburr */ \"./node_modules/lodash/deburr.js\"),\n    words = __webpack_require__(/*! ./words */ \"./node_modules/lodash/words.js\");\n\n/** Used to compose unicode capture groups. */\nvar rsApos = \"['\\u2019]\";\n\n/** Used to match apostrophes. */\nvar reApos = RegExp(rsApos, 'g');\n\n/**\n * Creates a function like `_.camelCase`.\n *\n * @private\n * @param {Function} callback The function to combine each word.\n * @returns {Function} Returns the new compounder function.\n */\nfunction createCompounder(callback) {\n  return function(string) {\n    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');\n  };\n}\n\nmodule.exports = createCompounder;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_createCompounder.js?");

/***/ }),

/***/ "./node_modules/lodash/_deburrLetter.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_deburrLetter.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var basePropertyOf = __webpack_require__(/*! ./_basePropertyOf */ \"./node_modules/lodash/_basePropertyOf.js\");\n\n/** Used to map Latin Unicode letters to basic Latin letters. */\nvar deburredLetters = {\n  // Latin-1 Supplement block.\n  '\\xc0': 'A',  '\\xc1': 'A', '\\xc2': 'A', '\\xc3': 'A', '\\xc4': 'A', '\\xc5': 'A',\n  '\\xe0': 'a',  '\\xe1': 'a', '\\xe2': 'a', '\\xe3': 'a', '\\xe4': 'a', '\\xe5': 'a',\n  '\\xc7': 'C',  '\\xe7': 'c',\n  '\\xd0': 'D',  '\\xf0': 'd',\n  '\\xc8': 'E',  '\\xc9': 'E', '\\xca': 'E', '\\xcb': 'E',\n  '\\xe8': 'e',  '\\xe9': 'e', '\\xea': 'e', '\\xeb': 'e',\n  '\\xcc': 'I',  '\\xcd': 'I', '\\xce': 'I', '\\xcf': 'I',\n  '\\xec': 'i',  '\\xed': 'i', '\\xee': 'i', '\\xef': 'i',\n  '\\xd1': 'N',  '\\xf1': 'n',\n  '\\xd2': 'O',  '\\xd3': 'O', '\\xd4': 'O', '\\xd5': 'O', '\\xd6': 'O', '\\xd8': 'O',\n  '\\xf2': 'o',  '\\xf3': 'o', '\\xf4': 'o', '\\xf5': 'o', '\\xf6': 'o', '\\xf8': 'o',\n  '\\xd9': 'U',  '\\xda': 'U', '\\xdb': 'U', '\\xdc': 'U',\n  '\\xf9': 'u',  '\\xfa': 'u', '\\xfb': 'u', '\\xfc': 'u',\n  '\\xdd': 'Y',  '\\xfd': 'y', '\\xff': 'y',\n  '\\xc6': 'Ae', '\\xe6': 'ae',\n  '\\xde': 'Th', '\\xfe': 'th',\n  '\\xdf': 'ss',\n  // Latin Extended-A block.\n  '\\u0100': 'A',  '\\u0102': 'A', '\\u0104': 'A',\n  '\\u0101': 'a',  '\\u0103': 'a', '\\u0105': 'a',\n  '\\u0106': 'C',  '\\u0108': 'C', '\\u010a': 'C', '\\u010c': 'C',\n  '\\u0107': 'c',  '\\u0109': 'c', '\\u010b': 'c', '\\u010d': 'c',\n  '\\u010e': 'D',  '\\u0110': 'D', '\\u010f': 'd', '\\u0111': 'd',\n  '\\u0112': 'E',  '\\u0114': 'E', '\\u0116': 'E', '\\u0118': 'E', '\\u011a': 'E',\n  '\\u0113': 'e',  '\\u0115': 'e', '\\u0117': 'e', '\\u0119': 'e', '\\u011b': 'e',\n  '\\u011c': 'G',  '\\u011e': 'G', '\\u0120': 'G', '\\u0122': 'G',\n  '\\u011d': 'g',  '\\u011f': 'g', '\\u0121': 'g', '\\u0123': 'g',\n  '\\u0124': 'H',  '\\u0126': 'H', '\\u0125': 'h', '\\u0127': 'h',\n  '\\u0128': 'I',  '\\u012a': 'I', '\\u012c': 'I', '\\u012e': 'I', '\\u0130': 'I',\n  '\\u0129': 'i',  '\\u012b': 'i', '\\u012d': 'i', '\\u012f': 'i', '\\u0131': 'i',\n  '\\u0134': 'J',  '\\u0135': 'j',\n  '\\u0136': 'K',  '\\u0137': 'k', '\\u0138': 'k',\n  '\\u0139': 'L',  '\\u013b': 'L', '\\u013d': 'L', '\\u013f': 'L', '\\u0141': 'L',\n  '\\u013a': 'l',  '\\u013c': 'l', '\\u013e': 'l', '\\u0140': 'l', '\\u0142': 'l',\n  '\\u0143': 'N',  '\\u0145': 'N', '\\u0147': 'N', '\\u014a': 'N',\n  '\\u0144': 'n',  '\\u0146': 'n', '\\u0148': 'n', '\\u014b': 'n',\n  '\\u014c': 'O',  '\\u014e': 'O', '\\u0150': 'O',\n  '\\u014d': 'o',  '\\u014f': 'o', '\\u0151': 'o',\n  '\\u0154': 'R',  '\\u0156': 'R', '\\u0158': 'R',\n  '\\u0155': 'r',  '\\u0157': 'r', '\\u0159': 'r',\n  '\\u015a': 'S',  '\\u015c': 'S', '\\u015e': 'S', '\\u0160': 'S',\n  '\\u015b': 's',  '\\u015d': 's', '\\u015f': 's', '\\u0161': 's',\n  '\\u0162': 'T',  '\\u0164': 'T', '\\u0166': 'T',\n  '\\u0163': 't',  '\\u0165': 't', '\\u0167': 't',\n  '\\u0168': 'U',  '\\u016a': 'U', '\\u016c': 'U', '\\u016e': 'U', '\\u0170': 'U', '\\u0172': 'U',\n  '\\u0169': 'u',  '\\u016b': 'u', '\\u016d': 'u', '\\u016f': 'u', '\\u0171': 'u', '\\u0173': 'u',\n  '\\u0174': 'W',  '\\u0175': 'w',\n  '\\u0176': 'Y',  '\\u0177': 'y', '\\u0178': 'Y',\n  '\\u0179': 'Z',  '\\u017b': 'Z', '\\u017d': 'Z',\n  '\\u017a': 'z',  '\\u017c': 'z', '\\u017e': 'z',\n  '\\u0132': 'IJ', '\\u0133': 'ij',\n  '\\u0152': 'Oe', '\\u0153': 'oe',\n  '\\u0149': \"'n\", '\\u017f': 's'\n};\n\n/**\n * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A\n * letters to basic Latin letters.\n *\n * @private\n * @param {string} letter The matched letter to deburr.\n * @returns {string} Returns the deburred letter.\n */\nvar deburrLetter = basePropertyOf(deburredLetters);\n\nmodule.exports = deburrLetter;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_deburrLetter.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_hasUnicodeWord.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_hasUnicodeWord.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to detect strings that need a more robust regexp to match words. */\nvar reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;\n\n/**\n * Checks if `string` contains a word composed of Unicode symbols.\n *\n * @private\n * @param {string} string The string to inspect.\n * @returns {boolean} Returns `true` if a word is found, else `false`.\n */\nfunction hasUnicodeWord(string) {\n  return reHasUnicodeWord.test(string);\n}\n\nmodule.exports = hasUnicodeWord;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hasUnicodeWord.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_unicodeWords.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_unicodeWords.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to compose unicode character classes. */\nvar rsAstralRange = '\\\\ud800-\\\\udfff',\n    rsComboMarksRange = '\\\\u0300-\\\\u036f',\n    reComboHalfMarksRange = '\\\\ufe20-\\\\ufe2f',\n    rsComboSymbolsRange = '\\\\u20d0-\\\\u20ff',\n    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,\n    rsDingbatRange = '\\\\u2700-\\\\u27bf',\n    rsLowerRange = 'a-z\\\\xdf-\\\\xf6\\\\xf8-\\\\xff',\n    rsMathOpRange = '\\\\xac\\\\xb1\\\\xd7\\\\xf7',\n    rsNonCharRange = '\\\\x00-\\\\x2f\\\\x3a-\\\\x40\\\\x5b-\\\\x60\\\\x7b-\\\\xbf',\n    rsPunctuationRange = '\\\\u2000-\\\\u206f',\n    rsSpaceRange = ' \\\\t\\\\x0b\\\\f\\\\xa0\\\\ufeff\\\\n\\\\r\\\\u2028\\\\u2029\\\\u1680\\\\u180e\\\\u2000\\\\u2001\\\\u2002\\\\u2003\\\\u2004\\\\u2005\\\\u2006\\\\u2007\\\\u2008\\\\u2009\\\\u200a\\\\u202f\\\\u205f\\\\u3000',\n    rsUpperRange = 'A-Z\\\\xc0-\\\\xd6\\\\xd8-\\\\xde',\n    rsVarRange = '\\\\ufe0e\\\\ufe0f',\n    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;\n\n/** Used to compose unicode capture groups. */\nvar rsApos = \"['\\u2019]\",\n    rsBreak = '[' + rsBreakRange + ']',\n    rsCombo = '[' + rsComboRange + ']',\n    rsDigits = '\\\\d+',\n    rsDingbat = '[' + rsDingbatRange + ']',\n    rsLower = '[' + rsLowerRange + ']',\n    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',\n    rsFitz = '\\\\ud83c[\\\\udffb-\\\\udfff]',\n    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',\n    rsNonAstral = '[^' + rsAstralRange + ']',\n    rsRegional = '(?:\\\\ud83c[\\\\udde6-\\\\uddff]){2}',\n    rsSurrPair = '[\\\\ud800-\\\\udbff][\\\\udc00-\\\\udfff]',\n    rsUpper = '[' + rsUpperRange + ']',\n    rsZWJ = '\\\\u200d';\n\n/** Used to compose unicode regexes. */\nvar rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',\n    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',\n    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',\n    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',\n    reOptMod = rsModifier + '?',\n    rsOptVar = '[' + rsVarRange + ']?',\n    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',\n    rsOrdLower = '\\\\d*(?:1st|2nd|3rd|(?![123])\\\\dth)(?=\\\\b|[A-Z_])',\n    rsOrdUpper = '\\\\d*(?:1ST|2ND|3RD|(?![123])\\\\dTH)(?=\\\\b|[a-z_])',\n    rsSeq = rsOptVar + reOptMod + rsOptJoin,\n    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;\n\n/** Used to match complex or compound words. */\nvar reUnicodeWord = RegExp([\n  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',\n  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',\n  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,\n  rsUpper + '+' + rsOptContrUpper,\n  rsOrdUpper,\n  rsOrdLower,\n  rsDigits,\n  rsEmoji\n].join('|'), 'g');\n\n/**\n * Splits a Unicode `string` into an array of its words.\n *\n * @private\n * @param {string} The string to inspect.\n * @returns {Array} Returns the words of `string`.\n */\nfunction unicodeWords(string) {\n  return string.match(reUnicodeWord) || [];\n}\n\nmodule.exports = unicodeWords;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_unicodeWords.js?");

/***/ }),

/***/ "./node_modules/lodash/deburr.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/deburr.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var deburrLetter = __webpack_require__(/*! ./_deburrLetter */ \"./node_modules/lodash/_deburrLetter.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/** Used to match Latin Unicode letters (excluding mathematical operators). */\nvar reLatin = /[\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\xff\\u0100-\\u017f]/g;\n\n/** Used to compose unicode character classes. */\nvar rsComboMarksRange = '\\\\u0300-\\\\u036f',\n    reComboHalfMarksRange = '\\\\ufe20-\\\\ufe2f',\n    rsComboSymbolsRange = '\\\\u20d0-\\\\u20ff',\n    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;\n\n/** Used to compose unicode capture groups. */\nvar rsCombo = '[' + rsComboRange + ']';\n\n/**\n * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and\n * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).\n */\nvar reComboMark = RegExp(rsCombo, 'g');\n\n/**\n * Deburrs `string` by converting\n * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)\n * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)\n * letters to basic Latin letters and removing\n * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category String\n * @param {string} [string=''] The string to deburr.\n * @returns {string} Returns the deburred string.\n * @example\n *\n * _.deburr('déjà vu');\n * // => 'deja vu'\n */\nfunction deburr(string) {\n  string = toString(string);\n  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');\n}\n\nmodule.exports = deburr;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/deburr.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/kebabCase.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/kebabCase.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createCompounder = __webpack_require__(/*! ./_createCompounder */ \"./node_modules/lodash/_createCompounder.js\");\n\n/**\n * Converts `string` to\n * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category String\n * @param {string} [string=''] The string to convert.\n * @returns {string} Returns the kebab cased string.\n * @example\n *\n * _.kebabCase('Foo Bar');\n * // => 'foo-bar'\n *\n * _.kebabCase('fooBar');\n * // => 'foo-bar'\n *\n * _.kebabCase('__FOO_BAR__');\n * // => 'foo-bar'\n */\nvar kebabCase = createCompounder(function(result, word, index) {\n  return result + (index ? '-' : '') + word.toLowerCase();\n});\n\nmodule.exports = kebabCase;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/kebabCase.js?");

/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseToString = __webpack_require__(/*! ./_baseToString */ \"./node_modules/lodash/_baseToString.js\");\n\n/**\n * Converts `value` to a string. An empty string is returned for `null`\n * and `undefined` values. The sign of `-0` is preserved.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n * @example\n *\n * _.toString(null);\n * // => ''\n *\n * _.toString(-0);\n * // => '-0'\n *\n * _.toString([1, 2, 3]);\n * // => '1,2,3'\n */\nfunction toString(value) {\n  return value == null ? '' : baseToString(value);\n}\n\nmodule.exports = toString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/toString.js?");

/***/ }),

/***/ "./node_modules/lodash/words.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/words.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var asciiWords = __webpack_require__(/*! ./_asciiWords */ \"./node_modules/lodash/_asciiWords.js\"),\n    hasUnicodeWord = __webpack_require__(/*! ./_hasUnicodeWord */ \"./node_modules/lodash/_hasUnicodeWord.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\"),\n    unicodeWords = __webpack_require__(/*! ./_unicodeWords */ \"./node_modules/lodash/_unicodeWords.js\");\n\n/**\n * Splits `string` into an array of its words.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category String\n * @param {string} [string=''] The string to inspect.\n * @param {RegExp|string} [pattern] The pattern to match words.\n * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.\n * @returns {Array} Returns the words of `string`.\n * @example\n *\n * _.words('fred, barney, & pebbles');\n * // => ['fred', 'barney', 'pebbles']\n *\n * _.words('fred, barney, & pebbles', /[^, ]+/g);\n * // => ['fred', 'barney', '&', 'pebbles']\n */\nfunction words(string, pattern, guard) {\n  string = toString(string);\n  pattern = guard ? undefined : pattern;\n\n  if (pattern === undefined) {\n    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);\n  }\n  return string.match(pattern) || [];\n}\n\nmodule.exports = words;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/words.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ })

/******/ });