import Vue from 'vue';

import ControlPanelApp from '../components/holo-design-app.vue';

new Vue({
    el: '#control-panel',
    render: (createElement: any) => createElement(ControlPanelApp) 
});