<template>
    <div class="range-input">
        <label>
            <div class="label-value">
                <slot></slot>
            </div>
            <input type="range" ref="rangeInput" :value="modelValue" @input="updateValue" :min="min" :max="max" />
        </label>
        <div class="input-value">
            {{modelValue}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "NumericRangeInput",
    emits: ["update:modelValue"],
    props: {
        modelValue: Number,
        min: Number,
        max: Number
    },
    methods: {
        updateValue(event: InputEvent) {
            this.$emit("update:modelValue", (this.$refs.rangeInput as HTMLInputElement).value);
        }
    }
})
</script>

<style lang="scss" scoped>
.range-input {
    display: flex;
    margin-bottom: 8px;

    label {
        display: flex;
        flex-direction: column;
        width: calc(100% - 45px);
    }

    input[type="range"] {
        margin-right: 5px;
    }

    .input-value {
        align-self: flex-end;
        padding: 4px 0;
        box-sizing: border-box;
        margin-left: auto;
        border: 1px solid #555;
        box-shadow: 1px 1px 5px #555 inset;
        color: #555;
        width: 40px;
        text-align: center;
        flex-shrink: 0;
    }
}
</style>