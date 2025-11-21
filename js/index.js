document.addEventListener('DOMContentLoaded', () => {
    if (typeof config === 'undefined') return;

    const navLeft = document.querySelector('.nav-left');
    if (navLeft && config.sitio) {
        navLeft.innerHTML = `${config.sitio[0]}<span>${config.sitio[1]}</span> ${config.sitio[2]}`;
    }

    const footer = document.querySelector('footer');
    if (footer && config.copyRight) {
        footer.textContent = config.copyRight;
    }

    const btnBuscar = document.querySelector('.search-form button');
    if (btnBuscar && config.buscar) {
        btnBuscar.textContent = config.buscar;
    }

    const perfilNombre = document.querySelector('.perfil-nombre');
    if (perfilNombre && config.nombre) {
        perfilNombre.textContent = config.nombre;
    }

    const perfilDesc = document.querySelector('.perfil-descripcion');
    if (perfilDesc && config.descripcion) {
        perfilDesc.textContent = config.descripcion;
    }

    const items = document.querySelectorAll('.atributos li strong');
    if (items.length > 0) {
        if (config.color) items[0].textContent = config.color;
        if (config.libro) items[1].textContent = config.libro;
        if (config.musica) items[2].textContent = config.musica;
        if (config.video_juego) items[3].textContent = config.video_juego;
        if (config.lenguajes) items[4].textContent = config.lenguajes;
    }
});