import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Global uncaught rejection & error catchers
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    console.warn('[App] Intercepted unhandled promise rejection:', event.reason);
    event.preventDefault();
  });
  window.addEventListener('error', (event) => {
    console.warn('[App] Intercepted global error:', event.error || event.message);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
);
