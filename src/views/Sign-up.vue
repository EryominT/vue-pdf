<template>
  <div class="login">
    <div class="login__title">MyApp</div>
    <div class="login__content">
      <div class="login__subtitle">Регистрация</div>

      <form @submit.prevent="onSubmit" class="login__form">
        <FormItem name="email" type="text" label="Email" placeholder="test@test.com" :disabled="isSubmit" class="login__form-item"/>

        <FormItem name="password" type="password" label="Пароль" :disabled="isSubmit" class="login__form-item"/>

        <FormItem name="confirmPassword" type="password" label="Повторите пароль" :disabled="isSubmit" class="login__form-item"/>

        <div v-if="ErrorSubmit" class="login__form-error">{{ ErrorSubmit }}</div>

        <div class="login__form-submit">
          <button :disabled="isSubmit" class="btn btn--primary">Зарегистрироваться</button>
          <Icons v-if="isSubmit" name="loader" />
        </div>
      </form>

      <router-link to="/signin" class="login__redirect">У меня уже есть аккаунт</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { object, string, ref as refYup } from 'yup';
import { useForm } from 'vee-validate';
import { useRouter } from "vue-router";
import { key } from '@/store';
import { useStore } from 'vuex';
import FormItem from "@/components/Form-item.vue";
import Icons from "@/components/Icons.vue";

const router = useRouter();
const store = useStore(key);
const isSubmit = ref<boolean>(false);
const schema = object({
  email: string().trim().required('Поле email не должно быть пустым').email('введите корректный email'),
  password: string().trim().required('Поле пароль не должно быть пустым'),
  confirmPassword: string().trim().required('Повторите пароль').oneOf([refYup('password')], 'Пароль не совпадает'),
});
const { handleSubmit } = useForm({ validationSchema: schema });
const ErrorSubmit = ref('');

const onSubmit = handleSubmit(async (values) => {
  isSubmit.value = true;
  try {
    await store.dispatch('auth/registration', {email: values.email, password: values.password});
    await router.push('/');
  } catch (e: any) {
    if (e.message === import.meta.env.VITE_AXIOS_NETWORK_ERROR) {
      ErrorSubmit.value = 'Ошибка соединения. Повторите попытку позже';
    } else {
      ErrorSubmit.value = e.message;
    }
  }
  isSubmit.value = false;
});
</script>

<style lang="scss" scoped>
.login {
  flex-shrink: 0;
  margin-top: 84px;

  &__title {
    font-size: var(--font-size-xl);
    text-align: center;
    font-weight: 700;
    color: var(--color-title);
  }

  &__subtitle {
    font-size: var(--font-size-lg);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-title);
  }

  &__content {
    max-width: 548px;
    width: 100%;
    margin: 42px auto 0;
    padding: 28px;
    background: #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 37px;
  }

  &__form-submit {
    position: relative;
    margin-top: 65px;

    &:deep(.ico) {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
    }

    .btn {
      width: 100%;
      padding: 16px;
      font-weight: 700;
      transition: letter-spacing 0.4s;

      @media (any-hover: hover) {
        &:hover {
          letter-spacing: 0.25em;
        }
      }
    }
  }

  &__form-error {
    margin-top: 15px;
    letter-spacing: 0.25px;
    color: var(--color-danger);
  }

  &__redirect {
    display: block;
    margin-top: 15px;
    text-align: center;
    color: var(--color-primary);
  }
}
</style>