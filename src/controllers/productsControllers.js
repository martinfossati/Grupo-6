const db = require('../database/models')
const Op = db.Sequelize.Op
const { validationResult } = require('express-validator');

const controladorProducts = 
{
    detalleProducto: (req, res) => {

        let idURL = req.params.id;
		let productoEncontrado;

        db.Productos.findOne({
            where: {id: idURL}
        }).then(resultado =>{
            productoEncontrado = resultado;
            res.render('products/detalleProducto', {productoDetalle: productoEncontrado});
        })
    },
    creacionProducto: (req, res) => {
        res.render('products/creacionProducto')
    },
    edicionProducto: (req, res) => {

        let idURL = req.params.id;
		let productoEncontrado;

        db.Productos.findOne({
            where: {
                id: idURL
            }
        }).then(producto => {
            productoEncontrado = producto;
            res.render('products/edicionProducto', {productoEncontrado});
        });
        
    },
    productoModificado: async (req, res) => {

        let resultValidationEdicion = validationResult(req);

        if(resultValidationEdicion.errors.length > 0){
            return res.render('products/edicionProducto', {
                errors: resultValidationEdicion.mapped()
            })
        }

        let idURL = req.params.id;
        let categorias = await db.Categorias.findOne({
            where: {nombre: req.body.categoria}
        })

        db.Productos.update({
            nombre: req.body.nombreProducto,
            precio: req.body.precio,
            descuento: req.body.descuento,
            descripcion: req.body.descripcion,
            modo_de_uso: req.body.modoDeUso,
            imagen: req.file.filename,
            id_categoria: categorias["id"]
        },
        {
            where: {id: idURL}
        });


        res.redirect('/');
    },
    almacenamientoProducto: async (req, res) => {

        let resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0){
            return res.render('products/creacionProducto', {
                errors: resultValidation.mapped()
            })
        }
        
		let nombreImagen = req.file.filename;
        let categorias = await db.Categorias.findOne({
            where: {nombre: req.body.categoria}
        })
        
		db.Productos.create({
			nombre: req.body.nombreProducto,
			precio: req.body.precio,
			descuento: req.body.descuento,
			descripcion: req.body.descripcion,
            modo_de_uso: req.body.modoDeUso,
			imagen: nombreImagen,
            id_categoria: categorias["id"]
		}).then(() => {
            res.redirect('/');
        });

    },
    eliminacionProducto: (req, res) => {

        let idURL = req.params.id;

        db.Productos.destroy({
            where: {id: idURL}
        });

        res.redirect('/');
        
    },
    listadoProductos: (req, res) => {
        let todosLosProductos;
        db.Productos.findAll()
        .then(productos => {
            todosLosProductos = productos;
            res.render('products/listadoProductos', {todosLosProductos})
        })
    },
};

module.exports = controladorProducts;