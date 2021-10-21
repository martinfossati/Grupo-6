const db = require('../database/models');
const path = require('path');

const controladorDashboard = {
    countUsers: (req, res) => {
        db.Usuarios.findAll()
        .then(usuarios => {
            return res.json({
                count: usuarios.length,
                users: usuarios
            })
        });
    },
    findUser: (req, res) => {
        let id = req.params.id
        db.Usuarios.findOne({
            where: {
                id: id
            }
        }).then(usuario => {
            return res.json({
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                fecha_nacimiento: usuario.fecha_nacimiento,
                avatar: usuario.avatar
            });
        });
    },
    countProducts: (req, res) => {
        let resultado = {};
        db.Productos.findAll()
            .then(resultados => {
            resultado.count = resultados.length,
            resultado.products = resultados
            db.Productos.count({
                attributes: [
                    'categorias.nombre'
                ],
                group: "id_categoria",
                include: [
                    {association: "categorias"}
                ]
            })
            .then(categorias => {
                resultado.countByCategory = categorias
                return res.json(resultado);
            })
        })
    },
    findProduct: (req, res) => {
        let id = req.params.id
        db.Productos.findOne({
            where: {
                id: id
            }
        }).then(producto => {
        producto.imagen = path.resolve(__dirname, '../../public/images/products') + "\\" + producto.imagen; 
            return res.json(producto);
        });
    },
    countCategories: (req, res) => {
        db.Categorias.findAll()
        .then(categorias => {
            return res.json(categorias)
        });
    }
}

module.exports = controladorDashboard;