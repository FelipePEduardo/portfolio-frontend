<template>
  <div class="field-wrapper">
    <span v-if="label" class="input-label">{{ label }}</span>
    <div :class="['input-wrapper', size]">
      <input
        v-model="inputValue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        type="text"
      />
      <div class="icon"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

const inputValue = defineModel();

defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: 'Digite aqui',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'is-small' | 'is-medium' | 'is-large'>,
    default: 'is-medium',
  },
});
</script>

<style lang="scss" scoped>
.field-wrapper {
  width: 100%;
  margin-bottom: 0.8rem;

  .input-label {
    color: $text-secondary;
    margin-bottom: 0.4rem;
  }

  .input-wrapper {
    width: 100%;
    padding: 0.6rem;
    background-color: $bg-secondary;
    border-radius: 8px;
    border: 1px solid transparent;

    &.is-small {
      border: 1px solid $bg-tertiary;
      max-height: 2rem;

      padding: 0.2rem;

      > input {
        font-size: 0.9rem;
      }
    }

    &:focus-within {
      border: 1px solid $bg-tertiary;
    }

    > input {
      width: 100%;
      background: none;
      border: none;

      color: $text-white;
      font-size: 1rem;

      outline: none;

      &::placeholder {
        color: $text-primary;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
