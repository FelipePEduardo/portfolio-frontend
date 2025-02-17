<template>
  <select v-model="selectValue" :name="name">
    <option v-for="option in options" :value="option.value">
      {{ option.field }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<{ field: string; value: string }[]>,
    default: () => [],
  },
});

const selectValue = defineModel();
</script>

<style lang="scss" scoped></style>
