<template>
  <md-dialog ref="dialog1">
    <md-dialog-title>Crear cliente</md-dialog-title>

    <md-dialog-content>

      <form @submit.prevent="onSubmit">
        <md-input-container>
          <label>Nombre/Razón social</label>
          <md-input v-model="client.name" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Apellido</label>
          <md-input v-model="client.surname"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Teléfono</label>
          <md-input v-model="client.phone"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Identificación</label>
          <md-select v-model="client.type" name="identidad" required>
            <md-option value="nit">Nit</md-option>
            <md-option value="cedula">Cédula</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label> {{ client.type ? client.type : 'Identificación' }}</label>
          <md-input required v-model="client.code"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Ciudad</label>
          <md-input v-model="client.city" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Dirección</label>
          <md-input v-model="client.address" required></md-input>
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
      client: {
        name: '',
        surname: '',
        address: '',
        type: '',
        code: '',
        city: '',
        phone: ''
      }
    }),
    methods: {
      onSubmit() {
        axios.post('/clients', this.client).then(() => {
          this.$emit('done');
          this.client = {name: '', surname: '', address: '', type: '', code: '', city: '', phone: '' };
          this.$refs.dialog1.close();
        });
      },
      open() {
        this.$refs.dialog1.open();
      }
    }
  }
</script>