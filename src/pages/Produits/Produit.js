import produits from "../../storage/produits.json";
import { CategorieBadge } from "./Partials/CategorieBadge";
import { addToCart } from "../../storage/Cart";

/**
 * Page des détails d'un produit
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Produit = (element) => {
  // on récupère l'identifiant de l'produit depuis l'URL
  const url = new URL(window.location.href);
  const produitId = parseInt(url.searchParams.get("id"));
  // on récupère l'produit correspondant à l'identifiant
  const produit = produits.find((produit) => produit.id === produitId);

  // si l'produit n'existe pas, on affiche un message d'erreur
  if (!produit) {
    element.innerHTML = `
      <h1>Produit non trouvé</h1>
      <p>L'produit avec l'identifiant ${produitId} n'existe pas.</p>
    `;
    return;
  }

  element.innerHTML = `
    <h1>${produit.name}</h1>
    ${CategorieBadge(produit.categorie)}
    <br>
    <figure>
      <img src="${produit.image}" alt="${
    produit.name
  }" class="card-img-top" style="max-width: 30%"/>
    </figure>
    <p>${produit.description}</p>
    <p>${produit.marque}&nbsp&nbsp&nbsp${produit.prix}€</p>
    
    <div>
      <label for="quantity">Quantité</label>
      <input type="number" id="quantity" name="quantity" min="1" value="1">
      <button id="add-to-cart-btn" class="btn btn-primary">Ajouter au panier</button>
    </div>
    <div id="confirmation-message" class="alert alert-success" style="display: none;" role="alert">
      Bingo c'est dans le panier !
    </div>
  `;

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    const quantity = parseInt(document.getElementById("quantity").value);
    addToCart(produit, quantity);
    const confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.style.display = "block";
    setTimeout(() => {
      confirmationMessage.style.display = "none";
    }, 3000); // Masquer après 3 secondes
  });
};
