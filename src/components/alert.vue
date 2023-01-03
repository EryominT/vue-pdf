<template>
  <div v-if="alerts && alerts.length" class="alert">
    <div v-for="alert in alerts" :key="alert.id" class="alert__item">
      <el-alert type="error" :closable="!alert.critical" class="alert__content">
        <div>{{ alert.text }}</div>
        <div v-if="alert.critical" class="alert__critical-message">
          Необходимо <a href="#" @click="reloadPage">перезагрузить страницу</a>
        </div>
      </el-alert>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MessageAlertInterface } from "@/interfaces/alert.interface";
import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);
const alerts = computed(() => store.getters['alerts/all'] );

function reloadPage() {
  window.location.reload();
}
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  width: 100%;
  color: #fff;
  z-index: 10;

  &__item {
    display: flex;
    flex-direction: column;
  }

  &__content {
    padding: 8px 16px;
    background-color: var(--color-danger-alert);
    box-shadow: 0 0 4px 1px #000;
  }

  &__critical-message {
    margin-top: 10px;

    a {
      color: inherit;
    }
  }

  .el-alert--error.is-light {
    color: #fff;
    background-color: var(--color-danger-alert);
  }

  :deep(.el-alert__content) {
    padding: 0;
  }

  :deep(.el-alert .el-alert__description) {
    margin: 0;
    font-size: inherit;
    color: #fff;
  }

  :deep(.el-alert--error.is-light .el-alert__description) {
    color: #fff;
  }

  :deep(.el-alert.is-light .el-alert__close-btn) {
    color: #fff;
  }
}
</style>
