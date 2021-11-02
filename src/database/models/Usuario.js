module.exports = (sequelize, dataTypes) => {

    let alias = "Usuarios";
    
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
        apellido: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(145),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(100)
        }
        // administador: {
        //     type: dataTypes.INTEGER
        // }
    };

    let config = {
        tableName: "usuarios",
        timestamps: false
    };

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(modelos) {
        
        Usuario.belongsToMany(modelos.Productos, {
            as: "productos",
            through: "ventas",
            foreignKey: "id_usuario",
            otherKey: "id_producto",
            timestamps: false
        });
    }

    return Usuario;
}