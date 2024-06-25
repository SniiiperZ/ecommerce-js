/**
 * TextareaInput Component
 *
 * @param {string} name
 * @param {string} value
 * @param {string} placeholder
 * @param {number} rows
 * @returns {string} HTML string
 */
export const TextareaInput = (name, value, placeholder = "", rows = 3) => {
  return `
    <textarea id="${name}" name="${name}" rows="${rows}" class="form-control" placeholder="${placeholder}">${value}</textarea>
    `;
};
