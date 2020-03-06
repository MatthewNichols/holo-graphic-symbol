<template>
    <v-app>
      <v-content>
        <v-container>
          <v-btn @click="rerunClick">Rerun</v-btn>
        </v-container>
      </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: 'ControlPanelApp',
  methods: {
    rerunClick() {
      console.log("rerun");
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  color: green;
}
</style>