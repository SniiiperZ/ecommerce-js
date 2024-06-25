import { CategorieBadge } from "./CategorieBadge";

/**
 * @typedef {Object} Produit
 * @property {number} id - L'identifiant de l'produit.
 * @property {string} name - Le nom de l'produit.
 * @property {string} description - L'adresse description de l'produit.
 * @property {string} categorie - Le categorie de l'produit.
 */

/**
 * Affiche une ligne d'un tableau d'produits
 *
 * @param {Produit} produit
 * @returns {string} HTML string
 */
export const ProduitRow = (produit) => {
  return `
    <tr>
      <td>${produit.name}</td>
      <td>${produit.description}</td>
      <td>${produit.prix}€</td>
      <td>${CategorieBadge(produit.categorie)}</td>
      <td><a class="btn btn-primary btn-sm" href="/produit?id=${
        produit.id
      }"><i class="ri-search-eye-line"></i></a></td>
    </tr>
    `;
};
