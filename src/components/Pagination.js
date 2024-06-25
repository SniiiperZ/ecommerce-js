/**
 * Pagination component
 *
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {string} HTML string
 */
export const Pagination = (currentPage, totalPages) => {
  const url = new URL(window.location.href);

  const urlWithPage = (page) => {
    url.searchParams.set("page", page);
    return url.toString();
  };

  if (totalPages === 0) {
    return "";
  }

  return `
    <nav class="mt-2">
      <ul class="pagination">
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
          <a class="page-link" href="?page=${currentPage - 1}">Previous</a>
        </li>
        ${Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          return `
            <li class="page-item ${currentPage === pageNumber ? "active" : ""}">
              <a class="page-link" href="${urlWithPage(
                pageNumber
              )}">${pageNumber}</a>
            </li>
          `;
        }).join("")}
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
          <a class="page-link" href="?page=${currentPage + 1}">Next</a>
        </li>
      </ul>
    </nav>
    `;
};
