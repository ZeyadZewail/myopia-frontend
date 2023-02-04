import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],resolve: {
    alias: [
    {
      find: './runtimeConfig',
      replacement: './runtimeConfig.browser',
    },
  ]
},server:{proxy:{'/api': {
  target: 'https://app-staging-api.myopiagraph.com',
  changeOrigin: true,
  rewrite: (path) => path.replace(/^\/api/, ''),
}}}
})
