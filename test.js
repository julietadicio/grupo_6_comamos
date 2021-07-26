bcrypt = require ('bcryptjs');
const fs = require('fs');
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/*
passwordUser1 = 'hola1'
passwordBuisness1 = 'hola2'
passwordBuisness2 = 'hola3'

newpassword = bcrypt.hashSync(passwordBuisness2, 10)

console.log(newpassword);
*/
const indiceAleatorio = Math.floor(Math.random() * productsDataBase.length);

function productToSee (indice) {
    return productsDataBase[indice].plato;
}

console.log(productToSee(indiceAleatorio));