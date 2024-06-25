/**
 * PrimaryButton Component
 * 
 * @param {string} label - Le texte du bouton.
 * @param {string} type - Le type du bouton.
 * @param {string} id - L'identifiant du bouton.
 * @returns {string} HTML string
 */
export const PrimaryButton = (label, type = "button", id = null) => {
  return `
    <button ${
      id ? 'id="' + id + '"' : ""
    } class="btn btn-primary" type="${type}">${label}</button>
    `;
};
