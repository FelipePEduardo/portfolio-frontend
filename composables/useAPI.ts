type $FetchType = typeof $fetch;
export type ReqOptions = Parameters<$FetchType>[1];

import { mountUrl } from '~/helpers/mountUrl';

export async function useAPI<T>(
  url: string,
  queryParams?: Record<string, unknown>,
  options?: ReqOptions
) {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiTeste;

  const mountedUrl = queryParams ? mountUrl(url, queryParams) : url;

  return $fetch<T>(mountedUrl, {
    baseURL,
    ...options,
  });
}