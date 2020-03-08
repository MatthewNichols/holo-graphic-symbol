<template>
    <div class="circle-colors">
        <h3>Circle Colors</h3>
        <div class="color" v-for="(color, index) in value" v-bind:key="index">
            <input type="color" ref="colorInput" :value="color" @change="updateValue" >
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
            const colors = (this.$refs.colorInput as HTMLInputElement[]).map((input) => input.value)
            this.$emit("input", colors);
        }
    }
})
</script>

<style lang="scss" scoped>
h3 {
    margin-top: 0;
}
</style>