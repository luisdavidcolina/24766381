window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');

    if (!lang) {
        let url = window.location.href;
        url += (url.indexOf('?') > -1 ? '&' : '?') + 'lang=ES';
        window.location.href = url;
        return;
    }

    const configScript = document.createElement('script');
    configScript.src = 'conf/config' + lang.toUpperCase() + '.json';

    configScript.onload = function () {
        if (typeof config === 'undefined') return;

        const navLeft = document.querySelector('.nav-left');
        if (navLeft && config.sitio) navLeft.innerHTML = config.sitio[0] + '<span>' + config.sitio[1] + '</span> ' + config.sitio[2];

        const navUser = document.querySelector('.nav-user');
        if (navUser && config.saludo) {
            const userName = (typeof perfiles !== 'undefined' && perfiles[0]) ? perfiles[0].nombre : 'Usuario';
            navUser.textContent = config.saludo + ', ' + userName;
        }

        const footer = document.querySelector('footer');
        if (footer && config.copyRight) footer.textContent = config.copyRight;

        const btnBuscar = document.querySelector('.search-form button');
        if (btnBuscar && config.buscar) btnBuscar.textContent = config.buscar;

        const inputNombre = document.querySelector('.search-form input[name="nombre"]');
        if (inputNombre && config.nombre) inputNombre.placeholder = config.nombre + '...';

        const labels = document.querySelectorAll('.atributos li strong');
        if (labels.length > 0) {
            if (config.color) labels[0].textContent = config.color;
            if (config.libro) labels[1].textContent = config.libro;
            if (config.musica) labels[2].textContent = config.musica;
            if (config.video_juego) labels[3].textContent = config.video_juego;
            if (config.lenguajes) labels[4].textContent = config.lenguajes;
        }

        const ci = params.get('ci');

        if (ci) {
            if (typeof perfiles !== 'undefined') {
                const baseData = perfiles.find(function (p) { return p.ci === ci; });
                if (baseData) {
                    const img = document.querySelector('.perfil-imagen img');
                    const sources = document.querySelectorAll('.perfil-imagen source');
                    const nombre = document.querySelector('.perfil-nombre');

                    if (img) {
                        img.src = baseData.imagen;
                        img.alt = baseData.nombre;
                    }
                    if (sources.length > 0) {
                        sources.forEach(function (s) { s.srcset = baseData.imagen; });
                    }
                    if (nombre) nombre.textContent = baseData.nombre;
                }
            }

            const perfilScript = document.createElement('script');
            perfilScript.src = ci + '/perfil.json';

            perfilScript.onload = function () {
                if (typeof perfil !== 'undefined') {
                    const desc = document.querySelector('.perfil-descripcion');
                    if (desc) desc.textContent = perfil.descripcion;

                    const spans = document.querySelectorAll('.atributos li span');
                    if (spans.length > 0) {
                        if (perfil.color) spans[0].textContent = perfil.color;
                        if (perfil.libro) spans[1].textContent = Array.isArray(perfil.libro) ? perfil.libro.join(', ') : perfil.libro;
                        if (perfil.musica) spans[2].textContent = Array.isArray(perfil.musica) ? perfil.musica.join(', ') : perfil.musica;
                        if (perfil.video_juego) spans[3].textContent = Array.isArray(perfil.video_juego) ? perfil.video_juego.join(', ') : perfil.video_juego;
                        if (perfil.lenguajes) spans[4].textContent = Array.isArray(perfil.lenguajes) ? perfil.lenguajes.join(', ') : perfil.lenguajes;
                    }

                    const emailLink = document.querySelector('.contacto a');
                    if (emailLink && perfil.email) {
                        emailLink.href = 'mailto:' + perfil.email;
                        emailLink.textContent = perfil.email;
                    }
                }
            };
            document.head.appendChild(perfilScript);

        } else if (typeof perfiles !== 'undefined') {
            const grid = document.querySelector('.alumnos-grid');
            const searchForm = document.querySelector('.search-form');

            function renderGrid(lista) {
                grid.innerHTML = '';
                
                if (lista.length === 0) {
                    const query = inputNombre ? inputNombre.value : '';
                    grid.innerHTML = '<div style="text-align:center; padding:50px; color: #889; font-size: 1.2em;">' + 
                                     (config.no_encontrado || 'No encontrado') + ' ' + query + 
                                     '</div>';
                } else {
                    lista.forEach(function (p) {
                        const li = document.createElement('li');
                        li.className = 'alumno-card';
                        li.innerHTML = '<a href="perfil.html?ci=' + p.ci + '&lang=' + lang + '"><img src="' + p.imagen + '" alt="' + p.nombre + '" /><div class="nombre">' + p.nombre + '</div></a>';
                        grid.appendChild(li);
                    });
                }
            }

            if (grid) {
                renderGrid(perfiles);

                if (inputNombre) {
                    inputNombre.addEventListener('keyup', function() {
                        const texto = inputNombre.value.toLowerCase();
                        const filtrados = perfiles.filter(function(p) {
                            return p.nombre.toLowerCase().includes(texto);
                        });
                        renderGrid(filtrados);
                    });
                }

                if (searchForm) {
                    searchForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                    });
                }
            }
        }
    };
    document.head.appendChild(configScript);
};