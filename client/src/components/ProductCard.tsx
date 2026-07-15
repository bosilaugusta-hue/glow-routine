import { Heart, Pencil, Trash2 } from "lucide-react";

import type { Product } from "../types/Product";
import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <button
        className="favorite-button"
        type="button"
        aria-label="Ajouter aux favoris"
      >
        <Heart
          size={20}
          fill={product.favorite ? "currentColor" : "none"}
        />
      </button>

      <img
        className="product-image"
        src={product.image}
        alt={product.name}
      />

      <section className="product-details">
        <h3>{product.name}</h3>
        <p className="product-brand">{product.brand}</p>

        <span className="product-category">
          {product.category}
        </span>

        <p className="product-routine">
          {product.routine}
        </p>

       <p className="product-rating">
        
          {"♥".repeat(product.rating)}
          <span>
            {"♡".repeat(5 - product.rating)}
          </span>
        </p>
      </section>

      <footer className="product-actions">
        <button type="button" aria-label={`Modifier ${product.name}`}>
          <Pencil size={18} />
        </button>

        <button type="button" aria-label={`Supprimer ${product.name}`}>
          <Trash2 size={18} />
        </button>
      </footer>
    </article>
  );
}

export default ProductCard;