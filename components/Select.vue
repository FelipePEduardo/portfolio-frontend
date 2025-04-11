<template>
  <select v-model="selectValue" :name="name" :disabled="disabled">
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
  disabled: {
    type: Boolean,
    default: false,
  },
});

const selectValue = defineModel();
</script>

<style lang="scss" scoped></style>
