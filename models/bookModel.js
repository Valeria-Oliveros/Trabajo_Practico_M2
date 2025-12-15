const fs = require("fs");
const path = require("path");

// Definimos la ruta a nuestro archivo books.json
const booksPath = path.join(__dirname, "../data/books.json");

// Creamos una función para leer los libros desde el archivo JSON
function readAllBooks() {
  const data = fs.readFileSync(booksPath, "utf-8");
  return JSON.parse(data);
}
//Creamos una función para guardar los libros
function saveBooks(books) {
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
}
//Creamos una función para agregar un libro
function addBook(newBook) {
    const books = readAllBooks();
    books.push(newBook);
    saveBooks(books);
    return newBook;
}

module.exports = {
  readAllBooks,
  addBook,
};