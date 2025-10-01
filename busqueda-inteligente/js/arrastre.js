
  const modal = document.getElementById('dropModal');
  const fileInput = document.getElementById('fileInput');
  const abrirArchivo = document.getElementById('abrirArchivo');

  // Detectar arrastre de archivo (PC)
  window.addEventListener('dragover', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });

  window.addEventListener('dragleave', (e) => {
    e.preventDefault();
    modal.classList.remove('active');
  });

  window.addEventListener('drop', (e) => {
    e.preventDefault();
    modal.classList.remove('active');
    manejarArchivo(e.dataTransfer.files[0]);
  });

  // En móviles: abrir explorador al pulsar el botón
  abrirArchivo.addEventListener('click', () => {
    fileInput.click();
  });

  // Cuando el usuario selecciona un archivo desde el explorador
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    manejarArchivo(file);
  });

  // Función común para procesar el archivo
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

            alert("Texto extraído y guardado en LocalStorage. Por favor recargue la página");
          })
          .catch(err => {
            console.error("Error al leer Word:", err);
          });
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Por ahora solo acepto archivos .docx");
    }
  }