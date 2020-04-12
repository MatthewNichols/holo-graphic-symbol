import Vue from 'vue';
import VueCompositionApi from "@vue/composition-api";
import ControlPanelApp from '../components/holo-design-app.vue';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
    el: '#control-panel',
    render: (createElement: any) => createElement(ControlPanelApp) 
});