import { CardsList } from "../../components/CardsList";
import { DataTable } from "../../components/DataTable";
import produits from "../../storage/produits.json";
import { ProduitCard } from "./Partials/ProduitCard";
import { ProduitRow } from "./Partials/ProduitRow";

/**
 * Page de la liste des produits
 * 2 modes d'affichage : grille et tableau
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Produits = (element) => {
  // on récupère le mode d'affichage depuis l'URL
  const url = new URL(window.location.href);
  const modeFromQueryString = url.searchParams.get("mode");
  let mode = modeFromQueryString || "grid";

  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Produits</h1>
      <div>
        <select id="category-filter" class="form-select mr-3">
          <option value="">Toutes les catégories</option>
          <option value="abri">Abri</option>
          <option value="mobilier">Mobilier</option>
          <option value="loisir">Loisir</option>
          <option value="securite">Sécurité</option>
          <option value="outil">Outil</option>
        </select>
        <button id="grid-mode-btn" class="btn btn-sm btn-secondary mr-3">
          <i class="ri-layout-grid-line"></i>
        </button>
        <button id="table-mode-btn" class="btn btn-sm btn-secondary mr-3">
          <i class="ri-table-line"></i>
        </button>
      </div>
    </div>
    <div id="produits-list"></div>
  `;

  const produitsList = element.querySelector("#produits-list");

  // Fonction pour filtrer les produits par catégorie
  const filterProduitsByCategory = (category) => {
    if (category === "") {
      return produits; // Si aucune catégorie sélectionnée, retourne tous les produits
    }
    return produits.filter((produit) => produit.categorie === category);
  };

  // Fonction pour afficher les produits en fonction du mode d'affichage et du filtre de catégorie
  const render = () => {
    const selectedCategory = document.querySelector("#category-filter").value;
    const filteredProduits = filterProduitsByCategory(selectedCategory);

    if (mode === "grid") {
      CardsList(produitsList, filteredProduits, ProduitCard, [
        "name",
        "description",
      ]);
    } else if (mode === "table") {
      DataTable(
        produitsList,
        filteredProduits,
        ProduitRow,
        ["name", "description"],
        ["Nom", "Description", "Prix", "Categorie", "Actions"]
      );
    }
  };

  // Met à jour le mode dans l'URL
  const putModeInQueryString = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", mode);
    window.history.pushState({}, "", url);
  };

  // Met en surbrillance le mode d'affichage actif
  const markActiveMode = () => {
    if (mode === "grid") {
      tableModeBtn.classList.remove("active");
      gridModeBtn.classList.add("active");
    } else if (mode === "table") {
      gridModeBtn.classList.remove("active");
      tableModeBtn.classList.add("active");
    }
  };

  // Initialisation de la page
  render();

  const gridModeBtn = document.querySelector("#grid-mode-btn");
  const tableModeBtn = document.querySelector("#table-mode-btn");
  const categoryFilter = document.querySelector("#category-filter");

  markActiveMode();

  // Ajout des écouteurs d'événements sur les boutons de mode d'affichage
  gridModeBtn.addEventListener("click", () => {
    mode = "grid";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  // Ajout des écouteurs d'événements sur les boutons de mode d'affichage
  tableModeBtn.addEventListener("click", () => {
    mode = "table";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  // Ajout d'un écouteur d'événement pour le filtre de catégorie
  categoryFilter.addEventListener("change", () => {
    render();
  });

  // Ajout d'un écouteur d'événement sur le bouton de retour arrière du navigateur
  window.addEventListener("popstate", () => {
    const url = new URL(window.location.href);
    mode = url.searchParams.get("mode") || "grid";
    render();
    markActiveMode();
  });
};
