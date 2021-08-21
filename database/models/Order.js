
module.exports = function (sequelize, DataTypes) {
    let alias = 'Order';

    let cols = {
     idOrder: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoincrement: true
    },
     id_user: {
         type: DataTypes.INTEGER
     },
     id_restaurant: {
         type: DataTypes.INTEGER
     },
     estado: {
         type: DataTypes.STRING
     },
    comensales: {
        type: DataTypes.INTEGER
    },
    fecha_reserva: {
        type: DataTypes.DATE
    },
    total: {
        type: DataTypes.INTEGER
    }
    }
    let config = {
        tableName: 'orders',
        timestamps: false
    }
    let Order = sequelize.define(alias, cols, config);
    
    Order.associate = function (models) {
        Order.belongsTo(models.Restaurant, {
            as: 'restaurantes',
            foreignKey: 'id_restaurant'
        });
        Order.hasMany(models.OrderProduct, {
            as: 'orderProducts',
            foreignKey: 'id_order'
        });
    }

    return Order;
}