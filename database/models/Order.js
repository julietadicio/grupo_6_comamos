
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
     id_product: {
         type: DataTypes.INTEGER
     },
    cantidad: {
        type: DataTypes.INTEGER
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
    return Order;
}