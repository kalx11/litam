<template lang="pug">
  md-dialog(ref='dialog', @close="reset")
    md-dialog-title Editar cotización
    md-dialog-content
      nav.level
        .level-left
          .level-item
            .field.has-addons
              p.control
                v-autocomplete(ref="clientAutoComplete" v-model="client", :items='clients', :wait='100', :component-item='template', input-class='input', placeholder='Nombre del cliente', @update-items="updateItems", :get-label='getLabel')
              p.control
                button.button(@click="addItemInvoice") <i class="fa fa-plus" aria-hidden="true"></i>
                  md-ink-ripple
              p.control
                a.button(style="color: #363636; text-decoration: cdnone;"  href="/clientes", :class="{'is-primary': !!client}") <i class="fa fa-user" aria-hidden="true"></i>
              p.control
                button.button(@click.prevent="isEditing = !isEditing") <i class="fa" :class="isEditing ? 'fa-pencil-square' : 'fa-pencil-square-o'" aria-hidden="true"></i>

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
            md-table-cell(md-numeric) {{ !!it.product ? currency(it.product.cost) : '' }}
            md-table-cell {{ index == (items_invoice.length - 1) ? currency(total()) : ''}}
    md-dialog-actions
      md-button.md-primary(@click.native='close') Cancelar
      md-button.md-primary(@click.native='onSubmit') Editar
</template>

<script>
  import axios from 'axios';
  import ItemTemplate from './../utils/Item.vue'
  import accounting from 'accounting';
  export default {
    data: () => ({
      isEditing: false,
      template: ItemTemplate,
      client: '',
      total_cost: 0,
      clients: [],
      products: [],
      items_invoice: [],
      quote: {
        id: ''
      }
    }),
    methods: {
      open(id){
        this.$refs.dialog.open();
        this.getQuote(id);
      },
      currency(value) {
        if (!value) return;
        return accounting.formatMoney(value, { symbol: "$",  format: "%v %s" });
      },
      onSubmit() {
        let data = {
          client: this.client.id,
          items_invoice: this.items_invoice,
          total_cost: this.total_cost
        };
        axios.put('/quotes/' + this.quote.id, data).then(() => {
          this.close();
          this.$emit('done');
        });
      },
      reset() {
        for (let i = 0; i < this.$refs.autocomplete.length; i++) {
          Object.assign(this.$refs.autocomplete[i].$data, this.$refs.autocomplete[i].$options.data());
        }
        Object.assign(this.$refs.clientAutoComplete.$data, this.$refs.clientAutoComplete.$options.data());
        Object.assign(this.$data, this.$options.data());
      },
      updateItems (text) {
        axios.get(`/clients?search=${text}`).then(({data}) => {
          this.clients = data;
        });
      },
      updateProducts(text, index) {
        axios.get(`/items?search=${text}`).then(({data}) => {
          this.$set(this.products, index, data);
        });
      },
      deleteItem(index) {
        this.items_invoice.splice(index, 1);
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
      total() {
        let total = [];
        Object.entries(this.items_invoice).forEach(([key, val]) => {
          if (!!val.product) {
            total.push(Number(val.product.cost) * val.amount);
          }
        });
        let value = total.reduce((a, b) => a + b, 0);
        this.total_cost = value;
        return value;
      },
      getQuote(id) {
        this.quote.id = id;
        axios.get('/quotes/' + id).then(({data}) => {
          this.client = data.client;
          for(let i = 0; i < data.items.length; i++) {
            let item = data.items[i];
            this.items_invoice.push({
              product: item,
              amount: item.pivot.amount
            });

          }
        });
      },
      close() {
        this.$refs.dialog.close();
        this.reset();
      }
    }
  }
</script>
