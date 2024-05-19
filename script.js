// Función constructora de causas
function Causa(nombre, area) {
    this.nombre = nombre;
    this.area = area;
}

// Causas predefinidas
let causa1 = new Causa("Ayudemos a Juana", "salud");
let causa2 = new Causa("Construyamos una escuela en Colico Alto", "educación");
let causa3 = new Causa("Apoyemos el emprendimiento local", "emprendimiento");
let causa4 = new Causa("Mejoras en infraestructura comunitaria", "construcción");

// Lista de causas
let listaCausas = [causa1, causa2, causa3, causa4];

// Función para filtrar causas por área
function filtrarCausasPorArea(causas, area) {
    return causas.filter(causa => causa.area.toLowerCase() === area.toLowerCase());
}

// Función para buscar una causa por nombre
function buscarCausaPorNombre(causas, nombre) {
    return causas.find(causa => causa.nombre.toLowerCase() === nombre.toLowerCase());
}

// Función para validar texto (solo letras y espacios)
function esTextoValido(texto) {
    return /^[a-zA-Z\s]+$/.test(texto);
}

// Función para validar números enteros
function esNumeroEntero(numero) {
    return /^[0-9]+$/.test(numero);
}

// Función para validar números flotantes
function esNumeroFlotante(numero) {
    return /^[0-9]+(\.[0-9]+)?$/.test(numero);
}

// Función para validar RUT (solo números, guiones y puntos)
function esRUTValido(rut) {
    return /^[0-9]+[-.0-9]+$/.test(rut);
}

// Declaración de variables
let nombre;
let rut;
let monto;
let causaSeleccionada;

// Solicitar nombre y validar que sea texto
do {
    nombre = prompt("Ingrese su nombre: ");
    if (!esTextoValido(nombre)) {
        alert("Por favor, ingrese un nombre válido (solo texto).");
    }
} while (!esTextoValido(nombre));

// Solicitar RUT y validar que sea correcto
do {
    rut = prompt("Ingrese su RUT: ");
    if (!esRUTValido(rut)) {
        alert("Por favor, ingrese un RUT válido (solo números, guiones y puntos).");
    }
} while (!esRUTValido(rut));

// Solicitar monto y validar que sea un número flotante
do {
    monto = prompt("Ingrese monto a aportar: ");
    if (!esNumeroFlotante(monto)) {
        alert("Por favor, ingrese un monto válido (número flotante).");
    }
} while (!esNumeroFlotante(monto));

monto = parseFloat(monto); // Convertir monto a número flotante

// Solicitar área para filtrar causas
let areaFiltrar = prompt("Ingrese el área por la cual desea filtrar las causas (ej. educación, salud, construcción, emprendimiento):");
let causasFiltradas = filtrarCausasPorArea(listaCausas, areaFiltrar);

// Verificar si hay causas disponibles en el área seleccionada
if (causasFiltradas.length > 0) {
    let causasNombres = causasFiltradas.map(causa => causa.nombre).join('\n');

    // Solicitar selección de causa y validar que sea una causa existente
    do {
        let causaSeleccionadaNombre = prompt(`Las causas disponibles en el área de ${areaFiltrar} son:\n${causasNombres}\nIngrese el nombre de la causa a la que desea donar:`);
        causaSeleccionada = buscarCausaPorNombre(causasFiltradas, causaSeleccionadaNombre);

        if (!causaSeleccionada) {
            alert("No se encontró una causa con ese nombre. Por favor, intente de nuevo.");
        }
    } while (!causaSeleccionada);

    alert(`Usted ha seleccionado donar a la causa: ${causaSeleccionada.nombre} en el área de ${causaSeleccionada.area}`);
} else {
    alert(`No se encontraron causas en el área de ${areaFiltrar}.`);
    causaSeleccionada = null; // Asegurar que causaSeleccionada sea null
}

if (causaSeleccionada) {
    alert("Los datos de su donación son: " + "Nombre: " + nombre + "  " + "RUT: " + rut + "  " + "Causa a la que donará: " + causaSeleccionada.nombre + "  " + "Monto total a donar: " + monto);
}
