import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'icon-192.png',
        'icon-512.png',
        'screenshot1.png',
        'screenshot2.png'
      ],
      manifest: {
        name: 'MicroMind - Daily Reflection',
        short_name: 'MicroMind',
        start_url: 'https://micromind.netlify.app/',
        display: 'standalone',
        background_color: '#fafaf9',
        lang: 'en',
        scope: '/',
        description: 'A daily reflection and knowledge tracker to boost learning and self-awareness',
        theme_color: '#6366f1',
        orientation: 'portrait',
        id: 'main-source=pwa',
        dir: 'ltr',
        categories: ['education', 'health', 'productivity'],
        launch_handler: {
          client_mode: 'auto'
        },
        icons: [
          {
            src: 'icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'

          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        screenshots: [
          {
            src: 'screenshot1.png',
            sizes: '1080x1920',
            type: 'image/png'
          },
          {
            src: 'screenshot2.png',
            sizes: '1080x1920',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'CacheFirst'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
