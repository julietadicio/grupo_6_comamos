
module.exports = function (sequelize, DataTypes) {
    let alias = 'OrderProduct';

    let cols = {
     id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoincrement: true
    },
     id_order: {
         type: DataTypes.INTEGER
     },
     id_product: {
         type: DataTypes.INTEGER
     },
     cantidad: {
         type: DataTypes.INTEGER
     }
    }
    let config = {
        tableName: 'orders_products',
        timestamps: false
    }
    let OrderProduct = sequelize.define(alias, cols, config);
    
    OrderProduct.associate = function (models) {
        OrderProduct.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'id_product'
        });
    }

    return OrderProduct;
}