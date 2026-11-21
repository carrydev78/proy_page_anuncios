const express = require('express');

const categoriaRoutes = require('./categoria.routes');
const publicacionRoutes = require('./publicacion.routes');

const Route = express.Router();

Route.use('/categorias', categoriaRoutes);
Route.use('/publicaciones', publicacionRoutes);

module.exports = Route;
