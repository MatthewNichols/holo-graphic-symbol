<template>
    <div class="circle-colors">
        <h3>Circle Colors</h3>
        <div class="color" v-for="(color, index) in value" v-bind:key="index">
            <input type="color" ref="colorInput" :value="color" @change="updateValue" >
            <button @click="removeItem" :value="color">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line pointer-events="none" x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "CircleColorsInput",
    props: {
        value: Array
    },
    methods: {
        updateValue(event: InputEvent) {
            const colors = (this.$refs.colorInput as HTMLInputElement[]).map((input) => input.value);
            this.$emit("input", colors);
        },
        removeItem(event: InputEvent) {
            const currentColors = (this.$refs.colorInput as HTMLInputElement[]).map((input) => input.value);
            const colorToRemove = (event.target as HTMLButtonElement).value;
            const newColors = currentColors.filter((color) => color !== colorToRemove);
            this.$emit("input", newColors);
        }
    }
})
</script>

<style lang="scss" scoped>
@import "../../style/standard-elements";

h3 {
    margin-top: 0;
}

.color {
    display: flex;
    align-items: center;

    button {
        @include button-base();

        // svg {
        //     pointer-events: none;
        // }
    }
}
</style>