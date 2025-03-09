document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        const taskId = checkbox.getAttribute('data-id');
        const isChecked = localStorage.getItem(taskId) === 'true';
        checkbox.checked = isChecked;

        checkbox.addEventListener('change', () => {
            localStorage.setItem(taskId, checkbox.checked);
            updateTareas();
            updateProgreso();
        });
    });
    updateTareas();
    updateProgreso();
});

function updateTareas() {
    const tareasRealizadas = document.getElementById('tareas-realizadas');
    const tareasPendientes = document.getElementById('tareas-pendientes');

    tareasRealizadas.innerHTML = ''; // Limpiar lista antes de actualizar
    tareasPendientes.innerHTML = ''; // Limpiar lista antes de actualizar

    const tareasUnicasPendientes = new Set(); // Para evitar duplicados en pendientes
    const tareasUnicasRealizadas = new Set(); // Para evitar duplicados en realizadas

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        const taskId = checkbox.getAttribute('data-id');
        const listItem = document.createElement('li');
        listItem.textContent = `${taskId.replace('actividad', '')}`;

        if (checkbox.checked) {
            if (!tareasUnicasRealizadas.has(taskId)) { // Evitar duplicados
                tareasUnicasRealizadas.add(taskId);
                listItem.textContent += ' ---> Realizada 👌';
                listItem.classList.add('tarea', 'tarea-realizada');
                tareasRealizadas.appendChild(listItem);
            }
        } else {
            if (!tareasUnicasPendientes.has(taskId)) { // Evitar duplicados
                tareasUnicasPendientes.add(taskId);
                listItem.textContent += ' ---> Pendiente 😢';
                listItem.classList.add('tarea', 'tarea-pendiente');
                tareasPendientes.appendChild(listItem);
            }
        }
    });

    console.log('Tareas pendientes actualizadas:', tareasPendientes.innerHTML);
    console.log('Tareas realizadas actualizadas:', tareasRealizadas.innerHTML);
}

function updateProgreso() {
    const unidades = document.querySelectorAll('.curso-card');
    
    unidades.forEach(unidad => {
        const progresoTexto = unidad.querySelector('.progreso-texto');
        if (!progresoTexto) return; // Si no existe, salir de la función para esta unidad

        const unidadId = progresoTexto.getAttribute('data-unidad'); 
        const checkboxes = document.querySelectorAll(`input[data-unidad="${unidadId}"]`); // Busca en todo el documento
        
        if (checkboxes.length === 0) {
            progresoTexto.textContent = "0% completado"; // Evita errores si no hay tareas
            return;
        }

        const total = checkboxes.length;
        const completadas = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        const porcentaje = Math.round((completadas / total) * 100);

        progresoTexto.textContent = `${porcentaje}% completado`;
    });
}
function toggleTareas(button) {
    const tareasDiv = button.nextElementSibling;
    if (tareasDiv.classList.contains('visible')) {
        tareasDiv.classList.remove('visible');
        button.textContent = 'Tareas';
    } else {
        tareasDiv.classList.add('visible');
        button.textContent = 'Ocultar';
    }
}

