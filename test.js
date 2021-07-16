const bcrypt = require('bcryptjs');

const password = 'test2021'
const passwordVillaCrespo = 'Prueba123'

const newpassword = bcrypt.hashSync(passwordVillaCrespo, 10);

console.log(newpassword);
