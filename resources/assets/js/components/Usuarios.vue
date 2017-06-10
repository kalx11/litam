<template>
  <div>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ total }}</strong> usuarios
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input v-model="search" class="input" type="text" placeholder="Encuentra a un usuario">
            </p>
            <p class="control">
              <button class="button" @click.prevent="goSearch">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </p>
            <p class="control">
              <button class="button" @click.prevent="getUsers()">
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
          </div>
        </div>
      </div>
    </nav>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head md-numeric>#</md-table-head>
          <md-table-head>Nombre</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Cedula/Nit</md-table-head>
          <md-table-head>Rol</md-table-head>
          <md-table-head v-show="isEditing"></md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, index) in users" :key="index">
          <md-table-cell md-numeric>{{ row.id }}</md-table-cell>
          <md-table-cell>{{ row.name }}</md-table-cell>
          <md-table-cell>{{ row.email }}</md-table-cell>
          <md-table-cell>{{ row.code }}</md-table-cell>
          <md-table-cell><span class="tag"
                               :class="row.rol == 'admin' ? 'is-danger' : 'is-info'">{{ row.rol
            }}</span></md-table-cell>
          <md-table-cell  v-show="isEditing">
          <md-menu>
            <md-button md-menu-trigger class="md-icon-button"><i class="fa fa-pencil" aria-hidden="true"></i>
            </md-button>

            <md-menu-content>
              <md-menu-item @click.native.prevent="$refs.editUser.open(row)">Editar</md-menu-item>
              <md-menu-item @click.native.prevent="deleteUser(row.id)">Borrar</md-menu-item>
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
    <users-create ref="createDialog" @done="getUsers"></users-create>
    <users-edit @done="getUsers" ref="editUser"></users-edit>
  </div>
</template>

<script>
  import axios from 'axios';
  import { default as swal } from 'sweetalert2';
  export default {
    components: {
      'users-create': () => System.import('./CrearUsuario.vue'),
      'users-edit': () => System.import('./EditarUsuario.vue')
    },
    data: () => ({
      users: {},
      total: 0,
      page: 1,
      last_page: 1,
      search: '',
      isEditing: false
    }),
    methods: {
      openDialog() { this.$refs.createDialog.$refs.dialog1.open() },
      getUsers() {
        axios.get(`/users?search=${this.search}&page=${this.page}`).then(({data}) => {
          this.users = data.data;
          this.total = data.total;
          this.page = data.current_page;
          this.last_page = data.last_page;
        });
      },
      deleteUser(id) {
        let self = this;
        swal({
          text: "¿Quieres eliminar a este usuario?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminalo'
        }).then(function () {
          axios.delete(`users/${id}`).then(() => {
            swal('Deleted!', 'Usuario eliminado', 'success');
            self.getUsers();
          });
        });
      },
      goSearch() {
        this.getUsers();
      },
      next() {
        if(this.page<this.last_page || this.last_page == 0) {
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