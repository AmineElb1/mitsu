/* Adminpagina (admin.html): de aanvragen uit het contactformulier, enkel voor de makers. */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/600.css';
import '@fontsource/jetbrains-mono/500.css';

import '../styles/tokens.css';
import '../styles/base.css';
import './Admin.css';

import Admin from './Admin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Admin />
  </StrictMode>
);
