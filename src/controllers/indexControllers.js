const db = require('../database/models')
const Op = db.Sequelize.Op

const controladorIndex =
{
    index: (req, res) => {
        let todosLosProductos;
        db.Productos.findAll()
        .then(productos => {
            todosLosProductos = productos;
            res.render('index', {todosLosProductos})
        })
    }
};

module.exports = controladorIndex;