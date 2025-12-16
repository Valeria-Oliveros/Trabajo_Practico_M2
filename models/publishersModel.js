/*****************************************************
 * MÓDULOS DE EDITORIALES - BOOK API
 * Lee, guarda y agrega editoriales usando Node.js
 * Datos en /data/publishers.json
*****************************************************/

const fs = require("fs");
const path = require("path");

// Definimos la ruta a nuestro archivo publishers.json
const publishersPath = path.join(__dirname, "../data/publishers.json");

// Creamos una función para leer las editoriales desde el archivo JSON
function readAllPublishers() {
  const data = fs.readFileSync(publishersPath, "utf-8");
  return JSON.parse(data);
}
//Creamos una función para guardar a las editoriales
function savePublishers(publishers) {
  fs.writeFileSync(publishersPath, JSON.stringify(publishers, null, 2));
}
//Creamos una función para agregar una editorial
function addPublisher(newPublisher) {
  const publishers = readAllPublishers();
  publishers.push(newPublisher);
  savePublishers(publishers);
  return newPublisher;
}

// Exporta las funciones para ser usadas en otros módulos
module.exports = {
  readAllPublishers,
  addPublisher,
};