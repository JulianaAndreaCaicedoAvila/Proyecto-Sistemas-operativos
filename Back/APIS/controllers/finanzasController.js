const { Worker } = require('worker_threads');
const path = require('path');
const Finanzas = require('../models/finanzasModel');

// Helper para ejecutar workers
async function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, 'finanzasWorker.js'), {
      workerData
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Crear registro de finanzas (sin worker, operación simple)
exports.crearFinanza = async (req, res) => {
  try {
    const finanza = await Finanzas.create(req.body);
    res.json(finanza);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear registro de finanzas' });
  }
};

// Obtener todas las finanzas con worker para procesamiento pesado
exports.obtenerFinanzas = async (req, res) => {
  try {
    const finanzas = await Finanzas.findAll();
    
    // Si necesitamos procesamiento complejo, usamos worker
    if (req.query.procesar === 'complejo') {
      const resultado = await runWorker({
        action: 'procesarFinanzas',
        data: finanzas
      });
      res.json(resultado);
    } else {
      res.json(finanzas);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros de finanzas' });
  }
};

// Obtener finanzas por usuario con posible procesamiento en worker
exports.obtenerFinanzasPorUsuario = async (req, res) => {
  try {
    const { ID_usuario } = req.params;
    const finanzas = await Finanzas.findAll({ where: { ID_usuario } });
    
    if (req.query.analisis === 'complejo') {
      const resultado = await runWorker({
        action: 'analizarFinanzasUsuario',
        data: finanzas,
        usuario: ID_usuario
      });
      res.json(resultado);
    } else {
      res.json(finanzas);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros de finanzas del usuario' });
  }
};

// Actualizar registro de finanzas (sin worker)
exports.actualizarFinanza = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Finanzas.update(req.body, { where: { id } });
    if (updated) {
      const finanza = await Finanzas.findByPk(id);
      res.json(finanza);
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar registro de finanzas' });
  }
};

// Eliminar registro de finanzas (sin worker)
exports.eliminarFinanza = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Finanzas.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Registro eliminado' });
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar registro de finanzas' });
  }
};

// Versión con Worker Threads para cálculo pesado
exports.calcularYGuardarFinanzas = async (req, res) => {
  try {
    const { ingresos, egresos, ID_usuario, descripcion } = req.body;

    const resultado = await runWorker({
      action: 'calcularFinanzas',
      data: { ingresos, egresos, ID_usuario, descripcion }
    });

    // Guardar el resultado (operación no bloqueante)
    const registro = await Finanzas.create(resultado);
    
    res.json(registro);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al calcular o guardar finanzas',
      details: error.message 
    });
  }
};