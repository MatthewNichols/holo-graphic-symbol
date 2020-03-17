<template>
    <div class="ui-grouping">
        <h3>
            <slot name="name"></slot>
            <button @click="toggleState">
                <svg v-if="!showing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                <svg v-if="showing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
        </h3>

        <transition name="fade">
            <div class="ui-grouping-contents" v-if="showing">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'UiGrouping',
    data() {
        return {
            showing: false
        };
    },
    methods: {
        toggleState(): void {
            this.showing = !this.showing
        }
    }
})
</script>

<style lang="scss" scoped>

</style>