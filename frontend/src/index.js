import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './Grid.css';

const container = document.getElementById('root');    // must match the HTML id
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
