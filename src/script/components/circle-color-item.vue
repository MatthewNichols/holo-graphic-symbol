<template>
    <div class="circle-colors-item">
        <input type="color" ref="colorInput" :value="color" @change.stop="updateValue" >
        <button @click="removeItem">
            <svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                <line pointer-events="none" x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'CircleColorInput',
    props: {
        color: String
    },
    methods: {
        updateValue(event: InputEvent) {
            const newColor = (this.$refs.colorInput as HTMLInputElement).value;
            if (this.color !== newColor) {
                this.$emit("updateValue", this.color, newColor);
            }
        },
        removeItem() {
            this.$emit("removeItem", this.color);
        }
    }
})
</script>

<style lang="scss" scoped>
@import "../../style/standard-elements";

.circle-colors-item {
    box-sizing: border-box;
    margin: 2px;
    padding: 0 4px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    border: 1px solid #a2a2a2;
    
    &:hover {
        border: 1px solid scale-color($color: #a2a2a2, $lightness: -30%);
        background-color: scale-color($color: #a2a2a2, $lightness: -10%);
    }

    input[type="color"] {
        height: 44px;
    }

    button {
        @include button-base();
        padding: 5px;
        margin: 10px 5px 10px 10px;
        border: 1px solid #a2a2a2;
        outline: none;
        
        &:hover {
            border-radius: 100px;
            border: 1px solid scale-color($color: #a2a2a2, $lightness: -30%);
        }
    }
}
</style>