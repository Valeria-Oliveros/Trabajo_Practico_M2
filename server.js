/*****************************************************
 * SERVIDOR TCP - BOOK API
 * Implementado con el módulo NET de Node.js
 * Puerto: 8080
*****************************************************/

// Importar el módulo 'net' para crear un servidor TCP
const net = require("net");
const { readAllBooks, addBook } = require("./models/bookModel");

console.log("Servidor TCP iniciado");

//Creamos el servidor TCP
const server = net.createServer((socket) => {
  console.log("Cliente conectado");
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
        const books = readAllBooks();
        socket.write(JSON.stringify(books, null, 2) + "\n");
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

        const books = readAllBooks();
        const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

        const newBook = {
          id: newId,
          title,
          authorId:newId,
          publisherId: newId,
          year: Number(year),
          genre,
        };          

        addBook(newBook);

        socket.write("Libro agregado correctamente ✅\n");
        return;
      }

      // ================= OTROS =================
      socket.write("Comando no reconocido\n");

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
