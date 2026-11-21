const express = require('express');
const categoriaController = require('../controllers/categoria.controller');

const router = express.Router();

router.get('/', categoriaController.listar);
router.get('/:id', categoriaController.obtenerPorId);
router.post('/', categoriaController.crear);
router.put('/:id', categoriaController.actualizar);
router.delete('/:id', categoriaController.eliminar);

module.exports = router;
