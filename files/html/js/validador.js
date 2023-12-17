function validateInteger(input)
{
    if( !input.value ){
        return true;
    }
    intNumber = input.value;
    if( !/^\d+$/.test( intNumber ) ) return false;
    return intNumber > 0;
}

function validateDate(input)
{
    if( !input.value || input.value=="dd/mm/aaaa" ) return true;
    fechaString = input.value;
    // Expresión regular para validar el formato de fecha en español (dd/mm/yyyy)
    var formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

    // Verificar si la cadena cumple con el formato de fecha en español
    console.log( "Fecha: " + fechaString, formatoFecha.test(fechaString) );
    if (!formatoFecha.test(fechaString)) {
        return false;
    }

    // Convertir la cadena a un objeto de fecha
    var fecha = new Date(fechaString);

    // Verificar si la conversión fue exitosa y si la fecha es válida
    return !isNaN(fecha.getTime());
}

function showError(event)
{
    // This function will add an error class to a validated field
    // And show an error text obtained from NoJsValidateElement object
    const element = event.target;
    const id = element.getAttribute('id');
    const span = document.getElementById(id + '-error');
    element.classList.add('error-class');
    span.innerText = element.validate.validationText;
    span.style.display = 'block';
}

function hideError(event)
{
    // This function will remove error class to a validated field
    // And hide error text from span
    const element = event.target;
    const id = element.getAttribute('id');
    const span = document.getElementById(id + '-error');
    element.classList.remove('error-class');
    span.style.display = 'none';
}

function hideSpans() {
    var spans = document.getElementsByTagName('span');
  
    for (var i = 0; i < spans.length; i++) {
      spans[i].style.display = 'none';
    }
  }

const validator = new NoJsValidator(
{
    forms: ['*'],
    validateOn: 'keydown,change',
    events: {
        afterFalse:'showError',
        afterTrue: 'hideError',
    }
});