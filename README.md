# 🎮 Juego de Escritura

¡Bienvenido al **Juego de Escritura**! 📝✨

Este juego interactivo está diseñado para reforzar habilidades de escritura y audición de palabras en español. Al iniciar, escucharás una palabra, luego deberás teclearla letra por letra. Cada pulsación correcta reproduce el sonido de la letra, mientras que los errores se marcan con un efecto sonoro. Al completar una palabra, suena un bonus y automáticamente pasarás a la siguiente.

---

## 📋 Características principales

* 🔊 **Audio de palabras y letras**: se reproduce la palabra completa al iniciar y cada letra al teclearla correctamente.
* ❌ **Detección de errores**: si escribes una letra incorrecta, escucharás un efecto de error.
* 🎉 **Bonus al completar**: al terminar de escribir correctamente la palabra, escuchas un bonus antes de avanzar.
* 🎯 **Panel de puntaje**: en la esquina superior derecha, podrás ver en tiempo real:

  * Letras correctas acumuladas
  * Palabras completadas
  * Errores cometidos
* 🌈 **Interfaz atractiva**: fondo 3D con un cubo giratorio y degradado dinámico.
* 📜 **Listado alfabético**: el juego recorre automáticamente un array de palabras en orden alfabético.

---

## 🚀 Cómo empezar

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### 1. Prerrequisitos

* **Node.js** (versión 14 o superior) y **npm** instalados. Puedes descargarlo en [https://nodejs.org/](https://nodejs.org/)

* **Activar Scripts desde consola de powershell**
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
### 2. Clonar el repositorio

```bash
git clone https://github.com/Braian-92/JuegosReact.git
cd juego-escritura
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar en modo desarrollo

Inicia el servidor de desarrollo y abre tu navegador en [http://localhost:3000](http://localhost:3000):

```bash
npm start
```

### 5. Compilar para producción

Genera la versión optimizada en la carpeta `build/`, lista para subir a un servidor web:

```bash
npm run build
```

Luego, puedes servir `build/` con cualquier servidor estático (Apache, Nginx, Surge, GitHub Pages, etc.).

---

## 📂 Estructura del proyecto

```
├── public/
│   ├── audio/
│   │   ├── words/      # MP3 de palabras (PERRO.mp3, GATO.mp3, ...)
│   │   ├── letters/    # MP3 de letras (A.mp3, B.mp3, ...)
│   │   └── efects/     # Efectos: ERROR.mp3, BONUS.mp3
│   └── index.html
├── src/
│   ├── components/
│   │   └── WriteModule.tsx
│   ├── App.tsx
│   ├── Escena.tsx
│   ├── Gui.tsx
│   ├── ScorePanel.tsx
│   └── index.tsx
├── package.json
└── README.md
```

---

¡Diviértete escribiendo y mejorando tu ortografía! 🖋️💪
