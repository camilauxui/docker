import { defineConfig } from 'vite';  
import react from '@vitejs/plugin-react';  
import { VitePWA } from 'vite-plugin-pwa';  

export default defineConfig({  
  plugins: [  
    react(),  
    VitePWA({  
      registerType: 'autoUpdate',  
      manifest: {  
        name: "Centro Médico",  
        short_name: "MedicalCenter",  
        description: "Aplicación para un centro médico",  
        icons: [  
          {  
            src: "icon-192.png",  
            sizes: "192x192",  
            type: "image/png"  
          },  
          {  
            src: "icon-512.png",  
            sizes: "512x512",  
            type: "image/png"  
          }  
        ],  
        start_url: ".",  
        display: "standalone",  
        background_color: "#ffffff",  
        theme_color: "#007bff",  
        scope: "./",  
        orientation: "portrait"  
      }  
    })  
  ],  
  server: {  
    proxy: {  
      '/api': {  
        target: 'http://localhost:3000',  // Asegúrate de que esto apunte a tu backend  
        changeOrigin: true,  
        rewrite: (path) => path.replace(/^\/api/, ''),  
      },  
    },  
  },  
});