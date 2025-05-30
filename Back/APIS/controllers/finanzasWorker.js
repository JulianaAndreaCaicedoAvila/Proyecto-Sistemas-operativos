// Importación de módulos necesarios para el worker
const { parentPort, workerData } = require('worker_threads'); // Módulo para comunicación entre threads
const Finanzas = require('../models/finanzasModel'); // Modelo de datos para operaciones con BD

/**
 * Función que simula cálculo intensivo de totales financieros
 * @param {Array} lista - Array de objetos con {desc, valor}
 * @returns {Number} - Total calculado con operaciones complejas
 */
function calcularTotal(lista) {
  let total = 0; // Inicializa acumulador
  
  // Bucle externo para procesar cada elemento de la lista
  for (let i = 0; i < lista.length; i++) {
    // Bucle interno para simular procesamiento complejo (100,000 iteraciones)
    for (let j = 0; j < 100000; j++) {
      
      total += Math.sqrt(Math.pow(Number(lista[i].valor), 2)) + j % 2;
    }
    // Promedia los resultados del cálculo intensivo
    total = total / 100000;
  }
  return total; // Retorna total calculado
}

/**
 * Procesa registros financieros para calcular métricas de riesgo
 * @param {Array} finanzas - Array de registros financieros
 * @returns {Array} - Registros originales con campo 'riesgo' agregado
 */
function procesarFinanzasComplejo(finanzas) {
  // Mapea cada registro para agregar análisis de riesgo
  return finanzas.map(item => {
    let complejidad = 0; // Inicializa acumulador de riesgo
    
    // Bucle para cálculo de métrica de riesgo (1,000 iteraciones)
    for (let i = 0; i < 1000; i++) {
    
      complejidad += Math.sin(item.ingresos || 0) + Math.cos(item.egresos || 0);
    }
    
    // Retorna nuevo objeto con datos originales + riesgo calculado
    return {
      ...item.dataValues, // Copia todas las propiedades originales
      riesgo: complejidad / 1000 // Agrega riesgo promediado
    };
  });
}

/**
 * Función principal que maneja las diferentes acciones del worker
 * @returns {Promise} - Promesa que resuelve con el resultado del procesamiento
 */
async function handleAction() {
  try {
    // Extrae parámetros recibidos del hilo principal
    const { action, data, usuario } = workerData;

    // Switch para manejar diferentes tipos de acciones
    switch (action) {
      case 'calcularFinanzas': // Acción para cálculo de totales
        // Procesa ingresos y egresos EN PARALELO usando Promise.all
        const [totalIngresos, totalEgresos] = await Promise.all([
          calcularTotal(data.ingresos), // Worker 1: Calcula total ingresos
          calcularTotal(data.egresos)  // Worker 2: Calcula total egresos
        ]);
        
        // Retorna objeto con estructura esperada por el modelo
        return {
          ingresos: totalIngresos,
          egresos: totalEgresos,
          deudas: 0, // Valor por defecto
          abonos: 0, // Valor por defecto
          descripcion: data.descripcion,
          ID_usuario: data.ID_usuario
        };

      case 'procesarFinanzas': // Acción para procesamiento complejo
        return procesarFinanzasComplejo(data);

      case 'analizarFinanzasUsuario': // Acción para análisis de usuario
        const analisis = procesarFinanzasComplejo(data); // Procesa datos
        return {
          usuario, // ID de usuario original
          totalRegistros: analisis.length, // Conteo de registros
          analisis, // Datos procesados
          // Calcula promedio de ingresos
          promedioIngresos: analisis.reduce((acc, item) => acc + (item.ingresos || 0), 0) / analisis.length
        };

      default: // Manejo de acciones no implementadas
        throw new Error('Acción no implementada en el worker');
    }
  } catch (error) {
    // Propaga errores al hilo principal
    throw error;
  }
}


handleAction()
  .then(result => parentPort.postMessage(result)) // Éxito: envía resultados
  .catch(error => parentPort.postMessage({ error: error.message })); // Error: envía mensaje