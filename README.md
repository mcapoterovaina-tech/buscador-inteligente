[🔍 Probar el Buscador Inteligente](https://mcapoterovaina-tech.github.io/buscador-inteligente/busqueda-inteligente/buscar.html)

Informe de Revisión Técnica: Funcionalidad de Búsqueda Inteligente

1.0 Estructura General y Componentes del Sistema

Para comprender la arquitectura de cualquier aplicación, es fundamental desglosarla en sus componentes principales. Cada componente, ya sea un archivo de código o un elemento de la interfaz, tiene una responsabilidad específica. Esta sección desglosará el sistema de Búsqueda Inteligente en unidades funcionales para clarificar su propósito, organización y la contribución de cada parte al conjunto.

1.1 Archivos y Bloques de Código

El sistema se compone de varios bloques de código JavaScript, cada uno con una responsabilidad bien definida que contribuye a la funcionalidad global.

* Gestión de Archivos (arrastre.txt): Este script es la puerta de entrada para el usuario. Su responsabilidad principal es capturar archivos .docx, ya sea mediante la funcionalidad de arrastrar y soltar (drag-and-drop) en la ventana del navegador o a través de la selección manual con un explorador de archivos. Una vez capturado el archivo, utiliza una librería externa para extraer el texto y lo almacena para su posterior procesamiento.
* Procesamiento y Análisis (analizar.txt): Su función es tomar el texto crudo extraído por el gestor de archivos y procesarlo. Normaliza el contenido convirtiéndolo a minúsculas y eliminando signos de puntuación, luego divide el texto en palabras individuales para contar la frecuencia de cada una. El resultado, un diccionario de frecuencias, se almacena de forma persistente.
* Funcionalidad de Búsqueda (búsqueda.txt): Este componente implementa la lógica de búsqueda en vivo (as-you-type). Se activa con cada pulsación de tecla del usuario en la barra de búsqueda. Lee los datos previamente analizados, filtra las palabras que coinciden con el término de búsqueda, las ordena por relevancia (frecuencia) y actualiza la interfaz para resaltar las coincidencias en el texto completo.
* Gestión de Datos (btnBorrar.txt): Cumple una tarea simple pero crucial: proporcionar al usuario una forma de reiniciar el estado de la aplicación. Su única responsabilidad es limpiar todos los datos almacenados en la sesión del navegador y recargar la página para devolverla a su estado inicial.

1.2 Interfaz de Usuario (UI) y Estilos

La interfaz de usuario es minimalista y funcional, diseñada para guiar al usuario a través del proceso de carga y búsqueda. Los elementos visuales clave son:

* Área de Carga de Archivos: Se manifiesta como un modal que se superpone a la pantalla con el texto "Suelta tu archivo aquí 📂". Este elemento se activa visualmente cuando el usuario arrastra un archivo sobre la ventana del navegador, proporcionando una indicación clara de la zona de destino.
* Barra de Búsqueda: Es el campo de entrada principal (search-input), identificado con el texto "buscador-inteligente". Al obtener el foco, efectos CSS como transform: scale(1.05) y box-shadow se aplican para ampliar sutilmente el campo y añadir un resplandor. Esto ejemplifica el principio de UX de proporcionar retroalimentación visual inmediata a la interacción del usuario.
* Contenedor de Texto: El elemento tex-bak (dentro de tex-base) sirve como el área principal de visualización. Su propósito es mostrar el contenido completo del documento .docx cargado y actualizarse dinámicamente para resaltar los términos de búsqueda.
* Botón de Borrado: Un botón con el identificador borrar y el texto "borrar" permite al usuario limpiar todos los datos y reiniciar la aplicación con un solo clic.

Una vez entendidos los componentes individuales y su propósito, el siguiente paso es analizar cómo interactúan entre sí para dar vida a la funcionalidad completa.

2.0 Flujo de Datos y Relaciones Internas

El flujo de datos describe el recorrido que sigue la información a través del sistema. En esta aplicación, el sistema emplea una arquitectura desacoplada mediada por una capa de persistencia compartida. Esta sección trazará el viaje de la información, desde la carga del archivo hasta la visualización de los resultados de búsqueda, destacando el rol central de localStorage como mediador.

2.1 El Rol de  como Eje Central

La comunicación entre los diferentes módulos de JavaScript (carga, análisis y búsqueda) no se realiza mediante llamadas directas a funciones entre archivos. En su lugar, la arquitectura se basa en un modelo donde cada módulo interactúa con un repositorio de datos común: el localStorage del navegador. Si bien este enfoque logra un excelente desacoplamiento entre componentes, introduce una dependencia en una API específica del navegador y puede ser menos eficiente que la gestión de estado en memoria para aplicaciones más complejas.

Se almacenan dos elementos clave:

1. textoWord: Este ítem es generado por el script de gestión de archivos (arrastre.txt). Contiene una cadena JSON que representa un objeto con el texto crudo extraído del archivo .docx. Actúa como la "fuente de verdad" del contenido del documento, que es consumida por los otros módulos.
2. analisisWord: Este ítem es el resultado del trabajo del script de análisis (analizar.txt). Este módulo lee textoWord y produce un nuevo objeto que contiene un ID único para el documento y, lo más importante, el diccionario con la frecuencia de cada palabra. Este análisis pre-procesado, almacenado como una cadena JSON, es lo que permite que la búsqueda sea rápida y eficiente.

2.2 Cadena de Llamadas a Funciones y Eventos

La lógica de la aplicación se desencadena a través de una secuencia de eventos del navegador y llamadas a funciones. La dependencia entre ellas sigue un orden lógico claro.

1. manejarArchivo(file): Esta función es el punto de entrada para todo el proceso. Se activa cuando el usuario suelta o selecciona un archivo. Primero, valida que la extensión del archivo sea .docx, alertando al usuario si no lo es. A continuación, utiliza operaciones asíncronas (FileReader y la promesa de mammoth) para leer y procesar el archivo. Este enfoque asíncrono es crucial, ya que evita que la interfaz de usuario se congele mientras se procesa el documento, preservando la experiencia del usuario.
2. analizarTexto(texto, docId): Esta función no es llamada directamente por manejarArchivo. En su lugar, se invoca después de que la página se recarga, una vez que textoWord ya está disponible en localStorage. Su proceso interno consiste en normalizar el texto (limpieza y conversión a minúsculas), iterar sobre las palabras para contar sus frecuencias y, finalmente, guardar el resultado en localStorage como analisisWord.
3. Manejadores de Eventos (addEventListener): Los eventos del DOM son los verdaderos disparadores que inician las diferentes lógicas. Eventos como dragover, drop, click en botones, y input en la barra de búsqueda orquestan el flujo completo. En particular, el evento DOMContentLoaded es utilizado por múltiples scripts para asegurarse de que el DOM está completamente cargado antes de intentar manipularlo o leer datos, garantizando así la estabilidad de la ejecución.

Comprendido el flujo interno de datos y eventos, ahora se analizarán las dependencias externas que hacen posible esta funcionalidad.

3.0 Dependencias Externas

En el desarrollo de software moderno, las dependencias externas son herramientas, librerías o APIs de terceros que permiten acelerar el desarrollo al proporcionar funcionalidades ya resueltas. Esta parte del informe identificará las dos dependencias clave de las que depende el sistema de Búsqueda Inteligente para su correcto funcionamiento.

* Librería mammoth.js:
  * Propósito: Su única y fundamental función, según se observa en el código, es procesar un arrayBuffer (la representación binaria de un archivo) de un documento .docx y extraer su contenido como texto plano. Esto se logra a través de la llamada a la función mammoth.extractRawText.
  * Impacto: Esta librería es absolutamente crítica. Sin ella, la aplicación no tendría la capacidad de leer el contenido de los archivos proporcionados por el usuario, lo que inutilizaría por completo su funcionalidad principal. Es el motor que convierte un formato de archivo complejo en datos manejables por JavaScript.
* API del Navegador: localStorage:
  * Propósito: Se utiliza esta API web estándar para persistir datos (textoWord y analisisWord) en el navegador del usuario. Estos datos permanecen disponibles incluso después de cerrar la pestaña o recargar la página, hasta que se borren explícitamente.
  * Impacto: Esta API es la columna vertebral de la arquitectura de la aplicación. Se utiliza como una capa de persistencia de estado rudimentaria, o un "bus de mensajes" simple, que permite que los componentes (arrastre.js, analizar.js, búsqueda.js) estén completamente desacoplados. Cada script lee o escribe en localStorage sin necesidad de conocer la existencia o el estado de los otros, lo que simplifica la lógica y facilita el mantenimiento.

Con un entendimiento claro de los componentes, el flujo de datos y las dependencias, la siguiente sección unirá todos estos elementos para describir el ciclo de vida completo de la interacción del usuario.

4.0 Flujo de Ejecución y Mapa de Conexiones

Esta sección detallará el proceso completo desde la perspectiva del usuario, paso a paso, abarcando los dos escenarios de uso principales. Para complementar la descripción, se incluirá un diagrama textual que visualiza las conexiones lógicas entre las acciones del usuario, los scripts responsables y los datos generados.

4.1 Escenario 1: Carga y Análisis Inicial de un Documento

A continuación, se describe la secuencia de eventos que ocurren cuando un usuario sube un archivo por primera vez.

1. Interacción del Usuario: El usuario arrastra un archivo .docx sobre la ventana del navegador o hace clic en el botón "Seleccionar archivo" para abrir el explorador de archivos.
2. Activación de Eventos (arrastre.txt): Se disparan los eventos drop (para arrastrar) o change (para seleccionar), que son capturados por el script de gestión de archivos.
3. Procesamiento de Archivo: Se invoca la función manejarArchivo(file) con el archivo seleccionado como argumento.
4. Extracción de Texto: La función utiliza mammoth.js para leer el archivo y extraer su contenido de texto plano de forma asíncrona.
5. Persistencia Inicial: Una vez extraído, el texto se guarda en localStorage bajo la clave textoWord.
6. Acción Requerida: Se muestra una alerta nativa del navegador pidiendo al usuario que recargue la página para continuar con el proceso.
7. Análisis Post-Recarga (analizar.txt): Después de la recarga, el evento DOMContentLoaded es capturado por el script de análisis. Este detecta la existencia de textoWord, lo lee y llama a analizarTexto().
8. Persistencia del Análisis: El resultado del análisis (el objeto con el ID y las frecuencias de palabras) se guarda en localStorage bajo la clave analisisWord. Simultáneamente, el texto completo del documento se muestra en el elemento tex-bak.

4.2 Escenario 2: Búsqueda de Términos

Este escenario asume que el Escenario 1 ya se ha completado y los datos están disponibles en localStorage.

1. Interacción del Usuario: El usuario escribe un término en la barra de búsqueda (busqueda-inteligente).
2. Activación de Evento (búsqueda.txt): El evento input se dispara con cada pulsación de tecla, activando la lógica de búsqueda.
3. Recuperación de Datos: El script de búsqueda lee los datos de textoWord y analisisWord desde localStorage y los convierte de JSON a objetos de JavaScript.
4. Filtrado y Ordenación: Se buscan todas las palabras en el diccionario de frecuencias (analisis.frecuencias) que contienen el término de búsqueda. Los resultados se ordenan de mayor a menor frecuencia, asegurando que los términos más relevantes aparezcan primero.
5. Resaltado del Texto: Se genera una expresión regular (RegExp) a partir del término buscado. La intención es resaltar visualmente las coincidencias, pero la implementación actual (texto.replace(regex, '$1')) es incorrecta, ya que simplemente reemplaza el texto encontrado consigo mismo, resultando en una operación redundante sin efecto visual.
6. Actualización de la UI: El contenido del elemento tex-bak se actualiza con el texto sin modificar, utilizando la propiedad innerHTML.

4.3 Mapa de Conexiones (Diagrama Textual)

El siguiente diagrama ilustra la relación causa-efecto entre las acciones del usuario y las respuestas del sistema.

* ACCIÓN DEL USUARIO: Cargar Archivo .docx
  * -> Script: arrastre.js
  * -> Función: manejarArchivo()
  * -> Dependencia: mammoth.extractRawText()
  * -> DATO DE SALIDA: localStorage.setItem("textoWord", ...)
  * -> Feedback: alert("...recargue la página")
* ACCIÓN DEL USUARIO: Recargar Página
  * -> Evento: DOMContentLoaded
  * -> Script: analizar.js
  * -> Función: analizarTexto()
  * -> DATO DE ENTRADA: localStorage.getItem("textoWord")
  * -> DATO DE SALIDA: localStorage.setItem("analisisWord", ...)
  * -> Resultado UI: El texto completo aparece en <div id="tex-bak">
* ACCIÓN DEL USUARIO: Escribir en Búsqueda
  * -> Evento: input
  * -> Script: búsqueda.js
  * -> DATOS DE ENTRADA: localStorage.getItem("textoWord"), localStorage.getItem("analisisWord")
  * -> Lógica: Filtrar y ordenar coincidencias
  * -> Resultado UI: El texto en <div id="tex-bak"> se actualiza con resaltado
* ACCIÓN DEL USUARIO: Clic en "borrar"
  * -> Evento: click
  * -> Script: btnBorrar.js
  * -> Función: localStorage.clear(), location.reload()
  * -> Resultado UI: Página se recarga a su estado inicial

Este análisis exhaustivo de los flujos de trabajo nos permite ahora identificar áreas clave para la optimización y mejora del sistema.

5.0 Oportunidades de Mejora

Basado en el análisis técnico, este sistema es funcional y demuestra una clara separación de responsabilidades. Sin embargo, existen varias oportunidades para refinar la implementación. La presencia de numerosas trazas de console.log es evidencia de un desarrollo activo y justifica la necesidad de un refactorización para robustecer el código. Las siguientes son recomendaciones constructivas centradas en mejorar la experiencia de usuario (UX), la eficiencia del rendimiento y la mantenibilidad del código.

1. Eliminar la Recarga Manual de Página
  * Observación: El flujo de trabajo actual requiere que el usuario recargue la página manualmente después de subir un archivo para que el análisis se ejecute. Este paso es poco intuitivo, interrumpe la experiencia del usuario y puede generar confusión.
  * Sugerencia: Modificar la función manejarArchivo en arrastre.txt. Inmediatamente después de guardar el texto en localStorage con setItem, se debería llamar directamente a la función analizarTexto() pasándole el texto extraído como argumento. Esto encadenaría el proceso de análisis inmediatamente después de la carga, creando una experiencia fluida y sin interrupciones.
2. Optimizar el Rendimiento de la Búsqueda
  * Observación: El script de búsqueda (búsqueda.txt) accede y parsea los datos desde localStorage en cada evento input, es decir, con cada pulsación de tecla. Aunque localStorage es rápido, para documentos muy grandes, este acceso repetido puede introducir una latencia perceptible.
  * Sugerencia: Al cargar la página (dentro del evento DOMContentLoaded), leer textoWord y analisisWord una sola vez y almacenarlos en variables de JavaScript en memoria. La función del evento input operaría entonces sobre estas variables en caché, lo cual es significativamente más rápido que realizar múltiples lecturas desde el almacenamiento local.
3. Corregir la Lógica de Resaltado
  * Observación: La línea const textoResaltado = texto.replace(regex, '$1'); en búsqueda.txt es funcionalmente incorrecta para el propósito de resaltar. La sintaxis $1 simplemente reinserta el texto capturado por la expresión regular sin ninguna modificación visual.
  * Sugerencia: Corregir la línea para que envuelva la coincidencia en una etiqueta HTML que pueda ser estilizada, como <mark>. La implementación correcta sería: const textoResaltado = texto.replace(regex, '<mark>$1</mark>');. Esto haría que el resaltado funcione como se espera, y se podría añadir un estilo simple en el CSS para mark para personalizar su apariencia.
4. Centralizar la Gestión de Eventos
  * Observación: Varios scripts (analizar.txt, btnBorrar.txt, búsqueda.txt) utilizan document.addEventListener("DOMContentLoaded", ...) de forma independiente para inicializar sus funcionalidades. Aunque esto funciona, puede volverse difícil de gestionar y depurar a medida que el proyecto crece.
  * Sugerencia: Considerar la creación de un único archivo de entrada (ej. app.js) que gestione la inicialización de toda la aplicación. Dentro de un único listener DOMContentLoaded, se podrían invocar funciones de inicialización específicas para cada módulo (ej., initAnalisis(), initBusqueda()), mejorando la organización, el orden de ejecución y la mantenibilidad del código.

A continuación, se presenta un resumen del funcionamiento del sistema en un lenguaje accesible para una audiencia no técnica.

6.0 Resumen Ejecutivo en Lenguaje Sencillo

El propósito de esta sección es explicar el funcionamiento completo del "Buscador Inteligente" de una manera clara y accesible, sin utilizar jerga técnica. Para ello, podemos usar la analogía de un bibliotecario que recibe un libro nuevo para catalogarlo y facilitar su consulta.

1. Recibir y Fichar el Libro: Cuando un usuario sube un archivo .docx, es como si le entregara un libro nuevo al bibliotecario. Lo primero que hace el sistema es "leer" el libro de principio a fin para extraer todo su texto, ignorando el formato. Este texto puro es la materia prima con la que trabajará.
2. Crear un Índice: A continuación, el bibliotecario crea una ficha de índice para el libro. En lugar de tener que releer el libro cada vez que alguien pregunta por una palabra, realiza un trabajo previo: anota cada palabra única que aparece en el texto y cuenta cuántas veces se repite. Este índice de frecuencias se guarda en una ficha (analisisWord en localStorage). El libro original también se guarda en una estantería cercana (textoWord) para consultarlo más tarde.
3. Atender una Consulta: Cuando un usuario escribe en la barra de búsqueda, es como si le preguntara al bibliotecario por una palabra específica. El bibliotecario no va a la estantería a buscar el libro y leerlo de nuevo. En su lugar, consulta su ficha de índice, que es mucho más rápida. Al instante, puede ver todas las palabras que coinciden con la búsqueda y, gracias a que contó las repeticiones, sabe cuáles son las más importantes (las más frecuentes).
4. Mostrar los Resultados: Una vez que el bibliotecario ha encontrado las coincidencias en su índice, va a la estantería, toma el libro original y le pone un marcapáginas de colores en cada lugar donde aparece la palabra buscada. Luego, le entrega el libro al usuario para que pueda ver las palabras resaltadas en su contexto original.
5. Limpiar la Mesa: Finalmente, el botón "borrar" es como decirle al bibliotecario que la consulta ha terminado. Él retira el libro de la estantería y destruye la ficha de índice, dejando la biblioteca limpia y lista para recibir un nuevo libro.
