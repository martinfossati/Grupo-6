const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controladorProducts = 
{
    detalleProducto: (req, res) => {

        let idURL = req.params.id;
		let productoEncontrado;

		for (let elemento of products){
			if (elemento.id==idURL){
				productoEncontrado=elemento;
				break;
			}
		}
        res.render('products/detalleProducto', {productoDetalle: productoEncontrado});
    },
    creacionProducto: (req, res) => {
        res.render('products/creacionProducto')
    },
    edicionProducto: (req, res) => {

        let id = req.params.id;
		let productoEncontrado;
        
		for (let elemento of products){
            if (id==elemento.id){
                productoEncontrado=elemento;
			}
		}
        
        res.render('products/edicionProducto', {ProductoModificar: productoEncontrado});
    },
    productoModificado: (req, res) => {

        let id = req.params.id;

        for(elemento of products){
            if(id==elemento.id){
                 elemento.nombreProducto= req.body.nombreProducto;
                 elemento.precio= req.body.precio;
                 elemento.descuento= req.body.descuento;
                 elemento.descripcion= req.body.descripcion;
                 elemento.modoDeUso= req.body.modoDeUso;
                 break;
            }
        }

        fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

        res.redirect('/');
    },
    almacenamientoProducto: (req, res) => {

        idNuevo=0;

		for (let elemento of products){
			if (idNuevo<elemento.id){
				idNuevo=elemento.id;
			}
		}

		idNuevo++;


		let nombreImagen = req.file.filename;

		let productoNuevo =  {
			id:   idNuevo,
			nombreProducto: req.body.nombreProducto,
			precio: req.body.precio,
			descuento: req.body.descuento,
			descripcion: req.body.descripcion,
            modoDeUso: req.body.modoDeUso,
			imagen: nombreImagen,
		};

		products.push(productoNuevo);

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect('/');

    },
    eliminacionProducto: (req, res) => {

        let id = req.params.id;

        let productosActualizados = products.filter(function(elemento){
            return id != elemento.id;
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(productosActualizados,null,' '));

        res.redirect('/');
        
    },
    listadoProductos: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('products/listadoProductos', {productos: products})
    
    }
};

module.exports = controladorProducts;