import Vue from 'vue';
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css'

import ControlPanelApp from '../components/holo-design-app.vue';

Vue.use(Vuetify);

new Vue({
    el: '#control-panel',
    vuetify: new Vuetify(),
    render: createElement => createElement(ControlPanelApp) 
});