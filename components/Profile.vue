<template>
  <div class="profile-wrapper">
    <span v-if="checkIfUserIsAdministratorOrMaster(loggedUser)" class="admin">
      {{ loggedUser?.userRole.name }}
    </span>
    <img src="https://github.com/felipePEduardo.png" alt="profile" />
    <div>
      <h5 class="user-name">{{ cookie?.user?.name }}</h5>
      <Button label="sair" light @click="handleSignOut" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto } from '~/DTO';
import { checkIfUserIsAdministratorOrMaster } from '~/helpers/checkUserPermission';

const cookie = useCookie<AuthDto>('user');

const loggedUser = computed(() => cookie.value.user);

function handleSignOut() {
  cookie.value = {
    token: undefined,
    user: undefined,
  };

  navigateTo('/');
}
</script>

<style lang="scss">
.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;

  .admin {
    background: #333;
    padding: 0.3rem;
    border-radius: 4px;

    font-size: 0.8rem;
    font-weight: 500;
    color: $text-secondary;
  }

  img {
    max-width: 3rem;
    border-radius: 50%;
    border: 4px solid $bg-tertiary;
  }

  .user-name {
    font-size: 1rem;
    color: $text-secondary;
  }
}
</style>
