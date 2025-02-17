// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['./assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./assets/scss/_colors.scss" as *;',
        },
      },
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },
  },

  devServer: {
    port: 3333,
  },

  modules: ['@nuxt/icon'],

  icon: {
    size: '24px',
    class: 'icon',
  },
});
