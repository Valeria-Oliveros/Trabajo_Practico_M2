# Book API – Servidor y Cliente TCP con Node.js

Proyecto integrador desarrollado en Node.js que implementa una **API de libros, autores y editoriales** utilizando comunicación TCP mediante el módulo `net`, siguiendo el patrón MVC y persistiendo datos en archivos JSON.

---

## Estructura del proyecto

```
book-api/
│
├── controllers/        # Controladores (lógica de la API)
├── models/             # Modelos (lectura/escritura JSON)
├── views/              # Formato de respuestas
├── data/               # Archivos JSON (persistencia)
├── client.js           # Cliente TCP
├── server.js           # Servidor TCP
├── package.json
└── README.md
```

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

* Node.je (versión 18 o superior recomendada)
* npm (incluido con Node.js)

Puedes verificarlo con:

```bash
node -v
npm -v
```

---

## Instalación y configuración

1. Clona o descarga este repositorio.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Instala las dependencias:

```bash
npm install
```

> El proyecto utiliza la dependencia `uuid` para manejar identificadores únicos.

---

## Ejecución del proyecto

1️⃣ Iniciar el servidor TCP

En una terminal:

```bash
npm start
```

Salida esperada:

```txt
Servidor TCP iniciado
Servidor escuchando en puerto 8080
```

---

2️⃣ Iniciar el cliente TCP

En otra terminal, ejecuta:

```bash
node client.js
```

Salida esperada:

```txt
Conectado al servidor
¡Servidor Book API listo!

MENÚ PRINCIPAL
1. Libros
2. Autores
3. Editoriales
4. Salir
```

---

## Menús y comandos disponibles

-> Para navegar por los menús, el usuario debe ingresar únicamente el número correspondiente a la opción deseada.
No es necesario escribir el comando textual.

Menú principal

```
1. Libros
2. Autores
3. Editoriales
4. Salir
```

-> Opciones disponibles por sección

| **Libros**      | **Autores**     | **Editoriales**   |
|-----------------|-----------------|-------------------|
| GET BOOKS       | GET AUTHORS     | GET PUBLISHERS    |
| ADD BOOK        | ADD AUTHOR      | ADD PUBLISHER     |
| Salir           | Salir           | Salir             |

- **GET** permite **listar** los registros almacenados.
- **ADD** permite **agregar** nuevos registros al sistema.

Según la sección seleccionada, los datos requeridos son:

- **Libros**: para agregar un libro se solicitan tres datos obligatorios:  
  título|año|género

- **Autores**: para agregar un autor se solicitan dos datos obligatorios:  
  nombre|nacionalidad

- **Editoriales**: para agregar una editorial se solicitan dos datos obligatorios:  
  nombre|ciudad.

El cliente TCP se encarga de transformar las opciones numéricas en comandos y enviarlos al servidor, el cual procesa la solicitud y devuelve la respuesta correspondiente.

---

## 🚨 Manejo de errores implementado

* Error si el servidor no está encendido
* Timeout si el servidor no responde
* Validación de formato incorrecto en comandos
* Validación de campos numéricos (ej. año)

## 🧠 Notas finales

* El proyecto mantiene la conexión activa mientras el usuario navega por los menús.
* Los IDs se generan automáticamente según el último registro existente.
* El código está comentado para facilitar su comprensión.

---