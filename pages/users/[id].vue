<template>
  <div class="user-profile-wrapper">
    <img src="https://github.com/felipePEduardo.png" alt="profile" />
    <ul>
      <li>Nome: {{ user?.name }}</li>
      <li>Email: {{ user?.email }}</li>
      <li>Administrador: {{ user?.isAdmin }}</li>
      <li>Ativo: {{ user?.active }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto, UserDto } from '~/DTO';

definePageMeta({
  middleware: ['auth-middlaware'],
});

const route = useRoute();
const cookie = useCookie<AuthDto>('user');

const user = ref<UserDto>();

async function getById() {
  try {
    const id = Number(route.params.id);

    user.value = await $fetch<UserDto>(`http://localhost:3000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
    });

    console.log(user.value);
  } catch (error) {
    console.error(error);
  }
}

onMounted(getById);
</script>

<style lang="scss" scoped>
.user-profile-wrapper {
  img {
    max-width: 15rem;
    border-radius: 50%;
    margin-bottom: 1rem;
    text-align: center;
  }

  li + li {
    margin-top: 0.8rem;
  }
}
</style>
