<template>
  <md-dialog ref="dialog1">
    <md-dialog-title>Crear producto</md-dialog-title>

    <md-dialog-content>

      <form @submit.prevent="onSubmit">
        <md-input-container>
          <label>Nombre</label>
          <md-input v-model="item.name" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Descripción</label>
          <md-input v-model="item.description" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Cantidad</label>
          <md-input v-model.number="item.amount" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Precio</label>
          <md-input v-model.number="item.cost" required></md-input>
        </md-input-container>

      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="$refs.dialog1.close()">Cancelar</md-button>
      <md-button class="md-primary" @click.native="onSubmit">Crear</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      item: {
        name: '',
        amount: 0,
        cost: 0,
        description: ''
      }
    }),
    methods: {
      onSubmit() {
        axios.post('/items', this.item).then(() => {
          this.$emit('done');
          this.item = {name: '', amount: 0, cost: 0, description: ''};
          this.$refs.dialog1.close();
        });
      }
    }
  }
</script>