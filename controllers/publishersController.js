/*****************************************************
 * CONTROLADOR DE EDITORIALES - BOOK-API
*****************************************************/

const publishersModel = require("../models/publishersModel");

// Obtener todos las editoriales
function getPublishers() {
  return publishersModel.readAllPublishers();
}

// Agregar una nueva editorial
function addPublisher(publisher) {
  return publishersModel.addPublisher(publisher);
}

// Exporta las funciones para ser usadas en otros módulos
module.exports = {
  getPublishers,
  addPublisher
};