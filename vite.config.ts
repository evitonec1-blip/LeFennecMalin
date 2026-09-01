import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import {defineConfig} from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: false,
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Raise warning threshold — we're code-splitting aggressively
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Core React runtime — tiny, always cached
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'react-runtime';
            }
            // Animation library
            if (id.includes('node_modules/gsap')) {
              return 'gsap';
            }
            // Motion / framer
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'motion';
            }
            // Icons
            if (id.includes('node_modules/lucide-react')) {
              return 'lucide';
            }
            // Heavy comparators — loaded only when user clicks compare
            if (id.includes('src/components/HealthComparator')) {
              return 'comparator-health';
            }
            if (id.includes('src/components/LifePensionComparator')) {
              return 'comparator-life';
            }
            // SEO pages — loaded only when navigating to SEO routes
            if (id.includes('src/seo/pages/')) {
              return 'seo-pages';
            }
            // SEO data — large canton/insurer/guide data objects
            if (id.includes('src/seo/data/')) {
              return 'seo-data';
            }
            // Multilingual routes — large file
            if (id.includes('src/seo/multilingualRoutes')) {
              return 'seo-routes';
            }
            // i18n translations
            if (id.includes('src/i18n/')) {
              return 'i18n';
            }
            // Premium lookup service — large
            if (id.includes('src/utils/premiumLookupService')) {
              return 'premium-service';
            }
            // Remaining node_modules
            if (id.includes('node_modules/')) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
