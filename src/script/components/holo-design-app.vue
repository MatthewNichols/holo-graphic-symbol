<template>
    <div class="container">
      <header>
        <button class="reset" @click="resetClick">Reset</button>
        <div class="messageToUser" v-if="messageToUser" @click="cancelMessage">{{messageToUser}}</div>
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
        
        <h3>
          Number of Drawing attempts 
        </h3>        
        <p>How many random placements of circles are attempted in each part of the drawing? Overlaps are not allowed so some fail. As will be clear this has an impact on performance.</p>
        <numeric-range-input v-model.number="config.mainCircleNumberOfAttempts" :min="0" :max="10000" >Circle</numeric-range-input>
        <numeric-range-input v-model.number="config.haloNumberOfAttempts" :min="0" :max="10000" >Halo</numeric-range-input>
        <numeric-range-input v-model.number="config.burstNumberOfAttempts" :min="0" :max="10000" >Burst</numeric-range-input>
      </div>

      <div class="column-2">
        <circle-colors-input v-model="config.circleColors"></circle-colors-input>

        <h3>Other Colors</h3>
        
        <label>
          Background:
          <input type="color" v-model="config.canvasBackgroundColor">
        </label>
        
        <label>
          Logo:
          <input type="color" v-model="config.logoColor">
        </label>

      </div>

      <div class="column-3">
        <circle-sizes :sizes="config.mainCircleSizes">Main Circle Sizes</circle-sizes>
        <circle-sizes :sizes="config.haloCircleSizes">Halo Circle Sizes</circle-sizes>
      </div>

      <footer>
        <button class="reset" @click="resetClick">Reset</button>
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
    let messageToUser = "";
    const savedConfigStr = window.localStorage.getItem("saved-config");
    if (savedConfigStr) {
      var savedConfig = JSON.parse(savedConfigStr);
      messageToUser = "Your previous data is restored from localStorage. Click Reset if you want to start fresh."
    }
    return { 
      config: savedConfig || getConfig(),
      messageToUser
    } 
  },
  components: { NumericRangeInput, CircleColorsInput, CircleSizes },
  created() {
    createDesignRenderer(createPlainCopyOfReactiveConfig(this.config));
    render();
  },
  methods: {
    rerunClick() {
      createDesignRenderer(createPlainCopyOfReactiveConfig(this.config));
      clearData();
      render();
    },
    resetClick() {
      this.config = getConfig();
      //Need to take this out of the flow so that it happens after the config watcher fires
      setInterval(() => window.localStorage.removeItem("saved-config"));
    },
    cancelMessage() {
      this.messageToUser = "";
    }
  },
  watch: {
    config: {
      deep: true,

      handler(newVal, oldVal) {
        window.localStorage.setItem("saved-config", JSON.stringify(newVal));
      }
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
    margin-bottom: 40px;

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

      .messageToUser {
        background-color: #fff;
        padding: 4px 8px;
        border-radius: 10px;
        box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
      }
  }

  .column-2 {
    grid-area: col-2;
    padding: 0 25px;

    label {
      display: inline-flex;
      align-items: center;
      
      input[type="color"] {
          height: 44px;
          margin: 0 8px;
      }
    }
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
    justify-content: space-between;
    padding: 5px 0 15px 0;

    button {
      @include button-base(rgba(#1497A2, 0.5));
    }
  }
}
</style>