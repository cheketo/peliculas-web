function obtenerGeneros( funcionGeneros )
{
    // URL de la API
    var apiUrl = 'https://api.peliculas.vm/generos';

    // Realizar una solicitud GET a la API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            // Pasar los resultados a una función que viene por parámetro
            funcionGeneros(data.data);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
}