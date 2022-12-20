const withAnimations = require('animated-tailwindcss');

module.exports = withAnimations({
    mode: 'aot',
    theme: {
      extend: {
        colors: {
          primary: { "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f" },
          'info': 'hsl(var(--color-info) / 1)',
          'success': 'hsl(var(--color-success) / 1)',
          'warning': 'hsl(var(--color-warning) / 1)',
          'error': 'hsl(var(--color-error) / 1)',
          'info-content': 'hsl(var(--color-info-content) / 1)',
          'success-content': 'hsl(var(--color-success-content) / 1)',
          'warning-content': 'hsl(var(--color-warning-content) / 1)',
          'error-content': 'hsl(var(--color-error-content) / 1)',
        },
      },
      fontFamily: {
        'body': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        'sans': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      }
    },
    content: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './composables/**/*.{js,ts}',
      './plugins/**/*.{js,ts}',
      './App.{js,ts,vue}',
      './app.{js,ts,vue}',
      './Error.{js,ts,vue}',
      './error.{js,ts,vue}',
      "./node_modules/flowbite/**/*.js",
      "./node_modules/vue-toasted/**/*.js",
      "./nuxt.config.{js,ts}",
    ],
    plugins: [
      require('flowbite/plugin'),
      require('tailwind-scrollbar')({ nocompatible: true }),
      require('animated-tailwindcss'),
    ],
    variants: {
      scrollbar: ['rounded']
    }
});


