const express = require('express');
const router = express.Router();
const finanzasController = require('../controllers/finanzasController');

router.post('/finanzas', finanzasController.crearFinanza);
router.get('/finanzas', finanzasController.obtenerFinanzas);
router.get('/finanzas/usuario/:ID_usuario', finanzasController.obtenerFinanzasPorUsuario);
router.put('/finanzas/:id', finanzasController.actualizarFinanza);
router.delete('/finanzas/:id', finanzasController.eliminarFinanza);
router.post('/finanzas/calcular', finanzasController.calcularYGuardarFinanzas);

module.exports = router;