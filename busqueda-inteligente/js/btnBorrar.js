  // Esperamos a que el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    const btnBorrar = document.getElementById("borrar");

    btnBorrar.addEventListener("click", () => {
      // Borra todo el localStorage
      localStorage.clear();

      // Mensaje de confirmación
      alert("Se borraron todos los datos del LocalStorage");

      // Recargar la página automáticamente
      location.reload();
    });
  });