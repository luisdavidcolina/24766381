document.addEventListener('DOMContentLoaded', () => {
    if (typeof config !== 'undefined') {
        cargarConfiguracion(config);
    }

    const params = new URLSearchParams(window.location.search);
    const ci = params.get('ci');

    if (ci) {
        if (typeof perfiles !== 'undefined') {
            const datosBasicos = perfiles.find(p => p.ci === ci);
            if (datosBasicos) {
                actualizarImagen(datosBasicos);
            }
        }

        const script = document.createElement('script');
        script.src = `${ci}/perfil.json`;
        script.onload = () => {
            if (typeof perfil !== 'undefined') {
                llenarDatosTexto(perfil);
            }
        };
        document.head.appendChild(script);

    } else if (typeof perfiles !== 'undefined') {
        const grid = document.querySelector('.alumnos-grid');
        if (grid) {
            cargarGridEstudiantes(perfiles, grid);
        }
    }
});

function cargarConfiguracion(data) {
    const navLeft = document.querySelector('.nav-left');
    if (navLeft && data.sitio) navLeft.innerHTML = `${data.sitio[0]}<span>${data.sitio[1]}</span> ${data.sitio[2]}`;

    const footer = document.querySelector('footer');
    if (footer && data.copyRight) footer.textContent = data.copyRight;

    const btnBuscar = document.querySelector('.search-form button');
    if (btnBuscar && data.buscar) btnBuscar.textContent = data.buscar;

    const labels = document.querySelectorAll('.atributos li strong');
    if (labels.length > 0) {
        if (data.color) labels[0].textContent = data.color;
        if (data.libro) labels[1].textContent = data.libro;
        if (data.musica) labels[2].textContent = data.musica;
        if (data.video_juego) labels[3].textContent = data.video_juego;
        if (data.lenguajes) labels[4].textContent = data.lenguajes;
    }
}

function actualizarImagen(datos) {
    const img = document.querySelector('.perfil-imagen img');
    const sources = document.querySelectorAll('.perfil-imagen source');
    const nombre = document.querySelector('.perfil-nombre');

    if (img) {
        img.src = datos.imagen;
        img.alt = datos.nombre;
    }

    if (sources.length > 0) {
        sources.forEach(s => s.srcset = datos.imagen);
    }

    if (nombre) {
        nombre.textContent = datos.nombre;
    }
}

function llenarDatosTexto(datos) {
    const descripcion = document.querySelector('.perfil-descripcion');
    if (descripcion) descripcion.textContent = datos.descripcion;

    const values = document.querySelectorAll('.atributos li span');
    if (values.length > 0) {
        if (datos.color) values[0].textContent = datos.color;
        if (datos.libro) values[1].textContent = Array.isArray(datos.libro) ? datos.libro.join(', ') : datos.libro;
        if (datos.musica) values[2].textContent = Array.isArray(datos.musica) ? datos.musica.join(', ') : datos.musica;
        if (datos.video_juego) values[3].textContent = Array.isArray(datos.video_juego) ? datos.video_juego.join(', ') : datos.video_juego;
        if (datos.lenguajes) values[4].textContent = Array.isArray(datos.lenguajes) ? datos.lenguajes.join(', ') : datos.lenguajes;
    }

    const emailLink = document.querySelector('.contacto a');
    if (emailLink && datos.email) {
        emailLink.href = `mailto:${datos.email}`;
        emailLink.textContent = datos.email;
    }
}

function cargarGridEstudiantes(lista, grid) {
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