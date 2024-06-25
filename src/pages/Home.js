import { Carousel } from "../components/Carousel";
import images from "../storage/homepageCarousel.json";

/**
 * Page d'accueil
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Home = (element) => {
  element.innerHTML = `
    <h1>Accueil</h1>
    <p>Bienvenue chez BootCamp !</p>
    ${Carousel(images)}
    `;
};
