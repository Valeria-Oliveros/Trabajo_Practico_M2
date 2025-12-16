/*****************************************************
 * CONTROLADOR DE AUTORES - BOOK-API
*****************************************************/

const authorsModel = require("../models/authorsModel");

// Obtener todos los autores
function getAuthors() {
  return authorsModel.readAllAuthors();
}

// Agregar un nuevo autor
function addAuthor(author) {
  return authorsModel.addAuthor(author);
}

// Exporta las funciones para ser usadas en otros módulos
module.exports = {
  getAuthors,
  addAuthor
};