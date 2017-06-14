webpackJsonp([4],{

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: { item: { required: true } }
});

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(44)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(50),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ignacio/proyectos/descon/resources/assets/js/utils/Item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-67e35cd4", Component.options)
  } else {
    hotAPI.reload("data-v-67e35cd4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('span', [_vm._v(_vm._s(_vm.item.name))]), _vm._v(" "), _c('abbr', [_vm._v(_vm._s(_vm.item.surname))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-67e35cd4", module.exports)
  }
}

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Item_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_Item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_accounting__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_accounting___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_accounting__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_sweetalert2__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      template: __WEBPACK_IMPORTED_MODULE_1__utils_Item_vue___default.a,
      clientNotFound: false,
      isEditing: false,
      subtotal: 0,
      iva: 0,
      item: '',
      total_cost: 0,
      items: [],
      products: [],
      items_invoice: [{
        product: '',
        amount: 0
      }],
      quote: {
        value: ''
      }
    };
  },
  filters: {
    currency: function currency(value) {
      if (!value) return;
      return __WEBPACK_IMPORTED_MODULE_2_accounting___default.a.formatMoney(value, { symbol: "$", format: "%v %s", thousand: '.', decimal: ',' });
    }
  },
  computed: {
    subtotal_products: function subtotal_products() {
      var total = [];
      Object.entries(this.items_invoice).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        if (!!val.product) {
          total.push(Number(val.product.cost) * val.amount);
        }
      });
      this.subtotal = total.reduce(function (a, b) {
        return a + b;
      }, 0);
      return this.subtotal;
    },
    iva_products: function iva_products() {
      this.iva = this.subtotal * 0.19;
      return this.iva;
    },
    total_products: function total_products() {
      this.total_cost = this.subtotal + this.iva;
      return this.total_cost;
    }
  },
  methods: {
    open: function open() {
      this.dialog1.open();
    },
    onSubmit: function onSubmit() {
      var _this = this;

      var data = {
        client: this.item.id,
        items_invoice: this.items_invoice
      };
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/quotes', data).then(function () {
        _this.$refs.dialog1.close();
        _this.$emit('done');
        _this.reset();
        __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()('Operación exitosa', 'Cotización creada correctamente', 'success');
      }).catch(function () {
        __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()('Error!', 'Hubo un problema al crear la cotización', 'error');
      });
    },
    reset: function reset() {
      for (var i = 0; i < this.$refs.autocomplete.length; i++) {
        Object.assign(this.$refs.autocomplete[i].$data, this.$refs.autocomplete[i].$options.data());
      }
      Object.assign(this.$refs.clientAutoComplete.$data, this.$refs.clientAutoComplete.$options.data());
      Object.assign(this.$data, this.$options.data());
    },
    updateItems: function updateItems(text) {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/clients?search=' + text).then(function (_ref3) {
        var data = _ref3.data;

        if (data.length) {
          _this2.clientNotFound = false;
        } else {
          _this2.clientNotFound = true;
        }
        _this2.items = data;
      });
    },
    updateProducts: function updateProducts(text, index) {
      var _this3 = this;

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/items?search=' + text).then(function (_ref4) {
        var data = _ref4.data;

        _this3.$set(_this3.products, index, data);
      });
    },
    getLabel: function getLabel(item) {
      return item.name + ' ' + item.surname;
    },
    getLabelProduct: function getLabelProduct(item) {
      return item.name;
    },
    addItemInvoice: function addItemInvoice() {
      this.items_invoice.push({
        product: '', amount: 0
      });
    },
    close: function close() {
      this.reset();
      this.$refs.dialog1.close();
    },
    deleteItem: function deleteItem(index) {
      this.items_invoice.splice(index, 1);
    }
  }
});

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
exports.push([module.i, "\ninput[type=search] {\n  border-radius: 0px !important;\n}\n.v-autocomplete .v-autocomplete-list {\n  width: 100%;\n  text-align: left;\n  border: none;\n  border-top: none;\n  max-height: 400px;\n  overflow-y: auto;\n  z-index: 10;\n  border-bottom: 1px solid #157977;\n}\n.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item {\n    cursor: pointer;\n    background-color: #fff;\n    padding: 10px;\n    border-bottom: 1px solid #157977;\n    border-left: 1px solid #157977;\n    border-right: 1px solid #157977;\n}\n.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item:last-child {\n      border-bottom: none;\n}\n.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item:hover {\n      background-color: #eee;\n}\n", ""]);

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(85)

var Component = __webpack_require__(44)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(83),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ignacio/proyectos/descon/resources/assets/js/components/CrearCotizacion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CrearCotizacion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a09e31c0", Component.options)
  } else {
    hotAPI.reload("data-v-a09e31c0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-dialog', {
    ref: "dialog1",
    on: {
      "close": _vm.reset
    }
  }, [_c('md-dialog-title', [_vm._v("Crear cotizacion")]), _c('md-dialog-content', [_c('nav', {
    staticClass: "level"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('v-autocomplete', {
    ref: "clientAutoComplete",
    attrs: {
      "items": _vm.items,
      "wait": 100,
      "component-item": _vm.template,
      "input-class": _vm.clientNotFound ? 'input is-danger' : 'input',
      "placeholder": "Nombre del cliente",
      "get-label": _vm.getLabel
    },
    on: {
      "update-items": _vm.updateItems
    },
    model: {
      value: (_vm.item),
      callback: function($$v) {
        _vm.item = $$v
      },
      expression: "item"
    }
  })], 1), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-outlined is-danger': _vm.clientNotFound
    },
    on: {
      "click": _vm.addItemInvoice
    }
  }, [_c('i', {
    staticClass: "fa fa-plus",
    attrs: {
      "aria-hidden": "true"
    }
  }), _c('md-ink-ripple')], 1)]), _c('p', {
    staticClass: "control"
  }, [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': !!_vm.item, 'is-outlined is-danger': _vm.clientNotFound
    },
    staticStyle: {
      "color": "#363636",
      "text-decoration": "none"
    },
    attrs: {
      "href": "/clientes"
    }
  }, [_c('i', {
    staticClass: "fa fa-user",
    attrs: {
      "aria-hidden": "true"
    }
  })])]), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-outlined is-danger': _vm.clientNotFound
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.isEditing = !_vm.isEditing
      }
    }
  }, [_c('i', {
    staticClass: "fa",
    class: _vm.isEditing ? 'fa-pencil-square' : 'fa-pencil-square-o',
    attrs: {
      "aria-hidden": "true"
    }
  })])])])]), _c('div', {
    staticClass: "level-item"
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.clientNotFound),
      expression: "clientNotFound"
    }],
    staticClass: "help is-danger"
  }, [_vm._v("Cliente no encontrado")])])])]), _c('md-table', [_c('md-table-header', [_c('md-table-row', [_c('md-table-head', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEditing),
      expression: "isEditing"
    }]
  }), _c('md-table-head', [_vm._v("Producto")]), _c('md-table-head', [_vm._v("Descripción")]), _c('md-table-head', {
    staticStyle: {
      "width": "15%"
    }
  }, [_vm._v("Cantidad")]), _c('md-table-head', [_vm._v("Costo unitario")]), _c('md-table-head', [_vm._v("Total")])], 1)], 1), _c('md-table-body', _vm._l((_vm.items_invoice), function(it, index) {
    return _c('md-table-row', {
      key: index
    }, [_c('md-table-cell', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.isEditing),
        expression: "isEditing"
      }]
    }, [_c('md-button', {
      staticClass: "md-icon-button",
      nativeOn: {
        "click": function($event) {
          $event.preventDefault();
          _vm.deleteItem(index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash",
      attrs: {
        "aria-hidden": "true"
      }
    })])], 1), _c('md-table-cell', [_c('v-autocomplete', {
      ref: "autocomplete",
      refInFor: true,
      attrs: {
        "items": _vm.products[index],
        "wait": 100,
        "component-item": _vm.template,
        "input-class": "input",
        "placeholder": "Nombre del producto",
        "get-label": _vm.getLabelProduct
      },
      on: {
        "update-items": function($event) {
          _vm.updateProducts($event, index)
        }
      },
      model: {
        value: (it.product),
        callback: function($$v) {
          it.product = $$v
        },
        expression: "it.product"
      }
    })], 1), _c('md-table-cell', [_vm._v(_vm._s(!!it.product ? it.product.description : ''))]), _c('md-table-cell', {
      staticStyle: {
        "width": "15%"
      }
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.number",
        value: (it.amount),
        expression: "it.amount",
        modifiers: {
          "number": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (it.amount)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          it.amount = _vm._n($event.target.value)
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })]), _c('md-table-cell', {
      attrs: {
        "md-numeric": "md-numeric"
      }
    }, [(!!it.product) ? _c('p', [_vm._v(_vm._s(_vm._f("currency")(it.product.cost)))]) : _vm._e()]), _c('md-table-cell', [_c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (index == (_vm.items_invoice.length - 1)),
        expression: "index == (items_invoice.length - 1)"
      }]
    }, [_c('p', [_vm._v("Subtotal: " + _vm._s(_vm._f("currency")(_vm.subtotal_products)))]), _c('p', [_vm._v("IVA 19%: " + _vm._s(_vm._f("currency")(_vm.iva_products)))]), _c('p', [_vm._v("Total: " + _vm._s(_vm._f("currency")(_vm.total_products)))])])])], 1)
  }))], 1)], 1), _c('md-dialog-actions', [_c('md-button', {
    staticClass: "md-primary",
    nativeOn: {
      "click": function($event) {
        _vm.close()
      }
    }
  }, [_vm._v("Cancelar")]), _c('md-button', {
    staticClass: "md-primary",
    nativeOn: {
      "click": function($event) {
        _vm.onSubmit($event)
      }
    }
  }, [_vm._v("Crear")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a09e31c0", module.exports)
  }
}

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(86)("0b2c5247", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a09e31c0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CrearCotizacion.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a09e31c0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CrearCotizacion.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(87)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 87:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })

});