/**
 * Write your challenge solution here
 */

let totalValue = 0;
let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let emptyCart = document.getElementsByClassName("empty-cart");

function addToCart(name, price) {
  let mainDiv = document.createElement("div");
  let firstDiv = document.createElement("div");
  let secondaryDiv = document.createElement("div");
  let quantityDiv = document.createElement("div");
  let infoDiv = document.createElement("div");

  mainDiv.className = "cart-item";
  quantityDiv.className = "quantity-controls";
  infoDiv.className = "quantity-controls";
  secondaryDiv.className = "cart-item-info";

  let spanName = document.createElement("span");
  spanName.innerHTML = name;

  let decreaseBtn = document.createElement("button");
  decreaseBtn.innerHTML = "-";
  decreaseBtn.onclick = () => decreaseQuantity(spanQuantity, price, spanPrice, decreaseBtn);
  decreaseBtn.disabled = true;

  let spanQuantity = document.createElement("span");
  spanQuantity.innerHTML = 1;

  let increaseBtn = document.createElement("button");
  increaseBtn.innerHTML = "+";
  increaseBtn.onclick = () => increaseQuantity(spanQuantity, price, spanPrice, decreaseBtn);

  let spanPrice = document.createElement("span");
  spanPrice.innerHTML = `$${price}`;

  let removeBtn = document.createElement("button");
  removeBtn.innerHTML = "Remove";
  removeBtn.onclick = () => removeItem(mainDiv, price, spanQuantity);

  totalValue += price;

  firstDiv.appendChild(spanName);

  quantityDiv.appendChild(decreaseBtn);
  quantityDiv.appendChild(spanQuantity);
  quantityDiv.appendChild(increaseBtn);
  secondaryDiv.appendChild(quantityDiv);

  infoDiv.appendChild(spanPrice);
  infoDiv.appendChild(removeBtn);
  secondaryDiv.appendChild(infoDiv);

  mainDiv.appendChild(firstDiv);
  mainDiv.appendChild(secondaryDiv);

  cartItems.appendChild(mainDiv);
  cartTotal.innerHTML = `<h3>Total: $${totalValue.toFixed(2)}</h3>`;
  emptyCart.item(0).style.display = "none";
}

function decreaseQuantity(spanQuantity, price, spanPrice, decreaseBtn) {
  let currentQuantity = spanQuantity.innerText;
  currentQuantity--;
  spanQuantity.innerText = currentQuantity;
  totalValue -= price;
  spanPrice.innerHTML = `$${(price * currentQuantity).toFixed(2)}`;
  cartTotal.innerHTML = `<h3>Total: $${totalValue.toFixed(2)}</h3>`;
  if (currentQuantity == 1) decreaseBtn.disabled = true;
}

function increaseQuantity(spanQuantity, price, spanPrice, decreaseBtn) {
  let currentQuantity = spanQuantity.innerText;
  currentQuantity++;
  decreaseBtn.disabled = false;
  spanQuantity.innerText = currentQuantity;
  totalValue += price;
  spanPrice.innerHTML = `$${(price * currentQuantity).toFixed(2)}`;
  cartTotal.innerHTML = `<h3>Total: $${totalValue.toFixed(2)}</h3>`;
}

function removeItem(mainDiv, price, spanQuantity) {
  mainDiv.remove();
  totalValue -= price * spanQuantity.innerText;
  cartTotal.innerHTML = `<h3>Total: $${totalValue.toFixed(2)}</h3>`;
  if (totalValue === 0) emptyCart.item(0).style.display = "block";
}
