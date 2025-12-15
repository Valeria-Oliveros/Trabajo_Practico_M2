/*****************************************************
 * SERVIDOR TCP - BOOK API
 * Implementado con el módulo NET de Node.js
 * Puerto: 8080
 *****************************************************/

console.log("Servidor listo");

// Importar el módulo 'net' para crear un servidor TCP
const net = require("net");

//Creamos el servidor TCP
const server = net.createServer((socket) => {
  console.log("Cliente conectado");

  socket.write("¡Bienvenido al servidor Book API!\n");

  let buffer = "";

  //Recibimos y procesamos los datos ingresados por el cliente
  socket.on("data", (data) => {
    buffer += data.toString();

    if (buffer.endsWith("\n")) {
      const command = buffer.trim().toLowerCase();
      buffer = "";
      console.log(`Comando recibido: ${command}`);

      let response;

      switch (command) {
        case "hola":
          response = "Hola, un gusto!";
          break;

        case "adios":
          response = "Nos vemos, chau!";
          socket.write(response + "\n");
          socket.end();
          return;

        default:
          response = "Comando no reconocido";
      }

      socket.write(response + "\n");
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

//Iniciamos el servidor en el puerto 8080 - Errores del servidor
server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
server.on("error", (err) => {
  console.error("Error en el servidor:", err.message);
});