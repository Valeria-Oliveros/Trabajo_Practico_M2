/*****************************************************
 * SERVIDOR TCP - BOOK API
 * Implementado con el módulo NET de Node.js
 * Puerto: 8080
*****************************************************/

// Importar el módulo 'net' para crear un servidor TCP
const net = require("net");

// Importamos los controladores
const { getBooks, addBook } = require("./controllers/booksController");
const { getAuthors, addAuthor } = require("./controllers/authorsController");
const { getPublishers, addPublisher } = require("./controllers/publishersController");

console.log("Servidor TCP iniciado");

//Creamos el servidor TCP
const server = net.createServer((socket) => {
  console.log("Cliente conectado");
  socket.write("¡Bienvenido al servidor Book API!\n");
  let buffer = "";

  //Recibimos y procesamos los datos ingresados por el cliente
  socket.on("data", (data) => {
    buffer += data.toString();

    if (!buffer.endsWith("\n")) return;

    const command = buffer.trim();
    buffer = "";

    console.log("Comando recibido:", command);

    try {
      // ================= GET BOOKS =================
      if (command.toUpperCase() === "GET BOOKS") {
        socket.write(JSON.stringify(getBooks(), null, 2) + "\n");
        return;
      }

      // ================= ADD BOOK =================
      if (command.toUpperCase().startsWith("ADD BOOK")) {
        const parts = command.split("|");

        if (parts.length !== 4) {
          socket.write("Formato incorrecto. Usa:\nADD BOOK|titulo|año|genero\n");
          return;
        }

        const [, title, year, genre] = parts;

        if (!title || !year || !genre) {
          socket.write("Error: Todos los campos son obligatorios\n");
          return;
        }

        const parsedYear = Number(year);
        if (isNaN(parsedYear) || parsedYear <= 0) {
          socket.write("Error: El año debe ser un número válido\n");
          return;
        }

        const books = getBooks();
        const nextId =
          books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

        addBook({
          id: nextId,
          title,
          authorId: nextId,
          publisherId: nextId,
          year: parsedYear,
          genre
        });

        socket.write("Libro agregado correctamente ✅\n");
        return;
      }

      // ================= GET AUTHORS =================
      if (command.toUpperCase() === "GET AUTHORS") {
        socket.write(JSON.stringify(getAuthors(), null, 2) + "\n");
        return;
      }

      // ================= ADD AUTHOR =================
      if (command.toUpperCase().startsWith("ADD AUTHOR")) {
        const parts = command.split("|");

        if (parts.length !== 3) {
          socket.write("Formato incorrecto. Usa:\nADD AUTHOR|nombre|nacionalidad\n");
          return;
        }

        const [, name, nationality] = parts;

        if (!name || !nationality) {
          socket.write("Error: Todos los campos son obligatorios\n");
          return;
        }

        const authors = getAuthors();
        const nextId =
          authors.length > 0 ? Math.max(...authors.map(a => a.id)) + 1 : 1;
        addAuthor({
          id: nextId,
          name,
          nationality
        });

        socket.write("Autor agregado correctamente ✅\n");
        return;
      }

      // ================= GET PUBLISHERS =================
      if (command.toUpperCase() === "GET PUBLISHERS") {
        socket.write(JSON.stringify(getPublishers(), null, 2) + "\n");
        return;
      }

      // ================= ADD PUBLISHER =================
      if (command.toUpperCase().startsWith("ADD PUBLISHER")) {
        const parts = command.split("|");

        if (parts.length !== 3) {
          socket.write("Formato incorrecto. Usa:\nADD PUBLISHER|nombre|ciudad\n");
          return;
        }

        const [, name, city] = parts;

        if (!name || !city) {
          socket.write("Error: Todos los campos son obligatorios\n");
          return;
        }

        const publishers = getPublishers();
        const nextId =
          publishers.length > 0 ? Math.max(...publishers.map(p => p.id)) + 1 : 1;
        addPublisher({
          id: nextId,
          name,
          city
        });

        socket.write("Editorial agregada correctamente ✅\n");
        return;
      }

      // ================= OTROS =================
      socket.write("Comando no reconocido ❌\n");

    } catch (error) {
      console.error("Error procesando comando:", error.message);
      socket.write("Error interno del servidor ❌\n");
    }
  });

  //Manejamos la desconexión del cliente
  socket.on("end", () => {
    console.log("Cliente desconectado");
  });

  //Manejamos errores en el socket
  socket.on("error", (err) => {
    console.error("Error en el socket:", err.message);
  });
});

//Iniciamos el servidor en el puerto 8080
server.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});