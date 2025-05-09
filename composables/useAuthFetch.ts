export async function useAuthFetch<T>(email: string, password: string) {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiTeste;

  const encodedCredentials = btoa(`${email}:${password}`);

  return $fetch<T>('/auth/sign-in', {
    baseURL,
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  });
}
