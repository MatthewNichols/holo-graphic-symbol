<template>
    <div class="range-input">
        <label>
            <div class="label-value">
                <slot></slot>
            </div>
            <input type="range" ref="rangeInput" :value="value" @input="updateValue" :min="min" :max="max" />
        </label>
        <div class="input-value">
            {{this.value}}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "NumericRangeInput",
    props: {
        value: Number,
        min: Number,
        max: Number
    },
    methods: {
        updateValue(event: InputEvent) {
            this.$emit("input", (this.$refs.rangeInput as HTMLInputElement).value);
        }
    }
})
</script>

<style lang="scss" scoped>
.range-input {
    display: flex;

    .input-value {
        align-self: flex-end;
        padding: 4px 0;
        margin-left: 4px;
        border: 1px solid #555;
        box-shadow: 1px 1px 5px #555 inset;
        color: #555;
        width: 40px;
        text-align: center;
    }
}
</style>