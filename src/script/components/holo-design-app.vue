<template>
    <div class="container">
      <numeric-range-input v-model.number="config.circleRadius" :min="50" :max="400" >Circle Radius</numeric-range-input>
      <button @click="rerunClick">Rerun</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { cloneDeep } from "lodash-es";

import { createDesignRenderer, render, clearData, getConfig } from "../drawing/holo-design-setup";
import NumericRangeInput from "./numeric-range-input.vue";

//If the animation runs against Vue's reactive copy then it runs slowly. Do a deep clone to strip out the reactivity for rendering
const createPlainCopyOfReactiveConfig = (reactiveConfig: any) => cloneDeep(reactiveConfig); 

export default Vue.extend({
  name: 'ControlPanelApp',
  data() {
    return { config: getConfig() } 
  },
  components: { NumericRangeInput },
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