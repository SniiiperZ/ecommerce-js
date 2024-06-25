/**
 * @param {HTMLElement} element
 * @returns {void}
 */
export const NotFound = (element) => {
  element.innerHTML = `
    <h1>404</h1>
    <p>La page demandée n'existe pas.</p>
    `;
};
