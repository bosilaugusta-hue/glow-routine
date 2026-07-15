import { Link, Sparkles } from "lucide-react";
import { useState } from "react";

import "./ProductForm.css";

function ProductForm() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [routine, setRoutine] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newProduct = {
      name,
      brand,
      category,
      routine,
      rating,
      image,
    };

    console.log(newProduct);
  }

  return (
    <aside className="product-form">
      <header className="product-form-header">
        <h2>
          Ajouter un Produit <Sparkles size={20} />
        </h2>

        <p>Créer un nouveau produit</p>
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
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Nettoyant">Nettoyant</option>
            <option value="Sérum">Sérum</option>
            <option value="Crème">Crème</option>
            <option value="Masque">Masque</option>
            <option value="SPF">SPF</option>
          </select>
        </label>

        <fieldset>
          <legend>Moment d'utilisation</legend>

          <section className="routine-options">
            {["Matin", "Soir", "Matin & Soir"].map((moment) => (
              <label key={moment}>
                <input
                  type="radio"
                  name="routine"
                  value={moment}
                  checked={routine === moment}
                  onChange={(event) => setRoutine(event.target.value)}
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
                onClick={() => setRating(heart)}
                aria-label={`Donner la note ${heart} sur 5`}
              >
                {heart <= rating ? "♥" : "♡"}
              </button>
            ))}
          </section>
        </fieldset>

        <label>
          Image URL
          <section className="image-input">
            <input
              type="url"
              placeholder="https://exemple.com/mon-produit.jpg"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />

            <Link size={18} />
          </section>
        </label>

        <button className="submit-product" type="submit">
          Ajouter à ma Routine <Sparkles size={18} />
        </button>
      </form>
    </aside>
  );
}

export default ProductForm;