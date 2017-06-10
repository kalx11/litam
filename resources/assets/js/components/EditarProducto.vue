<template>
  <md-dialog ref="dialog">
    <md-dialog-title>Editar producto</md-dialog-title>

    <md-dialog-content>

      <form @submit.prevent="onSubmit">
        <md-input-container>
          <label>Nombre</label>
          <md-input v-model="row.name" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Descripción</label>
          <md-input v-model="row.description" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Cantidad</label>
          <md-input v-model.number="row.amount" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Precio</label>
          <md-input v-model.number="row.cost" required></md-input>
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
        axios.put('/items/' + this.row.id, this.row).then(() => {
          swal('Correcto', 'Producto actualizado correctamente', 'success');
          this.$refs.dialog.close();
          this.$emit('done');
        });
      }
    }
  }
</script>