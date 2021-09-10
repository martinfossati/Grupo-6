module.exports = (sequelize, dataTypes) => {

    let alias = "Productos";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        descuento: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        descripcion: {
            type: dataTypes.STRING(500),
            allowNull: false,
        },
        modo_de_uso: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        id_categoria: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "productos",
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(modelos) {
        Producto.belongsTo(modelos.Categorias, {
            as: "categorias",
            foreignKey: "id_categoria"
        });

        Producto.belongsToMany(modelos.Usuarios, {
            as: "usuarios",
            through: "ventas",
            foreignKey: "id_producto",
            otherKey: "id_usuario",
            timestamps: false
        });
    }

    return Producto;
}