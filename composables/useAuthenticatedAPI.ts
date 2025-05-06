import type { UseFetchOptions } from 'nuxt/app';
import type { AuthDto } from '~/DTO';
import { mountUrl } from '~/helpers/mountUrl';

export function useAuthenticatedAPI<T>(
  url: string,
  queryParams?: Record<string, unknown>,
  options?: UseFetchOptions<T>
) {
  const cookie = useCookie<AuthDto>('user');
  if (!cookie.value.token) throw new Error('Invalid Token');

  const mountedUrl = queryParams ? mountUrl(url, queryParams) : url;

  return useFetch(mountedUrl, {
    ...options,
    headers: {
      Authorization: `Bearer ${cookie.value.token}`,
    },
    $fetch: useNuxtApp().$api,
  });
}
