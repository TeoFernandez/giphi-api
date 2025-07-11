const claveApi = '4mvig64p9otiILGzfh3HSqwNnjqi27ZT';
const formularioBusqueda = document.getElementById('searchForm');
const entradaBusqueda = document.getElementById('searchInput');
const contenedorResultados = document.getElementById('results');

formularioBusqueda.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const consulta = entradaBusqueda.value;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${claveApi}&q=${consulta}&limit=9`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const gifs = datos.data;

        mostrarGifs(gifs);
    } catch (error) {
        console.error('Error al obtener los GIFs:', error);
    }

    // Limpiar el campo de entrada y enfocar nuevamente
    entradaBusqueda.value = '';
    entradaBusqueda.focus();
});

function mostrarGifs(gifs) {
    const results = document.getElementById('results');
    results.innerHTML = '';
    gifs.forEach(gif => {
        const container = document.createElement('div');
        container.className = 'gif-container';

        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;

        const btn = document.createElement('a');
        btn.href = gif.images.original.url;
        btn.download = 'giphy.gif';
        btn.textContent = 'Descargar';
        btn.className = 'download-btn';

        container.appendChild(img);
        container.appendChild(btn);
        results.appendChild(container);
    });
}