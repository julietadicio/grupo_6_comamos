bcrypt = require ('bcryptjs');
const fs = require('fs');
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));

/*
passwordUser1 = 'hola1'
passwordBuisness1 = 'hola2'
passwordBuisness2 = 'hola3'

newpassword = bcrypt.hashSync(passwordBuisness2, 10)

console.log(newpassword);

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
*/
/*const buisnessId = req.session.userLogged.idRestaurant;
const buisnessSelectId = restaurantDataBase.findIndex(p => p.idRestaurant == buisnessId)
const tableId = req.params.id;
const tableSelect = restaurantDataBase[buisnessSelectId].mesas.findIndex(p => p.idMesas == tableId)
console.log(tableSelect);
const userTables = user.mesas;
const user = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
restaurantDataBase[buisnessSelectId].mesas[tableSelect] = { ...restaurantDataBase[buisnessSelectId].mesas[tableSelect] , ...req.body };
fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));*/
//const mesa = restaurantDataBase[1].mesas.findIndex (m => m.idMesa == 20);

const indiceAleatorio = Math.floor(Math.random() * productsDataBase.length);
const indice1 = indiceAleatorio;

var quantity = productsDataBase.length
var arr = [];
while(arr.length < 7){
    var r = Math.floor(Math.random() * quantity);
    if(arr.indexOf(r) === -1) arr.push(r);
}

var newArray = productsDataBase[arr[0]];
var newArray2 = arr.map (e => productsDataBase[e])


//console.log(newArray);
console.log(newArray2);