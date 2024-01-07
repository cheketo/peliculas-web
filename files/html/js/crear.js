function funcionReparto(data)
{
    // Cargar los datos en el select
    const select = document.getElementById('cast');
    for (const item of data) {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.nombre + ' ' + item.apellido;
        select.appendChild(option);
    }
}

function funcionDirectores(data)
{
    // Cargar los datos en el select
    const select = document.getElementById('director');
    for (const item of data) {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.nombre + ' ' + item.apellido;
        select.appendChild(option);
    }
}

function funcionGeneros(data)
{
    // Cargar los datos en el select
    const select = document.getElementById('genre');
    for (const item of data) {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = capitalizarPrimeraLetra(item.nombre);
        select.appendChild(option);
    }
}

document.addEventListener('DOMContentLoaded', function()
{
    obtenerReparto( funcionReparto );
    obtenerDirectores( funcionDirectores );
    obtenerGeneros( funcionGeneros );
});

function crearPelicula()
{
    hideSpans();
    if(!validator.isValid())
    {
        alert('Por favor, complete correctamente todos los campos del formulario');
        return;
    }

    // Obtener los valores de los campos del formulario
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const description = document.getElementById('description').value;
    const director = document.getElementById('director').value;
    const cast = [...document.getElementById('cast').selectedOptions].map(option => option.value);
    const length = document.getElementById('length').value;
    const release = document.getElementById('release').value;

    // Crear un objeto con los datos a enviar
    const data = {
        title: title,
        genre: genre,
        description: description,
        director: director,
        cast: cast
    };
    // Realizar la petición POST a la API
    fetch('https://api.peliculas.vm/crear-pelicula?title=' + title + '&genre=' + genre + '&description=' + description + '&director=' + director + '&cast=' + cast + '&length=' + length + '&release=' + release + '', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }else{
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
    })
    .then(responseData => {
        // Manejar la respuesta de la API
        console.log('Respuesta de la API:', responseData);
        // Aquí podrías realizar alguna acción con la respuesta, como mostrar un mensaje de éxito
        alert('Película creada exitosamente');
        window.location.href = 'index.html';
    })
    .catch(error => {
        // Manejar errores en la solicitud
        console.error('Error al crear película:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
        alert('Hubo un error al crear la película: ' + error.message);
    });
}