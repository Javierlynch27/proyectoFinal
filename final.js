// final.js

const peliculas = [];
let indiceEditando = -1; // -1 significa que no estamos editando

const formulario = document.getElementById("formulario-peliculas");
const ulPeliculas = document.getElementById("ulPeliculas");
const botonAgregar = document.getElementById("botonAgregar");

// Evento de envío del formulario
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevaPeli = {
    titulo: document.getElementById("titulo").value,
    anio: document.getElementById("anio").value,
    genero: document.getElementById("genero").value,
    director: document.getElementById("director").value,
    descripcion: document.getElementById("descripcion").value
  };

  const anioNum = parseInt(nuevaPeli.anio, 10);
  if (isNaN(anioNum) || anioNum < 1800 || anioNum > 2025) {
    alert("El año debe ser un número entre 1800 y 2025.");
    return;
  }

  nuevaPeli.anio = anioNum;

  if (indiceEditando !== -1) {
    peliculas[indiceEditando] = nuevaPeli;
    indiceEditando = -1;
    botonAgregar.textContent = "Agregar Película";
  } else {
    peliculas.push(nuevaPeli);
  }

  formulario.reset();
  mostrarPeliculas();
});


function mostrarPeliculas() {
  ulPeliculas.innerHTML = "";

  for (let i = 0; i < peliculas.length; i++) {
    let pelicula = peliculas[i];

    let li = document.createElement("li");
    li.className = "bloque";

    let h3 = document.createElement("h3");
    h3.textContent = pelicula.titulo + " (" + pelicula.anio + ")";
    li.appendChild(h3);

    let pGenero = document.createElement("p");
    pGenero.innerHTML = "<strong>Género:</strong> " + pelicula.genero;
    li.appendChild(pGenero);

    let pDirector = document.createElement("p");
    pDirector.innerHTML = "<strong>Director:</strong> " + pelicula.director;
    li.appendChild(pDirector);

    let pDescripcion = document.createElement("p");
    pDescripcion.textContent = pelicula.descripcion;
    li.appendChild(pDescripcion);

    let contenedorBotones = document.createElement("div");
    contenedorBotones.className = "botonera";

    let botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.className = "boton-editar";

    botonEditar.addEventListener("click", function () {
      document.getElementById("titulo").value = pelicula.titulo;
      document.getElementById("anio").value = pelicula.anio;
      document.getElementById("genero").value = pelicula.genero;
      document.getElementById("director").value = pelicula.director;
      document.getElementById("descripcion").value = pelicula.descripcion;

      indiceEditando = i;
      botonAgregar.textContent = "Guardar Cambios";
    });

    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "boton-eliminar";

    botonEliminar.addEventListener("click", function () {
      peliculas.splice(i, 1);
      mostrarPeliculas();

      if (indiceEditando === i) {
        formulario.reset();
        indiceEditando = -1;
        botonAgregar.textContent = "Agregar Película";
      }
    });

    contenedorBotones.appendChild(botonEditar);
    contenedorBotones.appendChild(botonEliminar);
    li.appendChild(contenedorBotones);
    ulPeliculas.appendChild(li);
  }
}







