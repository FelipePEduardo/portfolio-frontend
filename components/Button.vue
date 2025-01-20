<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['button', { 'is-light': light }]"
  >
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String as PropType<HTMLButtonElement['type']>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  min-height: 2.6rem;

  background: $bg-tertiary;

  font-size: 0.9rem;
  font-weight: bold;
  color: $text-primary;

  padding: 0.6rem;

  border: none;
  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background: $bg-secondary;
    transition: 100ms;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.is-light {
    width: inherit;
    min-height: inherit;

    background: none;
    font-weight: 400;
    padding: 0;

    &:hover {
      color: $text-white;
      transition: 100ms;
    }
  }
}
</style>
