<template>
  <div class="login-wrapper">
    <form>
      <Input
        v-model="form.email"
        name="email"
        label="Email"
        placeholder="Digite seu email"
      />
      <InputPassword
        v-model="form.password"
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
      />
      <Button label="Entrar" type="submit" @click="handleSignIn" />
    </form>
    <NuxtLink to="/register">Criar conta</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto } from '~/DTO';


/* #region Composables */

const router = useRouter();
const user = useCookie('user', {
  default: () => ({}),
});

/* #endregion */

/* #region Data */

const form = ref<{ email?: string; password?: string }>({});

/* #endregion */

/* #region Methods */

async function handleSignIn(e: Event) {
  e.preventDefault();

  try {
    user.value = await $fetch<AuthDto>('https://portfolio-backend-fnac.onrender.com/auth/sign-in', {
      method: 'post',
      body: form.value,
    });

    router.push('/');
  } catch (error) {
    console.error(error);
  }
}

/* #endregion */
</script>

<style lang="scss">
.login-wrapper {
  width: 18rem;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  > form {
    width: 100%;
    margin-bottom: 2rem;
  }
}
</style>
