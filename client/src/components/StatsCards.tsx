import { useEffect, useState } from "react";

import collectionIcon from "../assets/icons/collection_bubble.png";
import favoriteIcon from "../assets/icons/favorite_bubble.png";
import morningIcon from "../assets/icons/morning_bubble.png";
import nightIcon from "../assets/icons/night_bubble.png";
import { getProducts } from "../services/productServices";
import type { Product } from "../types/Product";

type Statistics = {
  products: number;
  favorites: number;
  morning: number;
  night: number;
};

const initialStatistics: Statistics = {
  products: 0,
  favorites: 0,
  morning: 0,
  night: 0,
};

function StatsCards() {
  const [statistics, setStatistics] =
    useState<Statistics>(initialStatistics);

  useEffect(() => {
    async function loadStatistics() {
      try {
        const products: Product[] = await getProducts();

        const favorites = products.filter(
          (product) => product.favorite,
        ).length;

        const morning = products.filter(
          (product) =>
            product.routine === "Matin" ||
            product.routine === "Matin & Soir",
        ).length;

        const night = products.filter(
          (product) =>
            product.routine === "Soir" ||
            product.routine === "Matin & Soir",
        ).length;

        setStatistics({
          products: products.length,
          favorites,
          morning,
          night,
        });
      } catch (error) {
        console.error(
          "Impossible de charger les statistiques :",
          error,
        );
      }
    }

    loadStatistics();
  }, []);

  const cards = [
    {
      label: "Produits",
      description: "dans ma collection",
      value: statistics.products,
      icon: collectionIcon,
    },
    {
      label: "Favoris",
      description: "coups de cœur",
      value: statistics.favorites,
      icon: favoriteIcon,
    },
    {
      label: "Routine Matin",
      description: "produits",
      value: statistics.morning,
      icon: morningIcon,
    },
    {
      label: "Routine Soir",
      description: "produits",
      value: statistics.night,
      icon: nightIcon,
    },
  ];

  return (
    <section className="stats">
      {cards.map((card) => (
        <article className="stat-card" key={card.label}>
          <img
            className="stat-icon"
            src={card.icon}
            alt=""
          />

          <section className="stat-content">
            <h2>{card.value}</h2>
            <p>{card.label}</p>
            <small>{card.description}</small>
          </section>
        </article>
      ))}
    </section>
  );
}

export default StatsCards;