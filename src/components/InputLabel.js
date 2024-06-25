/**
 * InputLabel Component
 *
 * @param {string} forInput - L'attribut for du label.
 * @param {string} label - Le texte du label.
 * @returns {string} HTML string
 */
export const InputLabel = (forInput, label) => {
  return `
    <label for="${forInput}">${label}</label>
    `;
};
