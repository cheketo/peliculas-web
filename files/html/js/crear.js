function crearPelicula() {
    // Obtener los valores de los campos del formulario
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const description = document.getElementById('description').value;
    const director = document.getElementById('director').value;
    const cast = [...document.getElementById('cast').selectedOptions].map(option => option.value);

    // Crear un objeto con los datos a enviar
    const data = {
        title: title,
        genre: genre,
        description: description,
        director: director,
        cast: cast
    };
    console.log( 'Request', data);
    // Realizar la petición POST a la API
    fetch('https://api.peliculas.vm/crear-pelicula?title=' + title + '&genre=' + genre + '&description=' + description + '&director=' + director + '&cast=' + cast + '', {
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
    })
    .catch(error => {
        // Manejar errores en la solicitud
        console.error('Error al crear película:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
        alert('Hubo un error al crear la película: ' + error.message);
    });
}