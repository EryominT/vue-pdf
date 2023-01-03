<template>
  <div class="main-layout">
    <Notice v-if="!isActivated" text="подтвердите email" class="main-layout__notice"/>
    <div class="main-layout__header">
      <Header/>
    </div>
    <div class="main-layout__content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
import Notice from "@/components/Notice.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
const store = useStore(key);
const isActivated = ref(true)

onMounted(async () => {
  await store.dispatch('auth/checkAuth');
  isActivated.value = store.getters['auth/user'].isActivated;
})

</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.main-layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  &__header {
    height: var(--header-height);
    padding: 40px 50px 0;
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: var(--dashboard-p-top) 50px var(--dashboard-p-bottom);

    @media (max-width: $media-md) {
      padding: 20px 15px 20px;
    }
  }

  &__notice {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>