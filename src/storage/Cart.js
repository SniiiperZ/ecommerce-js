// Fonction pour récupérer le panier depuis le localStorage
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Fonction pour sauvegarder le panier dans le localStorage
export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fonction pour ajouter un produit au panier
export const addToCart = (product, quantity) => {
  // Récupération du panier actuel
  const cart = getCart();
  // Vérification si le produit existe déjà dans le panier
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // Si le produit existe, mise à jour de la quantité
    existingProduct.quantity += quantity;
  } else {
    // Sinon, ajout du nouveau produit avec la quantité spécifiée
    cart.push({ ...product, quantity });
  }

  // Sauvegarde du panier mis à jour
  saveCart(cart);
  // Mise à jour du compteur d'articles dans le panier
  updateCartCount();
};

// Fonction pour mettre à jour le compteur d'articles dans le panier
export const updateCartCount = () => {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    // Mise à jour du contenu de l'élément avec le nombre total d'articles
    cartCountElement.textContent = getCartCount();
  }
};

// Fonction pour récupérer le nombre total d'articles dans le panier
export const getCartCount = () => {
  const cart = getCart();
  // Calcul du nombre total d'articles en additionnant les quantités de chaque produit
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

// Fonction pour mettre à jour la quantité d'un produit dans le panier
export const updateProductQuantity = (productId, quantity) => {
  const cart = getCart();
  // Recherche du produit dans le panier
  const product = cart.find((item) => item.id === productId);

  if (product) {
    // Mise à jour de la quantité du produit
    product.quantity = quantity;
    if (product.quantity <= 0) {
      // Si la quantité est inférieure ou égale à 0, suppression du produit du panier
      removeProductFromCart(productId);
    } else {
      // Sinon, sauvegarde du panier mis à jour
      saveCart(cart);
    }
  }
};

// Fonction pour supprimer un produit du panier
export const removeProductFromCart = (productId) => {
  let cart = getCart();
  // Filtrage du panier pour exclure le produit spécifié
  cart = cart.filter((item) => item.id !== productId);
  // Sauvegarde du panier mis à jour
  saveCart(cart);
  // Mise à jour du compteur d'articles dans le panier
  updateCartCount();
};

// Fonction pour vider entièrement le panier
export const clearCart = () => {
  // Suppression du panier du localStorage
  localStorage.removeItem("cart");
  // Mise à jour du compteur d'articles dans le panier
  updateCartCount();
};
