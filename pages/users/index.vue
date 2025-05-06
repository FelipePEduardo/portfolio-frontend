<template>
  <div class="users-table-wrapper">
    <Table
      :data="users?.data"
      :headers="headers"
      :count="users?.count"
      clickable-row
      @click-row="handleNavigateToUser"
      @filter-change="changeFilter"
    />
  </div>
</template>

<script lang="ts" setup>
import type { SearchResponse, UserSearchDto } from '~/DTO';

definePageMeta({
  middleware: ['admin-master-middlaware'],
});

const filters = ref<Record<string, unknown>>({});

const { data: users, refresh } = await useAuthenticatedAPI<
  SearchResponse<UserSearchDto>
>('/users/search', filters.value, { lazy: true });

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
    searchable: true,
  },
  {
    field: 'email',
    label: 'Email',
    searchable: true,
  },
]);

async function changeFilter(newFilters: Record<string, unknown>) {
  filters.value = {
    name_contains: newFilters['name'],
    email_contains: newFilters['email'],
  };

  await refresh();
}

function handleNavigateToUser(row: UserSearchDto) {
  navigateTo(`/users/${row.id}`);
}
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
