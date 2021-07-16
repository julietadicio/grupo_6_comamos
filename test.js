const bcrypt = require('bcryptjs');

const password = 'test2021'

const newpassword = bcrypt.hashSync(password, 10);

console.log(newpassword);
