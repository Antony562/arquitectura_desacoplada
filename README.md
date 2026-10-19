# Microservicios

Recurso educativo sobre arquitectura desacoplada y microservicios, construido con HTML5, CSS, JavaScript y Bootstrap 5. No necesita un proceso de compilación ni dependencias instaladas.

## Estructura

- `index.html`: contenido semántico y referencias a Bootstrap, Bootstrap Icons y los archivos locales.
- `css/styles.css`: estilos, diagrama adaptable y estados responsivos.
- `js/script.js`: navegación móvil, reproductor local, cuestionario y actualización del año.
- `img/`: imágenes del proyecto.
- `video/arquitectura desacoplada.mp4`: video educativo cargado por defecto en el reproductor.

## Ejecutar localmente

Abre `index.html` en un navegador con conexión a Internet para cargar Bootstrap, Bootstrap Icons y las fuentes externas. También puedes servir el directorio desde una terminal:

```bash
python3 -m http.server 8000
```

Visita `http://localhost:8000`.

## Reproducir un video

La sección «Aprende con un video» reproduce inicialmente `video/arquitectura desacoplada.mp4`. También puedes seleccionar otro archivo MP4 o WebM de tu dispositivo. Ese archivo alternativo se reproduce localmente en el navegador, no se sube ni se guarda en el proyecto. El botón «Restablecer reproductor» libera la URL temporal y vuelve al video incluido. Para distribuir otros videos a todos los visitantes, se necesita alojarlos junto al sitio o utilizar un backend o servicio de almacenamiento.

El cuestionario funciona íntegramente en el navegador y no requiere base de datos.
