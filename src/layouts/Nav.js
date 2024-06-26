import { ROUTE_CHANGED_EVENT } from "../framework/app";

/**
 * @typedef {Object} Link
 * @property {string} href - L'URL du lien.
 * @property {string} text - Le texte du lien.
 */

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Nav = (element) => {
  const appName = "BootCamp";

  /**
   * @type {Link[]}
   */
  const links = [
    { href: "/", text: "Accueil" },
    { href: "/contact", text: "Contact" },
    { href: "/produits", text: "Produits" },
    { href: "/cart", text: "Panier" }, // Ajout du lien vers le panier
  ];

  element.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">${appName}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            ${links
              .map(
                (link) => `
                <li class="nav-item">
                  <a class="nav-link" href="${link.href}">${link.text}</a>
                </li>`
              )
              .join("")}
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link btn btn-primary btn-sm" href="/cart">
                <span>
                  <i class="ri-shopping-cart-line"></i>
                  <span id="cart-count" class="badge bg-danger">0</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Remplace les liens par des événements de navigation
  const replaceLinksByEvents = () => {
    const navLinks = element.querySelectorAll("a");

    const linkClickHandler = (event) => {
      // Empêche la navigation par défaut
      event.preventDefault();
      // Modifie l'URL de la page sans recharger la page
      window.history.pushState({}, "", event.currentTarget.href);
      // Déclenche l'événement route-changed pour changer de page sans recharger la page
      element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));

      removeActive();
      markAsActive();
      changePageTitle();
    };

    // Ajoute un écouteur d'événement sur chaque lien de navigation
    navLinks.forEach((link) => {
      link.addEventListener("click", linkClickHandler);
    });
  };

  // Supprime la classe active des liens de navigation
  const removeActive = () => {
    const activeLink = element.querySelector("a.active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
  };

  // Ajoute la classe active au lien de navigation correspondant à l'URL de la page courante
  const markAsActive = () => {
    const activeLink = element.querySelector(
      `a.nav-link[href="${window.location.pathname}"]`
    );
    if (!activeLink) {
      return;
    }
    activeLink.classList.add("active");
  };

  // Modifie le titre de la page en fonction du lien de navigation actif
  const changePageTitle = () => {
    const activeLink = element.querySelector("a.active");

    // Si la page courante n'est pas une page de navigation, on affiche uniquement le nom de l'application
    if (!activeLink) {
      document.title = appName;
      return;
    }

    document.title = `${activeLink.textContent} - ${appName}`;
  };

  // Initialise la barre de navigation
  markAsActive();
  replaceLinksByEvents();
  changePageTitle();

  // Ajoute un écouteur d'événement pour gérer les événements de navigation du navigateur (précédent/suivant)
  window.addEventListener("popstate", () => {
    removeActive();
    markAsActive();
    changePageTitle();
    element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
  });

  // Mise à jour du compteur de panier
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce(
      (total, produit) => total + produit.quantity,
      0
    );
    document.getElementById("cart-count").textContent = cartCount;
  };

  // Mise à jour initiale du compteur de panier
  updateCartCount();

  // Ajoute un écouteur pour mettre à jour le compteur de panier à chaque changement du stockage local
  window.addEventListener("storage", updateCartCount);
};
