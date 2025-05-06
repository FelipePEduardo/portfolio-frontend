<template>
  <div class="login-wrapper">
    <form>
      <Input
        v-model="form.name"
        name="name"
        label="Name"
        placeholder="Digite seu nome"
      />
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
      <InputPassword
        v-model="form.confirmPassword"
        name="confirm-password"
        label="Confirmar senha"
        placeholder="Digite sua senha"
      />
      <Button label="Criar conta" type="submit" @click="handleCreateAccount" />
    </form>
    <NuxtLink to="/sign-in">Login</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();

const form = ref<{
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}>({});

async function handleCreateAccount(e: Event) {
  e.preventDefault();

  try {
    await internalFetchAPI('/users', {
      method: 'POST',
      body: form.value,
    });

    window.alert('Conta criada com sucesso');
    
    router.push('/sign-in');
  } catch (error) {
    console.error(error);
  }
}
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
