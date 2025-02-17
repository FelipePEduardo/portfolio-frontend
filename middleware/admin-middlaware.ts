import type { AuthDto } from '~/DTO';

export default defineNuxtRouteMiddleware(() => {
  const cookie = useCookie<AuthDto>('user');

  if (cookie.value.user?.userRole.name !== 'ADMIN') {
    return '/';
  }
});
