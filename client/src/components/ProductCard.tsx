import { Heart, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  deleteProduct,
  updateFavorite,
} from "../services/productServices";
import type { Product } from "../types/Product";

import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] =
    useState(false);
  const [cardError, setCardError] = useState("");

  async function handleDelete() {
    const shouldDelete = window.confirm(
      `Voulez-vous vraiment supprimer « ${product.name} » ?`,
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      setCardError("");

      await deleteProduct(product.id);

      window.dispatchEvent(
        new CustomEvent("products:changed"),
      );
    } catch (deleteError) {
      console.error(deleteError);

      setCardError(
        deleteError instanceof Error
          ? deleteError.message
          : "Impossible de supprimer le produit.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleFavorite() {
    try {
      setIsUpdatingFavorite(true);
      setCardError("");

      await updateFavorite(
        product.id,
        !product.favorite,
      );

      window.dispatchEvent(
        new CustomEvent("products:changed"),
      );
    } catch (favoriteError) {
      console.error(favoriteError);

      setCardError(
        favoriteError instanceof Error
          ? favoriteError.message
          : "Impossible de modifier le favori.",
      );
    } finally {
      setIsUpdatingFavorite(false);
    }
  }

  function handleEdit() {
    window.dispatchEvent(
      new CustomEvent<Product>("products:edit", {
        detail: product,
      }),
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <article className="product-card">
      <button
        className="favorite-button"
        type="button"
        disabled={isUpdatingFavorite}
        aria-label={
          product.favorite
            ? `Retirer ${product.name} des favoris`
            : `Ajouter ${product.name} aux favoris`
        }
        onClick={() => {
          void handleFavorite();
        }}
      >
        <Heart
          size={20}
          fill={product.favorite ? "currentColor" : "none"}
        />
      </button>

      {product.image ? (
        <img
          className="product-image"
          src={product.image}
          alt={`${product.name} de ${product.brand}`}
        />
      ) : (
        <div className="product-image product-image-empty">
          Image indisponible
        </div>
      )}

      <section className="product-details">
        <h3>{product.name}</h3>

        <p className="product-brand">
          {product.brand}
        </p>

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

        {cardError && (
          <p className="product-card-error">
            {cardError}
          </p>
        )}
      </section>

      <footer className="product-actions">
        <button
          type="button"
          aria-label={`Modifier ${product.name}`}
          onClick={handleEdit}
        >
          <Pencil size={18} />
        </button>

        <button
          type="button"
          disabled={isDeleting}
          aria-label={`Supprimer ${product.name}`}
          onClick={() => {
            void handleDelete();
          }}
        >
          <Trash2 size={18} />
        </button>
      </footer>
    </article>
  );
}

export default ProductCard;