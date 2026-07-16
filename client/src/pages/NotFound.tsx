import {
  ArrowLeft,
  Home,
  SearchX,
  Sparkles,
} from "lucide-react";

import "./NotFound.css";

function NotFound() {
  const token = localStorage.getItem("token");

  const destination = token ? "/dashboard" : "/";
  const buttonLabel = token
    ? "Retour au tableau de bord"
    : "Retour à la connexion";

  return (
    <main className="not-found-page">
      <section className="not-found-content">
        <span className="not-found-icon">
          <SearchX size={38} strokeWidth={1.6} />
        </span>

        <p className="not-found-code">404</p>

        <h1>
          Oups, cette page n’existe pas
          <Sparkles size={24} />
        </h1>

        <p className="not-found-description">
          La page que vous recherchez a peut-être été déplacée,
          supprimée ou son adresse est incorrecte.
        </p>

        <a className="not-found-button" href={destination}>
          {token ? (
            <Home size={19} />
          ) : (
            <ArrowLeft size={19} />
          )}

          {buttonLabel}
        </a>
      </section>

      <section className="not-found-brand">
        <h2>
          Glow <span>✦</span>
          <br />
          Routine <span>♡</span>
        </h2>

        <p>Mon journal skincare & self-care</p>
      </section>
    </main>
  );
}

export default NotFound;