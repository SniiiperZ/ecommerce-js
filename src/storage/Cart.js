export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product, quantity) => {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  updateCartCount();
};

export const updateCartCount = () => {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = getCartCount();
  }
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

export const updateProductQuantity = (productId, quantity) => {
  const cart = getCart();
  const product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity = quantity;
    if (product.quantity <= 0) {
      removeProductFromCart(productId);
    } else {
      saveCart(cart);
    }
  }
};

export const removeProductFromCart = (productId) => {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartCount();
};

export const clearCart = () => {
  localStorage.removeItem("cart");
  updateCartCount();
};
