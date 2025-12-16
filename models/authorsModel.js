/*****************************************************
 * MÓDULOS DE AUTORES - BOOK API
 * Lee, guarda y agrega autores usando Node.js
 * Datos en /data/authors.json
*****************************************************/

const fs = require("fs");
const path = require("path");

// Definimos la ruta a nuestro archivo authors.json
const authorsPath = path.join(__dirname, "../data/authors.json");

// Creamos una función para leer los autores desde el archivo JSON
function readAllAuthors() {
  const data = fs.readFileSync(authorsPath, "utf-8");
  return JSON.parse(data);
}
//Creamos una función para guardar a los autores
function saveAuthors(authors) {
    fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2));
}
//Creamos una función para agregar un autor
function addAuthor(newAuthor) {
    const authors = readAllAuthors();
    authors.push(newAuthor);
    saveAuthors(authors);
    return newAuthor;
}

// Exporta las funciones para ser usadas en otros módulos
module.exports = {
  readAllAuthors,
  addAuthor,
};