<template>
  <md-dialog ref="dialog">
    <md-dialog-title>Editar cliente</md-dialog-title>

    <md-dialog-content>
      <form @submit.prevent="onSubmit">
        <md-input-container>
          <label>Nombre/Razón social</label>
          <md-input v-model="row.name" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Apellido</label>
          <md-input v-model="row.surname"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Correo electrónico</label>
          <md-input v-model="row.email"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Télefono</label>
          <md-input v-model="row.phone"></md-input>
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
          <label>Ciudad</label>
          <md-input v-model="row.city" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Dirección</label>
          <md-input v-model="row.address" required></md-input>
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
      open(model){
        this.row = clone(model);
        this.$refs.dialog.open();
      },
      onSubmit() {
        axios.put('/clients/' + this.row.id, this.row).then(() => {
          swal('Correcto', 'Cliente actualizado correctamente', 'success');
          this.$refs.dialog.close();
          this.$emit('done');
        }).catch( () => {
          swal('Error', 'Problema al actualizar el cliente', 'error');
        });
      }
    }
  }
</script>