
module.exports = function (sequelize, DataTypes) {
    let alias = 'Table';

    let cols = {
        idTable: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoincrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        ubication: {
            type: DataTypes.STRING
            },
        capacity: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        id_restaurant: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'tables',
        timestamps: false
    }
    let Table = sequelize.define(alias, cols, config);

   

    return Table;
}