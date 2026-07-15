import { Search, SlidersHorizontal } from "lucide-react";

import cremeApaisante from "../assets/products/creme-apaisante.png";
import cremeSolaire from "../assets/products/creme-solaire.png";
import lipMask from "../assets/products/lip-mask.png";
import lotionTonique from "../assets/products/lotion-tonique.png";
import masqueEclat from "../assets/products/masque-eclat.png";
import nettoyantDoux from "../assets/products/nettoyant-doux.png";
import retinol from "../assets/products/retinol.png";
import serumHydratant from "../assets/products/serum-hydratant.png";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const products = [
  {
    id: 1,
    name: "Sérum Hydratant",
    brand: "The Ordinary",
    category: "Sérum",
    routine: "Matin & Soir",
    rating: 4,
    image: serumHydratant,
    favorite: true,
  },
  {
    id: 2,
    name: "Crème Apaisante",
    brand: "Laneige",
    category: "Crème",
    routine: "Soir",
    rating: 4,
    image: cremeApaisante,
    favorite: false,
  },
  {
    id: 3,
    name: "Nettoyant Doux",
    brand: "CeraVe",
    category: "Nettoyant",
    routine: "Matin",
    rating: 4,
    image: nettoyantDoux,
    favorite: true,
  },
  {
    id: 4,
    name: "Lotion Tonique",
    brand: "Caudalie",
    category: "Lotion",
    routine: "Matin & Soir",
    rating: 3,
    image: lotionTonique,
    favorite: false,
  },
  {
    id: 5,
    name: "Rétinol 0.2%",
    brand: "The Ordinary",
    category: "Sérum",
    routine: "Soir",
    rating: 4,
    image: retinol,
    favorite: false,
  },
  {
    id: 6,
    name: "Lip Sleeping Mask",
    brand: "Laneige",
    category: "Lèvres",
    routine: "Soir",
    rating: 4,
    image: lipMask,
    favorite: true,
  },
  {
    id: 7,
    name: "Masque Éclat",
    brand: "Biodance",
    category: "Masque",
    routine: "Soir",
    rating: 4,
    image: masqueEclat,
    favorite: false,
  },
  {
    id: 8,
    name: "Crème Solaire",
    brand: "La Roche-Posay",
    category: "SPF",
    routine: "Matin",
    rating: 3,
    image: cremeSolaire,
    favorite: false,
  },
];

function ProductGrid() {
  return (
    <section className="collection">
      <header className="collection-header">
        <h2>Ma Collection ✦</h2>

        <section className="collection-tools">
          <label className="search-field">
            <Search size={18} />

            <input
              type="search"
              placeholder="Rechercher un produit..."
            />
          </label>

          <button className="filter-button" type="button">
            <SlidersHorizontal size={18} />
            Filtrer
          </button>
        </section>
      </header>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <button className="show-more-button" type="button">
        Voir plus de produits
        <span>⌄</span>
      </button>
    </section>
  );
}

export default ProductGrid;