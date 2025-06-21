// ----------------------------------------
// Alta Fragancia - script.js
// Aca va toda la lógica del carrito
// ----------------------------------------

(() => {
  'use strict';

  // 1) Referencias al DOM
  const productsContainer = document.querySelector('.productos__grid');
  const cartList         = document.querySelector('.elementos-carrito');
  const totalDisplay     = document.querySelector('.total-carrito');
  const searchInput      = document.getElementById('buscador');
  const buyButton        = document.getElementById('btn-comprar');

  // 2) Catálogo de productos (datos "duros")
  const catalog = [
    { id: 1, name: 'Acqua di Gio',          price: 75.00, img: 'ImagenesPagina/Acqua di gio.webp' },
    { id: 2, name: 'Hugo Boss Bottled',     price: 65.00, img: 'ImagenesPagina/Hugo bosss bottled.webp' },
    { id: 3, name: 'Paco Rabanne Invictus', price: 80.00, img: 'ImagenesPagina/Paco Rabanne.png' },
    { id: 4, name: 'Dior Sauvage',          price: 90.00, img: 'ImagenesPagina/Dior Sauvage.webp' },
    { id: 5, name: 'Azzaro Most Wanted',    price: 70.00, img: 'ImagenesPagina/Azzaro Most Wanted.webp' },
    { id: 6, name: 'Bleu De Channel',       price: 100.00, img: 'ImagenesPagina/Bleu De Channel.png' },
    { id: 7, name: 'Versace Pour Homme',    price: 85.00, img: 'ImagenesPagina/Versace Pour Homme.png' }
  ];

  // 3) Estructura del carrito: array de { id, qty }
  let cart = [];

  // 4) Renderizar productos en pantalla
  function renderProducts(list = catalog) {
    // Construyo el HTML de cada tarjeta
    const html = list.map(prod => `
      <article class="tarjeta-producto card">
        <img src="${prod.img}" alt="${prod.name}" class="card-img-top">
        <div class="card-body">
          <h3 class="card-title">${prod.name}</h3>
          <p class="precio">$${prod.price.toFixed(2)}</p>
          <button class="boton-agregar btn" data-id="${prod.id}">
            Agregar al carrito
          </button>
        </div>
      </article>
    `).join('');

    productsContainer.innerHTML = html;
  }

  // 5) Renderizar carrito y total
  function renderCart() {
    if (cart.length === 0) {
      cartList.innerHTML = `<li class="vacio text-center">No hay productos en el carrito.</li>`;
      totalDisplay.textContent = '0.00';
      return;
    }

    // Para cada item en el carrito, muestro fila con nombre, qty, precio y botón
    const html = cart.map(item => {
      const prod = catalog.find(p => p.id === item.id);
      const lineTotal = (prod.price * item.qty).toFixed(2);
      return `
        <li>
          <span>${prod.name}</span>
          <input
            type="number"
            min="1"
            value="${item.qty}"
            data-id="${item.id}"
            class="entrada-cantidad form-control form-control-sm"
          >
          <span>$${lineTotal}</span>
          <button class="boton-eliminar btn btn-link p-0" data-id="${item.id}">
            &times;
          </button>
        </li>
      `;
    }).join('');

    cartList.innerHTML = html;

    // Calcular total
    const total = cart.reduce((sum, item) => {
      const prod = catalog.find(p => p.id === item.id);
      return sum + prod.price * item.qty;
    }, 0).toFixed(2);

    totalDisplay.textContent = total;
  }

  // 6) Agregar producto (Create)
  function addToCart(id) {
    const existing = cart.find(x => x.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, qty: 1 });
    }
    renderCart();
  }

  // 7) Quitar producto (Delete)
  function removeFromCart(id) {
    cart = cart.filter(x => x.id !== id);
    renderCart();
  }

  // 8) Actualizar cantidad (Update)
  function updateQty(id, newQty) {
    const entry = cart.find(x => x.id === id);
    if (entry && newQty >= 1) {
      entry.qty = newQty;
      renderCart();
    }
  }

  // 9) Búsqueda en vivo
  function handleSearch(e) {
    const term = e.target.value.trim().toLowerCase();
    const filtered = catalog.filter(p =>
      p.name.toLowerCase().includes(term)
    );
    renderProducts(filtered);
  }

  // 10) Finalizar compra
  function handlePurchase() {
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    alert('¡Compra realizada con éxito!');
    cart = [];             // limpio carrito
    renderCart();          // vuelvo a dibujar
  }

  // 11) Configuración de eventos al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();

    // Delegación: agregar al carrito
    productsContainer.addEventListener('click', e => {
      if (e.target.matches('.boton-agregar')) {
        addToCart(Number(e.target.dataset.id));
      }
    });

    // Delegación: eliminar o cambiar cantidad
    cartList.addEventListener('click', e => {
      if (e.target.matches('.boton-eliminar')) {
        removeFromCart(Number(e.target.dataset.id));
      }
    });
    cartList.addEventListener('change', e => {
      if (e.target.matches('.entrada-cantidad')) {
        updateQty(
          Number(e.target.dataset.id),
          Number(e.target.value)
        );
      }
    });

    // Input de búsqueda
    searchInput.addEventListener('input', handleSearch);

    // Botón comprar
    buyButton.addEventListener('click', handlePurchase);
  });

})();
