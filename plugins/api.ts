export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // const baseURL = config.public.apiBase.production;
  const baseURL = config.public.apiTeste;

  const api = $fetch.create({
    baseURL,
  });

  return {
    provide: {
      api,
    },
  };
});
