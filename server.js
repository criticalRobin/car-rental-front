const express = require('express');
const path = require('path');
const app = express();

// Sirve los archivos estáticos de la carpeta dist
app.use(express.static(path.join(__dirname, 'dist/car-rental-front/browser')));

// Maneja todas las rutas redirigiendo al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/car-rental-front/browser/index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});