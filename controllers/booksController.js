/*****************************************************
 * CONTROLADOR DE LIBROS - BOOK API
*****************************************************/

const bookModel = require("../models/bookModel");

// Obtener todos los libros
function getBooks() {
  return bookModel.readAllBooks();
}

// Agregar un nuevo libro
function addBook(book) {
  return bookModel.addBook(book);
}

// Exporta las funciones para ser usadas en otros módulos
module.exports = {
  getBooks,
  addBook
};