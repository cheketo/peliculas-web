document.addEventListener('DOMContentLoaded', function () {
    // Espera a que el DOM esté completamente cargado antes de ejecutar el código

    // URL de la API
    var apiUrl = 'https://api.peliculas.vm/peliculas';

    // Realizar una solicitud GET a la API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            // Llenar la tabla con los datos de la API
            actualizarListadoPeliculas(data.data);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
});

// Función para actualizar el listado de películas en la tabla
function actualizarListadoPeliculas(peliculas) {
    var tableBody = document.querySelector('table tbody');

    // Limpiar la tabla antes de agregar nuevas filas
    tableBody.innerHTML = '';

    // Iterar sobre las películas y agregarlas a la tabla
    peliculas.forEach(function (pelicula) {
        var row = tableBody.insertRow();

        // Crear celdas y agregar datos de la película
        var titleCell = row.insertCell(0);
        titleCell.textContent = pelicula.titulo;

        var genreCell = row.insertCell(1);
        genreCell.textContent = pelicula.genero.nombre;

        var descriptionCell = row.insertCell(2);
        descriptionCell.textContent = pelicula.descripcion;

        var directorCell = row.insertCell(3);
        directorCell.textContent = pelicula.director.nombre + ' ' + pelicula.director.apellido;

        var castCell = row.insertCell(4);
        let actores = '';
        pelicula.actores.forEach( actor => {
            actores += actor.nombre + ' ' + actor.apellido + ', ';
        });
        castCell.textContent = actores;

        var actionsCell = row.insertCell(5);
        // Agregar enlaces para ver, editar y eliminar (puedes ajustar los enlaces según tus necesidades)
        actionsCell.innerHTML = `<a href="detalle.html"><button>🔭 Ver</button></a>
                                 <a href="editar.html"><button>✍🏽 Editar</button></a>
                                 <a href="#"><button>❌ Eliminar</button></a>`;
    });
}

borrarPelicula = (id) => {
    let url = 'https://api.peliculas.vm/borrar-pelicula';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            
        })
}
