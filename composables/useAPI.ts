import type { UseFetchOptions } from 'nuxt/app';

import { mountUrl } from '~/helpers/mountUrl';
const { API_URL } = process.env;

type ParamsType<T> = {
  url: string;
  queryParams?: Record<string, unknown>;
  options?: UseFetchOptions<T>;
};

export function useAPI<T>({ url, queryParams, options }: ParamsType<T>) {
  const mountedUrl = queryParams ? mountUrl(url, queryParams) : url;

  return useFetch(mountedUrl, {
    ...options,
    $fetch: useNuxtApp().$api,
  });
}

export async function internalFetchAPI<T>(
  url: string,
  options: Record<string, unknown>
) {
  const baseURL = API_URL ?? 'http://localhost:3000';

  return $fetch<T>(url, {
    baseURL,
    ...options,
  });
}
