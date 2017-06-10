<template>
  <md-dialog ref="dialog">
    <md-dialog-title>Editar usuario</md-dialog-title>

    <md-dialog-content>

      <form @submit.prevent="onSubmit">
        <md-input-container>
          <label>Nombre</label>
          <md-input v-model="row.name" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Email</label>
          <md-input v-model="row.email" name="email" required type="email"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Identificación</label>
          <md-select v-model="row.type" name="identidad" required>
            <md-option value="nit">Nit</md-option>
            <md-option value="cedula">Cédula</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label> {{ row.type ? row.type : 'Identificación' }}</label>
          <md-input required v-model="row.code"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Rol</label>
          <md-select required v-model="row.rol">
            <md-option value="admin">Administrador</md-option>
            <md-option value="vendedor">Vendedor</md-option>
          </md-select>
        </md-input-container>
      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="$refs.dialog.close()">Cancelar</md-button>
      <md-button class="md-primary" @click.native="onSubmit">Actualizar</md-button>
    </md-dialog-actions>

  </md-dialog>
</template>

<script>
  import axios from 'axios';
  import swal from 'sweetalert2';
  import clone from './../utils/clone';
  export default {
    data: () => ({
      row: {}
    }),
    methods: {
      open(user){
        this.row = clone(user);
        this.$refs.dialog.open();
      },
      onSubmit() {
        axios.put('/users/' + this.row.id, this.row).then(() => {
          swal('Correcto', 'Usuario actualizado correctamente', 'success');
          this.$refs.dialog.close();
          this.$emit('done');
        });
      }
    }
  }
</script>