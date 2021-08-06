
const User = sequelize.define('Users', cols, config);

const cols = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}
const config = {
    tablename: 'users'
}
