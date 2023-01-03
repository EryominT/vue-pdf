<template>
  <div class="field-item" :class="{'field-item--error': errorMessage, 'field-item--disabled': disabled}" >
    <div class="field-item__label">{{label}}</div>
    <div class="field-item__input" :class="{'field-item__input--password': type === 'password'}">
      <input
          :name="name"
          :type="currentType"
          :value="inputValue"
          :placeholder="placeholder"
          @input="handleChange"/>
      <button v-if="type === 'password'" @click.prevent="toggleIco" class="field-item__ico">
        <icons :name="ico"/>
      </button>
    </div>
    <div v-show="errorMessage || meta.valid" class="field-item__message">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useField } from 'vee-validate';
import Icons from "@/components/Icons.vue";
interface Props {
  type: string;
  value?: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const ico = ref<string>('showPassword');
const name = ref<string>(props.name);
const currentType = ref(props.type);
const {
  value: inputValue,
  errorMessage,
  handleChange,
  meta,
} = useField<string>(name, undefined, {
  initialValue: props.value,
});

function toggleIco () {
  ico.value = ico.value === 'showPassword' ? 'hidePassword' : 'showPassword';
  currentType.value = currentType.value === 'password' ? 'text' : 'password';
};
</script>

<style lang="scss" scoped>
.field-item {
  &__label {
    letter-spacing: 0.25px;
    color: var(--color-label);
  }

  &__input {
    position: relative;
    margin-top: 8px;

    input {
      display: block;
      width: 100%;
      padding: 16px 24px;
      border-radius: 8px;
      border: 1px solid var(--color-border);

      &:focus {
        box-shadow: 0px 0px 2px 0px var(--color-primary);
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px #e6eef6 inset;
      }

      .field-item--error & {
        border-color: var(--color-danger);

        &:focus {
          box-shadow: 0px 0px 2px 0px var(--color-danger);
        }
      }
    }

    &--password {
      input {
        padding: 16px 60px 16px 24px;
      }
    }

    .field-item--disabled & {
      pointer-events: none;
    }
  }

  &__ico {
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    height: 90%;
    width: 50px;
    border-radius: 8px;
    background-color: transparent;

    &:focus-visible {
      box-shadow: 0px 0px 2px 0px var(--color-primary);
    }

    &:deep(.ico) {
      color: #b5c6d6;
    }
  }

  &__message {
    margin-top: 15px;
    letter-spacing: 0.25px;

    .field-item--error & {
      color: var(--color-danger);
    }

    &:empty {
      display: none;
    }
  }

  &--disabled {
   opacity: 0.6;
  }
}
</style>