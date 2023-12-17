function obtnerPelicula(id)
{
    let url = 'https://api.peliculas.vm/peliculas?id=' + id;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        manipularPelicula( data.data[0] );
    })
}