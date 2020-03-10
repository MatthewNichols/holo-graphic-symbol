<template>
    <div class="container">
      <header>
        <button class="run" @click="rerunClick">Rerun</button>
      </header>

      <div class="column-1">
        <h3>
          Display Dimensions
        </h3>        
        
        <numeric-range-input v-model.number="config.circleRadius" :min="50" :max="400" >Circle Radius</numeric-range-input>
        <numeric-range-input v-model.number="config.haloThickness" :min="0" :max="300" >Halo Thickness</numeric-range-input>
        <numeric-range-input v-model.number="config.burstThickness" :min="0" :max="300" >Burst Thickness</numeric-range-input>
        <numeric-range-input v-model.number="config.gapToHalo" :min="0" :max="300" >Gap between Circle and Halo</numeric-range-input>
      </div>

      <div class="column-2">
        <circle-colors-input v-model="config.circleColors"></circle-colors-input>
      </div>

      <div class="column-3">
        <circle-sizes :sizes="config.mainCircleSizes">Main Circle Sizes</circle-sizes>
        <circle-sizes :sizes="config.haloCircleSizes">Halo Circle Sizes</circle-sizes>
      </div>

      <footer>
        <button class="run" @click="rerunClick">Rerun</button>
      </footer>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { cloneDeep } from "lodash-es";

import { createDesignRenderer, render, clearData, getConfig } from "../drawing/holo-design-setup";
import NumericRangeInput from "./numeric-range-input.vue";
import CircleColorsInput from "./circle-colors-input.vue";
import CircleSizes from "./circle-sizes.vue";

//If the animation runs against Vue's reactive copy then it runs slowly. Do a deep clone to strip out the reactivity for rendering
const createPlainCopyOfReactiveConfig = (reactiveConfig: any) => cloneDeep(reactiveConfig); 

export default Vue.extend({
  name: 'ControlPanelApp',
  data() {
    return { config: getConfig() } 
  },
  components: { NumericRangeInput, CircleColorsInput, CircleSizes },
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
    position: relative;
    box-sizing: border-box;
    background-color: #a2a2a2;
    width: 100%;
    max-width: 1000px;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);

    display: grid;
    grid: [row1-start] "header header header" auto [row1-end]
          [row2-start] "col-1 col-2 col-3" 1fr [row2-end]
          [row3-start] "footer footer footer" auto [row3-end]
          / 300px auto 250px;

  .column-1 {
    grid-area: col-1;

    h3 {
      margin-top: 0;
    }
  }

  header {
      grid-area: header;
  }

  .column-2 {
    grid-area: col-2;
    padding: 0 5px;
  }

  .column-3 {
    grid-area: col-3;
    padding: 0 5px;
  }

  footer {
      grid-area: footer;
  }

  footer, header {
    display: flex;
    padding: 5px;

    button {
      @include button-base(rgba(#1497A2, 0.5));

      &.run {
        margin-left: auto;
      }
    }
  }
}
</style>