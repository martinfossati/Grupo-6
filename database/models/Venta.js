module.exports = (sequelize, dataTypes) => {

    let alias = "Ventas";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_usuario: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        numero_facturacion: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        importe: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "ventas",
        timestamps: false
    };

    const Venta = sequelize.define(alias, cols, config);

    return Venta;
}