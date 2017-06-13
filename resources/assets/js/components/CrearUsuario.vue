<template>
  <md-dialog ref="dialog1">
    <md-dialog-title>Crear usuario</md-dialog-title>

    <md-dialog-content>

      <form @submit.prevent="onSubmit">
        <md-input-container :class="{ 'md-input-invalid': errors.has('name') }">
          <label>Nombre</label>
          <md-input v-model="user.name" data-vv-name="name" name="name"  v-validate="'required'" data-vv-as="nombre" required></md-input>
          <span v-show="errors.has('name')" class="md-error"> {{ errors.first('name') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('email') }">
          <label>Email</label>
          <md-input v-model="user.email" name="email" data-vv-name="email" v-validate="'required|email|litam'"  required type="email"></md-input>
          <span v-show="errors.has('email')" class="md-error"> {{ errors.first('email') }} </span>
        </md-input-container>
        <md-input-container md-has-password :class="{ 'md-input-invalid': errors.has('password') }">
          <label>Contraseña</label>
          <md-input v-model="user.password" name="password" data-vv-name="password" v-validate="'required'" data-vv-as="contraseña" required type="password"></md-input>
          <span v-show="errors.has('password')" class="md-error"> {{ errors.first('password') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('type') }">
          <label>Identificación</label>
          <md-select v-model="user.type" name="type" data-vv-name="type" data-vv-as="identificacion" v-validate="'required'"  required>
            <md-option value="nit">Nit</md-option>
            <md-option value="cedula">Cédula</md-option>
          </md-select>
          <span v-show="errors.has('type')" class="md-error"> {{ errors.first('type') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('code') } ">
            <label> {{ user.type ? user.type : 'Identificación' }}</label>
            <md-input required v-model="user.code" name="code" data-vv-name="code" data-vv-as="codigo" v-validate="'required'"></md-input>
          <span v-show="errors.has('code')" class="md-error"> {{ errors.first('code') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('rol') }">
          <label>Rol</label>
          <md-select required v-model="user.rol" name="rol" data-vv-name="rol" v-validate="'required'" data-vv-as="rol">
            <md-option value="Admin">Administrador</md-option>
            <md-option value="Vendedor">Vendedor</md-option>
          </md-select>
          <span v-show="errors.has('rol')" class="md-error"> {{ errors.first('rol') }} </span>
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
  import { Validator } from 'vee-validate';
  import axios from 'axios';
  export default {
    data: () => ({
      user: {
        name: '',
        email: '',
        password: '',
        type: '',
        code: '',
        rol: ''
      }
    }),
    methods: {
      onSubmit() {
        axios.post('/users', this.user).then(() => {
          this.$refs.dialog1.close();
          this.$emit('done');
        });
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then(() => {
          this.onSubmit();
        }).catch(() => {});
      }
    },
    created() {
      Validator.extend('litam', {
        getMessage: field => `Èl campo ${field} no termina en @litam.com.co`,
        validate: value => {
          const pattern = /^([a-z0-9_\.-]+)@(litam\.com\.co)$/;
          return pattern.test(value);
        }
      })
    }
  }
</script>