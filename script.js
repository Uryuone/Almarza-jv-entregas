// script.js

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

// Función para validar RUT (solo números, guiones y puntos)
function esRUTValido(rut) {
    return /^[0-9]+[-.0-9]+$/.test(rut);
}

// Manejo del DOM y eventos
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donationForm');
    const areaSelect = document.getElementById('area');
    const causaSelect = document.getElementById('causa');
    const donationDetails = document.getElementById('donationDetails');

    // Manejar el cambio en el área para filtrar causas
    areaSelect.addEventListener('change', (e) => {
        const area = e.target.value;
        const causasFiltradas = filtrarCausasPorArea(listaCausas, area);

        // Limpiar el select de causas
        causaSelect.innerHTML = '<option value="">Seleccione una causa</option>';

        // Agregar las causas filtradas al select
        causasFiltradas.forEach(causa => {
            const option = document.createElement('option');
            option.value = causa.nombre;
            option.textContent = causa.nombre;
            causaSelect.appendChild(option);
        });
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const rut = document.getElementById('rut').value;
        const monto = document.getElementById('monto').value;
        const causaNombre = causaSelect.value;
        const area = areaSelect.value;

        // Validar los datos
        if (!esTextoValido(nombre)) {
            alert("Por favor, ingrese un nombre válido (solo texto).");
            return;
        }

        if (!esRUTValido(rut)) {
            alert("Por favor, ingrese un RUT válido (solo números, guiones y puntos).");
            return;
        }

        const causaSeleccionada = buscarCausaPorNombre(listaCausas, causaNombre);

        if (!causaSeleccionada) {
            alert("Por favor, seleccione una causa válida.");
            return;
        }

        // Mostrar detalles de la donación
        document.getElementById('detalleNombre').textContent = `Nombre: ${nombre}`;
        document.getElementById('detalleRUT').textContent = `RUT: ${rut}`;
        document.getElementById('detalleCausa').textContent = `Causa: ${causaSeleccionada.nombre} (${causaSeleccionada.area})`;
        document.getElementById('detalleMonto').textContent = `Monto: ${monto}`;
        donationDetails.classList.remove('hidden');

        // Guardar en localStorage
        const donacion = {
            nombre: nombre,
            rut: rut,
            monto: monto,
            causa: causaSeleccionada.nombre,
            area: causaSeleccionada.area
        };

        localStorage.setItem('donacion', JSON.stringify(donacion));
    });

    // Cargar datos de localStorage (si existen)
    const donacionGuardada = localStorage.getItem('donacion');
    if (donacionGuardada) {
        const donacion = JSON.parse(donacionGuardada);
        document.getElementById('nombre').value = donacion.nombre;
        document.getElementById('rut').value = donacion.rut;
        document.getElementById('monto').value = donacion.monto;
        areaSelect.value = donacion.area;

        // Simular cambio en el área para llenar el select de causas
        const event = new Event('change');
        areaSelect.dispatchEvent(event);

        causaSelect.value = donacion.causa;

        // Mostrar detalles de la donación
        document.getElementById('detalleNombre').textContent = `Nombre: ${donacion.nombre}`;
        document.getElementById('detalleRUT').textContent = `RUT: ${donacion.rut}`;
        document.getElementById('detalleCausa').textContent = `Causa: ${donacion.causa} (${donacion.area})`;
        document.getElementById('detalleMonto').textContent = `Monto: ${donacion.monto}`;
        donationDetails.classList.remove('hidden');
    }
});
