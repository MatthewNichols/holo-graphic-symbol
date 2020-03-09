<template>
    <div>
        <h3>
            <slot>Circle Sizes</slot>
        </h3>
        <circle-size-item v-for="item in sizes" :key="item.size" :item="item" ></circle-size-item>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import CircleSizeItem from "./circle-size-item.vue";

export default Vue.extend({
    name: "CircleSizes",
    props: {
        sizes: Array
    },
    components: { CircleSizeItem },
    methods: {

    }    
})
</script>

<style lang="scss" scoped>

</style>