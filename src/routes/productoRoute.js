const express = require('express');
const { poblarProductos, buscarProductos, buscarCategoria, getProductos } = require('../controllers/externalController');
const router = express.Router();

router.post('/poblar', poblarProductos);

router.get('/getProductos', getProductos);

router.get('/search', buscarProductos);

router.get('/buscarCategoria/:termino', buscarCategoria);

module.exports = router;