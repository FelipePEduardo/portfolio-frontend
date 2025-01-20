<template>
  <div class="field-wrapper">
    <span v-if="label" class="input-label">{{ label }}</span>
    <div class="input-wrapper">
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
