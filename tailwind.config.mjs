/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"San Francisco"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        'apple-dark': '#000000',
        'apple-gray': '#1d1d1f',
        'apple-light': '#f5f5f7',
        'apple-text': '#f5f5f7',
        'apple-muted': '#86868b'
      },
    },
  },
  plugins: [],
}
