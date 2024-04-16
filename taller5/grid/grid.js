async function obtenerUsuarios() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    // Aquí puedes hacer lo que quieras con los datos, como imprimirlos en la consola
    console.log(data);
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la solicitud
    console.error('¡Hubo un error!', error);
  }
}

// Llama a la función para obtener los usuarios
obtenerUsuarios();
// Path: taller5/grid/index.js