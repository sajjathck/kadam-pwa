import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Kadam',
        short_name: 'Kadam',
        theme_color: '#2563EB',
        background_color: '#F7F7F7',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  server: {
    allowedHosts: ['6b17-2405-201-f009-3829-b8ca-9d37-f9e3-7133.ngrok-free.app', '*.ngrok-free.app'], 
    host: true, 
  },
});
