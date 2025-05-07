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
  const config = useRuntimeConfig();

  const baseURL = config.public.apiBase.production;

  return $fetch<T>(url, {
    baseURL,
    ...options,
  });
}
