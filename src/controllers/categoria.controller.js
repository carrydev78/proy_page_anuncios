// Almacenamiento en memoria (sin base de datos)
const categorias = [];
let nextId = 1;

// Busca una categoría por id (helper reutilizable por otros controladores)
const buscarCategoriaPorId = (id) => categorias.find((categoria) => categoria.id === Number(id));

const listar = (req, res) => {
  return res.json(categorias);
};

const obtenerPorId = (req, res) => {
  const categoria = buscarCategoriaPorId(req.params.id);

  if (!categoria) {
    return res.status(404).json({ mensaje: `Categoría con id ${req.params.id} no encontrada` });
  }

  return res.json(categoria);
};

const crear = (req, res) => {
  const { nombre, descripcion } = req.body || {};

  if (!nombre || !String(nombre).trim()) {
    return res.status(400).json({ mensaje: 'El nombre de la categoría es obligatorio' });
  }

  const categoria = {
    id: nextId++,
    nombre: String(nombre).trim(),
    descripcion: descripcion ? String(descripcion).trim() : ''
  };

  categorias.push(categoria);
  return res.status(201).json(categoria);
};

const actualizar = (req, res) => {
  const categoria = buscarCategoriaPorId(req.params.id);

  if (!categoria) {
    return res.status(404).json({ mensaje: `Categoría con id ${req.params.id} no encontrada` });
  }

  const { nombre, descripcion } = req.body || {};

  if (nombre !== undefined) {
    if (!String(nombre).trim()) {
      return res.status(400).json({ mensaje: 'El nombre de la categoría no puede estar vacío' });
    }
    categoria.nombre = String(nombre).trim();
  }

  if (descripcion !== undefined) {
    categoria.descripcion = String(descripcion).trim();
  }

  return res.json(categoria);
};

const eliminar = (req, res) => {
  const id = Number(req.params.id);
  const indice = categorias.findIndex((categoria) => categoria.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: `Categoría con id ${req.params.id} no encontrada` });
  }

  const [categoriaEliminada] = categorias.splice(indice, 1);
  return res.json({ mensaje: 'Categoría eliminada', categoria: categoriaEliminada });
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  buscarCategoriaPorId
};
