# 📈 Calculadora de Interés Compuesto

Una aplicación web moderna, minimalista y profesional para visualizar el crecimiento de tus inversiones a lo largo del tiempo utilizando el poder del interés compuesto.

![Project Preview](https://img.shields.io/badge/UI-Minimalist-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

## ✨ Características

- **Diseño Premium**: Interfaz inspirada en los estándares de Apple y Stripe (limpia, off-white y tipografía sans-serif).
- **Flexibilidad Temporal**: Calcula proyecciones en días, meses o años.
- **Frecuencia de Capitalización**: Configura si el interés se reinvierte de forma diaria, mensual, trimestral, semestral o anual.
- **Gráficos Dinámicos**: Visualización de área interactiva mediante **Chart.js**.
- **Validación Inteligente**: Sistema que previene errores de coherencia temporal.
- **Responsive**: Totalmente optimizado para dispositivos móviles y escritorio.

## 🚀 Tecnologías

- **Backend**: Python con Flask.
- **Frontend**: HTML5, CSS3 (Vanilla) y JavaScript (Vanilla).
- **Gráficos**: Chart.js vía CDN.
- **Fuentes**: Inter (Google Fonts).

## 🛠️ Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/interes-compuesto.git
   cd interes-compuesto
   ```

2. **Crear un entorno virtual**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # En Linux/macOS
   ```

3. **Instalar dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación**:
   ```bash
   python app.py
   ```

5. **Abrir en el navegador**:
   Ve a `http://127.0.0.1:5000`

## 📂 Estructura del Proyecto

```text
.
├── app.py              # Lógica del servidor y cálculos financieros
├── static/
│   ├── style.css       # Estilos minimalistas y animaciones
│   └── script.js       # Interactividad y configuración de gráficas
├── templates/
│   └── index.html      # Estructura principal
└── requirements.txt    # Dependencias del proyecto
```

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---
Creado con ❤️ para entusiastas de las finanzas y el desarrollo web.
