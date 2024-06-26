// Importation des données de produits depuis un fichier JSON local
import produits from "../../storage/produits.json";
// Importation du composant CategorieBadge depuis le dossier Partials
import { CategorieBadge } from "./Partials/CategorieBadge";
// Importation de la fonction addToCart depuis le fichier Cart
import { addToCart } from "../../storage/Cart";

/**
 * Page des détails d'un produit
 *
 * @param {HTMLElement} element - L'élément HTML où le contenu de la page produit sera rendu
 * @returns {void}
 */
export const Produit = (element) => {
  // Récupération de l'URL actuelle
  const url = new URL(window.location.href);
  // Extraction de l'identifiant du produit à partir des paramètres de l'URL
  const produitId = parseInt(url.searchParams.get("id"));
  // Recherche du produit correspondant à cet identifiant dans la liste des produits
  const produit = produits.find((produit) => produit.id === produitId);

  // Si le produit n'existe pas, afficher un message d'erreur
  if (!produit) {
    element.innerHTML = `
      <h1>Produit non trouvé</h1>
      <p>Le produit avec l'identifiant ${produitId} n'existe pas.</p>
    `;
    return;
  }

  // Si le produit existe, afficher ses détails
  element.innerHTML = `
    <h1>${produit.name}</h1>
    ${CategorieBadge(
      produit.categorie
    )} <!-- Affichage du badge de la catégorie du produit -->
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

  // Ajout d'un écouteur d'événement sur le bouton "Ajouter au panier"
  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    // Récupération de la quantité saisie par l'utilisateur
    const quantity = parseInt(document.getElementById("quantity").value);
    // Ajout du produit au panier avec la quantité spécifiée
    addToCart(produit, quantity);
    // Affichage d'un message de confirmation
    const confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.style.display = "block";
    // Masquage du message de confirmation après 3 secondes
    setTimeout(() => {
      confirmationMessage.style.display = "none";
    }, 3000);
  });
};
