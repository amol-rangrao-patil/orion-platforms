import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

window.requestAnimationFrame(() => {
  const loader = document.getElementById('startup-loader');
  if (!loader) return;
  window.setTimeout(() => {
    loader.classList.add('is-hidden');
    window.setTimeout(() => loader.remove(), 260);
  }, 2000);
});
