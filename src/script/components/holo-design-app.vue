<template>
    <div class="container">
      <input type="number" v-model.number="config.circleRadius" >
      <button @click="rerunClick">Rerun</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { cloneDeep } from "lodash";

import { createDesignRenderer, render, clearData, getConfig } from "../drawing/holo-design-setup";

//If the animation runs against Vue's reactive copy then it runs slowly. Do a deep clone to strip out the reactivity for rendering
const createPlainCopyOfReactiveConfig = (reactiveConfig: any) => cloneDeep(reactiveConfig); 

export default Vue.extend({
  name: 'ControlPanelApp',
  data() {
    return { config: getConfig() } 
  },
  created() {
    createDesignRenderer(createPlainCopyOfReactiveConfig(this.config));
    render();
  },
  methods: {
    rerunClick() {
      console.log("rerun", createPlainCopyOfReactiveConfig(this.config));
      createDesignRenderer(createPlainCopyOfReactiveConfig(this.config));
      clearData();
      render();
      console.log("rerun done")
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../style/standard-elements";

.container {
    box-sizing: border-box;
    background-color: #a2a2a2;
    width: 100%;
    max-width: 1000px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}

button {
  @include button-base(rgba(#1497A2, 0.5));
}

</style>