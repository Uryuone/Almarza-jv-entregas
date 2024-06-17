document.addEventListener('DOMContentLoaded', () => {
    const causasContainer = document.getElementById('causasContainer');

    fetch('causas.json')
        .then(response => response.json())
        .then(listaCausas => {
            listaCausas.forEach(causa => {
                // Crear tarjeta para cada causa
                const card = document.createElement('div');
                card.classList.add('card');

                const img = document.createElement('img');
                img.src = causa.imagen;
                img.alt = causa.nombre;

                const title = document.createElement('h3');
                title.textContent = causa.nombre;

                const description = document.createElement('p');
                description.textContent = causa.descripcion;

                const button = document.createElement('button');
                button.textContent = 'Donar';
                button.addEventListener('click', () => {
                    window.location.href = `index.html?causa=${encodeURIComponent(causa.nombre)}`;
                });

                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(button);

                causasContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar las causas:', error));

    // Código existente para manejar el formulario de donación
    const form = document.getElementById('donationForm');
    const areaSelect = document.getElementById('area');
    const causaSelect = document.getElementById('causa');
    const causaImagenContainer = document.getElementById('causaImagenContainer');
    const causaImagen = document.getElementById('causaImagen');
    const donationDetails = document.getElementById('donationDetails');
    const detalleImagen = document.getElementById('detalleImagen');

    const params = new URLSearchParams(window.location.search);
    const selectedCausa = params.get('causa');

    fetch('causas.json')
        .then(response => response.json())
        .then(listaCausas => {
            areaSelect.addEventListener('change', (e) => {
                const area = e.target.value;
                const causasFiltradas = listaCausas.filter(causa => causa.area.toLowerCase() === area.toLowerCase());

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

            // Mostrar imagen de la causa seleccionada
            causaSelect.addEventListener('change', (e) => {
                const causaNombre = e.target.value;
                const causaSeleccionada = listaCausas.find(causa => causa.nombre === causaNombre);

                if (causaSeleccionada) {
                    causaImagen.src = causaSeleccionada.imagen;
                    causaImagenContainer.classList.remove('hidden');
                } else {
                    causaImagenContainer.classList.add('hidden');
                }
            });

            // Manejar el envío del formulario
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const nombre = document.getElementById('nombre').value;
                const rut = document.getElementById('rut').value;
                const monto = document.getElementById('monto').value;
                const causaNombre = causaSelect.value;
                const area = areaSelect.value;

                const causaSeleccionada = listaCausas.find(causa => causa.nombre === causaNombre);

                if (!causaSeleccionada) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Por favor, seleccione una causa válida.'
                    });
                    return;
                }

                // Mostrar detalles de la donación
                document.getElementById('detalleNombre').textContent = `Nombre: ${nombre}`;
                document.getElementById('detalleRUT').textContent = `RUT: ${rut}`;
                document.getElementById('detalleCausa').textContent = `Causa: ${causaSeleccionada.nombre} (${causaSeleccionada.area})`;
                document.getElementById('detalleMonto').textContent = `Monto: ${monto}`;
                detalleImagen.src = causaSeleccionada.imagen;
                donationDetails.classList.remove('hidden');

                Swal.fire({
                    icon: 'success',
                    title: 'Donación exitosa',
                    text: 'Gracias por tu donación!',
                });

                // Guardar en localStorage
                const donacion = {
                    nombre: nombre,
                    rut: rut,
                    monto: monto,
                    causa: causaSeleccionada.nombre,
                    area: causaSeleccionada.area,
                    imagen: causaSeleccionada.imagen
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
                causaImagen.src = donacion.imagen;
                causaImagenContainer.classList.remove('hidden');

                // Mostrar detalles de la donación
                document.getElementById('detalleNombre').textContent = `Nombre: ${donacion.nombre}`;
                document.getElementById('detalleRUT').textContent = `RUT: ${donacion.rut}`;
                document.getElementById('detalleCausa').textContent = `Causa: ${donacion.causa} (${donacion.area})`;
                document.getElementById('detalleMonto').textContent = `Monto: ${donacion.monto}`;
                detalleImagen.src = donacion.imagen;
                donationDetails.classList.remove('hidden');
            }

            // Si hay una causa seleccionada en la URL, filtrarla automáticamente
            if (selectedCausa) {
                const causaSeleccionada = listaCausas.find(causa => causa.nombre === selectedCausa);

                if (causaSeleccionada) {
                    areaSelect.value = causaSeleccionada.area;

                    // Simular cambio en el área para llenar el select de causas
                    const event = new Event('change');
                    areaSelect.dispatchEvent(event);

                    causaSelect.value = causaSeleccionada.nombre;
                    causaImagen.src = causaSeleccionada.imagen;
                    causaImagenContainer.classList.remove('hidden');
                }
            }
        })
        .catch(error => console.error('Error al cargar las causas:', error));
});
