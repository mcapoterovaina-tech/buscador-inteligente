  // Función para analizar el texto y contar palabras
  function analizarTexto(texto, docId) {
    // Normalizamos: quitamos signos y pasamos a minúsculas
    const palabras = texto
      .toLowerCase()
      .replace(/[^\w\sáéíóúñ]/g, "")
      .split(/\s+/);

    const diccionario = {};
    palabras.forEach(p => {
      if (p) {
        diccionario[p] = (diccionario[p] || 0) + 1;
      }
    });

    // Guardamos en localStorage
    const analisis = {
      idDocumento: docId,
      frecuencias: diccionario
    };

    localStorage.setItem("analisisWord", JSON.stringify(analisis));
  }

  // Al cargar la página, revisamos si hay texto guardado
  window.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("textoWord");

    if (data) {
      const { texto } = JSON.parse(data);

      // Renderizar el texto en el div
      document.getElementById("tex-bak").textContent = texto;

      // Generar un ID único para este documento
      const docId = "doc-" + Date.now();

      // Analizar y guardar frecuencias
      analizarTexto(texto, docId);

      console.log(" Análisis guardado en localStorage con ID:", docId);
    } else {
      console.log(" No hay texto guardado todavía.");
    }
  });