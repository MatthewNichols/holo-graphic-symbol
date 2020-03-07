<template>
    <div class="container">
      <button @click="rerunClick">Rerun</button>

    </div>
</template>

<script lang="ts">
import Vue from "vue";

import { createDesignRenderer, render } from "../pages/canvas-page";

createDesignRenderer();
render();

export default Vue.extend({
  name: 'ControlPanelApp',
  methods: {
    rerunClick() {
      console.log("rerun");
      render();
      console.log("done")
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