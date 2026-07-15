import {
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import collectionIcon from "../assets/icons/collection_bubble.png";
import favoriteIcon from "../assets/icons/favorite_bubble.png";
import morningIcon from "../assets/icons/morning_bubble.png";
import nightIcon from "../assets/icons/night_bubble.png";
import skincareTray from "../assets/images/skincare-tray.png";

import "./Login.css";

const features = [
  {
    title: "Ma Collection",
    description: "Organisez vos produits préférés",
    icon: collectionIcon,
    tone: "collection",
  },
  {
    title: "Favoris",
    description: "Vos coups de cœur skincare",
    icon: favoriteIcon,
    tone: "favorite",
  },
  {
    title: "Routine Matin",
    description: "Créez votre routine du matin",
    icon: morningIcon,
    tone: "morning",
  },
  {
    title: "Routine Soir",
    description: "Créez votre routine du soir",
    icon: nightIcon,
    tone: "night",
  },
];

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="login-page">
      <button className="language-button" type="button">
        <Globe2 size={19} />
        FR
        <span>⌄</span>
      </button>

      <section className="login-showcase">
        <header className="login-brand">
          <h1>
            Glow <span className="brand-sparkle">✦</span>
            <br />
            Routine <span className="brand-heart">♡</span>
          </h1>

          <p>Mon journal skincare & self-care</p>
        </header>

        <section className="login-quote">
          <span />
          <i>✦</i>
          <span />

          <p>
            Prenez soin de votre peau,
            <br />
            de votre bien-être et de vous,
          </p>

          <strong>chaque jour⌄</strong>
        </section>

        <img
          className="login-tray"
          src={skincareTray}
          alt="Produits skincare et bouquet de fleurs sur un plateau"
        />

        <section className="login-features">
          {features.map((feature) => (
            <article className="login-feature" key={feature.title}>
              <span className={`feature-icon ${feature.tone}`}>
                <img src={feature.icon} alt="" />
              </span>

              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>
      </section>

      <section className="login-panel">
        <header className="login-panel-header">
          <span className="welcome-icon">♡</span>

          <h2>
            Bienvenue <Sparkles size={22} />
          </h2>

          <p>Connectez-vous à votre espace</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email ou nom d’utilisateur

            <span className="login-field">
              <UserRound size={20} />

              <input
                type="text"
                placeholder="Ex : augusta@email.com"
              />

              <Sparkles size={17} />
            </span>
          </label>

          <label>
            Mot de passe

            <span className="login-field">
              <LockKeyhole size={20} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ex : ••••••••••••"
              />

              <button
                type="button"
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </span>
          </label>

          <section className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Se souvenir de moi</span>
            </label>

            <button className="forgot-password" type="button">
              Mot de passe oublié ?
            </button>
          </section>

          <button className="login-submit" type="submit">
            Se connecter
            <Sparkles size={18} />
          </button>

          <section className="login-separator">
            <span />
            <i>✦</i>
            <p>ou continuer avec</p>
            <i>✦</i>
            <span />
          </section>

          <section className="social-login">
            <button type="button" aria-label="Continuer avec Google">
              <strong className="google-logo">G</strong>
            </button>

            <button type="button" aria-label="Continuer avec Apple">
              <strong className="apple-logo">●</strong>
            </button>

            <button type="button" aria-label="Continuer avec une autre option">
              <span className="social-heart">♡</span>
            </button>
          </section>

          <p className="register-link">
            Pas encore de compte ?
            <button type="button">
              Créer mon compte <span>›</span>
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;