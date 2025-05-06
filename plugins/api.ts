const { API_URL } = process.env;

export default defineNuxtPlugin(() => {
  const baseURL = API_URL ?? 'http://localhost:3000';

  const api = $fetch.create({
    baseURL,
  });

  return {
    provide: {
      api,
    },
  };
});
