const cartList = document.querySelector(".cart-list");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `
      <li class="list-group-item text-center text-muted">
        Your cart is empty 😢
      </li>`;
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <h6 class="mb-0 fw-semibold">${item.name}</h6>
        <small class="text-muted">x${item.quantity} pcs</small>
      </div>
      <div class="d-flex align-items-center gap-3">
        <span class="fw-bold text-dark">${item.price * item.quantity}₸</span>
        <button class="btn btn-sm btn-outline-danger remove-btn" data-index="${index}">
          🗑
        </button>
      </div>
    `;
    cartList.appendChild(li);
  });

  // Add event listeners to each remove button
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1); // remove item from array
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(); // refresh list
    });
  });
}

renderCart();
