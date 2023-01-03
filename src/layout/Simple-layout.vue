<template>
  <div class="simple-layout">
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.simple-layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;

  .content {
    width: 100%;
    height: 100%;
  }
}
</style>