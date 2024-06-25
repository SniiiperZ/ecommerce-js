import { Carousel as BootstrapCarousel } from "bootstrap";

/**
 * @typedef {Object} Image
 * @property {string} src - L'URL de l'image.
 * @property {string} title - Le titre de l'image.
 * @property {string} description - La description de l'image.
 */

/**
 * Carousel Component
 *
 * @param {Image[]} images
 * @returns {string} HTML string
 */
export const Carousel = (images) => {
  return `
    <div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-indicators">
        ${images
          .map(
            (image, index) => `
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" ${
              index === 0 ? 'class="active" aria-current="true"' : ""
            } aria-label="Slide ${index + 1}"></button>
        `
          )
          .join("")}
      </div>
      <div class="carousel-inner">
        ${images
          .map(
            (image, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${image.src}" class="d-block w-100" alt="${
              image.description
            }">
          </div>
        `
          )
          .join("")}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`;
};
