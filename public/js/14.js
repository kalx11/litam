webpackJsonp([14],{

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (obj) {
  var target = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
});

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert2__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_clone__ = __webpack_require__(49);
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
      row: {}
    };
  },
  methods: {
    open: function open(model) {
      this.row = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_clone__["a" /* default */])(model);
      this.$refs.dialog.open();
    },
    onSubmit: function onSubmit() {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put('/items/' + this.row.id, this.row).then(function () {
        __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default()('Correcto', 'Producto actualizado correctamente', 'success');
        _this.$refs.dialog.close();
        _this.$emit('done');
      });
    }
  }
});

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(46)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(86),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ignacio/proyectos/descon/resources/assets/js/components/EditarProducto.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditarProducto.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9dd9d482", Component.options)
  } else {
    hotAPI.reload("data-v-9dd9d482", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-dialog', {
    ref: "dialog"
  }, [_c('md-dialog-title', [_vm._v("Editar producto")]), _vm._v(" "), _c('md-dialog-content', [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.onSubmit($event)
      }
    }
  }, [_c('md-input-container', [_c('label', [_vm._v("Nombre")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "required": ""
    },
    model: {
      value: (_vm.row.name),
      callback: function($$v) {
        _vm.row.name = $$v
      },
      expression: "row.name"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Descripción")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "required": ""
    },
    model: {
      value: (_vm.row.description),
      callback: function($$v) {
        _vm.row.description = $$v
      },
      expression: "row.description"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Cantidad")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "required": ""
    },
    model: {
      value: (_vm.row.amount),
      callback: function($$v) {
        _vm.row.amount = _vm._n($$v)
      },
      expression: "row.amount"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Precio")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "required": ""
    },
    model: {
      value: (_vm.row.cost),
      callback: function($$v) {
        _vm.row.cost = _vm._n($$v)
      },
      expression: "row.cost"
    }
  })], 1)], 1)]), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
    staticClass: "md-primary",
    nativeOn: {
      "click": function($event) {
        _vm.$refs.dialog.close()
      }
    }
  }, [_vm._v("Cancelar")]), _vm._v(" "), _c('md-button', {
    staticClass: "md-primary",
    nativeOn: {
      "click": function($event) {
        _vm.onSubmit($event)
      }
    }
  }, [_vm._v("Actualizar")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9dd9d482", module.exports)
  }
}

/***/ })

});