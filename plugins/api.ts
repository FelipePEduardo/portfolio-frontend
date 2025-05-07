export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const baseURL = config.public.apiBase.production;

  const api = $fetch.create({
    baseURL,
  });

  return {
    provide: {
      api,
    },
  };
});
