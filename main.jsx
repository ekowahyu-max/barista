import React from 'react';
import ReactDOM from 'react-dom/client';
// Pastikan Anda mengimpor komponen utama Anda
import App from './App.jsx';

// Dapatkan elemen 'root' dari index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  // Gunakan ReactDOM.createRoot untuk me-render aplikasi
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element to render the React application.");
}

