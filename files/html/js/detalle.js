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

function manipularPelicula(data)
{
    document.getElementById('NombrePelicula').innerText = data.titulo;
    document.getElementById('title').innerText = data.titulo;
    document.getElementById('genre').innerText = capitalizarPrimeraLetra( data.genero.nombre );
    document.getElementById('description').innerText = data.descripcion;
    document.getElementById('director').innerText = data.director.nombre + ' ' + data.director.apellido;
    document.getElementById("cast").innerText = data.actores.map(actor => actor.nombre + ' ' + actor.apellido).join(', ');
    document.getElementById('length').innerText = data.duracion? data.duracion + ' min': 'N/A';
    document.getElementById('release').innerText = data.fecha_estreno? data.fecha_estreno.split('-').reverse().join('/') : 'N/A';

    }

document.addEventListener('DOMContentLoaded', function()
{
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    obtnerPelicula(id);
    // obtenerReparto( funcionReparto );
    // obtenerDirectores( funcionDirectores );
    // obtenerGeneros( funcionGeneros );
});