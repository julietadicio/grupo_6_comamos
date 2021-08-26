bcrypt = require ('bcryptjs');
const fs = require('fs');


passwordUser1 = 'hola1'
passwordBuisness1 = 'hola2'
passwordBuisness2 = 'hola3'

newpassword = bcrypt.hashSync(passwordUser1, 10)

console.log(newpassword);
/*

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

/* var mesas = [{idTable: 1, name: 'mesa 1', ubication: 'Exterior', capacity: 2, status: 'abierta', id_restaurant: '1'},
{idTable: 2, name: 'mesa 2', ubication: 'Exterior', capacity: 3, status: 'abierta', id_restaurant: '1'},
{idTable: 3, name: 'mesa 2', ubication: 'Exterior', capacity: '5', status: 'abierta', id_restaurant: '1'}
]

var capacidadOcupada = mesas.reduce((sum, t) => {
    return sum + t.capacity
}, 0)

console.log(capacidadOcupada); */