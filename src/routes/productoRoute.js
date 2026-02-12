const express = require('express');
const { poblarProductos, buscarProductos, buscarCategoria } = require('../controllers/externalController');
const router = express.Router();

router.post('/poblar', poblarProductos);

router.get('/buscarProductos/:termino', buscarProductos);

router.get('/buscarCategoria/:termino', buscarCategoria);

module.exports = router;