<template>
  <md-dialog ref="dialog1">
    <md-dialog-title>Crear producto</md-dialog-title>

    <md-dialog-content>

      <form @submit.prevent="onSubmit">
        <md-input-container :class="{ 'md-input-invalid': errors.has('name') }">
          <label>Nombre</label>
          <md-input v-model="item.name" data-vv-name="name" name="name"  v-validate="'required'" data-vv-as="nombre" required></md-input>
          <span v-show="errors.has('name')" class="md-error"> {{ errors.first('name') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('description') }">
          <label>Descripción</label>
          <md-input v-model="item.description" data-vv-name="description" name="description"  v-validate="'required'" data-vv-as="descripción" required></md-input>
          <span v-show="errors.has('description')" class="md-error"> {{ errors.first('description') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('amount') }">
          <label>Cantidad</label>
          <md-input v-model.number="item.amount" data-vv-name="amount" name="amount"  v-validate="'required|decimal:2|not_in:0'" data-vv-as="cantidad" required></md-input>
          <span v-show="errors.has('amount')" class="md-error"> {{ errors.first('amount') }} </span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': errors.has('cost') }">
          <label>Precio</label>
          <md-input v-model.number="item.cost" data-vv-name="cost" name="cost"  v-validate="'required|decimal:2|not_in:0'" data-vv-as="precio" required></md-input>
          <span v-show="errors.has('cost')" class="md-error"> {{ errors.first('cost') }} </span>
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