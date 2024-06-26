// Importation des constantes et des composants nécessaires
import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";

/**
 * Un composant pour afficher un tableau paginé et filtrable.
 *
 * @param {HTMLElement} element - L'élément HTML où le tableau sera rendu
 * @param {Object[]} items - La liste des éléments à afficher
 * @param {Function} itemTemplate - La fonction de template pour chaque ligne du tableau
 * @param {string[]} searchableFields - Les champs des objets qui peuvent être recherchés
 * @param {string[]} tableHeadings - Les en-têtes des colonnes du tableau
 * @returns {void}
 */
export const DataTable = (
  element,
  items,
  itemTemplate,
  searchableFields,
  tableHeadings
) => {
  // Initialisation de la page courante et de la valeur de recherche à partir de l'URL
  let currentPage =
    parseInt(new URL(window.location).searchParams.get("page")) || 1;
  let searchInputValue =
    new URL(window.location).searchParams.get("search") || "";
  let filteredItems = items;

  // Génération d'un identifiant unique pour le tableau
  const id = `table-${Math.random().toString(36).slice(2)}`;

  // Définition de la structure HTML du composant
  element.innerHTML = `
    <div class="row">
      <div class="col mb-2">
        ${TextInput("search", searchInputValue, "search", "Rechercher...")}
      </div>
    </div>
    <table id="${id}" class="table table-stripped border align-middle">
      <thead>
        <tr>
          ${tableHeadings
            .map((heading) => {
              return `<th scope="col">${heading}</th>`;
            })
            .join("")}
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <div id="pagination"></div>
    `;

  // Récupération des éléments du DOM pour la recherche, la liste et la pagination
  const searchInput = element.querySelector("input#search");
  const listElement = element.querySelector(`#${id} tbody`);
  const paginationElement = element.querySelector("#pagination");

  // Fonction pour rendre la liste des éléments filtrés
  const renderList = (filteredItems) => {
    if (filteredItems.length === 0) {
      return `
        <td colspan="4" class="text-center">Aucun résultat</td>
        `;
    }

    return `
      ${filteredItems.map(itemTemplate).join("")}
    `;
  };

  // Fonction pour filtrer et paginer les éléments
  const filterAndPaginate = (perPage = 5) => {
    const value = searchInputValue.toLowerCase();
    if (value !== "") {
      filteredItems = items.filter(
        (item) =>
          searchableFields.filter((field) =>
            item[field].toLowerCase().includes(value)
          ).length > 0
      );
    } else {
      filteredItems = items;
    }

    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, filteredItems.length);
    const pages = Math.ceil(filteredItems.length / perPage);
    filteredItems = filteredItems.slice(start, end);

    listElement.innerHTML = renderList(filteredItems);
    paginationElement.innerHTML = Pagination(currentPage, pages);

    // Ajout des écouteurs d'événements pour les liens de pagination
    const paginationLinks = paginationElement.querySelectorAll("a");
    const paginationLinkClickHandler = (event) => {
      event.preventDefault();
      currentPage = parseInt(
        new URL(event.currentTarget.href).searchParams.get("page")
      );
      const url = new URL(window.location);
      url.searchParams.set("page", currentPage);
      window.history.pushState({}, "", url);
      filterAndPaginate();
    };
    for (let i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].addEventListener("click", paginationLinkClickHandler);
    }

    // Ajout des écouteurs d'événements pour les liens des lignes du tableau
    const rowsLinks = listElement.querySelectorAll("a");
    const rowLinkClickHandler = (event) => {
      event.preventDefault();
      window.history.pushState({}, "", event.currentTarget.href);
      const headerElement = document.querySelector("header");
      headerElement.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
    };
    for (let i = 0; i < rowsLinks.length; i++) {
      rowsLinks[i].addEventListener("click", rowLinkClickHandler);
    }
  };

  // Initialisation du filtrage et de la pagination
  filterAndPaginate();

  // Ajout d'un écouteur d'événement pour la saisie dans le champ de recherche
  searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    searchInputValue = e.target.value;
    currentPage = 1;
    const url = new URL(window.location);
    url.searchParams.set("search", searchInputValue);
    url.searchParams.set("page", currentPage);
    window.history.pushState({}, "", url);
    filterAndPaginate();
  });

  // Ajout d'un écouteur d'événement pour la navigation dans l'historique
  window.addEventListener("popstate", () => {
    currentPage =
      parseInt(new URL(window.location).searchParams.get("page")) || 1;
    filterAndPaginate();
  });
};
