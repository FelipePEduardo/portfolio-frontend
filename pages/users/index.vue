<template>
  <div class="users-table-wrapper">
    <Table
      :data="data"
      :headers="headers"
      :count="count"
      clickable-row
      @click-row="handleNavigateToUser"
      @filter-change="changeFilter"
    />
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto, SearchResponse, UserSearchDto } from '~/DTO';
import { mountUrl } from '~/helpers/mountUrl';

definePageMeta({
  middleware: ['admin-master-middlaware'],
});

const cookie = useCookie<AuthDto>('user');

const data = ref<UserSearchDto[]>([]);
const count = ref(0);
const filters = ref<Record<string, unknown>>({});

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

async function search() {
  try {
    const url = mountUrl('https://portfolio-backend-fnac.onrender.com/users/search', filters.value);

    const { data: apiData, count: apiCount } = await $fetch<SearchResponse<UserSearchDto>>(url, {
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

async function changeFilter(newFilters: Record<string, unknown>) {
  filters.value = {
    name_contains: newFilters['name'],
    email_contains: newFilters['email'],
  };

  await search();
}

function handleNavigateToUser(row: UserSearchDto) {
  navigateTo(`/users/${row.id}`);
}

onBeforeMount(search);
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
