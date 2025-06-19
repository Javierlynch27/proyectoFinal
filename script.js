document.addEventListener('DOMContentLoaded', () => {
  const contenedorProductos = document.querySelector('.productos__grid');
  const listaElementosCarrito = document.querySelector('.elementos-carrito');
  const elementoTotalCarrito = document.querySelector('.total-carrito');
  const buscador = document.getElementById('buscador');
  const btnComprar = document.getElementById('btn-comprar');
  let carrito = [];

  const productosDisponibles = [
    { id: 1, nombre: 'Acqua di Gio', precio: 75.00, imagen: 'ImagenesPagina/Acqua di gio.webp' },
    { id: 2, nombre: 'Hugo Boss Bottled', precio: 65.00, imagen: 'ImagenesPagina/Hugo bosss bottled.webp' },
    { id: 3, nombre: 'Paco Rabanne Invictus', precio: 80.00, imagen: 'ImagenesPagina/Paco Rabanne.png' },
    { id: 4, nombre: 'Dior Sauvage', precio: 90.00, imagen: 'ImagenesPagina/Dior Sauvage.webp' }
  ];

  function renderizarProductos(lista = productosDisponibles) {
    contenedorProductos.innerHTML = lista.map(prod => `
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
      const p = productosDisponibles.find(x => x.id === item.id);
      return `
        <li>
          <span>${p.nombre}</span>
          <input type="number" min="1" value="${item.cantidad}"
                 data-id="${item.id}" class="entrada-cantidad">
          <span>$${(p.precio * item.cantidad).toFixed(2)}</span>
          <button class="boton-eliminar" data-id="${item.id}">&times;</button>
        </li>
      `;
    }).join('');
    const total = carrito.reduce((sum, item) => {
      const p = productosDisponibles.find(x => x.id === item.id);
      return sum + p.precio * item.cantidad;
    }, 0);
    elementoTotalCarrito.textContent = total.toFixed(2);
  }

  function agregarAlCarrito(id) {
    const ex = carrito.find(i => i.id === id);
    ex ? ex.cantidad++ : carrito.push({ id, cantidad: 1 });
    renderizarCarrito();
  }
  function eliminarDelCarrito(id) {
    carrito = carrito.filter(i => i.id !== id);
    renderizarCarrito();
  }
  function actualizarCantidad(id, qty) {
    const it = carrito.find(i => i.id === id);
    if (it && qty > 0) it.cantidad = qty;
    renderizarCarrito();
  }

  contenedorProductos.addEventListener('click', e => {
    if (e.target.classList.contains('boton-agregar'))
      agregarAlCarrito(+e.target.dataset.id);
  });
  listaElementosCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('boton-eliminar'))
      eliminarDelCarrito(+e.target.dataset.id);
  });
  listaElementosCarrito.addEventListener('change', e => {
    if (e.target.classList.contains('entrada-cantidad'))
      actualizarCantidad(+e.target.dataset.id, +e.target.value);
  });

  buscador.addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const filtrados = productosDisponibles.filter(p =>
      p.nombre.toLowerCase().includes(term)
    );
    renderizarProductos(filtrados);
  });

  // BOTÓN COMPRAR
  btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
    } else {
      alert('Compra realizada');
      carrito = [];
      renderizarCarrito();
    }
  });

  // Inicial
  renderizarProductos();
  renderizarCarrito();
});
