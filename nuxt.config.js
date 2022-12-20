export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // server: {
  //   host: "0.0.0.0"
  // },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Env: https://nuxtjs.org/docs/configuration-glossary/configuration-env/
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:8000/api',
    baseUrlShop: process.env.BASE_URL_SHOP || 'http://localhost:8000',
  },

  loadingIndicator: {
    name: 'rotating-plane',
    color: '#f59e0b',
    background: '#fef3c7'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cmshop',
    htmlAttrs: {
      lang: 'vi'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Icons' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "flag-icons/css/flag-icons.min.css",
    'floating-vue/dist/style.css',
    'vue-advanced-cropper/dist/style.css',
    'vue-cool-lightbox/dist/vue-cool-lightbox.min.css',
    'sweetalert2/dist/sweetalert2.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/utils.client.js', ssr: false },
    { src: "@/plugins/vClickOutside", ssr: false },
    { src: "@/plugins/axios", ssr: false },
    { src: "@/plugins/lodash", ssr: false },
    { src: "@/plugins/floatingvue", ssr: false },
    { src: "@/plugins/vue-advanced-cropper", ssr: false },
    { src: "@/plugins/vue-cool-lightbox", ssr: false },
    { src: "@/plugins/sweetalert", ssr: false },
    { src: "@/plugins/vue-final-modal", ssr: false }

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/dayjs',
    // '@nuxtjs/tailwindcss'
  ],

  dayjs: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    defaultTimeZone: 'Asia/Ho_Chi_Minh',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
      'localizedFormat',
    ] // Your Day.js plugin
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
      callback: '/login',
    },
    watchLoggedIn: true,
  },

  router: {
    middleware: ['auth']
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  toast: {
    duration: 3000,
    iconPack: 'material',
    register: [ // Register custom toasts
      {
        name: 'success',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return "Thành công"
          }

          // if there is a message show it with the message
          return payload.message;
        },
        options: {
          theme: 'custom',
          className: 'text-white bg-success rounded-lg shadow min-h-38px',
          icon: 'done',
          action: {
            icon: 'close',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        }
      },
      {
        name: 'info',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return "..."
          }

          // if there is a message show it with the message
          return payload.message;
        },
        options: {
          theme: 'custom',
          className: 'text-info-content bg-info rounded-lg shadow min-h-38px',
          icon: 'info',
          // action: {
          //   icon: 'close',
          //   onClick: (e, toastObject) => {
          //     toastObject.goAway(0);
          //   }
          // }
        }
      },
      {
        name: 'myError',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return "Opps, có gì đó không đúng"
          }

          // if there is a message show it with the message
          return payload.message;
        },
        options: {
          theme: 'custom',
          className: 'text-error-content bg-error rounded-lg shadow min-h-38px',
          icon: 'error',
          action: {
            icon: 'close',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        }
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
    headers: {
      common: {
        'Accept': 'application/json',
      },
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-final-modal']
  }
}
