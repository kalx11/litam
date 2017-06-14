webpackJsonp([5],{

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

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Item_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_Item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_accounting__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_accounting___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_accounting__);
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




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      isEditing: false,
      template: __WEBPACK_IMPORTED_MODULE_1__utils_Item_vue___default.a,
      client: '',
      total_cost: 0,
      subtotal: 0,
      iva: 0,
      clients: [],
      products: [],
      items_invoice: [],
      quote: {
        id: ''
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
    open: function open(id) {
      this.$refs.dialog.open();
      this.getQuote(id);
    },
    onSubmit: function onSubmit() {
      var _this = this;

      var data = {
        client: this.client.id,
        items_invoice: this.items_invoice,
        total_cost: this.total_cost
      };
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put('/quotes/' + this.quote.id, data).then(function () {
        _this.close();
        _this.$emit('done');
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

        _this2.clients = data;
      });
    },
    updateProducts: function updateProducts(text, index) {
      var _this3 = this;

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/items?search=' + text).then(function (_ref4) {
        var data = _ref4.data;

        _this3.$set(_this3.products, index, data);
      });
    },
    deleteItem: function deleteItem(index) {
      this.items_invoice.splice(index, 1);
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
    getQuote: function getQuote(id) {
      var _this4 = this;

      this.quote.id = id;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/quotes/' + id).then(function (_ref5) {
        var data = _ref5.data;

        _this4.client = data.client;
        for (var i = 0; i < data.items.length; i++) {
          var item = data.items[i];
          _this4.items_invoice.push({
            product: item,
            amount: item.pivot.amount
          });
        }
      });
    },
    close: function close() {
      this.$refs.dialog.close();
      this.reset();
    }
  }
});

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(44)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(79),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ignacio/proyectos/descon/resources/assets/js/components/EditarCotizacion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditarCotizacion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6baf4fac", Component.options)
  } else {
    hotAPI.reload("data-v-6baf4fac", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-dialog', {
    ref: "dialog",
    on: {
      "close": _vm.reset
    }
  }, [_c('md-dialog-title', [_vm._v("Editar cotización")]), _c('md-dialog-content', [_c('nav', {
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
      "items": _vm.clients,
      "wait": 100,
      "component-item": _vm.template,
      "input-class": "input",
      "placeholder": "Nombre del cliente",
      "get-label": _vm.getLabel
    },
    on: {
      "update-items": _vm.updateItems
    },
    model: {
      value: (_vm.client),
      callback: function($$v) {
        _vm.client = $$v
      },
      expression: "client"
    }
  })], 1), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button",
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
      'is-primary': !!_vm.client
    },
    staticStyle: {
      "color": "#363636",
      "text-decoration": "cdnone"
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
  })])])])])])]), _c('md-table', [_c('md-table-header', [_c('md-table-row', [_c('md-table-head', {
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
        _vm.close($event)
      }
    }
  }, [_vm._v("Cancelar")]), _c('md-button', {
    staticClass: "md-primary",
    nativeOn: {
      "click": function($event) {
        _vm.onSubmit($event)
      }
    }
  }, [_vm._v("Editar")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6baf4fac", module.exports)
  }
}

/***/ })

});