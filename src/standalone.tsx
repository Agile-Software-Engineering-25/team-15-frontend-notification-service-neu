import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './components/NavBar/NavBar';

const container = document.getElementById('root');

createRoot(container!).render(
  <StrictMode>
    <NavBar />
  </StrictMode>
);
