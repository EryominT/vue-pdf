<template>
  <header class="header">
    <div class="header__logo">MyApp</div>
    <el-dropdown trigger="click" class="header__profile">
      <span class="header__profile-name">Username</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">Выйти</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { key } from "@/store";
import { useRouter } from 'vue-router';

const store = useStore(key);
const router = useRouter();

async function logout() {
  await store.dispatch('auth/logout');
  router.push('/signin');
}

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  gap: 10px;
  justify-content: space-between;

  &__logo {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--color-title);
  }

  &__profile {
    display: flex;
    align-items: center;
  }

  &__profile-name {
    font-size: var(--font-size-lg);
    color: var(--color-title);
    cursor: pointer;
  }
}
</style>
