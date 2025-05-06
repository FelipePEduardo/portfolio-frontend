<template>
  <div
    class="skeleton"
    :style="{ width, height, borderRadius: circle ? '50%' : '0.5rem' }"
  />
</template>

<script lang="ts" setup>
defineProps({
  width: {
    type: String,
    default: undefined,
  },
  height: {
    type: String,
    default: undefined,
  },
  circle: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background-color: #1b1520;
  border-radius: 0.5rem;
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
