<template>
  <div class="user-profile-wrapper">
    <div class="icon-wrapper">
      <Icon name="material-symbols:person" size="50" />
    </div>
    <ul>
      <li>Nome: {{ user?.name }}</li>
      <li>Email: {{ user?.email }}</li>

      <li>
        Cargo:
        <Select
          v-if="user"
          v-model="user.userRole.name"
          :options="selectOptions"
          :disabled="cookie.user?.userRole.name !== 'MASTER'"
          name="user-role"
        />
      </li>
      <li>Ativo: {{ user?.active ? 'Sim' : 'Não' }}</li>
    </ul>

    <Button label="Salvar" @click="save" />
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto, UserDto } from '~/DTO';

definePageMeta({
  middleware: ['admin-master-middlaware'],
});

const route = useRoute();
const cookie = useCookie<AuthDto>('user');
const { data: user } = await useAuthenticatedAPI<UserDto>(
  `/users/${route.params.id}`
);

const selectOptions = ref([
  { field: 'Usuário', value: 'USER' },
  { field: 'Administrador', value: 'ADMIN' },
  { field: 'Master', value: 'MASTER' },
]);

async function save() {
  if (cookie.value.user?.userRole.name !== 'MASTER') return;

  try {
    const id = Number(route.params.id);

    user.value = await internalFetchAPI(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      method: 'PATCH',
      body: { ...user.value, userRole: user.value?.userRole.name },
    });

    window.alert('Usuário atualizado');
  } catch (error) {
    console.error(error);
  }
}
</script>

<style lang="scss" scoped>
.user-profile-wrapper {
  ul {
    margin-bottom: 1rem;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 15rem;
    width: 15rem;
    border: 1px solid $text-primary;
    border-radius: 50%;

    margin-bottom: 1rem;
  }

  li + li {
    margin-top: 0.8rem;
  }
}
</style>
