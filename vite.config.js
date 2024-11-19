import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: '404.html', // Source file to copy
                    dest: '.',        // Destination in dist root
                }
            ]
        })
    ],
    base: './', // This will make asset paths relative
    server: {
        host: '0.0.0.0', // Make the server accessible from any device on the local network
        port: 3000,       // You can specify any port if you want a different one
        strictPort: true, // Ensures the server doesn't switch ports automatically if the chosen one is in use
    },
});
