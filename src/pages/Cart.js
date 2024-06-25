import {
  getCart,
  updateProductQuantity,
  removeProductFromCart,
  clearCart,
} from "../storage/Cart";

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce(
    (total, produit) => total + produit.quantity,
    0
  );
  document.getElementById("cart-count").textContent = cartCount;
};

export const Cart = (element) => {
  const cart = getCart();

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, produit) =>
        total + parseFloat(produit.prix) * parseInt(produit.quantity),
      0
    );
  };

  const renderCartItems = () => {
    return cart
      .map(
        (produit) => `
      <tr>
        <td>${produit.name}</td>
        <td>
          <input type="number" value="${produit.quantity}" data-id="${
          produit.id
        }" class="quantity-input">
        </td>
        <td>${parseFloat(produit.prix).toFixed(2)} €</td>
        <td>${(parseFloat(produit.prix) * parseInt(produit.quantity)).toFixed(
          2
        )} €</td>
        <td>
          <button class="btn btn-danger btn-sm remove-btn" data-id="${
            produit.id
          }">Supprimer</button>
        </td>
      </tr>
    `
      )
      .join("");
  };

  element.innerHTML = `
    <div>
      <h1>Votre Panier</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Prix total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${renderCartItems()}
        </tbody>
      </table>
      <h2>Total : ${calculateTotalPrice().toFixed(2)} €</h2>
      <button id="clear-cart-btn" class="btn btn-warning">Vider le panier</button>
      <button id="checkout-btn" class="btn btn-success">Commander</button>
    </div>
  `;

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const quantity = parseInt(event.target.value);
      updateProductQuantity(productId, quantity);
      updateCartCount(); // Mettre à jour le compteur de panier
      Cart(element); // Re-render the cart
    });
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.getAttribute("data-id"));
      removeProductFromCart(productId);
      updateCartCount(); // Mettre à jour le compteur de panier
      Cart(element); // Re-render the cart
    });
  });

  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    clearCart();
    updateCartCount(); // Mettre à jour le compteur de panier
    Cart(element); // Re-render the cart
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Commande simulée avec succès !");
    clearCart();
    updateCartCount(); // Mettre à jour le compteur de panier
    Cart(element); // Re-render the cart
  });
};
