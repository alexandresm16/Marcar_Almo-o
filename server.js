const http = require('http');
const path = require('path');
const express = require('express');
const app = express();

const port = 3000;
const distDir = path.join(__dirname, 'dist', 'projeto_semestre_2');

// Serve os arquivos estáticos da pasta dist
app.use(express.static(distDir));

// Rota para qualquer URL (no caso de um app de SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// Inicia o servidor, escutando em todas as interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});
