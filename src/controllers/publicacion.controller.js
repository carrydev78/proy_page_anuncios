const { buscarCategoriaPorId } = require('./categoria.controller');

// Almacenamiento en memoria (sin base de datos)
const publicaciones = [];
let nextId = 1;

const listar = (req, res) => {
  return res.json(publicaciones);
};

const obtenerPorId = (req, res) => {
  const publicacion = publicaciones.find((item) => item.id === Number(req.params.id));

  if (!publicacion) {
    return res.status(404).json({ mensaje: `Publicación con id ${req.params.id} no encontrada` });
  }

  return res.json(publicacion);
};

const crear = (req, res) => {
  const { titulo, descripcion, precio, categoriaId } = req.body || {};

  if (!titulo || !String(titulo).trim()) {
    return res.status(400).json({ mensaje: 'El título de la publicación es obligatorio' });
  }

  if (categoriaId === undefined || !buscarCategoriaPorId(categoriaId)) {
    return res.status(400).json({ mensaje: 'La categoría indicada no existe' });
  }

  if (precio !== undefined && (!Number.isFinite(Number(precio)) || Number(precio) < 0)) {
    return res.status(400).json({ mensaje: 'El precio debe ser un número positivo' });
  }

  const publicacion = {
    id: nextId++,
    titulo: String(titulo).trim(),
    descripcion: descripcion ? String(descripcion).trim() : '',
    precio: precio !== undefined ? Number(precio) : 0,
    categoriaId: Number(categoriaId),
    fechaCreacion: new Date().toISOString()
  };

  publicaciones.push(publicacion);
  return res.status(201).json(publicacion);
};

const actualizar = (req, res) => {
  const publicacion = publicaciones.find((item) => item.id === Number(req.params.id));

  if (!publicacion) {
    return res.status(404).json({ mensaje: `Publicación con id ${req.params.id} no encontrada` });
  }

  const { titulo, descripcion, precio, categoriaId } = req.body || {};

  if (titulo !== undefined) {
    if (!String(titulo).trim()) {
      return res.status(400).json({ mensaje: 'El título de la publicación no puede estar vacío' });
    }
    publicacion.titulo = String(titulo).trim();
  }

  if (descripcion !== undefined) {
    publicacion.descripcion = String(descripcion).trim();
  }

  if (precio !== undefined) {
    if (!Number.isFinite(Number(precio)) || Number(precio) < 0) {
      return res.status(400).json({ mensaje: 'El precio debe ser un número positivo' });
    }
    publicacion.precio = Number(precio);
  }

  if (categoriaId !== undefined) {
    if (!buscarCategoriaPorId(categoriaId)) {
      return res.status(400).json({ mensaje: 'La categoría indicada no existe' });
    }
    publicacion.categoriaId = Number(categoriaId);
  }

  return res.json(publicacion);
};

const eliminar = (req, res) => {
  const id = Number(req.params.id);
  const indice = publicaciones.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: `Publicación con id ${req.params.id} no encontrada` });
  }

  const [publicacionEliminada] = publicaciones.splice(indice, 1);
  return res.json({ mensaje: 'Publicación eliminada', publicacion: publicacionEliminada });
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};
