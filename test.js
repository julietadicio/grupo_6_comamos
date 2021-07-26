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
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const productToSee = (array) => {
    for (let i = random(0,6); i <= productsDataBase.lenght ; i++) {
        var resultado1 = console.log(array[i].plato);
    }
    if (resultado1.lenght < 6) {
        resultado1[0]
    }
}

productToSee(productsDataBase);
