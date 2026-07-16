import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import { getProducts } from "../services/productServices";
import type { Product } from "../types/Product";

import "./Statistics.css";

type StatisticsData = {
  total: number;
  favorites: number;
  morning: number;
  night: number;
  categories: Record<string, number>;
};

const initialStatistics: StatisticsData = {
  total: 0,
  favorites: 0,
  morning: 0,
  night: 0,
  categories: {},
};

function Statistics() {
  const [statistics, setStatistics] =
    useState<StatisticsData>(initialStatistics);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStatistics() {
      try {
        setIsLoading(true);
        setError("");

        const products: Product[] = await getProducts();

        const categories = products.reduce<Record<string, number>>(
          (result, product) => {
            result[product.category] =
              (result[product.category] ?? 0) + 1;

            return result;
          },
          {},
        );

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
          total: products.length,
          favorites,
          morning,
          night,
          categories,
        });
      } catch (loadError) {
        console.error(loadError);
        setError("Impossible de charger les statistiques.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadStatistics();
  }, []);

  const sortedCategories = Object.entries(
    statistics.categories,
  ).sort((firstCategory, secondCategory) => {
    return secondCategory[1] - firstCategory[1];
  });

  return (
    <main className="statistics-page">
      <Sidebar />

      <section className="statistics-main">
        <header className="statistics-header">
          <h1>Statistiques ✦</h1>
          <p>Analyse de votre collection skincare</p>
        </header>

        {isLoading && (
          <p className="statistics-message">
            Chargement des statistiques...
          </p>
        )}

        {!isLoading && error && (
          <p className="statistics-message statistics-error">
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            <section className="statistics-summary">
              <article>
                <strong>{statistics.total}</strong>
                <h2>Produits</h2>
                <p>Dans votre collection</p>
              </article>

              <article>
                <strong>{statistics.favorites}</strong>
                <h2>Favoris</h2>
                <p>Vos coups de cœur</p>
              </article>

              <article>
                <strong>{statistics.morning}</strong>
                <h2>Routine Matin</h2>
                <p>Produits du matin</p>
              </article>

              <article>
                <strong>{statistics.night}</strong>
                <h2>Routine Soir</h2>
                <p>Produits du soir</p>
              </article>
            </section>

            <section className="statistics-content">
              <article className="statistics-routines">
                <header>
                  <h2>Répartition des routines</h2>
                  <p>Utilisation des produits</p>
                </header>

                <section className="routine-stat">
                  <span>Routine Matin</span>
                  <strong>{statistics.morning}</strong>
                </section>

                <section className="routine-stat">
                  <span>Routine Soir</span>
                  <strong>{statistics.night}</strong>
                </section>

                <section className="routine-stat">
                  <span>Favoris</span>
                  <strong>{statistics.favorites}</strong>
                </section>
              </article>

              <article className="statistics-categories">
                <header>
                  <h2>Catégories</h2>
                  <p>Répartition de votre collection</p>
                </header>

                {sortedCategories.map(([category, count]) => (
                  <section
                    className="category-stat"
                    key={category}
                  >
                    <span>{category}</span>

                    <section className="category-stat-right">
                      <div
                        className="category-progress"
                        aria-hidden="true"
                      >
                        <span
                          style={{
                            width: `${
                              statistics.total > 0
                                ? (count / statistics.total) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>

                      <strong>{count}</strong>
                    </section>
                  </section>
                ))}
              </article>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

export default Statistics;