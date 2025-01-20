<template>
  <header>
    <NuxtLink to="/">&lt;Portfólio &frasl;&gt;</NuxtLink>

    <ul>
      <li>
        <NuxtLink to="/about">Sobre</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/skills">Habilidades</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/projects">Projetos</NuxtLink>
      </li>
      <li v-if="isLogged && checkIfUserIsAdministratorOrMaster(loggedUser)">
        <NuxtLink to="/users">Usuários</NuxtLink>
      </li>
    </ul>

    <Profile v-if="isLogged" />
    <button v-else @click="router.push('/sign-in')">Entrar</button>
  </header>
</template>

<script setup lang="ts">
import type { AuthDto } from '~/DTO';
import { checkIfUserIsAdministratorOrMaster } from '~/helpers/checkUserPermission';

/* #region Composables */

const router = useRouter();
const cookie = useCookie<AuthDto>('user');

/* #endregion  */

const isLogged = computed(() => !!cookie.value?.token);
const loggedUser = computed(() => cookie.value.user)
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-block: 1rem;
  padding-inline: 2rem;

  backdrop-filter: blur(8px);
  filter: saturate(1.5);

  > a {
    color: $text-secondary;
    font-size: 2rem;
    font-weight: 700;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    li {
      a {
        font-size: 1rem;
      }
    }
  }

  button {
    background: none;
    border: none;

    color: $text-secondary;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: $text-white;
      transition: 400ms;
    }
  }
}
</style>
