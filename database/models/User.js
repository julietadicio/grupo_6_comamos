
const User = sequelize.define('Users', cols, config);

const cols = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    perfil: {
        type: DataTypes.STRING
    },

}
const config = {
    tablename: 'users'
}

module.exports (User)