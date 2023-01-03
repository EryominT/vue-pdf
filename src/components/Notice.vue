<template>
  <div class="notice">{{props.text}}</div>
</template>

<script lang="ts" setup>
interface Props {
  text: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  text: null
})

</script>

<style lang="scss" scoped>
.notice {
  width: 100%;
  padding: 3px 10px;
  background-color: var(--color-warning);
  color: #000;
}
</style>
