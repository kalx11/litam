<template>
  <md-dialog ref="dialog1">
    <md-dialog-title>Crear cliente</md-dialog-title>

    <md-dialog-content>

      <form @submit.prevent="onSubmit">
        <md-input-container :class="{ 'md-input-invalid': errors.has('name') }">
          <label>Nombre/Razón social</label>
          <md-input v-model="client.name" data-vv-name="name" name="name"  v-validate="'required'" data-vv-as="nombre" required></md-input>
          <span v-show="errors.has('name')" class="md-error"> {{ errors.first('name') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('surname') }">
          <label>Apellido</label>
          <md-input v-model="client.surname" data-vv-name="surname" name="surname"  v-validate="'required'" data-vv-as="apellido"></md-input>
          <span v-show="errors.has('surname')" class="md-error"> {{ errors.first('surname') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('email') }">
          <label>Correo electrónico</label>
          <md-input v-model="client.email" data-vv-name="email" name="email"  v-validate="'required|email'" data-vv-as="correo electrónico"></md-input>
          <span v-show="errors.has('email')" class="md-error"> {{ errors.first('email') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('phone') }">
          <label>Teléfono</label>
          <md-input v-model="client.phone" data-vv-name="phone" name="phone"  v-validate="'required|numeric'" data-vv-as="telefono"></md-input>
          <span v-show="errors.has('phone')" class="md-error"> {{ errors.first('phone') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('type') }">
          <label>Identificación</label>
          <md-select v-model="client.type" data-vv-name="type" name="type"  v-validate="'required'" data-vv-as="identidad" required>
            <md-option value="nit">Nit</md-option>
            <md-option value="cedula">Cédula</md-option>
          </md-select>
          <span v-show="errors.has('type')" class="md-error"> {{ errors.first('type') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('code') }">
          <label> {{ client.type ? client.type : 'Identificación' }}</label>
          <md-input required v-model="client.code" data-vv-name="code" name="code"  v-validate="'required'" data-vv-as="código"></md-input>
          <span v-show="errors.has('code')" class="md-error"> {{ errors.first('code') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('city') }">
          <label>Ciudad</label>
          <md-input v-model="client.city" data-vv-name="city" name="city"  v-validate="'required'" data-vv-as="ciudad" required></md-input>
          <span v-show="errors.has('city')" class="md-error"> {{ errors.first('city') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('address') }">
          <label>Dirección</label>
          <md-input v-model="client.address" data-vv-name="address" name="address"  v-validate="'required'" data-vv-as="dirección" required></md-input>
          <span v-show="errors.has('address')" class="md-error"> {{ errors.first('address') }} </span>
        </md-input-container>
      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="$refs.dialog1.close()">Cancelar</md-button>
      <md-button class="md-primary" @click.native="validateBeforeSubmit">Crear</md-button>
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
        email: '',
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
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then(() => {
          this.onSubmit();
        }).catch(() => {

        });
      }
    }
  }
</script>