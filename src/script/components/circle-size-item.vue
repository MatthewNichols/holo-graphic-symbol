<template>
    <div class="circle-size">
        <numeric-range-input class="range-input size" v-model.number="item.size" :min="1" :max="40">Size</numeric-range-input>
        <numeric-range-input class="range-input" v-model.number="item.weight" :min="1" :max="40">Weight</numeric-range-input>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NumericRangeInput from "./numeric-range-input.vue";

export default Vue.extend({
    name: "CircleSizeItem",
    props: {
        item: Object
    },
    components: { NumericRangeInput },
    methods: {

    }    
})
</script>

<style lang="scss" scoped>
.circle-size {
    display: flex;
    position: relative;
    border: 1px solid scale-color($color: #a2a2a2, $lightness: -30%);
    padding: 4px;
    padding-bottom: 0;
    margin: 2px 0;

    .range-input {
        width: 45%;
        flex-shrink: 1;

        &.size {
            margin-right: 20px;
        }
    }
}
</style>