/** REQUIRES **/
const productsRoutes = require('./src/routes/productsRoutes');
const indexRoutes = require('./src/routes/indexRoutes');
const carritoRoutes = require('./src/routes/carritoRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const cors = require('cors')

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
app.use(cors());

/** TEMPLATE ENGINE **/
app.set('view engine', 'ejs');

/** ROUTE SYSTEM **/
app.use('/', indexRoutes);

app.use('/carrito', carritoRoutes);

app.use('/productos', productsRoutes);

app.use('/', usersRoutes);

app.use('/', dashboardRoutes);

/** PORT **/
app.listen(process.env.PORT || 3001, function() {
    console.log("Servidor Grupo 6 corriendo");
});