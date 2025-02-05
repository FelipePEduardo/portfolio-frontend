<template>
  <div class="user-profile-wrapper">
    <img src="https://github.com/felipePEduardo.png" alt="profile" />
    <ul>
      <li>Nome: {{ user?.name }}</li>
      <li>Email: {{ user?.email }}</li>
      <li>Cargo:{{ mappedRoles }}</li>
      <li>Ativo: {{ user?.active }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto, UserDto } from '~/DTO';

definePageMeta({
  middleware: ['admin-middlaware'],
});

const route = useRoute();
const cookie = useCookie<AuthDto>('user');

const user = ref<UserDto>();

const mappedRoles = computed(() => {
  const roles = { USER: 'Usuário', ADMIN: 'Administrador', MASTER: 'Master' };

  return user.value?.userRole.name
    ? roles[user.value?.userRole.name as keyof typeof roles]
    : '-';
});

async function getById() {
  try {
    const id = Number(route.params.id);

    user.value = await $fetch<UserDto>(`http://localhost:3000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
    });

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
