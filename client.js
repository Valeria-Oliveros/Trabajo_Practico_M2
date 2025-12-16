/*****************************************************
 * CLIENTE TCP - BOOK API
 * Implementado con el módulo NET de Node.js
 * Conexión al servidor en puerto 8080
*****************************************************/
// Importar los módulos necesarios
const net = require("net");
const readline = require("readline");

const client = new net.Socket();

// Configuramos la interfaz de lectura para la entrada estándar
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Conectamos al servidor TCP en localhost:8080
client.connect(8080, "localhost", () => {
  console.log("Conectado al servidor");
  console.log("\n¡Bienvenido al servidor Book API!\n");
  mostrarMenu();
});

// Manejamos la respuesta del servidor
client.on("data", (data) => {
  console.log("\nRespuesta del servidor:");
  console.log(data.toString());
  mostrarMenu();
});

// Manejamos el cierre de la conexión y errores del client
client.on("close", () => {
  console.log("Conexión cerrada");
  rl.close();
});
client.on("error", (err) => {
  console.error("Error en el cliente:", err.message);
});

// Función para mostrar el menú de opciones al usuario
function mostrarMenu() {
  console.log("\nComandos disponibles:");
  console.log("1. GET BOOKS");
  console.log("2. ADD BOOK");
  console.log("3. SALIR");

  rl.question("> ", (opcion) => {
    switch (opcion.trim()) {
      case "1":
        client.write("GET BOOKS\n");
        break;

      case "2":
        pedirLibro();
        break;

      case "3":
        client.write("adios\n");
        client.end();
        break;

      default:
        console.log("Opción inválida");
        mostrarMenu();
    }
  });
}

// Función para pedir los datos de un nuevo libro al usuario
function pedirLibro() {
  rl.question("Título: ", (title) => {
    rl.question("Año: ", (year) => {
      rl.question("Género: ", (genre) => {
        const comando = `ADD BOOK|${title}|${year}|${genre}\n`;
        client.write(comando);
      });
    });
  });
}
