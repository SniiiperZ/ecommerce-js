/**
 * TextInput Component
 *
 * @param {string} name
 * @param {string} value
 * @param {string} type
 * @param {string} placeholder
 * @returns {string} HTML string
 */
export const TextInput = (name, value, type = "text", placeholder = "") => {
  return `
    <input id="${name}" type="${type}" name="${name}" value="${value}" placeholder="${placeholder}" class="form-control">
    `;
};
