# Microservicios

Recurso educativo sobre arquitectura desacoplada y microservicios, construido con HTML5, CSS, JavaScript y Bootstrap 5. No necesita un proceso de compilación ni dependencias instaladas.

## Estructura

- `index.html`: contenido semántico y referencias a Bootstrap, Bootstrap Icons y los archivos locales.
- `css/styles.css`: estilos, diagrama adaptable y estados responsivos.
- `js/script.js`: navegación móvil, reproductor local, cuestionario y actualización del año.
- `img/` y `video/`: recursos del proyecto. No se incluyen medios educativos por defecto.

## Ejecutar localmente

Abre `index.html` en un navegador con conexión a Internet para cargar Bootstrap, Bootstrap Icons y las fuentes externas. También puedes servir el directorio desde una terminal:

```bash
python3 -m http.server 8000
```

Visita `http://localhost:8000`.

## Reproducir un video

En la sección «Aprende con un video», selecciona un archivo MP4 o WebM de tu dispositivo. El video se reproduce localmente en el navegador, no se sube ni se guarda en el proyecto. El botón «Restablecer reproductor» libera la URL temporal. Para distribuir un video a todos los visitantes, se necesita alojarlo junto al sitio o utilizar un backend o servicio de almacenamiento.

El cuestionario funciona íntegramente en el navegador y no requiere base de datos.
