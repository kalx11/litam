<template lang="pug">
  md-dialog(ref='dialog1', @close="reset")
    md-dialog-title Crear cotizacion
    md-dialog-content
      nav.level
        .level-left
          .level-item
            .field.has-addons
              p.control
                v-autocomplete(ref="clientAutoComplete" v-model="item", :items='items', :wait='100', :component-item='template', :input-class="clientNotFound ? 'input is-danger' : 'input'", placeholder='Nombre del cliente', @update-items="updateItems", :get-label='getLabel')
              p.control
                button.button(@click="addItemInvoice", :class="{'is-outlined is-danger': clientNotFound}") <i class="fa fa-plus" aria-hidden="true"></i>
                  md-ink-ripple
              p.control
                a.button(style="color: #363636; text-decoration: none;"  href="/clientes", :class="{'is-primary': !!item, 'is-outlined is-danger': clientNotFound}") <i class="fa fa-user" aria-hidden="true"></i>
              p.control
                button.button(@click.prevent="isEditing = !isEditing", :class="{'is-outlined is-danger': clientNotFound}") <i class="fa" :class="isEditing ? 'fa-pencil-square' : 'fa-pencil-square-o'" aria-hidden="true"></i>
          .level-item
            p(v-show="clientNotFound" class="help is-danger") Cliente no encontrado
      md-table
        md-table-header
          md-table-row
            md-table-head(v-show="isEditing")
            md-table-head Producto
            md-table-head Descripción
            md-table-head(style="width: 15%;") Cantidad
            md-table-head Costo unitario
            md-table-head Total
        md-table-body
          md-table-row(v-for="(it, index) in items_invoice", :key="index")
            md-table-cell(v-show="isEditing")
              md-button.md-icon-button(@click.native.prevent="deleteItem(index)") <i class="fa fa-trash" aria-hidden="true"></i>
            md-table-cell
              v-autocomplete(ref="autocomplete" v-model='it.product', :items='products[index]', :wait='100', :component-item='template', input-class='input', placeholder='Nombre del producto', @update-items="updateProducts($event, index)", :get-label='getLabelProduct')
            md-table-cell {{ !!it.product ? it.product.description : '' }}
            md-table-cell(style="width: 15%")
              input(v-model.number="it.amount" type="text" class="input")
            md-table-cell(md-numeric)
              p(v-if="!!it.product") {{ it.product.cost | currency}}
            md-table-cell
              span(v-show="index == (items_invoice.length - 1)")
                p Subtotal: {{ subtotal_products | currency }}
                p IVA 19%: {{ iva_products | currency }}
                p Total: {{ total_products | currency }}
    md-dialog-actions
      md-button.md-primary(@click.native='close()') Cancelar
      md-button.md-primary(@click.native='onSubmit') Crear
</template>

<script>
  import axios from 'axios';
  import ItemTemplate from './../utils/Item.vue'
  import accounting from 'accounting';
  import swal from 'sweetalert2';
  export default {
    data: () => ({
      template: ItemTemplate,
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
    }),
    filters: {
      currency(value) {
        if (!value) return;
        return accounting.formatMoney(value, { symbol: "$",  format: "%v %s", thousand: '.', decimal: ',' });
      }
    },
    computed: {
      subtotal_products() {
        let total = [];
        Object.entries(this.items_invoice).forEach(([key, val]) => {
          if (!!val.product) {
            total.push(Number(val.product.cost) * val.amount);
          }
        });
        this.subtotal = total.reduce((a, b) => a + b, 0);
        return this.subtotal;
      },
      iva_products() {
        this.iva = this.subtotal * 0.19;
        return this.iva;
      },
      total_products() {
        this.total_cost = this.subtotal + this.iva;
        return this.total_cost;
      }
    },
    methods: {
      open() {
        this.dialog1.open();
      },
      onSubmit() {
        let data = {
          client: this.item.id,
          items_invoice: this.items_invoice,
        };
        axios.post('/quotes', data).then(() => {
          this.$refs.dialog1.close();
          this.$emit('done');
          this.reset();
          swal('Operación exitosa', 'Cotización creada correctamente', 'success');
        }).catch( () => {
          swal('Error!', 'Hubo un problema al crear la cotización', 'error');
        });
      },
      reset() {
        for(let i = 0; i < this.$refs.autocomplete.length; i++) {
          Object.assign(this.$refs.autocomplete[i].$data, this.$refs.autocomplete[i].$options.data());
        }
        Object.assign(this.$refs.clientAutoComplete.$data, this.$refs.clientAutoComplete.$options.data());
        Object.assign(this.$data, this.$options.data());
      },
      updateItems (text) {
        axios.get(`/clients?search=${text}`).then(({data}) => {
          if (data.length) {
            this.clientNotFound = false;
          } else {
            this.clientNotFound = true;
          }
          this.items = data;
        });
      },
      updateProducts(text, index) {
        axios.get(`/items?search=${text}`).then(({data}) => {
          this.$set(this.products, index, data);
        });
      },
      getLabel(item) {
        return item.name + ' ' + item.surname;
      },
      getLabelProduct(item) {
        return item.name;
      },
      addItemInvoice() {
        this.items_invoice.push({
          product: '', amount: 0
        });
      },
      close() {
        this.reset();
        this.$refs.dialog1.close();
      },
      deleteItem(index) {
        this.items_invoice.splice(index, 1);
      }
    }
  }
</script>

<style lang="scss">
  input[type=search] {
    border-radius: 0px !important;
  }

  .v-autocomplete {
    .v-autocomplete-list {
      width: 100%;
      text-align: left;
      border: none;
      border-top: none;
      max-height: 400px;
      overflow-y: auto;
      z-index: 10;
      border-bottom: 1px solid #157977;
      .v-autocomplete-list-item {
        cursor: pointer;
        background-color: #fff;
        padding: 10px;
        border-bottom: 1px solid #157977;
        border-left: 1px solid #157977;
        border-right: 1px solid #157977;
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          background-color: #eee;
        }
      }
    }

  }

</style>