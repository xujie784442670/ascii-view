import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import progress from 'vite-plugin-progress'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),progress()
    ],
    server: {
        port: 80
    },
    base: './',
    assetsInclude: ['./public/config.js'],
    resolve: {
        alias: {
            '@': '/src',
            '@config': '/src/config',
            '@components': '/src/components',
        }
    }
})
