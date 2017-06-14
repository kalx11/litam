<template lang="pug">
  div
    nav.level
      // Left side
      .level-left
        .level-item
          p.subtitle.is-5
            strong {{ total }}
            |  Facturas
        .level-item
          .field.has-addons
            p.control
              input.input(v-model='search', type='text', placeholder='Encuentra una factura')
            p.control
              button.button(@click.prevent='searchInput')
                i.fa.fa-search(aria-hidden='true')
            p.control
              button.button(@click.prevent='reload')
                i.fa.fa-refresh(aria-hidden='true')
            //p.control
              button.button(@click.prevent='openDialog')
                i.fa.fa-plus(aria-hidden='true')
            //p.control
              button.button(@click.prevent='isEditing = !isEditing')
                i.fa(:class="isEditing ? 'fa-pencil-square' : 'fa-pencil-square-o'", aria-hidden='true')
            p.control
              button.button(@click.prevent='showPDF = !showPDF')
                i.fa(:class="showPDF ? 'fa-file-text' : 'fa-file-text-o'", aria-hidden='true')
    md-table
      md-table-header
        md-table-row
          md-table-head(v-show='showPDF')
          md-table-head(md-numeric='') #
          md-table-head Cliente
          md-table-head Fecha
          md-table-head Precio
          //md-table-head(v-show='isEditing')
      md-table-body
        md-table-row(v-for='(row, index) in items', :key='index')
          md-table-cell(md-numeric='', v-show='showPDF')
            md-button.md-icon-button(@click.native.prevent='click(row.id)')
              i.fa.fa-file-pdf-o(aria-hidden='true')
          md-table-cell(md-numeric='') {{ row.id }}
          md-table-cell {{ row.client.name + ' ' + row.client.surname }}
          md-table-cell {{ row.created_at }}
          md-table-cell {{ row.total_cost | currency }}
        //  md-table-cell(v-show='isEditing')
            md-menu
              md-button.md-icon-button(md-menu-trigger='')
                i.fa.fa-pencil(aria-hidden='true')
              md-menu-content
                md-menu-item Facturar
                md-menu-item(@click.native.prevent='$refs.editItem.open(row.id)') Editar
                md-menu-item(@click.native.prevent='deleteItem(row.id)') Borrar
    nav.level
      // Left side
      .level-left
        .level-item
          p.control
            md-button.button(@click.native.prevent='previous', :disabled='page<=1')
              i.fa.fa-angle-double-left
          p.control
            md-button.button(:disabled='page >= last_page || last_page === 0', @click.native.prevent='next')
              i.fa.fa-angle-double-right
    //cotizacion-create(@done='getUsers', ref='createDialog')
    //cotizacion-edit(@done='getUsers', ref='editItem')
</template>

<script>
  import axios from 'axios';
  import { default as swal } from 'sweetalert2';
  import numeral from 'numeral';
  import accounting from 'accounting';

  export default {
    /*components: {
      'cotizacion-create': () => System.import('./CrearCotizacion.vue'),
      'cotizacion-edit': () => System.import('./EditarCotizacion.vue')
    },*/
    data: () => ({
      items: {},
      showPDF: false,
      total: 0,
      page: 1,
      last_page: 1,
      search: '',
//      isEditing: false
    }),
    filters: {
      currency(value) {
        if(!value) return;
        return accounting.formatMoney(value, { symbol: "$",  format: "%v %s", thousand: '.', decimal: ',' });
      }
    },
    methods: {
      click(id) {
        let tab = open('/pdf/' + id);
        tab.focus();
      },
      //openDialog() { this.$refs.createDialog.$refs.dialog1.open() },
      getUsers() {
        axios.get(`/invoices?page=${this.page}&search=${this.search}`).then(({data}) => {
          this.search = '';
          this.items = data.data;
          this.total = data.total;
          this.page = data.current_page;
          this.last_page = data.last_page;
        });
      },
      reload() {
        this.search = '';
        this.getUsers();
      },
      /*deleteItem(id) {
        let self = this;
        swal({
          text: "¿Quieres eliminar esta cotización?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminalo'
        }).then(function () {
          axios.delete(`quotes/${id}`).then(() => {
            swal('Eliminado!', 'Cotización eliminada', 'success');
            self.getUsers();
          }).catch( () => {
            swal("Error", "Hubo un problema al borrar esta cotizacion", "error");
          });
        });
      },*/
      searchInput() {
        this.page = 1;
        this.getUsers();
        this.search = '';

      },
      next() {
        if(this.page<this.last_page || last_page === 0) {
          this.page++;
          this.getUsers();
        }
      },
      previous() {
        if(this.page>1) {
          this.page--;
          this.getUsers();
        }
      }
    },
    created() {
      this.getUsers();
    }
  }
</script>