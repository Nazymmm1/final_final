const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");
const cartCountElement = document.querySelector(".cart-count");

let totalCartItems = 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
updateCartCount();

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    menuItems.forEach(item => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

document.querySelectorAll(".menu-item").forEach(item => {
  const plusBtn = item.querySelector(".add-btn");
  const priceSection = item.querySelector(".price-section");
  const expanded = item.querySelector(".expanded-controls");
  const plus = expanded.querySelector(".plus");
  const minus = expanded.querySelector(".minus");
  const quantityEl = expanded.querySelector(".quantity");
  const totalEl = expanded.querySelector(".total");
  const price = parseInt(item.querySelector(".price").textContent);
  const title = item.querySelector(".card-title").textContent;

  let quantity = 0;

  plusBtn.addEventListener("click", () => {
    priceSection.style.display = "none";
    expanded.style.display = "flex";
    quantity = 1;
    quantityEl.textContent = quantity;
    totalEl.textContent = price * quantity;

    addToCart(title, price, quantity);
    updateCartCount();
  });

  plus.addEventListener("click", () => {
    quantity++;
    quantityEl.textContent = quantity;
    totalEl.textContent = price * quantity;
    addToCart(title, price, 1);
    updateCartCount();
  });

  minus.addEventListener("click", () => {
    quantity--;
    if (quantity <= 0) {
      expanded.style.display = "none";
      priceSection.style.display = "flex";
      removeFromCart(title);
    } else {
      quantityEl.textContent = quantity;
      totalEl.textContent = price * quantity;
      addToCart(title, price, -1);
    }
    updateCartCount();
  });
});

function addToCart(name, price, qtyChange) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += qtyChange;
    if (existing.quantity <= 0) {
      cart = cart.filter(i => i.name !== name);
    }
  } else if (qtyChange > 0) {
    cart.push({ name, price, quantity: qtyChange });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalCartItems;
}
