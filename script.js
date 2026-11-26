const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');
 
let totalPrice = 0;
 
// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  if (totalPrice < 0.005) {
    totalPrice = 0;
  }
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

function saveCartToStorage() {
  const items = [];
  const cartElements = cart.querySelectorAll('.cart-item');

  cartElements.forEach(function (item) {
    items.push({
      name: item.dataset.name,
      price: item.dataset.price,
      quantity: item.dataset.quantity,
    });
  });
  localStorage.setItem('shoppingCart', JSON.stringify(items));
}
 
function removeItem(event) {
  const item = event.target.closest('li');
  const price = parseFloat(item.dataset.price);
  
  updateTotalPrice(-price);
  item.remove();
  saveCartToStorage();
}

function updateQuantity(event, change) {
  const item = event.target.closest('li');
  const unitPrice = parseFloat(item.dataset.price);
  let quantity = parseInt(item.dataset.quantity, 10);

  if (quantity + change <= 0) {
    removeItem(event);
    return;
  }

  quantity += change;
  item.dataset.quantity = quantity;

  const itemText = item.querySelector('.item-info');
  const subtotal = (unitPrice * quantity).toFixed(2);
  itemText.textContent = `${item.dataset.name} - $${unitPrice.toFixed(2)} x ${quantity} = $${subtotal}`;

  updateTotalPrice(unitPrice * change);
  saveCartToStorage();
}

function renderCartItem(name, price, quantity) {
  const li = document.createElement('li');
  li.className = 'cart-item';

  li.dataset.name = name;
  li.dataset.price = price;
  li.dataset.quantity = quantity;

  const subtotal = (price * quantity).toFixed(2);
  const infoSpan = document.createElement('span');
  infoSpan.className = 'item-info';
  infoSpan.textContent = `${name} - $${price.toFixed(2)} x ${quantity} = $${subtotal}`;

  const decreaseBtn = document.createElement('button');
  decreaseBtn.textContent = '-';
  decreaseBtn.addEventListener('click', function (event) {
    updateQuantity(event, -1);
  });

  const increaseBtn = document.createElement('button');
  increaseBtn.textContent = '+';
  increaseBtn.addEventListener('click', function (event) {
    updateQuantity(event, 1);
  });

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', removeItem);

  li.appendChild(infoSpan);
  li.appendChild(decreaseBtn);
  li.appendChild(increaseBtn);
  li.appendChild(removeBtn);
  cart.appendChild(li);

  updateTotalPrice(price * quantity);
}

function addProduct() {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);

  if (name === '' || isNaN(price) || price <= 0) {
    alert('Please enter a valid product name and a price greater than $0.');
    return;
  }

  renderCartItem(name, price, 1);
  saveCartToStorage();

  productNameInput.value = '';
  productPriceInput.value = '';
  productNameInput.focus();
}

function loadCartFromStorage() {
  const savedData = localStorage.getItem('shoppingCart');
  if (savedData) {
    const items = JSON.parse(savedData);
    items.forEach(function (item) {
      renderCartItem(item.name, Number(item.price), Number(item.quantity));
    });
  }
}

addProductButton.addEventListener('click', addProduct);
loadCartFromStorage();