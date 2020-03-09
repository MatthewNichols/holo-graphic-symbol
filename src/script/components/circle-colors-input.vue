<template>
    <div class="circle-colors">
        <h3>Circle Colors</h3>
        <circle-color-item v-for="(color, index) in value" v-bind:key="index" 
                           :color="color" 
                           @updateValue="updateValue" 
                           @removeItem="removeItem"></circle-color-item>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import CircleColorItem from './circle-color-item.vue'

export default Vue.extend({
    name: "CircleColorsInput",
    props: {
        value: Array
    },
    components: {
        CircleColorItem
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
        }
    }
})
</script>

<style lang="scss" scoped>

h3 {
    margin-top: 0;
}
</style>