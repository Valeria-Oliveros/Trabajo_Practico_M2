/*****************************************************
 * CLIENTE TCP - BOOK API
 * Interactúa con el servidor TCP
 *****************************************************/

const net = require("net");
const readline = require("readline");
let menuActual = "principal";

// Creamos el cliente TCP
const client = new net.Socket();

client.setTimeout(5000);

// Creamos la interfaz para leer desde consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Conectamos al servidor
client.connect(8080, "localhost", () => {
    console.log("conectandose al servidor...");
});

let servidorListo = false;
// Escuchamos respuestas del servidor
client.on("data", (data) => {
    const mensaje = data.toString();
    if (!servidorListo) {
        console.log("Conectado al servidor.");
        console.log(mensaje);
        servidorListo = true;
        client.setTimeout(0);
        mostrarMenuPrincipal();
        return;
    }
    console.log("\nRespuesta del servidor:");
    console.log(data.toString());
    if (menuActual === "libros") menuLibros();
    else if (menuActual === "autores") menuAutores();
    else if (menuActual === "editoriales") menuEditoriales();
    else mostrarMenuPrincipal();
});

// Manejo de errores y cierre de conexión
client.on("error", (err) => {
  console.error("Error: el servidor dejó de responder");
  process.exit(1);
});
client.on("timeout", () => {
    if (!servidorListo) {
        console.error("Error: No se pudo conectar al servidor");
    }else {
        console.error("Error: El servidor dejó de responder");
    }
    client.destroy();
    process.exit(1);
});
client.on("close", () => {
  console.log("Conexión cerrada");
  rl.close();
});

// ================= MENÚ PRINCIPAL =================
function mostrarMenuPrincipal() {
    menuActual = "principal";
    console.log("\nMENÚ PRINCIPAL");
    console.log("1. Libros");
    console.log("2. Autores");
    console.log("3. Editoriales");
    console.log("4. Salir");

    rl.question("> ", (opcion) => {
        switch (opcion) {
            case "1":
                menuLibros();
                break;
            case "2":
                menuAutores();
                break;
            case "3":
                menuEditoriales();
                break;
            case "4":
                console.log("Saliendo...");
                client.end();
                break;
            default:
                console.log("Opción inválida");
                mostrarMenuPrincipal();
        }
    });
}
// ================= SUBMENÚ LIBROS =================
function menuLibros() {
    menuActual = "libros";
    console.log("\nMENÚ LIBROS");
    console.log("1. GET BOOKS");
    console.log("2. ADD BOOK");
    console.log("3. Volver");

    rl.question("> ", (opcion) => {
        switch (opcion) {
            case "1":
                client.write("GET BOOKS\n");
                break;
            case "2":
                rl.question("Título: ", (title) => {
                    rl.question("Año: ", (year) => {
                        rl.question("Género: ", (genre) => {
                            client.write(`ADD BOOK|${title}|${year}|${genre}\n`);
                        });
                    });
                });
                break;
            case "3":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("Opción inválida");
                menuLibros();
        }
    });
}
// ================= SUBMENÚ AUTORES =================
function menuAutores() {
    menuActual = "autores";
    console.log("\nAUTORES");
    console.log("1. GET AUTHORS");
    console.log("2. ADD AUTHOR");
    console.log("3. Volver");

    rl.question("> ", (opcion) => {
        switch (opcion) {
            case "1":
                client.write("GET AUTHORS\n");
                break;
            case "2":
                rl.question("Nombre: ", (name) => {
                    rl.question("Nacionalidad: ", (nationality) => {
                         client.write(`ADD AUTHOR|${name}|${nationality}\n`);
                        });
                    });
                break;
            case "3":
                 mostrarMenuPrincipal();
                 break;

            default:
                console.log("Opción inválida");
                menuAutores();
        }
    });
}
// ================= SUBMENÚ EDITORIALES =================
function menuEditoriales() {
    menuActual = "editoriales";
    console.log("\nEDITORIALES");
    console.log("1. GET PUBLISHERS");
    console.log("2. ADD PUBLISHER");
    console.log("3. Volver");

    rl.question("> ", (opcion) => {
        switch (opcion) {
            case "1":
                client.write("GET PUBLISHERS\n");
                break;
            case "2":
                rl.question("Nombre: ", (name) => {
                    rl.question("Ciudad: ", (city) => {
                        client.write(`ADD PUBLISHER|${name}|${city}\n`);
                    });
                });
                break;
            case "3":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("Opción inválida");
                menuEditoriales();
        }
    });
}