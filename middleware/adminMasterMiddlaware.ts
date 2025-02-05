import type { AuthDto } from '~/DTO';

export default defineNuxtRouteMiddleware(() => {
  const cookie = useCookie<AuthDto>('user');

  if (cookie.value.user?.userRole.name === 'ADMIN' || cookie.value.user?.userRole.name === 'MASTER') {
    return abortNavigation();
  }
});
