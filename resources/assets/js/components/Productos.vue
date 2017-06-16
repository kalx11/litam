<template>
  <div>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ total }}</strong> productos
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" v-model="search" type="text" placeholder="Encuentra un producto">
            </p>
            <p class="control">
              <button @click.prevent="searchInput()" class="button">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="reload()">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                <md-tooltip md-direction="top">Refrescar productos</md-tooltip>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="dialog('createDialog')">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <md-tooltip md-direction="top">Agregar producto</md-tooltip>
              </button>
            </p>
            <p class="control">
              <md-ink-ripple />
              <button class="button" @click.prevent="isEditing = !isEditing">
                <md-tooltip md-direction="top">Editar fila</md-tooltip>
                <i class="fa" :class="isEditing ? 'fa-pencil-square' : 'fa-pencil-square-o'" aria-hidden="true"></i>
              </button>
            </p>
            <p class="control">
              <md-ink-ripple />
              <button class="button" @click.prevent="dialog('upload')">
                <i class="fa fa-paperclip" aria-hidden="true"></i>
                <md-tooltip md-direction="top">Subir productos con archivo excel</md-tooltip>
              </button>
            </p>
            <p class="control">
              <md-ink-ripple />
              <button class="button" @click.prevent="downloadFormat">
                <i class="fa fa-download" aria-hidden="true"></i>
                <md-tooltip md-direction="top">Descargar formato</md-tooltip>
              </button>
            </p>
          </div>
        </div>
      </div>
    </nav>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head md-numeric>#</md-table-head>
          <md-table-head>Nombre</md-table-head>
          <md-table-head>Descripción</md-table-head>
          <md-table-head>Cantidad</md-table-head>
          <md-table-head>Precio</md-table-head>
          <md-table-head v-show="isEditing"></md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, index) in items" :key="index">
          <md-table-cell md-numeric>{{ row.id }}</md-table-cell>
          <md-table-cell>{{ row.name }}</md-table-cell>
          <md-table-cell>{{ row.description }}</md-table-cell>
          <md-table-cell>{{ row.amount }}</md-table-cell>
          <md-table-cell>{{ row.cost | currency }}</md-table-cell>
          <md-table-cell v-show="isEditing">
            <md-menu>
              <md-button md-menu-trigger class="md-icon-button"><i class="fa fa-pencil" aria-hidden="true"></i>
              </md-button>

              <md-menu-content>
                <md-menu-item @click.native.prevent="$refs.editItem.open(row)">Editar</md-menu-item>
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
    <items-create @done="getUsers" ref="createDialog"></items-create>
    <items-edit @done="getUsers" ref="editItem"></items-edit>
    <excel-upload @done="getUsers" ref="upload"></excel-upload>
  </div>
</template>

<script>
  import axios from 'axios';
  import {default as swal} from 'sweetalert2';
  import accounting from 'accounting';

  export default {
    components: {
      'items-create': () => System.import('./CrearProducto.vue'),
      'items-edit': () => System.import('./EditarProducto.vue'),
      'excel-upload': () => System.import('./SubirProductos.vue'),
    },
    data: () => ({
      items: {},
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
      dialog(name) {
        this.$refs[name].open();
      },
      getUsers() {
        axios.get(`/items?page=${this.page}&search=${this.search}`).then(({data}) => {
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
          text: "¿Quieres eliminar este producto?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminalo'
        }).then(function () {
          axios.delete(`items/${id}`).then(() => {
            swal('Deleted!', 'Producto eliminado', 'success');
            self.getUsers();
          });
        });
      },
      searchInput() {
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
      downloadFormat() {
        open('formato.xls');
      }
    },
    created() {
      this.getUsers();
    }
  }
</script>