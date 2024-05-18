const express = require('express');
const app = express();
const { ExpressPeerServer } = require('peer');

// Configuración del servidor PeerJS
const peerServer = ExpressPeerServer(app, {
  debug: true,
  path: '/myapp' // Ruta para las solicitudes de PeerJS
});

// Middleware para manejar las solicitudes de PeerJS
app.use('/myapp/peerjs', (req, res, next) => {
  // Configurar los encabezados CORS para permitir solicitudes desde cualquier origen
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  peerServer(req, res, next);
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
