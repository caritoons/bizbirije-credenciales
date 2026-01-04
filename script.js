// script.js

// Rutas de las credenciales
const data = {
  reportera: [
    "img/credenciales/reportera/reportera-amarillo.png",
    "img/credenciales/reportera/reportera-azul.png",
    "img/credenciales/reportera/reportera-rosa.png",
    "img/credenciales/reportera/reportera-morado.png"
  ],
  reportero: [
    "img/credenciales/reportero/reportero-amarillo.png",
    "img/credenciales/reportero/reportero-azul.png",
    "img/credenciales/reportero/reportero-verde.png",
    "img/credenciales/reportero/reportero-morado.png"
  ],
  ayudante: [
    "img/credenciales/ayudante/ayudante-amarillo.png",
    "img/credenciales/ayudante/ayudante-azul.png",
    "img/credenciales/ayudante/ayudante-verde.png",
    "img/credenciales/ayudante/ayudante-morado.png"
  ]
};

const grids = {
  reportera: document.getElementById("reportera"),
  reportero: document.getElementById("reportero"),
  ayudante: document.getElementById("ayudante")
};

const editor = document.getElementById("editor");
const nombreInput = document.getElementById("nombre");
const fuenteSelect = document.getElementById("fuente");
const colorSelect = document.getElementById("color");
const canvas = document.getElementById("canvas");
const descargarBtn = document.getElementById("descargar");

let currentImage = null;
let currentType = "";

// Iniciar canvas
const ctx = canvas.getContext("2d");

// Crear cards
for (const type in data) {
  data[type].forEach((src, index) => {
    let img = document.createElement("img");
    img.src = src;
    img.alt = `${type} ${index}`;
    img.onclick = () => abrirEditor(src);
    grids[type].appendChild(img);
  });
}

function abrirEditor(src) {
  editor.hidden = false;
  currentImage = new Image();
  currentImage.src = src;
  currentImage.onload = function () {
    drawCanvas();
  };
}

function drawCanvas() {
  // Toma tamaño de la imagen base
  canvas.width = currentImage.width;
  canvas.height = currentImage.height;

  // Fondo
  ctx.drawImage(currentImage, 0, 0);

  // Nombre
  const name = nombreInput.value.toUpperCase();
  const font = fuenteSelect.value;
  const color = colorSelect.value;

  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.font = `48px ${font}`;

  // Ajusta posición si hace falta
  const x = canvas.width / 2;
  const y = canvas.height - 150;
  ctx.fillText(name, x, y);
}

// Eventos
nombreInput.oninput = drawCanvas;
fuenteSelect.onchange = drawCanvas;
colorSelect.onchange = drawCanvas;

descargarBtn.onclick = function () {
  const link = document.createElement("a");
  link.download = "credencial-bizbirije.png";
  link.href = canvas.toDataURL();
  link.click();
};

