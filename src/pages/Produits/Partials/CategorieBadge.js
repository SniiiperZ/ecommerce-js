/**
 * Badge de categorie produit
 *
 * @param {string} categorie
 * @returns {string} HTML string
 */
export const CategorieBadge = (categorie) => {
  const categories = {
    abri: "text-bg-success",
    mobilier: "text-bg-primary",
    loisir: "text-bg-danger",
    securite: "text-bg-warning",
    outil: "text-bg-dark",
  };

  const categorieBadge = categories[categorie] || "text-bg-secondary";

  return `
    <span class="badge ${categorieBadge}">${categorie}</span>
    `;
};
