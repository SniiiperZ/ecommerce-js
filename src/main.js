import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Produits } from "./pages/Produits/Produits";
import { Produit } from "./pages/Produits/Produit";
import { Cart } from "./pages/Cart";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/produit": Produit,
  "/produits": Produits,
  "/cart": Cart,
};

app("#app", routes);
