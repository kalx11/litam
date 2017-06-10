import Vue from 'vue';
import VueMaterial from 'vue-material';
import './bootstrap';
import 'sweetalert2/dist/sweetalert2.min.css';
import VeeValidate, { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es';

import Autocomplete from 'v-autocomplete'

Vue.use(Autocomplete);
Validator.addLocale(es);
Vue.use(VueMaterial);
Vue.use(VeeValidate, {locale: 'es'});
Vue.component('users', () => System.import('./components/Usuarios.vue'));
Vue.component('productos', () => System.import('./components/Productos.vue'));
Vue.component('clients', () => System.import('./components/Clientes.vue'));
Vue.component('cotizaciones', () => System.import('./components/Cotizaciones.vue'));

const app = new Vue({
    el: '#app'
});


