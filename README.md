
### 🏥 Registro de Tiempos en SAR

Este proyecto permite registrar y analizar los tiempos de atención en el **Servicio de Atención Primaria de Urgencia de Alta Resolutividad (SAR)**, categorizando a los pacientes según prioridad y edad. La herramienta está diseñada para mejorar la eficiencia en la gestión de tiempos y optimizar los procesos de urgencias.

## 🚀 Características Principales
- **📋 Registro interactivo**: Permite ingresar pacientes categorizados en C1-C5 con su edad y tiempo de espera.
- **📊 Generación automática de estadísticas**: Calcula la cantidad de pacientes y el tiempo promedio de espera por categoría y grupo etario.
- **🖥️ Interfaz amigable y moderna**: Diseño limpio con una tabla de resumen dinámica.
- **🗑️ Función de eliminación y limpieza de datos**: Posibilidad de eliminar registros individuales o limpiar todos los datos.
- **⚡ Implementación ligera en HTML, CSS y JavaScript**: Sin necesidad de backend o base de datos.

## 🛠 Tecnologías Utilizadas
- **HTML5 & CSS3** → Estructura y estilos de la aplicación.
- **JavaScript (DOM & Arrays)** → Manipulación dinámica de datos y visualización en tablas.

## 📂 Estructura del Proyecto
```
/registro-tiempos-sar
│── index.html      # Página principal con formulario y tablas
│── styles.css      # Estilos para la interfaz
│── script.js       # Lógica de interacción con el usuario
│── README.md       # Documentación del proyecto
```

## 📈 Flujo del Registro
1. El usuario selecciona la **categoría de urgencia** (C1-C5), la **edad del paciente** y el **tiempo de espera**.
2. Al presionar "Agregar", el registro se almacena y se muestra en la tabla.
3. Se calcula automáticamente un **resumen estadístico** con promedios de tiempos por categoría y edad.
4. Los datos pueden **eliminarse individualmente** o **limpiarse por completo**.
5. Existe una tabla con **paginación**, permitiendo ver hasta 10 registros por página.

## 📢 Contribución
Si deseas mejorar la funcionalidad o agregar nuevas métricas de análisis, ¡haz un **fork** y envía un **pull request**! 🚀  

---

Creado por **Matías Bustos - Zipper**.

---
