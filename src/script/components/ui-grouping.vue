<template>
    <div class="ui-grouping">
        <button @click="toggleState" title="Click to show/hide controls.">
            <h3>
                <slot name="name"></slot>
                <svg v-if="!showing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                <svg v-if="showing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </h3>
        </button>

        <transition name="slide">
            <div class="ui-grouping-contents" v-if="showing">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
@import "../../style/standard-elements";

button {
    @include button-base();
    display: flex;
    width: 100%;
    padding: 0 4px;

    h3 {
        display: flex;
        width: 100%;

        svg {
            margin-left: auto;
        }
    }
}

.slide-enter-active, .slide-leave-active {
  overflow: hidden;
  transition: line-height .5s ease, opacity .25s;
  line-height: 1;
  opacity: 1;
}
.slide-enter-from, .slide-leave-to {
  line-height: 0;
  opacity: 0;
}

</style>