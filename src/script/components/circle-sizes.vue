<template>
    <div class="circle-colors">
        <ui-grouping>
            <template v-slot:name>
                <slot>Circle Sizes</slot>
            </template>
            <circle-size-item v-for="item in sizes" :key="item.size" :item="item" ></circle-size-item>
        </ui-grouping>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import CircleSizeItem from "./circle-size-item.vue";
import UiGrouping from "./ui-grouping.vue";

export default Vue.extend({
    name: "CircleSizes",
    props: {
        sizes: Array
    },
    components: { CircleSizeItem, UiGrouping },
    methods: {

    }    
})
</script>

<style lang="scss" scoped>
.circle-colors {
    margin-bottom: 10px;

    h3 {
        margin: 0;
        margin-bottom: 5px;
    }
}
</style>