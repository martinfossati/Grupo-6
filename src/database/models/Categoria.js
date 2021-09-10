module.exports = (sequelize, dataTypes) => {

    let alias = "Categorias";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };

    let config = {
        tableName: "categorias",
        timestamps: false
    };

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(modelos) {
        Categoria.hasMany(modelos.Productos, {
            as: "productos",
            foreignKey: "id_categoria"
        });
    }

    return Categoria;
}