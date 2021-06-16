const express = require('express');
const app = express();
const path = require('path');
const publicFolder = path.resolve(__dirname, './public');
app.use(express.static(publicFolder));

app.listen(8000, () => {
    console.log('Servidor Funcionando en el puerto 8000');
})

app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
});
app.get('/producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/product-detail.html'))
});
app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'))
});