const db = require('../database/models')
const Op = db.Sequelize.Op

const controladorIndex =
{
    index: async (req, res) => {

        let todosLosProductos = await db.Productos.findAll();

        let masVisitados = await db.Productos.findAll({
            offset: 3,
            limit: 4
        });

        Promise.all([todosLosProductos, masVisitados]).then(productos => {
            res.render('index', {productos})
        });
    }
};

module.exports = controladorIndex;