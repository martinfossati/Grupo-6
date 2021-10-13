/** REQUIRES **/
const productsRoutes = require('./src/routes/productsRoutes');
const indexRoutes = require('./src/routes/indexRoutes');
const carritoRoutes = require('./src/routes/carritoRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

/** EXPRESS **/
const app = express();

/** MIDDLEWARES **/
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookies());
app.use(session({secret: "FansClub Secret", resave: false, saveUninitialized: false}));
app.use(userLoggedMiddleware);

/** TEMPLATE ENGINE **/
app.set('view engine', 'ejs');

/** ROUTE SYSTEM **/
app.use('/', indexRoutes);

app.use('/carrito', carritoRoutes);

app.use('/productos', productsRoutes);

app.use('/', usersRoutes);

/** PORT **/
app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor Grupo 6 corriendo");
});