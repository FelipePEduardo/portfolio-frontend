<template>
  <div class="users-table-wrapper">
    <Table
      :data="data"
      :headers="headers"
      :count="count"
      clickable-row
      @click-row="handleNavigateToUser"
    />
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto, SearchResponse, UserSearchDto } from '~/DTO';

definePageMeta({
  middleware: ['admin-middlaware'],
});

const cookie = useCookie<AuthDto>('user');

const headers = computed(() => [
  {
    field: 'active',
    label: 'Ativo',
  },
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'name',
    label: 'Nome',
  },
  {
    field: 'email',
    label: 'Email',
  },
]);

const data = ref<UserSearchDto[]>([]);
const count = ref(0);

async function searchUsers() {
  try {
    const { data: apiData, count: apiCount } = await $fetch<
      SearchResponse<UserSearchDto>
    >(`http://localhost:3000/users/search`, {
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
    });

    data.value = apiData;
    count.value = apiCount;
  } catch (error) {
    console.error(error);
  }
}

function handleNavigateToUser(row: UserSearchDto) {
  navigateTo(`/users/${row.id}`);
}

onBeforeMount(searchUsers);
</script>

<style lang="scss">
.users-table-wrapper {
  width: 40rem;
  height: 40rem;
  display: flex;
  align-self: center;
  justify-content: center;
}
</style>
