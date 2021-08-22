
module.exports = function (sequelize, DataTypes) {
    let alias = 'Restaurant';

    let cols = {
     idRestaurant: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoincrement: true
    },
     nombre: {
         type: DataTypes.STRING
     },
     direccion: {
         type: DataTypes.STRING
     },
     capacidad: {
         type: DataTypes.INTEGER
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
    avatar: {
        type: DataTypes.STRING
    },
    mapa: {
        type: DataTypes.STRING
    }
    }
    let config = {
        tableName: 'restaurants',
        timestamps: false
    }
    let Restaurant = sequelize.define(alias, cols, config);

    Restaurant.associate = function (models) {
       /*  Restaurant.hasMany(models.Product, {
            as: 'productsRestaurant',
            foreignKey: 'id_restaurant'
        }); */
    }

    return Restaurant;
}