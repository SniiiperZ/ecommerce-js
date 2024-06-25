/**
 * List component
 *
 * @param {Array} items - List of items
 * @param {Function} itemTemplate - Item template function
 * @returns {string} HTML string
 */
export const List = (items, itemTemplate) => {
  return `
    <ul class="list-group">
      ${items.map(itemTemplate).join("")}
    </ul>
    `;
};
