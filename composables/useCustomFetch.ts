import type { UseFetchOptions } from '#app';

import { mountUrl } from '~/helpers/mountUrl';

export function useCustomFetch<T>(
  url: string,
  queryParams?: Record<string, unknown>,
  options?: UseFetchOptions<T>
) {
  const mountedUrl = queryParams ? mountUrl(url, queryParams) : url;

  return useFetch(mountedUrl, {
    ...options,
    $fetch: useNuxtApp().$api,
  });
}