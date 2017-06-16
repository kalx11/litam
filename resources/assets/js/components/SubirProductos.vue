<template lang="pug">
  md-dialog(ref="dialog", @close="reset")
    md-dialog-title Subir archivo
    md-dialog-content

      form(ref="form" enctype="multipart/form-data")
        md-input-container
          label Productos
          md-file(id="file" v-model="file" name="file" v-validate:file="'required'" data-vv-as="archivo")
      md-progress(v-show="progress", :md-progress="progress")
      span(v-show="errors.has('file')" class="help is-danger") {{ errors.first('file') }}

    md-dialog-actions
      md-button(class="md-primary", @click.native="close") Cancelar
      md-button(class="md-primary", @click.native="validateBeforeSubmit") Subir
</template>

<script>
  import axios from 'axios';
  import swal from 'sweetalert2';
  export default {
    data: () => ({
      file: '',
      progress: 0
    }),
    methods: {
      open() {
        this.$refs.dialog.open();
      },
      close() {
        this.$refs.dialog.close();
      },
      upload() {
        this.progress = 0;
        let form = new FormData(this.$refs.form);
        let config = {
          onUploadProgress: (progressEvent) => {
            this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        };
        axios.post('items/upload', form, config).then(() => {
          swal('Correcto', 'Archivo subido correctamente', 'success');
          this.$emit('done');
        }).catch(err => {
          if (err.response.status === 422) {
            swal('Error', 'El campo archivo debe ser de tipo csv, xls o xlsx', 'error');
          }
        });
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then(() => this.upload()).catch(() => {
        });
      },
      reset() {
        this.errors.clear();
        Object.assign(this.$data, this.$options.data());
      }
    },

  }
</script>