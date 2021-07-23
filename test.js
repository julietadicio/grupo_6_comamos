bcrypt = require ('bcryptjs');

passwordUser1 = 'hola1'
passwordBuisness1 = 'hola2'
passwordBuisness2 = 'hola3'

newpassword = bcrypt.hashSync(passwordBuisness2, 10)

console.log(newpassword);