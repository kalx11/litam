webpackJsonp([8],{

/***/ 47:
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

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert2__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_clone__ = __webpack_require__(47);
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

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put('/clients/' + this.row.id, this.row).then(function () {
        __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default()('Correcto', 'Cliente actualizado correctamente', 'success');
        _this.$refs.dialog.close();
        _this.$emit('done');
      }).catch(function () {
        __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default()('Error', 'Problema al actualizar el cliente', 'error');
      });
    }
  }
});

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(44)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(74),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ignacio/proyectos/descon/resources/assets/js/components/EditarCliente.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditarCliente.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a9f94eb", Component.options)
  } else {
    hotAPI.reload("data-v-1a9f94eb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-dialog', {
    ref: "dialog"
  }, [_c('md-dialog-title', [_vm._v("Editar cliente")]), _vm._v(" "), _c('md-dialog-content', [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.onSubmit($event)
      }
    }
  }, [_c('md-input-container', [_c('label', [_vm._v("Nombre/Razón social")]), _vm._v(" "), _c('md-input', {
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
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Apellido")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.row.surname),
      callback: function($$v) {
        _vm.row.surname = $$v
      },
      expression: "row.surname"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Correo electrónico")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.row.email),
      callback: function($$v) {
        _vm.row.email = $$v
      },
      expression: "row.email"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Télefono")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.row.phone),
      callback: function($$v) {
        _vm.row.phone = $$v
      },
      expression: "row.phone"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Identificación")]), _vm._v(" "), _c('md-select', {
    attrs: {
      "name": "identidad",
      "required": ""
    },
    model: {
      value: (_vm.row.type),
      callback: function($$v) {
        _vm.row.type = $$v
      },
      expression: "row.type"
    }
  }, [_c('md-option', {
    attrs: {
      "value": "nit"
    }
  }, [_vm._v("Nit")]), _vm._v(" "), _c('md-option', {
    attrs: {
      "value": "cedula"
    }
  }, [_vm._v("Cédula")])], 1)], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v(" " + _vm._s(_vm.row.type ? _vm.row.type : 'Identificación'))]), _vm._v(" "), _c('md-input', {
    attrs: {
      "required": ""
    },
    model: {
      value: (_vm.row.code),
      callback: function($$v) {
        _vm.row.code = $$v
      },
      expression: "row.code"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Ciudad")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "required": ""
    },
    model: {
      value: (_vm.row.city),
      callback: function($$v) {
        _vm.row.city = $$v
      },
      expression: "row.city"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Dirección")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "required": ""
    },
    model: {
      value: (_vm.row.address),
      callback: function($$v) {
        _vm.row.address = $$v
      },
      expression: "row.address"
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
     require("vue-hot-reload-api").rerender("data-v-1a9f94eb", module.exports)
  }
}

/***/ })

});