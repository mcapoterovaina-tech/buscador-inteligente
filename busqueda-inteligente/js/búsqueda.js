  // Escuchar cuando el usuario escribe en la barra de búsqueda
  document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.getElementById("busqueda-inteligente");
    const texBak = document.getElementById("tex-bak");

    inputBusqueda.addEventListener("input", () => {
      const query = inputBusqueda.value.trim().toLowerCase();

      // Recuperar texto original y análisis desde localStorage
      const dataTexto = localStorage.getItem("textoWord");
      const dataAnalisis = localStorage.getItem("analisisWord");

      if (!dataTexto || !dataAnalisis) {
        console.log("No hay datos analizados todavía.");
        return;
      }

      const { texto } = JSON.parse(dataTexto);
      const analisis = JSON.parse(dataAnalisis);

      // Si no hay búsqueda, mostrar texto normal
      if (query === "") {
        texBak.textContent = texto;
        return;
      }

      // Buscar coincidencias en el diccionario
      const coincidencias = Object.entries(analisis.frecuencias)
        .filter(([palabra]) => palabra.includes(query))
        .sort((a, b) => b[1] - a[1]); // ordenar por frecuencia descendente

      console.log("Coincidencias ordenadas por frecuencia:", coincidencias);

      // Resaltar la palabra buscada en el texto
      const regex = new RegExp(`(${query})`, "gi");
      const textoResaltado = texto.replace(regex, `<mark>$1</mark>`);

      texBak.innerHTML = textoResaltado;
    });
  });