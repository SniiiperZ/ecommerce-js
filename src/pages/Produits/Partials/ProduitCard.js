import { CategorieBadge } from "./CategorieBadge";

/**
 * @typedef {Object} Produit
 * @property {number} id - L'identifiant de l'produit.
 * @property {string} name - Le nom de l'produit.
 * @property {string} description - L'adresse description de l'produit.
 * @property {string} Categorie - Le categorie de l'produit.
 */

/**
 * Affiche une carte d'produit
 *
 * @param {Produit} produit
 * @returns {string} HTML string
 */
export const ProduitCard = (produit) => {
  return `
    <div class="col p-2">
      <a class="card produit-link" href="/produit?id=${produit.id}">
        <div class="card-body">
          <h5 class="card-title">${produit.name}</h5>
          <figure>
            <img src="${produit.image}" alt="${
    produit.name
  }" class="card-img-top" />
          </figure>
          <button class="btn btn-primary">Voir plus</button>
          <div class="card-space" style="color: grey">${
            produit.prix
          }€${CategorieBadge(produit.categorie)}</div>
        </div>
      </a>
    </div>
    `;
};
