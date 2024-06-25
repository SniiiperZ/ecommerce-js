/**
 * Layout
 * @returns {string} HTML string
 */
export const Layout = () => {
  const year = new Date().getFullYear();

  return `
    <div class="d-flex flex-column min-vh-100">
      <header>
      </header>
      <main class="container mt-5">
      </main>
      <footer class="text-center mt-auto">
        <p>&copy; ${year} - Tous droits réservés</p>
      </footer>
    </div>
    `;
};
