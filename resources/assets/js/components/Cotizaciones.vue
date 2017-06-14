<template>
  <div>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ total }}</strong> cotizaciones
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" v-model="search" type="text" placeholder="Encuentra una cotización">
            </p>
            <p class="control">
              <button @click.prevent="searchInput()" class="button">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="reload()">
                <i class="fa fa-refresh" aria-hidden="true"></i>

              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="openDialog">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="isEditing = !isEditing">
                <i class="fa" :class="isEditing ? 'fa-pencil-square' : 'fa-pencil-square-o'" aria-hidden="true"></i>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="showPDF = !showPDF">
                <i class="fa" :class="showPDF ? 'fa-file-text' : 'fa-file-text-o'" aria-hidden="true"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
    </nav>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head v-show="showPDF"></md-table-head>
          <md-table-head md-numeric>#</md-table-head>
          <md-table-head>Cliente</md-table-head>
          <md-table-head>Fecha</md-table-head>
          <md-table-head>Precio</md-table-head>
          <md-table-head v-show="isEditing"></md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, index) in items" :key="index">
          <md-table-cell md-numeric v-show="showPDF">
            <md-button class="md-icon-button" @click.native.prevent="click(row.id)">
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            </md-button>
          </md-table-cell>
          <md-table-cell md-numeric>{{ row.id }}</md-table-cell>
          <md-table-cell>{{ row.client.name + ' ' + row.client.surname }}</md-table-cell>
          <md-table-cell>{{ row.created_at }}</md-table-cell>
          <md-table-cell>{{ row.total_cost | currency }}</md-table-cell>
          <md-table-cell v-show="isEditing">
            <md-menu>
              <md-button md-menu-trigger class="md-icon-button"><i class="fa fa-pencil" aria-hidden="true"></i>
              </md-button>

              <md-menu-content>
                <md-menu-item @click.native.prevent="bill(row.id)">Facturar</md-menu-item>
                <md-menu-item @click.native.prevent="$refs.editItem.open(row.id)">Editar</md-menu-item>
                <md-menu-item @click.native.prevent="deleteItem(row.id)">Borrar</md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="control">
            <md-button @click.native.prevent="previous" :disabled="page<=1" class="button"><i
                    class="fa fa-angle-double-left"></i></md-button>
          </p>
          <p class="control">
            <md-button :disabled="page >= last_page || last_page === 0" @click.native.prevent="next" class="button"><i
                    class="fa fa-angle-double-right"></i></md-button>
          </p>
        </div>
      </div>
    </nav>
    <cotizacion-create @done="getUsers" ref="createDialog"></cotizacion-create>
    <cotizacion-edit @done="getUsers" ref="editItem"></cotizacion-edit>
  </div>
</template>

<script>
  import axios from 'axios';
  import {default as swal} from 'sweetalert2';
  import numeral from 'numeral';
  import accounting from 'accounting';

  export default {
    components: {
      'cotizacion-create': () => System.import('./CrearCotizacion.vue'),
      'cotizacion-edit': () => System.import('./EditarCotizacion.vue')
    },
    data: () => ({
      items: {},
      showPDF: false,
      total: 0,
      page: 1,
      last_page: 1,
      search: '',
      isEditing: false
    }),
    filters: {
      currency(value) {
        if (!value) return;
        return accounting.formatMoney(value, {symbol: "$", format: "%v %s", thousand: '.', decimal: ','});
      }
    },
    methods: {
      click(id) {
        let tab = open('/pdf/' + id);
        tab.focus();
      },
      openDialog() {
        this.$refs.createDialog.$refs.dialog1.open()
      },
      getUsers() {
        axios.get(`/quotes?page=${this.page}&search=${this.search}`).then(({data}) => {
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
      deleteItem(id) {
        let self = this;
        swal({
          text: "¿Quieres eliminar esta cotización?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminalo'
        }).then(() => {
          axios.delete(`quotes/${id}`).then(() => {
            swal('Eliminado!', 'Cotización eliminada', 'success');
            this.getUsers();
          }).catch(() => {
            swal("Error", "Hubo un problema al borrar esta cotizacion", "error");
          });
        });
      },
      searchInput() {
        this.page = 1;
        this.getUsers();
        this.search = '';

      },
      next() {
        if (this.page < this.last_page || last_page === 0) {
          this.page++;
          this.getUsers();
        }
      },
      previous() {
        if (this.page > 1) {
          this.page--;
          this.getUsers();
        }
      },
      bill(id) {
        swal({
          title: "¿Estas seguro?",
          text: "Facturaras esta cotización",
          type: "warning",
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Si, facturar"
        }).then(() => {
          console.log('Funciona');
          axios.post(`/quotes/${id}/bill`).then(() => {
            swal('Éxito!', 'Facturado correctamente', 'success');
            this.getUsers();
          })
            .catch(() => swal("Error!", "Hubo problemas al facturar.", "error"));
        });

      }
    },
    created() {
      this.getUsers();
    }
  }
</script>