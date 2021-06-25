const express = require('express');
const app = express();
const path = require('path');
const publicFolder = path.resolve(__dirname, './public');
app.use(express.static(publicFolder));

app.listen(8000, () => {
  console.log('Servidor Funcionando en el puerto 8000');
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'))
});

app.get('/producto', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/product.html'))
});
app.get('/carrito', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/carrito.html'))
});

app.get('/registro', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, './views/register-user.html'));
});

app.get('/registro/restaurante', function(req, res, next) {
res.sendFile(path.resolve(__dirname, './views/register-restaurant.html'));
});

app.get('/register2Ok', function(req, res, next) {
res.sendFile(path.resolve(__dirname, './views/register2Ok.html'));
});

app.get('/registerOk', function(req, res, next) {
res.sendFile(path.resolve(__dirname, './views/registerOk.html'));
});

app.get('/login', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, './views/login.html'));
});
app.get('/loginNegocio', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, './Views/loginNegocio.html'));
});
