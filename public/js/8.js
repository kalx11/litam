webpackJsonp([8],{49:function(t,n,o){"use strict";n.a=function(t){var n={};for(var o in t)t.hasOwnProperty(o)&&(n[o]=t[o]);return n}},62:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=o(10),i=o.n(e),r=o(47),a=o.n(r),c=o(49);n.default={data:function(){return{row:{}}},methods:{open:function(t){this.row=o.i(c.a)(t),this.$refs.dialog.open()},onSubmit:function(){var t=this;i.a.put("/items/"+this.row.id,this.row).then(function(){a()("Correcto","Producto actualizado correctamente","success"),t.$refs.dialog.close(),t.$emit("done")})}}}},75:function(t,n,o){var e=o(46)(o(62),o(89),null,null);t.exports=e.exports},89:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("md-dialog",{ref:"dialog"},[o("md-dialog-title",[t._v("Editar producto")]),t._v(" "),o("md-dialog-content",[o("form",{on:{submit:function(n){n.preventDefault(),t.onSubmit(n)}}},[o("md-input-container",[o("label",[t._v("Nombre")]),t._v(" "),o("md-input",{attrs:{required:""},model:{value:t.row.name,callback:function(n){t.row.name=n},expression:"row.name"}})],1),t._v(" "),o("md-input-container",[o("label",[t._v("Descripción")]),t._v(" "),o("md-input",{attrs:{required:""},model:{value:t.row.description,callback:function(n){t.row.description=n},expression:"row.description"}})],1),t._v(" "),o("md-input-container",[o("label",[t._v("Cantidad")]),t._v(" "),o("md-input",{attrs:{required:""},model:{value:t.row.amount,callback:function(n){t.row.amount=t._n(n)},expression:"row.amount"}})],1),t._v(" "),o("md-input-container",[o("label",[t._v("Precio")]),t._v(" "),o("md-input",{attrs:{required:""},model:{value:t.row.cost,callback:function(n){t.row.cost=t._n(n)},expression:"row.cost"}})],1)],1)]),t._v(" "),o("md-dialog-actions",[o("md-button",{staticClass:"md-primary",nativeOn:{click:function(n){t.$refs.dialog.close()}}},[t._v("Cancelar")]),t._v(" "),o("md-button",{staticClass:"md-primary",nativeOn:{click:function(n){t.onSubmit(n)}}},[t._v("Actualizar")])],1)],1)},staticRenderFns:[]}}});