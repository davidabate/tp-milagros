const palabras = ["perro", "carta", "flaco", "plaza", "noche", "casas", "banco", "verde"];
const palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
const maxIntentos = 6
let intentos = 0;

const tablero = document.querySelector(".tablero");
const mensaje = document.querySelector(".mensaje");
const entrada = document.querySelector(".entrada");
const teclado = document.querySelector(".teclado");

// Crear el tablero vacío
for (let i = 0; i < maxIntentos * 5; i++) {
  const div = document.createElement("div");
  div.classList.add("letra");
  tablero.appendChild(div);
}

// Crear teclado con el abecedario
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
for (let letra of letras) {
  const btn = document.createElement("button");
  btn.textContent = letra;
  btn.classList.add("tecla");
  teclado.appendChild(btn);
}

function actualizarTeclado(letra, estado) {
  const botones = document.querySelectorAll(".tecla");
  botones.forEach(boton => {
    if (boton.textContent === letra.toUpperCase()) {
      boton.classList.remove("correcta", "presente", "incorrecta");
      boton.classList.add(estado);
    }
  });
}

document.querySelector(".boton").addEventListener("click", () => {
  const intento = entrada.value.toLowerCase();

  if (intento.length !== 5) {
    mensaje.textContent = "La palabra debe tener 5 letras.";
    return;
  }
  if (!palabras.includes(intento)) {
    mensaje.textContent = "La palabra no está en la lista.";
    return;
  }

  mensaje.textContent = "";
  const letrasCeldas = document.querySelectorAll(".letra");
  let posicion = intentos * 5;

  for (let i = 0; i < 5; i++) {
    const celda = letrasCeldas[posicion + i];
    celda.textContent = intento[i];
    if (intento[i] === palabraSecreta[i]) {
      celda.classList.add("correcta");
      actualizarTeclado(intento[i], "correcta");
    } else if (palabraSecreta.includes(intento[i])) {
      celda.classList.add("presente");
      actualizarTeclado(intento[i], "presente");
    } else {
      celda.classList.add("incorrecta");
      actualizarTeclado(intento[i], "incorrecta");
    }
  }

  intentos++;

  if (intento === palabraSecreta) {
    mensaje.textContent = "¡Felicidades! Adivinaste la palabra.";
    entrada.disabled = true;
    return;
  }

  if (intentos === maxIntentos) {
    mensaje.textContent = "Perdiste 😞. La palabra era: " + palabraSecreta.toUpperCase();
    entrada.disabled = true;
  }

  entrada.value = "";
  entrada.focus();
});
