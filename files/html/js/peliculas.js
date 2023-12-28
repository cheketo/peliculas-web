document.addEventListener('DOMContentLoaded', function () {
    // Espera a que el DOM esté completamente cargado antes de ejecutar el código
    obtenerPeliculas();
});

function obtenerPeliculas()
{
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
            if( data.data )
                actualizarListadoPeliculas(data.data);
            else
                mostrarMensajeSinPeliculas();
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
}

function mostrarMensajeSinPeliculas()
{
    var tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '<tr><td colspan="6">NO SE ENCONTRARON PELÍCULAS</td></tr>';
}

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
        var botonId = 'boton-borrar-' + pelicula.id;
        // Agregar enlaces para ver, editar y eliminar (puedes ajustar los enlaces según tus necesidades)
        actionsCell.innerHTML = `<a href="detalle.html"><button>🔭 Ver</button></a>
                                 <a href="editar.html?id=${pelicula.id}"><button>✍🏽 Editar</button></a>
                                 <button id="${botonId}" data-id="${pelicula.id}" data-titulo="${pelicula.titulo}">❌ Eliminar</button>`;
        asociarBotonAFuncion( botonId );
    });

    if( !tableBody.innerHTML )
    {
        mostrarMensajeSinPeliculas();
    }
}

function asociarBotonAFuncion( botonId )
{
    botonHTML = document.getElementById( botonId );
    botonHTML.addEventListener('click', function(event)
    {    
            // Obtener los atributos personalizados del botón (id y título)
            const id = event.target.getAttribute('data-id');
            const titulo = event.target.getAttribute('data-titulo');
            
            // Llamar a la función para borrar la película
            borrarPelicula(id, titulo);
    });
}

function borrarPelicula(id, titulo)
{
    const confirmacion = confirm(`¿Seguro que quieres borrar la película "${titulo}"?`);

    if (confirmacion) {
        // Si acepta -> Borrar pelicula API
        this.borrarPeliculaAPI(id);
    } else {
        // Si no acepta -> Cerrar el cuadro de confirmación
        console.log('Borrado cancelado.');
    }
}

function borrarPeliculaAPI( id )
{
    let url = 'https://api.peliculas.vm/borrar-pelicula?id=' + id;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }else{
                obtenerPeliculas();
            }
            return response.json();
        })
        .then(data => {
            
        })
}
