import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { getProducts } from "../services/productServices";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";

import "./ProductGrid.css";

export type ProductView =
  | "collection"
  | "morning"
  | "night"
  | "favorites";

type ProductGridProps = {
  view?: ProductView;
};

const pageTitles: Record<ProductView, string> = {
  collection: "Ma Collection ✦",
  morning: "Routine Matin ☀",
  night: "Routine Soir ☾",
  favorites: "Mes Favoris ♡",
};

function ProductGrid({
  view = "collection",
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (loadError) {
        console.error(loadError);
        setError("Impossible de charger les produits.");
      } finally {
        setIsLoading(false);
      }
    }

    function handleProductsChanged() {
      void loadProducts();
    }

    void loadProducts();

    window.addEventListener(
      "products:changed",
      handleProductsChanged,
    );

    return () => {
      window.removeEventListener(
        "products:changed",
        handleProductsChanged,
      );
    };
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.brand.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch);

    if (!matchesSearch) {
      return false;
    }

    if (view === "morning") {
      return (
        product.routine === "Matin" ||
        product.routine === "Matin & Soir"
      );
    }

    if (view === "night") {
      return (
        product.routine === "Soir" ||
        product.routine === "Matin & Soir"
      );
    }

    if (view === "favorites") {
      return product.favorite;
    }

    return true;
  });

  return (
    <section className="collection">
      <header className="collection-header">
        <h2>{pageTitles[view]}</h2>

        <section className="collection-tools">
          <label className="search-field">
            <Search size={18} />

            <input
              type="search"
              value={search}
              placeholder="Rechercher un produit..."
              aria-label="Rechercher un produit"
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <button className="filter-button" type="button">
            <SlidersHorizontal size={18} />
            Filtrer
          </button>
        </section>
      </header>

      {isLoading && (
        <p className="collection-message">
          Chargement des produits...
        </p>
      )}

      {!isLoading && error && (
        <p className="collection-message collection-error">
          {error}
        </p>
      )}

      {!isLoading &&
        !error &&
        filteredProducts.length === 0 && (
          <p className="collection-message">
            Aucun produit ne correspond à cette section.
          </p>
        )}

      {!isLoading &&
        !error &&
        filteredProducts.length > 0 && (
          <section className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </section>
        )}
    </section>
  );
}

export default ProductGrid;