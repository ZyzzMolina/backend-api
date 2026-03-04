const express = require('express');
const { poblarProductos, buscarProductos, buscarCategoria, getProductos, createProducto } = require('../controllers/externalController');
const authmiddleware = require('../../middleware/authmiddleware');
const router = express.Router();

router.post('/poblar', poblarProductos);

router.post('/',authmiddleware, createProducto);

router.get('/getProductos', getProductos);

router.get('/search', buscarProductos);

router.get('/buscarCategoria/:termino', buscarCategoria);


module.exports = router;