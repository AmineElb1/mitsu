import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* lettertypen van het design system, zelf gehost */
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
import '@fontsource/inter-tight/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/shippori-mincho/400.css';

import './styles/tokens.css';
import './styles/base.css';

import { initMotion } from './lib/motion.js';
import App from './App.jsx';

initMotion();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
