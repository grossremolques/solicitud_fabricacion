const arrayToObject = (arr) => {
    // Obtenemos los encabezados del array
    var headers = arr[0];
    // Creamos un nuevo array para almacenar los objetos transformados
    var newData = [];
    // Iteramos desde 1 para evitar el primer elemento que son los encabezados
    for (var i = 1; i < arr.length; i++) {
      var obj = {};
      // Iteramos a través de cada elemento del array actual
      for (var j = 0; j < headers.length; j++) {
        // Usamos los encabezados como claves y asignamos los valores correspondientes
        obj[headers[j].toLowerCase()] = arr[i][j];
      }
      newData.push(obj); // Agregamos el objeto al nuevo array
    }
    return newData; // Devolvemos el nuevo array de objetos
  }
const objectToArray = (obj, arr) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (obj.hasOwnProperty(item)) {
        arr[i] = obj[item];
      } else {
        arr[i] = ""; // Cambia el contenido del array por un string vacío si el item no está presente
      }
    }
    return arr;
  }
  const isValidForm = (event, form) =>{
    if (form.checkValidity()) {
      event.preventDefault();
    }
    form.classList.add("was-validated");
    let inputs = form.querySelectorAll('[required]');
    inputs.forEach(element => {
      if(!element.checkValidity()){
        element.classList.add('invalid')
      }
      else {
        element.classList.remove('invalid')
      }
    });
    return form.checkValidity();
  }

export {objectToArray, arrayToObject, isValidForm}