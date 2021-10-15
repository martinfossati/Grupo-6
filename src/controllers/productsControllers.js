const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const { validationResult } = require('express-validator');

const controladorProducts = 
{
    productDetail: (req, res) => {

        let idURL = req.params.id;
		let productoEncontrado;

        db.Productos.findOne({
            where: {id: idURL}
        }).then(resultado =>{
            productoEncontrado = resultado;
            res.render('products/detalleProducto', {productoDetalle: productoEncontrado});
        });
    },
    createProduct: (req, res) => {
        res.render('products/creacionProducto')
    },
    storeProduct: async (req, res) => {

        let resultValidation = validationResult(req);
        
        if(resultValidation.errors.length == 0){

            let imagenProducto = req.file.filename;
            let categorias = await db.Categorias.findOne({
                where: {nombre: req.body.categoria}
            })
            
            db.Productos.create({
                nombre: req.body.nombreProducto,
                precio: req.body.precio,
                descuento: req.body.descuento,
                descripcion: req.body.descripcion,
                modo_de_uso: req.body.modoDeUso,
                imagen: imagenProducto,
                id_categoria: categorias["id"]
            }).then(() => {
                res.redirect('/');
            });

        } else {
            res.render('products/creacionProducto', {
            errors: resultValidation.mapped()
            })
        };

    },
    editProduct: (req, res) => {
    
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
    updateProduct: async (req, res) => {
        
        let resultValidation = validationResult(req);
        
        if(resultValidation.errors.length == 0){

            let idURL = req.params.id;
            let imagenProducto = req.file.filename;
            let categorias = await db.Categorias.findOne({
                where: {nombre: req.body.categoria}
            })

            db.Productos.findOne({
                where: {
                    id: idURL
                }
            }).then(producto => {
                let imagenVieja = producto.imagen;
                fs.unlinkSync(path.join(__dirname, '../../public/images/products', imagenVieja));
            });

            db.Productos.update({
                nombre: req.body.nombreProducto,
                precio: req.body.precio,
                descuento: req.body.descuento,
                descripcion: req.body.descripcion,
                modo_de_uso: req.body.modoDeUso,
                imagen: imagenProducto,
                id_categoria: categorias["id"]
            },
            {
                where: {id: idURL}
            }).then(() => {
                res.redirect('/');
            })
        } else {

            let idURL = req.params.id;
            db.Productos.findOne({
                where: {
                    id: idURL
                }
            }).then(producto => {
                productoEncontrado = producto;
                res.render('products/edicionProducto', {productoEncontrado, errors: resultValidation.mapped()});
            });
        }

    },
    deleteProduct: (req, res) => {

        let idURL = req.params.id;

        db.Productos.findByPk(idURL)
        .then(producto => {
            let imagenVieja = producto.imagen;
            fs.unlinkSync(path.join(__dirname, '../../public/images/products', imagenVieja));
        }).then(
            db.Productos.destroy({
                where: {id: idURL}
            })
        )
        res.redirect('/');
         
    },
    productList: (req, res) => {

        let todosLosProductos;

        db.Productos.findAll()
        .then(productos => {
            todosLosProductos = productos;
            res.render('products/listadoProductos', {todosLosProductos})
        });
    }
};

module.exports = controladorProducts;