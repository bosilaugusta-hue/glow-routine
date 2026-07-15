import { Search, SlidersHorizontal } from "lucide-react";

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
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    favorite: true,
  },
  {
    id: 2,
    name: "Crème Apaisante",
    brand: "Laneige",
    category: "Crème",
    routine: "Soir",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80",
    favorite: false,
  },
  {
    id: 3,
    name: "Nettoyant Doux",
    brand: "CeraVe",
    category: "Nettoyant",
    routine: "Matin",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    favorite: true,
  },
  {
    id: 4,
    name: "Lotion Tonique",
    brand: "Caudalie",
    category: "Lotion",
    routine: "Matin & Soir",
    rating: 3,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
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
    </section>
  );
}

export default ProductGrid;