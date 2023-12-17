function capitalizarPrimeraLetra(cadena) {
    // Dividir la cadena en palabras usando un espacio como separador
    var palabras = cadena.split(' ');
  
    // Iterar sobre cada palabra y capitalizar la primera letra
    for (var i = 0; i < palabras.length; i++) {
      // Obtener la primera letra en mayúscula y el resto en minúscula
      var primeraLetraMayuscula = palabras[i].charAt(0).toUpperCase();
      var restoPalabra = palabras[i].slice(1).toLowerCase();
  
      // Concatenar la primera letra capitalizada con el resto de la palabra
      palabras[i] = primeraLetraMayuscula + restoPalabra;
    }
  
    // Unir las palabras en una cadena nuevamente, separadas por espacios
    var resultado = palabras.join(' ');
  
    return resultado;
  }
  