  const modal = document.getElementById('dropModal');
  const abrirModal = document.getElementById('abrirModal');
  const abrirArchivo = document.getElementById('abrirArchivo');
  const fileInput = document.getElementById('fileInput');

  // Abrir modal con el botón
  abrirModal.addEventListener('click', () => {
    modal.classList.add('active');
  });

  // Cerrar modal si haces clic fuera de él
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  //Botón dentro del modal para abrir explorador de archivos
  abrirArchivo.addEventListener('click', () => {
    fileInput.click();
  });

  // Procesar archivo seleccionado
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    manejarArchivo(file);
  });

  //Función común para procesar archivo
  function manejarArchivo(file) {
    if (file && file.name.endsWith(".docx")) {
      const reader = new FileReader();

      reader.onload = function(event) {
        const arrayBuffer = event.target.result;

        mammoth.extractRawText({ arrayBuffer })
          .then(result => {
            const texto = result.value;
            console.log("Texto extraído del Word:", texto);

            localStorage.setItem("textoWord", JSON.stringify({ texto }));

            alert("Texto extraído y guardado en LocalStorage. Recargue la página para verlo.");
            modal.classList.remove('active'); // cerrar modal al terminar
          })
          .catch(err => {
            console.error("Error al leer Word:", err);
          });
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert(" Solo acepto archivos .docx");
    }
  }