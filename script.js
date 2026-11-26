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
 
// Function to remove an item
function removeItem(event) {
  const item = event.target.closest('li');
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}
