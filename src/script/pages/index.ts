import Vue from 'vue';
import ControlPanelApp from '../components/holo-design-app.vue';

Vue.config.productionTip = false;

new Vue({
    el: '#control-panel',
    render: (createElement: any) => createElement(ControlPanelApp) 
});