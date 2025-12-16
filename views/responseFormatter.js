/*****************************************************
 * RESPONSE FORMATTER - BOOK API
 * Se encarga de dar formato a las respuestas
 * que el servidor envía al cliente TCP
*****************************************************/

// Formatea la respuesta en un formato legible
function formatResponse(data) {
    if (typeof data === "object") {
        return JSON.stringify(data, null, 2);
    }
    return String(data);
}

// Formatea un mensaje de error
function formatError(message) {
    return `❌ ERROR: ${message}`;
}

// Formatea un mensaje de éxito
function formatSuccess(message) {
    return `✅ ${message}`;
}

// Exporta las funciones para ser usadas en otros módulos
module.exports = {
    formatResponse,
    formatError,
    formatSuccess
};
