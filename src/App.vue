<template>
  <component :is="currentLayout[layout]">
    <router-view/>
  </component>
  <Alert/>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from "vue-router";
import MainLayout from "@/layout/Main-layout.vue";
import SimpleLayout from "@/layout/Simple-layout.vue";
import Alert from '@/components/alert.vue';

const route = useRoute();
const layout = computed(():string => String(route.meta.layout));

const currentLayout: any = {
  mainLayout: MainLayout,
  simpleLayout: SimpleLayout,
}
</script>

<style lang="scss">
@import "./assets/styles/main";

#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100%;
  background-color: var(--color-bg-main);
}
</style>
