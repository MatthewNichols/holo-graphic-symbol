<template>
    <div>
        <numeric-range-input v-model.number="item.size" :min="1" :max="40">Size</numeric-range-input>
        <numeric-range-input v-model.number="item.weight" :min="1" :max="40">Weight</numeric-range-input>
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

</style>