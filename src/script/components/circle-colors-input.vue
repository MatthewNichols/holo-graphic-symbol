<template>
    <div>
        <ui-grouping>
            <template v-slot:name>Circle Colors</template>

            <div  class="circle-colors">
                <circle-color-item  v-for="(color, index) in value" v-bind:key="index" 
                                :color="color" 
                                @updateValue="updateValue" 
                                @removeItem="removeItem"></circle-color-item>
                
            </div>
            <button @click="addNewColor">Add New Color</button>
        </ui-grouping>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import CircleColorItem from './circle-color-item.vue'
import UiGrouping from "./ui-grouping.vue";

function getRandomColor() {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); // pad with zero
  }
  return "#"+c()+c()+c();
}

export default Vue.extend({
    name: "CircleColorsInput",
    props: {
        value: Array
    },
    components: {
        CircleColorItem, UiGrouping
    },
    methods: {
        updateValue(oldColor: string, newColor: string) {
            const colorIndex = this.value.indexOf(oldColor);
            const newColors = [...this.value];
            newColors[colorIndex] = newColor;
            this.$emit("input", newColors);
        },
        removeItem(colorToRemove: string) {
            const currentColors = this.value;
            const newColors = currentColors.filter((color) => color !== colorToRemove);
            this.$emit("input", newColors);
        },
        addNewColor() {
            const newColor = getRandomColor();
            const newColors = [...this.value, newColor];
            this.$emit("input", newColors);
        }
    }
})
</script>

<style lang="scss" scoped>
@import "../../style/standard-elements";

h3 {
    margin: 0;
    margin-bottom: 5px;
}

.circle-colors {
    display: flex;
    flex-wrap: wrap;
}

button {
    @include button-base($border-radius: 4px);
    margin-top: 4px;
    margin-left: 8px;
    border: 2px solid scale-color($color: #a2a2a2, $lightness: -30%);
}
</style>