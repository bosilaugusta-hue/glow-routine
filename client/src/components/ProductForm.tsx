import { Link, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  createProduct,
  updateProduct,
} from "../services/productServices";
import type {
  Product,
  ProductRoutine,
} from "../types/Product";

import "./ProductForm.css";

function ProductForm() {
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [routine, setRoutine] =
    useState<ProductRoutine | "">("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function handleEditProduct(event: Event) {
      const editEvent = event as CustomEvent<Product>;
      const selectedProduct = editEvent.detail;

      setEditingProduct(selectedProduct);
      setName(selectedProduct.name);
      setBrand(selectedProduct.brand);
      setCategory(selectedProduct.category);
      setRoutine(selectedProduct.routine);
      setRating(selectedProduct.rating);
      setImage(selectedProduct.image ?? "");

      setMessage("");
      setError("");
    }

    window.addEventListener(
      "products:edit",
      handleEditProduct,
    );

    return () => {
      window.removeEventListener(
        "products:edit",
        handleEditProduct,
      );
    };
  }, []);

  function resetForm() {
    setEditingProduct(null);
    setName("");
    setBrand("");
    setCategory("");
    setRoutine("");
    setRating(0);
    setImage("");
    setMessage("");
    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Merci de renseigner le nom du produit.");
      return;
    }

    if (!brand.trim()) {
      setError("Merci de renseigner la marque.");
      return;
    }

    if (!category) {
      setError("Merci de sélectionner une catégorie.");
      return;
    }

    if (!routine) {
      setError(
        "Merci de sélectionner un moment d’utilisation.",
      );
      return;
    }

    if (rating === 0) {
      setError("Merci de donner une note au produit.");
      return;
    }

    if (!image.trim()) {
      setError("Merci de renseigner le chemin de l’image.");
      return;
    }

    try {
      setIsSubmitting(true);

      const productData = {
        name: name.trim(),
        brand: brand.trim(),
        category,
        routine,
        rating,
        imageUrl: image.trim(),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          ...productData,
          favorite: editingProduct.favorite,
        });

        setMessage("Produit modifié avec succès.");
      } else {
        await createProduct(productData);

        setMessage("Produit ajouté avec succès.");
      }

      window.dispatchEvent(
        new CustomEvent("products:changed"),
      );

      if (editingProduct) {
        resetForm();
      } else {
        setName("");
        setBrand("");
        setCategory("");
        setRoutine("");
        setRating(0);
        setImage("");
      }
    } catch (submitError) {
      console.error(submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Impossible d’enregistrer le produit.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <aside className="product-form">
      <header className="product-form-header">
        <section>
          <h2>
            {editingProduct
              ? "Modifier le Produit"
              : "Ajouter un Produit"}

            <Sparkles size={20} />
          </h2>

          <p>
            {editingProduct
              ? "Mettre à jour le produit"
              : "Créer un nouveau produit"}
          </p>
        </section>

        {editingProduct && (
          <button
            className="cancel-edit-button"
            type="button"
            aria-label="Annuler la modification"
            onClick={resetForm}
          >
            <X size={18} />
          </button>
        )}
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          Nom du produit

          <input
            type="text"
            placeholder="Ex : Sérum Hydratant"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          Marque

          <input
            type="text"
            placeholder="Ex : The Ordinary"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
        </label>

        <label>
          Catégorie

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="">
              Sélectionner une catégorie
            </option>
            <option value="Nettoyant">Nettoyant</option>
            <option value="Démaquillant">
              Démaquillant
            </option>
            <option value="Lotion">Lotion</option>
            <option value="Sérum">Sérum</option>
            <option value="Crème">Crème</option>
            <option value="Masque">Masque</option>
            <option value="Lèvres">Lèvres</option>
            <option value="Contour des yeux">
              Contour des yeux
            </option>
            <option value="Protection solaire">
              Protection solaire
            </option>
            <option value="SPF">SPF</option>
          </select>
        </label>

        <fieldset>
          <legend>Moment d’utilisation</legend>

          <section className="routine-options">
            {(
              [
                "Matin",
                "Soir",
                "Matin & Soir",
              ] as ProductRoutine[]
            ).map((moment) => (
              <label key={moment}>
                <input
                  type="radio"
                  name="routine"
                  value={moment}
                  checked={routine === moment}
                  onChange={() => setRoutine(moment)}
                />

                {moment}
              </label>
            ))}
          </section>
        </fieldset>

        <fieldset>
          <legend>Note</legend>

          <section className="rating-options">
            {[1, 2, 3, 4, 5].map((heart) => (
              <button
                key={heart}
                type="button"
                aria-label={`Donner la note ${heart} sur 5`}
                onClick={() => setRating(heart)}
              >
                {heart <= rating ? "♥" : "♡"}
              </button>
            ))}
          </section>
        </fieldset>

        <label>
          Image URL

          <span className="image-input">
            <input
              type="text"
              value={image}
              placeholder="/products/mon-produit.png"
              onChange={(event) =>
                setImage(event.target.value)
              }
            />

            <Link size={18} />
          </span>
        </label>

        {error && (
          <p className="product-form-message product-form-error">
            {error}
          </p>
        )}

        {message && (
          <p className="product-form-message product-form-success">
            {message}
          </p>
        )}

        <button
          className="submit-product"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Enregistrement..."
            : editingProduct
              ? "Mettre à jour"
              : "Ajouter à ma Routine"}

          <Sparkles size={18} />
        </button>
      </form>
    </aside>
  );
}

export default ProductForm;