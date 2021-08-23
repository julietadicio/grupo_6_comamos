
module.exports = function (sequelize, DataTypes) {
    let alias = 'Product';

    let cols = {
        idPlato: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoincrement: true
        },
        plato: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.STRING
            },
        imagen: {
            type: DataTypes.STRING
        },
        categoria: {
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.INTEGER
        },
        id_restaurant: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'products',
        timestamps: false
    }
    let Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Restaurant, {
            as: 'productRestaurant',
            foreignKey: 'id_restaurant'
        });
    }

    return Product;
}