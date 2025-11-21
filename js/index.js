document.addEventListener('DOMContentLoaded', () => {
    if (typeof config !== 'undefined') {
        cargarConfiguracion(config);
    }

    if (typeof perfiles !== 'undefined') {
        cargarEstudiantes(perfiles);
    }
});

function cargarConfiguracion(data) {
    const navLeft = document.querySelector('.nav-left');
    if (navLeft && data.sitio) {
        navLeft.innerHTML = `${data.sitio[0]}<span>${data.sitio[1]}</span> ${data.sitio[2]}`;
    }

    const footer = document.querySelector('footer');
    if (footer && data.copyRight) {
        footer.textContent = data.copyRight;
    }

    const btnBuscar = document.querySelector('.search-form button');
    if (btnBuscar && data.buscar) {
        btnBuscar.textContent = data.buscar;
    }

    const perfilNombre = document.querySelector('.perfil-nombre');
    if (perfilNombre && data.nombre) {
        perfilNombre.textContent = data.nombre;
    }

    const perfilDesc = document.querySelector('.perfil-descripcion');
    if (perfilDesc && data.descripcion) {
        perfilDesc.textContent = data.descripcion;
    }

    const items = document.querySelectorAll('.atributos li strong');
    if (items.length > 0) {
        if (data.color) items[0].textContent = data.color;
        if (data.libro) items[1].textContent = data.libro;
        if (data.musica) items[2].textContent = data.musica;
        if (data.video_juego) items[3].textContent = data.video_juego;
        if (data.lenguajes) items[4].textContent = data.lenguajes;
    }
}

function cargarEstudiantes(lista) {
    const grid = document.querySelector('.alumnos-grid');
    if (!grid) return;

    grid.innerHTML = '';

    lista.forEach(estudiante => {
        const li = document.createElement('li');
        li.className = 'alumno-card';
        li.innerHTML = `
            <a href="perfil.html?ci=${estudiante.ci}">
                <img src="${estudiante.imagen}" alt="${estudiante.nombre}" />
                <div class="nombre">${estudiante.nombre}</div>
            </a>
        `;
        grid.appendChild(li);
    });
}