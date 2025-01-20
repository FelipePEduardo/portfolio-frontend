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
        :type="type"
      />
      <button type="button" @click="togglePassword">icone</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const inputValue = defineModel();

const props = defineProps({
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

const type = ref<'password' | 'text'>('password');

function togglePassword() {
  if (type.value === 'password') type.value = 'text';
  else type.value = 'password';
}
</script>

<style lang="scss" scoped>
.field-wrapper {
  width: 100%;
  margin-bottom: 0.8rem;

  .input-label {
    color: $text-secondary;
  }

  .input-wrapper {
    width: 100%;
    margin-top: 0.4rem;
    padding: 0.6rem;

    display: flex;
    align-items: center;

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

    > button {
      background: 0;
      border: 0;
      color: $text-white;
      cursor: pointer;
    }
  }
}
</style>
