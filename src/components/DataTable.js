import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";

/**
 * Un composant pour afficher un tableau paginé et filtrable.
 *
 * @param {HTMLElement} element
 * @param {Object[]} items
 * @param {Function} itemTemplate
 * @param {string[]} searchableFields
 * @param {string[]} tableHeadings
 * @returns {void}
 */
export const DataTable = (
  element,
  items,
  itemTemplate,
  searchableFields,
  tableHeadings
) => {
  let currentPage =
    parseInt(new URL(window.location).searchParams.get("page")) || 1;
  let searchInputValue =
    new URL(window.location).searchParams.get("search") || "";
  let filteredItems = items;

  const id = `table-${Math.random().toString(36).slice(2)}`;

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

  const searchInput = element.querySelector("input#search");
  const listElement = element.querySelector(`#${id} tbody`);
  const paginationElement = element.querySelector("#pagination");

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

  filterAndPaginate();

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

  window.addEventListener("popstate", () => {
    currentPage =
      parseInt(new URL(window.location).searchParams.get("page")) || 1;
    filterAndPaginate();
  });
};
