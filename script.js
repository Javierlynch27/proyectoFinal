document.addEventListener('DOMContentLoaded', () => {
  const contenedorProductos = document.querySelector('.productos');
  const listaElementosCarrito = document.querySelector('.elementos-carrito');
  const elementoTotalCarrito = document.querySelector('.total-carrito');
  let carrito = [];

  const productosDisponibles = [
    { id: 1, nombre: 'Acqua di Gio', precio: 75.00, imagen: 'https://via.placeholder.com/200x200' },
    { id: 2, nombre: 'Hugo Boss Bottled', precio: 65.00, imagen: 'https://via.placeholder.com/200x200' },
    { id: 3, nombre: 'Paco Rabanne Invictus', precio: 80.00, imagen: 'https://via.placeholder.com/200x200' },
    { id: 4, nombre: 'Dior Sauvage', precio: 90.00, imagen: 'https://via.placeholder.com/200x200' }
  ];

  function renderizarProductos() {
    contenedorProductos.innerHTML = productosDisponibles.map(prod => `
      <article class="tarjeta-producto">
        <img src="${prod.imagen}" alt="Perfume ${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p class="precio">$${prod.precio.toFixed(2)}</p>
        <button class="boton-agregar" data-id="${prod.id}">Agregar al carrito</button>
      </article>
    `).join('');
  }

  function renderizarCarrito() {
    if (!carrito.length) {
      listaElementosCarrito.innerHTML = '<li class="vacio">No hay productos en el carrito.</li>';
      elementoTotalCarrito.textContent = '0.00';
      return;
    }

    listaElementosCarrito.innerHTML = carrito.map(item => {
      const producto = productosDisponibles.find(p => p.id === item.id);
      return `
        <li>
          <span>${producto.nombre}</span>
          <input type="number" min="1" value="${item.cantidad}" data-id="${item.id}" class="entrada-cantidad">
          <span>$${(producto.precio * item.cantidad).toFixed(2)}</span>
          <button class="boton-eliminar" data-id="${item.id}">&times;</button>
        </li>
      `;
    }).join('');

    const total = carrito.reduce((acum, item) => {
      const prod = productosDisponibles.find(p => p.id === item.id);
      return acum + prod.precio * item.cantidad;
    }, 0);
    elementoTotalCarrito.textContent = total.toFixed(2);
  }

  function agregarAlCarrito(id) {
    const existe = carrito.find(item => item.id === id);
    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({ id, cantidad: 1 });
    }
    renderizarCarrito();
  }

  function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    renderizarCarrito();
  }

  function actualizarCantidad(id, cantidad) {
    const item = carrito.find(i => i.id === id);
    if (item && cantidad > 0) {
      item.cantidad = cantidad;
    }
    renderizarCarrito();
  }

  contenedorProductos.addEventListener('click', e => {
    if (e.target.classList.contains('boton-agregar')) {
      agregarAlCarrito(Number(e.target.dataset.id));
    }
  });

  listaElementosCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('boton-eliminar')) {
      eliminarDelCarrito(Number(e.target.dataset.id));
    }
  });

  listaElementosCarrito.addEventListener('change', e => {
    if (e.target.classList.contains('entrada-cantidad')) {
      actualizarCantidad(Number(e.target.dataset.id), Number(e.target.value));
    }
  });

  renderizarProductos();
  renderizarCarrito();
});

