<template>
  <div>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ total }}</strong> clientes
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" v-model="search" type="text" placeholder="Encuentra a un cliente">
            </p>
            <p class="control">
              <button @click.prevent="searchInput()" class="button">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="reload()">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                <md-tooltip md-direction="top">Refrescar clientes</md-tooltip>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="openDialog">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <md-tooltip md-direction="top">Añadir cliente</md-tooltip>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="isEditing = !isEditing">
                <i class="fa" :class="isEditing ? 'fa-pencil-square' : 'fa-pencil-square-o'" aria-hidden="true"></i>
                <md-tooltip md-direction="top">Editar fila</md-tooltip>
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
          <md-table-head>Nombre/Razón social</md-table-head>
          <md-table-head>Apellido</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Nit/Cédula</md-table-head>
          <md-table-head>Teléfono</md-table-head>
          <md-table-head>Ciudad</md-table-head>
          <md-table-head>Dirección</md-table-head>
          <md-table-head v-show="isEditing"></md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, index) in clients" :key="index">
          <md-table-cell md-numeric>{{ row.id }}</md-table-cell>
          <md-table-cell>{{ row.name }}</md-table-cell>
          <md-table-cell>{{ row.surname }}</md-table-cell>
          <md-table-cell>{{ row.email }}</md-table-cell>
          <md-table-cell>{{ row.code }}</md-table-cell>
          <md-table-cell>{{ row.phone }}</md-table-cell>
          <md-table-cell>{{ row.city }}</md-table-cell>
          <md-table-cell>{{ row.address }}</md-table-cell>
          <md-table-cell v-show="isEditing">
            <md-menu>
              <md-button md-menu-trigger class="md-icon-button"><i class="fa fa-pencil" aria-hidden="true"></i>
              </md-button>
              <md-menu-content>
                <md-menu-item @click.native.prevent="$refs.editClient.open(row)">Editar</md-menu-item>
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
            <md-button @click.native.prevent="previous" :disabled="page<=1" class="button"><i class="fa fa-angle-double-left"></i></md-button>
          </p>
          <p class="control">
            <md-button :disabled="page >= last_page || last_page === 0" @click.native.prevent="next" class="button"><i class="fa fa-angle-double-right"></i></md-button>
          </p>
        </div>
      </div>
    </nav>
    <clients-create @done="getUsers" ref="createDialog"></clients-create>
    <clients-edit @done="getUsers" ref="editClient"></clients-edit>
  </div>
</template>

<script>
  import axios from 'axios';
  import { default as swal } from 'sweetalert2';

  export default {
    components: {
      'clients-create': () => System.import('./CrearCliente.vue'),
      'clients-edit': () => System.import('./EditarCliente.vue'),
    },
    data: () => ({
      clients: {},
      total: 0,
      page: 1,
      last_page: 1,
      search: '',
      isEditing: false
    }),
    methods: {
      openDialog() { this.$refs.createDialog.open() },
      getUsers() {
        axios.get(`/clients?page=${this.page}&search=${this.search}`).then(({data}) => {
          this.search = '';
          this.clients = data.data;
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
          text: "¿Quieres eliminar este cliente?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminalo'
        }).then(function () {
          axios.delete(`clients/${id}`).then(() => {
            swal('Deleted!', 'Cliente eliminado', 'success');
            self.getUsers();
          });
        });
      },
      searchInput() {
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